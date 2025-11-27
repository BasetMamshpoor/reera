"use client";
import React, { useState, useMemo, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
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
import { FormContext } from "../../NewCategorySelector";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { toast } from "sonner";
import dynamic from "next/dynamic";

const MapComponent = dynamic(() => import("./MapComponent"), {
  ssr: false,
});
const schema = z.object({
  country_id: z
    .string({ required_error: "لطفا کشور خود را انتخاب کنید" })
    .min(1, "لطفا کشور خود را انتخاب کنید"),
  city_id: z
    .string({ required_error: "لطفا شهر خود را انتخاب کنید" })
    .min(1, "لطفا شهر خود را انتخاب کنید"),
  region: z.string().min(1, "منطقه ضروری است"),
  full_address: z.string().min(1, "آدرس کامل خود را وارد کنید"),
  distance_from_shopping_center: z.string().optional(),
  distance_from_taxi_stand: z.string().optional(),
  distance_from_gas_station: z.string().optional(),
  distance_from_hospital: z.string().optional(),
  distance_from_bus_station: z.string().optional(),
  distance_from_airport: z.string().optional(),
});

export default function LocationForm({
  variant = "simple",
  apiUrl,
  adData,
  isEditing = false,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cityOpen, setCityOpen] = useState(false);
  const [citySearch, setCitySearch] = useState("");
  const { apiResponseData, setCurrentStep } = useContext(FormContext);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues: {
      country_id: "",
      city_id: "",
      region: "",
      full_address: "",
      distance_from_shopping_center: "",
      distance_from_taxi_stand: "",
      distance_from_gas_station: "",
      distance_from_hospital: "",
      distance_from_bus_station: "",
      distance_from_airport: "",
    },
  });

  const dic = useTranslation("");
  const l = dic.public.register_ad.location_form;
  const [position, setPosition] = useState({
    latitude: 35.6892,
    longitude: 51.389,
  });
  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => {
      const response = await request({
        method: "GET",
        url: `/getCountries`,
      });

      return response;
    },
  });

  const selectedCountryId = watch("country_id");

  const { data: citiesData, isLoading: loadingCities } = useQuery({
    queryKey: ["cities", selectedCountryId],
    queryFn: async () => {
      if (!selectedCountryId) return { data: { cities: [] } };
      const response = await request({
        method: "GET",
        url: `/getCountries`,
        query: { country: selectedCountryId },
      });

      return response;
    },
    enabled: !!selectedCountryId,
  });

  useEffect(() => {
    if (isEditing && adData) {
      const second = adData?.second;
      setValue(
        "country_id",
        second.country_id ? String(second.country_id) : ""
      );
      setValue("city_id", second.city_id ? String(second.city_id) : "");
      setValue("region", second.region || "");
      setValue("full_address", second.full_address || "");
      setValue(
        "distance_from_shopping_center",
        second.distance_from_shopping_center || ""
      );
      setValue(
        "distance_from_taxi_stand",
        second.distance_from_taxi_stand || ""
      );
      setValue(
        "distance_from_gas_station",
        second.distance_from_gas_station || ""
      );
      setValue("distance_from_hospital", second.distance_from_hospital || "");
      setValue(
        "distance_from_bus_station",
        second.distance_from_bus_station || ""
      );
      setValue("distance_from_airport", second.distance_from_airport || "");
      if (second.latitude && second.longitude) {
        setPosition({
          latitude: parseFloat(second.latitude),
          longitude: parseFloat(second.longitude),
        });
      }
    }
  }, [isEditing, adData, setValue]);

  const LocationMutation = useMutation({
    mutationFn: async (data) => {
      const formattedLongitude =
        position?.longitude?.toFixed(4) ?? adData?.data?.second?.longitude;
      const formattedLatitude =
        position?.latitude?.toFixed(4) ?? adData?.data?.second?.latitude;

      const requestData = {
        ad_id: apiResponseData,
        country_id: data.country_id ? parseInt(data.country_id) : undefined,
        city_id: data.city_id ? parseInt(data.city_id) : undefined,
        region: data.region,
        full_address: data.full_address,
        longitude: formattedLongitude,
        latitude: formattedLatitude,
        ...(variant === "map" && {
          distance_from_shopping_center: data.distance_from_shopping_center,
          distance_from_taxi_stand: data.distance_from_taxi_stand,
          distance_from_gas_station: data.distance_from_gas_station,
          distance_from_hospital: data.distance_from_hospital,
          distance_from_bus_station: data.distance_from_bus_station,
          distance_from_airport: data.distance_from_airport,
        }),
      };

      const url = !isEditing
        ? apiUrl
        : `update/${adData?.slug}/second/${adData?.first?.id}`;

      try {
        const res = await request({
          url,
          method: isEditing ? "post" : "post",
          data: requestData,
        });
        return res;
      } catch (error) {
        throw error;
      }
    },

    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },

    onError: (err) => {
      toast.error(`${err?.message || err} + error on sending data`);
    },
  });

  const countryOptions = useMemo(() => {
    return (
      countriesData?.data?.countries?.map((c) => ({
        value: c.id.toString(),
        label: c.name,
      })) || []
    );
  }, [countriesData]);

  const filteredCountries = useMemo(() => {
    return countryOptions.filter((country) =>
      country.label.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, countryOptions]);

  const cityOptions = useMemo(() => {
    return (
      citiesData?.data?.city?.map((city) => ({
        value: city.id.toString(),
        label: city.name,
      })) || []
    );
  }, [citiesData]);

  const filteredCities = useMemo(() => {
    return cityOptions.filter((city) =>
      city.label.toLowerCase().includes(citySearch.toLowerCase())
    );
  }, [citySearch, cityOptions]);

  const onSubmit = (formData) => {
    LocationMutation.mutate(formData);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg "
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
              {selectedCountryId
                ? countryOptions.find((c) => c.value === selectedCountryId)
                    ?.label
                : l.location_country}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="lg:w-[730px] w-90 p-0">
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

        {errors.country_id && (
          <p className="text-red-500 text-sm">{errors.country_id.message}</p>
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
                className="w-full justify-between "
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
          {errors.city_id && (
            <p className="text-red-500 text-sm">{errors.city_id.message}</p>
          )}
        </div>

        <div className="flex flex-col  w-full">
          <Input placeholder={l.location_region} {...register("region")} />
          {errors.region && (
            <p className="text-red-500 text-sm">{errors.region.message}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col ">
        <Input
          placeholder={l.location_full_address}
          {...register("full_address")}
        />
        {errors.full_address && (
          <p className="text-red-500 text-sm">{errors.full_address.message}</p>
        )}
      </div>

      {variant === "map" && (
        <>
          <div className="flex flex-col gap-4">
            <h2>{l.distance_from_important_places}</h2>
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                placeholder={l.from_shopping_center}
                {...register("distance_from_shopping_center")}
              />
              <Input
                placeholder={l.from_hospital}
                {...register("distance_from_hospital")}
              />
              <Input
                placeholder={l.from_taxi_station}
                {...register("distance_from_taxi_stand")}
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <Input
                placeholder={l.from_bus_station}
                {...register("distance_from_bus_station")}
              />
              <Input
                placeholder={l.from_gas_station}
                {...register("distance_from_gas_station")}
              />
              <Input
                placeholder={l.from_airport}
                {...register("distance_from_airport")}
              />
            </div>
          </div>
        </>
      )}
      <MapComponent position={position} setPosition={setPosition} />

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-2 w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {l.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span className="text-alphaw-100">
            {LocationMutation.isLoading ? l.sending : l.next}
          </span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
}
