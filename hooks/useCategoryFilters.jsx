"use client";

import {useEffect, useMemo, useRef, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {useTranslation} from "@/app/[locale]/TranslationContext";

export const CATEGORY_FILTER_KEYS = {
    housing: ["currency_id","city_id", "verified", "bedrooms", "bathroom", "min_area", "max_area", "min_price", "max_price", "min_year", "max_year", "category_id"],
    digital: ["currency_id","city_id", "verified", "category_id", "condition", "min_price", "max_price", "brand_id", "model_id"],
    vehicle: ["currency_id","city_id", "verified", "category_id", "min_year", "max_year", "min_function", "max_function", "min_price", "max_price", "brand_id", "model_id"],
    visa: ["currency_id","city_id", "verified", "type_id", "max_price", "min_price"],
    ticket: ["currency_id","city_id", "verified", "ticket_type_id", "max_price", "min_price"],
    service: ["currency_id","city_id", "verified", "services_expertise_id", "max_price", "min_price"],
    recruitment: ["currency_id","city_id", "verified", "recruitment_categories_id", "cooperation", "max_price", "min_price", "languages_id", "degree"],
    personal: ["currency_id","city_id", "verified", "personal_ads_type_id", "condition", "max_price", "min_price", "gender"],
    kitchen: ["currency_id","city_id", "verified", "category_id", "condition", "min_price", "max_price", "brand_id", "model_id"],
    business: ["currency_id","city_id", "verified", "category_id", "condition", "min_price", "max_price"],
    all_ads: ["currency_id","city_id", "verified", "category_id", "max_price", "min_price"],
};

export const useCategoryFilters = (categorySlug) => {
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;

    const router = useRouter();
    const searchParams = useSearchParams();
    const prevCategoryRef = useRef(categorySlug);
    const [brandQuery, setBrandQuery] = useState();
    const allowedKeys = CATEGORY_FILTER_KEYS[categorySlug] || [];
    // ================= API Queries =================
    const {data: currencyRes} = useQuery({
        queryKey: ["currency"],
        queryFn: () => request({url: "/currency", method: "get"}),
    });
    const currencies = currencyRes?.data || [];

    const {data: filtersRes, isLoading: filtersLoading} = useQuery({
        queryKey: ["category-filters", categorySlug, brandQuery],
        queryFn: () => request({
            url: `/ads/${categorySlug}/get_filters`,
            method: "get",
            query: {brand: brandQuery}
        }),
        enabled: !!categorySlug,
    });

    const filtersData = filtersRes?.data || {};
    const brands = filtersData.brands || [];
    const modelsData = filtersData.models || [];
    const mainCategories = filtersData.main_category || [];

    // ================= Ranges =================
    const priceRangeFromAPI = useMemo(() => ({
        min: filtersData?.min_price != null ? Number(filtersData.min_price) : 0,
        max: filtersData?.max_price != null ? Number(filtersData.max_price) : 100000000,
    }), [filtersData]);

    const yearRangeFromAPI = useMemo(() => ({
        min: filtersData?.min_year != null ? Number(filtersData.min_year) : 1300,
        max: filtersData?.max_year != null ? Number(filtersData.max_year) : 2025,
    }), [filtersData]);

    const areaRangeFromAPI = useMemo(() => ({
        min: filtersData?.min_area != null ? Number(filtersData.min_area) : 0,
        max: filtersData?.max_area != null ? Number(filtersData.max_area) : 1000,
    }), [filtersData]);

    const functionRangeFromAPI = useMemo(() => ({
        min: filtersData?.minFunction != null ? Number(filtersData.minFunction) : 0,
        max: filtersData?.maxFunction != null ? Number(filtersData.maxFunction) : 1000000,
    }), [filtersData]);

    // ================= Default Filters =================
    const defaultFilters = useMemo(() => ({
        category_id: "",
        brand_id: "",
        model_id: "",
        condition: "",
        currency_id: "",
        language_id: "",
        cooperation: "",
        degree: "",
        bathroom: "",
        bedrooms: "",
        verified: false,
        min_price: priceRangeFromAPI.min,
        max_price: priceRangeFromAPI.max,
        min_year: yearRangeFromAPI.min,
        max_year: yearRangeFromAPI.max,
        min_area: areaRangeFromAPI.min,
        max_area: areaRangeFromAPI.max,
        min_function: functionRangeFromAPI.min,
        max_function: functionRangeFromAPI.max,
    }), [priceRangeFromAPI, yearRangeFromAPI, areaRangeFromAPI, functionRangeFromAPI]);

    // ================= State =================
    const [filters, setFilters] = useState(null);
    const [hydrated, setHydrated] = useState(false);

    // ================= Hydrate Filters =================
    useEffect(() => {
        if (filtersLoading || filters) return;
        setFilters(defaultFilters);
    }, [filtersLoading, defaultFilters, filters]);

    useEffect(() => {
        if (!filters) return;
        setBrandQuery(filters.brand_id || null);
    }, [filters?.brand_id]);

    useEffect(() => {
        if (prevCategoryRef.current !== categorySlug) {
            prevCategoryRef.current = categorySlug;
            setFilters(defaultFilters);
            setHydrated(false);
            router.replace("?", {scroll: false});
        }
    }, [categorySlug, defaultFilters, router]);

    useEffect(() => {
        if (hydrated || !categorySlug || !filters) return;

        const nextFilters = {...defaultFilters};
        searchParams.forEach((value, key) => {
            if (!allowedKeys.includes(key)) return;
            if (value === "true") nextFilters[key] = true;
            else if (value === "false") nextFilters[key] = false;
            else if (!isNaN(value)) nextFilters[key] = Number(value);
            else nextFilters[key] = value;
        });
        setFilters(nextFilters);
        setHydrated(true);
    }, [hydrated, categorySlug, searchParams, allowedKeys, defaultFilters, filters]);

    const isDefaultValue = (key, value) => {
        if (!(key in defaultFilters)) return false;
        return String(value) === String(defaultFilters[key]);
    };

    useEffect(() => {
        if (!hydrated || !filters) return;

        const params = new URLSearchParams();
        Object.entries(filters).forEach(([key, value]) => {
            if (!allowedKeys.includes(key)) return;
            if (value === "" || value === false || value === null) return;
            if (isDefaultValue(key, value)) return;
            params.set(key, String(value));
        });

        const newQuery = params.toString();
        const currentQuery = searchParams.toString();

        if (newQuery !== currentQuery) {
            router.replace(`?${newQuery}`, {scroll: false});
        }
    }, [filters, hydrated, allowedKeys, router, searchParams, defaultFilters]);

    const handleChange = (key, value) => {
        if (!allowedKeys.includes(key)) return;
        setFilters(prev => ({
            ...prev,
            [key]: value,
            ...(key === "brand_id" ? {model_id: ""} : {}),
        }));
    };

    const clearAllFilters = () => {
        if (defaultFilters) setFilters(defaultFilters);
        router.replace("?", {scroll: false});
    };

    const categoryTree = useMemo(() => mainCategories.map(cat => ({
        id: cat.id,
        label: cat.category,
        children: String(filters?.category_id) === String(cat.id)
            ? filtersData.selected_category || []
            : [],
    })), [mainCategories, filters?.category_id, filtersData]);

    const workType = [
        {id: "full_time", title: s.full_time},
        {id: "part_time", title: s.part_time},
        {id: "remote", title: s.remote},
    ];

    const degrees = [
        {id: "diploma", label: s.high_school},
        {id: "associate", label: s.associate_degree},
        {id: "bachelor", label: s.bachelor_degree},
        {id: "master", label: s.master_degree},
        {id: "phd", label: s.phd_degree},
    ];

    const bedroomsOptions = [
        {id: "1", label: s.bedroom_1 || "rgr"},
        {id: "2", label: s.bedroom_2 || "rgr"},
        {id: "3", label: s.bedroom_3 || "rgr"},
        {id: "4", label: s.bedroom_4 || "rgr"},
        {id: "5_plus", label: s.plus_bedroom},
    ];

    const bathroomsOptions = [
        {id: "1", label: s.bathroom_1},
        {id: "2", label: s.bathroom_2},
        {id: "3", label: s.bathroom_3},
        {id: "4", label: s.bathroom_4},
        {id: "5_plus", label: s.plus_bathroom},
    ];

    const languages = useMemo(() => {
        if (!filtersData.language || !Array.isArray(filtersData.language)) return [];
        return filtersData.language.map(lang => ({id: lang.id, title: lang.title}));
    }, [filtersData]);

    // ================= Active Filters =================
    const activeFilters = useMemo(() => {
        if (!filters || !filtersData) return [];
        const list = [];

        // Categories
        if (filters.category_id) {
            const cat = mainCategories.find(c => String(c.id) === String(filters.category_id));
            if (cat) list.push({key: "category_id", label: cat.category || cat.name || cat.title});
        }
        if (filters.services_expertise_id) {
            const cat = mainCategories.find(c => String(c.id) === String(filters.services_expertise_id));
            if (cat) list.push({key: "services_expertise_id", label: cat.category || cat.name || cat.title});
        }

        if (filters.ticket_type_id) {
            const cat = mainCategories.find(c => String(c.id) === String(filters.ticket_type_id));
            if (cat) list.push({key: "ticket_type_id", label: cat.category || cat.name || cat.title});
        }

        if (filters.type_id) {
            const cat = mainCategories.find(c => String(c.id) === String(filters.type_id));
            if (cat) list.push({key: "type_id", label: cat.category || cat.name || cat.title});
        }

        // Other filters
        if (filters.brand_id) {
            const brand = brands.find(b => String(b.id) === String(filters.brand_id));
            if (brand) list.push({key: "brand_id", label: brand.name});
        }

        if (filters.model_id) {
            const model = modelsData.find(m => String(m.id) === String(filters.model_id));
            if (model) list.push({key: "model_id", label: model.name});
        }

        if (filters.condition) {
            const conditionLabels = {new: s.new, almost_new: s.almost_new, used: s.used, needs_repair: s.needs_repair};
            list.push({key: "condition", label: conditionLabels[filters.condition] || filters.condition});
        }

        if (Number(filters.min_price) !== priceRangeFromAPI.min || Number(filters.max_price) !== priceRangeFromAPI.max) {
            const minLabel = Number(filters.min_price).toLocaleString("fa-IR");
            const maxLabel = Number(filters.max_price).toLocaleString("fa-IR");
            list.push({key: "price", label: `${minLabel} - ${maxLabel}`});
        }

        if (Number(filters.min_year) !== yearRangeFromAPI.min || Number(filters.max_year) !== yearRangeFromAPI.max) {
            list.push({key: "year_range", label: `${filters.min_year} - ${filters.max_year}`});
        }

        if (Number(filters.min_area) !== areaRangeFromAPI.min || Number(filters.max_area) !== areaRangeFromAPI.max) {
            const minLabel = Number(filters.min_area).toLocaleString("fa-IR");
            const maxLabel = Number(filters.max_area).toLocaleString("fa-IR");
            list.push({key: "area", label: <> {minLabel} - {maxLabel} {s.meter} </>});
        }

        if (Number(filters.min_function) !== functionRangeFromAPI.min || Number(filters.max_function) !== functionRangeFromAPI.max) {
            const minLabel = Number(filters.min_function).toLocaleString("fa-IR");
            const maxLabel = Number(filters.max_function).toLocaleString("fa-IR");
            list.push({key: "function_range", label: <> {minLabel} - {maxLabel} {s.km} </>});
        }

        if (filters.verified) list.push({key: "verified", label: s.verified_ads});

        if (filters.languages_id) {
            const lang = languages.find(l => String(l.id) === String(filters.languages_id));
            if (lang) list.push({key: "languages_id", label: lang.title});
        }

        if (filters.cooperation) {
            const coop = workType.find(w => w.id === filters.cooperation);
            if (coop) list.push({key: "cooperation", label: coop.title});
        }

        if (filters.degree) {
            const deg = degrees.find(d => d.id === filters.degree);
            if (deg) list.push({key: "degree", label: deg.label});
        }

        if (filters.currency_id) {
            const currency = currencies.find(c => String(c.id) === String(filters.currency_id));
            if (currency) list.push({key: "currency_id", label: `${currency.title} (${currency.code})`});
        }

        if (filters.bedrooms) {
            const bedroom = bedroomsOptions.find(b => String(b.id) === String(filters.bedrooms));
            if (bedroom) list.push({key: "bedrooms", label: bedroom.label});
        }

        if (filters.bathroom) {
            const bathroomItem = bathroomsOptions.find(b => String(b.id) === String(filters.bathroom));
            if (bathroomItem) list.push({key: "bathroom", label: bathroomItem.label});
        }

        return list;
    }, [
        filters,
        filtersData,
        mainCategories,
        brands,
        modelsData,
        currencies,
        priceRangeFromAPI,
        yearRangeFromAPI,
        areaRangeFromAPI,
        functionRangeFromAPI,
        languages,
        workType,
        degrees,
        bedroomsOptions,
        bathroomsOptions,
        s
    ]);

    return {
        filters,
        handleChange,
        clearAllFilters,
        categoryTree,
        brands,
        modelsData,
        currencies,
        priceRangeFromAPI,
        yearRangeFromAPI,
        areaRangeFromAPI,
        functionRangeFromAPI,
        filtersData,
        filtersLoading,
        languages,
        activeFilters,
        workType,
        degrees,
        bedroomsOptions,
        bathroomsOptions,
    };
};
