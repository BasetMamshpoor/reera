"use client";
import React, {useState} from "react";
import {
    Drawer,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
    DrawerFooter,
    DrawerClose,
} from "@/components/ui/drawer";
import FilterIcon from "@/assets/icons/filter.svg";
import CloseSquare from "@/assets/icons/closesquare.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import DigitalFilterContent from "@/components/Filters/DigitalFilterContent";

const RecMobileFilter = ({
                             allData,
                             filters,
                             handleChange,
                             priceRangeFromAPI,
                             modelsData,
                             clearAllFilters,
                             categoryTree,
                         }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;

    return (
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
                <button
                    className="flex items-center justify-center gap-2 px-2 min-w-20 py-2 cursor-pointer rounded-2xl border border-Primary-500 bg-Primary-50 text-Primary-500 whitespace-nowrap">
                    <FilterIcon className="fill-Primary-500"/>
                    <span className="text-xs font-medium">{s.filter}</span>
                </button>
            </DrawerTrigger>

            <DrawerContent className="h-[95vh]">
                <DrawerHeader>
                    <DrawerTitle className="text-center text-lg font-bold">{s.filter}</DrawerTitle>
                    <div className="flex justify-end mt-2">
                        <button
                            className="flex gap-2 items-center text-error-main cursor-pointer"
                            onClick={clearAllFilters}
                        >
                            <span className="font-[600]">{s.clear_all || "Clear All"}</span>
                            <CloseSquare className="fill-error-main"/>
                        </button>
                    </div>
                </DrawerHeader>

                <div className="overflow-y-auto flex-1 px-4 scrollbar-hide">
                    <DigitalFilterContent
                        categoryTree={categoryTree}
                        allData={allData}
                        filters={filters}
                        handleChange={handleChange}
                        priceRangeFromAPI={priceRangeFromAPI}
                        modelsData={modelsData}
                    />
                </div>

                <DrawerFooter className="grid grid-cols-2 gap-4">
                    <button
                        onClick={() => setIsDrawerOpen(false)}
                        className="py-3 bg-Primary-500 text-white font-semibold rounded-xl cursor-pointer"
                    >
                        اعمال فیلترها
                    </button>
                    <DrawerClose asChild>
                        <button className="py-3 border-2 border-Gray-300 text-Gray-700 font-semibold rounded-xl cursor-pointer">
                            انصراف
                        </button>
                    </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    );
};

export default RecMobileFilter;