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
import ColAds from "./ColAds";

import AdvPagination from "@/components/AdvPagination";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {useRouter} from "next/navigation";
import {useTranslation} from "../../../../TranslationContext";
import Spinner from "@/components/Spinner";

const AdvsRes = ({page}) => {
    const router = useRouter();
    const [isRow, setIsRow] = useState(false);
    const dic = useTranslation();
    const a = dic.all_ads.sidebar;

    const {data, isLoading} = useQuery({
        queryKey: ["housing-ads"],
        queryFn: async () =>
            await request({
                url: `/ads?category_slug=housing`,
            }),
    });

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
                        <p className="text-Text-Primary font-bold "> {a.show_ads}:</p>
                        <Select className="">
                            <SelectTrigger
                                className="border-none shadow-none gap-2 font-bold data-[placeholder]:text-Text-Secondary">
                                <SelectValue placeholder={a.newest}/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup className="bg-white">
                                    <SelectItem
                                        className="bg-white font-bold"
                                        value="most-viewed"
                                    >
                                        {a.newest}
                                    </SelectItem>
                                    <SelectItem className="bg-white font-bold" value="newest">
                                        {a.most_viewed}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsRow(true)}>
                            <Linear
                                className={`cursor-pointer ${
                                    isRow ? "fill-Primary-400" : "fill-Gray-700"
                                }`}
                            />
                        </button>
                        <button onClick={() => setIsRow(false)}>
                            <Element
                                className={`cursor-pointer ${
                                    !isRow ? "fill-Primary-400" : "fill-Gray-700"
                                }`}
                            />
                        </button>
                    </div>
                </div>
            </div>

            <ColAds data={data?.data || []} isRow={isRow}/>

            <AdvPagination
                setPage={goToPage}
                totalPages={data?.total_pages}
                page={page}
            />
        </div>
    );
};

export default AdvsRes;
