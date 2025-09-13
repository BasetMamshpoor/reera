import React from 'react';
import Share from "@/assets/icons/Share.svg"
import Heart from "@/assets/icons/Heart.svg"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import Link from "next/link";
import Messages from "@/assets/icons/Messages.svg"
import Image from "next/image";
import Star from "@/assets/icons/star.svg"
import Location from "@/assets/icons/location.svg"
import Modal from "./_components/Modal"
import Clock from "@/assets/icons/Clock.svg"
import SwiperModal from "./_components/SwiperModal"
import {AppWindowIcon, CodeIcon} from "lucide-react"
import {Button} from "@/components/ui/button"
import Sofa from "@/assets/icons/sofa.svg"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import Kitchen from "@/assets/icons/Kitchen.svg"
import Washing from "@/assets/icons/Washing machine.svg"
import Bathroom from "@/assets/icons/Bathroom.svg"
import Elevator from "@/assets/icons/Elevator.svg"
import Balcony from "@/assets/icons/Balcony.svg"
import Parking from "@/assets/icons/Parking.svg"
import Monitor from "@/assets/icons/monitor.svg"
import Wifi from "@/assets/icons/Wifi.svg"
import System from "@/assets/icons/Heating system.svg"
import Wc from "@/assets/icons/WC.svg"
import Info from "@/assets/icons/info-circle.svg"
import ProductAccordion from "./_components/ProductAccordion";
import Tick from "@/assets/icons/tick-circle.svg"
import Flag from "@/assets/icons/Flag.svg";
import SellerComments from "@/app/[locale]/seller/_components/SellerComments";


