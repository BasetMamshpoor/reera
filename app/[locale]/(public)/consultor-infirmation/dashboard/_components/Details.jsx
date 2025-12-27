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
import Link from "next/link";
import Layer from "@/assets/icons/Layer.svg"

const Details = () => {
    const dic = useTranslation()
    const d = dic.consultor1.dashboard
    return (
        <>
            <div
                className="flex flex-col dark:bg-[#252C36] w-full border border-gray-200 dark:border-[#374151] rounded-xl bg-white">
                <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
                    <Layer className="fill-gray-800 dark:fill-gray-200"/>
                    <p className="text-xl dark:text-[#E0E2E5] text-black font-bold">{d.dashboard}</p>
                </div>
                <div className="flex flex-col gap-8 p-6">
                    <div className="flex items-center flex-col lg:flex-row gap-4">
                        <div
                            className="flex items-center justify-between lg:max-w-80 w-full py-5 px-4 border border-[#D1D5DB] dark:border-[#374151] rounded-lg bg-[#F9FAFB] dark:bg-[#14181D]">
                            <p className="text-base lg:text-lg text-[#2B6A8F] dark:text-[#F0F9FB] font-semibold">{d.activeUsers}</p>
                            <p className="text-base lg:text-lg text-[#294A61] dark:text-[#F0F9FB] font-bold">8</p>
                        </div>
                        <div
                            className="flex items-center justify-between lg:max-w-96 w-full py-5 px-4 border border-[#D1D5DB] dark:border-[#374151] rounded-lg bg-[#F9FAFB] dark:bg-[#14181D]">
                            <p className="text-base lg:text-lg text-[#2B6A8F] dark:text-[#F0F9FB] font-semibold">{d.pendingPaymentUsers}</p>
                            <p className="text-base lg:text-lg text-[#294A61] dark:text-[#F0F9FB] font-bold">3</p>
                        </div>
                    </div>
                    <p className="text-black dark:text-[#F0F9FB] text-lg font-bold">{d.consultationRequests}</p>
                    <div>
                        <Table className="min-w-[700px] border border-[#F0F9FB] rounded-lg lg:border-0 ">
                            <TableHeader className="overflow-hidden">
                                <TableRow>
                                    <TableHead>{d.name}</TableHead>
                                    <TableHead>{d.migrationType}</TableHead>
                                    <TableHead>{d.status}</TableHead>
                                    <TableHead>{d.actions}</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody className="bg-[#F9FAFB] dark:bg-[#14181D] border-0">
                                <TableRow>
                                    <TableCell className="text-black dark:text-[#F0F9FB] text-base">حسین
                                        مهدوی</TableCell>
                                    <TableCell className="text-black dark:text-[#F0F9FB] text-base">مهاجرت
                                        تحصیلی</TableCell>
                                    <TableCell className="text-black dark:text-[#F0F9FB] text-base">در حال
                                        مشاوره</TableCell>
                                    <TableCell className="flex items-center justify-center">
                                        <Link href="/public"
                                              className="flex items-center justify-center w-fit px-4 py-2 bg-[#4299C1] rounded-lg text-white dark:text-black text-sm">
                                            {d.viewConversation}
                                        </Link>
                                    </TableCell>
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