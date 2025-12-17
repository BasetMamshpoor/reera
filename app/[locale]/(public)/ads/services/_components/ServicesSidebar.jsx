"use client";
import React, {useMemo} from "react";
import CloseSquare from "@/assets/icons/add.svg";
import Filter from "@/assets/icons/filter.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import RecMobileFilter from "./RecMobileFilter";
import ServicesFilterContent from "@/components/Filters/ServicesFilterContent";
import Icon from "@/assets/icons/add.svg";
import {useCategoryFilters} from "@/hooks/useCategoryFilters";

const DigitalSidebar = () => {
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
        filtersData,
        activeFilters
    } = useCategoryFilters("service");

    const scrollRef = useSwipeScroll();

    const conditionLabels = {
        new: s.new,
        almost_new: s.almost_new,
        used: s.used || "کارکرده",
        needs_repair: s.needs_repair || "نیاز به تعمیر",
    };

    // const activeFilters = useMemo(() => {
    //     if (!filters || !filtersData) return [];
    //
    //     const list = [];
    //
    //     // Category
    //     if (filters.services_expertise_id) {
    //         const cat = filtersData.main_category?.find(
    //             (c) => c.id.toString() === filters.services_expertise_id.toString()
    //         );
    //         if (cat) list.push({key: "services_expertise_id", label: cat.category});
    //     }
    //
    //
    //     // Condition
    //     if (filters.condition) {
    //         list.push({
    //             key: "condition",
    //             label: conditionLabels[filters.condition] || filters.condition,
    //         });
    //     }
    //
    //     // Currency
    //     if (filters.currency_id) {
    //         const c = currencies.find(
    //             (cur) => cur.id.toString() === filters.currency_id.toString()
    //         );
    //         if (c) list.push({key: "currency_id", label: c.title});
    //     }
    //
    //     // Price
    //     if (
    //         Number(filters.min_price) !== priceRangeFromAPI.min ||
    //         Number(filters.max_price) !== priceRangeFromAPI.max
    //     ) {
    //         list.push({
    //             key: "price",
    //             label: `${Number(filters.min_price).toLocaleString()} - ${Number(filters.max_price).toLocaleString()}`,
    //         });
    //     }
    //
    //     // Verified
    //     if (filters.verified) {
    //         list.push({key: "verified", label: s.verified_ads});
    //     }
    //
    //     return list;
    // }, [filters, filtersData, modelsData, currencies, priceRangeFromAPI, s]);

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
            <div className="hidden lg:block border-2 rounded-xl p-6">
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

                <ServicesFilterContent {...sharedProps} />
            </div>

            <div ref={scrollRef} className="lg:hidden flex gap-4 overflow-x-auto scrollbar-hide px-4 pb-4">

            <RecMobileFilter clearAllFilters={clearAllFilters} {...sharedProps} />
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
                        <CloseSquare className="w-4 h-4 fill-error-main rotate-45 cursor-pointer" />
                    </button>
                ))}
            </div>
        </>
    );
};

export default DigitalSidebar;
