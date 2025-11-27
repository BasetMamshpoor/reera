"use client";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useParams } from "next/navigation";
import React from "react";

const EstateTabs = () => {
  const locale = useParams();
  const dic = useTranslation();
  const et = dic.all_ads.estate;
  return (
    <Tabs
      dir={locale === "fa" ? "rtl" : "ltr"}
      defaultValue="all"
      className="py-6"
    >
      <TabsList className="flex items-center gap-6">
        <TabsTrigger
          className="flex items-center max-w-52 w-full gap-4 px-6 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
          value="all"
        >
          <p className="text-sm  pt-1">{et.all}</p>
          <div className="px-2 py-1 rounded-full bg-Gray-100 text-Gray-900 data-[state=active]:bg-Gray-50 data-[state=active]:text-Primary-500 ">
            <p className="pt-1 px-1">10</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          className="flex items-center max-w-52 w-full gap-4 px-6 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
          value="verified"
        >
          <p className="text-sm data-[state=active]:text-white pt-1">
            {et.buying_selling}
          </p>
          <div className="px-2 py-1 rounded-full bg-Gray-100 text-Gray-900 data-[state=active]:bg-Gray-50 data-[state=active]:text-Primary-500">
            <p className="pt-1 px-1">3</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          className="flex items-center rtl:max-w-52 ltr:max-w-[180px] w-full gap-4 px-6 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
          value="pending_verification"
        >
          <p className="text-sm data-[state=active]:text-white pt-1">
            {et.short_time_rental}
          </p>
          <div className="px-2 py-1 rounded-full bg-Gray-100 text-Gray-900 data-[state=active]:bg-Gray-50 data-[state=active]:text-Primary-500">
            <p className="pt-1 px-1">2</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          className="flex items-center max-w-52 w-full gap-4 px-6 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
          value="rejected"
        >
          <p className="text-sm data-[state=active]:text-white pt-1">
            {et.long_time_rental}
          </p>
          <div className="px-2 py-1 rounded-full bg-Gray-100 text-Gray-900 data-[state=active]:bg-Gray-50 data-[state=active]:text-Primary-500">
            <p className="pt-1 px-1">5</p>
          </div>
        </TabsTrigger>
        <TabsTrigger
          className="flex items-center max-w-52 w-full gap-4 px-6 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
          value="expired"
        >
          <p className="text-sm data-[state=active]:text-white pt-1">
            {et.roommate}
          </p>
          <div className="px-2 py-1 rounded-full bg-Gray-100 text-Gray-900 data-[state=active]:bg-Gray-50 data-[state=active]:text-Primary-500">
            <p className="pt-1 px-1">0</p>
          </div>
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all" className="pt-6">
        {/* <Information /> */}
      </TabsContent>
      <TabsContent value="verified" className="pt-6">
        2
      </TabsContent>
      <TabsContent value="pending_verification" className="pt-6">
        3
      </TabsContent>
      <TabsContent value="rejected" className="pt-6">
        4
      </TabsContent>
      <TabsContent value="expired" className="pt-6">
        5
      </TabsContent>
    </Tabs>
  );
};

export default EstateTabs;
