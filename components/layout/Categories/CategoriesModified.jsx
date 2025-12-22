"use client";
import React from "react";

import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useParams} from "next/navigation";
import Link from "next/link";

import Image from "next/image";

const CategoriesModified = () => {
    const dic = useTranslation();
    const c = dic.categories;
    const params = useParams();
    const locale = params.locale;

  const categories = [
    {
      id: 1,
      name: c.vehicles,
      icon: (
        <Image
          src={`/images/vehicle.png`}
          width={100}
          height={100}
          alt="vehicles"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/vehicles`,
    },
    {
      id: 2,
      name: c.real_estate,
      icon: (
        <Image
          src={`/images/real-estate.png`}
          width={100}
          height={100}
          alt="real-estate"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/housing`,
    },
    {
      id: 3,
      name: c.home_kitchen,
      icon: (
        <Image
          src={`/images/home-kitchen.png`}
          width={100}
          height={100}
          alt="home-kitchen"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/kitchen`,
    },
    {
      id: 4,
      name: c.digital_goods,
      icon: (
        <Image
          src={`/images/digital.png`}
          width={100}
          height={100}
          alt="digital"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/digital`,
    },
    {
      id: 5,
      name: c.personal_items,
      icon: (
        <Image
          src={`/images/personal.png`}
          width={100}
          height={100}
          alt="personal"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/personal`,
    },
    {
      id: 6,
      name: c.services,
      icon: (
        <Image
          src={`/images/services.png`}
          width={100}
          height={100}
          alt="services"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/services`,
    },
    {
      id: 7,
      name: c.roommate,
      icon: (
        <Image
          src={`/images/roommate.png`}
          width={100}
          height={100}
          alt="roommate"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/housemate`,
    },
    {
      id: 8,
      name: c.tickets_tours,
      icon: (
        <Image
          src={`/images/ticket.png`}
          width={100}
          height={100}
          alt="ticket"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/ticket`,
    },
    {
      id: 9,
      name: c.job_recruitment,
      icon: (
        <Image
          src={`/images/job.png`}
          width={100}
          height={100}
          alt="job"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/recruitment`,
    },
    {
      id: 10,
      name: c.commerce,
      icon: (
        <Image
          src={`/images/commerce.png`}
          width={100}
          height={100}
          alt="commerce"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/business`,
    },
    {
      id: 11,
      name: c.legal_adviser,
      icon: (
        <Image
          src={`/images/legal-adviser.png`}
          width={100}
          height={100}
          alt="legal-adviser"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
        href: "/"
      // href: `https://reera-adviser.vercel.app/en/consultation/consultant/consultor-infirmation`,
    },
    {
      id: 12,
      name: c.visa,
      icon: (
        <Image
          src={`/images/visa.png`}
          width={100}
          height={100}
          alt="Visa"
          className="lg:max-w-18"
        />
      ),
      count: "4000",
      href: `/${locale}/ads/visa`,
    },
  ];
  return (
    <div className="w-full lg:flex lg:flex-wrap grid grid-cols-3 justify-center gap-2  mt-8 px-4 lg:px-0">
      {categories?.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="flex  flex-col hover:scale-[0.98] transition-all py-4 bg-surface duration-100 ease-in items-center justify-center gap-2 flex-1 border rounded-lg cursor-pointer lg:min-w-58 w-full px-4"
        >
          {category.icon}
          <span
            className=" font-[600] lg:text-lg text-xs
           text-[#152F56] dark:text-white text-center  whitespace-nowrap"
                    >
            {category.name}
          </span>
                </Link>
            ))}
        </div>
    );
};

export default CategoriesModified;
