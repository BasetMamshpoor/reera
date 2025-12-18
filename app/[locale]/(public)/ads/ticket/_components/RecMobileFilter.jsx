import React, {useState} from "react";
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
import CloseSquare from "@/assets/icons/closesquare.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import FilterContent from "@/components/Filters/KitchenFilterContent";
import Filter from "@/assets/icons/filter.svg";
import TicketsFilterContent from "@/components/Filters/TicketsFilterContent";

const RecMobileFilter = ({
                             allData,
                             filters,
                             handleChange,
                             priceRangeFromAPI,
                             clearAllFilters,
                             categoryTree
                         }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;

    return (
        <div className="flex space-x-3 rtl:space-x-reverse min-w-max">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                    <button
                        className="flex bg-Primary-50 border text-Primary-500 border-Primary-500 items-center justify-center cursor-pointer px-2 min-w-20 gap-2 rounded-2xl py-2 transition-all">
                        <FilterIcon className="fill-Primary-500"/>
                        <span className="text-xs font-medium whitespace-nowrap">{s.filter}</span>
                    </button>
                </DrawerTrigger>

                <DrawerContent className="h-[100vh]">
                    <DrawerHeader className="flex p-4">
                        <DrawerTitle>{s.filter}</DrawerTitle>
                        <div className="flex justify-between items-center">
                            <div className="flex gap-2 items-center">
                                <Filter className="dark:fill-Gray-50"/>
                                <span>{s.filter}</span>
                            </div>
                            <button
                                className="flex gap-2 items-center text-error-main cursor-pointer"
                                onClick={clearAllFilters}
                            >
                                <span className="font-[600]">{s.clear_all || "Clear All"}</span>
                                <CloseSquare className="fill-error-main"/>
                            </button>
                        </div>
                    </DrawerHeader>
                    <div className="overflow-y-auto flex-1 p-4">
                        <TicketsFilterContent
                            categoryTree={categoryTree}
                            allData={allData}
                            filters={filters}
                            handleChange={handleChange}
                            priceRangeFromAPI={priceRangeFromAPI}
                        />
                    </div>

                    <DrawerFooter className="p-4 grid grid-cols-2 gap-4">
                        <button
                            className="w-full py-3 bg-Primary-400 text-Gray-50 font-semibold rounded-xl cursor-pointer"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            اعمال فیلترها
                        </button>
                        <DrawerClose asChild>
                            <button
                                className="w-full py-3 border-2 border-Gray-300 text-Gray-700 font-semibold rounded-xl cursor-pointer">
                                انصراف
                            </button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default RecMobileFilter;
