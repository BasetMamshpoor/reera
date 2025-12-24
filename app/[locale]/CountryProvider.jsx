"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";

const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
    const searchParams = useSearchParams();
    const router = useRouter();

    // 1️⃣ READ city_id FROM URL
    const cityIdsFromUrl = searchParams.get("city_id")
        ? searchParams.get("city_id").split(",").map(Number)
        : [];

    const [selectedCities, setSelectedCities] = useState(cityIdsFromUrl);
    const [country_id, setCountry_id] = useState(1);

    // 2️⃣ FETCH (کشورها و شهرها همون قبلی)
    const { data, isFetching } = useQuery({
        queryKey: ["countries", country_id],
        queryFn: () =>
            request({
                url: "/getCountries",
                query: { country: country_id },
            }),
        placeholderData: keepPreviousData,
    });

    // 3️⃣ SYNC TO URL (فقط city_id)
    useEffect(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (selectedCities.length === 0) {
            params.delete("city_id");
        } else {
            params.set("city_id", selectedCities.join(","));
        }

        router.replace(`?${params.toString()}`, { scroll: false });
    }, [selectedCities]);

    return (
        <CountryContext.Provider
            value={{
                countries: data?.data?.countries || [],
                cities: data?.data?.city || [],
                selectedCities,
                setCities: setSelectedCities,
                country_id,
                setCountry_id,
                isLoading: isFetching,
            }}
        >
            {children}
        </CountryContext.Provider>
    );
};

export const useCountry = () => useContext(CountryContext);
