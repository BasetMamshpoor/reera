import React from "react";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

const DesktopSearchLayer = () => {
  return (
    <div className="text-sm text-gray-600 text-right px-4">
      <div className="flex flex-row justify-between items-center">
        <span className="dark:text-[#fff]">جستجو های اخیر شما</span>
      </div>

      <div className="flex flex-wrap gap-4 items-center mt-4">
        <button className=" bg-[#EEF0F1] dark:bg-[#CDCFD4] dark:text-[#000]  px-2 py-1 rounded-md cursor-pointer">
          موبایل
        </button>
        <button className=" bg-[#EEF0F1] dark:bg-[#CDCFD4] dark:text-[#000]  px-2 py-1 rounded-md cursor-pointer">
          موبایل
        </button>
        <button className=" bg-[#EEF0F1] dark:bg-[#CDCFD4] dark:text-[#000]  px-2 py-1 rounded-md cursor-pointer">
          موبایل
        </button>
      </div>
    </div>
  );
};

export default DesktopSearchLayer;
