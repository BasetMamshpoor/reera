"use client";
import { useState } from "react";
import Search from "@/assets/icons/search.svg";
import Arrowdown from "@/assets/icons/arrow-down.svg";
import Location from "@/assets/icons/location.svg";

export default function CitySearch({ onSelectCity }) {
  const [citySearch, setCitySearch] = useState("");
  const [cities, setCities] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedCityName, setSelectedCityName] = useState("انتخاب موقعیت");

  const searchCities = async (query) => {
    if (query.length < 3) return;

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=5dbc14529740e3038bd2868ebedd41b7`
      );
      const data = await response.json();

      const formattedCities = data.map((city) => ({
        label: `${city.name}, ${city.country}`, // ✅ no coordinates
        name: city.name,
        lat: city.lat,
        lon: city.lon,
      }));

      const uniqueCities = formattedCities.filter(
        (city, index, self) =>
          index === self.findIndex((c) => c.label === city.label)
      );

      setCities(uniqueCities);
      setShowDropdown(true);
    } catch (error) {
      console.error("Error searching cities:", error);
    }
  };

  const handleSelect = (city) => {
    setCitySearch(city.label);
    setSelectedCityName(city.name); // ✅ Update location button text
    setShowDropdown(false);
    onSelectCity({ lat: city.lat, lon: city.lon });
  };

  return (
    <div className="absolute top-10 px-4 w-full z-50 mx-auto ">
      <div className="relative group w-full">
        <Search className="absolute top-1/2 -translate-y-1/2 start-2 dark:fill-white group-focus-within:opacity-0" />
        <input
          type="text"
          placeholder="ورودی"
          className="w-full px-4  py-2 border bg-surface placeholder:text-black  rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500  placeholder:px-6 focus:placeholder:opacity-0"
          value={citySearch}
          onChange={(e) => {
            setCitySearch(e.target.value);
            searchCities(e.target.value);
          }}
        />
        {/* <button className="flex flex-row items-center justify-center gap-2 w-40 h-full z-[1] absolute left-2 top-1/2 -translate-y-1/2 cursor-pointer">
          <Location className="dark:fill-white" />
          <span>{selectedCityName}</span>
          <Arrowdown className="dark:fill-white" />
        </button> */}
      </div>

      {showDropdown && cities.length > 0 && (
        <ul className="absolute w-full mt-1 border border-Gray-200 bg-surface rounded-md shadow-lg max-h-60 overflow-y-auto z-50">
          {cities.map((city, index) => (
            <li
              key={index}
              onClick={() => handleSelect(city)}
              className="px-4 py-2 text-Black dark:text-White cursor-pointer text-sm"
            >
              {city.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
