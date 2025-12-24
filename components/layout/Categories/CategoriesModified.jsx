"use client";
import React from "react";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useParams} from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Vehicle from "@/assets/icons/vehicle1.svg"
import Vehicle2 from "@/assets/icons/vehicle2.svg"
import Real from "@/assets/icons/real-estate1.svg"
import Real2 from "@/assets/icons/real-estate2.svg"
import Bazar from "@/assets/icons/bazar1.svg"
import Bazar2 from "@/assets/icons/bazar2.svg"
import Services from "@/assets/icons/services1.svg"
import Services2 from "@/assets/icons/services2.svg"
import Roommate from "@/assets/icons/roommate1.svg"
import Roommate2 from "@/assets/icons/roommate2.svg"
import Ticket from "@/assets/icons/ticket1.svg"
import Ticket2 from "@/assets/icons/ticket2.svg"
import Job from "@/assets/icons/job1.svg"
import Job2 from "@/assets/icons/job2.svg"
import Business from "@/assets/icons/business1.svg"
import Business2 from "@/assets/icons/business2.svg"
import Legal from "@/assets/icons/legal-adviser1.svg"
import Legal2 from "@/assets/icons/legal-adviser2.svg"
import Visa from "@/assets/icons/visa1.svg"
import Visa2 from "@/assets/icons/visa2.svg"


