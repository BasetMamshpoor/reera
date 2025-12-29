import React, {useState} from "react";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import CloseSquare from "@/assets/icons/closesquare.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import Filter from "@/assets/icons/filter.svg";
import BusinessFilterContent from "@/components/Filters/BusinessFilterContent";

const RecMobileFilter = ({
                             allData,
                             filters,
                             handleChange,
                             priceRangeFromAPI,
                             modelsData,
                             clearAllFilters,
                             categoryTree,
                             s
                         }) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

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

                <DrawerContent className="h-[85vh]">
                    <DrawerHeader className="flex p-4">
                        <DrawerTitle>{s.filter}</DrawerTitle>
                        <DrawerClose asChild>
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <Filter className="fill-Gray-950"/>
                                    <span>{s.filter}</span>
                                </div>
                                <button
                                    className="flex gap-2 cursor-pointer items-center text-error-main"
                                    onClick={clearAllFilters}
                                >
                                    <span className="font-[600]">{s.clear_all || "Clear All"}</span>
                                    <CloseSquare className="fill-error-main"/>
                                </button>
                            </div>
                        </DrawerClose>
                    </DrawerHeader>

                    <div className="overflow-y-auto flex-1 p-4">
                        <BusinessFilterContent
                            s={s}
                            categoryTree={categoryTree}
                            allData={allData}
                            filters={filters}
                            handleChange={handleChange}
                            priceRangeFromAPI={priceRangeFromAPI}
                            modelsData={modelsData}
                        />
                    </div>

                    <DrawerFooter className="p-4 grid grid-cols-2 gap-4">
                        <button
                            className="w-full py-3 bg-Primary-400 text-Gray-50 font-semibold rounded-xl cursor-pointer"
                            onClick={() => setIsDrawerOpen(false)}
                        >
                            {s.apply_filters}
                        </button>
                        <DrawerClose asChild>
                            <button
                                className="w-full py-3 border-2 border-Gray-300 text-Gray-700 font-semibold rounded-xl cursor-pointer">
                                {s.cancel}
                            </button>
                        </DrawerClose>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default RecMobileFilter;
