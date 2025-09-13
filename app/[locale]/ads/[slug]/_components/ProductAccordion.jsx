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

const ProductAccordion = () => {
    return (
        <>
            <Accordion
                type="single"
                collapsible
                className="w-full flex flex-col gap-3"
                defaultValue=""
            >
                <AccordionItem value="item-1">
                    <AccordionTrigger><div className="flex justify-end w-full items-center gap-2">
                        <p className="text-[#142738] dark:text-white text-sm md:text-base font-medium">مدت قرارداد</p>
                        <Clock className="w-5 h-5 md:w-6 md:h-6 fill-gray-800 dark:fill-gray-200 "/>
                    </div></AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200 flex flex-col gap-1">
                            <span>قرارداد اجاره برای مدت [مثلاً: ۱۲ ماه] منعقد می‌گردد.</span>
                            <span> در پایان این مدت، تمدید قرارداد با توافق طرفین امکان‌پذیر است.</span>
                            <span> در صورت تمایل یکی از طرفین به فسخ پیش از موعد، شرایط فسخ (بخش پایین) اعمال خواهد شد.</span>
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                    <AccordionTrigger><div className="flex w-full justify-end gap-2">
                        <p className="text-[#142738] dark:text-white text-sm md:text-base font-medium">پرداخت‌ها</p>
                        <Coin className="w-5 h-5 md:w-6 md:h-6  stroke-gray-800 dark:stroke-gray-200 "/>
                    </div></AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200 flex flex-col gap-1">
                            <span>قرارداد اجاره برای مدت [مثلاً: ۱۲ ماه] منعقد می‌گردد.مبلغ اجاره به صورت [مثلاً: ماهانه / سه‌ماهه] و در ابتدای هر دوره پرداخت می‌گردد.</span>
                            <span> در ابتدای قرارداد، مبلغ ودیعه به میزان [مثلاً: ۱,۰۰۰ دلار] به‌صورت جداگانه پرداخت می‌شود.</span>
                            <span> در صورت استفاده از سیستم پرداخت امن Rira، مبلغ ودیعه تا زمان تحویل نهایی ملک نزد پلتفرم بلوکه خواهد ماند.</span>
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                    <AccordionTrigger><div className="flex justify-end w-full items-center gap-2">
                        <p className="text-[#142738] dark:text-white text-sm md:text-base font-medium">شرایط فسخ</p>
                        <Note className="w-5 h-5 md:w-6 md:h-6 fill-gray-800 dark:fill-gray-200 "/>
                    </div></AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200 flex flex-col gap-1">
                            <span>فسخ قرارداد پیش از موعد تنها با اطلاع کتبی و حداقل [مثلاً: ۳۰ روز] قبل از تاریخ خروج امکان‌پذیر است.</span>
                            <span> در صورت فسخ یک‌طرفه بدون اطلاع، مالک/مستأجر می‌توانند از طریق بخش پشتیبانی پلتفرم پیگیری نمایند.</span>
                            <span>در صورت فسخ قبل از شروع سکونت، مبلغ ودیعه ممکن است به‌صورت کامل یا جزئی بازگردانده شود (مطابق توافق اولیه).</span>
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-6">
                    <AccordionTrigger><div className="flex justify-end w-full items-center gap-2">
                        <p className="text-[#142738] dark:text-white text-sm md:text-base font-medium">نوع قرارداد</p>
                        <Document className="w-5 h-5 md:w-6 md:h-6 fill-gray-800 dark:fill-gray-200 "/>
                    </div></AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <p className="text-xs md:text-sm text-gray-800 dark:text-gray-200 flex flex-col gap-1">
                            <span>نوع قرارداد رسمی / دستی / توافق‌نامه دیجیتال است.</span>
                            <span>فایل قرارداد به دو زبان (فارسی و زبان کشور مقصد) تنظیم و امضا خواهد شد.</span>
                            <span>در صورت درخواست، نسخه‌ی کاغذی نیز قابل ارائه است.</span>
                        </p>
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                    <AccordionTrigger><div className="flex justify-end w-full items-center gap-2">
                        <p className="text-[#142738] dark:text-white text-sm md:text-base font-medium">مدارک موردنیاز</p>
                        <Task className="w-5 h-5 md:w-6 md:h-6 fill-gray-800 dark:fill-gray-200 "/>
                    </div></AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                        <ul className="list-disc ps-5 dark:[&>li]:marker:text-white text-xs md:text-sm text-gray-800 dark:text-gray-200 flex flex-col gap-1">
                            <li>تصویر پاسپورت یا کارت اقامت</li>
                            <li>مدرک اشتغال یا درآمد (در صورت نیاز)</li>
                            <li>شماره تماس معتبر و احراز هویت در پلتفرم</li>
                        </ul>

                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
};

export default ProductAccordion;