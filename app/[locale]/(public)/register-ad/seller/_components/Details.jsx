"use client"
import React from 'react';
import ArrowRight from "@/assets/icons/arrow-right.svg";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList, BreadcrumbPage,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Image from "next/image";
import ImageOverlay from "@/assets/images/wave-haikei.svg";
import GreenTick from "@/assets/icons/tick-circle.svg";
import Star from "@/assets/icons/star.svg";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import StarsTab from "@/app/[locale]/(public)/register-ad/seller/_components/StarsTab";
import HiringHistory from "@/app/[locale]/(public)/register-ad/seller/_components/HiringHistory";
import InformationContent from "@/app/[locale]/(public)/register-ad/seller/_components/InformationContent";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Comments from "@/components/Comments";
import ADS from "./ADS";
import Spinner from "@/components/Spinner";

const Details = () => {
    const {id} = useParams();
    const {locale} = useParams()
    const {data, isLoading} = useQuery({
        queryKey: [`seller`, "user_show", id],
        queryFn: async () => {
            return await request({
                url: `/user_show/${id}`,
            })
        }
    });
    const i = data?.data || []

    if (isLoading) {
        return <div className="w-full flex items-center justify-center py-4">
            <Spinner size={40}/>
        </div>;
    }
    const user_show = 1
    return (
        <>
            <div className={`flex flex-col gap-4 mt-4 w-full`}>
                <button
                    className={`flex flex-row gap-4 items-center self-end md:hidden`}>
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
                <div className="flex flex-col w-full">
                    <div className="relative w-full h-[300px] max-h-[300px] overflow-hidden">
                        <Image
                            unoptimized
                            src={`/images/city-profile.jpg`}
                            alt="0"
                            fill
                            className={`w-full object-cover`}
                        />
                        <div className="w-full absolute -bottom-10 md:-bottom-16 lg:-bottom-32 xl:-bottom-40">
                            <ImageOverlay className="!w-full !h-full fill-[#F9FAFB] dark:fill-[#14181D]"/>
                        </div>
                    </div>
                    <div className="w-full flex flex-col gap-4 px-6">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-4">
                                <div
                                    className="bg-surface p-2 rounded-2xl w-16 h-16 lg:!w-24 lg:!h-24 border-2 border-surface shadow-sm">
                                    <Image
                                        src={i.profile}
                                        className=""
                                        width={100}
                                        height={100}
                                        alt="image"
                                    />
                                </div>
                                <div className="flex flex-col lg:flex-row gap-1 lg:gap-6">
                                    <h2 className="text-lg lg:text-2xl font-medium">{i.name}</h2>
                                    {/*<div className="bg-[#DCFCE8] rounded-lg px-2 flex flex-row py-2 gap-2">*/}
                                    {/*    <GreenTick className="fill-[#16A34A] !w-4 !h-4 lg:!w-5 lg:!h-5"/>*/}
                                    {/*    <h2 className="lg:text-base text-sm font-medium text-[#16A34A]">تایید شده</h2>*/}
                                    {/*</div>*/}
                                </div>
                            </div>
                            <div className="flex gap-2 items-center">
                                <span className="pt-2">{i.ratings}</span>
                                <Star className="fill-warning-main"/>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex flex-row gap-2">
                                <h2 className="font-medium">مدت عضویت:</h2>
                                <span>{i.duration}</span>
                            </div>
                            <h2 className="font-medium">{i.bio}</h2>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-col gap-6 mt-4 py-4 rounded-xl">
                    <Tabs dir={locale === "fa" ? "rtl" : "ltr"} defaultValue="ads" className={``}>
                        <TabsList
                            className="flex flex-row bg-transparent w-full border-b border-b-Gray-50 rounded-none">
                            {/*<TabsTrigger*/}
                            {/*    className={`cursor-pointer dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-Primary-400 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-Primary-400 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-Primary-400 data-[state=active]:shadow-none data-[state=active]:text-Primary-400 md:max-w-42 py-4`}*/}
                            {/*    value="info">*/}
                            {/*    اطلاعات*/}
                            {/*</TabsTrigger>*/}
                            {/*<TabsTrigger*/}
                            {/*    className={`cursor-pointer dark:data-[state=active]:bg-transparent dark:data-[state=active]:text-Primary-400 dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-Primary-400 data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-Primary-400 data-[state=active]:shadow-none data-[state=active]:text-Primary-400 md:max-w-42 py-4`}*/}
                            {/*    value="hiring-history"*/}
                            {/*>*/}
                            {/*    تاریخچه استخدام ها*/}
                            {/*</TabsTrigger>*/}
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

                        </TabsList>
                        <TabsContent value="comments" className={`w-full`}>
                            <Comments user_show={user_show} url={`/user_show`} id={id}/>
                        </TabsContent>
                        <TabsContent value="points">
                            <StarsTab id={id}/>
                        </TabsContent>
                        <TabsContent value="ads">
                            <ADS locale={locale} id={id}/>
                        </TabsContent>
                        {/*<TabsContent value="hiring-history">*/}
                        {/*    <HiringHistory/>*/}
                        {/*</TabsContent>*/}
                        {/*<TabsContent value="info">*/}
                        {/*    <InformationContent/>*/}
                        {/*</TabsContent>*/}
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Details;