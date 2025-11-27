import React from 'react';
import Info from "@/assets/icons/info-circle.svg";
import {useParams} from "next/navigation";
import Spinner from "@/components/Spinner";

const Rules = ({data, isLoading}) => {
    const {locale} = useParams()
    return (
        <div dir={locale === "fa" ? "rtl" : "ltr"}>
            <div
                className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                {data?.rules?.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Info className="fill-error-main"/>
                        <p className="text-base font-medium text-Gray-900 pt-2">{item}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rules;