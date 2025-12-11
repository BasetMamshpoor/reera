import React from 'react';
import Info from "@/assets/icons/info-circle.svg";
import {useParams} from "next/navigation";
import Spinner from "@/components/Spinner";

const Rules = ({data, isLoading ,a}) => {
    const {locale} = useParams()
    return (
        <div dir={locale === "fa" ? "rtl" : "ltr"} className="flex flex-col gap-4 w-full p-6 bg-surface border border-default-divider rounded-2xl">
            <p className="lg:hidden text-base text-Gray-800">
                {a.rules}
            </p>
            <div
                className="flex flex-col gap-6 ">
                {data?.role?.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <Info className="fill-error-main"/>
                        <p className="text-base font-medium text-Gray-900 pt-2">{rule}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Rules;