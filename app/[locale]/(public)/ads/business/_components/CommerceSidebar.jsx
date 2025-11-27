"use client";
import React, { useMemo, useState, useEffect } from "react";
import CloseSquare from "@/assets/icons/closesquare.svg";
import Filter from "@/assets/icons/filter.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useForm } from "react-hook-form";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import RecMobileFilter from "./RecMobileFilter";
import DigitalFilterContent from "@/components/Filters/DigitalFilterContent";
import BusinessFilterContent from "@/components/Filters/BusinessFilterContent";

const CommerceSidebar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [brandOpen, setBrandOpen] = useState(false);
  const [typeOpen, setTypeOpen] = useState(false);
  const [brandSearch, setBrandSearch] = useState("");
  const [typeSearch, setTypeSearch] = useState("");
  const [isProduct_status, setIsProduct_status] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const { watch, setValue } = useForm();
  const dic = useTranslation();
  const router = useRouter();
  const searchParams = useSearchParams();
  const scrollRef = useSwipeScroll();
  const s = dic.all_ads.sidebar;

  // Get current parameters from URL
  const currentCategoryId = searchParams.get("category_id");
  const { locale } = useParams();

  // Fetch main categories and price range
  const { data: mainFiltersData, isLoading: loadingMainFilters } = useQuery({
    queryKey: ["business-main-filters"],
    queryFn: async () => {
      const res = await request({
        url: "/ads/business/get_filters",
        method: "get",
      });
      return res?.data;
    },
    onSuccess: (data) => {
      // Initialize price range with API data when it loads
      if (data?.min_price && data?.max_price) {
        const minPrice = parseInt(data.min_price) || 0;
        const maxPrice = parseInt(data.max_price) || 100000;
        setPriceRange([minPrice, maxPrice]);
      }
    },
  });

  // Fetch subcategories when a category is selected
  const { data: subcategoriesData, isLoading: loadingSubcategories } = useQuery(
    {
      queryKey: ["business-subcategories", selectedCategory],
      queryFn: async () => {
        if (!selectedCategory) return {};

        const res = await request({
          url: "/ads/business/get_filters",
          method: "get",
          query: { category_id: selectedCategory },
        });

        return res?.data?.selected_category || [];
      },
      enabled: !!selectedCategory,
    }
  );

  // Build category tree structure
  const categoryTree = useMemo(() => {
    if (!mainFiltersData?.main_category) return [];

    const mainCategories = mainFiltersData.main_category.map((category) => ({
      id: category.id,
      label: locale === "en" ? category.title_en : category.category,
      children:
        selectedCategory === category.id
          ? subcategoriesData?.map((sub) => ({
              id: sub.id,
              label: sub.category,
              children: [], // You can extend this for deeper levels if needed
            })) || []
          : [],
    }));

    return mainCategories;
  }, [mainFiltersData, subcategoriesData, locale, selectedCategory]);

  // Get price range from API data
  const priceRangeFromAPI = useMemo(() => {
    if (!mainFiltersData) return { min: 0, max: 100000 };

    return {
      min: parseInt(mainFiltersData.min_price) || 0,
      max: parseInt(mainFiltersData.max_price) || 100000,
    };
  }, [mainFiltersData]);

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    // If clicking the same category, deselect it
    const newSelectedCategory =
      selectedCategory === categoryId ? null : categoryId;

    setSelectedCategory(newSelectedCategory);

    // Update URL
    const params = new URLSearchParams(searchParams.toString());

    if (newSelectedCategory) {
      params.set("category_id", newSelectedCategory);
    } else {
      params.delete("category_id");
    }

    // Reset page when category changes
    params.delete("page");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Initialize selected category from URL on mount
  useEffect(() => {
    if (currentCategoryId) {
      setSelectedCategory(currentCategoryId);
    }
  }, []);

  // Update price range when API data changes
  useEffect(() => {
    if (priceRangeFromAPI.min !== 0 || priceRangeFromAPI.max !== 100000) {
      setPriceRange([priceRangeFromAPI.min, priceRangeFromAPI.max]);
    }
  }, [priceRangeFromAPI]);

  // Fetch countries data
  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => request({ method: "GET", url: `/getCountries` }),
  });

  // Fetch currencies data
  const { data: currenciesData } = useQuery({
    queryKey: ["currencies-data"],
    queryFn: async () => {
      const res = await request({ url: "/currency" });
      return res?.data || [];
    },
  });

  const selectedCountryId = watch("country_id");

  // Fetch cities data based on selected country
  const { data: citiesData, isLoading: loadingCities } = useQuery({
    queryKey: ["cities", selectedCountryId],
    queryFn: async () => {
      if (!selectedCountryId) return { data: { cities: [] } };
      return request({
        method: "GET",
        url: `/getCountries`,
        query: { country: selectedCountryId },
      });
    },
    enabled: !!selectedCountryId,
  });

  // Country options
  const countryOptions = useMemo(
    () =>
      countriesData?.data?.countries?.map((c) => ({
        value: c.id.toString(),
        label: c.name,
      })) || [],
    [countriesData]
  );

  // Filtered countries based on search
  const filteredCountries = useMemo(
    () =>
      countryOptions.filter((country) =>
        country.label.toLowerCase().includes(search.toLowerCase())
      ),
    [search, countryOptions]
  );

  // City options
  const cityOptions = useMemo(
    () =>
      citiesData?.data?.city?.map((city) => ({
        value: city.id.toString(),
        label: city.name,
      })) || [],
    [citiesData]
  );

  // Filtered cities based on search
  const filteredCities = useMemo(
    () =>
      cityOptions.filter((city) =>
        city.label.toLowerCase().includes(citySearch.toLowerCase())
      ),
    [citySearch, cityOptions]
  );

  // Product status options
  const product_status = [s.new, s.almost_new, s.second_hand];

  const sharedProps = {
    categoryTree,
    selectedCategory,
    onCategorySelect: handleCategorySelect,
    loadingCategories: loadingMainFilters || loadingSubcategories,
    priceRange,
    setPriceRange,
    priceRangeFromAPI,
    product_status,
    isProduct_status,
    currenciesData,
    setIsProduct_status,
    brandOpen,
    setBrandOpen,
    brandSearch,
    setBrandSearch,
    selectedBrand: watch("brand"),
    typeOpen,
    setTypeOpen,
    typeSearch,
    setTypeSearch,
    selectedType: watch("product_type"),
    open,
    setOpen,
    search,
    setSearch,
    countryOptions,
    filteredCountries,
    loadingCountries,
    selectedCountryId,
    cityOpen,
    setCityOpen,
    citySearch,
    setCitySearch,
    cityOptions,
    filteredCities,
    loadingCities,
    watch,
    setValue,
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="border-2 h-fit border-default-divider hidden lg:block bg-transparent rounded-xl w-full max-w-92">
        <div className="flex flex-col gap-4 p-6">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-between gap-2 dark:text-white">
              <Filter className="dark:fill-white" />
              <span>{s.filter}</span>
            </div>
            <button
              className="flex flex-row items-center gap-2 text-error-main cursor-pointer"
              onClick={() => {
                // Clear all filters
                setSelectedCategory(null);
                setValue("country_id", "");
                setValue("city_id", "");
                setValue("currency_id", "");
                // Reset price range to API defaults
                setPriceRange([priceRangeFromAPI.min, priceRangeFromAPI.max]);
                router.push("?", { scroll: false });
              }}
            >
              <span className="font-[600]">{s.clear_all || "Clear All"}</span>
              <CloseSquare className="fill-error-main" />
            </button>
          </div>
          <BusinessFilterContent {...sharedProps} />
        </div>
      </div>

      {/* Mobile Filter */}
      <div
        ref={scrollRef}
        className="px-4 overflow-x-auto flex items-center cursor-pointer lg:hidden pb-4 scrollbar-hide"
      >
        <RecMobileFilter {...sharedProps} />
      </div>
    </>
  );
};

export default CommerceSidebar;
