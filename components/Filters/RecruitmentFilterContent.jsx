"use client";
import React from "react";
import {Checkbox} from "@/components/ui/checkbox";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent, SelectGroup,
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
import {useParams} from "next/navigation";
import TreeCategory from "@/components/ui/TreeCategory";
import {Slider} from "@/components/ui/slider";

// Memoize to prevent unnecessary re-renders
const RecruitmentFilterContent = ({
                                      categoryTree,
                                      filters,
                                      handleChange,
                                      priceRangeFromAPI,
                                      allData,
                                      languages,
                                      workType,
                                      degrees
                                  }) => {
    console.log(languages);
    const dic = useTranslation();
    const s = dic.all_ads.sidebar;
    const d = dic.public.register_ad.trip;
    const formatPrice = (price) => new Intl.NumberFormat().format(price);

    return (
        <div className="flex flex-col gap-4 p-6 lg:p-0">
            {/* Categories */}
            <div className="flex flex-col gap-3">
                <p className="rtl:text-right text-Gray-700 font-medium">{s.categories_of}</p>
                <div className="border border-Gray-200 rounded-lg p-3 bg-gray-50/50 max-h-80 overflow-y-auto">
                    {categoryTree?.map((cat) => (
                        <TreeCategory
                            key={cat.id}
                            category={cat}
                            selectedCategory={filters.category_id}
                            onCategorySelect={(id) => handleChange("recruitment_categories_id", id)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label>{s.workType|| "نوع همکاری"}</Label>
                <Select
                    value={filters.cooperation}
                    onValueChange={(val) => handleChange("cooperation", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={s.select_workType || "انتخاب نوع همکاری"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {workType?.map((b) => (
                            <SelectItem key={b.id} value={b.id}>
                                {b.title}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label>{s.degree || "مدرک"}</Label>
                <Select
                    value={filters.degree}
                    onValueChange={(val) => handleChange("degree", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={s.select_degree || "انتخاب مدرک"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {degrees?.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                                {m.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label>{s.languages || "زبان"}</Label>
                <Select
                    value={filters.languages_id}
                    onValueChange={(val) => handleChange("languages_id", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={s.select_languages || "انتخاب زبان"}/>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {languages?.map((item) =>
                                <SelectItem key={item.id} value={item.id}>{item.title}</SelectItem>
                            )}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2 w-full">
                <Label>{s.currency || "ارز"}</Label>
                <Select
                    value={filters.currency_id}
                    onValueChange={(val) => handleChange("currency_id", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={d.select_currency || "انتخاب ارز"}/>
                    </SelectTrigger>
                    <SelectContent>
                        {allData?.currency?.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString}>
                                {c.title} ({c.code})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-2">
                <Label>{s.price_range || "Price Range"}</Label>
                <Slider
                    disabled={!filters.currency_id}
                    value={[filters.min_price, filters.max_price]}
                    min={priceRangeFromAPI?.min}
                    max={priceRangeFromAPI?.max}
                    step={1000}
                    onValueChange={([min, max]) => {
                        handleChange("min_price", min);
                        handleChange("max_price", max);
                    }}
                />
                <div className="flex gap-2">
                    <Input
                        disabled={!filters.currency_id}
                        value={formatPrice(filters.min_price)}
                        onChange={(e) =>
                            handleChange(
                                "min_price",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder="Min price"
                    />
                    <Input
                        disabled={!filters.currency_id}
                        value={formatPrice(filters.max_price)}
                        onChange={(e) =>
                            handleChange(
                                "max_price",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder="Max price"
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

export default RecruitmentFilterContent;
