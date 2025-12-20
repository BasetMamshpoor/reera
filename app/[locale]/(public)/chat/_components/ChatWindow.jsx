'use client';

import React, {useState, useRef} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {request} from '@/lib/api';
import Image from 'next/image';
import {format} from 'date-fns';
import Icon from "@/assets/icons/profile.svg";
import Dot from "@/assets/icons/more.svg";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import {toast} from "sonner";
import Paperclip from "@/assets/icons/paperclip.svg"
import Arrow from "@/assets/icons/arrow-left.svg"
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import ModalReports from "./ModalReports";

const ChatWindow = ({selectedChat, locale, handleBackToList}) => {
    const [messageText, setMessageText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const {data: chatDetails, isLoading, isError, refetch} = useQuery({
        queryKey: ["chat-messages", selectedChat?.id],
        queryFn: async () => {
            return await request({
                method: "get",
                url: `/chat/${selectedChat.id}`,
            });
        },
        enabled: !!selectedChat?.id,
    });

    const mutation = useMutation({
        mutationFn: async ({text, file}) => {
            const formData = new FormData();
            if (text) formData.append('message', text);
            if (file) formData.append('file', file);

            return await request({
                method: "post",
                url: `/chat/send/${selectedChat?.id}`,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}, // مهم: برای فایل
            });
        },
        onSuccess: (data) => {
            toast.success(data?.message || "پیام ارسال شد");
            setMessageText('');
            setSelectedFile(null);
            refetch();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "خطا در ارسال");
        },
    });

    const messages = chatDetails?.data || [];
    const isBlocked = chatDetails?.status === "blocked";
    const isSending = mutation.isPending;

    const handleSend = () => {
        const text = messageText.trim();

        if (!text && !selectedFile) {
            toast.info("پیام یا فایلی برای ارسال وارد کنید");
            return;
        }

        if (isBlocked) {
            toast.error("این گفتگو مسدود شده است");
            return;
        }

        mutation.mutate({text, file: selectedFile});
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleFileSelect = (e) => {
        const file = e.target.files[0];
        if (file) {
            // محدودیت حجم دلخواه (مثلاً ۱۰ مگابایت)
            if (file.size > 10 * 1024 * 1024) {
                toast.error("حجم فایل بیش از ۱۰ مگابایت است");
                return;
            }
            setSelectedFile(file);
            toast.success(`فایل انتخاب شد: ${file.name}`);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    if (!selectedChat) {
        return (
            <div className="h-full flex items-center justify-center bg-Surface-2">
                <p className="text-Gray-500 text-lg">یک چت را برای شروع گفتگو انتخاب کنید</p>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col gap-10 bg-Surface-2 overflow-hidden shadow-xl">
            {/* هدر و آگهی - بدون تغییر */}
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full bg-surface p-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackToList}
                            className="text-Gray-700 hover:text-gray-900 md:hidden"
                        >
                            <Arrow
                                className="w-6 h-6 rtl:rotate-180 fill-Primary-600 cursor-pointer"/> {/* آیکون برگشت به چپ */}
                        </button>
                        <Link
                            href={`/${locale}/register-ad/seller/${chatDetails?.id}`}
                            className="w-14 h-14 bg-Surface-2 rounded-full overflow-hidden flex items-center justify-center"
                        >
                            {!!chatDetails?.profile ? (
                                <Image src={chatDetails.profile} alt="پروفایل" width={56} height={56}
                                       className="object-cover"/>
                            ) : (
                                <Icon className="!w-10 !h-10 fill-Gray-800"/>
                            )}
                        </Link>
                        <div>
                            <h3 className="font-semibold text-Gray-800">{chatDetails?.name}</h3>
                        </div>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger>
                            <Dot className="rotate-90 cursor-pointer fill-Primary-950"/>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {/*<DropdownMenuItem  onSelect={(e) => e.preventDefault()}><ModalReports/></DropdownMenuItem>*/}
                            {/*<DropdownMenuItem>Billing</DropdownMenuItem>*/}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-4 p-8 bg-Surface-2 border-b border-b-Gray-500">
                    <Image src={chatDetails?.ads_image} alt="آگهی" width={48} height={48} className="object-cover"/>
                    <h3 className="font-semibold text-Gray-800">{chatDetails?.ads_name}</h3>
                </div>
            </div>

            {/* لیست پیام‌ها */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {isLoading ? (
                    <div className="flex items-center justify-center py-8"><Spinner/></div>
                ) : isError ? (
                    <div className="text-center text-red-500 py-8">خطا در بارگذاری پیام‌ها</div>
                ) : messages.length === 0 ? (
                    <div className="text-center text-Gray-500 py-8">هنوز پیامی ارسال نشده است</div>
                ) : (
                    messages.map((msg) => (
                        <div
                            key={msg.id}
                            className={`flex gap-4 ${msg.is_mine ? 'justify-start' : 'justify-end'}`}
                        >
                            <div
                                className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                                    msg.is_mine ? 'bg-Primary-400 text-white' : 'bg-Gray-100 text-Gray-900'
                                }`}
                            >
                                {/* اگر فایل وجود داشت */}
                                {msg.file && (
                                    <div className="mb-3">
                                        {msg.file_type?.startsWith('image/') ? (
                                            <Image
                                                src={msg.file}
                                                alt="فایل ارسالی"
                                                width={200}
                                                height={200}
                                                className="rounded-lg object-cover max-w-full"
                                            />
                                        ) : (
                                            <a
                                                href={msg.file}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-600 underline"
                                            >
                                                <Paperclip className="w-5 h-5 "/>
                                                <span className="text-sm text-white">دانلود فایل</span>
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* متن پیام */}
                                {msg.message && (
                                    <p className="text-sm leading-relaxed">{msg.message}</p>
                                )}

                                <span
                                    className={`text-xs block mt-2 text-right ${
                                        msg.is_mine ? 'text-white' : 'text-Gray-500'
                                    }`}
                                >
                                  {msg.created_at ? format(new Date(msg.created_at), 'HH:mm') : ''}
                                </span>
                            </div>

                            {/* آواتار طرف مقابل */}
                            {!msg.is_mine && (
                                <Link
                                    href={`/${locale}/register-ad/seller/${chatDetails?.id}`}
                                    className="w-14 h-14 shadow-sm bg-surface rounded-full overflow-hidden flex items-center justify-center"
                                >
                                    {!!chatDetails?.profile ? (
                                        <Image src={chatDetails.profile} alt="پروفایل" width={56} height={56}
                                               className="object-cover"/>
                                    ) : (
                                        <Icon className="!w-10 !h-10 fill-Gray-800"/>
                                    )}
                                </Link>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* ورودی ارسال پیام + آیکون پیوست */}
            <div className="p-4 bg-surface">
                {isBlocked ? (
                    <div className="text-center text-red-600 font-medium">
                        امکان ارسال پیام وجود ندارد (گفتگو مسدود شده)
                    </div>
                ) : (
                    <div className="flex items-center gap-2 relative">

                        {/* ورودی مخفی فایل */}
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.txt"
                        />
                        <div className="relative w-full">

                            {selectedFile && (
                                <div className="absolute -top-8 flex p-2 items-center gap-3 text-sm text-Gray-700">
                                    <Paperclip className="w-5 h-5"/>
                                    <span>{selectedFile.name}</span>
                                    <button
                                        onClick={() => setSelectedFile(null)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        حذف
                                    </button>
                                </div>
                            )}
                            <input
                                type="text"
                                placeholder="پیام خود را بنویسید..."
                                value={messageText}
                                onChange={(e) => setMessageText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                disabled={isSending}
                                className="w-full pl-12 pr-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm disabled:opacity-60"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={triggerFileInput}
                                className=" cursor-pointer text-Gray-600 hover:text-Primary-600 transition z-10"
                                disabled={isSending}
                            >
                                <Paperclip className="w-6 h-6 fill-Gray-950"/>
                            </button>
                            <button
                                onClick={handleSend}
                                disabled={isSending || (!messageText.trim() && !selectedFile)}
                                className="cursor-pointer bg-Primary-400 text-white px-7 py-3 rounded-full hover:bg-Primary-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isSending ? 'ارسال...' : 'ارسال'}
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ChatWindow;