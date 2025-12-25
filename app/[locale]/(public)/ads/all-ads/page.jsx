import React from "react";
import {dehydrate, QueryClient} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Details from "./_components/Details";
import Providers from "@/app/[locale]/Providers";

export const metadata = {
    title: `Reera | All Ads`,
};
const Page = async ({searchParams, params}) => {
    const locale = await params.locale
    const queryClient = new QueryClient();
    const page = Number(searchParams.page || 1);
    await queryClient.prefetchQuery({
        queryKey: ["ads", page, undefined, undefined, "newest"],
        queryFn: async () =>
            await request({
                url: "/ads",
                method: "get",
                query: {page},
            }),
    });
    await queryClient.prefetchQuery({
        queryKey: ["advs-filter"],
        queryFn: async () =>
            await request({
                url: "/ads/get-filter",
                method: "get",
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
