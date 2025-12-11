import React from "react";

import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import VehicesSidebar from "@/app/[locale]/(public)/ads/vehicles/_components/VehiclesSidebar";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";
export const metadata = {
    title: `Reera | Visa Ads`,
};
const Page = async ({searchParams, params}) => {
    const locale = await params.locale;
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    const queryClient = new QueryClient();
    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "visa", categoryId, "newest"],
        queryFn: () =>
            request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "visa"
                },
            }),
    });
    queryClient.prefetchQuery({
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
                    <p className="text-4xl text-Primary-400 font-bold">ویزا</p>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <VehicesSidebar/>
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"visa"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
