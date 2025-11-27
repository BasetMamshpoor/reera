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
import Maximize from "@/public/images/Maximize Icon.png"
import Clock from "@/assets/icons/clock.svg"

const SwiperModal = ({data}) => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const handleOpenSwiper = (active) => {
        setIsActive(active);
        setIsDialogOpen(true);
    };


    return (
        <>
            <div className="relative lg:hidden select-none">
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        el: ".swiper-pagination-ads",
                    }}
                    modules={[Pagination]}
                    className="mySwiper w-full max-h-[300px] md:max-h-[450px] h-full"
                >
                    {data?.image?.slice(0, 4).map((item) => (
                        <SwiperSlide className="relative">
                            <Image
                                src={item}
                                unoptimized
                                alt="Photo"
                                width={100}
                                height={100}
                                className="w-full h-full"
                            />
                            <div
                                className="absolute top-3 right-3 flex items-center gap-1 bg-Gray-200 text-Gray-700 text-sm px-3 rounded-lg">
                                <Clock className="fill-natural-main !w-5 !h-5"/>
                                <span className="text-sm text-natural-main pt-1">{data?.time}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div
                        className="swiper-pagination-ads absolute bottom-3 left-0  right-0 flex justify-center items-center gap-2 z-10 w-full bg-transparent"></div>
                </Swiper>
            </div>

            <div className="hidden lg:grid gap-6 w-full ">
                {data?.image?.length >= 3 ?
                    <div className="grid grid-cols-3 grid-rows-2 gap-6 w-full max-h-[520px] h-full">
                        {data?.image[0] && (
                            <div
                                onClick={() => handleOpenSwiper(true)}
                                className="relative col-span-2 row-span-2 flex items-center justify-center border border-default-divider rounded-2xl overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={data?.image[0]}
                                    unoptimized
                                    alt={`Photo`}
                                    width={100}
                                    height={100}
                                    className="w-screen h-full object-cover"
                                />
                            </div>
                        )}
                        {data?.image[1] && (
                            <div
                                onClick={() => handleOpenSwiper(true)}
                                className="flex items-center justify-center rounded-xl border border-default-divider overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={data?.image[1]}
                                    unoptimized
                                    alt={`Photo`}
                                    width={100}
                                    height={100}
                                    className="w-screen h-full object-cover"
                                />
                            </div>
                        )}
                        {data?.image[2] && (
                            <div
                                onClick={() => handleOpenSwiper(true)}
                                className="relative flex items-center justify-center rounded-xl border border-default-divider overflow-hidden cursor-pointer"
                            >
                                <Image
                                    src={data?.image[2]}
                                    unoptimized
                                    alt={`Photo`}
                                    width={100}
                                    height={100}
                                    className="w-screen h-full object-cover"
                                />
                                {data?.image.length > 3 && (
                                    <div
                                        className="absolute inset-0 bg-black/60 w-full h-full flex border border-default-divider items-center justify-center">
                                        <div className="relative !w-10 !h-10">
                                            <Image src={Maximize} alt="photo" width={100} height={100}
                                                   className="w-full h-full"/>
                                            <div
                                                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white text-base font-semibold whitespace-nowrap">
                                                {data?.image.length - 3} +
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div> :
                    <Swiper
                        spaceBetween={30}
                        pagination={{
                            clickable: true,
                            el: ".swiper-pagination-ads",
                        }}
                        modules={[Pagination]}
                        className="mySwiper max-w-[950px] w-full max-h-[520px] rounded-xl border border-default-divider"
                    >
                        {data?.image.slice(0, 4).map((item) => (
                            <SwiperSlide key={item.id} className="relative">
                                <Image
                                    src={item}
                                    unoptimized
                                    alt="Photo"
                                    width={100}
                                    height={100}
                                    className="w-full h-full"
                                />
                                <div
                                    className="absolute top-3 right-3 flex items-center gap-1 bg-Gray-200 text-Gray-700 text-sm px-3 rounded-lg">
                                    <Clock className="fill-natural-main !w-5 !h-5"/>
                                    <span className="text-sm text-natural-main pt-1">{data?.time}</span>
                                </div>
                            </SwiperSlide>
                        ))}
                        <div
                            className="swiper-pagination-ads absolute bottom-3 left-0  right-0 flex justify-center items-center gap-2 z-10 w-full bg-transparent"></div>
                    </Swiper>}
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="flex flex-col gap-6 p-4 ">
                    <DialogHeader>
                        <VisuallyHidden>
                            <DialogTitle></DialogTitle>
                        </VisuallyHidden>
                    </DialogHeader>

                    <div className="flex flex-col gap-5 w-full h-full pt-4 select-none">
                        <RadioGroup className="flex flex-col gap-3 w-full h-full">
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
                                {data?.image.map((item) => (
                                    <SwiperSlide
                                        // key={item.id}
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
                                ))}
                            </Swiper>

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
                                {data?.image.map((item) => (
                                    <SwiperSlide
                                        // key={item.id}
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
                        </RadioGroup>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SwiperModal;
