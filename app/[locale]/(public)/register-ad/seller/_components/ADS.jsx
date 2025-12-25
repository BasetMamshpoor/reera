"use client"
import React, {useState} from 'react';
import JobSearch from "@/components/Advertisements/JobSearch";
import Card from "@/app/[locale]/(public)/ads/_components/Card";
import {useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import AdvPagination from "@/components/AdvPagination";

const Ads = ({id, locale}) => {
    const dic = useTranslation();
    const d = dic.public.profile.dashboard;
    const [page, setPage] = useState()
    const {data, isLoading} = useQuery({
        queryKey: [`seller`, "user_show", "ads", id, page],
        queryFn: async () => {
            return await request({
                url: `/user_show/ads/${id}`,
                method: "get",
                query:{page}
            })
        }
    });
    const i = data?.data || []

    if (isLoading) {
        return <div className="w-full flex items-center justify-center py-4">
            <Spinner size={40}/>
        </div>;
    }

    return (
        <>
            <div
                className={`grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-y-10 mt-10 overflow-hidden sm:grid-cols-2 sm:gap-x-4 px-6 xl:px-0 lg:gap-x-6`}
            >
                {!!i?.length? i.map((ad) =>
                    ad?.root_category_slug === "recruitment" ?
                        <JobSearch key={ad.id} item={ad} link={`${locale}/ads`} d={d}/> :
                        <Card key={ad.id} i={ad} link={`/${locale}/ads`}/>
                ):<p className="text-center">{d.not_found}</p>}
            </div>
            {/*<AdvPagination setPage={setPage} totalPages={data?.last_page} page={page}/>*/}
        </>
    );
};

export default Ads;