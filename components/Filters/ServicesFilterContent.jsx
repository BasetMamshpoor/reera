"use client";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {CheckIcon, ChevronsUpDownIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import SearchIcon from "@/assets/icons/search.svg";
import MultiRangeSlider from "@/components/ui/multirangeslider";
import {Switch} from "@/components/ui/switch";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import TreeCategory from "@/components/ui/TreeCategory";
import {Slider} from "@/components/ui/slider";

const ServicesFilterContent = ({
                                   categoryTree,
                                   filters,
                                   handleChange,
                                   priceRangeFromAPI,
                                   allData,
                                   s
                               }) => {

    return (
        <div className="flex flex-col gap-6 p-6 lg:p-0">
            {/* Categories */}
            <div className="flex flex-col gap-3">
                <p className="rtl:text-right text-Gray-700 font-medium">{s.categories_of}</p>
                <div className="border border-Gray-200 rounded-lg p-3 bg-gray-50/50 max-h-80 overflow-y-auto">
                    {categoryTree?.map((cat) => (
                        <TreeCategory
                            key={cat.id}
                            category={cat}
                            selectedCategory={filters.services_expertise_id}
                            onCategorySelect={(id) => handleChange("services_expertise_id", id)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <Label>{s.currency}</Label>
                <Select
                    value={filters.currency_id}
                    onValueChange={(val) => handleChange("currency_id", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={s.select_currency}/>
                    </SelectTrigger>
                    <SelectContent>
                        {allData?.currency?.map((c) => (
                            <SelectItem key={c.id} value={c.id}>
                                {c.title} ({c.code})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-4">
                <Label>{s.price_range}</Label>
                <Slider
                    value={[filters?.min_price,filters.max_price]}
                    disabled={!filters.currency_id}
                    min={priceRangeFromAPI?.min}
                    max={priceRangeFromAPI?.max}
                    step={1000}
                    onValueChange={([min, max]) => {
                        handleChange("min_price", min);
                        handleChange("max_price", max);
                    }}
                />
                <div className="flex gap-4 mt-2">
                    <Input
                        disabled={!filters.currency_id}
                        value={filters.min_price}
                        onChange={(e) =>
                            handleChange(
                                "min_price",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder={priceRangeFromAPI?.min}
                    />
                    <Input
                        disabled={!filters.currency_id}
                        value={filters.max_price}
                        onChange={(e) =>
                            handleChange(
                                "max_price",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder={priceRangeFromAPI?.max}
                    />
                </div>
            </div>


            {/* Verified */}
            <div className="flex items-center justify-between mt-2">
                <p className="text-lg font-[500] text-Gray-800">{s.verified_ads}</p>
                <Switch
                    checked={filters.verified}
                    onCheckedChange={(val) => handleChange("verified", val)}
                />
            </div>
        </div>
    );
}

export default ServicesFilterContent;
