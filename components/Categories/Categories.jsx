"use client";
import React from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import Car from "@/assets/icons/car.svg";
import Settings from "@/assets/icons/settings.svg";
import Home from "@/assets/icons/home.svg";
import HomeWifi from "@/assets/icons/homewifi.svg";
import Mobile from "@/assets/icons/mobile.svg";
import Briefcase from "@/assets/icons/briefcase.svg";
import People from "@/assets/icons/people.svg";
import Cpu from "@/assets/icons/cpu.svg";
import Happy from "@/assets/icons/happy.svg";
import Personal from "@/assets/icons/personal.svg";
import DesktopCategorySection from "./DesktopCategorySection";
const Categories = () => {
  function toFarsiDigits(number) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  return (
    <>
      {/* Desktop category section */}
      <DesktopCategorySection />
      {/* Mobile Category section */}
      <div className="w-full flex flex-col gap-4 items-center justify-center mt-10 md:hidden">
        <h2 className="font-[600] text-2xl">دســـتــه‌بــنـدی‌هــای</h2>
        <div className="flex flex-row items-center gap-4">
          <h2 className="font-[600] text-2xl text-[#4299C1]">ریــــرا</h2>
          <Image src="/images/logo.png" width={52} height={60} alt="logo" />
        </div>
      </div>
      <div className="grid grid-cols-2 mt-6 gap-x-2 gap-y-2 lg:hidden">
        <div className="flex flex-col items-center justify-center space-y-2 border border-gray-300 rounded-lg w-full h-54 bg-[linear-gradient(135deg,_#ffffff_10%,_#B7DCEA_90%)] dark:bg-[linear-gradient(30deg,_#14181D_50%,_#294A61_90%)] px-4 hover:scale-105 duration-500 cursor-pointer">
          <span>خـــــدمـــــــــــات حـــــقــــوقــی</span>
          <Image src="/images/legal.png" width={126} height={153} alt="" />
        </div>

        <div className="flex flex-col items-center justify-center space-y-2 border border-gray-300 rounded-lg w-full h-54 bg-[linear-gradient(135deg,_#ffffff_10%,_#B7DCEA_90%)] dark:bg-[linear-gradient(30deg,_#14181D_50%,_#294A61_90%)] px-4 hover:scale-105 duration-500 cursor-pointer">
          <span>راهـــنـــمــای سفــــــــــــــــــر</span>
          <Image src="/images/youngman.png" width={140} height={165} alt="" />
        </div>
        <div className="col-span-full flex flex-row space-x-4 items-center justify-center bg-[linear-gradient(135deg,_#ffffff_10%,_#B7DCEA_90%)] dark:bg-[linear-gradient(30deg,_#14181D_50%,_#294A61_90%)] px-4 hover:scale-105 duration-500 cursor-pointer rounded-lg h-26 border-1 border-gray-300 dark:from-[#14181D] dark:to-[#294A61]">
          <Image src="/images/rings.png" width={151} height={88} alt="" />
          <span>همسریابی</span>
        </div>
      </div>
      {/* category items */}
      <div className="flex flex-col gap-2 w-full items-center justify-center mt-20 md:hidden">
        {/* <Image src={sectionTitleDark} alt="" className=""></Image> */}
        <div className="flex flex-row-reverse justify-center items-center gap-4">
          {/* <Image width={52} src={Logo} alt=""></Image>
          <Image src={reera} className="" alt=""></Image> */}
        </div>
      </div>

      <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-8 gap-x-4 gap-y-10">
        {/* item1 */}
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff] ">
            {toFarsiDigits("4000")}
          </div>
          <Car className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            وسایل نقلیه
          </h2>
        </div>
        {/* item2 */}
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px]  font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff]">
            {toFarsiDigits("4000")}
          </div>
          <Home className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            املاک
          </h2>
        </div>
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff] ">
            {toFarsiDigits("4000")}
          </div>
          <HomeWifi className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            خانه و آشپزخانه
          </h2>
        </div>
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff]">
            {toFarsiDigits("4000")}
          </div>
          <Mobile className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            کالای دیجیتال
          </h2>
        </div>
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff]">
            {toFarsiDigits("4000")}
          </div>
          <Personal className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            وسایل شخصی
          </h2>
        </div>
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff]">
            {toFarsiDigits("4000")}
          </div>
          <Settings className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            خدمات
          </h2>
        </div>
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff]">
            {toFarsiDigits("4000")}
          </div>
          <People className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            اجتماعی
          </h2>
        </div>
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full  text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff]">
            {toFarsiDigits("4000")}
          </div>
          <Happy className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            سرگرمی و فراغت
          </h2>
        </div>
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff]">
            {toFarsiDigits("4000")}
          </div>
          <Briefcase className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            کاریابی و استخدام
          </h2>
        </div>
        <div className="relative flex flex-col items-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-28 justify-center cursor-pointer gap-2">
          <div className="flex items-center justify-center absolute left-[-10px] top-[-18px] w-12 h-12 border-1 bg-[#f9fafb] border-gray-300 rounded-full text-[12px] font-['yekanbakh'] dark:bg-[#14181d] dark:text-[#ffffff]">
            {toFarsiDigits("4000")}
          </div>
          <Cpu className="dark:fill-white !w-8 !h-8 fill-black" />
          <h2 className="font-['yekanbakh'] font-[600] text-xl text-[#152F56] dark:text-[#ffffff]">
            تجهیزات و ضمعتی
          </h2>
        </div>
      </div>
    </>
  );
};

export default Categories;
