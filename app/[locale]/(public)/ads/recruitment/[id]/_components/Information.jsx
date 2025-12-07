import React from 'react';
import Sofa from "@/assets/icons/sofa.svg";
import Kitchen from "@/assets/icons/Kitchen.svg";
import Washing from "@/assets/icons/Washing machine.svg";
import Bathroom from "@/assets/icons/Bathroom.svg";
import Elevator from "@/assets/icons/Elevator.svg";
import Balcony from "@/assets/icons/Balcony.svg";
import Parking from "@/assets/icons/Parking.svg";
import Monitor from "@/assets/icons/Monitor.svg";
import Wifi from "@/assets/icons/Wifi.svg";
import System from "@/assets/icons/Heating system.svg";
import Wc from "@/assets/icons/WC.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Info from "@/assets/icons/info-circle.svg";

const Information = ({data}) => {
    const dic = useTranslation()
    const a = dic.public.ads.job_search
    return (
        <>
            <div
                className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                <div className="flex flex-col gap-2 w-full">
                    <div className="grid grid-cols-1 w-full lg:grid-cols-3 gap-4">
                        <p className="lg:hidden text-base text-[#3B3E46]">
                            {a.general_info}
                        </p>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">
                                {a.ad_title}
                            </p>
                            <p className="text-sm text-secondary font-medium whitespace-nowrap">
                                {data?.title}
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">
                                {a.job_category}
                            </p>
                            <p className="text-sm text-secondary font-medium whitespace-nowrap">
                                {data?.category}
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">
                                {a.cooperation_type}
                            </p>
                            <p className="text-sm text-secondary font-medium">
                                {data?.general?.work_type === "full_time" ? a.full_time :
                                    data?.general?.work_type === "part_time" ? a.part_time :
                                        data?.general?.work_type === "remote" && a.remote
                                }
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">
                                {a.salary}
                            </p>
                            <p className="text-sm text-secondary font-medium">
                                {Number(data?.price).toLocaleString()}
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">{a.language}</p>
                            <p className="text-sm text-secondary font-medium">{data?.general?.language}</p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">{a.degree}</p>
                            <p className="text-sm text-secondary font-medium whitespace-nowrap">{data?.general?.degree}</p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">
                                {a.work_days}
                            </p>
                            <p className="text-sm text-secondary font-medium whitespace-nowrap">
                                {data?.general?.days}
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">
                                {a.work_hours}
                            </p>
                            <p className="text-sm text-secondary font-medium whitespace-nowrap">
                                {data?.general?.time}
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2">
                            <p className="text-sm text-Gray-700 whitespace-nowrap">
                                {a.work_hours}
                            </p>
                            <p className="text-sm text-secondary font-medium whitespace-nowrap">
                                {data?.general?.time}
                            </p>
                        </div>
                    </div>
                </div>
                {/*<div className="flex gap-2 flex-col w-full">*/}
                {/*    <p className="text-sm lg:text-base text-Gray-700">*/}
                {/*        {a.payment_method}*/}
                {/*    </p>*/}
                {/*    <div*/}
                {/*        className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 ">*/}
                {/*        {data?.cash === 1 && <div className="flex items-center gap-2">*/}
                {/*            <Info className="fill-Primary-500"/>*/}
                {/*            <p className="text-sm lg:text-base text-secondary pt-1">{a.cash}</p>*/}
                {/*        </div>}*/}
                {/*        {data?.check === 1 && <div className="flex items-center gap-2">*/}
                {/*            <Info className="fill-Primary-500"/>*/}
                {/*            <p className="text-sm lg:text-base text-secondary pt-1">{a.check}</p>*/}
                {/*        </div>}*/}
                {/*        {data?.installments === 1 && <div className="flex items-center gap-2">*/}
                {/*            <Info className="fill-Primary-500"/>*/}
                {/*            <p className="text-sm lg:text-base text-secondary pt-1">{a.installments}</p>*/}
                {/*        </div>}*/}
                {/*    </div>*/}
                {/*</div>*/}
                <div className="flex gap-2 flex-col lg:flex-row">
                    <p className="text-sm lg:text-base text-Gray-700">
                        {a.address}
                    </p>
                    <p className="text-sm lg:text-lg text-secondary font-medium">
                        {data?.address?.full_address}
                    </p>
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