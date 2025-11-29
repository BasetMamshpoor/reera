import React from "react";
import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import TripSidebar from "@/app/[locale]/(public)/ads/trip/_components/TripSidebar";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";

export const metadata = {
    title: `Reera | Trip Ads`,
};
const Page = async ({searchParams, params}) => {
    const locale = await params.locale;
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["kitchen-ads", page],
        queryFn: () =>
            request({
                url: `/ads?category_slug=trip`,
                method: "get",
                query: {page},
            }),
    });
    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "trip", categoryId],
        queryFn: () =>
            request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "trip"
                },
            }),
    });
    return (
        <>
            <div className="w-full flex flex-col gap-16">
                <div className="flex items-center flex-col gap-1 ">
                    <p className="text-xl font-bold text-Primary-950 ">آگهی‌های</p>
                    <p className="text-4xl text-Primary-400 font-bold">سفر یار</p>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <TripSidebar/>
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"trip"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
