import React, { useRef, useEffect } from 'react';
import Spinner from "@/components/Spinner";
import MessageItem from "./MessageItem";

const MessageList = ({ messages, isLoading, isError, chatDetails, locale}) => {
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    return (
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {isLoading ? (
                <div className="flex items-center justify-center py-8"><Spinner /></div>
            ) : isError ? (
                <div className="text-center text-red-500 py-8">خطا در بارگذاری پیام‌ها</div>
            ) : messages.length === 0 ? (
                <div className="text-center text-Gray-500 py-8">هنوز پیامی ارسال نشده است</div>
            ) : (
                <>
                    {messages.map((msg) => (
                        <MessageItem key={msg.id} msg={msg} chatDetails={chatDetails} locale={locale} />
                    ))}
                    <div ref={messagesEndRef} />
                </>
            )}
        </div>
    );
};

export default MessageList;