"use client";
import React from "react";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent, SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Switch} from "@/components/ui/switch";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import TreeCategory from "@/components/ui/TreeCategory";
import {Slider} from "@/components/ui/slider";
import Spinner from "@/components/Spinner";

const HousingFilterContent = ({
                                  categoryTree,
                                  filters,
                                  handleChange,
                                  priceRangeFromAPI,
                                  allData,
                                  yearRangeFromAPI,
                                  areaRangeFromAPI,
                                  bedroomsOptions,
                                  bathroomsOptions,
                                  s,

                              }) => {
    console.log(bedroomsOptions)
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

            <div className="flex flex-col gap-4 w-full">
                <Label>{s.bathrooms}</Label>
                <Select
                    value={filters.bathroom.toString()}
                    onValueChange={(val) => handleChange("bathroom", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={s.number_of_bathrooms}/>
                    </SelectTrigger>
                    <SelectContent>
                        {bathroomsOptions?.map((b) => (
                            <SelectItem key={b.id} value={b.id.toString()}>
                                {b.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <Label>{s.bedrooms}</Label>
                <Select
                    value={filters.bedrooms.toString()}
                    onValueChange={(val) => handleChange("bedrooms", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={s.number_of_bedrooms}/>
                    </SelectTrigger>
                    <SelectContent>
                        {bedroomsOptions?.map((m) => (
                            <SelectItem key={m.id} value={m.id}>
                                {m.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <Label>{s.currency}</Label>
                <Select
                    value={filters.currency_id.toString()}
                    onValueChange={(val) => handleChange("currency_id", val)}
                >
                    <SelectTrigger className="w-full border border-default-divider rounded-lg">
                        <SelectValue placeholder={s.select_currency}/>
                    </SelectTrigger>
                    <SelectContent>
                        {allData?.currency?.map((c) => (
                            <SelectItem key={c.id} value={c.id.toString()}>
                                {c.title} ({c.code})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>

            <div className="flex flex-col gap-4">
                <Label>{s.price_range}</Label>
                <Slider
                    value={[filters?.min_price, filters.max_price]}
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

            <div className="flex flex-col gap-4">
                <Label>{s.year_range}</Label>
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
                        placeholder={filters.min_year}
                    />
                    <Input
                        value={filters.max_year}
                        onChange={(e) =>
                            handleChange(
                                "max_year",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder={filters.max_year}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-4 ">
                <Label>{s.area_range || "area Range"}</Label>
                <Slider
                    value={[filters.min_area, filters.max_area]}
                    min={areaRangeFromAPI?.min}
                    max={areaRangeFromAPI?.max}
                    step={1}
                    onValueChange={([min, max]) => {
                        handleChange("min_area", min);
                        handleChange("max_area", max);
                    }}
                />
                <div className="flex gap-2 mt-2">
                    <Input
                        value={filters.min_area}
                        onChange={(e) =>
                            handleChange(
                                "min_area",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder={areaRangeFromAPI.min}
                    />
                    <Input
                        value={filters.max_area}
                        onChange={(e) =>
                            handleChange(
                                "max_area",
                                Number(e.target.value.replace(/,/g, ""))
                            )
                        }
                        placeholder={areaRangeFromAPI.max}
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

export default HousingFilterContent;
