"use client";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
const DesktopCenter = () => {
  const pathname = usePathname();
  return (
    <div className="hidden lg:flex flex-row md:gap-2 lg:gap-4 xl:gap-8 font-[400] ">
        <Link
            href="/"
            className={`${
                pathname === "/" ? "text-[#142738] font-[700]" : "text-[#3B3E46]"
            } dark:text-[#E0E2E5]`}
        >
            صفحه اصلی
        </Link>
        <Link
            href="/travelguidance"
            className={`${
                pathname === "/travelguidance"
                    ? "text-[#142738] font-[700]"
                    : "text-[#3B3E46]"
            } dark:text-[#E0E2E5]`}
        >
            راهنمای سفر
        </Link>
        <Link
            href="/transportation"
            className={`${
                pathname === "/transportation"
                    ? "text-[#142738] font-[700]"
                    : "text-[#3B3E46]"
            } dark:text-[#E0E2E5]`}
        >
            حمل و نقل
        </Link>
        <Link
            href="/legaladviser"
            className={`${
                pathname === "/legaladviser"
                    ? "text-[#142738] font-[700]"
                    : "text-[#3B3E46]"
            } dark:text-[#E0E2E5]`}
        >
            خدمات حقوقی
        </Link>
      <Link
        href="/weblog"
        className={`${
          pathname === "/weblog"
            ? "text-[#142738] font-[700]"
            : "text-[#3B3E46]"
        } dark:text-[#E0E2E5]`}
      >
        وبلاگ
      </Link>




    </div>
  );
};

export default DesktopCenter;
