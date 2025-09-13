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

const Categories = () => {
  const dic = useTranslation();
  const c = dic.categories;
  function toFarsiDigits(number) {
    const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
    return number.toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
  }

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Category data array
  const categories = [
    {
      id: 1,
      name: c.vehicles,
      icon: <Car className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 2,
      name: c.real_estate,
      icon: <Home className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 3,
      name: c.home_kitchen,
      icon: <HomeWifi className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 4,
      name: c.digital_goods,
      icon: <Mobile className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 5,
      name: c.personal_items,
      icon: <Personal className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 6,
      name: c.services,
      icon: <Settings className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 7,
      name: c.social,
      icon: <People className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 8,
      name: c.entertainment_leisure,
      icon: <Happy className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 9,
      name: c.job_recruitment,
      icon: <Briefcase className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
    {
      id: 10,
      name: c.industrial_equipment,
      icon: <Cpu className="dark:fill-white !w-8 !h-8 fill-black" />,
      count: "4000",
    },
  ];

  // Mobile special categories
  const mobileSpecialCategories = [
    {
      id: 1,
      title: "خـــــدمـــــــــــات حـــــقــــوقــی",
      image: "/images/legal.png",
      width: 126,
      height: 153,
      colSpan: 1,
    },
    {
      id: 2,
      title: "راهـــنـــمــای سفــــــــــــــــــر",
      image: "/images/youngman.png",
      width: 140,
      height: 165,
      colSpan: 1,
    },
    {
      id: 3,
      title: "همسریابی",
      image: "/images/rings.png",
      width: 151,
      height: 88,
      colSpan: 2,
    },
  ];

  if (!mounted) return null;

  return (
    <>
      {/* Desktop category section */}
      <DesktopCategorySection />

      {/* Mobile Category section */}
      <div className="px-6">
        <div className="w-full flex flex-col gap-4 items-center justify-center mt-10 md:hidden">
          <h2 className="font-[600] text-2xl">دســـتــه‌بــنـدی‌هــای</h2>
          <div className="flex flex-row items-center gap-4">
            <h2 className="font-[600] text-2xl text-[#4299C1]">ریــــرا</h2>
            <Image src="/images/logo.png" width={52} height={60} alt="logo" />
          </div>
        </div>

        {/* Mobile special categories grid */}
        <div className="grid grid-cols-2 mt-6 gap-x-2 gap-y-2 lg:hidden">
          {mobileSpecialCategories.map((category) => (
            <div
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
            </div>
          ))}
        </div>
      </div>

      {/* Main categories grid */}
      <div className="w-full flex flex-wrap justify-center gap-4 mt-8 ">
        {categories.map((category) => (
          <div
            key={category.id}
            className="flex flex-col items-center justify-center gap-2 border rounded-4xl cursor-pointer w-42 h-32"
          >
            {category.icon}
            <h2 className="font-['yekanbakh'] font-[600] text-md text-[#152F56] dark:text-white text-center">
              {category.name}
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Categories;
