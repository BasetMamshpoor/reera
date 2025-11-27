"use client";
import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectValue,
} from "@/components/ui/select";
import { useFormContext } from "react-hook-form";

const EditPropertyInformation = ({ a }) => {
    const { register, setValue, getValues } = useFormContext();

    return (
        <div className="flex flex-col gap-4 lg:gap-6 w-full">
            <p className="lg:text-xl font-medium text-Primary-950">{a.property_information}</p>
            <div className="flex flex-col gap-2 lg:gap-3 w-full">
                <p className="text-sm lg:text-base text-Gray-700 font-medium">{a.transaction_type}</p>
                <div className="flex items-center gap-2 lg:gap-3">
                    <Checkbox checked={true} className="!w-6 !h-6" />
                    <p className="text-sm lg:text-base text-secondary">{getValues("transactionType")}</p>
                </div>
            </div>
            <div className="flex flex-col gap-2 lg:gap-3 w-full">
                <p className="text-sm lg:text-base text-Gray-700 font-medium">{a.property_type}</p>
                <div className="flex items-center gap-2 lg:gap-3">
                    <Checkbox checked={true} className="!w-6 !h-6" />
                    <p className="text-sm lg:text-base text-secondary">{getValues("propertyType")}</p>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                <Input
                    type="text"
                    placeholder={a.area}
                    defaultValue={getValues("area")}
                    {...register("area")}
                    className="border-Gray-600"
                />
                <Select
                    defaultValue={getValues("yearBuilt")}
                    onValueChange={(val) => setValue("yearBuilt", val)}
                >
                    <SelectTrigger className="w-full border border-Gray-600 rounded-lg py-1">
                        <SelectValue placeholder={a.year_built} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="1380">1380</SelectItem>
                            <SelectItem value="1390">1390</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select
                    defaultValue={getValues("numberOfFloors")}
                    onValueChange={(val) => setValue("numberOfFloors", val)}
                >
                    <SelectTrigger className="w-full border border-Gray-600 rounded-lg py-1">
                        <SelectValue placeholder={a.number_of_floors} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="4">4</SelectItem>
                            <SelectItem value="5">5</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select
                    defaultValue={getValues("numberOfRooms")}
                    onValueChange={(val) => setValue("numberOfRooms", val)}
                >
                    <SelectTrigger className="w-full border border-Gray-600 rounded-lg py-1">
                        <SelectValue placeholder={a.number_of_rooms} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectItem value="2">2</SelectItem>
                            <SelectItem value="3">3</SelectItem>
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default EditPropertyInformation;
