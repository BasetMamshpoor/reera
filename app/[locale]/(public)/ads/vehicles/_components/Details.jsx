"use client"
import React from 'react';
import VehicesSidebar from "./VehiclesSidebar";
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";
import {useTranslation} from "@/app/[locale]/TranslationContext";

const Details = ({locale, page}) => {
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;
    return (
        <>
            <div className="w-full flex flex-col gap-16">
                <div className="flex items-center flex-col gap-1 ">
                    <p className="text-xl font-bold text-Primary-950 ">{s.ads}</p>
                    <p className="text-4xl text-Primary-400 font-bold">{s.vehicles}</p>
                </div>
                <div className="flex gap-6 lg:flex-row flex-col">
                    <VehicesSidebar s={s}/>
                    <AdvsRes link={`/${locale}/ads`} page={page}/>
                </div>
            </div>
        </>
    );
};

export default Details;