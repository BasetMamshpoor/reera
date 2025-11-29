"use client";

import {createContext, useContext, useState} from "react";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";

const CountryContext = createContext();

export const CountryProvider = ({children}) => {
    const [country_id, setCountry_id] = useState(1)
    const {data, isLoading, error} = useQuery({
        queryKey: ["allCountries", country_id],
        queryFn: async () =>
            await request({
                url: `/getCountries`,
                queryKey: {country: country_id},
            }),
    });

    return (
        <CountryContext.Provider
            value={{
                countries: data?.data?.countries,
                cities: data?.data?.city,
                setCountry_id,
                country_id,
                isLoading,
                error
            }}>
            {children}
        </CountryContext.Provider>
    );
};

export const useCountry = () => useContext(CountryContext);
