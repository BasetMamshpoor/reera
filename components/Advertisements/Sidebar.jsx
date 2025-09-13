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
import { useTranslation } from "@/app/[locale]/TranslationContext";

const Sidebar = () => {
  const [isCountrySelectOn, setIsCountrySelectOn] = useState(false);
  const dic = useTranslation();
  const s = dic.all_ads.sidebar;
  const categories = [
    s.real_estate,
    s.vehicles,
    s.digital_goods,
    s.home_kitchen,
    s.services,
    s.personal_items,
    s.entertainment_leisure,
    s.social,
    s.industrial_equipment,
    s.job_recruitment,
  ];
  const [selected, setSelected] = useState(() => {
    const initial = { همه: false };
    categories.forEach((cat) => (initial[cat] = false));
    return initial;
  });

  const handleChange = (label) => {
    if (label === s.all.toLowerCase()) {
      setSelected({
        همه: true,
        ...Object.fromEntries(categories.map((cat) => [cat, false])),
      });
    } else {
      setSelected((prev) => ({
        ...prev,
        همه: false,
        [label]: !prev[label],
      }));
    }
  };

  return (
    <>
      <div className="border-2 border-default-divider bg-transparent rounded-2xl w-120 h-230">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-between gap-2 dark:text-white ">
              <Filter className="dark:fill-white" />
              <span>{s.filter}</span>
            </div>
            <div className="flex flex-row items-center gap-2 cursor-pointer">
              <button className="flex flex-row items-center gap-2 text-error-main cursor-pointer">
                <span className="font-[600]"> {s.categories_of}</span>
                <CloseSquare className="fill-error-main" />
              </button>
            </div>
          </div>
          <div className="w-full relative group focus-within:ring-0">
            <SearchIcon className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 fill-Gray-700" />
            <Input
              className="rtl:placeholder:text-right px-12  py-5 placeholder:font-[400] placeholder:pr-8 border-Gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 placeholder:text-Gray-500 rounded-2xl"
              placeholder="جستجو"
            />
          </div>
          <h2 className="rtl:text-right text-Gray-700"> {s.categories_of} </h2>
          <div className="grid grid-cols-2 gap-y-4 self-end gap-4 w-full text-Gray-800">
            {[s.all, ...categories].map((label) => (
              <div key={label} className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={selected[label]}
                  onCheckedChange={() => handleChange(label)}
                  className={`cursor-pointer`}
                />
                <Label className={`text-Gray-800`}>{label}</Label>
              </div>
            ))}
          </div>
          <div className="relative w-full transition-all duration-300 ease-in-out">
            <button
              onClick={() => setIsCountrySelectOn((prev) => !prev)}
              className="flex flex-row items-center justify-between border-2 border-Gray-200 py-2.5 px-4 rounded-2xl text-Gray-500 cursor-pointer w-full"
            >
              <span>{s.select_country_city}</span>
              <Arrowdown className="fill-Gray-500" />
            </button>
            {isCountrySelectOn && (
              <>
                <div className="absolute top-12 rounded-md w-full bg-white h-80 scroll-hidden z-[1]">
                  <AdvCountries />
                </div>
              </>
            )}
          </div>
          <Input
            className="py-5 rounded-xl border-2 border-text-field placeholder:text-right placeholder:text-Gray-500"
            placeholder={s.enter_your_region}
          />

          <h2 className="text-Gray-700 text-right text-lg font-[500]">
            {s.location}:
          </h2>
          <Select>
            <SelectTrigger className="w-full border-2 border-default-divider py-6 rounded-xl [&_[data-slot=chev-down]]:fill-Gray-500">
              <SelectValue placeholder={s.currency_type} />
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
              placeholder={s.from_price}
              className={`text-Gray-500 border-text-field border`}
            />
            <Input
              placeholder={s.to_price}
              className={`text-Gray-500 border-text-field border`}
            />
          </div>
          <div className="flex felx-row items-center justify-between mt-6">
            <h2 className="text-lg font-[500] text-Gray-800">
              {s.verified_ads}
            </h2>
            <Switch className={`cursor-pointer`} />
          </div>
          <div className="flex felx-row items-center justify-between">
            <h2 className="text-lg font-[500] text-Gray-800">
              {s.same_language_owner}
            </h2>
            <Switch className={`cursor-pointer`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
