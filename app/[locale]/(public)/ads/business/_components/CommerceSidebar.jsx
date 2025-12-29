"use client";
import React from "react";
import CloseSquare from "@/assets/icons/closesquare.svg";
import Filter from "@/assets/icons/filter.svg";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import RecMobileFilter from "./RecMobileFilter";
import BusinessFilterContent from "@/components/Filters/BusinessFilterContent";
import Icon from "@/assets/icons/add.svg";
import {useCategoryFilters} from "@/hooks/useCategoryFilters";
import {Skeleton} from "@/components/ui/skeleton";

const CommerceSidebar = ({s}) => {
    const {
        filters,
        handleChange,
        clearAllFilters,
        categoryTree,
        brands,
        modelsData,
        currencies,
        priceRangeFromAPI,
        activeFilters,
        filtersLoading
    } = useCategoryFilters("business");

    const scrollRef = useSwipeScroll();

    const sharedProps = {
        categoryTree,
        filters,
        handleChange,
        priceRangeFromAPI,
        modelsData,
        filtersLoading,
        allData: {brands, currency: currencies},
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
                    <div
                        className="border-2 border-default-divider rounded-xl bg-transparent w-full max-w-92 h-fit">
                        <div className="flex flex-col gap-4 p-6">
                            <div className="flex justify-between items-center">
                                <div className="flex gap-2 items-center">
                                    <Filter className="fill-Gray-950"/>
                                    <span>{s.filter}</span>
                                </div>
                                <button
                                    className="cursor-pointer flex gap-2 items-center text-error-main"
                                    onClick={clearAllFilters}
                                >
                                    <span className="font-semibold">{s.clear_all}</span>
                                    <CloseSquare className="fill-error-main"/>
                                </button>
                            </div>
                            <BusinessFilterContent s={s} {...sharedProps} />
                        </div>
                    </div>}
            </div>

            <div
                ref={scrollRef}
                className="px-4 overflow-x-auto flex items-center gap-4 cursor-pointer lg:hidden pb-4 scrollbar-hide"
            >
                <RecMobileFilter s={s} clearAllFilters={clearAllFilters} {...sharedProps} />
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
                                } else if (f.key === "currency_id") {
                                    handleChange("currency_id", "");
                                    handleChange("min_price", priceRangeFromAPI.min);
                                    handleChange("max_price", priceRangeFromAPI.max);
                                } else {
                                    handleChange(f.key, "");
                                }
                            }}
                        >
                            <span className="text-xs font-medium whitespace-nowrap">
                              {f.label}
                            </span>
                            <Icon className="rotate-45 fill-error-main cursor-pointer"/>
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default CommerceSidebar;
