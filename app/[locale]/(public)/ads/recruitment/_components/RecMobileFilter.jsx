import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import FilterIcon from "@/assets/icons/filter.svg";
import CloseSquare from "@/assets/icons/closesquare.svg";
import SearchIcon from "@/assets/icons/search.svg";
import Arrowdown from "@/assets/icons/arrow-down.svg";
import { Input } from "@/components/ui/input";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
const RecMobileFilter = ({
  countriesData,
  loadingCountries,
  citiesData,
  loadingCities,
  countryOptions,
  selectedCountryId,
  filteredCountries,
  cityOptions,
  filteredCities,
  open,
  setOpen,
  search,
  setSearch,
  cityOpen,
  setCityOpen,
  citySearch,
  setCitySearch,
}) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const dic = useTranslation();
  const s = dic.all_ads.sidebar;
  const categories = [
    s.administration_management,
    s.janitorial_cleaning,
    s.architecture_civil_engineering,
    s.shop_restaurant_services,
    s.computer_it,
    s.financial_accounting_legal,
    s.marketing_sales,
    s.industrial_technical_engineering,
    s.educational,
    s.medical_beauty_health,
    s.art_media,
  ];
  const l = dic.public.register_ad.location_form;
  const { watch, setValue } = useForm({});
  const handleFilterClick = () => {
    setIsDrawerOpen(true);
  };

  const handleApplyFilters = () => {
    setIsDrawerOpen(false);
  };
  return (
    <div className="flex space-x-3 rtl:space-x-reverse min-w-max">
      <Drawer
        // key={button.id}
        open={isDrawerOpen}
        onOpenChange={setIsDrawerOpen}
      >
        <DrawerTrigger asChild>
          <button
            onClick={handleFilterClick}
            className={`flex bg-Primary-50 border text-Primary-500 border-Primary-500 items-center justify-center cursor-pointer px-2 min-w-20 gap-2 rounded-2xl p-3 transition-all ${
              activeFilter === "filter"
                ? "bg-Primary-400 text-white shadow-md"
                : "bg-Gray-100 text-Gray-700"
            }`}
          >
            <span>
              <FilterIcon className="fill-Gray-900" />
            </span>
            <span className="text-xs font-medium whitespace-nowrap">
              {/* {button.label} */}Filter
            </span>
          </button>
        </DrawerTrigger>

        <DrawerContent className="h-[100vh] ">
          <div className="mx-auto w-full overflow-y-auto">
            <DrawerHeader className="text-right">
              <DrawerTitle className="flex justify-between items-center">
                <span>{s.filter}</span>
                <DrawerClose asChild>
                  <button className="text-error-main flex items-center gap-2">
                    <CloseSquare className="fill-error-main" />
                  </button>
                </DrawerClose>
              </DrawerTitle>
              <DrawerDescription className="text-right">
                فیلترهای خود را اعمال کنید
              </DrawerDescription>
            </DrawerHeader>

            {/* Filter Content - Same as desktop sidebar but optimized for mobile */}
            <div className="p-4 pb-0 space-y-6">
              {/* Search */}
              <div className="w-full relative group focus-within:ring-0">
                <SearchIcon className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 fill-Gray-700" />
                <Input
                  className="rtl:placeholder:text-right px-12 py-5  border-Gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 placeholder:text-Gray-500 rounded-xl"
                  placeholder="جستجو"
                />
              </div>

              {/* Categories */}
              <div>
                <p className="rtl:text-right text-Gray-700 mb-3">
                  {" "}
                  {s.categories_of}{" "}
                </p>
                <div className="grid grid-cols-1 gap-y-3 gap-x-4 w-full text-Gray-800">
                  {[...categories].map((label) => (
                    <div
                      key={label}
                      className="flex flex-row items-center gap-2"
                    >
                      <Checkbox
                        // checked={selected[label]}
                        // onCheckedChange={() => handleChange(label)}
                        className="cursor-pointer"
                      />
                      <Label className="text-Gray-800 text-sm">{label}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* search */}
              <div className="flex flex-col gap-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between"
                    >
                      {selectedCountryId
                        ? countryOptions.find(
                            (c) => c.value === selectedCountryId
                          )?.label
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
              <div className="flex flex-col gap-2 w-full">
                <Popover open={cityOpen} onOpenChange={setCityOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={cityOpen}
                      className="w-full justify-between "
                      disabled={!selectedCountryId || loadingCities}
                    >
                      {watch("city_id")
                        ? cityOptions.find((c) => c.value === watch("city_id"))
                            ?.label
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
                            <CommandItem disabled>
                              {l.no_city_found}
                            </CommandItem>
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

              {/* Currency and Price */}
              <div className="space-y-4">
                <p className="text-Gray-700 text-right text-lg font-[500]">
                  {s.location}:
                </p>
                <Select>
                  <SelectTrigger className="w-full border-2 border-default-divider py-5 rounded-xl">
                    <SelectValue placeholder={s.currency_type} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem className="text-right" value="dollar">
                      Dollar
                    </SelectItem>
                    <SelectItem value="rial">Rial</SelectItem>
                    <SelectItem value="euro">Euro</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex flex-row items-center gap-2 w-full">
                  <Input
                    placeholder={s.from_price}
                    className="text-Gray-500 border-text-field border py-4"
                  />
                  <Input
                    placeholder={s.to_price}
                    className="text-Gray-500 border-text-field border py-4"
                  />
                </div>
              </div>

              {/* Switches */}
              <div className="space-y-4">
                <div className="flex flex-row items-center justify-between">
                  <p className="text-lg font-[500] text-Gray-800">
                    {s.verified_ads}
                  </p>
                  <Switch className="cursor-pointer" />
                </div>
                <div className="flex flex-row items-center justify-between">
                  <p className="text-lg font-[500] text-Gray-800">
                    {s.same_language_owner}
                  </p>
                  <Switch className="cursor-pointer" />
                </div>
              </div>
            </div>

            <DrawerFooter className="pt-6">
              <button
                onClick={handleApplyFilters}
                className="w-full py-3 bg-Primary-400 text-white font-semibold rounded-xl"
              >
                اعمال فیلترها
              </button>
              <DrawerClose asChild>
                <button className="w-full py-3 border-2 border-Gray-300 text-Gray-700 font-semibold rounded-xl">
                  انصراف
                </button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default RecMobileFilter;
