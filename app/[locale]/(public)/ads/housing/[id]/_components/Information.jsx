import React from 'react';
import Spinner from "@/components/Spinner"
import Facilities from "./Facilities";


const Information = ({a, data, isLoading}) => {

    return (
        <>
            {isLoading ?
                <div className="flex items-center justify-center w-full pt-4">
                    <Spinner/>
                </div> :
                <div className="flex flex-col gap-10">
                    <div
                        className="flex flex-col gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                        <div className="flex w-full flex-col lg:flex-row gap-4">
                            <p className="lg:hidden text-base text-[#3B3E46]">
                                {a.general_info}
                            </p>
                            <div className="flex flex-col lg:flex-row gap-2 lg:w-1/3">
                                <p className="text-sm text-Gray-700">
                                    {a.contract_type}
                                </p>
                                <p className="text-sm text-secondary font-medium">{data?.category_parent}</p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2 lg:w-1/3">
                                <p className="text-sm lg:text-base text-Gray-700">
                                    {a.property_type}
                                </p>
                                <p className="text-sm lg:text-lg text-secondary font-medium">
                                    {data?.category}
                                </p>
                            </div>
                            <div className="flex flex-col lg:flex-row gap-2 lg:w-1/3">
                                <p className="text-sm lg:text-base text-Gray-700">
                                    {a.area}
                                </p>
                                <p className="text-sm lg:text-lg text-secondary font-medium">
                                    {data?.area} {a.meter}
                                </p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col lg:flex-row gap-4">
                            <div className="flex gap-2 lg:w-1/3 flex-col lg:flex-row">
                                <p className="text-sm lg:text-base text-Gray-700">
                                    {a.bedrooms}
                                </p>
                                <p className="text-sm lg:text-lg text-secondary font-medium">
                                    {data?.number_of_bedrooms}
                                </p>
                            </div>
                            {/*<div className="flex gap-2 lg:w-1/3 flex-col lg:flex-row">*/}
                            {/*    <p className="text-sm lg:text-base text-Gray-700">*/}
                            {/*        {a.floor}*/}
                            {/*    </p>*/}
                            {/*    <p className="text-sm lg:text-lg text-secondary font-medium">*/}
                            {/*        2 از 5*/}
                            {/*    </p>*/}
                            {/*</div>*/}
                        </div>
                        <div className="flex gap-2 flex-col lg:flex-row">
                            <p className="text-sm lg:text-base text-Gray-700">
                                {a.address}
                            </p>
                            <p className="text-sm lg:text-lg text-secondary font-medium">
                                {data?.address?.full_address}
                            </p>
                        </div>
                        <div className="flex gap-2 flex-col lg:flex-row">
                            <p className="text-sm lg:text-base text-Gray-700">
                                {a.description}
                            </p>
                            <p className="text-sm lg:text-lg text-secondary font-medium whitespace-pre-line">{data?.text}</p>
                        </div>
                        <div className="flex gap-2 flex-col w-full">
                            <p className="text-sm lg:text-base text-Gray-700">
                                {a.facilities}
                            </p>
                            <Facilities data={data} isLoading={isLoading} a={a}/>
                        </div>
                    </div>
                </div>}
        </>
    );
};

export default Information;