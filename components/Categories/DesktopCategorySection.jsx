import React from "react";
import Image from "next/image";
import LongArrow from "@/assets/icons/vectorr.svg";
import { useTheme } from "next-themes";
const DesktopCategorySection = () => {
  const { theme } = useTheme();
  return (
    <div className="hidden lg:flex flex-row gap-4 mt-10">
      <div className="flex flex-row items-center justify-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-42 bg-gradient-to-tr from-[#ffffff] to-[#B7DCEA] px-4 hover:scale-105 transition-all duration-500 cursor-pointer dark:from-[#14181D] dark:to-[#294A61]">
        <Image src="/images/legal.png" width={169} height={205} alt="" />
        <span className="text-2xl text-right">
          خـــــدمـــــــــــات حـــــقــــوقــی
        </span>
      </div>
      <div className="flex flex-row items-center justify-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-42 bg-gradient-to-tr from-[#ffffff] to-[#B7DCEA] px-4 hover:scale-105 transition-all duration-500 cursor-pointer dark:from-[#14181D] dark:to-[#294A61]">
        <Image src="/images/rings.png" width={151} height={88} alt="" />
        <span className="text-2xl font-[500] text-right">همسریابی</span>
      </div>
      <div className="relative flex flex-row space-x-4 items-center justify-center bg-gradient-to-tr from-[#ffffff] to-[#B7DCEA] rounded-lg px-4 border-1 border-gray-300 w-full h-42 hover:scale-105 transition-all duration-500 cursor-pointer dark:from-[#14181D] dark:to-[#294A61]">
        <Image src="/images/youngman.png" width={190} height={223} alt="" />
        <span className="text-2xl font-[500] text-right">
          راهـــنـــمــای سفــــــــــــــــــر
        </span>
      </div>
      <LongArrow className="self-end w-full h-full text-blue-500" />

      <div className="flex flex-col gap-4 self-end justify-end w-full h-42">
        <span className="text-right text-2xl font-[700]">
          دســـتــه‌بــنـدی‌هــای
        </span>

        <div className="flex flex-row items-center gap-2 self-end">
          <span className="font-[700] text-2xl">ریــــرا</span>
          <Image src="/images/logo.png" width={68} height={80} />
        </div>
      </div>
    </div>
  );
};

export default DesktopCategorySection;
