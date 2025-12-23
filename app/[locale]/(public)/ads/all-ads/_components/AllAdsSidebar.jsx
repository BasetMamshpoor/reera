"use client";
import React from "react";
import CloseSquare from "@/assets/icons/closesquare.svg";
import Filter from "@/assets/icons/filter.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import RecMobileFilter from "./RecMobileFilter";
import AllAdsFilterContent from "@/components/Filters/AllAdsFilterContent";
import {useCategoryFilters} from "@/hooks/useCategoryFilters";
import Icon from "@/assets/icons/add.svg";

const AllAdsSidebar = () => {
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;

    const {
        filters,
        handleChange,
        clearAllFilters,
        categoryTree,
        modelsData,
        currencies,
        priceRangeFromAPI,
        activeFilters
    } = useCategoryFilters("all_ads");

    const scrollRef = useSwipeScroll();

    const sharedProps = {
        categoryTree,
        filters,
        handleChange,
        priceRangeFromAPI,
        modelsData,
        allData: {currency: currencies },
    };

    return (
        <>
            <div
                className="hidden lg:block border-2 border-default-divider rounded-xl bg-transparent w-full max-w-92 h-fit">
                <div className="flex flex-col gap-4 p-6">
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
                    <AllAdsFilterContent {...sharedProps} />
                </div>
            </div>

            <div
                ref={scrollRef}
                className="lg:hidden flex items-center gap-4 overflow-x-auto px-4 pb-4 scrollbar-hide cursor-pointer"
            >
                <RecMobileFilter {...sharedProps} />
                <div className="flex items-center gap-4">
                    {activeFilters.map((f) => (
                        <button
                            key={f.key}
                            className="flex bg-Primary-50 border text-Primary-500 border-Primary-500 items-center justify-center px-2 py-2 min-w-20 gap-2 rounded-2xl"
                            onClick={() => {
                                if (f.key === "price") {
                                    handleChange("min_price", priceRangeFromAPI.min);
                                    handleChange("max_price", priceRangeFromAPI.max);
                                } else if (f.key === "verified") {
                                    handleChange("verified", false);
                                } else {
                                    handleChange(f.key, "");
                                }
                            }}
                        >
                            <span className="text-xs font-medium whitespace-nowrap">
                              {f.label}
                            </span>
                            <Icon className="rotate-45 fill-error-main cursor-pointer" />
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AllAdsSidebar;
