"use client";
import React from "react";
import Image from "next/image";
import Cut from "@/assets/images/wave-haikei.svg";
import Location from "@/assets/icons/location.svg";
import Spinner from "@/components/Spinner";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Link from "next/link";

const JobSearch = ({item, d, link}) => {
    return (
        <>
            <Link href={`${link}/${item.root_category_slug}/${item.id}`}
                  className="flex flex-col bg-surface rounded-xl overflow-hidden w-full dark:border dark:border-Gray-100 h-full">
                <div className="relative h-64 w-full ">
                    <Image src={item.image} alt="image" width={100} height={100} className="w-full h-full"/>
                    <div className="w-full absolute -bottom-7 right-0 left-0 ">
                        <Cut className="!w-full !h-full fill-white dark:fill-surface border-0"/>
                    </div>
                </div>
                <div className=" relative z-10 flex flex-col px-4 pb-4 pt-0 gap-4 w-full">
                    <div className="flex flex-col justify-between "></div>
                    <div className="flex gap-4 px-4">
                        <Image
                            src={item.custom_info?.icon || "/images/logo.png"}
                            alt="logo"
                            width={52}
                            height={52}
                            className={``}
                        />
                        <div className="flex flex-col gap-2 pt-2">
                            <p className="text-sm text-alpha-100 font-bold">{item.title}</p>
                            {/*<p className="text-xs text-Gray-700 font-bold">اسنپ</p>*/}
                        </div>
                    </div>
                    <div className="flex items-center gap-2 w-full">
                        <div
                            className="flex flex-col items-center gap-2 p-2 border border-default rounded-lg w-full">
                            <p className="text-xs text-Gray-700 font-bold">{d.salary}</p>
                            <p className="text-sm text-Primary-800 font-bold">
                                {item.custom_info?.price} {item.custom_info?.currency}
                            </p>
                        </div>
                        <div
                            className="flex flex-col items-center gap-2 p-2 border border-default rounded-lg w-full">
                            <p className="text-xs text-Gray-700 font-bold">{d.employment_type}</p>
                            <p className="text-sm text-Primary-800 font-bold">{item.custom_info?.type}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Location className="!w-4 lg:!w-5 !h-4 lg:!h-5 fill-Gray-700 "/>
                            <p className="text-sm text-Gray-700 pt-1">{item.location}</p>
                        </div>
                        <p className="text-sm text-Gray-700 ">{item.time}</p>
                    </div>
                    <div className="flex justify-end w-full">
                        <div className="flex items-center gap-1">
                            <p className="font-bold text-base md:text-lg">{item.price ? Number(item.price).toLocaleString() : 0}</p>
                            <p className="font-bold text-base md:text-lg">یورو</p>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default JobSearch;
