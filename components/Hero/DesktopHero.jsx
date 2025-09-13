"use client";

import LogoSpin from "../layout/Navbar/LogoSpin";
import { useIsMounted } from "@/hooks/useIsMounted";
import { useTheme } from "next-themes";
import React, { useEffect, useRef, useState } from "react";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import Image from "next/image";
import Link from "next/link";

import Eye from "@/assets/icons/eye.svg";

const DesktopHero = ({ slides }) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);
  const handleNext = () => {
    stopAutoSlide();
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };
  const handlePrev = () => {
    stopAutoSlide();
    setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };
  const currentSlide = slides[activeIndex] ?? slides[0];
  const mounted = useIsMounted();

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  return (
    <div className="hidden relative w-full h-150 mt-12 lg:flex flex-row rtl:flex-row-reverse">
      <LogoSpin />
      <div className="absolute h-full w-1/2 rounded-tr-[100px] bg-[#4299C1] z-[3] rounded-bl-[100px] flex justify-center items-center p-12">
        <Image src={currentSlide.image} alt="" className=":hover"></Image>
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#ffffff]/60 rounded-4xl w-30 h-12 shadow-sm flex flex-row gap-4 justify-center items-center dark:bg-[#000000]/60">
          <button
            onClick={handlePrev}
            className="bg-black dark:bg-[#ffffff] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <ArrowLeft className="fill-white dark:fill-black rtl:rotate-180" />
          </button>
          <button
            onClick={handleNext}
            className="bg-black dark:bg-[#ffffff] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
          >
            <ArrowRight className="fill-white dark:fill-black rtl:rotate-180" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-0 h-1/2 w-full bg-[#4299C1] rounded-bl-[100px]"></div>
      <div className="bg-inherit absolute z-[1] h-full w-1/2 right-0 bottom-0.5 rounded-bl-[100px]"></div>
      <div className="bg-[#4299C1] absolute h-1/2 z-[1] left-0 w-1/2 rounded-tr-[100px]"></div>
      <div className="bg-[#f9fafb] dark:bg-[#14181d] absolute h-full z-[3] w-1/2 right-0 rounded-bl-[100px] bottom-0.5 flex flex-col justify-center items-center px-10 gap-10">
        <h2 className="text-right font-[600] text-5xl ltr:self-end rtl:self-start dark:text-[#ffffff]">
          {currentSlide.title}
        </h2>
        <span className="text-right self-end pl-50 text-2xl">
          {currentSlide.content}
        </span>
        <Link
          href={`/`}
          className="flex flex-row items-center justify-center gap-4 bg-[#4299C1] px-8 py-3 ltr:self-end rtl:self-start cursor-pointer rounded-lg "
        >
          <span className="text-[#ffffff] dark:text-[#000000] font-[600]">
            مشاهده آگهی
          </span>
          <Eye className="fill-white dark:fill-black" />
        </Link>
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2 bg-[#ffffff] px-2 dark:bg-[#14181d]">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-10 bg-[#000000] dark:bg-[#ffffff]"
                  : "w-1.5 bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default DesktopHero;
