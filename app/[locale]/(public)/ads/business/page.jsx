import React from "react";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Providers from "../../../Providers";
import { request } from "@/lib/api";
import AdvsRes from "../business/_components/AdvsRes";
import CommerceSidebar from "@/app/[locale]/(public)/ads/business/_components/CommerceSidebar";

export const metadata = {
  title: `Reera | Business Ads`,
};

const Page = async ({ searchParams }) => {
  const page = Number(searchParams.page || 1);
  const categoryId = searchParams.category_id;

  const queryClient = new QueryClient();

  // Prefetch with current filters
  await queryClient.prefetchQuery({
    queryKey: ["business-filters", categoryId],
    queryFn: () =>
      request({
        url: `/ads/business/get_filters`,
        method: "get",
        query: categoryId ? { category_id: categoryId } : {},
      }),
  });

  await queryClient.prefetchQuery({
    queryKey: ["business-ads", page, categoryId],
    queryFn: () =>
      request({
        url: `/ads?category_slug=business`,
        method: "get",
        query: {
          page,
          ...(categoryId && { category_id: categoryId }),
        },
      }),
  });

  return (
    <>
      <div className="container flex flex-col gap-16 mx-auto">
        <div className="flex items-center flex-col gap-1">
          <p className="text-xl font-bold text-[#142738] dark:text-[#F0F9FB]">
            آگهی‌های
          </p>
          <p className="text-4xl text-Primary-400 font-bold">تجارت</p>
        </div>
        <div className="flex flex-col lg:flex-row">
          <Providers dehydratedState={dehydrate(queryClient)}>
            <CommerceSidebar />
            <AdvsRes page={page} />
          </Providers>
        </div>
      </div>
    </>
  );
};

export default Page;
