"use client";
import React, {useState} from "react";
import Image from "next/image";
import Message from "@/assets/icons/message.svg";
import More from "@/assets/icons/more.svg";
import Star from "@/assets/icons/star.svg";
import Like from "@/components/Like";
import Arrow from "@/assets/icons/arrow-down.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import ModalComment from "./ModalComment";
import Reply from "@/components/Reply";
import Spinner from "@/components/Spinner";
import User from "@/assets/icons/profile.svg";
import ReplayIcon from "@/assets/icons/reply.svg";
import {useSession} from "next-auth/react";

const Comment = ({id, url, user_show}) => {
    const dic = useTranslation();
    const a = dic.public.profile.user_feedback;

    const [showAll, setShowAll] = useState(false);
    const [showReplies, setShowReplies] = useState({});

    const {data: session} = useSession();
    const url_comment = url || "";

    const {data, isLoading, refetch} = useQuery({
        queryKey: ["user-feedback-comment"],
        queryFn: async () =>
            await request({
                method: "get",
                url: `/ads/comments${url_comment}/${id}`,
            }),
    });

    const comments = data?.data || [];
    const visibleComments = showAll ? comments : comments.slice(0, 3);

    return (
        <div className="flex flex-col border border-Gray-200 rounded-xl overflow-hidden bg-Surface-2">
            <div className="flex items-center justify-between px-4 lg:px-8 py-4 border-b border-Gray-200">
                <div className="flex flex-row gap-2 items-center text-Gray-800 font-bold">
                    <Message className="fill-Gray-800 lg:!w-6 lg:!h-6 !w-5 !h-5"/>
                    <span className=" text-Gray-800 text-base lg:text-xl font-bold pt-2">
                        {a.comment}
                    </span>
                </div>
                {!!session?.accessToken && !user_show && <ModalComment refetch={refetch} id={id} a={a}/>}
            </div>

            <div className="flex items-center flex-col w-full">
                {isLoading ? (
                    <div className="w-full flex items-center justify-center py-4">
                        <Spinner size={40}/>
                    </div>
                ) : !!comments.length ? (
                    visibleComments.map((item) => (
                        <div
                            key={item.id}
                            className="flex flex-col gap-2 w-full border-b border-Gray-200 pb-4"
                        >
                            <div className="flex w-full lg:gap-4 ">
                                <div
                                    className="mx-4 my-auto w-14 h-14 border-2 border-default-divider overflow-hidden rounded-full flex items-center justify-center">
                                    {item.user?.profile ? (
                                        <Image
                                            src={item.user?.profile}
                                            alt="profile"
                                            width={56}
                                            height={56}
                                            className="w-full h-full rounded-full"
                                        />
                                    ) : (
                                        <User className="fill-Gray-800 !w-8 !h-8"/>
                                    )}
                                </div>

                                <div className="flex flex-col rtl:pl-3 ltr:pr-3 lg:px-4 pt-8 gap-2 w-full">
                                    <div className="flex items-center w-full gap-4 justify-between">
                                        <div className="flex flex-col gap-4">
                                            <span className="text-base text-Primary-950 font-medium">
                                                {item.user?.name}
                                            </span>
                                        </div>

                                        <div className="flex flex-col gap-4 lg:flex-row rtl:flex-row-reverse">
                                            <div className="flex flex-row rtl:flex-row-reverse items-center gap-4 px-2 ">
                                                {!!session?.accessToken && <Reply refetch={refetch} id={item.id}/>}
                                                <div className="flex items-center gap-2">
                                                    <Like
                                                        refetch={refetch}
                                                        url={`profile/comment`}
                                                        id={item.id}
                                                        isLike={item.is_liked}
                                                    />
                                                    <p className="text-Gray-950 pt-2">
                                                        {item.likes_count}
                                                    </p>
                                                </div>
                                                <span className="text-xs text-Gray-600 ">
                                                    {item.created_at}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col gap-2 w-full">
                                        <div className="flex gap-2 items-center">
                                            <Star className="fill-warning-main !w-4 !h-4"/>
                                            <span className="text-base text-Gray-800 pt-2">
                                                {item.average_rating}
                                            </span>
                                        </div>
                                        <p className=" text-secondary">{item.body}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Replies */}
                            {!!item.replies?.length && (
                                <div className="flex flex-col gap-4 px-8 lg:px-20">
                                    {(showReplies[item.id]
                                            ? item.replies
                                            : item.replies.slice(0, 1)
                                    ).map((reply) => (
                                        <div
                                            key={reply.id}
                                            className="flex gap-4 items-start"
                                        >
                                            <ReplayIcon className="!w-8 !h-8 fill-Primary-500 rtl:rotate-180"/>

                                            <div className="flex w-full gap-4">
                                                <div
                                                    className="w-10 h-10 border-2 border-default-divider rounded-full overflow-hidden flex items-center justify-center">
                                                    {reply.user?.profile ? (
                                                        <Image
                                                            src={reply.user.profile}
                                                            alt="profile"
                                                            width={40}
                                                            height={40}
                                                            className="w-full h-full rounded-full"
                                                        />
                                                    ) : (
                                                        <User className="fill-Gray-800 !w-7 !h-7"/>
                                                    )}
                                                </div>

                                                <div className="flex flex-col gap-2 w-full">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-Primary-950">
                                                            {reply.user?.name}
                                                        </span>
                                                        <span className="text-xs text-Gray-600">
                                                            {reply.created_at}
                                                        </span>
                                                    </div>

                                                    <p className="text-sm text-secondary">
                                                        {reply.body}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}

                                    {item.replies.length > 1 && (
                                        <div
                                            className="flex gap-2 items-center justify-center py-2 cursor-pointer"
                                            onClick={() =>
                                                setShowReplies((prev) => ({
                                                    ...prev,
                                                    [item.id]: !prev[item.id],
                                                }))
                                            }
                                        >
                                            <p className="text-sm text-Primary-500">
                                                {showReplies[item.id]
                                                    ? a.close
                                                    : `${item.replies.length - 1} ${a.another_reply}`}
                                            </p>
                                            <Arrow
                                                className={`fill-Primary-500 !w-5 !h-5 transition-transform ${
                                                    showReplies[item.id]
                                                        ? "rotate-180"
                                                        : ""
                                                }`}
                                            />
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <p className="py-4">{a.no_comments_found}</p>
                )}

                {comments.length > 3 && (
                    <div
                        className="flex gap-2 items-center justify-center py-6 cursor-pointer"
                        onClick={() => setShowAll((prev) => !prev)}
                    >
                        <p className="text-sm text-Primary-500">
                            {showAll
                                ? a.close
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
