"use client";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
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
import SearchIcon from "@/assets/icons/search.svg";
import MultiRangeSlider from "@/components/ui/multirangeslider";
import {Switch} from "@/components/ui/switch";
import {useTranslation} from "@/app/[locale]/TranslationContext";

// Memoize to prevent unnecessary re-renders
const FilterContent = React.memo(
    ({
         categories,
         product_status,
         isProduct_status,
         setIsProduct_status,
         data,
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
     }) => {
        const dic = useTranslation();
        const s = dic.all_ads.sidebar;
        const l = dic.public.register_ad.location_form;
        const k = dic.register_ad;

        const filteredBrands =
            data?.data?.brands?.filter((brand) =>
                brand.name.toLowerCase().includes(brandSearch.toLowerCase())
            ) || [];
        const filteredModels =
            data?.data?.models?.filter((model) =>
                model.name.toLowerCase().includes(typeSearch.toLowerCase())
            ) || [];

        const handleInputChange = (type, value) => {
            const numValue = Number(value);
            if (!isNaN(numValue)) {
                setPriceRange((prev) =>
                    type === "min" ? [numValue, prev[1]] : [prev[0], numValue]
                );
            }
        };

        return (
            <div className="flex flex-col gap-4 p-6 lg:p-0">
                {" "}
                {/* Adjust padding for mobile/desktop */}
                <div className="w-full relative group focus-within:ring-0">
                    <SearchIcon
                        className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 fill-Gray-700"/>
                    <Input
                        className="rtl:placeholder:text-right px-12 py-5 border-Gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 placeholder:text-Gray-500 rounded-xl"
                        placeholder={s.search}
                    />
                </div>
                <p className="rtl:text-right text-Gray-700">{s.categories_of}</p>
                <div className="grid grid-cols-2 gap-y-4 gap-4 w-full text-Gray-800 lg:grid-cols-1">
                    {categories?.map((label) => (
                        <div key={label} className="flex flex-row items-center gap-2">
                            <Checkbox className="cursor-pointer"/>
                            <Label className="text-Gray-800">{label}</Label>
                        </div>
                    ))}
                </div>
                <p className="text-Gray-700">{s.product_status}</p>
                <div className="flex items-center gap-4 w-full flex-wrap">
                    {product_status.map((label) => (
                        <div
                            onClick={() => setIsProduct_status(label)}
                            key={label}
                            className={`px-4 py-2 text-center bg-transparent border border-Gray-300 rounded-lg text-sm cursor-pointer w-40 ${
                                isProduct_status === label
                                    ? "bg-Primary-300 border-Primary-300 text-Primary-400"
                                    : "text-Gray-700"
                            }`}
                        >
                            {label}
                        </div>
                    ))}
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium">برند</label>
                    <Popover open={brandOpen} onOpenChange={setBrandOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={brandOpen}
                                className="w-full justify-between"
                            >
                                {selectedBrand
                                    ? filteredBrands.find((brand) => brand.name === selectedBrand)
                                        ?.name
                                    : k.select_brand}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-120 p-0">
                            <Command>
                                <CommandInput
                                    placeholder={k.search_brand}
                                    value={brandSearch}
                                    onValueChange={setBrandSearch}
                                />
                                <CommandList>
                                    <CommandEmpty>{k.no_brand_found}</CommandEmpty>
                                    <CommandGroup>
                                        {filteredBrands.map((brand) => (
                                            <CommandItem
                                                key={brand.id}
                                                value={brand.name}
                                                onSelect={(currentValue) => {
                                                    setValue(
                                                        "brand",
                                                        currentValue === selectedBrand ? "" : currentValue
                                                    );
                                                    setBrandOpen(false);
                                                    setBrandSearch("");
                                                    setValue("kitchen_brand_id", brand.id);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedBrand === brand.name
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {brand.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-2 w-full">
                    <label className="text-sm font-medium">{k.product_type}</label>
                    <Popover open={typeOpen} onOpenChange={setTypeOpen}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                role="combobox"
                                aria-expanded={typeOpen}
                                className="w-full justify-between"
                            >
                                {selectedType
                                    ? filteredModels.find((model) => model.name === selectedType)
                                        ?.name
                                    : k.select_product_type}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-120 p-0">
                            <Command>
                                <CommandInput
                                    placeholder={k.search_product_type}
                                    value={typeSearch}
                                    onValueChange={setTypeSearch}
                                />
                                <CommandList>
                                    <CommandEmpty>{k.no_product_type_found}</CommandEmpty>
                                    <CommandGroup>
                                        {filteredModels.map((model) => (
                                            <CommandItem
                                                key={model.id}
                                                value={model.name}
                                                onSelect={(currentValue) => {
                                                    setValue(
                                                        "product_type",
                                                        currentValue === selectedType ? "" : currentValue
                                                    );
                                                    setTypeOpen(false);
                                                    setTypeSearch("");
                                                    setValue("kitchen_type_id", model.id);
                                                }}
                                            >
                                                <CheckIcon
                                                    className={cn(
                                                        "mr-2 h-4 w-4",
                                                        selectedType === model.name
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                                {model.name}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                </div>
                <div className="flex flex-col gap-2">
                    <p>{s.location}</p>
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
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
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
                                className="w-full justify-between"
                                disabled={!selectedCountryId || loadingCities}
                            >
                                {watch("city_id")
                                    ? cityOptions.find((c) => c.value === watch("city_id"))?.label
                                    : l.location_city}
                                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
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
                                            <CommandItem disabled>{l.no_city_found}</CommandItem>
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
                <Select>
                    <SelectTrigger
                        className="w-full border-2 border-default-divider py-6 rounded-xl [&_[data-slot=chev-down]]:fill-Gray-500">
                        <SelectValue placeholder={s.currency_type}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className="text-right" value="light">
                            dollar
                        </SelectItem>
                        <SelectItem value="dark">Rial</SelectItem>
                        <SelectItem value="system">euro</SelectItem>
                    </SelectContent>
                </Select>
                <MultiRangeSlider value={priceRange} onValueChange={setPriceRange}/>
                <div className="flex flex-row items-center gap-2 w-full">
                    <Input
                        value={priceRange[0]}
                        onChange={(e) => handleInputChange("min", e.target.value)}
                        type="number"
                    />
                    <Input
                        value={priceRange[1]}
                        onChange={(e) => handleInputChange("max", e.target.value)}
                        type="number"
                    />
                </div>
                <div className="flex flex-row items-center justify-between mt-6">
                    <p className="text-lg font-[500] text-Gray-800">{s.verified_ads}</p>
                    <Switch className="cursor-pointer"/>
                </div>
                {/* Add same_language_owner if needed, or remove from mobile */}
            </div>
        );
    }
);

export default FilterContent;
