"use client"
import React from 'react';
import User2 from "@/assets/icons/user-circle.svg"
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Card from "./Card";

const Details = () => {
    const dic = useTranslation();
    const a = dic.consultor.my_consultant;
    return (
        <>
            <div
                className="flex flex-col w-full border border-default-divider rounded-xl bg-surface">
                <div className="hidden lg:flex items-center gap-2 p-5 border-b border-default-divider">
                    <User2 className="fill-Gray-800"/>
                    <p className="text-xl text-Gray-950 font-bold pt-1">{a.my_consultant}</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full px-4 py-6 lg:p-8 ">
                    <Card a={a}/>
                </div>
            </div>
        </>
    );
};

export default Details;