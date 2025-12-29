"use client"
import React from 'react';
import StarIcon from "@/assets/icons/star.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Point from "./Point";
import Comment from "./Comment";
// import Message from "@/assets/icons/message_empty.svg";
const Details = () => {
    const dic = useTranslation()
    const f = dic.consultor1.user_feedback
    return (
        <>
            <div
                className="flex flex-col dark:bg-[#252C36] w-full border border-gray-200 dark:border-[#374151] rounded-xl bg-white">
                <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
                    <StarIcon className="fill-gray-800 dark:fill-gray-200"/>
                    <p className="text-xl dark:text-[#E0E2E5] text-black font-bold">{f.user_feedback_scores}</p>
                </div>
                <div className="flex flex-col gap-8 p-6">
                    <Point f={f}/>
                    <Comment f={f}/>
                </div>

                {/*<div className="flex flex-col items-center justify-center gap-4 w-full h-full">*/}
                {/*    <Message className="fill-black dark:fill-gray-300 !w-44 !h-44"/>*/}
                {/*    <div className="flex flex-col gap-2 items-center pb-10">*/}
                {/*        <p className="lg:text-xl text-[#3B3E46] dark:text-[#E0E2E5] font-bold">{f.no_feedback_yet}</p>*/}
                {/*        <p className="lg:text-base text-sm text-gray-700 dark:text-gray-300">{f.feedback_note}</p>*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </>
    );
};

export default Details;