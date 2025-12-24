"use client";
import React, {useState} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {RadioGroup} from "@/components/ui/radio-group";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import Image from "next/image";
import {Swiper, SwiperSlide} from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import {FreeMode, Navigation, Thumbs, Pagination} from "swiper/modules";
import Clock from "@/assets/icons/clock.svg";

const SwiperModal = ({data}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleOpenSwiper = (active) => {
        setIsActive(active);
        setIsDialogOpen(true);
    };

    // Safe array access
    const images = Array.isArray(data?.image) ? data.image : [];
    const hasImages = images.length > 0;

    return (
        <>
            <div className="relative lg:hidden select-none scrollbar-hide">
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        el: ".swiper-pagination-ads",
                    }}
                    modules={[Pagination]}
                    className="mySwiper w-full max-h-[300px] md:max-h-[450px] h-full"
                >
                    {hasImages ? (
                        images.slice(0, 4).map((item, index) => (
                            <SwiperSlide key={index} className="relative">
                                <Image
                                    src={item}
                                    unoptimized
                                    alt="Photo"
                                    width={100}
                                    height={100}
                                    className="w-full h-full"
                                />
                                <div
                                    className="absolute top-3 right-3 flex items-center gap-2 bg-Gray-200 text-Gray-700 text-sm px-3 py-1 rounded-lg">
                                    <Clock className="fill-Gray-700 !w-5 !h-5"/>
                                    <span className="text-sm pt-1">
                                      {data?.time}
                                    </span>
                                </div>
                            </SwiperSlide>
                        ))
                    ) : (
                        <SwiperSlide className="relative">
                            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span>No images available</span>
                            </div>
                        </SwiperSlide>
                    )}
                    <div
                        className="swiper-pagination-ads absolute bottom-3 left-0  right-0 flex justify-center items-center gap-2 z-10 w-full bg-transparent"></div>
                </Swiper>
            </div>

            <div className="hidden lg:grid gap-6 w-full ">
                {hasImages && images.length >= 3 ? (
                    <div className="grid grid-cols-3 grid-rows-2 gap-6 w-full max-h-[520px] h-full">
                        {images[0] && (
                            <div
                                onClick={() => handleOpenSwiper(true)}
                                className="relative col-span-2 row-span-2 flex items-center justify-center border border-default-divider rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={images[0]}
                                    unoptimized
                                    alt={`Photo`}
                                    width={100}
                                    height={100}
                                    className="w-screen h-full object-cover"
                                />
                            </div>
                        )}
                        {images[1] && (
                            <div
                                onClick={() => handleOpenSwiper(true)}
                                className="flex items-center justify-center rounded-xl border border-default-divider overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={images[1]}
                                    unoptimized
                                    alt={`Photo`}
                                    width={100}
                                    height={100}
                                    className="w-screen h-full object-cover"
                                />
                            </div>
                        )}
                        {images[2] && (
                            <div
                                onClick={() => handleOpenSwiper(true)}
                                className="relative flex items-center justify-center rounded-xl border border-default-divider overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={images[2]}
                                    unoptimized
                                    alt={`Photo`}
                                    width={100}
                                    height={100}
                                    className="w-screen h-full object-cover"
                                />
                                {images.length > 3 && (
                                    <div
                                        className="absolute inset-0 bg-black/60 w-full h-full flex border border-default-divider items-center justify-center">
                                        <div className="relative !w-10 !h-10">
                                            <Image
                                                src={"/images/Maximize Icon.png"}
                                                alt="photo"
                                                width={100}
                                                height={100}
                                                className="w-full h-full"
                                            />
                                            <div
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base font-semibold whitespace-nowrap">
                                                {images.length - 3} +
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ) : (
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                            el: ".swiper-pagination-ads",
                        }}
                        modules={[Pagination]}
                        className="mySwiper max-w-[950px] w-full max-h-[520px] rounded-xl border border-default-divider"
                    >
                        {hasImages ? (
                            images.slice(0, 4).map((item, index) => (
                                <SwiperSlide key={index} className="relative">
                                    <Image
                                        src={item}
                                        unoptimized
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className="w-full h-full"
                                    />
                                    <div
                                        className="absolute top-3 right-3 flex items-center gap-2 bg-Gray-200 text-Gray-700 text-sm px-3 py-1 rounded-lg">
                                        <Clock className="fill-Gray-700 !w-5 !h-5"/>
                                        <span className="text-sm pt-1">
                                           {data?.time}
                                         </span>
                                    </div>
                                </SwiperSlide>
                            ))
                        ) : (
                            <SwiperSlide className="relative">
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                    <span>No images available</span>
                                </div>
                            </SwiperSlide>
                        )}
                        <div
                            className="swiper-pagination-ads absolute bottom-3 left-0  right-0 flex justify-center items-center gap-2 z-10 w-full bg-transparent"></div>
                    </Swiper>
                )}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="flex flex-col gap-6 p-4 ">
                    <DialogHeader>
                        <VisuallyHidden>
                            <DialogTitle></DialogTitle>
                        </VisuallyHidden>
                    </DialogHeader>

                    <div className="flex flex-col gap-5 w-full h-full pt-4 select-none">
                        <RadioGroup className="flex flex-col gap-3 w-full h-full scrollbar-hide">
                            <Swiper
                                style={{
                                    "--swiper-navigation-color": "#fff",
                                    "--swiper-pagination-color": "#fff",
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={
                                    thumbsSwiper && !thumbsSwiper.destroyed
                                        ? {swiper: thumbsSwiper}
                                        : undefined
                                }
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2 w-full h-[90%]"
                            >
                                {hasImages ? (
                                    images.map((item, index) => (
                                        <SwiperSlide
                                            key={index}
                                            className="rounded-xl overflow-hidden border border-default-divider"
                                        >
                                            <Image
                                                src={item}
                                                unoptimized
                                                alt="Photo"
                                                width={100}
                                                height={100}
                                                className="w-full h-full object-cover"
                                            />
                                        </SwiperSlide>
                                    ))
                                ) : (
                                    <SwiperSlide className="rounded-xl overflow-hidden border border-default-divider">
                                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                            <span>No images available</span>
                                        </div>
                                    </SwiperSlide>
                                )}
                            </Swiper>

                            {hasImages && (
                                <Swiper
                                    onSwiper={setThumbsSwiper}
                                    loop={true}
                                    spaceBetween={10}
                                    slidesPerView={7}
                                    freeMode={true}
                                    watchSlidesProgress={true}
                                    modules={[FreeMode, Navigation, Thumbs]}
                                    className="mySwiper w-full h-1/10"
                                >
                                    {images.map((item, index) => (
                                        <SwiperSlide
                                            key={index}
                                            className="rounded-lg overflow-hidden"
                                        >
                                            <Image
                                                src={item}
                                                unoptimized
                                                alt="Photo"
                                                width={88}
                                                height={88}
                                                className="w-full h-full"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>
                            )}
                        </RadioGroup>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SwiperModal;
