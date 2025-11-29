import React from "react";
import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import DigitalSidebar from "@/app/[locale]/(public)/ads/digital/_components/DigitalSidebar";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";

export const metadata = {
    title: `Reera | Digital Ads`,
};

const Page = async ({searchParams, params}) => {
    const locale = await params.locale;
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ["digital-filters", categoryId],
        queryFn: () =>
            request({
                url: `/ads/digital/get_filters`,
                method: "get",
                query: categoryId ? {category_id: categoryId} : {},
            }),
    });

    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "digital", categoryId],
        queryFn: () =>
            request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "digital"
                },
            }),
    });

    return (
        <>
            <div className="container flex flex-col gap-16 mx-auto">
                <div className="flex items-center flex-col gap-1">
                    <p className="text-xl font-bold text-[#142738] dark:text-[#F0F9FB]">
                        آگهی‌های
                    </p>
                    <p className="text-4xl text-Primary-400 font-bold">دیجیتال</p>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <DigitalSidebar/>
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"digital"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
