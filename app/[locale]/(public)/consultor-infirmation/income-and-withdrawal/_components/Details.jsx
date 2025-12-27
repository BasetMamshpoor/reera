"use client"
import React from 'react';
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import Layer from "@/assets/icons/Card Recive.svg"
import Document from "@/assets/icons/DocumentText.svg"
import Modal from "./Modal"

const Details = () => {
    const dic = useTranslation()
    const d = dic.consultor1.income_and_withdrawal
    return (
        <>
            <div
                className="flex flex-col dark:bg-[#252C36] w-full border border-gray-200 dark:border-[#374151] rounded-xl bg-white">
                <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
                    <Layer className="fill-gray-800 dark:fill-gray-200"/>
                    <p className="text-xl dark:text-[#E0E2E5] text-black font-bold">{d.income_withdrawal}</p>
                </div>
                <div className="flex flex-col gap-8 p-6">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 w-full">
                        <div className="flex items-center flex-col lg:flex-row gap-4 w-full">
                            <div
                                className="flex items-center justify-between lg:max-w-80 w-full py-5 px-4 border border-[#D1D5DB] dark:border-[#374151] rounded-lg bg-[#F9FAFB] dark:bg-[#14181D]">
                                <p className="text-base lg:text-lg text-[#2B6A8F] dark:text-[#F0F9FB] font-semibold whitespace-nowrap">{d.your_balance}</p>
                                <p className="text-base lg:text-lg text-[#294A61] dark:text-[#F0F9FB] font-bold">{(12300000).toLocaleString()}</p>
                            </div>
                            <div
                                className="flex items-center justify-between lg:max-w-96 w-full py-5 px-4 border border-[#D1D5DB] dark:border-[#374151] rounded-lg bg-[#F9FAFB] dark:bg-[#14181D]">
                                <p className="text-base lg:text-lg text-[#2B6A8F] dark:text-[#F0F9FB] font-semibold whitespace-nowrap">{d.pending_amount}</p>
                                <p className="text-base lg:text-lg text-[#294A61] dark:text-[#F0F9FB] font-bold">{(5000000).toLocaleString()}</p>
                            </div>
                        </div>
                        <Modal b={d}/>
                    </div>
                    <p className="text-black dark:text-[#F0F9FB] text-lg font-bold text-center">{d.completed_transactions}</p>
                    <div>
                        <Table className="min-w-[700px] border border-[#F0F9FB] rounded-lg lg:border-0">
                            <TableHeader className="overflow-hidden">
                                <TableRow>
                                    <TableHead>{d.invoice}</TableHead>
                                    <TableHead>{d.date}</TableHead>
                                    <TableHead>{d.amount}</TableHead>
                                    <TableHead>{d.payment_method}</TableHead>
                                    <TableHead>{d.status}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-[#F9FAFB] dark:bg-[#14181D] border-0">
                                <TableRow>
                                    <TableCell className="flex items-center justify-center"><Document
                                        className="fill-Primary-600 "/></TableCell>
                                    <TableCell className="text-black dark:text-[#F0F9FB] text-base">۱۴۰۴.۰۲.۰۲ ،
                                        ۱۲:۳۲</TableCell>
                                    <TableCell className="text-black dark:text-[#F0F9FB] text-base">۶۵۰،۰۰۰
                                        تومان</TableCell>
                                    <TableCell className="text-black dark:text-[#F0F9FB] text-base">شماره
                                        شبا</TableCell>
                                    <TableCell className="text-black dark:text-[#F0F9FB] text-base">موفق</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Details;