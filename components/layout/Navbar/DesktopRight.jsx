"use client";
import React, { useState } from "react";
import Image from "next/image";
import Global from "@/assets/icons/global.svg";
import { useRouter } from "next/navigation";
const DesktopRight = () => {
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
  return (
    <div className="hidden lg:flex flex-row gap-4 items-center relative">
      <Image src="/images/logo.png" alt="" width={68} height={80} />
      <Global
        onClick={() => setOpen(!open)}
        className="fill-gray-800 dark:fill-white cursor-pointer"
      />

      {open && (
        <div className="absolute start-28 top-2 mt-2 bg-white shadow rounded w-20 overflow-hidden">
          {languages.map((lang) => (
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

export default DesktopRight;
