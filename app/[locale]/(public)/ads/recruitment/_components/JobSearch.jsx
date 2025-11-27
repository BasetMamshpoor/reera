import React from "react";
import Image from "next/image";
import Location from "@/assets/icons/location.svg";
import Photos from "@/assets/images/photo.png";
import Snapp from "@/assets/images/photo.png";
import Icons from "@/assets/images/logo.png";
import Cut from "@/assets/images/wave-haikei.svg";

const JobSearch = ({isRow, i}) => {
    return (
        <>
            {isRow ? (
                <div
                    className="grid grid-cols-3 md:p-6 gap-2 md:gap-6 bg-surface max-h-[260px] h-full rounded-xl [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] w-full">
                    <div className="relative w-full md:rounded-l-xl rounded-r-xl overflow-hidden">
                        <Image
                            src={i.image}
                            alt="photo"
                            width={100}
                            height={100}
                            className="w-screen h-full"
                        />
                    </div>
                    <div className=" col-span-2 flex flex-col p-2 gap-3 md:gap-5 w-full">
                        <div className="flex flex-col gap-2 md:gap-4 w-full">
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-2">
                                    <Image
                                        src={i.custom_info?.icon || Icons}
                                        alt="snapp"
                                        width={40}
                                        height={40}
                                        className="max-w-8"
                                    />
                                    <p className="text-sm md:text-base font-bold">
                                        {i.title}
                                    </p>
                                </div>
                                <p className="hidden md:flex text-xs font-bold text-Gray-700">
                                    اسنپ
                                </p>
                            </div>
                            <div className="flex flex-col md:flex-row items-center md:gap-2">
                                <div
                                    className="flex items-center md:justify-between p-2 md:border rounded-lg gap-2 w-full">
                                    <p className="text-xs font-medium md:font-bold text-Gray-700">
                                        حقوق
                                    </p>
                                    <p className="text-xs md:text-sm text-Primary-500 font-medium md:font-bold">
                                        {i.custom_info?.price || 0}
                                        {/*میلیون تومان*/}
                                    </p>
                                </div>
                                <div
                                    className="flex items-center md:justify-between p-2 md:border rounded-lg gap-2 w-full">
                                    <p className="text-xs font-medium md:font-bold text-Gray-700">
                                        نوع همکاری
                                    </p>
                                    <div className="flex items-center gap-2 text-xs md:text-sm text-Primary-500 font-medium md:font-bold">
                                        <p>{i.custom_info.type === "part_time" ?"پاره وقت":"تمام وقت"}</p>
                                        <p>{i.custom_info.time}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex gap-2">
                                    <Location className="!w-5 !h-5 fill-Gray-500"/>
                                    <p className="flex items-center justify-center pt-1 text-xs md:text-sm text-Gray-500">
                                        {i.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 md:flex-row justify-between w-full">
                            <p className="text-xs md:text-sm bg-custom-primary-400 text-Gray-500">
                                {i.time}
                            </p>
                            <button
                                className="flex items-center justify-center py-2 px-8 w-full md:w-1/2 lg:w-1/3 bg-Primary-400 rounded-xl text-base font-bold text-white whitespace-nowrap">
                                ارسال رزومه
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className="grid grid-rows-5 pb-4 gap-4  w-full max-h-[450px] h-full bg-surface rounded-xl overflow-hidden [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] ">
                    <div className="relative row-span-2 w-full h-full">
                        <Image
                            src={i.image}
                            alt="photo"
                            width={100}
                            height={100}
                            className="w-screen h-full "
                        />
                        <div className="w-full absolute -bottom-10 right-0 left-0 ">
                            <Cut className="!w-full !h-full fill-white dark:fill-surface border-0 "/>
                        </div>
                    </div>
                    <div className="relative z-10 row-span-3 flex flex-col px-4 gap-6">
                        <div className="flex items-center px-4 pt-0 gap-4 ">
                            <Image
                                src={i.custom_Info?.icon||Icons}
                                alt="icon"
                                width={40}
                                height={40}
                                className="max-w-[72px]"
                            />
                            <div className="flex flex-col gap-1">
                                <p className="text-sm md:text-base font-bold">
                                    {i.title}
                                </p>
                                <p className="hidden md:flex text-xs font-bold text-Gray-700">
                                    اسنپ
                                </p>
                            </div>
                        </div>
                        <div className="flex flex-col justify-between h-full gap-4">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <div className="flex flex-col p-2 border rounded-lg gap-1 w-full">
                                        <p className="text-xs font-medium md:font-bold text-Gray-700">
                                            حقوق
                                        </p>
                                        <p className="text-xs md:text-sm text-Primary-500 font-medium md:font-bold">
                                            {Number(i.custom_info?.price).toLocaleString() || 0}
                                            {/*میلیون تومان*/}
                                        </p>
                                    </div>
                                    <div className="flex flex-col p-2 border rounded-lg gap-1 w-full">
                                        <p className="text-xs font-medium md:font-bold text-Gray-700">
                                            نوع همکاری
                                        </p>
                                        <div
                                            className="flex items-center gap-2 text-xs md:text-sm text-Primary-500 font-medium md:font-bold">
                                            <p>{i.custom_info.type === "part_time" ? "پاره وقت" : "تمام وقت"}</p>
                                            <p>{i.custom_info.time}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex gap-2">
                                        <Location className="!w-6 !h-6 fill-Gray-500"/>
                                        <p className="flex items-center justify-center text-xs md:text-sm pt-1 text-Gray-500">
                                            {i.location}
                                        </p>
                                    </div>
                                    <p className="text-xs md:text-sm bg-custom-primary-400 text-Gray-500">
                                        {i.custom_info?.time}
                                    </p>
                                </div>
                            </div>
                            <button
                                className="flex items-center justify-center py-1 md:py-3 px-2 md:px-6 bg-Primary-400 w-full rounded-xl text-base font-bold text-white whitespace-nowrap">
                                ارسال رزومه
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default JobSearch;