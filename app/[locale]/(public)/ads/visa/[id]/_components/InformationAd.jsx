import React, {useState} from "react";

import Link from "next/link";

import Share from "@/components/Share";
import Image from "next/image";
import Star from "@/assets/icons/Star-bold.svg";
import Location from "@/assets/icons/location.svg";
import Modal from "@/app/[locale]/(public)/ads/_components/Modal";

import Like from "@/components/Like";
import User from "@/assets/icons/profile.svg";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";
import ModalRequest from "../../../_components/ModalRequest";

import {useParams} from "next/navigation";
import ModalChatAndCall from "../../../_components/ModalCall";

const InformationAd = ({a, locale, data, isLoading, session}) => {
    const [currencySelect, setCurrencySelect] = useState("IRT"); // Default currency for Iran
    const {id} = useParams();

    return (
        <>
            <div className="w-full">
                {/* Mobile View */}
                <div
                    className="lg:hidden flex flex-col gap-12 px-4 py-6 border border-default-divider bg-surface w-full">
                    <div className="flex flex-col gap-6 bg-surface">
                        <div className="flex flex-col gap-4">
                            <p className="font-bold text-gray-950 dark:text-gray-50">
                                {data?.title}
                            </p>
                            <div className="flex justify-between w-full">
                                <div
                                    className="flex items-center justify-center px-3 py-1 bg-badge-background rounded-lg text-sm text-badge-text w-fit">
                                    {data?.seller?.is_iran
                                        ? a?.iranian_seller
                                        : a?.non_iranian_seller || "Visa Service"}
                                </div>
                                <Modal id={id} locale={locale}/>
                            </div>
                            {/* Removed compatibility section for Visa */}
                        </div>
                        <div className="flex flex-col gap-4 p-4 border border-default-divider bg-surface rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 border-2 border-default-divider rounded-full flex items-center justify-center">
                                        {data?.seller?.profile ? (
                                            <Image
                                                src={data.seller.profile}
                                                alt="Seller"
                                                width={100}
                                                height={100}
                                                className="w-full h-full rounded-full object-cover"
                                            />
                                        ) : (
                                            <User className="fill-Gray-800"/>
                                        )}
                                    </div>
                                    <p className="text-sm text-secondary font-bold">
                                        {data?.seller?.name?.trim() || a?.anonymous || "Anonymous"}
                                    </p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="!w-4 !h-4 fill-warning-main"/>
                                    <p className="text-sm text-gray-800 dark:text-gray-200 pt-2">
                                        {data?.seller?.ratings || 0}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-Gray-700">
                                        {a?.membership_duration || "Member since"}
                                    </p>
                                    <p className="text-sm text-gray-950 dark:text-gray-50">
                                        {data?.seller?.duration || data?.membership}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Location className="w-4 h-4 fill-Gray-700"/>
                                    <p className="text-sm text-gray-950 dark:text-gray-50">
                                        {data?.location ||
                                            data?.origin_country ||
                                            "Location not specified"}
                                    </p>
                                </div>
                            </div>
                            <Link
                                href="/public"
                                className="flex items-center justify-center px-4 py-2 w-full border border-[#4299C1] rounded-xl text-sm text-Primary-400 font-bold"
                            >
                                {a?.view_profile || "View Profile"}
                            </Link>
                        </div>
                    </div>

                    {/* Visa Specific Information */}
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-Gray-700">
                                {a?.visa_types || "Visa Types"}
                            </p>
                            <div className="flex flex-wrap gap-1 justify-end">
                                {data?.types?.map((type) => (
                                    <span
                                        key={type.id}
                                        className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                                    >
                    {type.name}
                  </span>
                                ))}
                                {(!data?.types || data.types.length === 0) && (
                                    <span className="text-xs text-gray-500">Not specified</span>
                                )}
                            </div>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-Gray-700">
                                {a?.origin_country || "Origin Country"}
                            </p>
                            <p className="text-sm text-gray-950 dark:text-gray-50 font-medium">
                                {data?.origin_country || "Not specified"}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-Gray-700">
                                {a?.visa_date || "Visa Date"}
                            </p>
                            <p className="text-sm text-gray-950 dark:text-gray-50 font-medium">
                                {data?.date_of_get_visa || "Not specified"}
                            </p>
                        </div>

                        <div className="flex items-center justify-between">
                            <p className="text-sm text-Gray-700">
                                {a?.visa_credit || "Visa Credit"}
                            </p>
                            <p className="text-sm text-gray-950 dark:text-gray-50 font-medium">
                                {data?.credit || "Not specified"}
                            </p>
                        </div>
                    </div>

                    {/* Contact Buttons */}
                    <div
                        className={`grid ${data?.contact.mobile ? "grid-cols-2" : "grid-cols-1"} items-center gap-4 w-full`}>
                        {!!data?.contact?.mobile &&
                            <ModalChatAndCall data={data} locale={locale} a={a}/>
                            // <Link href="/" variant="outline"
                            //       className="shadow-none cursor-pointer hover:bg-transparent flex items-center justify-center gap-2 w-full border border-Primary-400 rounded-xl px-5 py-1">
                            //     <Messages className="fill-Primary-400"/>
                            //     <p className="text-base text-Primary-400 whitespace-nowrap">{a.chat}</p>
                            // </Link>
                        }
                        <ModalRequest id={id} data={data} locale={locale} a={a}/>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:flex items-start w-full flex-col gap-6">
                    <div
                        className="flex flex-col gap-12 px-4 py-6 border border-default-divider bg-surface rounded-2xl w-full">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-bold text-gray-950 dark:text-gray-50">
                                        {data?.title}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <Share/>
                                        <Like id={data?.id} url={"/ads"}/>
                                    </div>
                                </div>
                                <div
                                    className="flex items-center justify-center px-3 py-1 bg-badge-background rounded-lg text-sm text-badge-text w-fit">
                                    {data?.seller?.is_iran
                                        ? a?.iranian_seller
                                        : a?.non_iranian_seller || "Visa Service"}
                                </div>
                                {/* Removed compatibility section for Visa */}
                            </div>

                            {/* Visa Specific Information */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-Gray-700">
                                        {a?.visa_types || "Visa Types"}
                                    </p>
                                    <div className="flex flex-wrap gap-1">
                                        {data?.types?.map((type) => (
                                            <span
                                                key={type.id}
                                                className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs"
                                            >
                                              {type.name}
                                            </span>
                                        ))}
                                        {(!data?.types || data.types.length === 0) && (
                                            <span className="text-xs text-gray-500">
                                              Not specified
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-Gray-700">
                                        {a?.origin_country || "Origin Country"}
                                    </p>
                                    <p className="text-sm text-gray-950 dark:text-gray-50 font-medium">
                                        {data?.origin_country || "Not specified"}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-Gray-700">
                                        {a?.visa_date || "Visa Date"}
                                    </p>
                                    <p className="text-sm text-gray-950 dark:text-gray-50 font-medium">
                                        {data?.date_of_get_visa || "Not specified"}
                                    </p>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <p className="text-sm text-Gray-700">
                                        {a?.visa_credit || "Visa Credit"}
                                    </p>
                                    <p className="text-sm text-gray-950 dark:text-gray-50 font-medium">
                                        {data?.credit || "Not specified"}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Contact Buttons */}
                        <div
                            className={`grid ${data?.contact.mobile ? "grid-cols-2" : "grid-cols-1"} items-center gap-4 w-full`}>
                            {!!data?.contact?.mobile &&
                                <ModalChatAndCall data={data} locale={locale} a={a}/>
                                // <Link href="/" variant="outline"
                                //       className="shadow-none cursor-pointer hover:bg-transparent flex items-center justify-center gap-2 w-full border border-Primary-400 rounded-xl px-5 py-1">
                                //     <Messages className="fill-Primary-400"/>
                                //     <p className="text-base text-Primary-400 whitespace-nowrap">{a.chat}</p>
                                // </Link>
                            }
                            <ModalRequest id={id} data={data} locale={locale} a={a}/>
                        </div>
                    </div>

                    {/* Seller Profile Card */}
                    <Link
                        href="/"
                        className="flex flex-col gap-6 p-4 border border-default-divider bg-surface rounded-xl hover:scale-95 transition-transform w-full"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 flex items-center justify-center border-3 border-default-divider rounded-full">
                                    {data?.seller?.profile ? (
                                        <Image
                                            src={data.seller.profile}
                                            alt="Seller"
                                            width={100}
                                            height={100}
                                            className="w-full h-full rounded-full object-cover"
                                        />
                                    ) : (
                                        <User className="fill-Gray-800"/>
                                    )}
                                </div>
                                <p className="text-lg text-[#3B3E46] dark:text-[#E0E2E5] font-bold">
                                    {data?.seller?.name || "Anonymous"}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="fill-warning-main !w-4 !h-4"/>
                                <p className="text-base text-Gray-800 pt-2">
                                    {data?.seller?.ratings || 0}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-Gray-700">
                                    {a?.membership_duration || "Member since"}
                                </p>
                                <p className="text-base text-gray-950 dark:text-gray-50">
                                    {data?.seller?.duration || data?.membership}
                                </p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Location className="!w-5 !h-5 fill-Gray-700"/>
                                <p className="text-base text-gray-950 dark:text-gray-50 pt-1">
                                    {data?.location ||
                                        data?.origin_country ||
                                        "Location not specified"}
                                </p>
                            </div>
                        </div>
                    </Link>
                    <Modal locale={locale} id={id}/>
                </div>
            </div>
        </>
    );
};

export default InformationAd;
