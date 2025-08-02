"use client";
import countries from "@/data/dist/json/countries.json";
import { useState } from "react";

export default function AdvCountries() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <>
      <div className="flex flex-row justify-end gap-4">
        <div className="text-right scroll-hidden">
          {/* Provinces List (if selected country has provinces) */}
          {selectedCountry?.provinces && (
            <ul className="flex flex-col gap-2 w-auto border-gray-400 py-2 items-end">
              {selectedCountry.provinces.map((province) => (
                <li
                  key={province.id}
                  className={`py-4 text-right self-center px-2 text-sm text-gray-700 cursor-pointer dark:text-[#fff]`}
                >
                  {province.name}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="text-right ">
          {/* Countries List */}
          <ul className="w-44 border-l border-gray-400 py-2 ">
            {countries.map((country) => (
              <li
                key={country.code}
                onClick={() => setSelectedCountry(country)}
                className={`text-right py-2 cursor-pointer px-2  ${
                  selectedCountry?.code === country.code
                    ? "bg-[#F0F9FB] dark:bg-[#142738] border-r-2 border-[#4299C1] font-[600] text-[#4299C1]"
                    : " text-gray-600 dark:text-[#fff]"
                } `}
              >
                {country.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
