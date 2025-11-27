"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Linear from "@/assets/icons/linear.svg";
import Element from "@/assets/icons/Element.svg";
import ColAds from "./ColAds";

import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "../../../../TranslationContext";

const AdvsRes = ({ page }) => {
  const [isRow, setIsRow] = useState(false);
  const dic = useTranslation();
  const a = dic.all_ads.sidebar;
  const searchParams = useSearchParams();

  const search = searchParams.get("search");
  const categoryId = searchParams.get("category_id");
  const categoryIds = searchParams.get("category_ids");
  const countryId = searchParams.get("country_id");
  const cityId = searchParams.get("city_id");
  const currencyId = searchParams.get("currency_id");
  const minPrice = searchParams.get("min_price");
  const maxPrice = searchParams.get("max_price");

  const queryParams = {
    category_slug: "digital",
    page: page,
    ...(search && { search: search }),
    ...(categoryId && { category_id: categoryId }),
    ...(categoryIds && { category_ids: categoryIds }),
    ...(countryId && { country_id: countryId }),
    ...(cityId && { city_id: cityId }),
    ...(currencyId && { currency_id: currencyId }),
    ...(minPrice && { min_price: minPrice }),
    ...(maxPrice && { max_price: maxPrice }),
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["digital-ads", queryParams], // Include all params in queryKey for proper caching
    queryFn: async () =>
      await request({
        url: `/ads`,
        method: "get",
        query: queryParams,
      }),
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-8 w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center py-8">
        <p className="text-red-500">Error loading ads: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="flex items-center flex-col gap-6 w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex items-center justify-between w-full px-4 lg:mx-0">
          <div className="flex items-center gap-3 w-fit">
            <p className="text-Text-Primary font-bold "> {a.show_ads}:</p>
            <Select className="">
              <SelectTrigger className="border-none shadow-none gap-2 font-bold data-[placeholder]:text-Text-Secondary">
                <SelectValue placeholder={a.newest} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-white">
                  <SelectItem
                    className="bg-white font-bold"
                    value="most-viewed"
                  >
                    {a.newest}
                  </SelectItem>
                  <SelectItem className="bg-white font-bold" value="newest">
                    {a.most_viewed}
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsRow(true)}>
              <Linear
                className={`cursor-pointer ${
                  isRow ? "fill-Primary-400" : "fill-Gray-700"
                }`}
              />
            </button>
            <button onClick={() => setIsRow(false)}>
              <Element
                className={`cursor-pointer ${
                  !isRow ? "fill-Primary-400" : "fill-Gray-700"
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      <ColAds data={data?.data || []} isRow={isRow} />
      {/* 
      <AdvPagination
        setPage={goToPage}
        totalPages={data?.total_pages}
        page={page}
      /> */}
    </div>
  );
};

export default AdvsRes;
