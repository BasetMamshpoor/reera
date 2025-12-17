"use client";
import React, {useState, useMemo} from "react";
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
import {useRouter, useSearchParams} from "next/navigation";
import Spinner from "@/components/Spinner";
import Card from "@/app/[locale]/(public)/ads/_components/Card";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import JobSearch from "@/components/Advertisements/JobSearch";

const AdvsRes = ({page, link, category_slug, category_id}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [isRow, setIsRow] = useState(false);
    const [sort, setSort] = useState("newest");
    const dic = useTranslation();
    const a = dic.all_ads.sidebar;
    const d = dic.public.profile.dashboard;
    // خواندن همه پارامترهای URL
    const queryFromURL = useMemo(() => {
        const params = {};
        for (const [key, value] of searchParams.entries()) {
            params[key] = value;
        }
        return params;
    }, [searchParams]);

    // اضافه کردن page و sort و category
    queryFromURL.page = page;
    queryFromURL.sort = sort;
    queryFromURL.category_slug = category_slug;
    queryFromURL.category_id = category_id;

    const {data, isLoading} = useQuery({
                queryKey: ["ads", queryFromURL, page, category_id, category_slug, sort],
                queryFn: async () =>
                    await request({
                        url: "/ads",
                        method: "get",
                        query: queryFromURL, page, category_id, category_slug, sort,
                    }),
            }
        )
    ;

    const goToPage = (newPage) => {
        router.push(`?page=${newPage}`);
    };

    if (isLoading) {
        return (
            <div className="w-full h-screen flex py-6 justify-center">
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
                                <SelectGroup className="bg-surface">
                                    <SelectItem className="bg-surface font-bold" value="newest">
                                        {a.newest}
                                    </SelectItem>
                                    <SelectItem className="bg-surface font-bold" value="view">
                                        {a.most_viewed}
                                    </SelectItem>
                                    <SelectItem className="bg-surface font-bold" value="oldest">
                                        {a.oldest}
                                    </SelectItem>
                                    <SelectItem className="bg-surface font-bold" value="popular">
                                        {a.popular}
                                    </SelectItem>
                                    <SelectItem className="bg-surface font-bold" value="expensive">
                                        {a.expensive}
                                    </SelectItem>
                                    <SelectItem className="bg-surface font-bold" value="cheap">
                                        {a.cheap}
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex items-center gap-6">
                        <button onClick={() => setIsRow(true)}>
                            <Linear className={`cursor-pointer ${isRow ? "fill-Primary-400" : "fill-Gray-700"}`}/>
                        </button>
                        <button onClick={() => setIsRow(false)}>
                            <Element className={`cursor-pointer ${!isRow ? "fill-Primary-400" : "fill-Gray-700"}`}/>
                        </button>
                    </div>
                </div>
            </div>

            <div
                className={`grid ${isRow ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"} items-center gap-4 w-full`}>
                {!!data?.data?.length ?
                    isLoading ? <Spinner/> :
                        data?.data?.map((i) => (
                            category_slug === "recruitment" ?
                                <JobSearch key={i.id} link={link} isRow={isRow} d={d} item={i}/> :
                                <Card key={i.id} link={link} isRow={isRow} i={i} d={d}/>
                        )) : <p className="col-span-3 text-center text-Gray-950 lg:text-lg">{a.not_found}</p>}
            </div>

            <AdvPagination setPage={goToPage} totalPages={data?.last_page} page={page}/>
        </div>
    );
};

export default AdvsRes;
