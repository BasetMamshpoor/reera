'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";

const ChatListSidebar = ({
                             onSelectChat,
                             selectedChatId,
                             setSort,
                             sort,
                             data,
                             isLoading,
                             isError,
                         }) => {

    return (
        <div className="h-screen bg-surface flex flex-col">
            {/* هدر */}
            <div className="border-b border-Gray-200 px-4 pt-4 pb-2">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-lg font-bold text-Gray-800">چت و تماس</h2>
                    <button className="text-Gray-500 hover:text-Gray-700">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                            />
                        </svg>
                    </button>
                </div>

                {/* فیلترها */}
                <div className="py-4 ">
                    <Tabs defaultValue={sort} onValueChange={setSort} className="w-full">
                        <TabsList className="flex items-center gap-2 w-full h-auto bg-transparent p-0 overflow-x-auto scrollbar-hide">
                            <TabsTrigger
                                value="no_seen"
                                className="rounded-xl cursor-pointer  p-2 data-[state=active]:bg-Primary-500 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:border data-[state=inactive]:border-Gray-300 data-[state=inactive]:text-Gray-700 hover:bg-Gray-100 transition"
                            >
                                خوانده نشده
                            </TabsTrigger>
                            <TabsTrigger
                                value="my_ads"
                                className="rounded-xl cursor-pointer p-2 data-[state=active]:bg-Primary-500 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:border data-[state=inactive]:border-Gray-300 data-[state=inactive]:text-Gray-700 hover:bg-Gray-100 transition"
                            >
                                آگهی‌های من
                            </TabsTrigger>
                            <TabsTrigger
                                value="other_ads"
                                className="rounded-xl cursor-pointer p-2 data-[state=active]:bg-Primary-500 data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:border data-[state=inactive]:border-Gray-300 data-[state=inactive]:text-Gray-700 hover:bg-Gray-100 transition"
                            >
                                آگهی‌های دیگران
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>
            </div>

            {/* لیست چت‌ها */}
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-Gray-500">در حال بارگذاری...</p>
                    </div>
                ) : isError ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-red-500">خطا در بارگذاری چت‌ها</p>
                    </div>
                ) : data?.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-Gray-500">هیچ چتی یافت نشد</p>
                    </div>
                ) : (
                    data.map((chat) => (
                        <div
                            key={chat.id}
                            onClick={() => onSelectChat(chat)}
                            className={`px-4 py-4 border-b border-Gray-100 hover:bg-Gray-50 cursor-pointer transition ${
                                selectedChatId === chat.id ? 'bg-Primary-50' : ''
                            }`}
                        >
                            <div className="flex flex-col gap-3">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-Gray-800 text-sm">{chat.name}</p>
                                            {chat.hasUnread && (
                                                <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0" />
                                            )}
                                        </div>
                                        <p className="text-xs text-Gray-600 mt-1 line-clamp-2">
                                            {chat.last_message}
                                        </p>
                                    </div>
                                    <span className="text-xs text-Gray-400 whitespace-nowrap">
                                      {chat.created_at}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-12 h-12 bg-Gray-200 rounded-lg border-2 border-dashed border-Gray-300 flex items-center justify-center flex-shrink-0">
                                        <Image
                                            src={chat.image}
                                            alt="image"
                                            width={48}
                                            height={48}
                                            className="rounded-lg object-cover"
                                        />
                                    </div>
                                    <p className="text-sm font-medium text-Primary-600">{chat.ads_name}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ChatListSidebar;