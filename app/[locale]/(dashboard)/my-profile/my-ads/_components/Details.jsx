"use client";
import React, {useState} from "react";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {useParams} from "next/navigation";
import Information from "./Information";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";

const Details = () => {
    const {locale} = useParams();
    const dic = useTranslation();
    const a = dic.public.profile.my_ads;
    const [tab, setTab] = useState("");
    const [selected, setSelected] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const {data, isLoading, refetch} = useQuery({
        queryKey: ["my_ads", currentPage, selected, tab],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "profile/myAds",
                query: {
                    status: tab,
                    category_id: selected[0],
                    page: currentPage,
                },
            });
        },
    });

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-col gap-6">
                <Tabs
                    dir={locale === "fa" ? "rtl" : "ltr"}
                    defaultValue="all"
                    className="py-6"
                >
                    <TabsList className="flex items-center gap-4 scrollbar-hide lg:gap-6 overflow-x-auto">
                        <TabsTrigger
                            className="flex items-center max-w-[133px] w-full gap-4 px-3 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
                            value="all"
                            onClick={() => setTab("")}
                        >
                            <p className="text-sm  pt-1">{a.all}</p>
                        </TabsTrigger>
                        <TabsTrigger
                            className="flex items-center max-w-[133px] w-full gap-4 px-3 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
                            value="approved"
                            onClick={() => setTab("approved")}
                        >
                            <p className="text-sm data-[state=active]:text-white pt-1">
                                {a.verified}
                            </p>
                        </TabsTrigger>
                        <TabsTrigger
                            className="flex items-center max-w-[133px] w-full gap-4 px-3 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
                            value="rejected"
                            onClick={() => setTab("rejected")}
                        >
                            <p className="text-sm data-[state=active]:text-white pt-1">
                                {a.rejected}
                            </p>
                        </TabsTrigger>
                        <TabsTrigger
                            className="flex items-center rtl:max-w-[133px] ltr:max-w-[180px] w-full gap-4 px-3 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
                            value="pending"
                            onClick={() => setTab("pending")}
                        >
                            <p className="text-sm data-[state=active]:text-white pt-1">
                                {a.pending_verification}
                            </p>
                        </TabsTrigger>
                        <TabsTrigger
                            className="flex items-center max-w-[133px] w-full gap-4 px-3 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
                            value="expired"
                            onClick={() => setTab("expired")}
                        >
                            <p className="text-sm data-[state=active]:text-white pt-1">
                                {a.expired}
                            </p>
                        </TabsTrigger>
                        <TabsTrigger
                            className="flex items-center max-w-[133px] w-full gap-4 px-3 py-2 border border-default-divider rounded-lg data-[state=active]:bg-Primary-400 data-[state=active]:text-white cursor-pointer"
                            value="sold"
                            onClick={() => setTab("sold")}
                        >
                            <p className="text-sm data-[state=active]:text-white pt-1">
                                {a.sold}
                            </p>
                        </TabsTrigger>

                    </TabsList>
                    <div className="pt-6 w-full">
                        {isLoading ? (
                            <div className="w-full flex items-center mx-auto justify-center">
                                <Spinner size="50px"/>
                            </div>
                        ) : (
                            <Information
                                data={data}
                                isLoading={isLoading}
                                selected={selected}
                                setSelected={setSelected}
                                refetch={refetch}
                                currentPage={currentPage}
                                setCurrentPage={setCurrentPage}
                            />
                        )}
                    </div>
                </Tabs>
            </div>
        </div>
    );
};

export default Details;
