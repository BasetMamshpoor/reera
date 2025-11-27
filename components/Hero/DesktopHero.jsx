"use client";

import LogoSpin from "../layout/Navbar/LogoSpin";
import {useIsMounted} from "@/hooks/useIsMounted";
import React, {useEffect, useRef, useState} from "react";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import Image from "next/image";
import Link from "next/link";
import Eye from "@/assets/icons/eye.svg";

// Import Swiper components and styles
import {Swiper, SwiperSlide} from "swiper/react";
import {Navigation, Pagination, Autoplay} from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const DesktopHero = ({slides}) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef(null);

    const currentSlide = slides[activeIndex] ?? slides[0];

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.realIndex);
    };

    const handleNext = () => {
        swiperRef.current?.slideNext();
    };

    const handlePrev = () => {
        swiperRef.current?.slidePrev();
    };

    const goToSlide = (index) => {
        swiperRef.current?.slideToLoop(index);
    };

    return (
        <div className="hidden relative w-full h-150 mt-12 lg:flex flex-row rtl:flex-row-reverse">
            {/* Image Slider Section */}
            <div
                className="absolute h-full w-1/2 rounded-tr-[100px] bg-[#4299C1] z-[3] rounded-bl-[100px] flex justify-center items-center p-12">
                <Swiper
                    onSwiper={(swiper) => {
                        swiperRef.current = swiper;
                    }}
                    onSlideChange={handleSlideChange}
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={0}
                    slidesPerView={1}
                    loop={true}
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: true,
                    }}
                    speed={500}
                    className="w-full h-full"
                >
                    {slides.map((slide, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex justify-center items-center w-full h-full">
                                <Image
                                    src={slide.image}
                                    width={200}
                                    height={200}
                                    alt=""
                                    className="hover cursor-pointer"
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Navigation Buttons */}
                <div
                    className="absolute -bottom-6 left-1/2 -translate-x-1/2 bg-[#ffffff]/60 rounded-4xl w-30 h-12 shadow-sm flex flex-row gap-4 justify-center items-center dark:bg-[#000000]/60 z-10">
                    <button
                        onClick={handlePrev}
                        className="bg-black dark:bg-[#ffffff] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                    >
                        <ArrowLeft className="fill-alphaw-100 rtl:rotate-180"/>
                    </button>
                    <button
                        onClick={handleNext}
                        className="bg-black dark:bg-[#ffffff] rounded-full w-8 h-8 flex items-center justify-center cursor-pointer"
                    >
                        <ArrowRight className="fill-alphaw-100 rtl:rotate-180"/>
                    </button>
                </div>
            </div>

            {/* Background Elements */}
            <div className="absolute bottom-0 h-1/2 w-full bg-[#4299C1] rounded-bl-[100px]"></div>
            <div className="bg-inherit absolute z-[1] h-full w-1/2 right-0 bottom-0.5 rounded-bl-[100px]"></div>
            <div className="bg-[#4299C1] absolute h-1/2 z-[1] left-0 w-1/2 rounded-tr-[100px]"></div>

            {/* Content Section - Updates based on activeIndex */}
            <div
                className="bg-[#f9fafb] dark:bg-[#14181d] absolute h-full z-[3] w-1/2 right-0 rounded-bl-[100px] bottom-0.5 flex flex-col justify-center items-center px-10 gap-10">
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
                    <Eye className="fill-white dark:fill-black"/>
                </Link>

                {/* Pagination Dots */}
                <div
                    className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-2 bg-[#ffffff] px-2 dark:bg-[#14181d]">
                    {slides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
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
