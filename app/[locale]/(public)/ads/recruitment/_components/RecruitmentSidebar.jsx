"use client";
import React, {useMemo, useRef, useState} from "react";
import CloseSquare from "@/assets/icons/add.svg";
import Filter from "@/assets/icons/filter.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import RecMobileFilter from "./RecMobileFilter";
import RecruitmentFilterContent from "@/components/Filters/RecruitmentFilterContent";
import {useCategoryFilters} from "@/hooks/useCategoryFilters";

const RecruitmentSidebar = () => {
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;

    const {
        filters,
        handleChange,
        clearAllFilters,
        categoryTree,
        currencies,
        priceRangeFromAPI,
        languages,
        workType,
        degrees,
        activeFilters
    } = useCategoryFilters("recruitment");
    const scrollRef = useSwipeScroll();

    const sharedProps = {
        categoryTree,
        filters,
        handleChange,
        priceRangeFromAPI,
        languages,
        degrees,
        workType,
        allData: { currency: currencies},
    };

    return (
        <>
            <div className="hidden lg:block border-2 rounded-xl p-6 h-fit">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2 items-center">
                        <Filter/>
                        <span>{s.filter}</span>
                    </div>
                    <button
                        className="flex gap-2 items-center text-error-main cursor-pointer"
                        onClick={clearAllFilters}
                    >
                        <span className="font-[600]">{s.clear_all || "Clear All"}</span>
                        <CloseSquare className="fill-error-main rotate-45"/>
                    </button>
                </div>
                <RecruitmentFilterContent {...sharedProps} />
            </div>
            <div ref={scrollRef} className="lg:hidden flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4">
                <RecMobileFilter {...sharedProps} clearAllFilters={clearAllFilters}/>
                {activeFilters.map((f) => (
                    <button
                        key={f.key}
                        className="flex items-center gap-2 px-3 py-2 border rounded-2xl bg-Primary-50 text-Primary-500 whitespace-nowrap"
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
                        <span className="text-xs">{f.label}</span>
                        <CloseSquare className="w-4 h-4 fill-error-main rotate-45 cursor-pointer"/>
                    </button>
                ))}
            </div>
        </>
    );
};

export default RecruitmentSidebar;
