import React, {useState} from "react";
import Image from "next/image";
import Message from "@/assets/icons/message.svg";
import More from "@/assets/icons/more.svg";
import Heart from "@/assets/icons/heart.svg";
import Star from "@/assets/icons/star.svg";
import Like from "@/components/Like";
import Arrow from "@/assets/icons/arrow-down.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import ModalComment from "./ModalComment";
import Reply from "@/components/Reply";

const Comment = () => {
    const dic = useTranslation();
    const a = dic.public.profile.user_feedback;
    const [showAll, setShowAll] = useState(false);

    const {data, isLoading} = useQuery({
        queryKey: ["user-feedback-comment"],
        queryFn: async () =>
            await request({
                method: "get",
                url: "/profile/my_comment",
            }),
    });

    const comments = data?.data || [];
    const visibleComments = showAll ? comments : comments.slice(0, 3);

    return (
        <div className="flex flex-col border border-Gray-200 rounded-xl overflow-hidden bg-Surface-2">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4 border-b border-Gray-200">
                <div className="flex flex-row rtl:flex-row-reverse gap-2 items-center text-gray-800 font-[700]">
                    <Message className="rtl:hidden fill-gray-800 dark:fill-gray-200 lg:!w-6 lg:!h-6 !w-5 !h-5"/>
                    <span className=" text-gray-800 dark:text-gray-200 text-base lg:text-xl font-bold pt-2">
                       {a.comment}
                    </span>
                    <Message className="ltr:hidden fill-gray-800 dark:fill-gray-200 lg:!w-6 lg:!h-6 !w-5 !h-5"/>
                </div>
                <ModalComment id={comments.id} a={a}/>
            </div>
            <div className="flex flex-col w-full">
                {visibleComments.map((item) => (
                    <div
                        key={item.id}
                        className="flex w-full lg:gap-4 border-b border-Gray-200"
                    >
                        <div className="px-4 py-8">
                            <Image src={item.profile} alt="profile" width={56} height={56}/>
                        </div>
                        <div className="flex flex-col rtl:pl-3 ltr:pr-3 lg:px-4 py-8 gap-2  w-full">
                            <div className="flex items-center w-full gap-4 justify-between">
                                <div className="flex flex-col gap-4">
                                    <span className="text-base text-Primary-950 font-medium">
                                      {item.user_name}
                                    </span>
                                </div>
                                <div className="flex flex-col gap-4 lg:flex-row rtl:flex-row-reverse">
                                    <div className="flex flex-row rtl:flex-row-reverse items-center gap-4 ">
                                        {/*<More className="fill-Gray-800"/>*/}
                                        <Reply id={item.id}/>
                                        <Like
                                            url={`profile/comment`}
                                            id={item.id}
                                            isLike={item.is_like}
                                        />
                                        <span className="text-xs text-Gray-600 ">5 روز پیش</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2 w-full mt-4">
                                <div className="flex gap-2 items-center">
                                    <Star className="fill-warning-main w-4 h-4"/>
                                    <span className="text-base text-Gray-800 pt-2">
                    {item.rate}
                  </span>
                                </div>
                                <p className="text-sm text-secondary">{item.body}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {comments.length > 3 && (
                    <div
                        className="flex gap-2 items-center justify-center py-6 cursor-pointer"
                        onClick={() => setShowAll((prev) => !prev)}
                    >
                        <p className="text-sm text-Primary-500">
                            {showAll
                                ? a.hide_comments
                                : `${comments.length - 3} ${a.other_comments}`}
                        </p>
                        <Arrow
                            className={`fill-Primary-500 !w-5 !h-5 transition-transform ${
                                showAll ? "rotate-180" : ""
                            }`}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Comment;
