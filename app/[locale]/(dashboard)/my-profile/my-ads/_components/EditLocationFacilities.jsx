"use client"
import React from 'react';
import { useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const EditLocationFacilities = ({ a }) => {
    const { register, watch, setValue, getValues } = useFormContext();

    const selected = watch("facilities") || [];

    const handleChange = (name, checked) => {
        let updated;
        if (checked) {
            updated = [...selected, name];
        } else {
            updated = selected.filter((val) => val !== name);
        }
        setValue("facilities", updated);
    };

    const check = [
        {name: "elevator", label: a.elevator},
        {name: "parking", label: a.parking},
        {name: "storage", label: a.storage},
        {name: "balcony_terrace", label: a.balcony_terrace},
        {name: "cooling_system", label: a.cooling_system},
        {name: "heating_system", label: a.heating_system},
        {name: "open_kitchen", label: a.open_kitchen},
        {name: "cabinets", label: a.cabinets},
        {name: "flooring", label: a.flooring},
        {name: "security_door", label: a.security_door},
        {name: "double_glazed_windows", label: a.double_glazed_windows},
        {name: "fire_alarm_extinguishing", label: a.fire_alarm_extinguishing},
        {name: "security_guard", label: a.security_guard},
        {name: "cctv", label: a.cctv},
        {name: "backup_generator", label: a.backup_generator},
        {name: "master_room", label: a.master_room},
        {name: "meeting_hall", label: a.meeting_hall},
        {name: "gym", label: a.gym},
        {name: "pool_sauna_jacuzzi", label: a.pool_sauna_jacuzzi},
        {name: "fiber_optic_internet", label: a.fiber_optic_internet},
    ];

    return (
        <div className="flex flex-col gap-4 lg:gap-6 w-full">
            <p className="lg:text-xl font-medium text-Primary-950">{a.location_facilities}</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <Select defaultValue={getValues("country")} onValueChange={(val) => setValue("country", val)}>
                    <SelectTrigger className="w-full lg:col-span-2 border border-Gray-600 rounded-lg py-1">
                        <SelectValue placeholder={a.country} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="ترکیه">ترکیه</SelectItem>
                            <SelectItem value="ایران">ایران</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select defaultValue={getValues("city")} onValueChange={(val) => setValue("city", val)}>
                    <SelectTrigger className="w-full border border-Gray-600 rounded-lg py-1">
                        <SelectValue placeholder={a.city} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="استانبول">استانبول</SelectItem>
                            <SelectItem value="آنکارا">آنکارا</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Input
                    type="text"
                    placeholder={a.region}
                    {...register("region")}
                    className="border border-Gray-600"
                />
                <Input
                    type="text"
                    placeholder={a.address}
                    {...register("address")}
                    className="border border-Gray-600 lg:col-span-2"
                />
            </div>

            <div className="flex flex-col w-full gap-3">
                <p className="text-Gray-700 text-base">{a.property_facilities}</p>
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 w-full">
                    {check.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 lg:gap-3">
                            <Checkbox
                                checked={selected.includes(item.name)}
                                onCheckedChange={(checked) => handleChange(item.name, checked)}
                                className="!w-6 !h-6"
                            />
                            <span className="text-sm lg:text-base text-secondary">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col w-full gap-3">
                <p className="text-Gray-700 text-base">{a.residency_status}</p>
                <div className="flex items-center gap-2 lg:gap-3">
                    <Checkbox checked={true} className="!w-6 !h-6" />
                    <p className="text-sm lg:text-base text-secondary">قابل تحویل از تاریخ</p>
                </div>
                <Input
                    type="text"
                    defaultValue={getValues("residencyDate")}
                    {...register("residencyDate")}
                    placeholder={a.date}
                    className="border border-Gray-600 w-full md:w-1/2 pt-1"
                />
            </div>
        </div>
    );
};

export default EditLocationFacilities;
