"use client";
import React, { useEffect, useRef, useState, useLayoutEffect } from "react";
import CountriesPage from "@/app/[locale]/countries/CountriesPage";
import CategoriesSelect from "./CategoriesSelect";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import SearchIcon from "@/assets/icons/search.svg";
import Category from "@/assets/icons/search/category-2.svg";
import { ChevronDown, ChevronLeft, ChevronUp } from "lucide-react";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import Arrowright from "@/assets/icons/arrow-right.svg";
import Arrowdown from "@/assets/icons/arrow-down.svg";
import Location from "@/assets/icons/location.svg";

import DesktopSearchLayer from "./DesktopSearchLayer";
import { gsap } from "gsap";

const DesktopSearch = () => {
  const [searchUIState, setSearchUIState] = useState("default");
  const wrapperRef = useRef(null);
  const searchLayerRef = useRef(null);
  const categoryLayerRef = useRef(null);
  const locationLayerRef = useRef(null);
  const searchTimeline = useRef(null);
  const categoryTimeline = useRef(null);
  const locationTimeline = useRef(null);
  const isAnimating = useRef(false);

  // Close all dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        handleLayersClose("search");
        handleLayersClose("category");
        handleLayersClose("location");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // GSAP animation setup
  useEffect(() => {
    if (searchUIState === "search" && searchLayerRef.current) {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          setSearchUIState("default"); // only hide after animation
        },
      });

      tl.fromTo(
        searchLayerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }
      );

      searchTimeline.current = tl;
      requestAnimationFrame(() => tl.play(0)); // ensure DOM is ready
    }
    if (searchUIState === "category" && categoryLayerRef.current) {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          setSearchUIState("default"); // only hide after animation
        },
      });

      tl.fromTo(
        categoryLayerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }
      );

      categoryTimeline.current = tl;
      requestAnimationFrame(() => tl.play(0)); // ensure DOM is ready
    }
    if (searchUIState === "location" && locationLayerRef.current) {
      const tl = gsap.timeline({
        paused: true,
        onReverseComplete: () => {
          setSearchUIState("default"); // only hide after animation
        },
      });

      tl.fromTo(
        locationLayerRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.2, ease: "power2.out" }
      );

      locationTimeline.current = tl;
      requestAnimationFrame(() => tl.play(0)); // ensure DOM is ready
    }
  }, [searchUIState]);

  const handleLayersOpen = (layer) => {
    if (layer === "search" && searchUIState !== "search") {
      setSearchUIState("search");
    }
    if (layer === "category" && searchUIState !== "category") {
      setSearchUIState("category");
    }
    if (layer === "location" && searchUIState !== "location") {
      setSearchUIState("location");
    }
  };

  const handleLayersClose = (layer) => {
    if (layer === "search") {
      if (searchTimeline.current) {
        searchTimeline.current.reverse();
      } else {
        setSearchUIState("default");
      }
    } else if (layer === "category") {
      if (categoryTimeline.current) {
        categoryTimeline.current.reverse();
      } else {
        setSearchUIState("default");
      }
    } else if (layer === "location") {
      if (locationTimeline.current) {
        locationTimeline.current.reverse();
      } else {
        setSearchUIState("default");
      }
    }
  };

  const toggleLayer = (layer) => {
    if (isAnimating.current) return;

    isAnimating.current = true;

    if (searchUIState === layer) {
      handleLayersClose(layer);
    } else {
      setSearchUIState(layer);
    }

    setTimeout(() => {
      isAnimating.current = false;
    }, 300); // prevent spam clicks during animation
  };

  return (
    <div
      ref={wrapperRef}
      className="hidden relative md:flex flex-row items-center justify-between w-full gap-2 z-[7]"
    >
      {/* Nationality select */}
      <div className="flex-2">
        <Select>
          <SelectTrigger className="border-none text-[#000000] shadow-none font-[600] font-['yekanbakh'] text-md dark:bg-[#14181d] cursor-pointer">
            <SelectValue className="text-right" placeholder="انتخاب ملیت" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="light">انتخاب ملیت</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Search input */}
      <div className="relative w-full group">
        <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none transition-opacity duration-200 group-focus-within:opacity-0 fill-gray-500" />

        <div className="relative w-full z-0">
          <Input
            className="placeholder:text-right py-6 placeholder:font-['yekanbakh'] placeholder:font-[200] placeholder:pr-8 border-gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 dark:bg-[#374151] focus:outline-0 dark:placeholder:text-white"
            placeholder="جستجو"
            onFocus={() => handleLayersOpen("search")}
          />
          <button
            onClick={() => toggleLayer("location")}
            className="absolute left-0 -translate-y-1/2 top-1/2 px-4 py-1.5 z-10 flex flex-row items-center gap-2 text-gray-500 cursor-pointer"
          >
            {searchUIState === "location" ? (
              <Arrowleft className="fill-gray-500 dark:fill-white" />
            ) : (
              <Arrowdown className="fill-gray-500 dark:fill-white" />
            )}
            <span className="dark:text-white">انتخاب موقعیت</span>

            <div className="w-0.5 bg-[#4299C1] h-full py-2" />
            <Location className="dark:fill-white fill-gray-500" />
          </button>

          {searchUIState === "location" && (
            <div
              ref={locationLayerRef}
              tabIndex={-1}
              className="absolute left-0 top-full w-full bg-[#fff] h-68 z-50 rounded-lg p-4 dark:bg-[#252C36] shadow-sm flex flex-row justify-end scroll-hidden text-right "
            >
              <CountriesPage />
            </div>
          )}
          {searchUIState === "search" && (
            <div
              ref={searchLayerRef}
              tabIndex={-1}
              className="absolute left-0 top-full mt-0.5 w-full bg-white dark:bg-[#252C36] shadow-sm rounded-md p-4 z-50 h-68 overflow-y-scroll scroll-hidden"
            >
              <DesktopSearchLayer />
            </div>
          )}
        </div>
      </div>

      {/* Category select */}
      <div
        onClick={() => toggleLayer("category")}
        className="flex flex-row flex-2 gap-2 w-full items-center"
      >
        <button
          className={`flex flex-row items-center gap-2 w-40 cursor-pointer rounded-md py-4 ${
            searchUIState === "category" ? "bg-white dark:bg-[#252C36]" : ""
          }`}
        >
          {searchUIState === "category" ? (
            <Arrowdown className="fill-gray-500 dark:fill-white" />
          ) : (
            <Arrowleft className="fill-gray-500 dark:fill-white" />
          )}
          <span>دسته بندی ها</span>
        </button>
        <Category />
      </div>

      {searchUIState === "category" && (
        <div
          ref={categoryLayerRef}
          className="absolute top-12 right-0 w-310 bg-[#fff] dark:bg-[#252C36] shadow-sm rounded-md px-4 py-6 z-50 h-60 flex scroll-hidden flex-row gap-2 justify-end mt-1.5"
        >
          <CategoriesSelect />
        </div>
      )}
    </div>
  );
};

export default DesktopSearch;
