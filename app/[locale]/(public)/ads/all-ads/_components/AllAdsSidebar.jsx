"use client";
import React, { useMemo, useRef, useState } from "react";
import CloseSquare from "@/assets/icons/closesquare.svg";
import Filter from "@/assets/icons/filter.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import useSwipeScroll from "@/hooks/useHorizontalScroll";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useForm } from "react-hook-form";
import RecMobileFilter from "./RecMobileFilter";
import AllAdsFilterContent from "@/components/Filters/AllAdsFilterContent";

const AllAdsSidebar = () => {
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
  const { watch, setValue } = useForm();
  const dic = useTranslation();
  const scrollRef = useSwipeScroll();
  const s = dic.all_ads.sidebar;
  const l = dic.public.register_ad.location_form;
  const k = dic.register_ad;
  const d = dic.categories;

  const categories = [
    d.matrimony,
    d.travel_guide,
    d.legal_services,
    d.services,
    d.digital_goods,
    d.vehicles,
    d.real_estate,
    d.job_recruitment,
    d.commerce,
    d.roommate,
    d.tickets_tours,
    d.personal_items,
    d.transportation,
    d.visa,
  ];
  const product_status = [s.new, s.almost_new, s.second_hand];

  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => request({ method: "GET", url: `/getCountries` }),
  });

  const selectedCountryId = watch("country_id");
  const selectedBrand = watch("brand");
  const selectedType = watch("product_type");

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

  const countryOptions = useMemo(
    () =>
      countriesData?.data?.countries?.map((c) => ({
        value: c.id.toString(),
        label: c.name,
      })) || [],
    [countriesData]
  );
  const filteredCountries = useMemo(
    () =>
      countryOptions.filter((country) =>
        country.label.toLowerCase().includes(search.toLowerCase())
      ),
    [search, countryOptions]
  );

  const cityOptions = useMemo(
    () =>
      citiesData?.data?.city?.map((city) => ({
        value: city.id.toString(),
        label: city.name,
      })) || [],
    [citiesData]
  );
  const filteredCities = useMemo(
    () =>
      cityOptions.filter((city) =>
        city.label.toLowerCase().includes(citySearch.toLowerCase())
      ),
    [citySearch, cityOptions]
  );

  const sharedProps = {
    categories,
    product_status,
    isProduct_status,
    setIsProduct_status,
    brandOpen,
    setBrandOpen,
    brandSearch,
    setBrandSearch,
    selectedBrand,
    typeOpen,
    setTypeOpen,
    typeSearch,
    setTypeSearch,
    selectedType,
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
    priceRange,
    setPriceRange,
    watch,
    setValue,
  };

  return (
    <>
      <div className="border-2 h-fit border-default-divider hidden lg:block bg-transparent rounded-xl w-full max-w-92">
        <div className="flex flex-col gap-4 p-4">
          <div className="flex flex-row items-center justify-between">
            <div className="flex flex-row items-center justify-between gap-2 dark:text-white">
              <Filter className="dark:fill-white" />
              <span>{s.filter}</span>
            </div>
            <button className="flex flex-row items-center gap-2 text-error-main cursor-pointer">
              <span className="font-[600]">{s.categories_of}</span>
              <CloseSquare className="fill-error-main" />
            </button>
          </div>
          <AllAdsFilterContent {...sharedProps} />
        </div>
      </div>

      <div
        ref={scrollRef}
        className="px-4 overflow-x-auto flex items-center cursor-pointer lg:hidden pb-4 scrollbar-hide"
      >
        <RecMobileFilter {...sharedProps} />
      </div>
    </>
  );
};

export default AllAdsSidebar;
