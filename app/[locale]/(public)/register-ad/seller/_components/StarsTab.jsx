"use client"
import React from 'react';
import Star from "@/components/Star"
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import StarBold from "@/assets/icons/Star-bold.svg"
import Spinner from "@/components/Spinner";

const RatingSummary = ({id, a}) => {

    const {data, isLoading} = useQuery({
        queryKey: ["user_show", "rate", id],
        queryFn: async () => {
            return await request({
                url: `user_show/rate/${id}`,
            })
        }
    });
    const i = data?.data || []
    if (isLoading) {
        return <div className="w-full flex items-center justify-center py-4">
            <Spinner size={40}/>
        </div>;
    }

    return (
        <div
            className=" flex flex-col items-center gap-6 px-4 py-8 bg-white dark:bg-[#252C36] rounded-lg mt-2.5">
            <h2 className={`text-2xl font-[600] text-black dark:text-white`}>{a.total_ratings}</h2>
            <div className="flex items-center gap-1 mb-5">
                <span className="text-lg lg:text-2xl font-bold pt-2">{i.overall}</span>
                <StarBold className="fill-warning-main !w-5 !h-5"/>
            </div>

            <div className="flex flex-col lg:flex-row items-center w-full justify-between gap-3">
                <div className={`flex flex-col gap-2 items-center px-10`}>
                    <span className="text-md text-black dark:text-white">{a.information_accuracy}</span>
                    <Star rating={i.info_honesty}/>
                </div>
                <div className={`flex flex-col gap-2 items-center px-10`}>
                    <span className="text-md text-black dark:text-white">{a.owner_behavior}</span>
                    <Star rating={i.owner_behavior}/>
                </div>
                <div className={`flex flex-col gap-2 items-center px-10`}>
                    <span className="text-md text-black dark:text-white">{a.price_transparency}</span>
                    <Star rating={i.price_clarity}/>
                </div>
            </div>
        </div>
    );
};

export default RatingSummary;