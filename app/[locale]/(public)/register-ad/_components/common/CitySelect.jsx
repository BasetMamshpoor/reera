"use client";
import React, { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
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
import { CheckIcon, ChevronDown, ChevronsUpDownIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const CitySelect = ({
  countryId,
  value,
  onChange,
  label,
  translations,
  width = "w-90",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: citiesData, isLoading } = useQuery({
    queryKey: ["cities", countryId],
    queryFn: async () => {
      if (!countryId) return { data: { cities: [] } };
      return request({
        method: "GET",
        url: `/getCountries`,
        query: { country: countryId },
      });
    },
    enabled: !!countryId,
  });

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
        city.label.toLowerCase().includes(search.toLowerCase())
      ),
    [search, cityOptions]
  );

  return (
    <div className="flex flex-col gap-2 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            disabled={!countryId || isLoading}
          >
            {value ? cityOptions.find((c) => c.value === value)?.label : label}

            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`${width} p-0`}>
          <Command>
            <CommandInput
              placeholder={translations.search_city}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>{translations.no_city_found}</CommandEmpty>
              <CommandGroup>
                {isLoading ? (
                  <CommandItem disabled>{translations.loading}</CommandItem>
                ) : filteredCities.length > 0 ? (
                  filteredCities.map((city) => (
                    <CommandItem
                      key={city.value}
                      value={city.label}
                      onSelect={() => {
                        onChange(city.value);
                        setOpen(false);
                        setSearch("");
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === city.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                      {city.label}
                    </CommandItem>
                  ))
                ) : (
                  <CommandItem disabled>
                    {countryId
                      ? translations.no_city_found
                      : translations.select_country_first}
                  </CommandItem>
                )}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default CitySelect;
