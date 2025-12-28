'use client';

import React, {useState, useRef, useEffect} from 'react';
import {useMutation, useQuery} from '@tanstack/react-query';
import {request} from '@/lib/api';
import {toast} from "sonner";

import ChatHeader from "./ChatHeader";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const ChatWindow = ({selectedChat, locale, handleBackToList, countryId}) => {
    const [messageText, setMessageText] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [recordedVoice, setRecordedVoice] = useState(null);
    const [voiceDuration, setVoiceDuration] = useState(0);

    const [isRecording, setIsRecording] = useState(false);
    const [recordingTime, setRecordingTime] = useState(0);
    const [isCanceling, setIsCanceling] = useState(false);

    const fileInputRef = useRef(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);
    const timerRef = useRef(null);
    const touchStartX = useRef(0);

    // تعیین نوع چت و ID واقعی
    const isGlobalChat = !!countryId;
    const chatId = isGlobalChat ? countryId : selectedChat?.id;

    // اگر هیچ چتی انتخاب نشده باشه
    if (!chatId) {
        return (
            <div className="h-full flex items-center justify-center bg-Surface-2">
                <p className="text-Gray-500 text-lg">یک چت را برای شروع گفتگو انتخاب کنید</p>
            </div>
        );
    }

    // URLهای درست برای لود و ارسال پیام
    const messagesUrl = isGlobalChat ? `/group_chat/${countryId}` : `/chat/${chatId}`;
    const sendUrl = isGlobalChat ? `/group_chat/send` : `/chat/send/${chatId}`;

    const {data: chatDetails, isLoading, isError, refetch} = useQuery({
        queryKey: ["chat-messages", chatId],
        queryFn: async () => {
            const res = await request({method: "get", url: messagesUrl});
            return res; // فرض: res شامل data یا messages هست
        },
        enabled: !!chatId, // مهم: چه خصوصی چه جهانی، اجرا بشه
        refetchInterval: 5000,
    });

    const mutation = useMutation({
        mutationFn: async ({text, file, voice}) => {
            const formData = new FormData();
            if (text) formData.append('message', text);
            if (file) formData.append('file', file);
            if (voice) formData.append('voice', voice, 'voice.ogg');
            if (countryId) {formData.append('country_id', countryId);}
            return await request({method: "post", url: sendUrl, data: formData});
        },
        onSuccess: () => {
            toast.success("پیام ارسال شد");
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

    // استخراج پیام‌ها — بسته به ساختار API
    const messages = chatDetails?.data?.messages || chatDetails?.messages || chatDetails?.data || [];

    const isBlocked = chatDetails?.status === "blocked";
    const isSending = mutation.isPending;

    // نام چت برای نمایش در هدر
    const chatName = isGlobalChat
        ? `چت جهانی - کشور ${countryId}`
        : chatDetails?.name || "چت";

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
        toast.info("ضبط لغو شد");
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
            stopRecording();
        }
    };

    const formatTime = (seconds) => {
        const m = String(Math.floor(seconds / 60)).padStart(2, '0');
        const s = String(seconds % 60).padStart(2, '0');
        return `${m}:${s}`;
    };

    // ------------------- ارسال -------------------
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

    return (
        <div className="h-screen flex flex-col gap-10 bg-Surface-2 overflow-hidden shadow-xl">
            <ChatHeader
                refetch={refetch}
                chatDetails={{...chatDetails, name: chatName}}
                locale={locale}
                handleBackToList={handleBackToList}
                isGlobalChat={isGlobalChat}
            />

            <MessageList
                messages={messages}
                isLoading={isLoading}
                isError={isError}
                chatDetails={chatDetails}
                locale={locale}
                isGlobalChat={isGlobalChat}
            />

            <MessageInput
                isGlobalChat={isGlobalChat}
                messageText={messageText}
                setMessageText={setMessageText}
                selectedFile={selectedFile}
                setSelectedFile={setSelectedFile}
                recordedVoice={recordedVoice}
                setRecordedVoice={setRecordedVoice}
                voiceDuration={voiceDuration}
                setVoiceDuration={setVoiceDuration}
                isRecording={isRecording}
                setIsRecording={setIsRecording}
                recordingTime={recordingTime}
                setRecordingTime={setRecordingTime}
                isCanceling={isCanceling}
                setIsCanceling={setIsCanceling}
                fileInputRef={fileInputRef}
                isBlocked={isBlocked}
                isSending={isSending}
                handleSend={handleSend}
                handleKeyDown={handleKeyDown}
                handleFileSelect={handleFileSelect}
                triggerFileInput={triggerFileInput}
                startRecording={startRecording}
                stopRecording={stopRecording}
                cancelRecording={cancelRecording}
                handleMicTouchStart={handleMicTouchStart}
                handleMicTouchMove={handleMicTouchMove}
                handleMicTouchEnd={handleMicTouchEnd}
                formatTime={formatTime}
            />
        </div>
    );
};

export default ChatWindow;