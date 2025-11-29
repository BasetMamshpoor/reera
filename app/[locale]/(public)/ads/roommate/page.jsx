import React from "react";

import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import RoommateSidebar from "./_components/RoommateSidebar";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";

export const metadata = {
    title: `Reera | Roommate Ads`,
};
const Page = async ({searchParams, params}) => {
    const locale = await params.locale;
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "roommate", categoryId],
        queryFn: () =>
            request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "roommate"
                },
            }),
    });
    await queryClient.prefetchQuery({
        queryKey: ["advs-filter"],
        queryFn: () =>
            request({
                url: "/ads/get-filter",
                method: "get",
            }),
    });
    return (
        <>
            <div className="container flex flex-col gap-16">
                <div className="flex items-center flex-col gap-1">
                    <p className="text-xl font-bold text-[#142738] dark:text-[#F0F9FB]">
                        آگهی‌های
                    </p>
                    <p className="text-4xl text-[#4299C1] font-bold">ریـــــرا هم خانه</p>
                </div>
                <div className="flex gap-6">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <RoommateSidebar/>
                        {/*    <div*/}
                        {/*        className="flex items-center gap-2 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] rounded-xl max-w-120 ">*/}
                        {/*        <div className="relative flex-shrink-0 overflow-hidden rounded-lg w-1/3 h-full">*/}
                        {/*            <img*/}
                        {/*                src="/images/photo.png"*/}
                        {/*                alt="Photo"*/}
                        {/*                className="object-cover w-full h-full"*/}
                        {/*            />*/}
                        {/*            /!*<div className="absolute top-0 w-fit h-full z-20">*!/*/}
                        {/*            /!*    <ImageOverlay*!/*/}
                        {/*            /!*        className="!w-full !h-full fill-[#F9FAFB] dark:fill-[#14181D]"/>*!/*/}
                        {/*            /!*</div>*!/*/}
                        {/*        </div>*/}
                        {/*        <div className="flex flex-col p-2 gap-3">*/}
                        {/*            <div className="flex flex-col gap-1 pl-2 pb-2">*/}
                        {/*                <p className="text-sm text-[#3B3E46] dark:text-[#E0E2E5] font-bold">*/}
                        {/*                    راهنمای اجاره خانه در ترکیه برای مهاران*/}
                        {/*                </p>*/}
                        {/*                <p className="text-sm text-gray-500 dark:text-white line-clamp-2">*/}
                        {/*                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ*/}
                        {/*                    و با استفاده از طراحان گرافیک است لورم ایپسوم متن ساختگی*/}
                        {/*                    با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان*/}
                        {/*                    گرافیک است*/}
                        {/*                </p>*/}
                        {/*            </div>*/}
                        {/*            <div className="flex items-center justify-between">*/}
                        {/*                <div className="flex items-center gap-2">*/}
                        {/*                    /!*<Location className="fill-gray-700 dark:fill-gray-300"/>*!/*/}
                        {/*                    <div className="text-xs text-[#3B3E46] dark:text-[#E0E2E5]">*/}
                        {/*                        استانبول، ترکیه*/}
                        {/*                    </div>*/}
                        {/*                </div>*/}
                        {/*                /!*<div className="flex items-center gap-2">*!/*/}
                        {/*                /!*    <Calender className="fill-gray-700 dark:fill-gray-300"/>*!/*/}
                        {/*                /!*    <div className="text-xs text-[#3B3E46] dark:text-[#E0E2E5]">*!/*/}
                        {/*                /!*        1404/2/12*!/*/}
                        {/*                /!*    </div>*!/*/}
                        {/*                /!*</div>*!/*/}
                        {/*            </div>*/}
                        {/*        </div>*/}
                        {/*    </div>*/}
                        {/*    <div*/}
                        {/*        className="flex flex-col gap-5 px-4 py-3 bg-white dark:bg-[#252C36]  border border-[#D1D5DB] dark:border-[#374151] rounded-xl ">*/}
                        {/*        <div className="flex items-center gap-2 ">*/}
                        {/*            /!*<Flash className="fill-gray-700 dark:fill-gray-300 w-5 h-5"/>*!/*/}
                        {/*            <p className="text-sm text-[#3B3E46] dark:text-[#E0E2E5]">*/}
                        {/*                نیاز به کمک برای اجاره یا خرید دارید؟*/}
                        {/*            </p>*/}
                        {/*        </div>*/}
                        {/*        <Link*/}
                        {/*            href="/public"*/}
                        {/*            className="flex items-center justify-center px-4 py-2  border border-[#4299C1] bg-white rounded-xl font-bold text-sm text-[#4299C1] "*/}
                        {/*        >*/}
                        {/*            درخواست مشاروه*/}
                        {/*        </Link>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"roommate"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
