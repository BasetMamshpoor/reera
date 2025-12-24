"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Whatsapp from "@/assets/icons/whatsapp.svg";
const DesktopFooter = () => {
  return (
    <div className="hidden md:flex flex-col w-full mt-34 bg-gradient-to-b from-[#FAFCFF] to-[#D1E2FC] dark:from-[#14181D0] dark:to-[#142738] lg:h-120 ">
      <div className="mx-auto flex lg:flex-row flex-col gap-6 pt-32 w-full md:max-w-7xl">
        <div className="flex flex-col items-end justify-start gap-4 text-[#000] dark:text-[#fff] w-84">
          <h2 className="text-2xl font-[600]">تماس با ما</h2>
          <div className="flex flex-row items-end gap-4">
            <span className="text-right">
              تهران، میدان آزادی، بعد از بیمه، کارخانه نوآوری آزادی
            </span>
          </div>
          <div className="flex flex-row items-end gap-4">
            <span>02166487954</span>
          </div>
          <div className="flex flex-row items-end gap-4"></div>
        </div>
        <div className="flex flex-col items-end justify-start gap-4 text-[#000] dark:text-[#fff] w-84">
          <h2 className="text-2xl font-[600]">خدمات</h2>
          <div className="flex flex-row items-end gap-4">
            <span>درباره ما</span>
            <span>وبلاگ</span>
          </div>
          <div className="flex flex-row items-end gap-4">
            <span>تماس با ما</span>
            <span>راهنمای سفر</span>
          </div>
          <div className="flex flex-row items-end gap-4">
            <span>ثبت آگهی</span>
            <span>ورود و ثبت نام</span>
          </div>
        </div>
        <div className="flex flex-col items-end justify-start gap-4 text-[#000] dark:text-[#fff] w-84">
          <h2 className="text-2xl font-[600]">دسته بندی ها</h2>
          <div className="flex flex-row items-end gap-4">
            <span>مسکن</span>
            <span>حملو نقل</span>
          </div>
          <div className="flex flex-row items-end gap-4">
            <span>هم خانه</span>
            <span>کاریابی و استخدام</span>
          </div>
          <div className="flex flex-row items-end gap-4">
            <span>مهاجرت</span>
            <span>خرید و فروش کالای دست دوم</span>
          </div>
        </div>

        <div className="flex flex-col items-end justify-start gap-4 text-[#000] dark:text-[#fff] p-4 w-84">
          <h2 className="text-2xl font-[600]">ریرا</h2>
          <span className="text-right">
            پلتفرمی برای مهاجران در تمامی کشورها، با ارائه انواع خدمات مسکن، هم
            خانه، حمل‌ونقل، مهاجرت، کاریابی و استخدام، خرید و فروش کالای دست‌دوم
          </span>
        </div>
      </div>
      <div className="flex flex-row justify-between items-center  mt-6 w-full px-6 mx-auto md:max-w-7xl">
        <div className="flex flex-row items-center gap-4">
          <Image width={100} height={100} src={"/images/Icon.png"} alt=""></Image>
          <Image width={100} height={100} src={"/images/Icon.png"} alt=""></Image>
          <Image width={100} height={100} src={"/images/Icon.png"} alt=""></Image>
          <Image width={100} height={100} src={"/images/Icon.png"} alt=""></Image>
        </div>
        <div className="flex flex-row items-center gap-4">
          <Whatsapp className="dark:fill-white " />
          <Whatsapp className="dark:fill-white " />
          <Whatsapp className="dark:fill-white " />
        </div>
      </div>
    </div>
  );
};

export default DesktopFooter;
