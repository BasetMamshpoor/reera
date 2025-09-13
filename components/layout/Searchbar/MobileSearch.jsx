"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import SearchIcon from "@/assets/icons/search.svg";
import { Input } from "../../ui/input";
import MobileSearchOverlay from "./MobileSearchOverlay";
import Location from "@/assets/icons/search/location.svg";
import MobileLocationOverlay from "./MobileLocationOverlay";

const MobileSearch = () => {
  const [mobileSearchFocus, setMobileSearchFocus] = useState(false);
  const [mobileLocation, setMobileLocation] = useState(false);
  return (
    <div className="flex flex-col font-['yekanbakh'] mt-6 items-center gap-4 md:hidden">
      <div className="w-full relative group focus-within:ring-0">
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 group-focus-within:opacity-0 dark:fill-white fill-gray-500" />
        <Input
          className="placeholder:text-right py-3 placeholder:font-['yekanbakh'] placeholder:font-[400] placeholder:pr-8 border-gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 dark:placeholder:text-white placeholder:text-gray-500"
          placeholder="جستجو"
          onFocus={() => setMobileSearchFocus(true)}
        />
      </div>
      {mobileSearchFocus && (
        <MobileSearchOverlay
          mobileSearchFocus={mobileSearchFocus}
          setMobileSearchFocus={setMobileSearchFocus}
        />
      )}

      <div className="relative flex flex-row w-full gap-4">
        <Select>
          <SelectTrigger className="w-1/2 rounded-lg  text-gray-400 border-gray-700 border-1 font-['yekanbakh'] font-[300] dark:bg-[#14181d]">
            <SelectValue className="text-right" placeholder="انتخاب ملیت" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">انتخاب ملیت</SelectItem>
          </SelectContent>
        </Select>
        <button
          onClick={() => setMobileLocation(true)}
          className="flex flex-row items-center border-1 border-gray-700 w-1/2 rounded-lg text-right justify-end cursor-pointer gap-6 px-6"
        >
          <span className="text-gray-400 text-sm ">انتخاب موقعیت</span>
          <Location />
        </button>
        {mobileLocation && (
          <MobileLocationOverlay
            mobileLocation={mobileLocation}
            setMobileLocation={setMobileLocation}
          />
        )}
      </div>
    </div>
  );
};

export default MobileSearch;
