"use client";
import React from "react";
import Image from "next/image";
import Cut from "@/assets/images/wave-haikei.svg";
import Location from "@/assets/icons/location.svg";
import Link from "next/link";

const JobSearch = ({item, d, link, isRow}) => {
    return (
        <>
            {isRow ?
                <Link href={`${link}/${item.root_category_slug}/${item.id}`}
                      className="grid grid-cols-3 p-4 gap-2 md:gap-6 bg-surface rounded-xl shadow-xl w-full border border-Gray-200 max-h-[230px] h-full">
                    <div className="relative md:rounded-l-xl rounded-r-xl overflow-hidden">
                        <Image
                            unoptimized
                            src={item.image}
                            alt="photo"
                            width={100}
                            height={100}
                            className="w-screen h-screen"
                        />
                    </div>
                    <div className="col-span-2 flex flex-col justify-between gap-2 md:gap-4 w-full">
                        <div className="flex flex-col gap-2 md:gap-4 w-full">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <Image
                                        unoptimized
                                        src={item.custom_info?.icon || "/images/logo.png"}
                                        alt="snapp"
                                        width={42}
                                        height={42}
                                        className=""3




                                    />
                                    <p className="text-sm text-alpha-100 font-bold">{item.title}</p>
                                </div>
                                {/*<p className="text-xs text-Gray-700 font-bold">اسنپ</p>*/}
                            </div>
                            <div className="flex flex-col gap-2 md:flex-row items-center md:gap-2">
                                <div
                                    className="flex justify-between items-center gap-2 px-4 py-3 border border-Gray-400 rounded-lg w-full">
                                    <p className="text-xs text-Gray-700 font-bold">{d.salary}</p>
                                    <p className="text-sm text-Primary-800 font-bold">
                                        {Number(item.custom_info?.price).toLocaleString()} {item.custom_info?.currency}
                                    </p>
                                </div>
                                <div
                                    className="flex justify-between  items-center gap-2 px-4 py-3 border border-Gray-400 rounded-lg w-full">
                                    <p className="text-xs text-Gray-700 font-bold">{d.employment_type}</p>
                                    <p className="text-sm text-Primary-800 font-bold">{item.custom_info?.type}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Location className="!w-4 lg:!w-5 !h-4 lg:!h-5 fill-Gray-700 "/>
                                <p className="text-sm text-Gray-700 pt-1">{item.location}</p>
                            </div>
                            <p className="text-sm text-Gray-700 ">{item.time}</p>
                        </div>
                    </div>
                </Link>
                :
                <Link href={`${link}/${item.root_category_slug}/${item.id}`}
                      className="flex flex-col bg-surface rounded-xl overflow-hidden w-full border border-Gray-200 h-full">
                    <div className="relative h-64 w-full ">
                        <Image unoptimized src={item.image} alt="image" width={100} height={100} className="w-full h-full"/>
                        <div className="w-full absolute -bottom-7 right-0 left-0 ">
                            <Cut className="!w-full !h-full fill-white dark:fill-surface border-0"/>
                        </div>
                    </div>
                    <div className=" relative z-10 flex flex-col px-4 pb-4 pt-0 gap-4 w-full">
                        <div className="flex gap-4 px-4">
                            <Image
                                unoptimized
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
                                    {item.custom_info?.price||0} {item.custom_info?.currency}
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
                    </div>
                </Link>
            }
        </>
    );
};

export default JobSearch;
