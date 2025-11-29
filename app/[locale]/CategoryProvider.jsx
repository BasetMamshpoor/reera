"use client";

import {createContext, useContext} from "react";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";

const CategoryContext = createContext();

export const CategoryProvider = ({children}) => {
    const {data, isLoading, error} = useQuery({
        queryKey: ["allCategory"],
        queryFn: async () =>
            await request({
                url: `/getAllCategory`,
            }),
    });

    return (
        <CategoryContext.Provider value={{categories: data?.data?.categories, isLoading, error}}>
            {children}
        </CategoryContext.Provider>
    );
};

export const useCategories = () => useContext(CategoryContext);
