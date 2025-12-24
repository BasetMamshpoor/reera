"use client";

import React from "react";
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
import { X } from "lucide-react";
import { useCountry } from "@/app/[locale]/CountryProvider";

const MobileLocationDrawer = ({ mobileLocation, setMobileLocation }) => {
    const {
        countries,
        cities,
        selectedCities,
        country_id,
        setCountry_id,
        setCities,
        isLoading,
    } = useCountry();

    // Toggle city selection
    const handleCityToggle = (city) => {
        const exists = selectedCities.includes(city.id);
        setCities(
            exists
                ? selectedCities.filter((id) => id !== city.id)
                : [...selectedCities, city.id]
        );
    };

    // Remove city from selected
    const handleRemoveTag = (cityId) => {
        setCities(selectedCities.filter((id) => id !== cityId));
    };

    return (
        <Drawer open={mobileLocation} onOpenChange={setMobileLocation}>
            <DrawerContent className="h-[85vh] rounded-t-2xl">
                <DrawerHeader className="flex justify-between items-center border-b pb-3 px-4">
                    <DrawerTitle className="text-lg font-semibold">
                        Select Location
                    </DrawerTitle>
                </DrawerHeader>

                <div className="p-4 flex flex-col gap-4">
                    {/* Selected Cities Chips */}
                    {selectedCities.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-2">
                            {selectedCities.map((cityId) => {
                                const city = cities.find((c) => c.id === cityId);
                                if (!city) return null;
                                return (
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
                                );
                            })}
                        </div>
                    )}

                    {/* Countries + Cities List */}
                    <ScrollArea className="h-[100vh] border rounded-md p-2">
                        <Accordion type="single" collapsible className="w-full">
                            {countries.map((country) => (
                                <AccordionItem
                                    key={country.id}
                                    value={`country-${country.id}`}
                                    className="border-b"
                                >
                                    <AccordionTrigger
                                        onClick={() =>
                                            country_id === country.id ? {} : setCountry_id(country.id)
                                        }
                                        className="text-base font-medium py-4"
                                    >
                                        {country.name}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        {isLoading && country_id === country.id ? (
                                            <p className="text-sm text-gray-500 p-2">
                                                Loading cities...
                                            </p>
                                        ) : (
                                            <div className="flex flex-col gap-2 p-2">
                                                {country_id === country.id && cities.length > 0
                                                    ? cities.map((city) => (
                                                        <label
                                                            key={city.id}
                                                            className="flex items-center gap-2 cursor-pointer py-2 border-b border-b-Gray-100"
                                                        >
                                                            <Checkbox
                                                                checked={selectedCities.includes(city.id)}
                                                                onCheckedChange={() => handleCityToggle(city)}
                                                            />
                                                            <span>{city.name}</span>
                                                        </label>
                                                    ))
                                                    : country_id === country.id && (
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
