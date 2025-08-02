"use client";
import { StaticImageData } from "next/image";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
// images icons
import Link from "next/link";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import Eye from "@/assets/icons/eye.svg";
gsap.registerPlugin(useGSAP);

const MobileHero = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");

  const intervalRef = useRef(null);
  const handleNext = () => {
    setDirection("right");
    setActiveIndex((prev) => (prev + 1) % slides.length);
  };
  const handlePrev = () => {
    setDirection("left");
    setActiveIndex((prev) => (prev - 1) % slides.length);
  };
  const currentSlide = slides[activeIndex] ?? slides[0];
  const imageRef = useRef(null);

  useGSAP(() => {
    if (imageRef.current) {
      const fromX = direction === "right" ? 100 : -100;
      const toX = 0;

      gsap.fromTo(
        imageRef.current,
        { x: fromX, opacity: 0 },
        { x: toX, opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, [activeIndex, direction]);

  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, []);

  const startAutoSlide = () => {
    stopAutoSlide(); // Prevent duplicate intervals
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length);
    }, 4000); // Every 4 seconds
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };
  const { theme } = useTheme();

  return (
    <div className="relative flex font-['yekanbakh'] flex-col items-center h-[590px] mt-10 w-full rounded-tr-[4rem] rounded-bl-[4rem] bg-[#4299C1] lg:hidden">
      <div
        onClick={handlePrev}
        className="p-2 rounded-full bg-[#000000] absolute top-1/2 left-0 cursor-pointer transition-all hover:scale-105 duration-300 dark:bg-white"
      >
        <ArrowLeft className="fill-white dark:fill-black" />
      </div>
      <div
        onClick={handleNext}
        className="p-2 rounded-full bg-[#000000] absolute top-1/2 right-0 cursor-pointer transition-all hover:scale-105 duration-300 dark:bg-white"
      >
        <ArrowRight className="fill-white dark:fill-black" />
      </div>
      <div ref={imageRef}>
        {" "}
        <Image
          key={currentSlide.id}
          alt=""
          src={currentSlide.image}
          width={300}
          className="py-6 cursor-pointer transition-all hover:scale-105 duration-300"
        ></Image>
      </div>

      <div className="flex flex-col items-center">
        <h2 className="font-[600] mt-4 text-2xl text-[#ffffff] dark:text-[#000000]">
          {currentSlide.title}
        </h2>
        <span className="font-regular text-[#ffffff] dark:text-[#000000] text-center mt-6 px-10 text-lg">
          {currentSlide.content}
        </span>

        <Link
          href={`/`}
          className="flex flex-row items center justify-around px-8 py-3.5 bg-[#ffffff] rounded-lg mt-10 gap-2 dark:bg-[#000]"
        >
          <span className="text-[#4299C1] dark:text-[#295775] font-[600]">
            مشاهده آگهی
          </span>
          <Eye className=" dark:fill-[#295775] fill-[#4299C1]" />
        </Link>
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-10 bg-[#000000]"
                  : "w-1.5 bg-gray-400 hover:bg-gray-500"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MobileHero;
