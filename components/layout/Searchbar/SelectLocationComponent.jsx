"use client";

import React, {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {
    Accordion,
    AccordionItem,
    AccordionTrigger,
    AccordionContent,
} from "@/components/ui/accordion";
import {Checkbox} from "@/components/ui/checkbox";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {X} from "lucide-react";

const SelectLocationComponent = ({setIsLocationPanelOpen}) => {
    const [selectedCountryId, setSelectedCountryId] = useState(null);
    const [selectedCities, setSelectedCities] = useState([]);

    // Get all countries
    const {data: countriesData, isLoading: loadingCountries} = useQuery({
        queryKey: ["countries"],
        queryFn: async () => request({method: "GET", url: `/getCountries`}),
    });

    // Get cities for selected country
    const {data: citiesData, isLoading: loadingCities} = useQuery({
        queryKey: ["cities", selectedCountryId],
        queryFn: async () => {
            if (!selectedCountryId) return {data: {city: []}};
            return request({
                method: "GET",
                url: `/getCountries`,
                query: {country: selectedCountryId},
            });
        },
        enabled: !!selectedCountryId,
    });

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

    if (loadingCountries) return <p>Loading countries...</p>;

    const countries = countriesData?.data?.countries || [];
    const cities = citiesData?.data?.city || [];

    const handleLocationChange = () => {
        setIsLocationPanelOpen(false);
    };

    return (
        <div className="space-y-4">
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
                                className="hover:text-red-600 transition-colors cursor-pointer"
                            >
                                <X size={14}/>
                            </button>
                        </div>
                    ))}
                </div>
            )}

            {/* Scrollable Country + Cities List */}
            <ScrollArea className="h-96 rounded-md p-2">
                <Accordion type="single" collapsible className="w-full">
                    {countries.map((country) => (
                        <AccordionItem
                            key={country.id}
                            value={`country-${country.id}`}
                            className="border-b"
                        >
                            <AccordionTrigger
                                onClick={() => setSelectedCountryId(country.id)}
                                className="font-bold py-4 flex items-center justify-between"
                            >
                                {country.name}
                            </AccordionTrigger>
                            <AccordionContent>
                                {loadingCities && selectedCountryId === country.id ? (
                                    <p className="text-sm text-gray-500 p-2">Loading cities...</p>
                                ) : (
                                    <div className="flex flex-col gap-2 p-2">
                                        {selectedCountryId === country.id && cities.length > 0
                                            ? cities.map((city) => (
                                                <label
                                                    key={city.id}
                                                    className="flex items-center gap-2 cursor-pointer py-2 border-b border-b-Primary-100"
                                                >
                                                    <Checkbox
                                                        checked={
                                                            !!selectedCities.find((c) => c.id === city.id)
                                                        }
                                                        onCheckedChange={() => handleCityToggle(city)}
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
            </ScrollArea>

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
    );
};

export default SelectLocationComponent;
