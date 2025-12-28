import React from "react";
import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import CommerceSidebar from "@/app/[locale]/(public)/ads/business/_components/CommerceSidebar";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";

export const metadata = {
    title: `Reera | Business Ads`,
};

const Page = async ({searchParams, params}) => {
    const locale = await params.locale
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    const queryClient = new QueryClient();

    // Prefetch with current filters
    await queryClient.prefetchQuery({
        queryKey: ["business-filters", categoryId],
        queryFn: async () =>
            await request({
                url: `/ads/business/get_filters`,
                method: "get",
                query: categoryId ? {category_id: categoryId} : {},
            }),
    });


    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "business", categoryId, "newest"],
        queryFn: async () =>
            await request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "business"
                },
            }),
    });

    return (
        <>
            <div className="container flex flex-col gap-16 mx-auto">
                <div className="flex items-center flex-col gap-1">
                    <p className="text-xl font-bold text-Primary-950">
                        آگهی‌های
                    </p>
                    <p className="text-4xl text-Primary-400 font-bold">تجارت</p>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <CommerceSidebar category_slug={"business"}/>
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"business"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
