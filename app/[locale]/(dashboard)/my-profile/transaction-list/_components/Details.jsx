"use client";
import React, {useState} from "react";

import Transaction from "@/assets/icons/Card Recive.svg";
import Null from "./Null";
import Table from "./TableTransaction";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Wallet from "./Wallet"
import AdvPagination from "@/components/AdvPagination";

const Details = () => {
    const dic = useTranslation();
    const a = dic.public.profile.transactions_list;
    const [page, setPage] = useState(1)

    const {data, isLoading} = useQuery({
        queryKey: ["balance",page],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "/profile/transaction",
                query: {page}
            })
        }
    })
    const isNull = data?.data.length === 0
    return (
        <>
            <div className="flex flex-col bg-surface w-full py-6 px-4 lg:p-6 border border-default-divider rounded-xl">
                <div className="flex items-center gap-2 p-5 border-b border-default-divider">
                    <Transaction className="fill-gray-800 dark:fill-gray-200"/>
                    <p className="text-xl dark:text-[#E0E2E5] text-black font-bold pt-1">
                        {a.transactions_list}
                    </p>
                </div>
                <div className="flex items-center justify-center pt-5 lg:pt-10 w-full ">
                    <Wallet a={a}/>
                </div>
                {isNull ?
                    <div className=" w-full">
                        <Null a={a}/>
                    </div> :
                    <div className="flex flex-col w-full py-6">
                        <Table data={data?.data} isLoading={isLoading} a={a}/>
                        <AdvPagination setPage={setPage} totalPages={data?.last_page} page={page}/>
                    </div>
                }
            </div>
        </>
    );
};

export default Details;
