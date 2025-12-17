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
        queryKey: ["ads", page, "housing", categoryId, "newest"],
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
            <div className="container flex flex-col gap-16 mx-auto">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-bold text-xl text-Primary-950">آگهی‌های</p>
                        <p className="text-4xl text-Primary-400 font-bold">املاک</p>
                    </div>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
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
