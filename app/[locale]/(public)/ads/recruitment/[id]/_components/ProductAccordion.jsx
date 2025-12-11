"use client"
import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Clock from "@/assets/icons/clock.svg"
import Coin from "@/assets/icons/coin.svg"
import Note from "@/assets/icons/NoteRemove.svg"
import Document from "@/assets/icons/DocumentText.svg";
import Task from "@/assets/icons/TaskSquare.svg"
import {useParams} from "next/navigation";
import {useTranslation} from "@/app/[locale]/TranslationContext";

const ProductAccordion = ({d}) => {
    const dic = useTranslation()
    const a = dic.public.ads.all_ads.slug
    const b = dic.public.ads.roommate
    const {locale} = useParams()
    return (
        <>
            <div className="flex flex-col gap-4 w-full">
                <p className="lg:hidden text-base text-Gray-800">
                    {d.contract_terms}
                </p>
                <Accordion
                    type="single"
                    collapsible
                    className="w-full flex flex-col gap-3"
                    defaultValue=""
                >
                    <AccordionItem className="border border-default-divider rounded-xl p-2 bg-Gray-50" value="item-1">
                        <AccordionTrigger>
                            <div className="flex justify-end w-full items-center gap-2 ">
                                <p className="text-Primary-950 pt-1 text-sm md:text-base font-medium">{b.contract_duration}</p>
                                <Clock className="w-5 h-5 md:w-6 md:h-6 fill-gray-800 dark:fill-gray-200 "/>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p dir={locale === "fa" ? "rtl" : ""}
                               className={`pt-3 text-xs md:text-sm whitespace-pre-line text-gray-800 dark:text-gray-200 flex flex-col gap-1`}>
                                {a.early_cancellation_info}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="border border-default-divider rounded-xl p-2 bg-Gray-50" value="item-2">
                        <AccordionTrigger>
                            <div className="flex w-full justify-end gap-2 focus-visible:border-0">
                                <p className="text-Primary-950 pt-1 text-sm md:text-base font-medium">{b.payments}</p>
                                <Coin className="w-5 h-5 md:w-6 md:h-6  stroke-gray-800 dark:stroke-gray-200 "/>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p dir={locale === "fa" ? "rtl" : ""}
                               className={`pt-3 text-xs md:text-sm whitespace-pre-line text-gray-800 dark:text-gray-200 flex flex-col gap-1`}>
                                {a.lease_duration_info}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="border border-default-divider rounded-xl p-2 bg-Gray-50" value="item-3">
                        <AccordionTrigger>
                            <div className="flex justify-end w-full items-center gap-2">
                                <p className="text-Primary-950 pt-1 text-sm md:text-base font-medium">{b.termination_conditions}</p>
                                <Note className="w-5 h-5 md:w-6 md:h-6 fill-gray-800 dark:fill-gray-200 "/>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p dir={locale === "fa" ? "rtl" : ""}
                               className={`pt-3 text-xs md:text-sm whitespace-pre-line text-gray-800 dark:text-gray-200 flex flex-col gap-1`}>
                                {a.early_cancellation_info}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="border border-default-divider rounded-xl p-2 bg-Gray-50" value="item-6">
                        <AccordionTrigger>
                            <div className="flex justify-end w-full items-center gap-2">
                                <p className="text-Primary-950 pt-1 text-sm md:text-base font-medium">{b.contract_type}</p>
                                <Document className="w-5 h-5 md:w-6 md:h-6 fill-gray-800 dark:fill-gray-200 "/>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <p dir={locale === "fa" ? "rtl" : ""}
                               className={`pt-3 text-xs md:text-sm whitespace-pre-line text-gray-800 dark:text-gray-200 flex flex-col gap-1`}>
                                {a.official_contract_info}
                            </p>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem className="border border-default-divider rounded-xl p-2 bg-Gray-50" value="item-4">
                        <AccordionTrigger>
                            <div className="flex justify-end w-full items-center gap-2">
                                <p className="text-Primary-950 pt-1 text-sm md:text-base font-medium">{b.required_documents}</p>
                                <Task className="w-5 h-5 md:w-6 md:h-6 fill-gray-800 dark:fill-gray-200 "/>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="flex flex-col gap-4 text-balance">
                            <ul dir={locale === "fa" ? "rtl" : ""}
                                className="pt-3 whitespace-pre-line list-disc ps-5 dark:[&>li]:marker:text-white text-xs md:text-sm text-gray-800 dark:text-gray-200 flex flex-col gap-1">
                                <p>{a.rental_required_docs}</p>
                                <li>{a.doc_passport}</li>
                                <li>{a.doc_income}</li>
                                <li>{a.doc_phone_verification}</li>
                                <p>{a.doc_additional}</p>
                            </ul>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </>
    );
};

export default ProductAccordion;