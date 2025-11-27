import React from "react";

import {dehydrate, QueryClient} from "@tanstack/react-query";
import RecruitmentSidebar from "@/app/[locale]/(public)/ads/recruitment/_components/RecruitmentSidebar";
import Providers from "../../../Providers";
import AdvsRes from "../recruitment/_components/AdvsRes";

export const metadata = {
    title: `Reera | Recruitment Ads`,
};
const Page = async ({searchParams}) => {
    const queryClient = new QueryClient();
    const page = Number(searchParams.page || 1);
    await queryClient.prefetchQuery({
        queryKey: ["recruitment-ads", page],
        queryFn: () =>
            request({
                url: `/ads?category_slug=recruitment`,
                method: "get",
                query: {page},
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
            <div className="flex items-center flex-col gap-16">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-bold text-xl text-[#142738]">آگهی‌های</p>
                        <p className="text-4xl text-Primary-400 font-bold">
                            استخدام و کاریابی
                        </p>
                    </div>
                    <div className="flex items-center gap-6">
                        <div
                            className="flex items-center px-3 py-2 gap-6 border border-gray-100 dark:border-gray-800 rounded-md">
                            <p className="text-gray-800 dark:text-gray-200 text-sm">
                                معماری و عمرانی
                            </p>
                            <div
                                className="flex items-center justify-center px-2 bg-gray-100 dark:text-gray-900 rounded-3xl text-gray-900 text-xs">
                                1000
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex gap-6 w-full">
                    <Providers>
                        <RecruitmentSidebar/>
                        <AdvsRes page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
