"use client";

import React, { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { X } from "lucide-react";
import { ReusableDialog } from "@/components/modified_shadcn/Dialog";
import { useCountry } from "@/app/[locale]/CountryProvider";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const SelectLocationComponent = () => {
    const { navbar } = useTranslation();
    const [isLocationPanelOpen, setIsLocationPanelOpen] = useState(false);
    const {
        countries,
        cities,
        setCountry_id,
        country_id,
        isLoading,
        setCities,
        selectedCities,
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

    const handleLocationChange = () => {
        setIsLocationPanelOpen(false);
    };

    return (
        <ReusableDialog
            contentProps={{ className: "w-full max-w-160" }}
            open={isLocationPanelOpen}
            setOpen={setIsLocationPanelOpen}
            trigger={
                <button
                    onClick={() => setIsLocationPanelOpen(true)}
                    className="w-full max-w-62 border border-default-divider rounded-md py-2 cursor-pointer transition-all ease-in-out duration-200 hover:bg-Primary-100"
                >
                    {navbar.select_location}
                </button>
            }
        >
            <h2 className="text-xl font-bold">{navbar.select_location}</h2>

            <div className="space-y-4">
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
                                        className="hover:text-red-600 transition-colors cursor-pointer"
                                    >
                                        <X size={14} />
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                )}

                {/* Countries + Cities List */}
                <ScrollArea className="h-96 rounded-md p-2">
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
                                    className="font-bold py-4 flex items-center justify-between"
                                >
                                    {country.name}
                                </AccordionTrigger>
                                <AccordionContent>
                                    {isLoading && country_id === country.id ? (
                                        <p className="text-sm text-gray-500 p-2">Loading cities...</p>
                                    ) : (
                                        <div className="flex flex-col gap-2 p-2" dir="auto">
                                            {country_id === country.id && cities.length > 0
                                                ? cities.map((city) => (
                                                    <label
                                                        key={city.id}
                                                        className="flex items-center gap-2 cursor-pointer py-2 border-b border-b-Primary-100"
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

                {/* Actions */}
                <div className="flex flex-row justify-end items-center gap-2">
                    <button
                        onClick={handleLocationChange}
                        className="px-4 py-2 border border-Primary-400 text-Primary-400 rounded-md hover:bg-Primary-50 transition-colors"
                    >
                        انصراف
                    </button>
                    <button
                        onClick={handleLocationChange}
                        className="px-4 py-2 bg-Primary-400 text-alphaw-100 rounded-md hover:bg-Primary-500 transition-colors"
                    >
                        اعمال تغییرات
                    </button>
                </div>
            </div>
        </ReusableDialog>
    );
};

export default SelectLocationComponent;
