"use client";
import React, {useState, useEffect} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Layer from "@/assets/icons/profile.svg";
import {Checkbox} from "@/components/ui/checkbox";
import Home from "./Home";
import {useParams} from "next/navigation";
import Null from "./Null";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import AdvPagination from "@/components/AdvPagination";

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
    const {locale} = useParams();
    const [totalPages, setTotalPages] = useState(1);

    // Update pagination when data changes
    useEffect(() => {
        if (data) {
            setTotalPages(data.last_page || 1);
            // Ensure current page doesn't exceed total pages
            if (currentPage > data.last_page) {
                setCurrentPage(data.last_page || 1);
            }
        }
    }, [data, currentPage]);

    const {data: categoryIds} = useQuery({
        queryKey: ["categoryIds1"],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "/getCategory",
            });
        },
    });

    const toggleCategory = (id) => {
        if (selected.includes(id)) {
            setSelected([]);
        } else {
            setSelected([id]);
        }
    };

    const selectedCategory = categoryIds?.data.find(
        (cat) => cat.id === selected[0]
    );

    const isEmpty = !data?.data || data.data.length === 0;

    return (
        <div className="flex flex-col dark:bg-[#252C36] w-full border border-gray-200 dark:border-[#374151] rounded-xl">
            <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
                <Layer className="fill-gray-800 dark:fill-gray-200"/>
                <p className="text-xl dark:text-[#E0E2E5] text-black font-bold pt-1">
                    {a.my_ads}
                </p>
            </div>
            <div className="flex w-full p-6 lg:px-6 py-8">
                <div className="hidden lg:grid grid-cols-5 gap-6">
                    {categoryIds?.data.map((cat) => (
                        <label
                            key={cat.id}
                            className="flex items-center gap-2 cursor-pointer select-none"
                        >
                            <Checkbox
                                checked={selected.includes(cat.id)}
                                onCheckedChange={() => toggleCategory(cat.id)}
                                className="!w-6 !h-6"
                            />
                            <span className="text-base pt-1">{cat.title}</span>
                        </label>
                    ))}
                </div>

                <Select>
                    <SelectTrigger
                        dir={locale === "fa" ? "ltr" : "rtl"}
                        className="lg:hidden w-full border border-default-divider rounded-xl px-4"
                    >
                        <SelectValue className="text-black">
                            {selectedCategory ? selectedCategory.label : a.select_category}
                        </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel
                                dir={locale === "fa" ? "rtl" : "ltr"}
                                className="grid grid-col-1 sm:grid-cols-2 gap-4 text-balance"
                            >
                                {categoryIds?.data.map((cat) => (
                                    <label
                                        key={cat.id}
                                        className="flex items-center gap-2 cursor-pointer select-none"
                                    >
                                        <Checkbox
                                            checked={selected.includes(cat.id)}
                                            onCheckedChange={() => toggleCategory(cat.id)}
                                            className="!w-6 !h-6"
                                        />
                                        <span className="text-base pt-1">{cat.title}</span>
                                    </label>
                                ))}
                            </SelectLabel>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
            {!isEmpty ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                    <Home data={data} isLoading={isLoading} refetch={refetch}/>
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
