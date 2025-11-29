import React from "react";
import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import AllAdsSidebar from "@/app/[locale]/(public)/ads/all-ads/_components/AllAdsSidebar";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";

export const metadata = {
    title: `Reera | Transportation Ads`,
};
const Page = async ({searchParams, params}) => {
    const locale = await params.locale;
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "transportation", categoryId],
        queryFn: () =>
            request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "transportation"
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
            <div className="w-full flex flex-col gap-16">
                <div className="flex items-center flex-col gap-1 ">
                    <p className="text-xl font-bold text-Primary-950 ">آگهی‌های</p>
                    <p className="text-4xl text-Primary-400 font-bold">بلیت و تور</p>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <AllAdsSidebar/>
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"transportation"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
