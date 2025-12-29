import React from "react";
import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import Details from "./_components/Details";

export const metadata = {
    title: `Reera | Business Ads`,
};

const Page = async ({searchParams, params}) => {
    const locale = await params.locale
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;

    const queryClient = new QueryClient();

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
            <div className="w-full">
                <Providers dehydratedState={dehydrate(queryClient)}>
                    <Details page={page} locale={locale} />
                </Providers>
            </div>
        </>
    );
};

export default Page;
