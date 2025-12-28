"use client";

import React, { useState, useEffect } from "react";
import ChatListSidebar from "@/app/[locale]/(public)/chat/_components/ChatListSidebar";
import ChatWindow from "@/app/[locale]/(public)/chat/_components/ChatWindow";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useParams, useSearchParams } from "next/navigation";

const Details = () => {
    const [selectedChat, setSelectedChat] = useState(null);
    const [sort, setSort] = useState("no_seen");
    const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

    const { locale } = useParams();
    const searchParams = useSearchParams();
    const countryId = searchParams.get("country_id");

    const { data: chatsData, isLoading: chatsLoading } = useQuery({
        queryKey: ["chats", sort],
        queryFn: async () => {
            const res = await request({
                method: "get",
                url: "/chat",
                query: { sort },
            });
            return res.data;
        },
    });

    const handleSelectChat = (chat) => {
        setSelectedChat(chat);
        setIsMobileChatOpen(true);
    };

    const handleBackToList = () => {
        setIsMobileChatOpen(false);
    };

    // اگر چت جهانی بود، تو موبایل مستقیم باز بشه
    useEffect(() => {
        if (countryId) {
            setIsMobileChatOpen(true);
        }
    }, [countryId]);

    return (
        <div className="h-screen overflow-hidden flex flex-col md:flex-row bg-surface rounded-xl">
            {/* لیست چت‌ها */}
            <div
                className={`w-full md:w-1/4 bg-surface ${
                    isMobileChatOpen ? "hidden md:block" : "block"
                }`}
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

            <div
                className={`flex-1 ${
                    !isMobileChatOpen ? "hidden md:flex" : "flex"
                } flex-col w-full`}
            >
                {countryId || selectedChat ? (
                    <ChatWindow
                        countryId={countryId}
                        selectedChat={selectedChat}
                        locale={locale}
                        handleBackToList={handleBackToList}
                    />
                ) : (
                    <div className="hidden md:flex flex-1 items-center justify-center bg-surface">
                        <p className="text-Gray-500 text-lg">
                            یک چت را برای شروع گفتگو انتخاب کنید
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Details;
