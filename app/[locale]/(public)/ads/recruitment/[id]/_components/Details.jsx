"use client"
import React, {useState} from "react";
import Share from "@/components/Share";
import Heart from "@/assets/icons/heart.svg";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import ProductAccordion from "./ProductAccordion";
import Flag from "@/assets/icons/Flag.svg";
import SellerComments from "../../../../register-ad/seller/_components/SellerComments";
import SwiperModal from "@/app/[locale]/(public)/ads/_components/SwiperModal";
import Information from "./Information"
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Skill from "./Skill"
import Rules from "./Rules"
import {useParams} from "next/navigation";
import LocationAccess from "./LocationAccess"
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";
import Like from "@/components/Like";
import {useSession} from "next-auth/react";
import InformationAd from "@/app/[locale]/(public)/ads/_components/InformationAd";

const Page = () => {
    const dic = useTranslation()
    const a = dic.public.ads.job_search
    const {locale} = useParams()
    const {id} = useParams()
    const {data: session} = useSession()
    const [jobSearch, setJobSearch] = useState(true)

    const {data, isLoading} = useQuery({
        queryKey: ["recruitment", "slug"],
        queryFn: async () => {
            return await request({
                method: "get",
                url: `/ads/recruitment/${id}`
            })
        }
    })
    if (isLoading) {
        return <div className="flex items-center justify-center w-full h-screen">
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
                    <Like isLike={data?.data?.is_like} id={data?.data.id} url={"/ads"}/>
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
                                    {a.general_info}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="password">
                                    {a.skills}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="password1">
                                    {a.location_access}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="password2">
                                    {a.rules}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="password3">
                                    {a.contract_terms}
                                </TabsTrigger>
                                <TabsTrigger
                                    className="data-[state=active]:border-b-Primary-400 data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                                    value="password4">
                                    {a.comments}
                                </TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <Information data={data?.data} a={a}/>
                            </TabsContent>
                            <TabsContent value="password">
                                <Skill data={data?.data} a={a}/>
                            </TabsContent>
                            <TabsContent value="password1">
                                <LocationAccess a={a} data={data?.data} isLoading={isLoading}/>
                            </TabsContent>
                            <TabsContent value="password2">
                                <Rules data={data?.data} a={a}/>
                            </TabsContent>
                            <TabsContent value="password3">
                                <div
                                    className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                                    <ProductAccordion d={a}/>
                                </div>
                            </TabsContent>
                            <TabsContent value="password4">
                                <SellerComments a={a}/>
                            </TabsContent>
                        </Tabs>

                        <div className="flex lg:hidden flex-col gap-10">
                            <InformationAd jobSearch={jobSearch} session={session} data={data?.data} isLoading={isLoading} locale={locale} a={a}/>

                            <Information data={data?.data} a={a}/>

                            <Skill a={a} data={data?.data}/>

                            <LocationAccess a={a} data={data?.data} isLoading={isLoading}/>

                            <Rules a={a} data={data?.data} isLoading={isLoading}/>

                            <div
                                className="flex flex-col gap-6 py-6 px-4 bg-surface border border-default-divider ">
                                <ProductAccordion d={a}/>
                            </div>
                            <div
                                className="flex flex-col gap-6 py-6 px-4 bg-surface border border-default-divider ">
                                <SellerComments a={a}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden lg:flex ">
                    <InformationAd jobSearch={jobSearch} session={session} data={data?.data} isLoading={isLoading} locale={locale} a={a}/>
                </div>
            </div>
        </>
    );
};

export default Page;
