"use client";

import React, { useState } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerClose,
} from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { X } from "lucide-react";

const MobileLocationDrawer = ({ mobileLocation, setMobileLocation }) => {
  const [selectedCountryId, setSelectedCountryId] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);

  // Fetch countries
  const { data: countriesData, isLoading: loadingCountries } = useQuery({
    queryKey: ["countries"],
    queryFn: async () => request({ method: "GET", url: `/getCountries` }),
  });

  // Fetch cities for selected country
  const { data: citiesData, isLoading: loadingCities } = useQuery({
    queryKey: ["cities", selectedCountryId],
    queryFn: async () => {
      if (!selectedCountryId) return { data: { city: [] } };
      return request({
        method: "GET",
        url: `/getCountries`,
        query: { country: selectedCountryId },
      });
    },
    enabled: !!selectedCountryId,
  });

  const countries = countriesData?.data?.countries || [];
  const cities = citiesData?.data?.city || [];

  const handleCityToggle = (city) => {
    const alreadySelected = selectedCities.find((c) => c.id === city.id);
    if (alreadySelected) {
      setSelectedCities((prev) => prev.filter((c) => c.id !== city.id));
    } else {
      setSelectedCities((prev) => [...prev, city]);
    }
  };

  const handleRemoveTag = (cityId) => {
    setSelectedCities((prev) => prev.filter((c) => c.id !== cityId));
  };

  return (
    <Drawer open={mobileLocation} onOpenChange={setMobileLocation}>
      <DrawerContent className="h-[100vh] rounded-t-2xl">
        <DrawerHeader className="flex justify-between items-center border-b pb-3 px-4">
          <DrawerTitle className="text-lg font-semibold">
            Select Location
          </DrawerTitle>
        </DrawerHeader>

        <div className="p-4 flex flex-col gap-4">
          {/* Selected Cities Tags */}
          {selectedCities.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedCities.map((city) => (
                <div
                  key={city.id}
                  className="flex items-center gap-1 bg-Primary-50 text-Primary-800 px-3 py-1 rounded-full text-sm"
                >
                  <span>{city.name}</span>
                  <button
                    onClick={() => handleRemoveTag(city.id)}
                    className="hover:text-red-600 transition-colors"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Countries + Cities List */}
          <ScrollArea className="h-[100vh] border rounded-md p-2">
            {loadingCountries ? (
              <p className="text-sm text-gray-500">Loading countries...</p>
            ) : (
              <Accordion type="single" collapsible className="w-full">
                {countries.map((country) => (
                  <AccordionItem
                    key={country.id}
                    value={`country-${country.id}`}
                    className="border-b"
                  >
                    <AccordionTrigger
                      onClick={() => setSelectedCountryId(country.id)}
                      className="text-base font-medium py-4"
                    >
                      {country.name}
                    </AccordionTrigger>
                    <AccordionContent>
                      {loadingCities && selectedCountryId === country.id ? (
                        <p className="text-sm text-gray-500 p-2">
                          Loading cities...
                        </p>
                      ) : (
                        <div className="flex flex-col gap-2 p-2">
                          {selectedCountryId === country.id && cities.length > 0
                            ? cities.map((city) => (
                                <label
                                  key={city.id}
                                  className="flex items-center gap-2 cursor-pointer py-2 border-b border-b-Gray-100"
                                >
                                  <Checkbox
                                    checked={
                                      !!selectedCities.find(
                                        (c) => c.id === city.id
                                      )
                                    }
                                    onCheckedChange={() =>
                                      handleCityToggle(city)
                                    }
                                  />
                                  <span>{city.name}</span>
                                </label>
                              ))
                            : selectedCountryId === country.id && (
                                <p className="text-sm text-gray-500">
                                  No cities found.
                                </p>
                              )}
                        </div>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </ScrollArea>
        </div>

        {/* Drawer Footer */}
        <div className="p-4 border-t">
          <Button className="w-full" onClick={() => setMobileLocation(false)}>
            Confirm Selection
          </Button>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileLocationDrawer;
