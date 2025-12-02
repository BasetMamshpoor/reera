"use client";

import {createContext, useContext, useState} from "react";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";

const CountryContext = createContext();

export const CountryProvider = ({children}) => {
    const [country_id, setCountry_id] = useState(1)
    const [cities, setCities] = useState([])
    const {data, isFetching, error} = useQuery({
        queryKey: ["allCountries", country_id],
        queryFn: async () =>
            await request({
                url: `/getCountries`,
                query: {country: country_id},
            }),
        placeholderData: keepPreviousData,
    });

    return (
        <CountryContext.Provider
            value={{
                countries: data?.data?.countries || [],
                cities: data?.data?.city || [],
                selectedCities: cities,
                isLoading: isFetching,
                setCountry_id,
                country_id,
                setCities,
                error,
            }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountry = () => useContext(CountryContext);
