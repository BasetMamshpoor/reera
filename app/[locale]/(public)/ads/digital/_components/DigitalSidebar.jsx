"use client";
import React, { useMemo, useState, useEffect } from "react";
import CloseSquare from "@/assets/icons/closesquare.svg";
import Filter from "@/assets/icons/filter.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import RecMobileFilter from "./RecMobileFilter";
import DigitalFilterContent from "@/components/Filters/DigitalFilterContent";

const DigitalSidebar = () => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
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
  const currentMinPrice = searchParams.get("min_price");
  const currentMaxPrice = searchParams.get("max_price");
  const currentCountryId = searchParams.get("country_id");
  const currentCityId = searchParams.get("city_id");
  const currentCurrencyId = searchParams.get("currency_id");
  const currentLocale = "fa";

  // Initialize price range from URL or API defaults
  const [priceRange, setPriceRange] = useState([0, 100000]);

  // Update URL with new parameters
  const updateURL = (updates) => {
    const params = new URLSearchParams(searchParams.toString());

    // Apply updates
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "" || value === undefined) {
        params.delete(key);
      } else {
        params.set(key, value.toString());
      }
    });

    // Reset page when filters change
    params.delete("page");

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Handle country selection
  const handleCountrySelect = (countryId) => {
    setValue("country_id", countryId, { shouldValidate: true });
    setValue("city_id", ""); // Clear city when country changes

    updateURL({
      country_id: countryId,
      city_id: null, // Remove city from URL when country changes
    });

    setOpen(false);
    setSearch("");
  };

  // Handle city selection
  const handleCitySelect = (cityId) => {
    setValue("city_id", cityId, { shouldValidate: true });

    updateURL({
      city_id: cityId,
    });

    setCityOpen(false);
    setCitySearch("");
  };

  // Handle currency selection
  const handleCurrencySelect = (currencyId) => {
    setValue("currency_id", currencyId);

    updateURL({
      currency_id: currencyId,
    });
  };

  // Handle price range change
  const handlePriceRangeChange = (newRange) => {
    setPriceRange(newRange);
    updateURL({
      min_price: newRange[0],
      max_price: newRange[1],
    });
  };

  // Handle price input change
  const handlePriceInputChange = (type, value) => {
    const numericValue = value.replace(/[^\d]/g, "");

    if (numericValue === "") {
      const newMin = type === "min" ? priceRangeFromAPI.min : priceRange[0];
      const newMax = type === "max" ? priceRangeFromAPI.max : priceRange[1];
      const newRange =
        type === "min" ? [newMin, priceRange[1]] : [priceRange[0], newMax];

      setPriceRange(newRange);
      updateURL({
        min_price: newRange[0],
        max_price: newRange[1],
      });
      return;
    }

    const numValue = Number(numericValue);

    if (!isNaN(numValue)) {
      let newRange;
      if (type === "min") {
        const newMin = Math.max(
          priceRangeFromAPI.min,
          Math.min(numValue, priceRange[1], priceRangeFromAPI.max)
        );
        newRange = [newMin, priceRange[1]];
      } else {
        const newMax = Math.min(
          priceRangeFromAPI.max,
          Math.max(numValue, priceRange[0], priceRangeFromAPI.min)
        );
        newRange = [priceRange[0], newMax];
      }

      setPriceRange(newRange);
      updateURL({
        min_price: newRange[0],
        max_price: newRange[1],
      });
    }
  };

  // Handle category selection
  const handleCategorySelect = (categoryId) => {
    const newSelectedCategory =
      selectedCategory === categoryId ? null : categoryId;
    setSelectedCategory(newSelectedCategory);

    updateURL({
      category_id: newSelectedCategory,
    });
  };

  // Fetch main categories and price range
  const { data: mainFiltersData, isLoading: loadingMainFilters } = useQuery({
    queryKey: ["digital-main-filters"],
    queryFn: async () => {
      const res = await request({
        url: "/ads/digital/get_filters",
        method: "get",
      });
      return res?.data;
    },
    onSuccess: (data) => {
      // Initialize price range with URL values or API data
      const minPrice = currentMinPrice
        ? parseInt(currentMinPrice)
        : parseInt(data?.min_price) || 0;
      const maxPrice = currentMaxPrice
        ? parseInt(currentMaxPrice)
        : parseInt(data?.max_price) || 100000;

      setPriceRange([minPrice, maxPrice]);
    },
  });

  // Fetch subcategories when a category is selected
  const { data: subcategoriesData, isLoading: loadingSubcategories } = useQuery(
    {
      queryKey: ["digital-subcategories", selectedCategory],
      queryFn: async () => {
        if (!selectedCategory) return {};

        const res = await request({
          url: "/ads/digital/get_filters",
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
      label: currentLocale === "en" ? category.title_en : category.category,
      children:
        selectedCategory === category.id
          ? subcategoriesData?.map((sub) => ({
              id: sub.id,
              label: sub.category,
              children: [],
            })) || []
          : [],
    }));

    return mainCategories;
  }, [mainFiltersData, subcategoriesData, currentLocale, selectedCategory]);

  // Get price range from API data
  const priceRangeFromAPI = useMemo(() => {
    if (!mainFiltersData) return { min: 0, max: 100000 };

    return {
      min: parseInt(mainFiltersData.min_price) || 0,
      max: parseInt(mainFiltersData.max_price) || 100000,
    };
  }, [mainFiltersData]);

  // Initialize selected category from URL on mount
  useEffect(() => {
    if (currentCategoryId) {
      setSelectedCategory(currentCategoryId);
    }
  }, [currentCategoryId]);

  // Initialize form values from URL on mount
  useEffect(() => {
    if (currentCountryId) {
      setValue("country_id", currentCountryId);
    }
    if (currentCityId) {
      setValue("city_id", currentCityId);
    }
    if (currentCurrencyId) {
      setValue("currency_id", currentCurrencyId);
    }
  }, [currentCountryId, currentCityId, currentCurrencyId, setValue]);

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
    setPriceRange: handlePriceRangeChange,
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
    selectedCountryId: watch("country_id"),
    cityOpen,
    setCityOpen,
    citySearch,
    setCitySearch,
    cityOptions,
    filteredCities,
    loadingCities,
    watch,
    setValue,
    onPriceInputChange: handlePriceInputChange,
    // Add new handlers
    onCountrySelect: handleCountrySelect,
    onCitySelect: handleCitySelect,
    onCurrencySelect: handleCurrencySelect,
  };

  // Clear all filters function
  const clearAllFilters = () => {
    setSelectedCategory(null);
    setValue("country_id", "");
    setValue("city_id", "");
    setValue("currency_id", "");

    // Reset price range to API defaults
    const defaultRange = [priceRangeFromAPI.min, priceRangeFromAPI.max];
    setPriceRange(defaultRange);

    // Clear all URL parameters
    router.push(`?min_price=${defaultRange[0]}&max_price=${defaultRange[1]}`, {
      scroll: false,
    });
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
              onClick={clearAllFilters}
            >
              <span className="font-[600]">{s.clear_all || "Clear All"}</span>
              <CloseSquare className="fill-error-main" />
            </button>
          </div>
          <DigitalFilterContent {...sharedProps} />
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

export default DigitalSidebar;
