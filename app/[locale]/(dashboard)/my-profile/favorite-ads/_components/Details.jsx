"use client";
import React, {useState} from "react";
import Heart from "@/assets/icons/heart.svg";
import Null from "./Null";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import JobSearch from "@/app/[locale]/(dashboard)/my-profile/dashboard/_components/JobSearch";
import Home from "@/app/[locale]/(dashboard)/my-profile/dashboard/_components/Home";
import Spinner from "@/components/Spinner"

const Details = () => {
    const dic = useTranslation();
    const a = dic.public.profile.favorite_ads;
    const d = dic.public.profile.dashboard;
    const {data, isLoading, refetch,} = useQuery({
        queryKey: ['favorite-ad'],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "/profile/like",
            });
        }
    });
    const isEmpty = !data?.data || data.data.length === 0;
    const favorite = 1
    return (
        <>
            <div
                className="flex flex-col dark:bg-[#252C36] w-full border border-gray-200 dark:border-[#374151] rounded-xl">
                <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
                    <Heart className="fill-gray-800 dark:fill-gray-200"/>
                    <p className="text-xl dark:text-[#E0E2E5] text-black font-bold pt-1">
                        {a.favorite_ads}
                    </p>
                </div>
                {isLoading ?
                    <div className="flex items-center justify-center w-full py-6"><Spinner/></div> : !isEmpty ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6 p-4 lg:p-6">
                            {data?.data?.map((item) => (item.custom_info?.type === "recruitment" ?
                                    <JobSearch favorite={favorite} item={item} isLoading={isLoading} refetch={refetch} d={d}/> :
                                    <Home favorite={favorite} item={item} isLoading={isLoading} refetch={refetch}/>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center w-full">
                            <Null a={a}/>
                        </div>
                    )}
            </div>
        </>
    );
};

export default Details;
