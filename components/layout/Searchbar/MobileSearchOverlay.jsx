"use client";

import React from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import {Input} from "../../ui/input";
import Close from "@/assets/icons/close.svg";
import SearchIcon from "@/assets/icons/search.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useGlobalSearch} from "@/hooks/useGlobalSearch";

const MobileSearchOverlay = ({mobileSearchFocus, setMobileSearchFocus}) => {
    const dic = useTranslation();
    const s = dic.navbar;
    const { search, setSearch } = useGlobalSearch();
    return (
        <Drawer open={mobileSearchFocus} onOpenChange={setMobileSearchFocus}>
            <DrawerContent className="bg-surface rounded-t-2xl h-[70vh]">
                <DrawerHeader className="border-b border-Gray-200 py-4">
                    <div className="flex items-center justify-between px-2">
                        {/* Search Input */}
                        <div className="relative w-full">
                            <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 fill-gray-500"/>
                            <Input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder={s.search}
                                className="w-full pl-12 pr-10 py-4 rounded-xl border border-gray-300 bg-surface focus:ring-0 rtl:placeholder:text-right"
                            />
                        </div>

                        {/* Close Button */}
                        <DrawerClose asChild>
                            <button
                                className="ml-3 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition">
                                <Close className="w-5 h-5 fill-gray-500 dark:fill-white"/>
                            </button>
                        </DrawerClose>
                    </div>
                </DrawerHeader>

                {/* Drawer Body */}
                <div className="px-4 py-3 overflow-y-auto">
                    <div className="flex justify-between items-center mb-4">
                        <p className="text-black dark:text-white">{s.your_recent_search}</p>
                        {/* Optionally add clear button */}
                    </div>

                    {/* Recent Tags */}
                    <div className="flex flex-wrap gap-3">
                        {["موبایل", "لپ‌تاپ", "هدفون"].map((item, i) => (
                            <button
                                key={i}
                                className="bg-[#EEF0F1] dark:bg-[#CDCFD4] dark:text-black px-3 py-1 rounded-md cursor-pointer"
                            >
                                {item}
                            </button>
                        ))}
                    </div>
                </div>

                <DrawerFooter className="pb-6"/>
            </DrawerContent>
        </Drawer>
    );
};

export default MobileSearchOverlay;
