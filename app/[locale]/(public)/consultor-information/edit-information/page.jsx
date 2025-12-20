"use client";
import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import EditPen from "@/assets/icons/Edit2.svg";

import EditInformationForm from "./_components/EditInformationForm";

import Financial from "./_components/Financial";
import Resume from "./_components/Resume";
import {useTranslation} from "@/app/[locale]/TranslationContext";
const Page = () => {
  const dic = useTranslation();
  const t = dic.consultor.edit;
  return (
    <div className="w-full bg-surface rounded-lg h-full  border border-default-divider flex flex-col gap-8">
      <div className="flex items-center gap-4 border-b border-b-default-divider py-6 px-4">
        <EditPen />
        <h2 className="text-xl font-semibold ">{t.edit_information} </h2>
      </div>
      <Tabs defaultValue="account" className="w-full h-full">
        <TabsList className={`flex rtl:flex-row-reverse items-center py-0`}>
          <TabsTrigger
            value="account"
            className={`w-full cursor-pointer data-[state=active]:border-b-2 data-[state=active]:text-Primary-400 data-[state=active]:border-b-Primary-400 data-[state=active]:font-extrabold`}
          >
            {t.edit_information}
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className={`w-full cursor-pointer data-[state=active]:border-b-2 data-[state=active]:text-Primary-400 data-[state=active]:border-b-Primary-400 data-[state=active]:font-extrabold `}
          >
            {t.additional_information}
          </TabsTrigger>
          <TabsTrigger
            value="resume"
            className={`w-full cursor-pointer data-[state=active]:border-b-2 data-[state=active]:text-Primary-400 data-[state=active]:border-b-Primary-400 data-[state=active]:font-extrabold `}
          >
            {t.resume}
          </TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <EditInformationForm />
        </TabsContent>
        <TabsContent value="financial">
          <Financial />
        </TabsContent>
        <TabsContent className={`h-full`} value="resume">
          <Resume />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
