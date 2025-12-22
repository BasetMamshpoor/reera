'use client';

import React, {useState, useRef, useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {request} from '@/lib/api';
import Image from 'next/image';
import Icon from "@/assets/icons/profile.svg";
import Dot from "@/assets/icons/more.svg";
import Link from "next/link";
import Spinner from "@/components/Spinner";
import {toast} from "sonner";
import Paperclip from "@/assets/icons/paperclip.svg"
import Arrow from "@/assets/icons/arrow-left.svg"
import {Mic} from "lucide-react";
import Trash from "@/assets/icons/trash.svg";
import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import ModalReports from "./ModalReports";
import ModalBlock from "./ModalBlock";
import {Check} from "lucide-react";
import {CheckCheck} from "lucide-react";
import VoicePlayer from "@/app/[locale]/(public)/chat/_components/VoicePlayer";

const ChatWindow = ({selectedChat, locale, handleBackToList}) => {
    const [messageText, setMessageText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [recordedVoice, setRecordedVoice] = useState(null);     // ویس ضبط‌شده
    const [voiceDuration, setVoiceDuration] = useState(0);        // مدت زمان ویس

    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isCanceling, setIsCanceling] = useState(false);

    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);
    const touchStartX = useRef(0);

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
        mutationFn: async ({text, file, voice}) => {
            const formData = new FormData();
            if (text) formData.append('message', text);
            if (file) formData.append('file', file);
            if (voice) formData.append('voice', voice, 'voice.ogg');

            return await request({
                method: "post",
                url: `/chat/send/${selectedChat?.id}`,
                data: formData,
            });
        },
        onSuccess: (data) => {
            toast.success(data?.message || "پیام ارسال شد");
            setMessageText('');
            setSelectedFile(null);
            setRecordedVoice(null);
            setVoiceDuration(0);
            refetch();
        },
        onError: (error) => {
            toast.error(error?.response?.data?.message || "خطا در ارسال");
        },
    });

    const messages = chatDetails?.data || [];
    const isBlocked = chatDetails?.status === "blocked";
    const isSending = mutation.isPending;

    // ------------------- ضبط ویس -------------------
    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({audio: true});
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => audioChunksRef.current.push(e.data);

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, {type: 'audio/ogg; codecs=opus'});
                setRecordedVoice(audioBlob);
                setVoiceDuration(recordingTime);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setRecordingTime(0);
            setIsCanceling(false);

            timerRef.current = setInterval(() => {
                setRecordingTime(prev => prev + 1);
            }, 1000);
        } catch (err) {
            toast.error("دسترسی به میکروفون داده نشد");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            clearInterval(timerRef.current);
            setIsRecording(false);
            setIsCanceling(false);
        }
    };

    const cancelRecording = () => {
        stopRecording();
        setRecordedVoice(null);
        setVoiceDuration(0);
        audioChunksRef.current = [];
        // toast.info("ضبط لغو شد");
    };

    const handleMicTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
        startRecording();
    };

    const handleMicTouchMove = (e) => {
        if (!isRecording) return;
        const diff = touchStartX.current - e.touches[0].clientX;
        setIsCanceling(diff > 80);
    };

    const handleMicTouchEnd = (e) => {
        if (!isRecording) return;
        const diff = touchStartX.current - e.changedTouches[0].clientX;
        if (diff > 80) {
            cancelRecording();
        } else {
            stopRecording(); // فقط ضبط رو متوقف کن، ارسال نکن
        }
    };

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    // ------------------- ارسال دستی -------------------
    const handleSend = () => {
        const text = messageText.trim();

        if (!text && !selectedFile && !recordedVoice) {
            toast.info("پیام، فایل یا ویسی برای ارسال وارد کنید");
            return;
        }

        if (isBlocked) {
            toast.error("این گفتگو مسدود شده است");
            return;
        }

        mutation.mutate({
            text: text || undefined,
            file: selectedFile || undefined,
            voice: recordedVoice || undefined
        });
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


    const messagesEndRef = useRef(null); // رف برای آخرین پیام

    // تابع اسکرول به پایین
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
    };

    // اسکرول به پایین وقتی پیام‌ها لود شدن
    useEffect(() => {
        if (!isLoading && messages.length > 0) {
            scrollToBottom();
        }
    }, [isLoading, messages]); // وقتی پیام‌ها لود شدن یا تغییر کردن

    // اسکرول به پایین بعد از ارسال موفق پیام
    useEffect(() => {
        if (mutation.isSuccess) {
            scrollToBottom();
        }
    }, [mutation.isSuccess]);

    if (!selectedChat) {
        return (
            <div className="h-full flex items-center justify-center bg-Surface-2">
                <p className="text-Gray-500 text-lg">یک چت را برای شروع گفتگو انتخاب کنید</p>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col gap-10 bg-Surface-2 overflow-hidden shadow-xl">
            {/* هدر و آگهی */}
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full bg-surface p-6">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleBackToList}
                            className="text-Gray-700 hover:text-gray-900 md:hidden"
                        >
                            <Arrow className="w-6 h-6 rtl:rotate-180 fill-Primary-600 cursor-pointer"/>
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
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}><ModalReports/></DropdownMenuItem>
                            <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                <ModalBlock refetch={refetch} id={chatDetails?.id} status={chatDetails?.status}/>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="flex items-center gap-4 p-8 bg-Surface-2 border-b border-b-Gray-500">
                    <Image src={chatDetails?.ads_image} alt="image" width={48} height={48} className="object-cover"/>
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
                    <>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                className={`flex gap-4 ${msg.is_mine ? 'justify-start' : 'justify-end'}`}
                            >
                                <div className="flex flex-col gap-2">
                                    <div
                                        className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${
                                            msg.is_mine ? 'bg-Primary-400 text-white' : 'bg-Gray-100 text-Gray-900'
                                        }`}
                                    >
                                        {/* نمایش ویس */}
                                        {msg.voice && (
                                            <div className="flex items-center gap-3 bg-black/10 rounded-xl p-3">
                                                <VoicePlayer audioUrl={msg.voice} duration="00:11" size="43.7 KB"
                                                             time={msg.created_at} isMine={msg.is_mine}/>
                                            </div>
                                        )}

                                        {/* فایل */}
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
                                                        className="flex items-center gap-2 text-Primary-600 underline"
                                                    >
                                                        <Paperclip className="w-5 h-5 "/>
                                                        <span className="text-sm text-white">دانلود فایل</span>
                                                    </a>
                                                )}
                                            </div>
                                        )}

                                        {/* متن */}
                                        {msg.message && (
                                            <p className="text-sm leading-relaxed">{msg.message}</p>
                                        )}
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {!!msg.is_mine &&
                                            (!!msg.is_seen ?
                                                <CheckCheck className="w-4 h-4 text-white"/> :
                                                <Check className="w-4 h-4 text-white"/>)
                                        }
                                        <span
                                            className={`text-xs block mt-2 text-right ${
                                                msg.is_mine ? 'text-white' : 'text-Gray-500'
                                            }`}
                                        >
                                        {msg.created_at}
                                    </span>
                                    </div>

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
                        ))}
                        <div ref={messagesEndRef}/>
                    </>
                )}
            </div>

            {/* ورودی + سه دکمه */}
            <div className="p-4 bg-surface">
                {isBlocked ? (
                    <div className="text-center text-red-600 font-medium">
                        امکان ارسال پیام وجود ندارد (گفتگو مسدود شده)
                    </div>
                ) : (
                    <div className="flex items-center gap-2 relative">
                        <input
                            ref={fileInputRef}
                            type="file"
                            onChange={handleFileSelect}
                            className="hidden"
                            accept="image/*,.pdf,.doc,.docx,.txt"
                        />
                        <div className="relative w-full">

                            {/* پیش‌نمایش فایل */}
                            {selectedFile && (
                                <div
                                    className="absolute -top-10 flex p-2 items-center gap-3 text-sm text-Gray-700 bg-surface rounded-lg shadow">
                                    <Paperclip className="w-5 h-5"/>
                                    <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                                    <button
                                        onClick={() => setSelectedFile(null)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        حذف
                                    </button>
                                </div>
                            )}

                            {/* پیش‌نمایش ویس ضبط‌شده */}
                            {recordedVoice && (
                                <div
                                    className="absolute -top-10 flex p-2 items-center gap-3 text-sm text-Gray-700 bg-surface rounded-lg shadow">
                                    <Mic className="w-5 h-5"/>
                                    <span>ویس ({formatTime(voiceDuration)})</span>
                                    <button
                                        onClick={() => {
                                            setRecordedVoice(null);
                                            setVoiceDuration(0);
                                        }}
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
                                disabled={isSending || isRecording}
                                className="w-full pl-12 pr-5 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-blue-500 text-sm disabled:opacity-60"
                            />
                        </div>

                        <div className="flex items-center gap-4">
                            {/* دکمه پیوست فایل */}
                            <button
                                onClick={triggerFileInput}
                                className="cursor-pointer text-Gray-600 hover:text-Primary-600 transition z-10"
                                disabled={isSending || isRecording}
                            >
                                <Paperclip className="w-6 h-6 fill-Gray-950"/>
                            </button>

                            {/* دکمه ویس - فقط وقتی هیچ محتوایی نیست */}
                            {!messageText.trim() && !selectedFile && !recordedVoice && (
                                <div className="relative"
                                     onTouchStart={handleMicTouchStart}
                                     onTouchMove={handleMicTouchMove}
                                     onTouchEnd={handleMicTouchEnd}
                                     onMouseDown={startRecording}
                                     onMouseUp={stopRecording}
                                     onMouseLeave={cancelRecording}
                                >
                                    <button
                                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                                            isRecording ? 'bg-red-500 scale-110' : 'bg-Primary-400'
                                        }`}
                                    >
                                        <Mic className="w-7 h-7"/>
                                    </button>

                                    {isRecording && (
                                        <div
                                            className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full flex items-center gap-4 whitespace-nowrap">
                                            {isCanceling ? (
                                                <>
                                                    <Trash className="w-6 h-6 fill-red-500"/>
                                                    <span className="font-medium">لغو ضبط</span>
                                                </>
                                            ) : (
                                                <>
                                                    <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"></div>
                                                    <span className="font-medium">{formatTime(recordingTime)}</span>
                                                    <span className="text-sm opacity-70">← برای لغو بکشید</span>
                                                </>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}

                            {/* دکمه ارسال - وقتی محتوایی وجود داره */}
                            {(messageText.trim() || selectedFile || recordedVoice) && (
                                <button
                                    onClick={handleSend}
                                    disabled={isSending}
                                    className="cursor-pointer bg-Primary-400 text-white px-7 py-3 rounded-full hover:bg-Primary-600 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSending ? 'ارسال...' : 'ارسال'}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;