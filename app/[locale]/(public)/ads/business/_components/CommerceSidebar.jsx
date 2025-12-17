"use client";
import React, {useMemo, useState, useEffect} from "react";
import CloseSquare from "@/assets/icons/closesquare.svg";
import Filter from "@/assets/icons/filter.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {useForm} from "react-hook-form";
import {useParams, useRouter, useSearchParams} from "next/navigation";
import RecMobileFilter from "./RecMobileFilter";
import DigitalFilterContent from "@/components/Filters/DigitalFilterContent";
import BusinessFilterContent from "@/components/Filters/BusinessFilterContent";
import Icon from "@/assets/icons/add.svg";
import {useCategoryFilters} from "@/hooks/useCategoryFilters";

const CommerceSidebar = () => {
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;

    const {
        filters,
        handleChange,
        clearAllFilters,
        categoryTree,
        brands,
        modelsData,
        currencies,
        priceRangeFromAPI,
        filtersData,
        activeFilters
    } = useCategoryFilters("business");

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
    //     if (filters.category_id) {
    //         const cat = filtersData.main_category?.find(
    //             (c) => c.id.toString() === filters.category_id.toString()
    //         );
    //         if (cat) list.push({ key: "category_id", label: cat.category });
    //     }
    //
    //     // Brand
    //     if (filters.brand_id) {
    //         const brand = brands.find(
    //             (b) => b.id.toString() === filters.brand_id.toString()
    //         );
    //         if (brand) list.push({ key: "brand_id", label: brand.name });
    //     }
    //
    //     // Model
    //     if (filters.model_id) {
    //         const model = modelsData.find(
    //             (m) => m.id.toString() === filters.model_id.toString()
    //         );
    //         if (model) list.push({ key: "model_id", label: model.name });
    //     }
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
    //         if (c) list.push({ key: "currency_id", label: c.title });
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
    //         list.push({ key: "verified", label: s.verified_ads });
    //     }
    //
    //     return list;
    // }, [filters, filtersData, brands, modelsData, currencies, priceRangeFromAPI, s]);

    const sharedProps = {
        categoryTree,
        filters,
        handleChange,
        priceRangeFromAPI,
        modelsData,
        allData: { brands, currency: currencies },
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
                            className="flex gap-2 items-center text-error-main"
                            onClick={clearAllFilters}
                        >
                            <span className="font-[600]">{s.clear_all || "Clear All"}</span>
                            <CloseSquare className="fill-error-main"/>
                        </button>
                    </div>
                    <BusinessFilterContent {...sharedProps} />
                </div>
            </div>

            <div
                ref={scrollRef}
                className="px-4 overflow-x-auto flex items-center gap-4 cursor-pointer lg:hidden pb-4 scrollbar-hide"
            >
                <RecMobileFilter clearAllFilters={clearAllFilters} {...sharedProps} />
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

export default CommerceSidebar;
