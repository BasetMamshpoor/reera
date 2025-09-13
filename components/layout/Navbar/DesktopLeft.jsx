"use client";
import React from "react";
import Add from "@/assets/icons/add.svg";
import ProfileAdd from "@/assets/icons/profile-add.svg";
import Message from "@/assets/icons/message.svg";
import Moon from "@/assets/icons/moon.svg";
import Sun from "@/assets/icons/sun.svg";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const DesktopLeft = ({}) => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { locale } = useParams();
  const dic = useTranslation();
  const n = dic.navbar;
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="hidden md:flex flex-row gap-2 lg:gap-4 items-center">
      <Link href={`/${locale}/profile`}>Profile</Link>
      <button
        aria-label="Add Profile"
        className="bg-transparent cursor-pointer border-2 border-gray-500 dark:border-white p-2.5 rounded-lg"
      >
        {mounted && <ProfileAdd className="dark:fill-white fill-black" />}
      </button>

      <button
        aria-label="Messages"
        className="bg-transparent border-2 border-gray-500 dark:border-white p-2.5 rounded-lg cursor-pointer"
      >
        {mounted && <Message className="dark:fill-white fill-black" />}
      </button>
      <Link
        href={`${locale}/registeradd`}
        className="bg-black dark:bg-white px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer"
      >
        <span className="text-white dark:text-black font-normal">
          {n.register_ad}
        </span>
        {mounted && <Add className="fill-white dark:fill-black" />}
      </Link>
      {mounted && (
        <button
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          {theme === "light" ? (
            <Moon className="fill-gray-800 cursor-pointer" />
          ) : (
            <Sun className="fill-white cursor-pointer" />
          )}
        </button>
      )}
    </div>
  );
};

export default DesktopLeft;
