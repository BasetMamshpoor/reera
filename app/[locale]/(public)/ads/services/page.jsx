import React from "react";
import Sidebar from "@/app/[locale]/(public)/ads/all-ads/_components/AllAdsSidebar";
import AdvsRes from "./_components/AdvsRes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Providers from "../../../Providers";
import { request } from "@/lib/api";
import ServicesSidebar from "@/app/[locale]/(public)/ads/services/_components/ServicesSidebar";
export const metadata = {
  title: `Reera | Services Ads`,
};
const Page = async ({ searchParams }) => {
  const queryClient = new QueryClient();
  const page = Number(searchParams.page || 1);
  await queryClient.prefetchQuery({
    queryKey: ["services-ads", page],
    queryFn: () =>
      request({
        url: `/ads?category_slug=services`,
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
      <div className="w-full flex flex-col gap-16">
        <div className="flex items-center flex-col gap-1 ">
          <p className="text-xl font-bold text-Primary-950 ">آگهی‌های</p>
          <p className="text-4xl text-Primary-400 font-bold">خدمات</p>
        </div>
        <div className="flex gap-6 lg:flex-row flex-col">
          <Providers dehydratedState={dehydrate(queryClient)}>
            <ServicesSidebar />
            <AdvsRes page={page} />
          </Providers>
        </div>
      </div>
    </>
  );
};

export default Page;
