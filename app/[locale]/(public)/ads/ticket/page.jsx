import React from "react";

import AdvsRes from "./_components/AdvsRes";
import { QueryClient, dehydrate } from "@tanstack/react-query";
import Providers from "../../../Providers";
import { request } from "@/lib/api";

import TicketsSidebar from "./_components/TicketsSidebar";
export const metadata = {
  title: `Reera | Tickets Ads`,
};
const Page = async ({ searchParams }) => {
  const queryClient = new QueryClient();
  const page = Number(searchParams.page || 1);
  await queryClient.prefetchQuery({
    queryKey: ["tickets-ads", page],
    queryFn: () =>
      request({
        url: `/ads?category_slug=ticket`,
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
          <p className="text-4xl text-Primary-400 font-bold">بلیت و تور</p>
        </div>
        <div className="flex gap-6 lg:flex-row flex-col">
          <Providers dehydratedState={dehydrate(queryClient)}>
            <TicketsSidebar />
            <AdvsRes page={page} />
          </Providers>
        </div>
      </div>
    </>
  );
};

export default Page;
