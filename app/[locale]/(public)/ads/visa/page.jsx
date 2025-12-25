import React from "react";
import {QueryClient, dehydrate} from "@tanstack/react-query";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import Details from "./_components/Details";

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
            <div className="flex gap-6 lg:flex-row flex-col">
                <Providers dehydratedState={dehydrate(queryClient)}>
                    <Details page={page} locale={locale}/>
                </Providers>
            </div>
        </>
    );
};

export default Page;
