import React from "react";
import Providers from "../../../Providers";
import {QueryClient, dehydrate} from "@tanstack/react-query";

import EstateTabs from "./_components/EstateTabs";
import HousingSidebar from "./_components/HousingSidebar";
import {request} from "@/lib/api";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";

export const metadata = {
    title: `Reera | Housing Ads`,
};
const Page = async ({searchParams, params}) => {
    const locale = await params.locale
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["housing-filters", categoryId],
        queryFn: async () =>
            await request({
                url: `/ads/housing/get_filters`,
                method: "get",
                query: categoryId ? {category_id: categoryId} : {},
            }),
    });

    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "housing", categoryId],
        queryFn: async () =>
            await request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "housing"
                },
            }),
    });

    return (
        <>
            <div className="flex items-center flex-col gap-16">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-bold text-xl text-[#142738]">آگهی‌های</p>
                        <p className="text-4xl text-Primary-400 font-bold">املاک</p>
                    </div>
                    {/*<div className="flex items-center gap-6">*/}
                    {/*    <div*/}
                    {/*        className="flex items-center px-3 py-2 gap-6 border border-gray-100 dark:border-gray-800 rounded-md">*/}
                    {/*        <p className="text-gray-800 dark:text-gray-200 text-sm">*/}
                    {/*            معماری و عمرانی*/}
                    {/*        </p>*/}
                    {/*        <div*/}
                    {/*            className="flex items-center justify-center px-2 bg-gray-100 dark:text-gray-900 rounded-3xl text-gray-900 text-xs">*/}
                    {/*            1000*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <EstateTabs/>*/}
                    {/*</div>*/}
                </div>
                <div className="flex gap-6 w-full lg:flex-row flex-col">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <HousingSidebar/>
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"housing"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
