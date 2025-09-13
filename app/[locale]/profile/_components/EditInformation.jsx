"use client"
import React from 'react';
import {useState} from "react";
import Link from "next/link";
import Edit from "@/assets/icons/Edit2.svg";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import Profile from "@/assets/icons/profile.svg";
import Gallery from "@/assets/icons/GalleryAdd.svg"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Tick from "@/assets/icons/tick-circle.svg"
import {useTranslation} from "@/app/[locale]/TranslationContext";

const EditInformation = () => {
    const dic= useTranslation()

    const [preview, setPreview] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    return (
        <>
            <div className="flex flex-col bg-white dark:bg-[#252C36] border border-[#D1D5DB] rounded-xl w-full">
                <div
                    className="hidden lg:flex gap-2 border border-b-[#D1D5DB] dark:border-b-[#374151] px-4 py-6 lg:p-5 w-full">
                    <Edit className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                    <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">ویرایش
                        اطلاعات</p>
                </div>
                <div className="flex flex-col gap-10 px-6 py-8">
                    <Tabs defaultValue="account" className="flex flex-col gap-6">
                        <TabsList
                            className="flex flex-row rtl:flex-row-reverse bg-transparent w-full  border-b border-b-[#D1D5DB] dark:border-b-[#374151] rounded-none">
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent w-full dark:data-[state=active]:text-[#4299C1] dark:data-[state=active]:border-b-2 dark:data-[state=active]:-b-[#4299C1] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-[#4299C1] data-[state=active]:shadow-none data-[state=active]:text-[#4299C1] py-4`}
                                value="account"
                            >
                                تاریخچه استخدام ها
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent w-full dark:data-[state=active]:text-[#4299C1] dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-[#4299C1] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-[#4299C1] data-[state=active]:shadow-none data-[state=active]:text-[#4299C1] py-4`}
                                value="password"
                            >
                                آگهی ها
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent w-full dark:data-[state=active]:text-[#4299C1] dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-[#4299C1] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-[#4299C1] data-[state=active]:shadow-none data-[state=active]:text-[#4299C1] py-4`}
                                value="password1"
                            >
                                امتیاز ها
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent w-full dark:data-[state=active]:text-[#4299C1] dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-[#4299C1] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-[#4299C1] data-[state=active]:shadow-none data-[state=active]:text-[#4299C1] py-4`}
                                value="password2"
                            >
                                نظرات
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="account">
                            <div className={`w-full flex flex-col gap-4 rtl:items-end`}>
                                <div className="flex flex-col gap-6 w-24 h-24 ">
                                    <div
                                        className=" relative z-10 flex items-center justify-center p-4 border border-[#D1D5DB] rounded-xl w-full h-full">
                                        <div
                                            className=" flex items-center justify-center rounded-full overflow-hidden bg-[#F6F6F7] w-full h-full ">
                                            {/*<Image alt="Profile" width={100} height={100} src="/images/legal.png"*/}
                                            {/*       className="w-screen"/>*/}
                                            <Profile className="fill-gray-800 !w-10 !h-10"/>
                                            <div
                                                className="absolute bottom-4 right-4 z-20 flex p-1 items-center justify-center border bg-white border-[#D1D5DB] rounded-md">
                                                <Gallery className=" !w-3 !h-3 fill-gray-800"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 w-full">
                                    <Input id="picture4" type="text" placeholder="نام"
                                           className="rtl:text-right w-full rounded-xl px-3 py-2 text-sm lg:text-base"/>
                                    <Input id="picture1" type="text" placeholder="نام خانوادگی"
                                           className="rtl:text-right w-full rounded-xl px-3 py-2 text-sm lg:text-base"/>
                                    <Input id="picture2" type="text" placeholder="شماره موبایل"
                                           className="rtl:text-right w-full rounded-xl px-3 py-2 text-sm lg:text-base"/>
                                    <Input id="picture3" type="text" placeholder="کدملی"
                                           className="rtl:text-right w-full rounded-xl px-3 py-2 text-sm lg:text-base"/>
                                    <Select>
                                        <SelectTrigger
                                            className=" w-full rounded-xl px-3 py-2 text-gray-500 text-sm lg:text-base">
                                            <SelectValue placeholder="زبان"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem className="text-gray-500 text-sm lg:text-base"
                                                            value="apple">Apple</SelectItem>
                                                <SelectItem className="text-gray-500 text-sm lg:text-base"
                                                            value="banana">Banana</SelectItem>
                                                <SelectItem className="text-gray-500 text-sm lg:text-base"
                                                            value="blueberry">Blueberry</SelectItem>
                                                <SelectItem className="text-gray-500 text-sm lg:text-base"
                                                            value="grapes">Grapes</SelectItem>
                                                <SelectItem className="text-gray-500 text-sm lg:text-base"
                                                            value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                    <Select>
                                        <SelectTrigger className=" w-full rounded-xl px-3 py-2 text-gray-500">
                                            <SelectValue placeholder="ملیت"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem className="text-gray-500" value="apple">Apple</SelectItem>
                                                <SelectItem className="text-gray-500" value="banana">Banana</SelectItem>
                                                <SelectItem className="text-gray-500"
                                                            value="blueberry">Blueberry</SelectItem>
                                                <SelectItem className="text-gray-500" value="grapes">Grapes</SelectItem>
                                                <SelectItem className="text-gray-500"
                                                            value="pineapple">Pineapple</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-4 w-full rtl:items-end ">
                                    <p className="text-gray-700 dark:text-gray-300 text-base">برای احراز هویت مدرک
                                        شناسایی خود را بارگذاری کنید</p>
                                    {preview ? (
                                        <div className="relative flex items-center gap-6 w-full rtl:justify-end">
                                            <div
                                                className="flex items-center justify-center px-3 py-1 bg-[#DCFCE8] rounded-md text-sm text-[#16A34A]">تایید
                                                شده
                                            </div>
                                            <Image
                                                src={preview}
                                                alt="Preview"
                                                width={176}
                                                height={176}
                                                unoptimized
                                                className="rounded-md max-w-44 max-h-44"
                                            />
                                            <input
                                                id="picture01"
                                                type="file"
                                                accept="image/*"
                                                className="absolute w-full h-full top-0 bottom-0 text-transparent cursor-pointer"
                                                onChange={handleFileChange}
                                            />
                                        </div>
                                    ) : (
                                        <label
                                            htmlFor="picture"
                                            className="flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 dark:border-[#374151] bg-[#F6F6F7] dark:bg-[#14181D] rounded-xl cursor-pointer overflow-hidden"
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="w-8 h-8 text-[#3498db]"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth={2}
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1M8 12l4-4m0 0l4 4m-4-4v12"
                                                />
                                            </svg>
                                            <input
                                                id="picture"
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    )}
                                </div>
                                <div className="flex items-center gap-4 w-full">
                                    <button
                                        className="flex gap-2 items-center justify-center px-6 py-2 bg-[#4299C1] rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold">
                                        <Tick className="fill-white dark:fill-black w-5 h-5"/>
                                        <p> ذخیره اطلاعات</p>
                                    </button>
                                    <button
                                        className="flex items-center justify-center px-12 py-2 border border-[#F59E0B] rounded-xl text-[#F59E0B] text-base font-bold">
                                        انصراف
                                    </button>
                                </div>
                            </div>

                        </TabsContent>
                        <TabsContent value="password">

                        </TabsContent>
                        <TabsContent value="password1">

                        </TabsContent>
                        <TabsContent value="password2">

                        </TabsContent>

                    </Tabs>

                </div>
            </div>
        </>
    );
};

export default EditInformation;