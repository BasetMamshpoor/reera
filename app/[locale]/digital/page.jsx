import React from "react";
import Sidebar from "@/components/Advertisements/Sidebar";
import AdvsRes from "@/app/[locale]/ads/_components/AdvsRes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Providers from "../Providers";
import { request } from "@/lib/api";
const Page = async ({ searchParams }) => {
    const queryClient = new QueryClient();
    const page = Number(searchParams.page || 1);
    await queryClient.prefetchQuery({
        queryKey: ["advs", page],
        queryFn: () =>
            request({
                url: "/ads",
                method: "get",
                query: { page },
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
            <div className="container flex flex-col gap-16">
                <div className="flex items-center flex-col gap-1">
                    <p className="text-xl font-bold text-[#142738] dark:text-[#F0F9FB]">
                        آگهی‌های
                    </p>
                    <p className="text-4xl text-[#4299C1] font-bold">دیجیتال</p>
                </div>
                <div className="flex gap-6">
                    <Providers dehydratedState={dehydrate(queryClient)}>
                        <Sidebar />
                        <AdvsRes page={page} />
                    </Providers>
                </div>
            </div>
        </>
    );
};

export default Page;
