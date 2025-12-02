"use client";
import React, {useState} from "react";
import Share from "@/components/Share";
import Heart from "@/assets/icons/heart.svg";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ProductAccordion from "./ProductAccordion";
import Flag from "@/assets/icons/Flag.svg";
import SellerComments from "../../../../register-ad/seller/_components/SellerComments";
import SwiperModal from "@/app/[locale]/(public)/ads/_components/SwiperModal";

import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useParams} from "next/navigation";
import InformationAd from "./InformationAd";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";
import Like from "@/components/Like";
import {useSession} from "next-auth/react";

// New components for Visa details
import VisaBasicInfo from "./VisaBasicInfo";
import VisaDocuments from "./VisaDocuments";
import VisaConditions from "./VisaConditions";
import VisaTypes from "./VisaTypes";

const VisaDetailsPage = () => {
    const dic = useTranslation();
    const a = dic.public.ads.visa; // Make sure you have visa translations
    const {locale} = useParams();
    const {id} = useParams();
    const {data: session} = useSession();

    const {data, isLoading} = useQuery({
        queryKey: ["visa", id],
        queryFn: async () => {
            return await request({
                method: "get",
                url: `/ads/visa/${id}`,
            });
        },
    });

    if (isLoading) {
        return (
            <div className="flex items-center justify-center w-full">
                <Spinner/>
            </div>
        );
    }

    const visaData = data?.data;

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
                <div className="lg:hidden flex items-center justify-end w-full px-4 gap-6">
                    <Share/>
                    <Like id={visaData?.id} url={"/ads"}/>
                </div>

                <div className="flex flex-col gap-16 lg:col-span-2">
                    <SwiperModal data={visaData} className="w-full"/>
                    <div className="flex flex-col gap-10">
                        <Tabs
                            defaultValue="basic-info"
                            className="hidden lg:flex flex-col gap-6"
                            dir={locale === "fa" ? "rtl" : "ltr"}
                        >
                            <TabsList className="hidden lg:flex w-full bg-transparent border-b p-0 rounded-0">
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2 font-bold text-sm"
                                    value="basic-info"
                                >
                                    {a?.basic_info || "Basic Information"}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2 font-bold text-sm"
                                    value="visa-types"
                                >
                                    {a?.visa_types || "Visa Types"}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2 font-bold text-sm"
                                    value="documents"
                                >
                                    {a?.documents || "Required Documents"}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2 font-bold text-sm"
                                    value="conditions"
                                >
                                    {a?.conditions || "Visa Conditions"}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2 font-bold text-sm"
                                    value="reviews"
                                >
                                    {a?.reviews || "Reviews"}
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="basic-info">
                                <VisaBasicInfo data={visaData} a={a}/>
                            </TabsContent>
                            <TabsContent value="visa-types">
                                <VisaTypes data={visaData} a={a}/>
                            </TabsContent>
                            <TabsContent value="documents">
                                <VisaDocuments data={visaData} a={a}/>
                            </TabsContent>
                            <TabsContent value="conditions">
                                <VisaConditions data={visaData} a={a}/>
                            </TabsContent>
                            <TabsContent value="reviews">
                                <SellerComments/>
                            </TabsContent>
                        </Tabs>

                        {/* Mobile View */}
                        <div className="flex lg:hidden flex-col gap-10">
                            <InformationAd
                                session={session}
                                data={visaData}
                                isLoading={isLoading}
                                locale={locale}
                                a={a}
                            />

                            <VisaBasicInfo data={visaData} a={a}/>

                            <VisaTypes data={visaData} a={a}/>

                            <VisaDocuments data={visaData} a={a}/>

                            <VisaConditions data={visaData} a={a}/>

                            <div className="flex flex-col gap-6 py-6 px-4 bg-surface border border-default-divider">
                                <SellerComments/>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar - Desktop */}
                <div className="hidden lg:flex">
                    <InformationAd
                        session={session}
                        data={visaData}
                        isLoading={isLoading}
                        locale={locale}
                        a={a}
                    />
                </div>
            </div>
        </>
    );
};

export default VisaDetailsPage;
