"use client";
import React from "react";
import Moon from "@/assets/icons/moon.svg";
import Global from "@/assets/icons/global.svg";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";

const MobileLeft = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const languages = [
    { code: "fa", label: "FA" },
    { code: "en", label: "EN" },
  ];
  const handleChangeLang = (lang) => {
    const currentUrl = new URL(window.location.href);

    const segments = currentUrl.pathname.split("/");
    segments[1] = lang;

    const newPath = segments.join("/");
    const query = currentUrl.search;

    router.push(newPath + query);
  };
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="md:hidden flex items-center gap-3 relative">
      {mounted && (
        <button
          className="cursor-pointer"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Moon className="dark:fill-white" />
        </button>
      )}
      <Global
        onClick={() => setOpen(!open)}
        className="dark:fill-white cursor-pointer"
      />
      {open && (
        <div className="absolute top-6 mt-2 start-2 bg-white shadow rounded w-20 overflow-hidden">
          {languages?.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                handleChangeLang(lang.code);
                setOpen(false);
              }}
              className="block w-full text-black text-center px-2 py-1 hover:bg-gray-100 text-sm cursor-pointer"
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MobileLeft;
