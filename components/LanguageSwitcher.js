"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const languages = [
  { code: "fa", label: "FA" },
  { code: "en", label: "EN" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleChangeLang = (lang) => {
    const currentUrl = new URL(window.location.href);

    const segments = currentUrl.pathname.split("/");
    segments[1] = lang;

    const newPath = segments.join("/");
    const query = currentUrl.search;

    router.push(newPath + query);
  };

  return (
    <div className="lg:fixed top-4 left-4 z-50">
      <div className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="bg-white text-black shadow px-3 py-1 rounded-full hover:bg-gray-200 transition"
        >
          🌐 زبان
        </button>

        {open && (
          <div className="absolute top-full mt-2 left-0 bg-white shadow rounded w-20 overflow-hidden">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  handleChangeLang(lang.code);
                  setOpen(false);
                }}
                className="block w-full text-black text-center px-2 py-1 hover:bg-gray-100 text-sm"
              >
                {lang.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
