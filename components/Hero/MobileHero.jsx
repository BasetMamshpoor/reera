"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
// images icons
import Link from "next/link";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";
import Eye from "@/assets/icons/eye.svg";

// Import Swiper components and styles
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

gsap.registerPlugin(useGSAP);

const MobileHero = ({ slides }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState("right");
  const swiperRef = useRef(null);
  const imageRef = useRef(null);

  const handleNext = () => {
    setDirection("right");
    swiperRef.current?.slideNext();
  };

  const handlePrev = () => {
    setDirection("left");
    swiperRef.current?.slidePrev();
  };

  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  const goToSlide = (index) => {
    swiperRef.current?.slideToLoop(index);
  };

  return (
    <div className="relative flex flex-col items-center h-220 max-h-110 w-full rounded-tr-[4rem] rounded-bl-[4rem] bg-[#4299C1] lg:hidden">
      {/* Navigation Arrows */}
      <div
        onClick={handlePrev}
        className="p-2 rounded-full bg-[#000000] absolute top-1/2 left-0 cursor-pointer transition-all hover:scale-105 duration-300 dark:bg-white z-10"
      >
        <ArrowLeft className="fill-alphaw-100 dark:fill-black" />
      </div>
      <div
        onClick={handleNext}
        className="p-2 rounded-full bg-[#000000] absolute top-1/2 right-0 cursor-pointer transition-all hover:scale-105 duration-300 dark:bg-white z-10"
      >
        <ArrowRight className="fill-alphaw-100 dark:fill-black" />
      </div>

      {/* Swiper Slider */}
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        onSlideChange={handleSlideChange}
        onSlideChangeTransitionStart={(swiper) => {
          // Set direction based on slide movement
          if (swiper.params.direction === "horizontal") {
            setDirection(swiper.swipeDirection === "next" ? "right" : "left");
          }
        }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        speed={500}
        className="w-full h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={slide.id || index}>
            <div className="flex flex-col items-center w-full h-full pt-6">
              {/* Image with GSAP animation */}
              <div ref={index === activeIndex ? imageRef : null}>
                <Image
                  alt=""
                  src={slide.image}
                  width={300}
                  height={200}
                  className="py-6 cursor-pointer transition-all hover:scale-105 duration-300"
                />
              </div>

              {/* Content Section */}
              <div className="flex flex-col items-center px-4 pb-6">
                <h2 className="font-[600] text-2xl text-[#ffffff] dark:text-[#000000] text-center">
                  {slide.title}
                </h2>
                <span className="font-regular text-[#ffffff] dark:text-[#000000] text-center px-4 text-lg mt-2">
                  {slide.content}
                </span>

                {/* <Link
                  href={`/`}
                  className="flex flex-row items-center justify-around px-8 py-3.5 bg-[#ffffff] rounded-lg gap-2 dark:bg-[#000] mt-4"
                >
                  <span className="text-[#4299C1] dark:text-[#295775] font-[600]">
                    مشاهده آگهی
                  </span>
                  <Eye className="dark:fill-[#295775] fill-[#4299C1]" />
                </Link> */}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Pagination Dots */}
      <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              activeIndex === index
                ? "w-10 bg-[#000000]"
                : "w-1.5 bg-gray-400 hover:bg-gray-500"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default MobileHero;
