"use client";
import React from "react";
import Image from "next/image";

import Home from "@/assets/icons/home-hashtag.svg";
import Location from "@/assets/icons/location.svg";
import GreenTick from "@/assets/icons/tick-circle.svg";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { useDirection } from "@/hooks/useDirection";
function toFarsiDigits(number) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
}

const Advertisements = ({ isOnProfile = false }) => {
  const dir = useDirection();
  return (
    <>
      {!isOnProfile && (
        <div className="flex flex-row items-center justify-between mt-12">
          <Link
            href={`/`}
            className="flex flex-row gap-2 cursor-pointer items-center justify-center"
          >
            <ChevronLeft />
            <span className="font-[600] text-sm">مشاهده همه</span>
          </Link>
          <div className="flex flex-row items-center gap-4">
            <h2 className="text-[#000000] dark:text-[#D9EDF4] font-[600] text-2xl">
              آگهی های ریرا
            </h2>
          </div>
        </div>
      )}
      <div
        dir={dir}
        className={`grid grid-cols-1 gap-y-10 mt-10 sm:grid-cols-2 sm:gap-x-4  ${
          isOnProfile ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } lg:gap-x-6 `}
      >
        {/* first Item */}
        <div className="relative flex items-center flex-col h-140 rounded-4xl bg-[#ffffff] space-y-4 sm:h-120 md:h-130  cursor-pointer dark:bg-[#252C36]">
          <div className="absolute py-1 px-2 top-2 right-4 rounded-lg bg-[#DCFCE8] flex flex-row gap-1">
            <span className="text-[#16A34A]">تایید شده</span>
            <GreenTick className="fill-[#16A34A]" />
          </div>
          <Image
            src="/images/advimage.png"
            className="w-full rounded-2xl"
            width={302}
            height={194}
            alt=""
          />
          <div className="flex flex-row justify-between items-center w-full px-4">
            <span className="text-xs text-gray-400 dark:text-[#ffffff]">
              پنج دقیقه پیش
            </span>
            <span className="text-sm py-1 px-2 bg-[#F0F9FB] text-[#4299C1] rounded-md  font-[900] dark:bg-[#374151] dark:text-[#ffffff]">
              آپارتمان مبله
            </span>
          </div>
          <h2 className=" font-[500] text-lg text-right self-end px-4">
            خرید آپارتمان در استانبول
          </h2>
          <div className="self-end px-4 flex flex-row items-center justify-end gap-2 ">
            <span className="flex flex-row gap-1 items-center">
              <span>متر</span>
              <span>{toFarsiDigits("50")}</span>
            </span>
            <Home className={`fill-black dark:fill-white`} />
          </div>
          <div className="self-end px-4 flex flex-row items-center justify-end gap-2">
            <span className="flex flex-row gap-1 items-center">
              <span>ترکیه استانبول</span>
            </span>
            <Location className={`fill-black dark:fill-white`} />
          </div>
          <h2 className="self-start px-4  font-[600] text-2xl">
            {" "}
            {toFarsiDigits("2/200/000")} تومان
          </h2>
        </div>
        {/* Second item */}
        <div className="relative flex items-center flex-col h-140 rounded-4xl bg-[#ffffff] space-y-4 sm:h-120 md:h-130  cursor-pointer dark:bg-[#252C36]">
          <div className="absolute py-1 px-2 top-2 right-4 rounded-lg bg-[#DCFCE8] flex flex-row gap-1">
            <span className="text-[#16A34A]">تایید شده</span>
            <GreenTick className="fill-[#16A34A]" />
          </div>
          <Image
            src="/images/advimage.png"
            className="w-full rounded-2xl"
            width={302}
            height={194}
            alt=""
          />

          <div className="flex flex-row justify-between items-center w-full px-4">
            <span className="text-xs text-gray-400 dark:text-[#ffffff]">
              پنج دقیقه پیش
            </span>
            <span className="text-sm py-1 px-2 bg-[#F0F9FB] text-[#4299C1] rounded-md  font-[900] dark:bg-[#374151] dark:text-[#ffffff]">
              آپارتمان مبله
            </span>
          </div>
          <h2 className=" font-[500] text-lg text-right self-end px-4">
            خرید آپارتمان در استانبول
          </h2>
          <div className="self-end px-4 flex flex-row items-center justify-end gap-2 ">
            <span className="flex flex-row gap-1 items-center">
              <span>متر</span>
              <span>{toFarsiDigits("50")}</span>
            </span>
            <Home className={`fill-black dark:fill-white`} />
          </div>
          <div className="self-end px-4 flex flex-row items-center justify-end gap-2">
            <span className="flex flex-row gap-1 items-center">
              <span>ترکیه استانبول</span>
            </span>
            <Location className={`fill-black dark:fill-white`} />
          </div>
          <h2 className="self-start px-4  font-[600] text-2xl">
            {" "}
            {toFarsiDigits("2/200/000")} تومان
          </h2>
        </div>

        {/* Third Item */}
        <div className="relative flex items-center flex-col h-140 rounded-4xl bg-[#ffffff] space-y-4 sm:h-120 md:h-130  cursor-pointer dark:bg-[#252C36]">
          <div className="absolute py-1 px-2 top-2 right-4 rounded-lg bg-[#DCFCE8] flex flex-row gap-1">
            <span className="text-[#16A34A]">تایید شده</span>
            <GreenTick className="fill-[#16A34A]" />
          </div>
          <Image
            src="/images/advimage.png"
            className="w-full rounded-2xl"
            width={302}
            height={194}
            alt=""
          />

          <div className="flex flex-row justify-between items-center w-full px-4">
            <span className="text-xs text-gray-400 dark:text-[#ffffff]">
              پنج دقیقه پیش
            </span>
            <span className="text-sm py-1 px-2 bg-[#F0F9FB] text-[#4299C1] rounded-md  font-[900] dark:bg-[#374151] dark:text-[#ffffff]">
              آپارتمان مبله
            </span>
          </div>
          <h2 className=" font-[500] text-lg text-right self-end px-4">
            خرید آپارتمان در استانبول
          </h2>
          <div className="self-end px-4 flex flex-row items-center justify-end gap-2 ">
            <span className="flex flex-row gap-1 items-center">
              <span>متر</span>
              <span>{toFarsiDigits("50")}</span>
            </span>
            <Home className={`fill-black dark:fill-white`} />
          </div>
          <div className="self-end px-4 flex flex-row items-center justify-end gap-2">
            <span className="flex flex-row gap-1 items-center">
              <span>ترکیه استانبول</span>
            </span>
            <Location className={`fill-black dark:fill-white`} />
          </div>
          <h2 className="self-start px-4  font-[600] text-2xl">
            {" "}
            {toFarsiDigits("2/200/000")} تومان
          </h2>
        </div>
        {/* Fourth Item */}
        <div className="relative flex items-center flex-col h-140 rounded-4xl bg-[#ffffff] space-y-4 sm:h-120 md:h-130 cursor-pointer dark:bg-[#252C36]">
          <div className="absolute py-1 px-2 top-2 right-4 rounded-lg bg-[#DCFCE8] flex flex-row gap-1">
            <span className="text-[#16A34A]">تایید شده</span>
            <GreenTick className="fill-[#16A34A]" />
          </div>
          <Image
            src="/images/advimage.png"
            className="w-full rounded-2xl"
            width={302}
            height={194}
            alt=""
          />

          <div className="flex flex-row justify-between items-center w-full px-4">
            <span className="text-xs text-gray-400 dark:text-[#ffffff]">
              پنج دقیقه پیش
            </span>
            <span className="text-sm py-1 px-2 bg-[#F0F9FB] text-[#4299C1] rounded-md  font-[900] dark:bg-[#374151] dark:text-[#ffffff]">
              آپارتمان مبله
            </span>
          </div>
          <h2 className=" font-[500] text-lg text-right self-end px-4">
            خرید آپارتمان در استانبول
          </h2>
          <div className="self-end px-4 flex flex-row items-center justify-end gap-2 ">
            <span className="flex flex-row gap-1 items-center">
              <span>متر</span>
              <span>{toFarsiDigits("50")}</span>
            </span>
            <Home className={`fill-black dark:fill-white`} />
          </div>
          <div className="self-end px-4 flex flex-row items-center justify-end gap-2">
            <span className="flex flex-row gap-1 items-center">
              <span>ترکیه استانبول</span>
            </span>
            <Location className={`fill-black dark:fill-white`} />
          </div>
          <h2 className="self-start px-4  font-[600] text-2xl">
            {" "}
            {toFarsiDigits("2/200/000")} تومان
          </h2>
        </div>
      </div>
    </>
  );
};

export default Advertisements;
