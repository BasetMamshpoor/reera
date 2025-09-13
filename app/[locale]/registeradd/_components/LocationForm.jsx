"use client";
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Arrowleft from "@/assets/icons/arrow-left.svg";
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

const schema = z.object({
  country: z
    .string({ required_error: "لطفا کشور خود را انتخاب کنید" })
    .min(1, "لطفا کشور خود را انتخاب کنید"),
  city: z
    .string({ required_error: "لطفا شهر خود را انتخاب کنید" })
    .min(1, "لطفا شهر خود را انتخاب کنید"),
  zone: z.string().min(1, "منطقه ضروری است"),
  fullAddress: z.string().min(1, "آدرس کامل خود را وارد کنید"),
});

export default function LocationForm({ currentStep, setCurrentStep }) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      country: "",
      city: "",
      zone: "",
      fullAddress: "",
    },
  });

  const selectedCountry = watch("country");

  const { data: location, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries", selectedCountry],
    queryFn: async () =>
      await request({
        method: "get",
        url: `/getCountries`,
        query: { country: selectedCountry },
      }),
  });

  const countryOptions = useMemo(
    () =>
      location?.data?.countries?.map((c) => ({
        value: c.id.toString(),
        label: c.name,
      })) || [],
    [location]
  );

  const filteredCountries = useMemo(() => {
    return countryOptions.filter((country) =>
      country.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countryOptions]);
  const filteredCities = useMemo(() => {
    if (!location?.data?.city) return [];
    return location.data.city.filter((city) =>
      city.name.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [citySearch, location?.data?.city]);
  const onSubmit = (formData) => {
    console.log("User submitted data:", formData);
    setCurrentStep((prev) => prev + 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-[#252C36] px-10 py-12 w-full rounded-lg flex flex-col gap-6"
    >
      <div className="flex flex-col gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {selectedCountry
                ? countryOptions.find((c) => c.value === selectedCountry)?.label
                : "کشور"}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="lg:w-[730px] w-90 p-0">
            <Command>
              <CommandInput
                placeholder="جستجو کشور..."
                value={search}
                onValueChange={setSearch}
              />
              <CommandList>
                <CommandEmpty>هیچ کشوری پیدا نشد</CommandEmpty>
                <CommandGroup>
                  {filteredCountries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.label} // Use the label as the value for searching
                      onSelect={() => {
                        setValue("country", country.value, {
                          shouldValidate: true,
                        });
                        setValue("city", "");
                        setOpen(false);
                        setSearch(""); // Clear search after selection
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          selectedCountry === country.value
                            ? "opacity-100"
                            : "opacity-0"
                        )}
                      />
                      {country.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      <div className="flex lg:flex-row flex-col items-center gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Popover open={cityOpen} onOpenChange={setCityOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={cityOpen}
                className="w-full justify-between"
                disabled={!selectedCountry || loadingCountries}
              >
                {watch("city") || "شهر"}
                <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="lg:w-[400px] w-90 p-0">
              <Command>
                <CommandInput
                  placeholder="جستجو شهر..."
                  value={citySearch}
                  onValueChange={setCitySearch}
                />
                <CommandList>
                  <CommandEmpty>هیچ شهری پیدا نشد</CommandEmpty>
                  <CommandGroup>
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <CommandItem
                          key={city.id}
                          value={city.name}
                          onSelect={() => {
                            setValue("city", city.name, {
                              shouldValidate: true,
                            });
                            setCityOpen(false);
                            setCitySearch("");
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              watch("city") === city.name
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {city.name}
                        </CommandItem>
                      ))
                    ) : (
                      <CommandItem disabled>
                        {loadingCountries
                          ? "در حال بارگذاری..."
                          : selectedCountry
                          ? "هیچ شهری یافت نشد"
                          : "ابتدا کشور را انتخاب کنید"}
                      </CommandItem>
                    )}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {errors.city && (
            <p className="text-red-500 text-sm">{errors.city.message}</p>
          )}
        </div>

        <div className="flex flex-col gap-2 w-full">
          <Input placeholder="منطقه" {...register("zone")} />
          {errors.zone && (
            <p className="text-red-500 text-sm">{errors.zone.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Input placeholder="آدرس کامل" {...register("fullAddress")} />
        {errors.fullAddress && (
          <p className="text-red-500 text-sm">{errors.fullAddress.message}</p>
        )}
      </div>

      <div className=" flex flex-col gap-4">
        <h2>فواصل از مراکز مهم</h2>
        <div className="flex flex-col lg:flex-row gap-4">
          <Input placeholder="از مرکز خرید" />
          <Input placeholder="از بیمارستان" />
          <Input placeholder="از ایستگاه تاکسی" />
        </div>
        <div className="flex flex-col lg:flex-row gap-4">
          <Input placeholder="از ایستگاه اتوبوس" />
          <Input placeholder="از پمپ بنزین" />
          <Input placeholder="از فرودگاه" />
        </div>
      </div>

      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white dark:text-black bg-[#4299C1] py-2 lg:w-32 rounded-lg"
        >
          <span>بعدی</span>
          <Arrowleft className="fill-white dark:fill-black ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
}
