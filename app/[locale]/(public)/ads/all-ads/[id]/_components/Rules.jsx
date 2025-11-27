import React from 'react';
import Info from "@/assets/icons/info-circle.svg";
import {useParams} from "next/navigation";
import Spinner from "@/components/Spinner";

const Rules = ({data, isLoading}) => {
    const {locale} = useParams()
    return (
        <div dir={locale === "fa" ? "rtl" : "ltr"}>
            {isLoading ?
                <div className="flex items-center justify-center w-full">
                    <Spinner/>
                </div>
                :
                <div
                    className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                    {data?.data.rules?.map((rule, index) =>
                        <div className="flex items-center gap-2">
                            <Info className="fill-error-main"/>
                            <p className="text-base font-medium text-Gray-900 pt-2">{rule}</p>
                        </div>
                    )}
                </div>}
        </div>
    );
};

export default Rules;