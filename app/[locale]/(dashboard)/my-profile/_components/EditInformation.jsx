"use client";
import React from "react";
import {useState} from "react";

import Edit from "@/assets/icons/Edit2.svg";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

import {useTranslation} from "@/app/[locale]/TranslationContext";
import CompleteInformation from "./CompleteInformation";
import CompleteInfo from "./CompleteInfo";
import FinancialInfo from "./FinancialInfo";
import Resume from "./Resume";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";

const EditInformation = () => {
    const dic = useTranslation();
    const e = dic.dashboard.myprofile.edit_information;

    const [preview, setPreview] = useState(null);
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    const {data: CompleteInformationData, isLoading} = useQuery({
        queryKey: ["complete-info"],
        queryFn: async () =>
            await request({
                method: "get",
                url: "/profile",
            }),
    });

    return (
        <>
            <div className="flex flex-col bg-white dark:bg-[#252C36] border border-[#D1D5DB] rounded-xl w-full">
                <div
                    className="hidden lg:flex gap-2 border border-b-[#D1D5DB] dark:border-b-[#374151] px-4 py-6 lg:p-5 w-full">
                    <Edit className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                    <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold">
                        ویرایش اطلاعات
                    </p>
                </div>
                <div className="flex flex-col gap-10 px-6 py-8">
                    <Tabs defaultValue="account-info" className="flex flex-col gap-6">
                        <TabsList
                            className="flex flex-row rtl:flex-row-reverse bg-transparent w-full  border-b border-b-[#D1D5DB] dark:border-b-[#374151] rounded-none">
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent w-full dark:data-[state=active]:text-[#4299C1] dark:data-[state=active]:border-b-2 dark:data-[state=active]:-b-[#4299C1] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-[#4299C1] data-[state=active]:shadow-none data-[state=active]:text-[#4299C1] py-4`}
                                value="account-info"
                            >
                                {e.user_information}
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent w-full dark:data-[state=active]:text-[#4299C1] dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-[#4299C1] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-[#4299C1] data-[state=active]:shadow-none data-[state=active]:text-[#4299C1] py-4`}
                                value="complete-info"
                            >
                                {e.additional_information}
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent w-full dark:data-[state=active]:text-[#4299C1] dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-[#4299C1] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-[#4299C1] data-[state=active]:shadow-none data-[state=active]:text-[#4299C1] py-4`}
                                value="financial-info"
                            >
                                {e.financial_information}
                            </TabsTrigger>
                            <TabsTrigger
                                className={`cursor-pointer dark:data-[state=active]:bg-transparent w-full dark:data-[state=active]:text-[#4299C1] dark:data-[state=active]:border-b-2 dark:data-[state=active]:border-b-[#4299C1] data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-b-[#4299C1] data-[state=active]:shadow-none data-[state=active]:text-[#4299C1] py-4`}
                                value="resume"
                            >
                                {e.resume}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="account-info">
                            <CompleteInformation
                                preview={preview}
                                handleFileChange={handleFileChange}
                                CompleteInformationData={CompleteInformationData}
                                isLoading={isLoading}
                            />
                        </TabsContent>
                        <TabsContent value="complete-info">
                            <CompleteInfo/>
                        </TabsContent>
                        <TabsContent value="financial-info">
                            <FinancialInfo/>
                        </TabsContent>
                        <TabsContent value="resume">
                            <Resume/>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default EditInformation;
