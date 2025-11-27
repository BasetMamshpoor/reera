"use client";
import React, { useRef, useState } from "react";
import CloseSquare from "@/assets/icons/closesquare.svg";
import Filter from "@/assets/icons/filter.svg";
import SearchIcon from "@/assets/icons/search.svg";
import Arrowdown from "@/assets/icons/arrow-down.svg";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import FilterIcon from "@/assets/icons/filter.svg";
import AdvCountries from "@/app/[locale]/(public)/countries/AdvCountries";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import useSwipeScroll from "@/hooks/useHorizontalScroll";

const AllAdsSidebar = () => {
  const [isCountrySelectOn, setIsCountrySelectOn] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dic = useTranslation();
  const scrollRef = useSwipeScroll();
  const s = dic.all_ads.sidebar;
  const categories = [
    s.real_estate,
    s.vehicles,
    s.digital_goods,
    s.home_kitchen,
    s.services,
    s.personal_items,
    s.tickets_tours,
    s.social,
    s.commerce,
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

  const filterButtons = [
    {
      id: "filter",
      label: "Filter",
      icon: <FilterIcon className="fill-Gray-900" />,
    },
  ];

  const handleFilterClick = () => {
    setIsDrawerOpen(true);
  };

  const handleApplyFilters = () => {
    setIsDrawerOpen(false);
    // Add your filter application logic here
  };

  return (
    <>
      {/* Desktop Sidebar (unchanged) */}
      <div className="border-2 border-default-divider hidden lg:block bg-transparent rounded-2xl w-full max-w-103">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-between gap-2 dark:text-white ">
              <FilterIcon className="dark:fill-white" />
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

      {/* Mobile Horizontal Scroll Section */}
      <div
        ref={scrollRef}
        className="px-4 overflow-x-auto flex items-center cursor-pointer lg:hidden pb-4 scrollbar-hide"
      >
        <div className="flex space-x-3 rtl:space-x-reverse min-w-max">
          {filterButtons.map((button) => (
            <Drawer
              key={button.id}
              open={isDrawerOpen}
              onOpenChange={setIsDrawerOpen}
            >
              <DrawerTrigger asChild>
                <button
                  onClick={handleFilterClick}
                  className={`flex bg-Primary-50 border text-Primary-500 border-Primary-500 items-center justify-center cursor-pointer px-2 min-w-20 gap-2 rounded-2xl p-3 transition-all ${
                    activeFilter === button.id
                      ? "bg-Primary-400 text-white shadow-md"
                      : "bg-Gray-100 text-Gray-700"
                  }`}
                >
                  <span>{button.icon}</span>
                  <span className="text-xs font-medium whitespace-nowrap">
                    {button.label}
                  </span>
                </button>
              </DrawerTrigger>

              <DrawerContent className="h-[100vh] ">
                <div className="mx-auto w-full  overflow-y-auto">
                  <DrawerHeader className="text-right">
                    <DrawerTitle className="flex justify-between items-center">
                      <span>{s.filter}</span>
                      <DrawerClose asChild>
                        <button className="text-error-main flex items-center gap-2">
                          <CloseSquare className="fill-error-main" />
                        </button>
                      </DrawerClose>
                    </DrawerTitle>
                    <DrawerDescription className="text-right">
                      فیلترهای خود را اعمال کنید
                    </DrawerDescription>
                  </DrawerHeader>

                  {/* Filter Content - Same as desktop sidebar but optimized for mobile */}
                  <div className="p-4 pb-0 space-y-6">
                    {/* Search */}
                    <div className="w-full relative group focus-within:ring-0">
                      <SearchIcon className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 fill-Gray-700" />
                      <Input
                        className="rtl:placeholder:text-right px-12 py-4 placeholder:font-[400] placeholder:pr-8 border-Gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 placeholder:text-Gray-500 rounded-2xl"
                        placeholder="جستجو"
                      />
                    </div>

                    {/* Categories */}
                    <div>
                      <h2 className="rtl:text-right text-Gray-700 mb-3">
                        {" "}
                        {s.categories_of}{" "}
                      </h2>
                      <div className="grid grid-cols-2 gap-y-3 gap-x-4 w-full text-Gray-800">
                        {[s.all, ...categories].map((label) => (
                          <div
                            key={label}
                            className="flex flex-row items-center gap-2"
                          >
                            <Checkbox
                              checked={selected[label]}
                              onCheckedChange={() => handleChange(label)}
                              className="cursor-pointer"
                            />
                            <Label className="text-Gray-800 text-sm">
                              {label}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Location */}
                    <div className="space-y-4">
                      <div className="relative">
                        <button
                          onClick={() => setIsCountrySelectOn((prev) => !prev)}
                          className="flex flex-row items-center justify-between border-2 border-Gray-200 py-2.5 px-4 rounded-2xl text-Gray-500 cursor-pointer w-full"
                        >
                          <span>{s.select_country_city}</span>
                          <Arrowdown className="fill-Gray-500" />
                        </button>
                        {isCountrySelectOn && (
                          <div className="mt-2 rounded-md w-full bg-white max-h-60 overflow-auto border">
                            <AdvCountries />
                          </div>
                        )}
                      </div>

                      <Input
                        className="py-4 rounded-xl border-2 border-text-field placeholder:text-right placeholder:text-Gray-500"
                        placeholder={s.enter_your_region}
                      />
                    </div>

                    {/* Currency and Price */}
                    <div className="space-y-4">
                      <h2 className="text-Gray-700 text-right text-lg font-[500]">
                        {s.location}:
                      </h2>
                      <Select>
                        <SelectTrigger className="w-full border-2 border-default-divider py-5 rounded-xl">
                          <SelectValue placeholder={s.currency_type} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem className="text-right" value="dollar">
                            Dollar
                          </SelectItem>
                          <SelectItem value="rial">Rial</SelectItem>
                          <SelectItem value="euro">Euro</SelectItem>
                        </SelectContent>
                      </Select>

                      <div className="flex flex-row items-center gap-2 w-full">
                        <Input
                          placeholder={s.from_price}
                          className="text-Gray-500 border-text-field border py-4"
                        />
                        <Input
                          placeholder={s.to_price}
                          className="text-Gray-500 border-text-field border py-4"
                        />
                      </div>
                    </div>

                    {/* Switches */}
                    <div className="space-y-4">
                      <div className="flex flex-row items-center justify-between">
                        <h2 className="text-lg font-[500] text-Gray-800">
                          {s.verified_ads}
                        </h2>
                        <Switch className="cursor-pointer" />
                      </div>
                      <div className="flex flex-row items-center justify-between">
                        <h2 className="text-lg font-[500] text-Gray-800">
                          {s.same_language_owner}
                        </h2>
                        <Switch className="cursor-pointer" />
                      </div>
                    </div>
                  </div>

                  <DrawerFooter className="pt-6">
                    <button
                      onClick={handleApplyFilters}
                      className="w-full py-3 bg-Primary-400 text-white font-semibold rounded-xl"
                    >
                      اعمال فیلترها
                    </button>
                    <DrawerClose asChild>
                      <button className="w-full py-3 border-2 border-Gray-300 text-Gray-700 font-semibold rounded-xl">
                        انصراف
                      </button>
                    </DrawerClose>
                  </DrawerFooter>
                </div>
              </DrawerContent>
            </Drawer>
          ))}
        </div>
      </div>
    </>
  );
};

export default AllAdsSidebar;
