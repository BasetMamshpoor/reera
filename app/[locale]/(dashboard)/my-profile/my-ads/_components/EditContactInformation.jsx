"use client"
import React from 'react';
import {useFormContext} from "react-hook-form";
import {Checkbox} from "@/components/ui/checkbox"; // CNS Checkbox

const EditContactInformation = ({a}) => {
    const {watch, setValue, getValues} = useFormContext();

    const selected = watch("contactMethods") || [];

    const handleChange = (method, checked) => {
        let updated;
        if (checked) {
            updated = [...selected, method];
        } else {
            updated = selected.filter((m) => m !== method);
        }
        setValue("contactMethods", updated);
    };

    return (
        <div className="flex flex-col gap-3 w-full">
            <p className="text-Primary-950 text-xl font-medium">{a.contact_information}</p>

            <div className="flex items-center gap-3">
                <Checkbox
                    checked={selected.includes("chat")}
                    onCheckedChange={(checked) => handleChange("chat", checked)}
                    className="!w-6 !h-6"
                />
                <span className="text-sm lg:text-base text-secondary">{a.reera_chat_message}</span>
            </div>

            <div className="flex items-center gap-3">
                <Checkbox
                    checked={selected.includes("phone")}
                    onCheckedChange={(checked) => handleChange("phone", checked)}
                    className="!w-6 !h-6"
                />
                <span className="text-sm lg:text-base text-secondary">{a.call_number} {getValues("phoneNumber")}</span>
            </div>
        </div>
    );
};

export default EditContactInformation;
