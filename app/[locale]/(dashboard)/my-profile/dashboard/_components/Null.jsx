"use client";
import React from "react";
import Empty from "@/assets/icons/star.svg";

import PLus from "@/assets/icons/add.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Link from "next/link";
import {useParams} from "next/navigation";

const Null = () => {
    const dic = useTranslation();
    const d = dic.public.profile.dashboard;
    const {locale} = useParams()
    return (
        <>
            <div className="flex flex-col items-center justify-center w-full gap-4 pb-6">
                <Empty className="fill-Gray-950 !w-44 !h-44"/>
                <div className="flex flex-col items-center justify-center w-full h-full gap-10">
                    <div
                        className={`flex items-center justify-center w-full flex-col gap-4`}
                    >
                        <p className="lg:text-xl text-secondary font-bold ">
                            {d.empty_dashboard_message}
                        </p>
                        <p className="text-sm lg:text-base text-Gray-700 text-center">
                            {d.dashboard_hint}
                        </p>
                    </div>
                    <div
                        className={`flex items-center justify-center gap-6 max-w-96 w-full`}
                    >
                        <Link href={`/${locale}/register-ad`} className="flex items-center justify-center gap-1 py-2 bg-Primary-400 border rounded-xl w-full  text-white text-base font-bold">
                            <PLus className="fill-white"/>
                            <p className="pt-1">{d.post_ad}</p>
                        </Link>
                        {/*<div*/}
                        {/*    className="flex items-center justify-center gap-1 py-2  border border-Primary-400 rounded-xl w-full text-Primary-400 text-base font-bold">*/}
                        {/*    <Search className="fill-primary-400"/>*/}
                        {/*    <p className="pt-1">{d.search_ads}</p>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Null;
