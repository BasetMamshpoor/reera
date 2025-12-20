"use client";

import React, { useState } from "react";
import ChatListSidebar from "@/app/[locale]/(public)/chat/_components/ChatListSidebar";
import ChatWindow from "@/app/[locale]/(public)/chat/_components/ChatWindow";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
const Details = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [sort, setSort] = useState("no_seen");

    // حالت موبایل: فقط وقتی چت انتخاب شده، چت نشون بده
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

    const { data: chatsData, isLoading: chatsLoading } = useQuery({
        queryKey: ["chats", sort],
        queryFn: async () => {
            const res = await request({
                method: "get",
                url: "/chat",
                query: { sort },
            });
            return res.data; // آرایه چت‌ها
        },
    });

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setIsMobileChatOpen(true); // در موبایل وارد صفحه چت شو
    };

    const handleBackToList = () => {
        setIsMobileChatOpen(false);
    };

    return (
        <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-surface rounded-xl">
            {/* لیست چت‌ها */}
            <div
                className={`
          w-full md:w-1/4 bg-surface
          ${isMobileChatOpen ? 'hidden md:block' : 'block'}
        `}
            >
                <ChatListSidebar
                    data={chatsData || []}
                    isLoading={chatsLoading}
                    sort={sort}
                    setSort={setSort}
                    selectedChatId={selectedChat?.id}
                    onSelectChat={handleSelectChat}
                />
            </div>

            {/* صفحه چت یا پیام پیش‌فرض */}
            <div
                className={`
          flex-1
          ${!isMobileChatOpen ? 'hidden md:flex' : 'flex'}
          flex-col
        `}
            >
                {selectedChat ? (
                    <>
                        <div className="flex-1">
                            <ChatWindow  handleBackToList={handleBackToList} selectedChat={selectedChat} />
                        </div>
                    </>
                ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center bg-surface">
                        <p className="text-Gray-500 text-lg">یک چت را برای شروع گفتگو انتخاب کنید</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;