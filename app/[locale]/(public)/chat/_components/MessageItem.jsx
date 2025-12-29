import React from 'react';
import Image from 'next/image';
import Link from "next/link";
import Icon from "@/assets/icons/profile.svg";
import Paperclip from "@/assets/icons/paperclip.svg";
import VoicePlayer from "./VoicePlayer";
import { Check, CheckCheck } from "lucide-react";

const MessageItem = ({ msg, chatDetails, locale }) => (
    <div className={`flex gap-4 ${msg.is_mine ? 'justify-start' : 'justify-end'}`}>
        <div className="flex flex-col gap-2">
            <div className={`max-w-xs px-4 py-3 rounded-2xl shadow-sm ${msg.is_mine ? 'bg-Primary-400 text-white' : 'bg-Gray-100 text-Gray-900'}`}>
                {msg.voice && (
                    <div className="flex items-center gap-3 bg-black/10 rounded-xl p-3">
                        <VoicePlayer audioUrl={msg.voice} duration="00:11" size="43.7 KB" time={msg.created_at} isMine={msg.is_mine} />
                    </div>
                )}
                {msg.file && (
                    <div className="mb-3">
                        {msg.file_type?.startsWith('image/') ? (
                            <Image src={msg.file} alt="فایل" width={200} height={200} className="rounded-lg object-cover max-w-full" />
                        ) : (
                            <a href={msg.file} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-Primary-600 underline">
                                <Paperclip className="w-5 h-5" />
                                <span className="text-sm text-white">دانلود فایل</span>
                            </a>
                        )}
                    </div>
                )}
                {msg.message && <p className="text-sm leading-relaxed">{msg.message}</p>}
            </div>

            <div className="flex items-center gap-2">
                {!!msg.is_mine && (msg.is_seen ? <CheckCheck className="w-4 h-4 text-white" /> : <Check className="w-4 h-4 text-white" />)}
                <span className={`text-xs ${msg.is_mine ? 'text-white' : 'text-Gray-500'}`}>{msg.created_at}</span>
            </div>
        </div>

        {!msg.is_mine && (
            <Link href={`/${locale}/register-ad/seller/${chatDetails?.user_id}`} className="w-14 h-14 shadow-sm bg-surface rounded-full overflow-hidden flex items-center justify-center">
                {!!chatDetails?.profile ? (
                    <Image src={chatDetails.profile} alt="پروفایل" width={56} height={56} className="object-cover" />
                ) : (
                    <Icon className="!w-10 !h-10 fill-Gray-800" />
                )}
            </Link>
        )}
    </div>
);

export default MessageItem;