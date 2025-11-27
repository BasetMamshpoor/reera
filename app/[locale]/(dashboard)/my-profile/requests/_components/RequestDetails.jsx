"use client";
import React, { createContext, useState } from "react";
import Document from "@/assets/icons/DocumentText.svg";
import { useTranslation } from "../../../../TranslationContext";
import AllRequests from "./AllRequests";
import BuyingSelling from "./BuyingSelling";
import ShortTermRent from "./ShortTermRent";
import LongTermRent from "./LongTermRent";
import Roommate from "./Roommate";
import { Checkbox } from "@/components/ui/checkbox";
import JobEmpleymentRequests from "./JobEmpleymentRequests";

export const FilterContext = createContext();

const RequestDetails = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { id: 0, label: "All" },
    { id: 1, label: "Buying and Selling" },
    { id: 2, label: "Short term rental" },
    { id: 3, label: "Long term rental" },
    { id: 4, label: "Roommate" },
  ];

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const dic = useTranslation();
  const d = dic.dashboard.myprofile.categories;

  const categories = [
    { id: "1", label: d.real_estate },
    { id: "2", label: d.vehicles },
    { id: "3", label: d.digital_goods },
    { id: "4", label: d.home_kitchen },
    { id: "5", label: d.personal_items },
    { id: "6", label: d.tickets_tours },
    { id: "7", label: d.commerce },
    { id: "8", label: d.jobs_employment },
  ];

  // Initialize with "1" (Real Estate) as default
  const [selected, setSelected] = useState(["1"]);

  const toggleCategory = (id) => {
    // If trying to uncheck the last selected category, prevent it
    if (selected.includes(id) && selected.length === 1) {
      return; // Don't allow unchecking the last category
    }

    if (selected.includes(id)) {
      setSelected([]);
    } else {
      setSelected([id]);
    }
  };

  const isRealEstateSelected = selected.includes("1");

  return (
    <FilterContext.Provider value={{ selected, setSelected }}>
      <div className="py-4">
        <div className="flex items-center gap-4 p-8 border-b border-b-default-divider">
          <Document className="fill-Gray-800" />
          <h2 className="text-xl font-semibold">Requests</h2>
        </div>
        <div className="flex flex-col gap-8 p-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {categories.map((cat) => (
              <label
                key={cat.id}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <Checkbox
                  checked={selected.includes(cat.id)}
                  onCheckedChange={() => toggleCategory(cat.id)}
                  className="!w-6 !h-6 cursor-pointer transition-all duration-200 ease-in"
                  // Disable uncheck if this is the only selected category
                  disabled={selected.includes(cat.id) && selected.length === 1}
                />
                <span className="text-base pt-1">{cat.label}</span>
              </label>
            ))}
          </div>

          {/* Conditionally render tabs only when real_estate is selected */}
          {isRealEstateSelected && (
            <div className="flex flex-wrap gap-4 rtl:flex-row-reverse">
              {tabs.map(({ id, label }) => {
                const isActive = activeTab === id;
                return (
                  <button
                    key={id}
                    onClick={() => handleTabClick(id)}
                    className={`w-42 py-2 rounded-lg border cursor-pointer transition-all duration-200 ${
                      isActive
                        ? "bg-Primary-400 text-white border-Primary-500 shadow-md"
                        : "bg-transparent text-Text-Secondary border-default-divider hover:bg-Gray-100 hover:border-Gray-300"
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Conditionally render tab content only when real_estate is selected */}
        {isRealEstateSelected && (
          <>
            {activeTab === 0 && <AllRequests />}
            {activeTab === 1 && <BuyingSelling />}
            {activeTab === 2 && <ShortTermRent />}
            {activeTab === 3 && <LongTermRent />}
            {activeTab === 4 && <Roommate />}
          </>
        )}

        {selected.includes("8") && (
          <>
            <JobEmpleymentRequests />
          </>
        )}
      </div>
    </FilterContext.Provider>
  );
};

export default RequestDetails;
