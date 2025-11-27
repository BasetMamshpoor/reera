"use client";
import countries from "@/data/dist/json/countries.json";
import { useState } from "react";

export default function CountriesPage() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  return (
    <>
      <div className="flex flex-row justify-end gap-4">
        <div className="text-right scroll-hidden">
          {/* Provinces List (if selected country has provinces) */}
          {selectedCountry?.provinces && (
            <ul className="grid grid-cols-5 gap-x-5 w-auto border-Gray-400 py-2 items-end">
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
        <div className="text-right ">
          {/* Countries List */}
          <ul className="w-44 border-l border-Gray-400 py-2 ">
            {countries.map((country) => (
              <li
                key={country.code}
                onClick={() => setSelectedCountry(country)}
                className={`text-right py-2 cursor-pointer px-2  ${
                  selectedCountry?.code === country.code
                    ? "bg-Primary-50  border-r-2 border-Primary-400 font-[600] text-Primary-400"
                    : " text-Gray-600 "
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
