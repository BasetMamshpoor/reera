"use client"
import React from 'react';
import {useParams} from "next/navigation";
import Bg from "@/public/images/wallet.png"
import Image from "next/image";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner"

const Wallet = ({a}) => {
    const {locale} = useParams()

    const {data, isLoading} = useQuery({
        queryKey: ['wallet', "transaction-list"],
        queryFn: async () => (
            await request({
                url: '/profile/balance',
                method: "get",
            })
        )
    })
    if (isLoading) {
        return (
            <div className="w-fu">
                <Spinner/>
            </div>
        );
    }


    return (
        <>
            {isLoading ?
                <div className="flex items-center justify-center pt-5 w-full">
                    <Spinner/>
                </div> :
                <div
                    className="relative flex flex-col gap-5 py-8 items-center justify-center bg-Primary-400  max-w-[364px] w-full rounded-xl">
                    <Image src={Bg} alt="Bg" width={100} height={100}
                           className="absolute top-0 right-0 left-0 bottom-0 w-screen"/>
                    <p className="text-white text-xl">{a.Balance}</p>
                    <p className="text-white text-4xl font-bold">¥ {data?.data.balance || "0.00"}</p>
                </div>
            }
        </>
    );
};

export default Wallet;