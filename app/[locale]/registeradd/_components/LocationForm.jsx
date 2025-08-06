"use client";
import React, { useState } from "react";
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
        <Select
          onValueChange={(value) => {
            setValue("country", value, { shouldValidate: true });
            setValue("city", ""); // reset city
          }}
          value={selectedCountry}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="کشور" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="text-right">کشور ها</SelectLabel>
              {location?.data?.countries?.map((country) => (
                <SelectItem key={country.id} value={country.id.toString()}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {errors.country && (
          <p className="text-red-500 text-sm">{errors.country.message}</p>
        )}
      </div>

      <div className="flex lg:flex-row flex-col items-center gap-4">
        <div className="flex flex-col gap-2 w-full">
          <Select
            onValueChange={(value) =>
              setValue("city", value, { shouldValidate: true })
            }
            value={watch("city")}
            disabled={!selectedCountry || loadingCountries}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="شهر" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-right">شهر ها</SelectLabel>
                {location?.data?.city?.length > 0 ? (
                  location.data.city.map((city) => (
                    <SelectItem key={city.id} value={city.name}>
                      {city.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem disabled>
                    {loadingCountries
                      ? "در حال بارگذاری..."
                      : "ابتدا کشور را انتخاب کنید"}
                  </SelectItem>
                )}
              </SelectGroup>
            </SelectContent>
          </Select>
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
        <div className="flex flex-col lg:flex-row gap-2">
          <Input placeholder="از مرکز خرید" />
          <Input placeholder="از بیمارستان" />
          <Input placeholder="از ایستگاه تاکسی" />
        </div>
        <div className="flex flex-col lg:flex-row gap-2">
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
          <Arrowleft className="fill-white dark:fill-black" />
        </button>
      </div>
    </form>
  );
}
