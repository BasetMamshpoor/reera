"use client";
import React from "react";
import CloseSquare from "@/assets/icons/add.svg";
import Filter from "@/assets/icons/filter.svg";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import RecMobileFilter from "./RecMobileFilter";
import HousingFilterContent from "@/components/Filters/HousingFilterContent";
import {useCategoryFilters} from "@/hooks/useCategoryFilters";
import {Skeleton} from "@/components/ui/skeleton";

const HousingSidebar = ({s}) => {

    const {
        filters,
        handleChange,
        clearAllFilters,
        categoryTree,
        currencies,
        priceRangeFromAPI,
        activeFilters,
        languages,
        workType,
        degree,
        yearRangeFromAPI,
        areaRangeFromAPI,
        bedroomsOptions,
        bathroomsOptions,
        filtersLoading
    } = useCategoryFilters("housing");
    const scrollRef = useSwipeScroll();


    const sharedProps = {
        categoryTree,
        filters,
        handleChange,
        priceRangeFromAPI,
        languages,
        degree,
        workType,
        yearRangeFromAPI,
        areaRangeFromAPI,
        allData: {currency: currencies},
        bedroomsOptions,
        bathroomsOptions,
        filtersLoading,
    };

    return (
        <>
            <div className=" hidden lg:block max-w-[360px] w-full">
                {filtersLoading || !filters ?
                    <div className="flex flex-col gap-4 p-4 border-2 border-default-divider rounded-xl">
                        <div className="flex flex-col items-center gap-5 p-4">
                            <Skeleton className="h-20 w-full"/>
                            {Array.from({length: 6}).map((_, index) =>
                                <Skeleton key={index} className="h-4 w-full"/>)}
                        </div>
                    </div> :
                    <div className=" border-2 rounded-xl p-6 w-full h-fit">
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
                        <HousingFilterContent s={s} {...sharedProps} clearAllFilters={clearAllFilters}/>
                    </div>}
            </div>

            <div ref={scrollRef} className="lg:hidden flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4 h-fit">
                <RecMobileFilter s={s} {...sharedProps} />
                {activeFilters.map((f) => (
                    <button
                        key={f.key}
                        className="flex items-center gap-2 px-3 py-2 border rounded-2xl bg-Primary-50 text-Primary-500 whitespace-nowrap"
                        onClick={() => {
                            if (f.key === "price") {
                                handleChange("min_price", priceRangeFromAPI.min);
                                handleChange("max_price", priceRangeFromAPI.max);
                            } else if (f.key === "area") {
                                handleChange("min_area", areaRangeFromAPI.min);
                                handleChange("max_area", areaRangeFromAPI.max);
                            } else if (f.key === "year_range") {
                                handleChange("min_year", yearRangeFromAPI.min);
                                handleChange("max_year", yearRangeFromAPI.max);
                            } else if (f.key === "verified") {
                                handleChange("verified", false);
                            } else if (f.key === "currency_id") {
                                handleChange("currency_id", "");
                                handleChange("min_price", priceRangeFromAPI.min);
                                handleChange("max_price", priceRangeFromAPI.max);
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

export default HousingSidebar;
