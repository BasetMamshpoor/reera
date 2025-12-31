import React, { useState, useMemo } from "react";
import { ChevronDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";

// Sample countries data (you can replace this with API data later)
const countries = [
  { code: "+98", name: "Iran", flag: "🇮🇷", countryCode: "IR" },
  { code: "+1", name: "United States", flag: "🇺🇸", countryCode: "US" },
  { code: "+44", name: "United Kingdom", flag: "🇬🇧", countryCode: "GB" },
  { code: "+971", name: "UAE", flag: "🇦🇪", countryCode: "AE" },
  { code: "+90", name: "Turkey", flag: "🇹🇷", countryCode: "TR" },
  { code: "+49", name: "Germany", flag: "🇩🇪", countryCode: "DE" },
  { code: "+33", name: "France", flag: "🇫🇷", countryCode: "FR" },
  { code: "+81", name: "Japan", flag: "🇯🇵", countryCode: "JP" },
  { code: "+86", name: "China", flag: "🇨🇳", countryCode: "CN" },
  { code: "+91", name: "India", flag: "🇮🇳", countryCode: "IN" },
  { code: "+7", name: "Russia", flag: "🇷🇺", countryCode: "RU" },
  { code: "+55", name: "Brazil", flag: "🇧🇷", countryCode: "BR" },
];

const PhoneInput = ({ value, onChange, className, ...props }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    if (!searchTerm) return countries;
    return countries.filter(
      (country) =>
        country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.includes(searchTerm) ||
        country.countryCode.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsOpen(false);
    setSearchTerm("");
    // Update the full phone number when country changes
    const newValue = country.code + phoneNumber.replace(/^\+\d+/, "");
    onChange?.(newValue);
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    // Remove any non-digit characters except plus
    const cleanedValue = inputValue.replace(/[^\d+]/g, "");
    setPhoneNumber(cleanedValue);

    // Combine country code with phone number
    const fullNumber =
      selectedCountry.code + cleanedValue.replace(/^\+\d+/, "");
    onChange?.(fullNumber);
  };

  return (
    <div
      dir="ltr"
      className={cn(
        "relative flex items-center border border-input rounded-md bg-background w-full",
        className
      )}
    >
      {/* Country Code Select */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-2 border-r border-input hover:bg-Gray-50 transition-colors cursor-pointer"
        >
          <span className="text-lg">{selectedCountry.flag}</span>
          <span className="text-sm">{selectedCountry.code}</span>
          <ChevronDown
            className={cn(
              "w-4 h-4 opacity-50 transition-transform",
              isOpen && "rotate-180"
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 mt-1 w-64 bg-surface border border-default-divider rounded-md shadow-lg z-10 overflow-hidden">
            {/* Search Input */}
            <div className="p-2 border-b border-default-divider">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-Gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 border border-Gray-200 rounded-md text-sm outline-none focus:ring-2 focus:ring-Primary-400 focus:border-transparent"
                />
              </div>
            </div>

            {/* Countries List */}
            <div className="max-h-60 overflow-y-auto">
              {/* Custom scrollbar styles */}
              <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                  width: 6px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                  background: #f1f1f1;
                  border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                  background: #c1c1c1;
                  border-radius: 3px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                  background: #a8a8a8;
                }
              `}</style>

              <div className="custom-scrollbar">
                {filteredCountries.length === 0 ? (
                  <div className="px-4 py-3 text-sm text-Gray-500 text-center">
                    No countries found
                  </div>
                ) : (
                  filteredCountries.map((country) => (
                    <button
                      key={country.countryCode}
                      type="button"
                      onClick={() => handleCountrySelect(country)}
                      className="w-full flex items-center gap-3 px-4 py-2 text-left hover:bg-Gray-50 transition-colors cursor-pointer border-b border-Gray-100 last:border-b-0"
                    >
                      <span className="text-lg">{country.flag}</span>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium text-Gray-900 truncate">
                          {country.name}
                        </div>
                        <div className="text-xs text-Gray-500">
                          {country.code}
                        </div>
                      </div>
                      {selectedCountry.countryCode === country.countryCode && (
                        <div className="w-2 h-2 bg-Primary-400 rounded-full" />
                      )}
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Phone Number Input */}
      <input
        type="tel"
        value={phoneNumber}
        onChange={handlePhoneChange}
        placeholder="Enter phone number"
        className="flex-1 px-3 py-2 outline-none bg-transparent placeholder:text-gray-400"
        {...props}
      />
    </div>
  );
};

export default PhoneInput;
