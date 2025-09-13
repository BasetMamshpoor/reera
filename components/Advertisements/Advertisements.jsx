"use client";
import React from "react";
import Image from "next/image";
import Home from "@/assets/icons/home-hashtag.svg";
import Location from "@/assets/icons/location.svg";
import GreenTick from "@/assets/icons/tick-circle.svg";
import { ChevronLeft } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

import { useTranslation } from "@/app/[locale]/TranslationContext";
import { useParams } from "next/navigation";

function toFarsiDigits(number) {
  const farsiDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  return number.toString().replace(/\d/g, (d) => farsiDigits[parseInt(d)]);
}

const Advertisements = ({ isOnProfile = false }) => {
  const dic = useTranslation();
  const ads = dic.ads;
  const locale = useParams();

  // Advertisement data array
  const advertisements = [
    {
      id: 1,
      title: "خرید آپارتمان در استانبول",
      price: "2/200/000",
      area: "50",
      location: "ترکیه استانبول",
      time: "پنج دقیقه پیش",
      category: "آپارتمان مبله",
      image: "/images/advimage.png",
      verified: true,
      imageWidth: 302,
      imageHeight: 194,
    },
    {
      id: 2,
      title: "خرید آپارتمان در استانبول",
      price: "2/200/000",
      area: "50",
      location: "ترکیه استانبول",
      time: "پنج دقیقه پیش",
      category: "آپارتمان مبله",
      image: "/images/advimage.png",
      verified: true,
      imageWidth: 302,
      imageHeight: 194,
    },
    {
      id: 3,
      title: "خرید آپارتمان در استانبول",
      price: "2/200/000",
      area: "50",
      location: "ترکیه استانبول",
      time: "پنج دقیقه پیش",
      category: "آپارتمان مبله",
      image: "/images/advimage.png",
      verified: true,
      imageWidth: 302,
      imageHeight: 194,
    },
    {
      id: 4,
      title: "خرید آپارتمان در استانبول",
      price: "2/200/000",
      area: "50",
      location: "ترکیه استانبول",
      time: "پنج دقیقه پیش",
      category: "آپارتمان مبله",
      image: "/images/advimage.png",
      verified: true,
      imageWidth: 302,
      imageHeight: 194,
    },
  ];

  return (
    <>
      {!isOnProfile && (
        <div className="flex flex-row items-center justify-between mt-12">
          <div className="flex flex-row items-center gap-4">
            <h2 className="text-[#000000] dark:text-[#D9EDF4] font-[600] text-2xl">
              {ads.reera_ads}
            </h2>
          </div>
          <Link
            href={`en/ads`}
            className="flex flex-row gap-2 cursor-pointer items-center justify-center"
          >
            <span className="font-[600] text-sm">{ads.view_all}</span>
            <ChevronLeft className="ltr:rotate-180" />
          </Link>
        </div>
      )}

      <div
        className={`grid grid-cols-1 gap-y-10 mt-10 sm:grid-cols-2 sm:gap-x-4 px-6 xl:px-0 ${
          isOnProfile ? "lg:grid-cols-3" : "lg:grid-cols-4"
        } lg:gap-x-6`}
      >
        {advertisements.map((ad) => (
          <div
            key={ad.id}
            className="relative flex items-center flex-col h-160 rounded-4xl bg-[#ffffff] space-y-4 sm:h-120 cursor-pointer dark:bg-[#252C36]"
          >
            {ad.verified && (
              <div className="absolute py-1 px-2 top-2 right-4 rounded-lg bg-[#DCFCE8] flex flex-row gap-1">
                <span className="text-[#16A34A]">{ads.verified}</span>
                <GreenTick className="fill-[#16A34A]" />
              </div>
            )}

            <Image
              src={ad.image}
              className="w-full rounded-2xl"
              width={ad.imageWidth}
              height={ad.imageHeight}
              alt={ad.title}
            />

            <div className="flex flex-row justify-between items-center w-full px-4">
              <span className="text-xs text-gray-400 dark:text-[#ffffff]">
                {ad.time}
              </span>
              <span className="text-sm py-1 px-2 bg-[#F0F9FB] text-[#4299C1] rounded-md font-[900] dark:bg-[#374151] dark:text-[#ffffff]">
                {ad.category}
              </span>
            </div>

            <h2 className="font-[500] text-lg text-right self-end px-4">
              {ad.title}
            </h2>

            <div className="self-end px-4 flex flex-row items-center justify-end gap-2">
              <span className="flex flex-row gap-1 items-center">
                <span>{ads.meter}</span>
                <span>{toFarsiDigits(ad.area)}</span>
              </span>
              <Home className="fill-black dark:fill-white" />
            </div>

            <div className="self-end px-4 flex flex-row items-center justify-end gap-2">
              <span className="flex flex-row gap-1 items-center">
                <span>{ad.location}</span>
              </span>
              <Location className="fill-black dark:fill-white" />
            </div>

            <h2 className="self-start px-4 font-[600] text-2xl">
              {toFarsiDigits(ad.price)} تومان
            </h2>
          </div>
        ))}
      </div>
    </>
  );
};

export default Advertisements;
