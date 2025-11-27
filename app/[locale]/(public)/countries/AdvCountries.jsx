"use client";
import countries from "@/data/dist/json/countries.json";
import { useState } from "react";

export default function AdvCountries() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <>
      <div className="flex flex-row gap-4">
        <div className="rtl:text-right text-left">
          {/* Countries List */}
          <ul className="w-44 border-r-[1px] border-Gray-400 rtl:border-r-0 rtl:border-l-[1px] rtl:border-Gray-400 py-3 px-2">
            {countries.map((country) => (
              <li
                key={country.code}
                onClick={() => setSelectedCountry(country)}
                className={`rtl:text-right py-2 cursor-pointer px-2  ${
                  selectedCountry?.code === country.code
                    ? "bg-Primary-50 border-l-2 border-Primary-400 rtl:border-l-0 rtl:border-r-2 rtl:border-Primary-400 font-[600] text-Primary-400"
                    : " text-Gray-600 dark:text-white"
                } `}
              >
                {country.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="rtl:text-right scroll-hidden">
          {/* Provinces List (if selected country has provinces) */}
          {selectedCountry?.provinces && (
            <ul className="flex flex-col gap-2 w-auto border-Gray-400 py-2 items-end">
              {selectedCountry.provinces.map((province) => (
                <li
                  key={province.id}
                  className={`py-4 text-right self-center px-2 text-sm text-Gray-700 cursor-pointer `}
                >
                  {province.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
