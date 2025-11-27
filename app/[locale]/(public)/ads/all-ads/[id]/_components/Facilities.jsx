"use client";
import React, {useState} from "react";
import Sofa from "@/assets/icons/sofa.svg";
import Kitchen from "@/assets/icons/Kitchen.svg";
import Washing from "@/assets/icons/Washing machine.svg";
import Bathroom from "@/assets/icons/Bathroom.svg";
import Elevator from "@/assets/icons/Elevator.svg";
import Balcony from "@/assets/icons/Balcony.svg";
import Parking from "@/assets/icons/Parking.svg";
import Monitor from "@/assets/icons/Monitor.svg";
import Wifi from "@/assets/icons/Wifi.svg";
import System from "@/assets/icons/Heating system.svg";
import Wc from "@/assets/icons/WC.svg";
import SafeHome from "@/assets/icons/SafeHome.svg";
import Cardano from "@/assets/icons/Cardano.svg";
import Windows from "@/assets/icons/Windows.svg";
import Video from "@/assets/icons/Video.svg";
import Electricity from "@/assets/icons/Electricity.svg";
import Home from "@/assets/icons/home-hashtag.svg";
import Ball from "@/assets/icons/global.svg";
import HomeTrendUp from "@/assets/icons/HomeTrendUp.svg";
import Alarm from "@/assets/icons/Alarm.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";

const Facilities = ({data}) => {
    const dic = useTranslation();
    const a = dic.public.ads.facilities;
    const [showAll, setShowAll] = useState(false);

    const facilities = [
        data?.facilities.master_bedroom === 1 && {icon: <Sofa/>, label: a.master_room},
        data?.facilities.system === 1 && {icon: <Alarm/>, label: a.fire_alarm_system},
        data?.facilities.security_guard === 1 && {icon: <HomeTrendUp/>, label: a.guard_lobby},
        data?.facilities.gym === 1 && {icon: <Ball/>, label: a.gym_fitness},
        data?.facilities.cabinets === 1 && {icon: <Windows/>, label: a.cabinets},
        data?.facilities.open_kitchen === 1 && {icon: <Kitchen/>, label: a.open_kitchen},
        data?.facilities.cooling === 1 && {icon: <Cardano/>, label: a.cooling_system},
        data?.facilities.pool === 1 && {icon: <Bathroom/>, label: a.pool_sauna_jacuzzi},
        data?.facilities.elevator === 1 && {icon: <Elevator/>, label: a.elevator},
        data?.facilities.balcony === 1 && {icon: <Balcony/>, label: a.balcony_terrace},
        data?.facilities.storage === 1 && {icon: <SafeHome/>, label: a.storage},
        data?.facilities.parking === 1 && {icon: <Parking/>, label: a.parking},
        data?.facilities.internet === 1 && {icon: <Wifi/>, label: a.fiber_internet},
        data?.facilities.heating === 1 && {icon: <System/>, label: a.heating_system},
        data?.facilities.generator === 1 && {icon: <Electricity/>, label: a.backup_generator},
        data?.facilities.cctv === 1 && {icon: <Video/>, label: a.cctv},
        data?.facilities.guest_hall === 1 && {icon: <Home/>, label: a.meeting_guest_room},
        data?.facilities.flooring === 1 && {icon: <Electricity/>, label: a.floor_ceramic_parquet},
        data?.facilities.security_door === 1 && {icon: <Electricity/>, label: a.security_door},
        data?.facilities.double_glazed_windows === 1 && {icon: <Electricity/>, label: a.double_glazed_windows},
    ].filter(Boolean);

    const visibleFacilities = showAll ? facilities : facilities.slice(0, 3);

    return (
        <div className="w-full">
            <div className="hidden lg:grid grid-cols-3 gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                {facilities.map((item, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="fill-Gray-950 w-6 h-6">{item.icon}</div>
                        <p className="text-base text-secondary font-medium pt-1">{item.label}</p>
                    </div>
                ))}
            </div>

            <div className="flex lg:hidden flex-col gap-6 px-4 py-6 bg-surface rounded-2xl shadow">
                <p className="text-secondary font-semibold text-lg">امکانات</p>
                <div className="flex flex-wrap w-full">
                    {visibleFacilities.map((item, index) => (
                        <div key={index} className="flex items-center flex-col gap-3 w-1/3 mb-4">
                            <div className="w-6 h-6 fill-Gray-950">{item.icon}</div>
                            <p className="text-base text-secondary font-medium text-center pt-1">{item.label}</p>
                        </div>
                    ))}
                </div>

                {facilities.length > 3 && (
                    <button
                        onClick={() => setShowAll(!showAll)}
                        className="text-Primary-400 font-bold mt-3"
                    >
                        {showAll ? "بستن" : "نمایش همه جزئیات"}
                    </button>
                )}
            </div>
        </div>
    );
};

export default Facilities;
