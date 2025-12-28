'use client';

import React from 'react';
import Paperclip from "@/assets/icons/paperclip.svg";
import { Mic } from "lucide-react";
import Trash from "@/assets/icons/trash.svg";

const MessageInput = ({
                          isGlobalChat, // جدید: آیا چت جهانی هست؟
                          messageText,
                          setMessageText,
                          selectedFile,
                          setSelectedFile,
                          recordedVoice,
                          setRecordedVoice,
                          voiceDuration,
                          isRecording,
                          setIsRecording,
                          recordingTime,
                          isCanceling,
                          fileInputRef,
                          isBlocked,
                          isSending,
                          handleSend,
                          handleKeyDown,
                          triggerFileInput,
                          handleFileSelect,
                          handleMicTouchStart,
                          handleMicTouchMove,
                          handleMicTouchEnd,
                          formatTime,
                          startRecording,
                          stopRecording,
                          cancelRecording,
                          setVoiceDuration,
                          setRecordingTime,
                          setIsCanceling
                      }) => {
    if (isBlocked) {
        return (
            <div className="bg-surface text-center text-red-600 font-medium py-4">
                امکان ارسال پیام وجود ندارد (گفتگو مسدود شده)
            </div>
        );
    }

    return (
        <div className="p-4 bg-surface">
            <div className="flex items-center gap-2 relative">
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,.pdf,.doc,.docx,.txt"
                />

                <div className="relative w-full">
                    {/* پیش‌نمایش فایل — فقط در چت خصوصی */}
                    {!isGlobalChat && selectedFile && (
                        <div className="absolute -top-10 flex p-2 items-center gap-3 text-sm text-Gray-700 bg-surface rounded-lg shadow">
                            <Paperclip className="w-5 h-5"/>
                            <span className="truncate max-w-[200px]">{selectedFile.name}</span>
                            <button onClick={() => setSelectedFile(null)} className="text-red-500 hover:text-red-700">
                                حذف
                            </button>
                        </div>
                    )}

                    {/* پیش‌نمایش ویس — فقط در چت خصوصی */}
                    {!isGlobalChat && recordedVoice && (
                        <div className="absolute -top-10 flex p-2 items-center gap-3 text-sm text-Gray-700 bg-surface rounded-lg shadow">
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
                    {/* دکمه پیوست فایل — فقط در چت خصوصی */}
                    {!isGlobalChat && (
                        <button
                            onClick={triggerFileInput}
                            disabled={isSending || isRecording}
                            className="text-Gray-600 hover:text-Primary-600"
                        >
                            <Paperclip className="w-6 h-6 fill-Gray-950"/>
                        </button>
                    )}

                    {/* دکمه ویس — فقط در چت خصوصی و وقتی اینپوت خالی باشه */}
                    {!isGlobalChat && !messageText.trim() && !selectedFile && !recordedVoice && (
                        <div
                            className="relative"
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
                                <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full flex items-center gap-4 whitespace-nowrap">
                                    {isCanceling ? (
                                        <>
                                            <Trash className="w-6 h-6 fill-red-500"/>
                                            <span className="font-medium">لغو ضبط</span>
                                        </>
                                    ) : (
                                        <>
                                            <div className="w-3 h-3 bg-red-500 rounded-full animate-ping"/>
                                            <span className="font-medium">{formatTime(recordingTime)}</span>
                                            <span className="text-sm opacity-70">← برای لغو بکشید</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* دکمه ارسال — همیشه وقتی متن وجود داره */}
                    {messageText.trim() && (
                        <button
                            onClick={handleSend}
                            disabled={isSending}
                            className="bg-Primary-400 text-white px-7 py-3 rounded-full hover:bg-Primary-600 font-medium disabled:opacity-50"
                        >
                            {isSending ? 'ارسال...' : 'ارسال'}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MessageInput;