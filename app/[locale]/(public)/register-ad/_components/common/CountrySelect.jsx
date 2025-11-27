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

const CountrySelect = ({
  value,
  onChange,
  label,
  translations,
  width = "w-90",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const { data: countriesData, isLoading } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => request({ method: "GET", url: `/getCountries` }),
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

  return (
    <div className="flex flex-col gap-2 w-full">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between py-5"
          >
            {value
              ? countryOptions.find((c) => c.value === value)?.label
              : label}

            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className={`${width} p-0`}>
          <Command>
            <CommandInput
              placeholder={translations.search_country}
              value={search}
              onValueChange={setSearch}
            />
            <CommandList>
              <CommandEmpty>{translations.no_country_found}</CommandEmpty>
              <CommandGroup>
                {isLoading ? (
                  <CommandItem disabled>{translations.loading}</CommandItem>
                ) : (
                  filteredCountries.map((country) => (
                    <CommandItem
                      key={country.value}
                      value={country.label}
                      onSelect={() => {
                        onChange(country.value);
                        setOpen(false);
                        setSearch("");
                      }}
                    >
                      <CheckIcon
                        className={cn(
                          "mr-2 h-4 w-4",
                          value === country.value ? "opacity-100" : "opacity-0"
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
  );
};

export default CountrySelect;
