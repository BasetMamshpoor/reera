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

const Information = ({a }) => {
    const dic = useTranslation()
    const b = dic.public.ads.roommate
    return (
        <>
            <div
                className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                <div className="flex flex-col gap-2 w-full">
                    <div className="flex w-full flex-col lg:flex-row gap-4">
                        <p className="lg:hidden text-base text-[#3B3E46]">
                            {b.general_info}
                        </p>
                        <div className="flex flex-col lg:flex-row gap-2 lg:w-1/3">
                            <p className="text-sm dark:text-gray-300 text-gray-700">
                                {b.contract_type}
                            </p>
                            <p className="text-sm dark:text-[#E0E2E5] text-[#3B3E46] font-medium">
                                اجاره کوتاه مدت
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 lg:w-1/3">
                            <p className="text-sm lg:text-base dark:text-gray-300 text-gray-700">
                                {b.property_type}
                            </p>
                            <p className="text-sm lg:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">
                                آپارتمان
                            </p>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 lg:w-1/3">
                            <p className="text-sm lg:text-base dark:text-gray-300 text-gray-700">
                                {b.area}
                            </p>
                            <p className="text-sm lg:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">
                                120 متر
                            </p>
                        </div>
                    </div>
                    <div className="flex w-full flex-col lg:flex-row gap-4">
                        <div className="flex gap-2 lg:w-1/3 flex-col lg:flex-row">
                            <p className="text-sm lg:text-base dark:text-gray-300 text-gray-700">
                                {b.bedrooms}
                            </p>
                            <p className="text-sm lg:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">
                                2
                            </p>
                        </div>
                        <div className="flex gap-2 lg:w-1/3 flex-col lg:flex-row">
                            <p className="text-sm lg:text-base dark:text-gray-300 text-gray-700">
                                {b.floor}
                            </p>
                            <p className="text-sm lg:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">
                                2 از 5
                            </p>
                        </div>
                    </div>
                    <div className="flex gap-2 flex-col lg:flex-row">
                        <p className="text-sm lg:text-base dark:text-gray-300 text-gray-700">
                            {b.address}
                        </p>
                        <p className="text-sm lg:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">
                            تهران، اتوبان لشگری، ایستگاه بیمه، کارخانه نوآوری آرادی
                        </p>
                    </div>

                </div>

                <div className="w-full">
                    <div
                        className="flex flex-col gap-2 ">
                        <p className="text-Gray-700">{b.facilities}</p>
                        <div className="flex items-center gap-6 lg:grid lg:grid-cols-3 overflow-x-auto lg:gap-3 w-full">
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Sofa className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    مبله
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Kitchen className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    آشپزخانه مجهز
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Washing className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    ماشین لباسشویی
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Bathroom className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    حمام اختصاصی
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Elevator className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    آسانسور
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Balcony className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    بالکن
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Parking className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    پارکینگ اختصاصی
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Monitor className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    تلویزیون
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Wifi className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    وای فای
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <System className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    سیستم گرمایشی مرکزی
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row items-center gap-2 ltr:border-r rtl:border-l px-8 lg:p-0 border-default-divider lg:border-none py-4 lg:py-0">
                                <Wc className="fill-black dark:fill-white"/>
                                <p className="text-sm lg:text-base text-secondary font-medium whitespace-nowrap">
                                    سرویس بهداشتی ایرانی و فرنگی
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 flex-col lg:flex-row">
                    <p className="text-sm lg:text-base dark:text-gray-300 text-gray-700">
                        {a.description}
                    </p>
                    <p className="text-sm lg:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium whitespace-pre-line">{`نورگیر خوب
                                            کف سرامیک / پارکت
                                            پنجره دوجداره
                                            ضد سر و صدا
                                            سقف بلند`}
                    </p>
                </div>
            </div>
        </>
    );
};

export default Information;