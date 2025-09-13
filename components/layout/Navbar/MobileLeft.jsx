"use client";
import React from "react";
import Image from "next/image";
import Moon from "@/assets/icons/moon.svg";
import Global from "@/assets/icons/global.svg";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const MobileLeft = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <div className="md:hidden flex items-center gap-3">
      {mounted && (
        <button
          className="cursor-pointer"
          aria-label="Toggle theme"
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
        >
          <Moon className="dark:fill-white" />
        </button>
      )}
      <Global className="dark:fill-white cursor-pointer" />
    </div>
  );
};

export default MobileLeft;
