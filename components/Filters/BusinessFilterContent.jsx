"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import SearchIcon from "@/assets/icons/search.svg";
import MultiRangeSlider from "@/components/ui/multirangeslider";
import { Switch } from "@/components/ui/switch";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import TreeCategory from "@/components/ui/TreeCategory";

const BusinessFilterContent = React.memo(
  ({
    categoryTree,
    selectedCategory,
    onCategorySelect,
    loadingCategories,
    priceRange,
    setPriceRange,
    priceRangeFromAPI,
    currenciesData,
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
  }) => {
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;
    const l = dic.public.register_ad.location_form;
    const d = dic.public.register_ad.trip;

    const handleInputChange = (type, value) => {
      const numValue = Number(value);
      if (!isNaN(numValue)) {
        // Ensure the value stays within the API range
        const minValue =
          type === "min"
            ? Math.max(priceRangeFromAPI.min, Math.min(numValue, priceRange[1]))
            : priceRange[0];

        const maxValue =
          type === "max"
            ? Math.min(priceRangeFromAPI.max, Math.max(numValue, priceRange[0]))
            : priceRange[1];

        setPriceRange([minValue, maxValue]);
      }
    };

    const handleSliderChange = (newRange) => {
      setPriceRange(newRange);
    };

    const formatPrice = (price) => {
      return new Intl.NumberFormat().format(price);
    };

    const findCategoryInTree = (categories, categoryId) => {
      for (const category of categories) {
        if (category.id == categoryId) return category;
        if (category.children) {
          const found = findCategoryInTree(category.children, categoryId);
          if (found) return found;
        }
      }
      return null;
    };

    const selectedCategoryData = selectedCategory
      ? findCategoryInTree(categoryTree, selectedCategory)
      : null;

    return (
      <div className="flex flex-col gap-4 p-6 lg:p-0">
        {/* Search Input */}
        <div className="w-full relative group focus-within:ring-0">
          <SearchIcon className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 fill-Gray-700" />
          <Input
            className="rtl:placeholder:text-right px-12 py-5 border-Gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 placeholder:text-Gray-500 rounded-xl"
            placeholder={s.search}
          />
        </div>

        {/* Categories Tree */}
        <div className="flex flex-col gap-3">
          <p className="rtl:text-right text-Gray-700 font-medium">
            {s.categories_of}
          </p>

          <div className="border border-gray-200 rounded-lg p-3 bg-gray-50/50 max-h-80 overflow-y-auto">
            {categoryTree.map((category) => (
              <TreeCategory
                key={category.id}
                category={category}
                selectedCategory={selectedCategory}
                onCategorySelect={onCategorySelect}
              />
            ))}
          </div>
        </div>

        {/* Location Filters */}
        <div className="flex flex-col gap-2">
          <p className="font-medium">{s.location}</p>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {selectedCountryId
                  ? countryOptions.find((c) => c.value === selectedCountryId)
                      ?.label
                  : l.location_country}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-90 p-0">
              <Command>
                <CommandInput
                  placeholder={l.search_country}
                  value={search}
                  onValueChange={setSearch}
                />
                <CommandList>
                  <CommandEmpty>{l.no_country_found}</CommandEmpty>
                  <CommandGroup>
                    {loadingCountries ? (
                      <CommandItem disabled>{l.loading}</CommandItem>
                    ) : (
                      filteredCountries.map((country) => (
                        <CommandItem
                          key={country.value}
                          value={country.label}
                          onSelect={() => {
                            setValue("country_id", country.value, {
                              shouldValidate: true,
                            });
                            setValue("city_id", "");
                            setOpen(false);
                            setSearch("");
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              selectedCountryId === country.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {country.label}
                        </CommandItem>
                      ))
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* City Filter */}
        <div className="flex flex-col gap-2 w-full">
          <Popover open={cityOpen} onOpenChange={setCityOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={cityOpen}
                className="w-full justify-between"
                disabled={!selectedCountryId || loadingCities}
              >
                {watch("city_id")
                  ? cityOptions.find((c) => c.value === watch("city_id"))?.label
                  : l.location_city}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-[400px] w-90 p-0">
              <Command>
                <CommandInput
                  placeholder={l.search_city}
                  value={citySearch}
                  onValueChange={setCitySearch}
                />
                <CommandList>
                  <CommandEmpty>{l.no_city_found}</CommandEmpty>
                  <CommandGroup>
                    {loadingCities ? (
                      <CommandItem disabled>{l.loading}</CommandItem>
                    ) : filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <CommandItem
                          key={city.value}
                          value={city.label}
                          onSelect={() => {
                            setValue("city_id", city.value, {
                              shouldValidate: true,
                            });
                            setCityOpen(false);
                            setCitySearch("");
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              watch("city_id") === city.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {city.label}
                        </CommandItem>
                      ))
                    ) : (
                      <CommandItem disabled>
                        {selectedCountryId
                          ? l.no_city_found
                          : l.select_country_first}
                      </CommandItem>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {/* Currency */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-medium">{d.currency || "ارز"}</label>
          <Select onValueChange={(value) => setValue("currency_id", value)}>
            <SelectTrigger className="w-full border border-default-divider rounded-lg">
              <SelectValue placeholder={d.select_currency || "انتخاب ارز"} />
            </SelectTrigger>
            <SelectContent>
              {currenciesData?.map((currency) => (
                <SelectItem key={currency.id} value={currency.id.toString()}>
                  {currency.title} ({currency.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Price Range */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium">
            {s.price_range || "Price Range"}
          </label>

          {/* Price Range Info */}
          <div className="text-xs text-gray-500 mb-2">
            Range: {formatPrice(priceRangeFromAPI.min)} -{" "}
            {formatPrice(priceRangeFromAPI.max)}
          </div>

          <MultiRangeSlider
            value={priceRange}
            onValueChange={handleSliderChange}
            min={priceRangeFromAPI.min}
            max={priceRangeFromAPI.max}
          />

          <div className="flex flex-row items-center gap-2 w-full">
            <div className="flex-1">
              <Label htmlFor="min-price" className="text-xs text-gray-500">
                Min
              </Label>
              <Input
                id="min-price"
                value={formatPrice(priceRange[0])}
                onChange={(e) =>
                  handleInputChange("min", e.target.value.replace(/,/g, ""))
                }
                type="text"
                placeholder="Min price"
              />
            </div>
            <div className="flex-1">
              <Label htmlFor="max-price" className="text-xs text-gray-500">
                Max
              </Label>
              <Input
                id="max-price"
                value={formatPrice(priceRange[1])}
                onChange={(e) =>
                  handleInputChange("max", e.target.value.replace(/,/g, ""))
                }
                type="text"
                placeholder="Max price"
              />
            </div>
          </div>

          {/* Current Selected Range */}
          <div className="text-center text-sm text-gray-600">
            Selected: {formatPrice(priceRange[0])} -{" "}
            {formatPrice(priceRange[1])}
          </div>
        </div>

        {/* Verified Ads */}
        <div className="flex flex-row items-center justify-between mt-2">
          <p className="text-lg font-[500] text-Gray-800">{s.verified_ads}</p>
          <Switch className="cursor-pointer" />
        </div>
      </div>
    );
  }
);

export default BusinessFilterContent;
