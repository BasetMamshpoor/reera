import React from "react";

import {dehydrate, QueryClient} from "@tanstack/react-query";
import RecruitmentSidebar from "@/app/[locale]/(public)/ads/recruitment/_components/RecruitmentSidebar";
import Providers from "../../../Providers";
import {request} from "@/lib/api";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";

export const metadata = {
    title: `Reera | Recruitment Ads`,
};
const Page = async ({searchParams, params}) => {
    const locale = await params.locale;
    const page = Number(searchParams.page || 1);
    const categoryId = searchParams.category_id;
    const queryClient = new QueryClient();


    await queryClient.prefetchQuery({
        queryKey: ["ads", page, "recruitment", categoryId, "newest"],
        queryFn: () =>
            request({
                url: `/ads`,
                method: "get",
                query: {
                    page, category_id: categoryId, category_slug: "recruitment"
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
            <div className="container flex flex-col gap-16 mx-auto">
                <div className="flex flex-col items-center gap-6">
                    <div className="flex flex-col items-center gap-2">
                        <p className="font-bold text-xl text-Primary-900">آگهی‌های</p>
                        <p className="text-4xl text-Primary-400 font-bold">
                            استخدام و کاریابی
                        </p>
                    </div>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <RecruitmentSidebar/>
                        <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"recruitment"}
                                 page={page}/>
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
