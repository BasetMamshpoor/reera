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

const RecMobileFilter = (props) => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;

    const handleApplyFilters = () => {
        setIsDrawerOpen(false);
    };

    return (
        <div className="flex space-x-3 rtl:space-x-reverse min-w-max">
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                    <button
                        className="flex bg-Primary-50 border text-Primary-500 border-Primary-500 items-center justify-center cursor-pointer px-2 min-w-20 gap-2 rounded-2xl p-3 transition-all">
                        <FilterIcon className="fill-Gray-900"/>
                        <span className="text-xs font-medium whitespace-nowrap">
                          Filter
                        </span>
                    </button>
                </DrawerTrigger>

                <DrawerContent className="h-[100vh]">
                    <div className="mx-auto w-full overflow-y-auto">
                        <DrawerHeader className="text-right">
                            <DrawerTitle className="flex justify-between items-center">
                                <span>{s.filter}</span>
                                <DrawerClose asChild>
                                    <button className="text-error-main flex items-center gap-2">
                                        <CloseSquare className="fill-error-main"/>
                                    </button>
                                </DrawerClose>
                            </DrawerTitle>
                            <DrawerDescription className="text-right">
                                فیلترهای خود را اعمال کنید
                            </DrawerDescription>
                        </DrawerHeader>

                        <FilterContent {...props} />

                        <DrawerFooter className="pt-6">
                            <button
                                onClick={handleApplyFilters}
                                className="w-full py-3 bg-Primary-400 text-white font-semibold rounded-xl"
                            >
                                اعمال فیلترها
                            </button>
                            <DrawerClose asChild>
                                <button
                                    className="w-full py-3 border-2 border-Gray-300 text-Gray-700 font-semibold rounded-xl">
                                    انصراف
                                </button>
                            </DrawerClose>
                        </DrawerFooter>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default RecMobileFilter;
