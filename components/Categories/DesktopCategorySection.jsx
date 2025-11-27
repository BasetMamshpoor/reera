import React from "react";
import Image from "next/image";
import LongArrow from "@/assets/icons/vectorr.svg";
import { useTheme } from "next-themes";
import Link from "next/link";
const DesktopCategorySection = () => {
  const { theme } = useTheme();
  return (
    <div className="hidden lg:flex flex-row gap-4 mt-10 ">
      <LongArrow className="self-end w-full h-full text-blue-500" />
      <Link
        href={`https://reera-adviser.vercel.app/en/consultation/consultant/consultor-infirmation`}
        className="relative flex flex-row space-x-4 items-center justify-center bg-gradient-to-tr from-[#ffffff] to-[#B7DCEA] rounded-lg px-4 border-1 border-gray-300 w-full h-42 hover:scale-105 transition-all duration-500 cursor-pointer dark:from-[#14181D] dark:to-[#294A61]"
      >
        <Image src="/images/youngman.png" width={190} height={140} alt="" />
        <span className="text-2xl font-[500] text-right">
          راهـــنـــمــای سفــــــــــــــــــر
        </span>
      </Link>

      <Link
        href={`https://reera-adviser.vercel.app/en/consultation/consultant/consultor-infirmation`}
        className="flex flex-row items-center justify-center space-y-2 border-1 border-gray-300 rounded-lg w-full h-42 bg-gradient-to-tr from-[#ffffff] to-[#B7DCEA] px-4 hover:scale-105 transition-all duration-500 cursor-pointer dark:from-[#14181D] dark:to-[#294A61]"
      >
        <Image src="/images/legal.png" width={169} height={120} alt="" />
        <span className="text-2xl ">
          خـــــدمـــــــــــات حـــــقــــوقــی
        </span>
      </Link>
    </div>
  );
};

export default DesktopCategorySection;
