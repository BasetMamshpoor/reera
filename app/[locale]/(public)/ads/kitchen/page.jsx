import React from "react";
import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import KitchenSidebar from "@/app/[locale]/(public)/ads/kitchen/_components/KitchenSidebar";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";

export const metadata = {
    title: `Reera | Kitchen Ads`,
};
const Page = async ({searchParams, params}) => {
    const locale = await params.locale;

    const queryClient = new QueryClient();
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "kitchen", categoryId],
        queryFn: () =>
            request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "kitchen"
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
                    <p className="text-4xl text-Primary-400 font-bold">خانه و آشپزخانه</p>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <KitchenSidebar/>
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"kitchen"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
