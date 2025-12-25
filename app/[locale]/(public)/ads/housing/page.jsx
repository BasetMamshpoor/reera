import React from "react";
import Providers from "../../../Providers";
import {QueryClient, dehydrate} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Details from "./_components/Details";

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
            <div className="w-full">
                <Providers dehydratedState={dehydrate(queryClient)}>
                    <Details page={page} locale={locale} />
                </Providers>
            </div>
        </>
    );
};

export default Page;
