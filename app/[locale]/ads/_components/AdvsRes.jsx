"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import Linear from "@/assets/icons/linear.svg";
import Element from "@/assets/icons/Element.svg";
import ColAds from "./ColAds";
import RowsAds from "./RowsAds";
import AdvPagination from "@/components/AdvPagination";
import { useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useRouter } from "next/navigation";

const AdvsRes = ({ page }) => {
  const router = useRouter();
  const [isRow, setIsRow] = useState(false);
  // const [page, setPage] = useState(1);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["advs", page],
    queryFn: () =>
      request({
        url: "/ads",
        method: "get",
        query: { page },
      }),
  });
  const goToPage = (newPage) => {
    router.push(`?page=${newPage}`);
  };

  // if (isLoading) return <h2> در حال بارگزاری</h2>;

  return (
    <div className="flex items-center flex-col gap-6 w-full">
      <div className="flex flex-col gap-10 w-full">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 w-fit">
            <p className="text-base font-bold dark:text-[#D9EDF4]">
              نمایش آگهی:
            </p>
            <Select className="">
              <SelectTrigger className="border-none shadow-none gap-2 font-bold">
                <SelectValue placeholder="جدیدترین" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup className="bg-white">
                  <SelectItem className="bg-white font-bold" value="apple">
                    پربازدیدترین
                  </SelectItem>
                  <SelectItem className="bg-white font-bold" value="apple1">
                    جدیدترین
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-6">
            <button onClick={() => setIsRow(true)}>
              <Linear
                className={`${isRow ? "fill-blue-500" : "fill-gray-700"}`}
              />
            </button>
            <button onClick={() => setIsRow(false)}>
              <Element
                className={`${!isRow ? "fill-blue-500" : "fill-gray-700"}`}
              />
            </button>
          </div>
        </div>
      </div>
      {isRow ? (
        <ColAds data={data?.results || []} isRow={isRow} />
      ) : (
        <RowsAds data={data?.results || []} isRow={isRow} />
      )}
      <AdvPagination
        setPage={goToPage}
        totalPages={data?.total_pages}
        page={page}
      />
    </div>
  );
};

export default AdvsRes;
