import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/icons/arrow-right.svg";

import ImageOverlay from "@/assets/images/wave-haikei.svg";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import CurvedOverlay from "../_components/CurverOverlay";
import Advertisements from "@/components/Advertisements/Advertisements";
import SellerComments from "../_components/SellerComments";
import StarsTab from "../_components/StarsTab";
import Star from "@/assets/icons/star.svg"
import HiringHistory from "../_components/HiringHistory";
import InformationContent from "../_components/InformationContent";
import GreenTick from "@/assets/icons/tick-circle.svg"

const Page = () => {
    return (
        <>
            <div className={`flex flex-col gap-4 mt-4 w-full`}>
                <button
                    className={`flex flex-row gap-4 items-center self-end md:hidden`}
                >
                    <span>پروفایل فروشنده سعید اسدی</span>
                    <ArrowRight className={` fill-Gray-950`}/>
                </button>
                <div className={` hidden md:block`}>
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/public">صفحه اصلی</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator> /</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink href="/sellers">فروشندگان</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator> /</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbLink>املاک</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator> /</BreadcrumbSeparator>
                            <BreadcrumbItem>
                                <BreadcrumbPage>پروفایل فروشنده سعید احمدی</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
                {/* Image */}
                <div className="relative w-full h-[400px] max-h-[400px] overflow-hidden">
                    <Image
                        unoptimized
                        src={`/images/city-profile.jpg`}
                        alt="0"
                        fill
                        className={`w-full object-cover`}
                    />
                    <div className="w-full absolute bottom-0">
                        <ImageOverlay className="!w-full !h-full fill-[#F9FAFB] dark:fill-[#14181D]"/>
                    </div>
                    <div
                        className="w-full  h-24 absolute -translate-x-1/2 xl:bottom-30 bototm-20 left-1/2 max-w-280 mx-auto z-40 text-black"></div>
                    <div className="w-full absolute xl:bottom-32 bottom-10 start-10 flex flex-row justify-between ">
                        <div className="flex flex-row gap-4">
                            <div className="bg-surface p-2 rounded-2xl">
                                <Image
                                    src="/images/digi.png"
                                    className=""
                                    width={100}
                                    height={100}
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col gap-4 self-end">
                                <h2 className="text-2xl font-[500]">سعید اسدی</h2>
                                <div className="xl:flex hidden flex-row gap-2 items-center">
                                    <Star className="fill-[#F59E0B]"/>
                                    <span>4</span>
                                </div>
                            </div>
                            <div className="self-end">
                                <div className="bg-[#DCFCE8] rounded-lg px-2 flex flex-row py-2 gap-2">
                                    <GreenTick className="fill-[#16A34A]"/>
                                    <h2 className="font-[500] text-[#16A34A]">تایید شده</h2>
                                </div>
                            </div>
                            <div className="xl:hidden flex flex-row gap-2 items-center self-end">
                                <Star className="fill-[#F59E0B]"/>
                                <span>4.5</span>
                            </div>
                        </div>
                        <div className="xl:flex hidden flex-row items-center gap-4 pr-20 self-end rtl:pl-20">
                            <div className="flex flex-row gap-2">
                                <h2>موقعیت:</h2>
                                <span>استانبول، ترکیه</span>
                            </div>
                            <div className="flex flex-row gap-2">
                                <h2>مدت عضویت:</h2>
                                <span>1‌سال و 4ماه</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/*<div*/}
                {/*    className={`px-8 w-full mx-auto xl:hidden flex flex-row justify-between md:justify-end md:gap-4`}>*/}
                {/*    <div className={`flex flex-row items-center gap-2`}>*/}
                {/*        <h2 className={`text-gray-700 dark:text-[#B0B8C7]`}>:موقعیت</h2>*/}
                {/*        <span className={`font-[500]`}>استانبول، ترکیه</span>*/}
                {/*    </div>*/}
                {/*    <div className={`flex flex-row items-center gap-2`}>*/}
                {/*        <h2 className={`text-gray-700 dark:text-[#B0B8C7]`}>:مدت عضویت</h2>*/}
                {/*        <span className={`font-[500]`}>1‌سال و 4ماه</span>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*    tabs*/}
                <div className="flex w-full flex-col gap-6 mt-4 py-4 rounded-xl">
                    <Tabs defaultValue="comments" className={``}>
                        <TabsList
                            className="flex flex-row rtl:flex-row-reverse bg-transparent w-full border-b border-b-[#D1D5DB] dark:border-b-[#374151] rounded-none">
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-Primary-400 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-Primary-400 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-Primary-400 data-[state=active]:shadow-none data-[state=active]:text-Primary-400 md:max-w-42 py-4`}
                                value="hiring-history"
                            >
                                تاریخچه استخدام ها
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-Primary-400 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-Primary-400 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-Primary-400 data-[state=active]:shadow-none data-[state=active]:text-Primary-400 md:max-w-42 py-4`}
                                value="ads"
                            >
                                آگهی ها
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-Primary-400 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-Primary-400 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-Primary-400 data-[state=active]:shadow-none data-[state=active]:text-Primary-400 md:max-w-42 py-4`}
                                value="points"
                            >
                                امتیاز ها
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-Primary-400 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-Primary-400 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-Primary-400 data-[state=active]:shadow-none data-[state=active]:text-Primary-400 md:max-w-42 py-4`}
                                value="comments"
                            >
                                نظرات
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-Primary-400 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-Primary-400 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-Primary-400 data-[state=active]:shadow-none data-[state=active]:text-Primary-400 md:max-w-42 py-4`}
                                value="info"
                            >
                                اطلاعات
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="comments" className={`w-full`}>
                            <SellerComments/>
                        </TabsContent>
                        <TabsContent value="points">
                            <StarsTab/>
                        </TabsContent>
                        <TabsContent value="ads">
                            <Advertisements isOnProfile={true}/>
                        </TabsContent>
                        <TabsContent value="hiring-history">
                            <HiringHistory/>
                        </TabsContent>
                        <TabsContent value="info">
                            <InformationContent/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Page;
