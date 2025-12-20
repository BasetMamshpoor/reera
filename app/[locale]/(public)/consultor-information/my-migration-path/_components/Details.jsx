"use client"
import React from 'react';
import Airplane from "@/assets/icons/airplane.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Card from "./Card";

const Details = () => {
    const dic = useTranslation();
    const a = dic.consultor.my_migration_path;
    return (
        <>
            <div
                className="flex flex-col w-full border border-default-divider rounded-xl bg-surface">
                <div className="hidden lg:flex items-center gap-2 p-5 border-b border-default-divider">
                    <Airplane className="fill-Gray-800"/>
                    <p className="text-xl text-Gray-950 font-bold pt-1">{a.my_migration_path}</p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 w-full lg:p-8 ">
                    <Card a={a}/>
                </div>
            </div>
        </>
    );
};

export default Details;