"use client";

import React, {useState} from 'react';
import {Dialog, DialogContent} from '@/components/ui/dialog';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import Image from 'next/image';

import {Swiper, SwiperSlide} from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';

import {FreeMode, Navigation, Thumbs, Pagination} from 'swiper/modules';


const SwiperModal = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const handleOpenSwiper = (active) => {
        setIsActive(active);
        setIsDialogOpen(true);
    };
    return (
        <>
            <div className="relative md:hidden">
                <Swiper
                    spaceBetween={30}
                    pagination={{
                        clickable: true,
                        el: '.swiper-pagination-ads',
                    }}
                    modules={[Pagination]}
                    className="mySwiper w"

                >
                    <SwiperSlide> <Image
                        src="/images/photo.png"
                        alt="Photo"
                        width={100}
                        height={100}
                        className="w-screen "
                    />
                    </SwiperSlide>
                    <SwiperSlide> <Image
                        src="/images/photo.png"
                        alt="Photo"
                        width={100}
                        height={100}
                        className="w-screen"
                    />
                    </SwiperSlide>
                    <SwiperSlide> <Image
                        src="/images/photo.png"
                        alt="Photo"
                        width={100}
                        height={100}
                        className="w-screen"
                    />
                    </SwiperSlide>
                    <SwiperSlide> <Image
                        src="/images/photo.png"
                        alt="Photo"
                        width={100}
                        height={100}
                        className="w-screen"
                    />
                    </SwiperSlide>
                    <div className="swiper-pagination-ads  absolute bottom-3 left-1/2 2 -translate-x-1/2 flex justify-center items-center gap-2 z-10 w-full bg-transparent"></div>
                </Swiper>
            </div>
            <div className="hidden md:grid grid-cols-3 grid-rows-2 gap-6 w-full">
                <div
                    onClick={() => handleOpenSwiper(true)}
                    className="relative col-span-2 row-span-2 flex items-center justify-center rounded-2xl overflow-hidden cursor-pointer"
                >
                    <Image
                        src="/images/photo.png"
                        alt="Photo"
                        width={100}
                        height={100}
                        className="w-screen"
                    />
                </div>
                <div
                    onClick={() => handleOpenSwiper(false)}
                    className="flex items-center justify-center rounded-xl overflow-hidden cursor-pointer"
                >
                    <Image
                        src="/images/photo.png"
                        alt="Photo"
                        width={100}
                        height={100}
                        className="w-screen"
                    />
                </div>
                <div
                    onClick={() => handleOpenSwiper(true)}
                    className="relative rounded-xl overflow-hidden cursor-pointer"
                >
                    <Image
                        src="/images/photo.png"
                        alt="Photo"
                        width={100}
                        height={100}
                        className="w-screen"
                    />
                    <div className="absolute inset-0 bg-black/60 w-full h-full">
                        <div className="relative flex items-center justify-center w-full h-full">
                            <Image
                                src="/images/Maximize Icon.png"
                                alt="Maximize"
                                width={100}
                                height={100}
                                className="w-10 h-10"
                            />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white">
                                4+
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="flex flex-col gap-6 sm:max-w-[846px] max-h-8/10 p-10 ">
                    <div className="flex flex-col gap-6">
                        <RadioGroup defaultValue="comfortable" className="flex flex-col gap-3">
                            <Swiper
                                style={{
                                    '--swiper-navigation-color': '#fff',
                                    '--swiper-pagination-color': '#fff',
                                }}
                                loop={true}
                                spaceBetween={10}
                                navigation={true}
                                thumbs={{swiper: thumbsSwiper}}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper2 w-full h-8/10"
                            >
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    />
                                </SwiperSlide>
                            </Swiper>
                            <Swiper
                                onSwiper={setThumbsSwiper}
                                loop={true}
                                spaceBetween={10}
                                slidesPerView={4}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Navigation, Thumbs]}
                                className="mySwiper"
                            >
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    /></SwiperSlide>
                                <SwiperSlide className="rounded-xl overflow-hidden">

                                    <Image
                                        src="/images/photo.png"
                                        alt="Photo"
                                        width={100}
                                        height={100}
                                        className=""
                                    />
                                </SwiperSlide>
                            </Swiper>
                        </RadioGroup>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default SwiperModal;