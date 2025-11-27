"use client"
import React from "react";
import Image from "next/image";
import Category from "@/assets/icons/Category.svg";
import Location from "@/assets/icons/location.svg";
import Cut from "@/assets/images/wave-haikei.svg";
import Home from "@/assets/icons/home-hashtag.svg";
import Link from "next/link";

const Card = ({isRow, i, Type, link}) => {

    return (
        <>
            {isRow ? (
                    <Link href={`${link}/${i.root_category_slug}/${i.id}`}
                          className="grid grid-cols-3 md:p-4 p-2 gap-1 md:gap-6 bg-surface rounded-xl shadow w-full">
                        <Image
                            src={i.image || "/images/logo.png"}
                            placeholder="blur" blurDataURL="/images/logo.png"
                            alt={i.title}
                            width={100}
                            height={100}
                            objectFit="cover"
                            className="w-full h-44 md:rounded-l-xl rounded-r-xl overflow-hidden"
                        />
                        <div className="col-span-2 flex flex-col justify-between p-3 md:p-0 gap-4 w-full">
                            <div className="flex flex-col gap-1 md:gap-3 lg:gap-5">
                                <div className="flex flex-col md:flex-row justify-between w-full gap-1">
                                    <p className="font-bold text-base md:text-lg text-Gray-950">
                                        {i.title}
                                    </p>
                                    <div
                                        className="flex items-center justify-center px-2 md:px-3 py-1 w-fit rounded-lg text-xs md:text-sm text-Primary-400 bg-Primary-50">
                                        {i.category}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-1 md:gap-3">
                                    <div className="flex items-center gap-2">
                                        {Type === "housing" ?
                                            <Home className="!w-5 !h-5 md:!w-6 md:!h-6 fill-Gray-800"/> :
                                            <Category className="!w-5 !h-5 md:!w-6 md:!h-6 fill-Gray-800"/>
                                        }
                                        <div className="flex items-center gap-1">
                                            <p className="flex items-center justify-center text-sm md:text-base pt-1">
                                                {i.custom_info?.area} متر
                                            </p>
                                            <p className="flex items-center justify-center text-sm md:text-base pt-1">
                                                {i.custom_info?.bedrooms} خواب
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Location className="!w-5 !h-5 md:!w-6 md:!h-6 fill-Gray-800"/>
                                        <p className="flex items-center justify-center text-sm md:text-base pt-1">
                                            {i.location}
                                        </p>
                                    </div>
                                    {/*<div className="flex items-center gap-2">*/}
                                    {/*    <Calender className=" w-3 h-3 md:w-4 md:h-4 fill-gray-500"/>*/}
                                    {/*    <p className="flex items-center justify-center text-sm md:text-base">{new Date().toLocaleString(`fa-Ir`, {*/}
                                    {/*        year: 'numeric',*/}
                                    {/*        month: 'long',*/}
                                    {/*        day: 'numeric',*/}
                                    {/*    })}</p>*/}
                                    {/*</div>*/}
                                    {/*<div className="flex items-center gap-2">*/}
                                    {/*    <Home className="w-3 h-3 md:w-4 md:h-4 fill-gray-500"/>*/}
                                    {/*    <p className="flex items-center justify-center text-sm md:text-base">۸۰ متر، ۲ خواب</p>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row justify-between w-full">
                                <p className="text-xs md:text-sm text-Gray-500 whitespace-nowrap">
                                    {i.time}
                                </p>
                                <div className="flex justify-end w-full">
                                    <div className="flex items-center gap-1">
                                        <p className="font-bold text-base md:text-lg">{i.price ? Number(i.price).toLocaleString() : 0}</p>
                                        <p className="font-bold text-base md:text-lg">یورو</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                ) :
                (<Link href={`${link}/${i.root_category_slug}/${i.id}`}
                       className="flex flex-col bg-surface rounded-xl overflow-hidden shadow w-full h-full">
                    <div className="relative w-full">
                        <Image
                            src={i.image || "/images/logo.png"}
                            placeholder="blur" blurDataURL="/images/logo.png"
                            alt={i.title}
                            width={100}
                            height={100}
                            objectFit="cover"
                            className="w-full h-64"
                        />
                        <div className="w-full absolute -bottom-7 right-0 left-0 ">
                            <Cut className="!w-full !h-full fill-white dark:fill-surface border-0 "/>
                        </div>
                    </div>
                    <div className="relative z-10 flex flex-col px-4 md:p-5 md:pt-0 gap-4 h-full">
                        <div className="flex flex-col gap-3 flex-1">
                            <div className="flex items-center justify-between w-full">
                                <div
                                    className="flex items-center justify-center px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm text-Primary-400 bg-Primary-50">
                                    {i.category}
                                </div>
                                <p className="text-xs md:text-sm  text-Gray-500">{i.time}</p>
                            </div>
                            <p className="font-bold text-base md:text-lg text-Gray-950">
                                {i.title}
                            </p>
                            <div className="flex items-center gap-2">
                                <Home className="w-3 h-3 md:w-4 md:h-4  fill-Gray-800"/>
                                <div className="flex items-center gap-1">
                                    <p className="flex items-center justify-center text-sm md:text-base">
                                        {i.custom_info?.area}متر
                                    </p>
                                    <p className="flex items-center justify-center text-sm md:text-base">
                                        {i.custom_info?.bedrooms} اتاق
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2">
                                <Location className="w-3 h-3 md:w-4 md:h-4 fill-Gray-800"/>
                                <p className="flex items-center justify-center text-sm md:text-base">
                                    {i.location}
                                </p>
                            </div>
                            {/*<div className="flex items-center gap-2">*/}
                            {/*    <Calender className=" w-3 h-3 md:w-4 md:h-4  fill-gray-500"/>*/}
                            {/*    <p className="flex items-center justify-center text-sm md:text-base">{new Date().toLocaleString(`fa-Ir`, {*/}
                            {/*        year: 'numeric',*/}
                            {/*        month: 'long',*/}
                            {/*        day: 'numeric',*/}
                            {/*    })}</p>*/}
                            {/*</div>*/}
                            {/*<div className="flex items-center gap-2">*/}
                            {/*    <Home className="w-3 h-3 md:w-4 md:h-4  fill-gray-500"/>*/}
                            {/*    <p className="flex items-center justify-center text-sm md:text-base">۸۰ متر، ۲ خواب</p>*/}
                            {/*</div>*/}
                        </div>
                        <div className="flex justify-end w-full">
                            <div className="flex items-center gap-1">
                                <p className="font-bold text-base md:text-lg">{i.price ? Number(i.price).toLocaleString() : 0}</p>
                                <p className="font-bold text-base md:text-lg">یورو</p>
                            </div>
                        </div>
                    </div>
                </Link>)
            }
        </>
    );
};

export default Card;