const Page = () => {
    return (
        <>
            <div className="flex flex-col md:flex-row gap-5 w-full">
                <div className="md:hidden flex items-center justify-end w-full px-4 gap-6">
                    <button><Flag className="fill-gray-700 dark:fill-gray-300 "/></button>
                    <button><Share className="fill-gray-700 dark:fill-gray-300 "/></button>
                    <button><Heart className="fill-gray-700 dark:fill-gray-300 "/></button>
                </div>
                <div className="flex flex-col gap-16 max-w-[1000px]">
                    <SwiperModal className="w-full"/>
                    <div className="flex flex-col gap-10">
                        <Tabs defaultValue="account" className="hidden md:flex flex-col gap-6">
                            <TabsList className="hidden md:flex w-full bg-transparent border-b p-0 rounded-0">
                                <TabsTrigger className="font-bold text-sm" value="account">اطاعات عمومی</TabsTrigger>
                                <TabsTrigger className="font-bold text-sm" value="password">امکانات</TabsTrigger>
                                <TabsTrigger className="font-bold text-sm" value="password1">موقعیت و
                                    دسترسی‌ها</TabsTrigger>
                                <TabsTrigger className="font-bold text-sm" value="password2">قوانین</TabsTrigger>
                                <TabsTrigger className="font-bold text-sm" value="password3">شرایط قرارداد</TabsTrigger>
                                <TabsTrigger className="font-bold text-sm" value="password4">نظرات</TabsTrigger>
                            </TabsList>
                            <TabsContent value="account">
                                <div className="flex flex-col gap-10">
                                    <div
                                        className="flex flex-col gap-6 p-6 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] rounded-2xl">
                                        <div className="flex w-full flex-col md:flex-row gap-4">
                                            <p className="md:hidden text-base text-[#3B3E46]">اطلاعات عمومی</p>
                                            <div className="flex flex-col md:flex-row gap-2 md:w-1/3">
                                                <p className="text-sm dark:text-gray-300 text-gray-700">نوع
                                                    قرارداد:</p>
                                                <p className="text-sm dark:text-[#E0E2E5] text-[#3B3E46] font-medium">اجاره
                                                    کوتاه مدت</p>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-2 md:w-1/3">
                                                <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">نوع
                                                    ملک:</p>
                                                <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">آپارتمان</p>
                                            </div>
                                            <div className="flex flex-col md:flex-row gap-2 md:w-1/3">
                                                <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">متراژ:</p>
                                                <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">120
                                                    متر</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full flex-col md:flex-row gap-4">
                                            <div className="flex gap-2 md:w-1/3 flex-col md:flex-row">
                                                <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">تعداد
                                                    اتاق خواب:</p>
                                                <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">2</p>
                                            </div>
                                            <div className="flex gap-2 md:w-1/3 flex-col md:flex-row">
                                                <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">طبقه:</p>
                                                <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">2
                                                    از 5</p>
                                            </div>
                                        </div>
                                        <div className="flex gap-2 flex-col md:flex-row">
                                            <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">آدرس:</p>
                                            <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">تهران،
                                                اتوبان لشگری، ایستگاه بیمه، کارخانه نوآوری آرادی</p>
                                        </div>
                                        <div className="flex gap-2 flex-col md:flex-row">
                                            <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">توضیحات:</p>
                                            <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium whitespace-pre-line">{`نورگیر خوب
                                            کف سرامیک / پارکت
                                            پنجره دوجداره
                                            ضد سر و صدا
                                            سقف بلند`}</p>
                                        </div>
                                        <div className="flex gap-2 flex-col md:flex-row">
                                            <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">وضعیت
                                                سکونت:</p>
                                            <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">قابل
                                                تحویل از تاریخ 15 خرداد 1404</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="password">
                                <div
                                    className="flex flex-col gap-6 p-6 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] rounded-2xl">
                                    <div className="flex items-center w-full">
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Sofa className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">مبله</p>
                                        </div>
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Kitchen className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">آشپزخانه
                                                مجهز</p>
                                        </div>
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Washing className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">ماشین
                                                لباسشویی</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Bathroom className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">حمام
                                                اختصاصی</p>
                                        </div>
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Elevator className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">آسانسور</p>
                                        </div>
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Balcony className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">بالکن</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Parking className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">پارکینگ
                                                اختصاصی</p>
                                        </div>
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Monitor className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">تلویزیون</p>
                                        </div>
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Wifi className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">وای
                                                فای</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center w-full">
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <System className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">سیستم
                                                گرمایشی مرکزی</p>
                                        </div>
                                        <div className="flex items-center gap-2 md:w-1/3">
                                            <Wc className="fill-black dark:fill-white"/>
                                            <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">سرویس
                                                بهداشتی ایرانی و فرنگی</p>
                                        </div>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="password1">

                            </TabsContent>
                            <TabsContent value="password2">
                                <div
                                    className="flex flex-col gap-6 p-6 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] rounded-2xl">
                                    <div className="flex items-center gap-2">
                                        <Info className="fill-[#EF4444]"/>
                                        <p className="text-base font-medium text-[#3B3E46] dark:text-[#E0E2E5]">اجاره‌کننده
                                            فقط باید خانم باشد</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Info className="fill-[#EF4444]"/>
                                        <p className="text-base font-medium text-[#3B3E46] dark:text-[#E0E2E5]">ورود
                                            حیوان خانگی ممنوع است</p>
                                    </div>
                                </div>
                            </TabsContent>
                            <TabsContent value="password3">
                                <div
                                    className="flex flex-col gap-6 p-6 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] rounded-2xl">
                                    <ProductAccordion/>
                                </div>
                            </TabsContent>
                            <TabsContent value="password4">
                                <SellerComments/>
                            </TabsContent>
                        </Tabs>
                        <div className="flex md:hidden flex-col gap-10">
                            <div className="md:hidden flex flex-col gap-6 bg-white dark:bg-[#252C36] p-4">
                                <div className="flex flex-col gap-4">
                                    <p className="font-bold text-gray-950 dark:text-gray-50">آپارتمان دو خوابه در
                                        استانبول</p>
                                    <div className="flex items-center justify-between w-full">
                                        <div
                                            className="lex items-center justify-center px-2 py-1 bg-[#F0F9FB] dark:bg-[#374151] rounded-lg text-xs text-[#4299C1] dark:text-[#F0F9FB] w-fit">مالک
                                            ایرانی
                                        </div>
                                        <Modal/>
                                    </div>
                                </div>
                                <div
                                    className="flex flex-col gap-4 p-4 border border-[#D1D5DB] dark:border-[#374151] bg-[#F0F9FB] dark:bg-[#142738] rounded-xl">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="w-6 h-6 border-2 border-gray-800 dark:border-gray-200 rounded-full flex items-center justify-center ">
                                                <Image src="/images/photo.png" alt="" width={100} height={100}
                                                       className="w-screen"/>
                                            </div>
                                            <p className="text-sm text-[#3B3E46] dark:text-[#E0E2E5] font-bold">سعید
                                                اسدی</p>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Star className="w-4 h-4"/>
                                            <p className="text-xs text-gray-800 dark:text-gray-200">4.5</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <p className="text-xs text-gray-700 dark:text-gray-300">مدت عضویت:</p>
                                            <p className="text-sm text-gray-950 dark:text-gray-50">1‌سال و 4ماه</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Location className="w-4 h-4 fill-gray-700 dark:text-gray-300"/>
                                            <p className="text-sm text-gray-950 dark:text-gray-50">استانبول، ترکیه</p>
                                        </div>
                                    </div>
                                    <Link href="/"
                                          className="flex items-center justify-center px-4 py-2 w-full border border-[#4299C1] rounded-xl text-sm text-[#4299C1] font-bold">مشاهده
                                        پروفایل</Link>
                                </div>
                                <div
                                    className="flex flex-col gap-2 p-4 border border-[#D1D5DB] dark:border-[#374151] dark:bg-[#DCFCE8] bg-[#DCFCE8] rounded-xl">
                                    <div className="flex items-center gap-2">
                                        <Tick className=" fill-[#16A34A]"/>
                                        <p className="text-sm font-bold text-black">پرداخت امن</p>
                                    </div>
                                    <p className="text-xs text-black">با فعال‌سازی پرداخت امن در ری‌را، مبلغ ودیعه یا
                                        اجاره
                                        ابتدا در پلتفرم به‌صورت موقت نگهداری می‌شود و تنها پس از تحویل ملک و تایید
                                        مستأجر به
                                        مالک پرداخت خواهد شد. این روش، اعتماد دوطرفه را افزایش می‌دهد و مانع بروز
                                        کلاهبرداری
                                        می‌شود.</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-10">
                                <div
                                    className="flex flex-col gap-6 p-6 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] ">
                                    <div className="flex w-full flex-col md:flex-row gap-4">
                                        <p className="md:hidden text-base dark:text-gray-300 text-gray-700">اطلاعات
                                            عمومی</p>
                                        <div className="flex flex-col md:flex-row gap-2 md:w-1/3">
                                            <p className="text-sm dark:text-gray-300 text-gray-700">نوع
                                                قرارداد:</p>
                                            <p className="text-sm dark:text-[#E0E2E5] text-[#3B3E46] font-medium">اجاره
                                                کوتاه مدت</p>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-2 md:w-1/3">
                                            <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">نوع
                                                ملک:</p>
                                            <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">آپارتمان</p>
                                        </div>
                                        <div className="flex flex-col md:flex-row gap-2 md:w-1/3">
                                            <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">متراژ:</p>
                                            <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">120
                                                متر</p>
                                        </div>
                                    </div>
                                    <div className="flex w-full flex-col md:flex-row gap-4">
                                        <div className="flex gap-2 md:w-1/3 flex-col md:flex-row">
                                            <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">تعداد
                                                اتاق خواب:</p>
                                            <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">2</p>
                                        </div>
                                        <div className="flex gap-2 md:w-1/3 flex-col md:flex-row">
                                            <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">طبقه:</p>
                                            <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">2
                                                از 5</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 flex-col md:flex-row">
                                        <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">آدرس:</p>
                                        <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">تهران،
                                            اتوبان لشگری، ایستگاه بیمه، کارخانه نوآوری آرادی</p>
                                    </div>
                                    <div className="flex gap-2 flex-col md:flex-row">
                                        <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">توضیحات:</p>
                                        <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium whitespace-pre-line">{`نورگیر خوب
                                            کف سرامیک / پارکت
                                            پنجره دوجداره
                                            ضد سر و صدا
                                            سقف بلند`}</p>
                                    </div>
                                    <div className="flex gap-2 flex-col md:flex-row">
                                        <p className="text-sm md:text-base dark:text-gray-300 text-gray-700">وضعیت
                                            سکونت:</p>
                                        <p className="text-sm md:text-lg dark:text-[#E0E2E5] text-[#3B3E46] font-medium">قابل
                                            تحویل از تاریخ 15 خرداد 1404</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col gap-6 px-4 py-6 bg-white dark:bg-[#252C36]">
                                <p className="text-[#3B3E46] dark:text-[#E0E2E5]">امکانات</p>
                                <div className="flex items-center w-full">
                                    <div className="flex items-center flex-col gap-3 w-1/3">
                                        <Sofa className="fill-black dark:fill-white"/>
                                        <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">مبله</p>
                                    </div>
                                    <div
                                        className="flex items-center flex-col gap-3 w-1/3 border-r border-l dark:border-l-[#E0E2E5] dark:border-r-[#E0E2E5]">
                                        <Kitchen className="fill-black dark:fill-white"/>
                                        <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">آشپزخانه
                                            مجهز</p>
                                    </div>
                                    <div className="flex items-center flex-col gap-3 w-1/3">
                                        <Washing className="fill-black dark:fill-white"/>
                                        <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">ماشین
                                            لباسشویی</p>
                                    </div>
                                </div>
                                <input type="checkbox" id="toggleMore" className="hidden peer"/>
                                <div className="hidden peer-checked:block">
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center w-full">
                                            <div className="flex items-center flex-col gap-3 w-1/3">
                                                <Bathroom className="fill-black dark:fill-white"/>
                                                <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">حمام
                                                    اختصاصی</p>
                                            </div>
                                            <div
                                                className="flex items-center flex-col gap-3 w-1/3 border-r border-l dark:border-l-[#E0E2E5] dark:border-r-[#E0E2E5]">
                                                <Elevator className="fill-black dark:fill-white"/>
                                                <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">آسانسور</p>
                                            </div>
                                            <div className="flex items-center flex-col gap-3 w-1/3">
                                                <Balcony className="fill-black dark:fill-white"/>
                                                <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">بالکن</p>
                                            </div>
                                        </div>

                                        <div className="flex items-center w-full">
                                            <div className="flex items-center flex-col gap-3 w-1/3">
                                                <Parking className="fill-black dark:fill-white"/>
                                                <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">پارکینگ
                                                    اختصاصی</p>
                                            </div>
                                            <div
                                                className="flex items-center flex-col gap-3 w-1/3 border-r border-l dark:border-l-[#E0E2E5] dark:border-r-[#E0E2E5]">
                                                <Monitor className="fill-black dark:fill-white"/>
                                                <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">تلویزیون</p>
                                            </div>
                                            <div className="flex items-center flex-col gap-3 w-1/3">
                                                <Wifi className="fill-black dark:fill-white"/>
                                                <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">وای
                                                    فای</p>
                                            </div>
                                        </div>
                                        <div className="flex w-full gap-3">
                                            <div
                                                className="flex items-center flex-col gap-3 w-1/2 border-l dark:border-l-[#E0E2E5]">
                                                <System className="fill-black dark:fill-white"/>
                                                <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">سیستم
                                                    گرمایشی مرکزی</p>
                                            </div>
                                            <div className="flex items-center flex-col gap-3 w-1/2">
                                                <Wc className="fill-black dark:fill-white"/>
                                                <p className="text-base dark:text-[#E0E2E5] text-[#3B3E46] font-medium">سرویس
                                                    بهداشتی ایرانی و فرنگی</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <label htmlFor="toggleMore"
                                       className="text-[#4299C1] font-bold cursor-pointer peer-checked:hidden mt-3">
                                    نمایش همه جزئیات
                                </label>
                                <label htmlFor="toggleMore"
                                       className="text-[#4299C1] font-bold  cursor-pointer hidden peer-checked:inline mt-3">
                                    بستن
                                </label>
                            </div>
                            <div
                                className="flex flex-col gap-4 py-6 px-4 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] ">
                                <p className="text-[#3B3E46] dark:text-[#E0E2E5]">قوانین</p>
                                <div className="flex items-center gap-2">
                                    <Info className="fill-[#EF4444]"/>
                                    <p className="text-sm font-medium text-[#3B3E46] dark:text-[#E0E2E5]">اجاره‌کننده
                                        فقط باید خانم باشد</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Info className="fill-[#EF4444]"/>
                                    <p className="text-sm font-medium text-[#3B3E46] dark:text-[#E0E2E5]">ورود
                                        حیوان خانگی ممنوع است</p>
                                </div>
                            </div>
                            <div
                                className="flex flex-col gap-6 py-6 px-4 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] ">
                                <ProductAccordion/>
                            </div>
                            <div className="flex flex-col gap-6 py-6 px-4 bg-white dark:bg-[#252C36] border border-[#D1D5DB] dark:border-[#374151] ">
                                <SellerComments/>
                            </div>
                            <div
                                className="flex flex-col gap-12 px-4 py-6 border border-[#D1D5DB] dark:border-[#374151] bg-white dark:bg-[#252C36]  w-full">
                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">مبلغ بیعانه:</p>
                                        <div className="flex items-center gap-1">
                                            <p className="text-[#142738] dark:text-[#D9EDF4] font-bold text-xl">{(20000000).toLocaleString()}</p>
                                            <Select>
                                                <SelectTrigger
                                                    className="border-none shadow-none text-[#4299C1] dark:text-[#D9EDF4] ">
                                                    <SelectValue className="text-sm font-bold text-[#4299C1] "
                                                                 placeholder="تومان"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem
                                                            className="text-sm font-bold text-[#3B3E46] dark:text-white"
                                                            value="apple">تومان</SelectItem>
                                                        <SelectItem
                                                            className="text-sm font-bold text-[#3B3E46] dark:text-white"
                                                            value="banana">دلار</SelectItem>
                                                        <SelectItem
                                                            className="text-sm font-bold text-[#3B3E46] dark:text-white"
                                                            value="blueberry">یورو</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm text-gray-700 dark:text-gray-300">مبلغ کل:</p>
                                        <div className="flex items-center gap-1">
                                            <p className="text-[#142738] dark:text-[#D9EDF4] font-bold text-xl">{(20000000).toLocaleString()}</p>
                                            <Select>
                                                <SelectTrigger
                                                    className="border-none shadow-none text-[#4299C1] dark:text-[#D9EDF4] ">
                                                    <SelectValue className="text-base font-bold text-[#4299C1] "
                                                                 placeholder="تومان"/>
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectGroup>
                                                        <SelectItem
                                                            className="text-sm font-bold text-[#3B3E46] dark:text-white"
                                                            value="apple">تومان</SelectItem>
                                                        <SelectItem
                                                            className="text-sm font-bold text-[#3B3E46] dark:text-white"
                                                            value="banana">دلار</SelectItem>
                                                        <SelectItem
                                                            className="text-sm font-bold text-[#3B3E46] dark:text-white"
                                                            value="blueberry">یورو</SelectItem>
                                                    </SelectGroup>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6 w-full">
                                    <Link href="/"
                                          className="flex items-center justify-center gap-2 w-1/2 border border-[#4299C1] rounded-xl px-5 py-2">
                                        <Messages className="fill-[#4299C1]"/>
                                        <p className="text-base text-[#4299C1] whitespace-nowrap">چت و تماس</p>
                                    </Link>
                                    <Link href="/"
                                          className="flex items-center justify-center gap-2 w-1/2 bg-[#4299C1] rounded-xl px-5 py-2">
                                        <p className="text-base text-white dark:text-black whitespace-nowrap">اطلاعات
                                            تماس</p>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="hidden md:flex flex-col gap-6 ">
                    <div
                        className="flex flex-col gap-12 px-2 py-6 border border-[#D1D5DB] dark:border-[#374151] bg-white dark:bg-[#252C36] rounded-2xl w-full">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-bold text-gray-950 dark:text-gray-50">آپارتمان دو خوابه
                                        در
                                        استانبول</p>
                                    <div className="flex items-center gap-4">
                                        <button><Share className="fill-gray-700 dark:fill-gray-300 "/></button>
                                        <button><Heart className="fill-gray-700 dark:fill-gray-300 "/></button>
                                    </div>
                                </div>
                                <div
                                    className="lex items-center justify-center px-3 py-1 bg-[#F0F9FB] dark:bg-[#374151] rounded-lg text-sm text-[#4299C1] dark:text-[#F0F9FB] w-fit">مالک
                                    ایرانی
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-700 dark:text-gray-300">مبلغ کل:</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-[#142738] dark:text-[#D9EDF4] font-bold text-xl">{(20000000).toLocaleString()}</p>
                                    <Select>
                                        <SelectTrigger
                                            className="border-none shadow-none text-[#4299C1] dark:text-[#D9EDF4] ">
                                            <SelectValue className="text-base font-bold text-[#4299C1] "
                                                         placeholder="تومان"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem className="text-sm text-[#3B3E46] dark:text-white"
                                                            value="apple">تومان</SelectItem>
                                                <SelectItem className="text-sm text-[#3B3E46] dark:text-white"
                                                            value="banana">دلار</SelectItem>
                                                <SelectItem className="text-sm text-[#3B3E46] dark:text-white"
                                                            value="blueberry">یورو</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 w-full">
                            <Link href="/"
                                  className="flex items-center justify-center gap-2 w-1/2 border border-[#4299C1] rounded-xl px-5 py-2">
                                <Messages className="fill-[#4299C1]"/>
                                <p className="text-base text-[#4299C1] whitespace-nowrap">چت و تماس</p>
                            </Link>
                            <Link href="/"
                                  className="flex items-center justify-center gap-2 w-1/2 bg-[#4299C1] rounded-xl px-5 py-2">
                                <p className="text-base text-white dark:text-black whitespace-nowrap">اطلاعات تماس</p>
                            </Link>
                        </div>
                    </div>
                    <div
                        className="flex flex-col gap-6 p-4 border border-[#D1D5DB] dark:border-[#374151] bg-[#F0F9FB] dark:bg-[#142738] rounded-xl">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 border-3 border-gray-800 dark:border-gray-200 rounded-full ">
                                    <Image src="/images/photo.png" alt="" width={100} height={100}
                                           className="w-screen"/>
                                </div>
                                <p className="text-lg text-[#3B3E46] dark:text-[#E0E2E5] font-bold">سعید اسدی</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="w-4 h-4"/>
                                <p className="text-base text-gray-800 dark:text-gray-200">4.5</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-gray-700 dark:text-gray-300">مدت عضویت:</p>
                                <p className="text-base text-gray-950 dark:text-gray-50">1‌سال و 4ماه</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Location className="w-4 h-4 fill-gray-700 dark:text-gray-300"/>
                                <p className="text-base text-gray-950 dark:text-gray-50">استانبول، ترکیه</p>
                            </div>
                        </div>
                    </div>
                    <Modal/>
                    <div
                        className="flex flex-col gap-2 p-4 border border-[#D1D5DB] dark:border-[#374151] dark:bg-[#DCFCE8] bg-[#DCFCE8] rounded-xl">
                        <div className="flex items-center gap-2">
                            <Tick className="w-10 h-10 fill-[#16A34A]"/>
                            <p className="text-lg font-bold text-black">پرداخت امن</p>
                        </div>
                        <p className="text-sm text-black">با فعال‌سازی پرداخت امن در ری‌را، مبلغ ودیعه یا اجاره ابتدا در
                            پلتفرم به‌صورت موقت نگهداری می‌شود و تنها پس از تحویل ملک و تایید مستأجر به مالک پرداخت
                            خواهد شد. این روش، اعتماد دوطرفه را افزایش می‌دهد و مانع بروز کلاهبرداری می‌شود.</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Page;