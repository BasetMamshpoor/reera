import React from 'react';
import Image from "next/image";
import ImageOverlay from "@/assets/images/wave-haikei.svg"
import Home from "@/assets/icons/home-hashtag.svg"
import Coin from "@/assets/icons/Coin1.svg"
import Add from "@/assets/icons/add.svg"
import Link from "next/link";
import Edit from "@/assets/icons/Edit2.svg"
import Arrow from "@/assets/icons/arrow-left.svg"
import Layer from "@/assets/icons/Layer.svg"
import User from "@/assets/icons/profile.svg"
import Document from '@/assets/icons/DocumentText.svg'
import Transaction from "@/assets/icons/TransactionMinus.svg"
import Star from "@/assets/icons/star.svg"
import Heart from "@/assets/icons/heart.svg"
import Tag from "@/assets/icons/Tag.svg"
import LogUot from "@/assets/icons/Logout.svg"
import Modal from "./ModalCoinIncrease"
const Sidebar = () => {
    return (
        <>
            <div
                className="flex flex-col gap-8 border border-[#D1D5DB] dark:border-[#374151] bg-[#F9FAFB] dark:bg-[#14181D] rounded-2xl [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] w-full lg:w-1/3">
                <div className="relative w-full rounded-t-2xl overflow-hidden">
                    <Image
                        src="/images/ImageSidebar.png"
                        alt="image"
                        width={100}
                        height={100}
                        className="w-screen"
                    />
                    <div className="w-full absolute bottom-0">
                        <ImageOverlay className="!w-full !h-full fill-[#F9FAFB] dark:fill-[#14181D]"/>
                    </div>
                    <div className="w-full px-5 absolute z-30 bottom-0 sm:bottom-10 md:bottom-20 lg:bottom-0 ">
                        <div
                            className=" flex items-center gap-4 p-3 rounded-[12px] border w-full border-[#D1D5DB] dark:bg-black/40 bg-white/40 backdrop-blur-[25px] shadow-[0_4px_15px_0_rgba(28,28,28,0.04)]">
                            <div
                                className="flex items-center justify-center p-2 bg-white dark:bg-[#252C36] rounded-full">
                                <Home className="fill-gray-800 dark:fill-gray-200"/>
                            </div>
                            <div className="flex flex-col w-full">
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-semibold ">نام کاربری</p>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex items-center gap-1">
                                        <Coin className="fill-[#F59E0B]"/>
                                        <p className="text-gray-700 dark:text-gray-300 text-xs ">300 سکه</p>
                                    </div>
                                    <Modal/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col pb-6">
                    <Link href="/"
                          className="flex justify-between hover:bg-white dark:hover:bg-[#252C36] py-4 px-4 w-full">
                        <div className="flex gap-2">
                            <Edit className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                            <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">ویرایش
                                اطلاعات</p>
                        </div>
                        <Arrow className="lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 "/>
                    </Link>
                    <Link href="/"
                          className="flex justify-between hover:bg-white dark:hover:bg-[#252C36] py-4 px-4 w-full">
                        <div className="flex gap-2">
                            <Layer className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                            <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">میزکار</p>
                        </div>
                        <Arrow className="lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 "/>
                    </Link>
                    <Link href="/"
                          className="flex justify-between hover:bg-white dark:hover:bg-[#252C36] py-4 px-4 w-full">
                        <div className="flex gap-2">
                            <User className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                            <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">میزکار</p>
                        </div>
                        <Arrow className="lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 "/>
                    </Link>
                    <Link href="/"
                          className="flex justify-between hover:bg-white dark:hover:bg-[#252C36] py-4 px-4 w-full">
                        <div className="flex gap-2">
                            <Document className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                            <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">درخواست‌ها</p>
                        </div>
                        <Arrow className="lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 "/>
                    </Link>
                    <Link href="/"
                          className="flex justify-between hover:bg-white dark:hover:bg-[#252C36] py-4 px-4 w-full">
                        <div className="flex gap-2">
                            <Transaction className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                            <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">ویرایش
                                اطلاعات</p>
                        </div>
                        <Arrow className="lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 "/>
                    </Link>
                    <Link href="/"
                          className="flex justify-between hover:bg-white dark:hover:bg-[#252C36] py-4 px-4 w-full">
                        <div className="flex gap-2">
                            <Star className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                            <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">امتیاز و
                                بارخورد کاربران</p>
                        </div>
                        <Arrow className="lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 "/>
                    </Link>
                    <Link href="/"
                          className="flex justify-between hover:bg-white dark:hover:bg-[#252C36] py-4 px-4 w-full">
                        <div className="flex gap-2">
                            <Heart className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                            <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">آگهی‌های مورد
                                علاقه</p>
                        </div>
                        <Arrow className="lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 "/>
                    </Link>
                    <Link href="/"
                          className="flex justify-between hover:bg-white dark:hover:bg-[#252C36] py-4 px-4 w-full">
                        <div className="flex gap-2">
                            <Tag className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                            <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">تکیت
                                پشتیبانی</p>
                        </div>
                        <Arrow className="lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 "/>
                    </Link>
                </div>
                <Link href="/"
                      className="flex gap-2

                       hover:bg-white border border-t-[#D1D5DB] dark:border-t-[#374151] dark:hover:bg-[#252C36] py-4 px-4 w-full">
                    <LogUot className="fill-[#EF4444] w-5 h-5"/>
                    <p className="text-[#EF4444] text-sm lg:text-base font-bold">خروج</p>
                </Link>
            </div>
        </>
    );
};

export default Sidebar;