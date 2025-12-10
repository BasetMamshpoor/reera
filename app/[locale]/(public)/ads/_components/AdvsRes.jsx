"use client";
import React, {useState} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import Linear from "@/assets/icons/linear.svg";
import Element from "@/assets/icons/Element.svg";
import AdvPagination from "@/components/AdvPagination";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {useRouter} from "next/navigation";
import Spinner from "@/components/Spinner";
import ColAds from "./ColAds";
import RowsAds from "./RowsAds";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useCountry} from "@/app/[locale]/CountryProvider";
import JobSearch from "@/components/Advertisements/JobSearch";

const AdvsRes = ({page, link, category_slug, category_id}) => {
    const router = useRouter();
    const [isRow, setIsRow] = useState(false);
    const [sort, setSort] = useState("newest");
    const dic = useTranslation();
    const {selectedCities} = useCountry()
    const a = dic.all_ads.sidebar;
    const d = dic.public.profile.dashboard;

    const {data, isLoading} = useQuery({
        queryKey: ["ads", page, category_slug, category_id, sort],
        queryFn: async () =>
            await request({
                url: `/ads`,
                method: "get",
                query: {
                    page,
                    category_id,
                    category_slug,
                    sort,
                },
            }),
    });
    console.log(data)
    const goToPage = (newPage) => {
        router.push(`?page=${newPage}`);
    };

    if (isLoading) {
        return (
            <div className="w-full flex items-center justify-center">
                <Spinner/>
            </div>
        );
    }

    return (
        <div className="flex items-center flex-col gap-6 w-full">
            <div className="flex flex-col gap-10 w-full">
                <div className="flex items-center justify-between w-full px-4 lg:mx-0">
                    <div className="flex items-center gap-3 w-fit">
                        <p className="text-Text-Primary font-bold">{a.show_ads}:</p>
                        <Select value={sort} onValueChange={(v) => setSort(v)}>
                            <SelectTrigger
                                className="border-none shadow-none gap-2 font-bold data-[placeholder]:text-Text-Secondary">
                                <SelectValue placeholder={a.newest}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="bg-white">
                                    <SelectItem className="bg-white font-bold" value="newest">
                                        {a.newest}
                                    </SelectItem>
                                    <SelectItem className="bg-white font-bold" value="most-viewed">
                                        {a.most_viewed}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsRow(true)}>
                            <Linear
                                className={`cursor-pointer ${isRow ? "fill-Primary-400" : "fill-Gray-700"}`}
                            />
                        </button>
                        <button onClick={() => setIsRow(false)}>
                            <Element
                                className={`cursor-pointer ${!isRow ? "fill-Primary-400" : "fill-Gray-700"}`}
                            />
                        </button>
                    </div>
                </div>
            </div>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full`}>
                {data?.data?.map((item) => (
                    <JobSearch key={item.id} link={link} isRow={isRow} item={item} d={d}/>
                ))}
            </div>
            <AdvPagination
                setPage={goToPage}
                totalPages={data?.last_page}
                page={page}
            />
        </div>
    );
};

export default AdvsRes;
