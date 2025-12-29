"use client";
import React, {useState, useEffect} from "react";
import Layer from "@/assets/icons/profile.svg";
import Home from "./Home";
import Null from "./Null";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import AdvPagination from "@/components/AdvPagination";
import JobSearch from "./JobSearch";
import FilterCategory from "@/app/[locale]/(dashboard)/my-profile/_components/FilterCategory";

const Information = ({
                         data,
                         isLoading,
                         selected,
                         setSelected,
                         refetch,
                         currentPage,
                         setCurrentPage,
                     }) => {
    const dic = useTranslation();
    const a = dic.public.profile.my_ads;
    const d = dic.public.profile.dashboard;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (data) {
            setTotalPages(data.last_page || 1);
            if (currentPage > data.last_page) {
                setCurrentPage(data.last_page || 1);
            }
        }
    }, [data, currentPage]);


    const isEmpty = !data?.data || data.data.length === 0;

    return (
        <div className="flex flex-col bg-surface w-full border border-Gray-200 rounded-xl">
            <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
                <Layer className="fill-gray-800 dark:fill-gray-200"/>
                <p className="text-xl dark:text-[#E0E2E5] text-black font-bold pt-1">
                    {a.my_ads}
                </p>
            </div>
            <div className="p-6">
                <FilterCategory selected={selected} setSelected={setSelected}/>
            </div>

            {!isEmpty ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 p-6">
                    {data?.data?.map((item) => (item.custom_info.type === "recruitment" ?
                            <JobSearch item={item} isLoading={isLoading} refetch={refetch} d={d}/> :
                            <Home item={item} isLoading={isLoading} refetch={refetch}/>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center w-full">
                    <Null a={a}/>
                </div>
            )}

            {/* Pagination Component */}
            {!isEmpty && (
                <AdvPagination
                    page={currentPage}
                    totalPages={totalPages}
                    setPage={setCurrentPage}
                />
            )}
        </div>
    );
};

export default Information;
