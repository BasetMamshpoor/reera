import React from "react";
import Image from "next/image";
import Message from "@/assets/icons/message.svg";
import Plus from "@/assets/icons/add.svg";
import More from "@/assets/icons/more.svg";
import Heart from "@/assets/icons/heart.svg";
import Reply from "@/assets/icons/reply.svg";
import Star from "@/assets/icons/Star-bold.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Like from "@/components/Like";

const Comment = ({f}) => {
    return (
        <>
            <div className="flex flex-col border border-Gray-200 rounded-xl overflow-hidden bg-Surface-2">
                <div
                    className={`flex items-center justify-between px-8 py-4 border-b border-Gray-200  `}>
                    <div
                        className={`flex flex-row rtl:flex-row-reverse gap-2 items-center text-gray-800 font-[700]`}>
                        <span className={`text-gray-800 dark:text-gray-200 text-xl font-bold`}>{f.comment}</span>
                        <Message className={`fill-gray-800 dark:fill-gray-200`}/>
                    </div>
                    <div
                        className={`flex items-center justify-center border-2 border-[#4299C1] gap-2 px-3 py-2 rounded-2xl`}>
                        <span className="text-primary-500 font-bold text-sm">{f.submit_comment}</span>
                        <Plus className={`fill-primary-400`}/>
                    </div>
                </div>
                <div className="flex flex-col w-full">
                    <div className={`flex w-full gap-4 border-b border-Gray-200`}>
                        <div className={`px-4 py-8`}>
                            <Image
                                alt={``}
                                src={`/images/profilepicture.png`}
                                width={56}
                                height={56}
                            />
                        </div>
                        <div className={`flex flex-col px-4 py-8 gap-2  w-full`}>
                            <div
                                className={`flex items-center w-full gap-4 justify-between`}>
                                <div className={`flex flex-col gap-4`}>
                                    <p className="text-base text-Primary-950 font-medium">علیرضا کریمی</p>
                                    <span
                                        className={`text-xs text-[#3B3E46] dark:text-white`}>شرکت نوآوران فن آوازه</span>
                                </div>
                                <div
                                    className={`flex flex-col gap-4 lg:flex-row rtl:flex-row-reverse`}>
                                    <div
                                        className={`flex flex-row rtl:flex-row-reverse items-center gap-4 `}>
                                        <More className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}/>
                                        <Reply className={`fill-[#3B3E46] cursor-pointer dark:fill-white`}/>
                                        <Like/>
                                        <span className={`text-xs text-Gray-600 `}>5 روز پیش</span>
                                    </div>
                                </div>
                            </div>
                            <div className={`flex flex-col gap-2 w-full mt-4`}>
                                <div
                                    className={`flex gap-2 items-center`}>
                                    <Star className={`fill-warning-main w-4 h-4`}/>
                                    <span className="text-base text-Gray-800">5</span>
                                </div>
                                <p className={`text-sm text-secondary`}>
                                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با
                                    استفاده از طراحان گرافیک است لورم ایپسوم متن ساختگی با تولید سادگی
                                    نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است. لورم ایپسوم
                                    متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از
                                    طراحان گرافیک است.
                                </p>
                            </div>
                        </div>
                    </div>



                </div>
            </div>
        </>
    );
};

export default Comment;
