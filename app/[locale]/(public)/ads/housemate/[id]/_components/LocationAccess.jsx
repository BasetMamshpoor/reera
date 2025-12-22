import React, {useState} from 'react';
import Shop from "@/assets/icons/shop.svg"
import Hospital from "@/assets/icons/hospital.svg"
import Taxi from "@/assets/icons/taxi.svg"
import Bus from "@/assets/icons/bus.svg"
import Gas from "@/assets/icons/gasStation.svg"
import Airplane from "@/assets/icons/airplane.svg"
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Spinner from "@/components/Spinner";
import dynamic from "next/dynamic";


const LocationAccess = ({data, isLoading}) => {
    const ShowMap = dynamic(() => import("@/components/ShowMap.jsx"), {
        ssr: false,
    })
    const dic = useTranslation()
    const b = dic.public.ads.roommate
    return (
        <>
            {isLoading ?
                <div className="flex items-center justify-center w-full pt-6">
                    <Spinner/>
                </div> :
                <div className="flex flex-col w-full gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                    <ShowMap latitude={data?.address.latitude} longitude={data?.address.longitude}/>
                    {data?.distance && <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-x-20 w-full">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Shop className="fill-Gray-700"/>
                                <p className="text-Gray-700 pt-1">{b.distance_shopping_center}</p>
                            </div>
                            <p className="font-medium text-secondary pt-1">{data?.distance.distance_from_shopping_center} {b.kilometer}</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Hospital className="fill-Gray-700"/>
                                <p className="text-Gray-700 pt-1">{b.distance_hospital}</p>
                            </div>
                            <p className="font-medium text-secondary pt-1">{data?.distance.distance_from_hospital} {b.kilometer}</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Taxi className="fill-Gray-700"/>
                                <p className="text-Gray-700 pt-1">{b.distance_taxi}</p>
                            </div>
                            <p className="font-medium text-secondary pt-1">{data?.distance.distance_from_taxi_stand} {b.kilometer}</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Bus className="fill-Gray-700"/>
                                <p className="text-Gray-700 pt-1">{b.distance_bus}</p>
                            </div>
                            <p className="font-medium text-secondary pt-1">{data?.distance.distance_from_bus_station} {b.kilometer}</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Gas className="fill-Gray-700"/>
                                <p className="text-Gray-700 pt-1">{b.distance_gas_station}</p>
                            </div>
                            <p className="font-medium text-secondary pt-1">{data?.distance.distance_from_gas_station} {b.kilometer}</p>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Airplane className="fill-Gray-700"/>s
                                <p className="text-Gray-700 pt-1">{b.distance_airport}</p>
                            </div>
                            <p className="font-medium text-secondary pt-1">{data?.distance.distance_from_airport} {b.kilometer}</p>
                        </div>
                    </div>
                    }                </div>
            }
        </>
    );
};

export default LocationAccess;