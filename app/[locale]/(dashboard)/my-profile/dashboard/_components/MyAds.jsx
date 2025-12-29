import React from 'react';
import Null from "./Null";
import JobSearch from "./JobSearch";
import Home from "./Home";
import FilterCategory from "@/app/[locale]/(dashboard)/my-profile/_components/FilterCategory";

const MyAds = ({ data, isLoading, d, refetch, tab,setSelected ,selected }) => {


    const isEmpty = !data?.data || data.data.length === 0;

    return (
        <>
            <div className="flex flex-col gap-6 lg:gap-10 w-full px-6 lg:px-0 py-4">
                <FilterCategory setSelected={setSelected} selected={selected}/>
                {!isEmpty ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        {data?.data?.map((item) => (item.custom_info?.type === "recruitment" ?
                                <JobSearch item={item} tab={tab} isLoading={isLoading} refetch={refetch} d={d}/> :
                                <Home item={item} tab={tab} isLoading={isLoading} refetch={refetch}/>
                        ))}
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