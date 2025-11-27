import React from 'react';
import Info from "@/assets/icons/info-circle.svg";

import {useTranslation} from "@/app/[locale]/TranslationContext";
import Tick from "@/assets/icons/tick-circle.svg";

const Information = ({a, data}) => {
    return (
        <>
            <div
                className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex w-full flex-col lg:flex-row gap-4">
                        <p className="lg:hidden text-base text-[#3B3E46]">
                            {a.information}
                        </p>
                        <div className="flex flex-col lg:flex-row gap-2 lg:w-1/3">
                            <p className="text-sm text-Gray-700">
                                {a.ad_title}
                            </p>
                            <p className="text-sm text-secondary font-medium">
                                {data?.title}
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 lg:w-1/3">
                            <p className="text-sm text-Gray-700">
                                {a.service_type}
                            </p>
                            <p className="text-sm text-secondary font-medium">
                                {data?.expertise}
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col lg:flex-row">
                        <p className="text-sm lg:text-base text-Gray-700">
                            {a.working_hours}
                        </p>
                        <p className="text-sm lg:text-lg text-secondary font-medium">
                            {data?.time_service}
                        </p>
                    </div>
                    <div className="flex gap-2 flex-col lg:flex-row">
                        <p className="text-sm lg:text-base text-Gray-700">
                            {a.address}
                        </p>
                        <p className="text-sm lg:text-lg text-secondary font-medium">
                            {data?.address?.full_address}
                        </p>
                    </div>
                </div>
                <div className="flex gap-2 flex-col w-full">
                    <p className="text-sm lg:text-base text-Gray-700">
                        {a.payment_method}
                    </p>
                    <div
                        className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 ">
                        {data?.cash === 1 && <div className="flex items-center gap-2">
                            <Info className="fill-Primary-500"/>
                            <p className="text-sm lg:text-base text-secondary pt-1">{a.cash}</p>
                        </div>}
                        {data?.check === 1 && <div className="flex items-center gap-2">
                            <Info className="fill-Primary-500"/>
                            <p className="text-sm lg:text-base text-secondary pt-1">{a.check}</p>
                        </div>}
                        {data?.installments === 1 && <div className="flex items-center gap-2">
                            <Info className="fill-Primary-500"/>
                            <p className="text-sm lg:text-base text-secondary pt-1">{a.installments}</p>
                        </div>}
                    </div>
                </div>

                <div className="flex gap-2 flex-col lg:flex-row">
                    <p className="text-sm lg:text-base text-Gray-700">
                        {a.description}
                    </p>
                    <p className="text-sm lg:text-lg text-secondary font-medium whitespace-pre-line">{data?.text}</p>
                </div>
            </div>
        </>
    );
};

export default Information;