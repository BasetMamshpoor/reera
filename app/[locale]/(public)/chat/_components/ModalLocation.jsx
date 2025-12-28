"use client";

import React, {useState} from "react";
import {ScrollArea} from "@/components/ui/scroll-area";
import {ReusableDialog} from "@/components/modified_shadcn/Dialog";
import {useCountry} from "@/app/[locale]/CountryProvider";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Global from "@/assets/icons/global.svg";
import {useSearchParams, useRouter, usePathname} from "next/navigation";
import Add from "@/assets/icons/add.svg"

const ModalLocation = () => {
    const {navbar} = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathname = usePathname()
    const {
        countries,
        setCountry_id,
        country_id,
    } = useCountry();

    const handleSelectCountry = (country_id) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("country_id", country_id.toString());
        router.push(`${pathname}?${params.toString()}`);
        setIsOpen(false);
    };

    return (
        <ReusableDialog
            contentProps={{className: "w-full max-w-md"}}
            open={isOpen}
            setOpen={setIsOpen}
            trigger={
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-full flex items-center justify-center gap-2 border border-default-divider cursor-pointer rounded-md py-2 transition-all hover:bg-Primary-100"
                >
                    <p className="pt-1">Global Chats</p>
                    <Global className="fill-Gray-950"/>
                </button>
            }
        >
            <div className="flex items-center justify-between w-full gap-4">

                <h2 className="text-xl font-bold mb-4">
                    {navbar.select_location}
                </h2>
                <button onClick={() => setCountry_id("")}
                        type={"button"}
                        className="flex items-center gap-2 cursor-pointer">
                    <Add className="rotate-45 fill-error-main"/>
                    <p className="text-sm">حذف مکان</p>
                </button>
            </div>

            <ScrollArea>
                <div className="flex flex-col justify-between gap-6 h-80">
                    <div className="flex flex-col gap-2 overflow-y-auto scrollbar-hide">
                        {countries.map((country) => (
                            <button
                                key={country.id}
                                onClick={() => setCountry_id(country.id)}
                                className={`
                                w-full text-left px-4 py-3 rounded-md border
                                transition-colors
                                ${
                                    country_id === country.id
                                        ? "bg-Primary-100 border-Primary-400 text-Primary-600"
                                        : "hover:bg-Gray-50 border-default-divider"
                                }
                            `}
                            >
                                {country.name}
                            </button>
                        ))}
                    </div>
                    <div className="grid grid-cols-2 items-center gap-2 w-full">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="px-4 py-2 w-full cursor-pointer border border-Primary-400 text-Primary-400 rounded-md hover:bg-Primary-50 transition-colors"
                        >
                            انصراف
                        </button>
                        <button
                            onClick={() => handleSelectCountry(country_id)}
                            className="px-4 py-2 w-full cursor-pointer bg-Primary-400 text-alphaw-100 rounded-md hover:bg-Primary-500 transition-colors"
                        >
                            اعمال تغییرات
                        </button>
                    </div>
                </div>
            </ScrollArea>
        </ReusableDialog>
    );
};

export default ModalLocation;
