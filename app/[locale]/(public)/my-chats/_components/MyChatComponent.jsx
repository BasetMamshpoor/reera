"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { initEcho } from "@/utils/echo";

const MyChatComponent = ({
  currentUser = null,
  currentChat = null,
  initialMessages = [],
  onSendMessage = null,
  onMessageRead = null,
  typingUsers = [],
  onTypingStart = null,
  onTypingStop = null,
}) => {
  const { data: session } = useSession();
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [isOnline, setIsOnline] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(currentChat);
  const [isTyping, setIsTyping] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [echoInitialized, setEchoInitialized] = useState(false);
  const messagesEndRef = useRef(null);
  const [connectionStatus, setConnectionStatus] = useState("disconnected");

  useEffect(() => {
    if (window.Echo) {
      window.Echo.connector.socket.on("connect", () => {
        setConnectionStatus("connected");
        console.log("Connected to WebSocket");
      });

      window.Echo.connector.socket.on("disconnect", () => {
        setConnectionStatus("disconnected");
        console.log("Disconnected from WebSocket");
      });

      window.Echo.connector.socket.on("reconnecting", () => {
        setConnectionStatus("reconnecting");
        console.log("Reconnecting to WebSocket");
      });
    }
  }, [echoInitialized]);
  // Initialize Echo when session is available
  useEffect(() => {
    const initializeEcho = async () => {
      if (session?.accessToken && !echoInitialized) {
        try {
          await initEcho();
          setEchoInitialized(true);
        } catch (error) {
          console.error("Failed to initialize Echo:", error);
        }
      }
    };

    initializeEcho();
  }, [session, echoInitialized]);

  // Initialize Echo listeners when selected contact changes
  useEffect(() => {
    if (echoInitialized && selectedContact?.id && window.Echo) {
      initializeEchoListeners();
    }

    return () => {
      if (selectedContact?.id && window.Echo) {
        cleanupEchoListeners();
      }
    };
  }, [selectedContact, echoInitialized]);

  const initializeEchoListeners = () => {
    if (!selectedContact?.id || !window.Echo) return;

    try {
      // Listen for new messages
      window.Echo.private(`chat.${selectedContact.id}`)
        .listen("MessageSent", (e) => {
          console.log("New message received:", e);
          handleNewMessage(e.message);
        })
        .listen("MessageRead", (e) => {
          console.log("Message read:", e);
          handleMessageRead(e.messageIds, e.userId);
        })
        .listenForWhisper("typing", (e) => {
          console.log("User typing:", e);
          handleUserTyping(e.user);
        })
        .listenForWhisper("stop-typing", (e) => {
          console.log("User stopped typing:", e);
          handleUserStopTyping(e.user);
        });

      console.log(`Listening to channel: chat.${selectedContact.id}`);
    } catch (error) {
      console.error("Error setting up Echo listeners:", error);
    }
  };

  const cleanupEchoListeners = () => {
    if (selectedContact?.id && window.Echo) {
      try {
        window.Echo.leave(`chat.${selectedContact.id}`);
        console.log(`Left channel: chat.${selectedContact.id}`);
      } catch (error) {
        console.error("Error leaving channel:", error);
      }
    }
  };

  const handleNewMessage = (message) => {
    setMessages((prev) => {
      // Avoid duplicates
      if (prev.find((m) => m.id === message.id)) return prev;
      return [...prev, message];
    });

    // Auto-mark as read if it's not our message
    if (message.sender_id !== currentUser?.id) {
      markAsRead([message.id]);
    }
  };

  const handleMessageRead = (messageIds, userId) => {
    setMessages((prev) =>
      prev.map((msg) =>
        messageIds.includes(msg.id) && msg.sender_id === currentUser?.id
          ? { ...msg, status: "read" }
          : msg
      )
    );
  };

  const handleUserTyping = (user) => {
    setIsTyping(true);
    if (onTypingStart) {
      onTypingStart(user);
    }
  };

  const handleUserStopTyping = (user) => {
    setIsTyping(false);
    if (onTypingStop) {
      onTypingStop(user);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Handle typing indicators
  const handleInputChange = (e) => {
    setNewMessage(e.target.value);

    // Notify others that user is typing
    if (selectedContact?.id && window.Echo) {
      window.Echo.private(`chat.${selectedContact.id}`).whisper("typing", {
        user: currentUser,
      });

      // Clear existing timeout
      if (typingTimeout) {
        clearTimeout(typingTimeout);
      }

      // Set new timeout to stop typing indicator
      const timeout = setTimeout(() => {
        if (window.Echo) {
          window.Echo.private(`chat.${selectedContact.id}`).whisper(
            "stop-typing",
            { user: currentUser }
          );
        }
        setIsTyping(false);
      }, 1000);

      setTypingTimeout(timeout);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedContact) return;

    // Clear typing indicator
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }
    if (window.Echo && selectedContact?.id) {
      window.Echo.private(`chat.${selectedContact.id}`).whisper("stop-typing", {
        user: currentUser,
      });
    }

    const tempMessage = {
      id: `temp-${Date.now()}`,
      message: newMessage,
      sender_id: currentUser?.id,
      receiver_id: selectedContact.id,
      created_at: new Date().toISOString(),
      status: "sent",
      is_temp: true,
    };

    // Optimistically add message
    setMessages((prev) => [...prev, tempMessage]);
    setNewMessage("");

    try {
      if (onSendMessage) {
        await onSendMessage({
          message: newMessage,
          receiver_id: selectedContact.id,
        });
      } else {
        // Fallback: Send via API
        const response = await fetch("/api/messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN":
              document.querySelector('meta[name="csrf-token"]')?.content || "",
          },
          body: JSON.stringify({
            message: newMessage,
            receiver_id: selectedContact.id,
          }),
        });

        if (!response.ok) {
          throw new Error("Failed to send message");
        }

        const sentMessage = await response.json();

        // Replace temp message with real one
        setMessages((prev) =>
          prev.map((msg) => (msg.id === tempMessage.id ? sentMessage : msg))
        );
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      // Mark message as failed
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === tempMessage.id ? { ...msg, status: "failed" } : msg
        )
      );
    }
  };

  const markAsRead = async (messageIds) => {
    if (!messageIds.length || !selectedContact) return;

    try {
      if (onMessageRead) {
        await onMessageRead(messageIds);
      } else {
        // Fallback: Mark via API
        await fetch("/api/messages/mark-read", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-TOKEN":
              document.querySelector('meta[name="csrf-token"]')?.content || "",
          },
          body: JSON.stringify({
            message_ids: messageIds,
          }),
        });
      }

      // Notify via Echo
      if (window.Echo && selectedContact?.id) {
        // This would typically be handled by the server broadcasting the MessageRead event
      }
    } catch (error) {
      console.error("Failed to mark messages as read:", error);
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();

    if (date.toDateString() === today.toDateString()) {
      return "Today";
    }

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    }

    return date.toLocaleDateString();
  };

  const getStatusIcon = (status, isTemp = false) => {
    if (isTemp) {
      return (
        <svg
          className="w-4 h-4 text-color-alpha-40 animate-pulse"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
            clipRule="evenodd"
          />
        </svg>
      );
    }

    switch (status) {
      case "sent":
        return (
          <svg
            className="w-4 h-4 text-color-alpha-40"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "delivered":
        return (
          <svg
            className="w-4 h-4 text-color-Primary-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "read":
        return (
          <svg
            className="w-4 h-4 text-color-Primary-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
        );
      case "failed":
        return (
          <svg
            className="w-4 h-4 text-color-error-main"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  // Group messages by date
  const groupedMessages = messages.reduce((groups, message) => {
    const date = new Date(message.created_at).toDateString();
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(message);
    return groups;
  }, {});

  const isUserMessage = (message) => {
    return message.sender_id === currentUser?.id;
  };

  const getSenderName = (message) => {
    if (isUserMessage(message)) return currentUser?.name;
    return selectedContact?.name || message.sender_name;
  };

  const getAvatar = (message) => {
    if (isUserMessage(message))
      return currentUser?.avatar || currentUser?.name?.charAt(0);
    return selectedContact?.avatar || selectedContact?.name?.charAt(0);
  };

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-screen bg-color-chat-background dark:bg-color-Gray-50">
        <div className="text-center">
          <div className="text-color-Text-Secondary dark:text-color-Gray-400">
            Please log in to use the chat
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-surface rounded-md border border-default-divider">
      {/* Sidebar */}
      <div className="w-full lg:max-w-80 max-w-22 bg-color-chat-side dark:bg-color-Surface-2 border-r border-color-default-divider flex flex-col">
        {/* Header */}
        <div className="px-4 py-6 border-b border-default-divider ">
          <div className="flex items-center justify-between">
            <h1 className="text-xl hidden lg:block font-semibold text-color-Text-Primary dark:text-color-Text-Secondary">
              Reera Chat
            </h1>
            <div className="flex items-center space-x-3">
              <button className="p-2 cursor-pointer rounded-full hover:bg-color-alpha-10 dark:hover:bg-color-alpha-20 transition-colors">
                <svg
                  className="w-5 h-5 text-color-Text-Primary dark:text-color-Text-Secondary"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Contacts List */}
        <div className="flex-1 overflow-y-auto scrollbar-hide">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`flex items-center p-3 border-b border-color-default-divider hover:bg-color-alpha-10 dark:hover:bg-color-alpha-20 cursor-pointer transition-colors ${
                selectedContact?.id === contact.id
                  ? "bg-color-Primary-50 dark:bg-color-Primary-900"
                  : ""
              }`}
              onClick={() => setSelectedContact(contact)}
            >
              <div className="relative">
                <div className="w-12 h-12 bg-color-Primary-400 rounded-full flex items-center justify-center text-white font-semibold">
                  {contact.avatar || contact.name.charAt(0)}
                </div>
                {contact.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-color-success-main border-2 border-white dark:border-color-Surface-2 rounded-full"></div>
                )}
              </div>
              <div className="ml-3 flex-1">
                <div className="flex justify-between items-start">
                  <h3 className="font-medium text-color-Text-Primary dark:text-color-Text-Secondary">
                    {contact.name}
                  </h3>
                  {contact.last_message && (
                    <span className="text-xs text-color-Text-Secondary dark:text-color-Gray-400">
                      {formatTime(contact.last_message.created_at)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-color-Text-Secondary dark:text-color-Gray-400 truncate">
                  {contact.online ? "Online" : "Last seen recently"}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        {selectedContact && (
          <>
            <div className="p-4 border-b border-default-divider bg-surface">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-14 h-14 bg-color-Primary-400  flex items-center justify-center text-alpha-10 font-semibold border rounded-full">
                    {selectedContact.avatar || selectedContact.name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h2 className="font-semibold text-color-Text-Primary dark:text-color-Text-Secondary">
                      {selectedContact.name}
                    </h2>
                    <p className="text-sm text-color-Text-Secondary dark:text-color-Gray-400">
                      {isOnline ? "online" : "last seen recently"}
                      {isTyping && " • typing..."}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="p-2 rounded-full hover:bg-color-alpha-10 dark:hover:bg-color-alpha-20 transition-colors">
                    <svg
                      className="w-5 h-5 text-color-Text-Primary dark:text-color-Text-Secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 bg-color-chat-background dark:bg-color-Gray-50 scrollbar-hide">
              {Object.entries(groupedMessages).map(([date, dateMessages]) => (
                <div key={date}>
                  {/* Date separator */}
                  <div className="flex justify-center my-4">
                    <div className="bg-color-alpha-20 dark:bg-color-alpha-40 px-3 py-1 rounded-full">
                      <span className="text-xs text-color-Text-Secondary dark:text-color-Gray-400">
                        {formatDate(date)}
                      </span>
                    </div>
                  </div>

                  {/* Messages */}
                  {dateMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex mb-4 ${
                        isUserMessage(message) ? "justify-end" : "justify-start"
                      }`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md xl:max-w-lg 2xl:max-w-xl ${
                          isUserMessage(message) ? "order-2" : "order-1"
                        }`}
                      >
                        <div
                          className={`rounded-2xl px-4 py-2 ${
                            isUserMessage(message)
                              ? "bg-color-chat-user dark:bg-color-Primary-300 rounded-br-md"
                              : "bg-white dark:bg-color-surface rounded-bl-md border border-color-default-divider"
                          } ${message.status === "failed" ? "opacity-70" : ""}`}
                        >
                          {!isUserMessage(message) && (
                            <div className="text-xs font-medium text-color-Primary-400 mb-1">
                              {getSenderName(message)}
                            </div>
                          )}
                          <p className="text-color-Text-Primary dark:text-color-Text-Secondary text-sm">
                            {message.message}
                          </p>
                          <div
                            className={`flex items-center justify-end space-x-1 mt-1 ${
                              isUserMessage(message)
                                ? "text-color-Text-Secondary"
                                : "text-color-Gray-500"
                            }`}
                          >
                            <span className="text-xs">
                              {formatTime(message.created_at)}
                            </span>
                            {isUserMessage(message) && message.status && (
                              <div className="flex items-center">
                                {getStatusIcon(message.status, message.is_temp)}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-default-divider bg-surface">
              <form
                onSubmit={handleSendMessage}
                className="flex items-center space-x-3"
              >
                <button
                  type="button"
                  className="p-2 rounded-full hover:bg-color-alpha-10 dark:hover:bg-color-alpha-20 transition-colors"
                >
                  <svg
                    className="w-6 h-6 text-color-Text-Primary dark:text-color-Text-Secondary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                    />
                  </svg>
                </button>

                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={handleInputChange}
                    placeholder="Message..."
                    className="w-full bg-color-Comments dark:bg-color-Surface-2 border border-color-Text-Field rounded-full py-3 px-4 text-color-Text-Primary dark:text-color-Text-Secondary placeholder-color-Gray-500 focus:outline-none focus:ring-2 focus:ring-color-Primary-400 focus:border-transparent"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 rounded-full hover:bg-color-alpha-10 dark:hover:bg-color-alpha-20 transition-colors"
                  >
                    <svg
                      className="w-5 h-5 text-color-Text-Primary dark:text-color-Text-Secondary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!newMessage.trim() || !selectedContact}
                  className="p-3 bg-color-Primary-400 text-white rounded-full hover:bg-color-Primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </>
        )}

        {/* No Chat Selected */}
        {!selectedContact && (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="text-color-Text-Secondary dark:text-color-Gray-400 mb-2">
                Select a chat to start messaging
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyChatComponent;
