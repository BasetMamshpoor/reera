"use client";
import React from "react";
import CloseSquare from "@/assets/icons/closesquare.svg";
import Filter from "@/assets/icons/filter.svg";
import SearchIcon from "@/assets/icons/search.svg";
import Arrowdown from "@/assets/icons/arrow-down.svg";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AdvCountries from "@/app/[locale]/countries/AdvCountries";
const categories = [
  "املاک",
  "وسایل نقلیه",
  "کالای دیجیتال",
  "خانه و آشپزخانه",
  "خدمات",
  "وسایل شخصی",
  "سرگرمی و فراغت",
  "اجتماعی",
  "تجهیزات صنعتی",
  "کاریابی و استخدام",
];
const Sidebar = () => {
  const [isCountrySelectOn, setIsCountrySelectOn] = useState(false);
  const [selected, setSelected] = useState(() => {
    const initial = { همه: false };
    categories.forEach((cat) => (initial[cat] = false));
    return initial;
  });

  const handleChange = (label) => {
    if (label === "همه") {
      // When "همه" is checked, uncheck all others
      setSelected({
        همه: true,
        ...Object.fromEntries(categories.map((cat) => [cat, false])),
      });
    } else {
      // When any category is toggled, uncheck "همه"
      setSelected((prev) => ({
        ...prev,
        همه: false,
        [label]: !prev[label],
      }));
    }
  };

  return (
    <>
      <div className="border-2 border-[#D1D5DB] bg-transparent rounded-2xl w-120 h-230">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <button className="flex flex-row items-center gap-2 text-red-500">
                <span className="font-[600]">حذف فیلتر</span>
                <CloseSquare className="fill-red-500 dark:fill-[#EF4444]" />
              </button>
            </div>
            <div className="flex flex-row items-center justify-between gap-2 dark:text-white">
              <span>فیلتر</span>
              <Filter className="dark:fill-white" />
            </div>
          </div>
          <div className="w-full relative group focus-within:ring-0">
            <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 group-focus-within:opacity-0 dark:fill-white fill-gray-500" />
            <Input
              className="placeholder:text-right py-5 placeholder:font-['yekanbakh'] placeholder:font-[400] placeholder:pr-8 border-gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 dark:placeholder:text-white placeholder:text-gray-500 rounded-2xl"
              placeholder="جستجو"
            />
          </div>
          <h2 className="text-right">دسته بندی ها</h2>
          <div className="grid grid-cols-2 gap-y-4 self-end gap-4 w-full text-gray-800">
            {["همه", ...categories].map((label) => (
              <div key={label} className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={selected[label]}
                  onCheckedChange={() => handleChange(label)}
                />
                <Label className={`dark:text-white`}>{label}</Label>
              </div>
            ))}
          </div>
          <div className="relative w-full transition-all duration-300 ease-in-out">
            <button
              onClick={() => setIsCountrySelectOn((prev) => !prev)}
              className="flex flex-row items-center justify-between border-2 border-gray-200 py-2.5 px-4 rounded-2xl text-gray-500 cursor-pointer w-full"
            >
              <span>انتخاب شهر و کشور</span>
              <Arrowdown className="fill-gray-500 dark:fill-white" />
            </button>
            {isCountrySelectOn && (
              <>
                <div className="absolute top-12 rounded-md w-full bg-[#fff] h-80 scroll-hidden z-[1]">
                  <AdvCountries />
                </div>
              </>
            )}
          </div>
          <Input
            className="py-6 rounded-lg placeholder:text-right"
            placeholder="منطقه خود را وارد کنید"
          />

          <h2 className="text-gray-500 text-right text-lg font-[500]">
            :موقعیت
          </h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="نوع ارز" />
            </SelectTrigger>
            <SelectContent className={`flex items-end`}>
              <SelectItem className={`text-right`} value="light">
                dollar
              </SelectItem>
              <SelectItem value="dark">Rial</SelectItem>
              <SelectItem value="system">euro</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex flex-row items-center gap-2 w-full">
            {" "}
            <Input
              placeholder="تا قیمت"
              className={`placeholder:text-gray-500`}
            />
            <Input
              placeholder="از قیمت"
              className={`placeholder:text-gray-500`}
            />
          </div>
          <div className="flex felx-row items-center justify-between mt-6">
            <Switch />
            <h2 className="text-lg font-[500]">آگهی‌های تاییدشده</h2>
          </div>
          <div className="flex felx-row items-center justify-between">
            <Switch />
            <h2 className="text-lg font-[500]">هم‌زبان بودن مالک</h2>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
