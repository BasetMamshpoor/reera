"use client";
import React from "react";
import Layer from "@/assets/icons/Layer.svg";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useState} from "react";
import MyAds from "./MyAds"
import {useParams} from "next/navigation";
import Spinner from "@/components/Spinner";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";

const Details = () => {
    const dic = useTranslation();
    const d = dic.public.profile.dashboard;

    const [selected, setSelected] = useState([]);
    const {locale} = useParams();

    const [tab, setTab] = useState("ad");


    const {data, isLoading, refetch} = useQuery({
        queryKey: ['dashboard', tab, selected],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "profile/dashboard",
                query: {
                    type: tab,
                    category_id: selected[0]
                }
            });
        }
    });
    return (
        <>
            <div
                className="flex flex-col dark:bg-[#252C36] w-full border border-gray-200 dark:border-[#374151] rounded-xl">
                <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
                    <Layer className="fill-Gray-800"/>
                    <p className="text-xl text-Gray-950 font-bold pt-1">
                        {d.dashboard}
                    </p>
                </div>
                <div className="flex w-full px-6 py-8">
                    <Tabs
                        dir={locale === "fa" ? "rtl" : "ltr"}
                        defaultValue="ad"
                        className=" w-full h-full"
                    >
                        <TabsList
                            className={`flex rtl:flex-row-reverse items-center py-0 border-b border-Gray-400`}
                        >
                            <TabsTrigger
                                onClick={() => setTab("request")}
                                value="request"
                                className={`w-full pb-2 lg:pb-4 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:text-Primary-400 data-[state=active]:border-b-Primary-400 data-[state=active]:font-extrabold `}
                            >
                                {d.my_requested_ads}
                            </TabsTrigger>
                            <TabsTrigger
                                onClick={() => setTab("ad")}
                                value="ad"
                                className={`w-full pb-2 lg:pb-4 cursor-pointer data-[state=active]:border-b-2 data-[state=active]:text-Primary-400 data-[state=active]:border-b-Primary-400 data-[state=active]:font-extrabold`}
                            >
                                {d.my_posted_ads}
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent
                            value="ad"
                            className="flex flex-col gap-10 pt-6 px-6 lg:px-0"
                        >
                            {isLoading ?
                                <div className="w-full flex items-center mx-auto justify-center">
                                    <Spinner size="50px"/>
                                </div>
                                :
                                <MyAds tab={tab} d={d} data={data} setSelected={setSelected} selected={selected}
                                       refetch={refetch}/>
                            }
                        </TabsContent>

                        <TabsContent
                            value="request"
                            className="flex flex-col gap-10 pt-6 px-6 lg:px-0"
                        >
                            {isLoading ?
                                <div className="w-full flex items-center mx-auto justify-center">
                                    <Spinner size="50px"/>
                                </div>
                                :
                                <MyAds tab={tab} d={d} data={data} setSelected={setSelected} selected={selected}
                                       refetch={refetch}/>
                            }
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </>
    );
};

export default Details;
