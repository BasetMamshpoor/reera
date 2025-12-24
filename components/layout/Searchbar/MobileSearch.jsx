"use client";
import React, {useState} from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import SearchIcon from "@/assets/icons/search.svg";
import {Input} from "../../ui/input";
import MobileSearchOverlay from "./MobileSearchOverlay";
import Location from "@/assets/icons/search/location.svg";
import MobileLocationOverlay from "./MobileLocationOverlay";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import MobileLocationDrawer from "@/components/layout/Searchbar/MobileLocationDrawer";
import { useGlobalSearch } from "@/hooks/useGlobalSearch";

const MobileSearch = () => {
    const [mobileSearchFocus, setMobileSearchFocus] = useState(false);
    const [mobileLocation, setMobileLocation] = useState(false);
    const dic = useTranslation();
    const s = dic.navbar;
    const { search } = useGlobalSearch();

    return (
        <div className="flex flex-col mt-6 items-center gap-4 md:hidden">
            <button
                onClick={() => setMobileSearchFocus(true)}
                className="w-full relative py-5 border border-default-divider bg-surface rounded-lg"
            >
                <SearchIcon
                    className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 group-focus-within:opacity-0 fill-Gray-500"/>
                {/* <Input
          className="rtl:placeholder:text-right py-5 border border-default-divider bg-surface focus:placeholder-transparent focus:outline-none focus:ring-0 rounded-xl placeholder:text-Gray-500 px-12"
          placeholder={s.search}
        /> */}
                <span className="absolute ltr:left-10 top-1/2 -translate-y-1/2 text-Gray-500">
                   {search || s.search}
                </span>
            </button>
            {mobileSearchFocus && (
                <MobileSearchOverlay
                    mobileSearchFocus={mobileSearchFocus}
                    setMobileSearchFocus={setMobileSearchFocus}
                />
            )}

            <div className="relative flex flex-row w-full gap-4">
                <button
                    onClick={() => setMobileLocation(true)}
                    className="flex flex-row items-center justify-center  w-full rounded-lg py-2 text-center  cursor-pointer gap-4  border border-Gray-700 "
                >
          <span className="text-Gray-700 text-sm whitespace-nowrap">
            {s.select_location}
          </span>
                </button>
                {mobileLocation && (
                    <MobileLocationDrawer
                        mobileLocation={mobileLocation}
                        setMobileLocation={setMobileLocation}
                    />
                )}
            </div>
        </div>
    );
};

export default MobileSearch;
