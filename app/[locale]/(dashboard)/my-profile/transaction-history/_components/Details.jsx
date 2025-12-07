"use client";
import React, {useState} from "react";

import Transaction from "@/assets/icons/TransactionMinus.svg";
import Null from "./Null";
import Table from "./TableTransaction";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import AdvPagination from "@/components/AdvPagination";
import Spinner from "@/components/Spinner";

const Details = () => {
    const dic = useTranslation();
    const a = dic.public.profile.transaction_history;
    const [page, setPage] = useState(1)
    const {data, isLoading} = useQuery({
        queryKey: ["user-feedback-comment", page],
        queryFn: async () =>
            await request({
                method: "get",
                url: "/profile/transaction",
                query: {page}
            }),
    });

    return (
        <>
            <div className="flex flex-col bg-surface w-full p-4 lg:p-6 border border-default-divider rounded-xl">
                <div className="flex items-center gap-2 p-3 lg:p-5 border-b border-default-divider">
                    <Transaction className="fill-gray-800 dark:fill-gray-200"/>
                    <p className="text-xl dark:text-[#E0E2E5] text-black font-bold pt-1">
                        {a.transaction_history}
                    </p>
                </div>
                {isLoading ?
                    <div className="w-full flex items-center justify-center py-4">
                        <Spinner size={45}/>
                    </div>
                    :
                    data?.data.length > 0 ?
                        <div className="w-full pt-6 flex flex-col gap-6 lg:gap-10">
                            <Table data={data?.data} a={a}/>
                            <AdvPagination page={page} totalPages={data?.last_page} setPage={setPage}/>
                        </div> :
                        <div className=" w-full pt-4">
                            <Null a={a}/>
                        </div>
                }
            </div>
        </>
    );
};

export default Details;
