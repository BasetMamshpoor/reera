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
import TreeCategory from "@/components/ui/TreeCategory";
import {Slider} from "@/components/ui/slider";

const VisaFilterContent = ({
                               categoryTree,
                               filters,
                               handleChange,
                               priceRangeFromAPI,
                               modelsData,
                               allData,
                               brands,
                               yearRangeFromAPI,
                               functionRangeFromAPI
                           }) => {
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
                            onCategorySelect={(id) => handleChange("category_id", id)}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>{s.price_range || "year Range"}</Label>
                <Slider
                    value={[filters.min_year, filters.max_year]}
                    min={yearRangeFromAPI?.min}
                    max={yearRangeFromAPI?.max}
                    step={1}
                    onValueChange={([min, max]) => {
                        handleChange("min_year", min);
                        handleChange("max_year", max);
                    }}
                />
                <div className="flex gap-2 mt-2">
                    <Input
                        value={filters.min_year}
                        onChange={(e) =>
                            handleChange(
                                "min_year",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder="Min year"
                    />
                    <Input
                        value={filters.max_year}
                        onChange={(e) =>
                            handleChange(
                                "max_year",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder="Max year"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <Label>{s.price_range || "function Range"}</Label>
                <Slider
                    value={[filters.min_function, filters.max_function]}
                    min={functionRangeFromAPI?.min}
                    max={functionRangeFromAPI?.max}
                    step={1}
                    onValueChange={([min, max]) => {
                        handleChange("min_function", min);
                        handleChange("max_function", max);
                    }}
                />
                <div className="flex gap-2 mt-2">
                    <Input
                        value={filters.min_function}
                        onChange={(e) =>
                            handleChange(
                                "min_function",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder="Min function"
                    />
                    <Input
                        value={filters.max_function}
                        onChange={(e) =>
                            handleChange(
                                "max_function",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder="Max function"
                    />
                </div>
            </div>


            <div className="flex flex-col gap-2 w-full">
                <Label>{d.currency || "ارز"}</Label>
                <Select
                    value={filters.currency_id}
                    onValueChange={(val) => handleChange("currency_id", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={d.select_currency || "انتخاب ارز"}/>
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
                <div className="flex gap-2 mt-2">
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

                <div className="flex flex-col gap-2 w-full">
                    <Label>{s.brand || "برند"}</Label>
                    <Select
                        value={filters.brand_id}
                        onValueChange={(val) => handleChange("brand_id", val)}
                    >
                        <SelectTrigger className="w-full border border-default-divider rounded-lg">
                            <SelectValue placeholder={s.select_brand || "انتخاب برند"} />
                        </SelectTrigger>
                        <SelectContent>
                            {brands?.map((b) => (
                                <SelectItem key={b.id} value={b.id}>
                                    {b.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div className="flex flex-col gap-2 w-full">
                    <Label>{s.model || "مدل"}</Label>
                    <Select
                        value={filters.model_id}
                        onValueChange={(val) => handleChange("model_id", val)}
                        disabled={!filters.brand_id}
                    >
                        <SelectTrigger className="w-full border border-default-divider rounded-lg">
                            <SelectValue placeholder={s.select_model || "انتخاب مدل"} />
                        </SelectTrigger>
                        <SelectContent>
                            {modelsData?.map((m) => (
                                <SelectItem key={m.id} value={m.id}>
                                    {m.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
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
};

export default VisaFilterContent;
