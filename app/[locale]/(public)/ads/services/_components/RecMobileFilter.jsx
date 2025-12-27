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
import ServicesFilterContent from "@/components/Filters/ServicesFilterContent";

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
        <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
            <DrawerTrigger asChild>
                <button
                    className="flex items-center justify-center gap-2 px-2 min-w-20 py-2 cursor-pointer rounded-2xl border border-Primary-500 bg-Primary-50 text-Primary-500 whitespace-nowrap">
                    <FilterIcon className="fill-Primary-500"/>
                    <span className="text-xs font-medium">{s.filter}</span>
                </button>
            </DrawerTrigger>

            <DrawerContent className="h-[95vh] ">
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
                    <ServicesFilterContent
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
    );
};

export default RecMobileFilter;
