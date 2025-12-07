"use client";
import React from "react";
import StarBold from "@/assets/icons/star.svg";
import Star from "@/components/Star";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";

const Point = ({a}) => {
    const dic = useTranslation();
    const f = dic.public.profile.user_feedback;
    const {data, isLoading} = useQuery({
        queryKey: ['user-feedback-point'],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "/profile/my_rate",
            });
        }
    });
    return (
        <>
            <div
                className="flex flex-col lg:flex-row items-center p-6 gap-10 border border-gray-200 dark:border-[#374151] rounded-xl bg-white dark:bg-Surface-2 ">
                <div
                    className="flex flex-col items-center justify-center gap-3 px-6 ltr:lg:border-r rtl:lg:border-l border-gray-200 dark:border-[#374151] h-full">
                    <p className="text-xl text-[#142738] dark:text-[#D9EDF4] font-bold whitespace-nowrap">
                        {a.total_ratings}
                    </p>
                    <div className="flex items-center gap-2">
                        <StarBold className="fill-[#F59E0B] w-5 h-5"/>
                        <p className="text-2xl text-gray-800 dark:text-gray-200 text-center pt-2">
                            {data?.data.overall || "0"}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col gap-6 py-5 w-full">
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                        <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200">
                            {a.info_honesty}
                        </p>
                        <div className="flex items-center gap-2">
                            <Star rating={data?.data.info_honesty}/>
                            <p className="text-sm lg:text-lg text-gray-800 dark:text-gray-200 pt-2">
                                {data?.data.info_honesty}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                        <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200">
                            {a.price_transparency}
                        </p>
                        <div className="flex items-center gap-2">
                            <Star rating={data?.data.price_clarity}/>
                            <p className="text-sm lg:text-lg text-gray-800 dark:text-gray-200 pt-2">
                                {data?.data.price_clarity}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                        <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200">
                            {a.owner_behavior}
                        </p>
                        <div className="flex items-center gap-2">
                            <Star rating={data?.data.owner_behavior}/>
                            <p className="text-sm lg:text-lg text-gray-800 dark:text-gray-200 pt-2">
                                {data?.data.owner_behavior}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Point;
