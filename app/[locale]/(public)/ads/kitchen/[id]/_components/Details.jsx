"use client"
import React, {useState} from "react";
import Share from "@/components/Share";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ProductAccordion from "./ProductAccordion";
import Flag from "@/assets/icons/Flag.svg";
import SellerComments from "../../../../register-ad/seller/_components/SellerComments";
import SwiperModal from "@/app/[locale]/(public)/ads/_components/SwiperModal";
import Information from "./Information"
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useParams} from "next/navigation";
import InformationAd from "../../../_components/InformationAd"
import LocationAccess from "./LocationAccess"
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";
import Like from "@/components/Like";
import {useSession} from "next-auth/react";

const Page = () => {
    const dic = useTranslation()
    const a = dic.public.ads.kitchen
    const {locale} = useParams()
    const {id} = useParams()
    const {data: session} = useSession()

    const {data, isLoading} = useQuery({
        queryKey: ["kitchen", "slug"],
        queryFn: async () => {
            return await request({
                method: "get",
                url: `/ads/kitchen/${id}`
            })
        }
    })
    if (isLoading) {
        return <div className="flex justify-center w-full h-screen">
            <Spinner/>
        </div>
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 w-full">
                <div className="lg:hidden flex items-center justify-end w-full px-4 gap-6">
                    {/*<button>*/}
                    {/*    <Flag className="fill-gray-700 dark:fill-gray-300 "/>*/}
                    {/*</button>*/}
                    <Share/>
                    {data?.data?.is_like !== undefined && (
                        <Like
                            id={data?.data?.id}
                            url={"/ads"}
                            isLike={data?.data?.is_like}
                        />
                    )}
                </div>

                <div className="flex flex-col gap-16 lg:col-span-2">
                    <SwiperModal data={data?.data} className="w-full"/>
                    <div className="flex flex-col gap-10">
                        <Tabs
                            defaultValue="account"
                            className="hidden lg:flex flex-col gap-6"
                            dir={locale === "fa" ? "rtl" : "ltr"}
                        >
                            <TabsList className="hidden lg:flex w-full bg-transparent border-b p-0 rounded-0">
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="account">
                                    {a.information}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="password">
                                    {a.location}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="password1">
                                    {a.contract_conditions}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="password3">
                                    {a.comments}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <Information data={data?.data} a={a}/>
                            </TabsContent>
                            <TabsContent value="password">
                                <LocationAccess data={data?.data} isLoading={isLoading}/>
                            </TabsContent>
                            <TabsContent value="password1">
                                <div
                                    className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                                    <ProductAccordion a={a}/>
                                </div>
                            </TabsContent>
                            <TabsContent value="password3">
                                <SellerComments/>
                            </TabsContent>
                        </Tabs>

                        <div className="flex lg:hidden flex-col gap-10">
                            <InformationAd session={session} data={data?.data} isLoading={isLoading} locale={locale}
                                           a={a}/>

                            <Information data={data?.data} a={a}/>


                            <LocationAccess data={data?.data} isLoading={isLoading}/>

                            <div
                                className="flex flex-col gap-6 py-6 px-4 bg-surface border border-default-divider ">
                                <ProductAccordion/>
                            </div>
                            <div
                                className="flex flex-col gap-6 py-6 px-4 bg-surface border border-default-divider ">
                                <SellerComments/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex ">
                    <InformationAd session={session} data={data?.data} isLoading={isLoading} locale={locale} a={a}/>
                </div>
            </div>
        </>
    );
};

export default Page;
