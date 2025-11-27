import React, {useState} from 'react';
import Null from "./Null";
import JobSearch from "./JobSearch";
import {log} from "next/dist/server/typescript/utils";
import {Checkbox} from "@/components/ui/checkbox";
import Home from "./Home";
import {Select, SelectContent, SelectGroup, SelectLabel, SelectTrigger, SelectValue} from "@/components/ui/select";
import {useParams} from "next/navigation";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";

const MyAds = ({data, isLoading, selected, setSelected, d, refetch , tab}) => {
    const {locale} = useParams()
    const toggleCategory = (id) => {
        if (selected.includes(id)) {
            setSelected([]);
        } else {
            setSelected([id]);
        }
    };
    const {data: categoryIds} = useQuery({
        queryKey: ["categoryIds1"],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "/getCategory",
            });
        }
    });
    const selectedCategory = categoryIds?.data.find((cat) => cat.id === selected[0]);
    const isEmpty = !data?.data || data.data.length === 0;

    return (
        <>
            <div className="flex flex-col gap-6 lg:gap-10 w-full px-6 lg:px-0 py-4">
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
                        <SelectValue className="text-black"
                                     placeholder={selectedCategory ? selectedCategory.label : d.select_category}
                        />
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
                {!isEmpty ? (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <JobSearch tab={tab} data={ data} isLoading={isLoading} refetch={refetch} d={d}/>
                        <Home tab={tab} data={data} isLoading={isLoading} refetch={refetch}/>
                    </div>
                ) : (
                    <div className="flex items-center justify-center w-full">
                        <Null/>
                    </div>
                )}
            </div>
        </>
    );
};

export default MyAds;