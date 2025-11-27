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
import { useTranslation } from "@/app/[locale]/TranslationContext";
import Link from "next/link";
import { useParams } from "next/navigation";

const Categories = () => {
  const dic = useTranslation();
  const c = dic.categories;
  const params = useParams();
  const locale = params.locale;
  function toFarsiDigits(number) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const mobileSpecialCategories = [
    {
      id: 1,
      title: "خـــــدمـــــــــــات حـــــقــــوقــی",
      image: "/images/legal.png",
      width: 126,
      height: 153,
      colSpan: 1,
      href: "https://reera-adviser.vercel.app/en/consultation/consultant/consultor-infirmation",
    },
    {
      id: 2,
      title: "راهـــنـــمــای سفــــــــــــــــــر",
      image: "/images/youngman.png",
      width: 140,
      height: 165,
      colSpan: 1,
      href: "https://reera-adviser.vercel.app/en/consultation/consultant/consultor-infirmation",
    },
    {
      id: 3,
      title: "همسریابی",
      image: "/images/rings.png",
      width: 151,
      height: 88,
      colSpan: 2,
      href: "https://reera-adviser.vercel.app/en/consultation/consultant/consultor-infirmation",
    },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Desktop category section */}
      <DesktopCategorySection />

      {/* Mobile Category section */}
      <div className="px-6">
        {/* Mobile special categories grid */}
        <div className="grid grid-cols-2 mt-6 gap-x-2 gap-y-2 lg:hidden">
          {mobileSpecialCategories.map((category) => (
            <Link
              href={category.href}
              key={category.id}
              className={`flex flex-col items-center justify-center space-y-2 border border-gray-300 rounded-lg w-full h-54 bg-[linear-gradient(135deg,_#ffffff_10%,_#B7DCEA_90%)] dark:bg-[linear-gradient(30deg,_#14181D_50%,_#294A61_90%)] px-4 hover:scale-105 duration-500 cursor-pointer ${
                category.colSpan === 2 ? "col-span-full" : ""
              } ${category.id === 3 ? "flex-row space-x-4 h-26" : ""}`}
            >
              <span>{category.title}</span>
              <Image
                src={category.image}
                width={category.width}
                height={category.height}
                alt={category.title}
              />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