const CategoriesModified = () => {
    const dic = useTranslation();
    const c = dic.categories;
    const params = useParams();
    const locale = params.locale;

    const categories = [
        {
            coming: 0,
            id: 1,
            name: c.vehicles,
            icon: (
                <>
                    <Vehicle className="dark:hidden !w-14 md:!w-32 !h-14 md:!h-24"/>
                    <Vehicle2 className="hidden dark:block !w-14 md:!w-32 !h-14 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/vehicle.png`}
                //     width={100}
                //     height={100}
                //     alt="vehicles"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/vehicles`,
        },
        {
            coming: 0,
            id: 2,
            name: c.real_estate,
            icon: (
                <>
                    <Real className="dark:hidden !w-12 md:!w-20 !h-10 md:!h-24"/>
                    <Real2 className="hidden dark:block !w-12 md:!w-20 !h-10 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/real-estate1.png`}
                //     width={100}
                //     height={100}
                //     alt="real-estate"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/housing`,
        },
        {
            coming: 1,
            id: 3,
            name: "بازار کالا",
            icon: (
                <>
                    <Bazar className="dark:hidden !w-12 md:!w-24 !h-12 md:!h-24"/>
                    <Bazar2 className="hidden dark:block !w-12 md:!w-24 !h-12 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/home-kitchen1.png`}
                //     width={100}
                //     height={100}
                //     alt="home-kitchen"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/kitchen`,
        },
        // {
        //     coming:1,
        //     id: 4,
        //     name: c.digital_goods,
        //     icon: (
        //         <Image
        //             src={`/images/digital.png`}
        //             width={100}
        //             height={100}
        //             alt="digital"
        //             className="lg:max-w-18"
        //         />
        //     ),
        //     count: "4000",
        //     href: `/${locale}/ads/digital`,
        // },
        // {
        //     coming:1,
        //     id: 5,
        //     name: c.personal_items,
        //     icon: (
        //         <Image
        //             src={`/images/personal.png`}
        //             width={100}
        //             height={100}
        //             alt="personal"
        //             className="lg:max-w-18"
        //         />
        //     ),
        //     count: "4000",
        //     href: `/${locale}/ads/personal`,
        // },
        {
            coming: 0,
            id: 6,
            name: c.services,
            icon: (
                <>
                    <Services className="dark:hidden !w-12 md:!w-24 !h-12 md:!h-24"/>
                    <Services2 className="hidden dark:block !w-12 md:!w-24 !h-12 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/services1.png`}
                //     width={100}
                //     height={100}
                //     alt="services"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/services`,
        },
        {
            coming: 1,
            id: 7,
            name: c.roommate,
            icon: (
                <>
                    <Roommate className="dark:hidden !w-12 md:!w-24 !h-12 md:!h-24"/>
                    <Roommate2 className="hidden dark:block !w-12 md:!w-24 !h-12 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/roommate1.png`}
                //     width={100}
                //     height={100}
                //     alt="roommate"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/housemate`,
        },
        {
            coming: 0,
            id: 8,
            name: c.tickets_tours,
            icon: (
                <>
                    <Ticket className="dark:hidden !w-12 md:!w-24 !h-12 md:!h-24"/>
                    <Ticket2 className="hidden dark:block !w-12 md:!w-24 !h-12 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/ticket1.png`}
                //     width={100}
                //     height={100}
                //     alt="ticket"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/ticket`,
        },
        {
            coming: 0,
            id: 9,
            name: c.job_recruitment,
            icon: (
                <>
                    <Job className="dark:hidden !w-10 md:!w-20 !h-16 md:!h-24"/>
                    <Job2 className="hidden dark:block !w-10 md:!w-20 !h-16 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/job1.png`}
                //     width={100}
                //     height={100}
                //     alt="job"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/recruitment`,
        },
        {
            coming: 1,
            id: 10,
            name: c.commerce,
            icon: (
                <>
                    <Business className="dark:hidden !w-10 md:!w-24 !h-16 md:!h-24"/>
                    <Business2 className="hidden dark:block !w-10 md:!w-24 !h-16 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/commerce.png`}
                //     width={100}
                //     height={100}
                //     alt="commerce"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/business`,
        },
        {
            coming: 1,
            id: 11,
            name: c.legal_adviser,
            icon: (
                <>
                    <Legal className="dark:hidden !w-10 md:!w-20 !h-16 md:!h-24"/>
                    <Legal2 className="hidden dark:block !w-10 md:!w-20 !h-16 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/legal-adviser.png`}
                //     width={100}
                //     height={100}
                //     alt="legal-adviser"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: "/"
            // href: `https://reera-adviser.vercel.app/en/consultation/consultant/consultor-infirmation`,
        },
        {
            coming: 0,
            id: 12,
            name: c.visa,
            icon: (
                <>
                    <Visa className="dark:hidden !w-18 md:!w-32 !h-16 md:!h-24"/>
                    <Visa2 className="hidden dark:block !w-18 md:!w-32 !h-16 md:!h-24"/>
                </>
                // <Image
                //     src={`/images/visa1.png`}
                //     width={100}
                //     height={100}
                //     alt="Visa"
                //     className="lg:max-w-18"
                // />
            ),
            count: "4000",
            href: `/${locale}/ads/visa`,
        },
    ];
    return (
        <div
            className="w-full grid grid-cols-3 xl:grid-cols-5 justify-center gap-2  mt-8 px-4 lg:px-0">
            {categories?.map((category) => (
                !!category?.coming ?
                    <div

                        key={category.id}
                        className="relative opacity-50 grid grid-rows-3 last:col-span-3 xl:last:col-span-1 text-center overflow-hidden hover:scale-[0.98] transition-all py-4 bg-surface duration-100 ease-in items-center justify-center flex-1 border rounded-lg cursor-pointer lg:min-w-58 w-full px-4"
                    >
                        <div
                            className="text-xs md:text-sm py-1 absolute -rotate-45 top-4 -left-8 md:top-6 md:-left-16 flex items-center justify-center max-w-[120px] md:max-w-[200px] w-full bg-Primary-400 text-white">
                            {c.coming_soon}
                        </div>
                        <div className="flex items-center justify-center row-span-2">
                            {category.icon}
                        </div>
                        <span className=" font-semibold lg:text-lg text-xs btext-Primary-950  whitespace-nowrap">
                           {category.name}
                        </span>
                    </div> :
                    <Link
                        key={category.id}
                        href={category.href}
                        className="grid grid-rows-3 last:col-span-3 xl:last:col-span-1 text-center overflow-hidden hover:scale-[0.98] transition-all py-4 bg-surface duration-100 ease-in items-center justify-center flex-1 border rounded-lg cursor-pointer lg:min-w-58 w-full px-4"
                    >
                        <div className="flex items-center justify-center row-span-2">
                            {category.icon}
                        </div>
                        <span className=" font-semibold lg:text-lg text-xs text-Primary-950  whitespace-nowrap">
                           {category.name}
                        </span>
                    </Link>
            ))}
        </div>
    );
};

export default CategoriesModified;
