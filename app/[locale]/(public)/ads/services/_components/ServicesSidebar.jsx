"use client";
import React from "react";
import CloseSquare from "@/assets/icons/add.svg";
import Filter from "@/assets/icons/filter.svg";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import RecMobileFilter from "./RecMobileFilter";
import ServicesFilterContent from "@/components/Filters/ServicesFilterContent";
import {useCategoryFilters} from "@/hooks/useCategoryFilters";

const DigitalSidebar = ({s}) => {

    const {
        filters,
        handleChange,
        clearAllFilters,
        categoryTree,
        modelsData,
        currencies,
        priceRangeFromAPI,
        activeFilters
    } = useCategoryFilters("service");

    const scrollRef = useSwipeScroll();

    const sharedProps = {
        categoryTree,
        filters,
        handleChange,
        priceRangeFromAPI,
        modelsData,
        allData: {currency: currencies},
    };

    return (
        <>
            <div className="hidden lg:block border-2 rounded-xl p-6 h-fit">
                <div className="flex justify-between items-center mb-4">
                    <div className="flex gap-2 items-center">
                        <Filter className="fill-Gray-950"/>
                        <span>{s.filter}</span>
                    </div>
                    <button
                        className="flex gap-2 items-center text-error-main cursor-pointer"
                        onClick={clearAllFilters}
                    >
                        <span className="font-[600]">{s.clear_all}</span>
                        <CloseSquare className="fill-error-main rotate-45"/>
                    </button>
                </div>

                <ServicesFilterContent s={s} {...sharedProps} />
            </div>

            <div ref={scrollRef} className="lg:hidden flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4">
                <RecMobileFilter s={s} clearAllFilters={clearAllFilters} {...sharedProps} />
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

export default DigitalSidebar;
