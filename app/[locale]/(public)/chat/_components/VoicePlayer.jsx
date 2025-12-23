"use client"
import React, {useRef, useState} from 'react';

const VoicePlayer = ({ audioUrl, duration = "00:11", size = "43.7 KB", time, isMine }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const togglePlay = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="flex items-center gap-3 w-full">
            {/* دکمه پخش/توقف */}
            <button
                onClick={togglePlay}
                className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"
            >
                {isPlaying ? (
                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14 19h4V5h-4v14zm-6 0h4V5H8v14z"/>
                    </svg>
                ) : (
                    <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                    </svg>
                )}
            </button>

            {/* موج صوتی انیمیشنی */}
            <div className="flex-1 flex items-center gap-1">
                {Array.from({ length: 30 }, (_, i) => (
                    <div
                        key={i}
                        className="w-1 bg-white/60 rounded-full animate-wave"
                        style={{
                            height: `${Math.random() * 40 + 10}px`,
                            animationDelay: `${i * 0.1}s`
                        }}
                    />
                ))}
            </div>

            {/* اطلاعات ویس */}
            <div className="text-xs text-white/80 text-right min-w-[100px]">
                <div>{duration}</div>
                <div className="text-white/60">{size}</div>
            </div>

            {/* زمان ارسال (در سمت راست یا چپ بسته به is_mine) */}
            <span className="text-xs text-white/70">
        {time ? format(new Date(time), 'hh:mm a') : time}
      </span>

            {/* عنصر audio واقعی برای پخش صدا */}
            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />
        </div>
    );
};

export default VoicePlayer;