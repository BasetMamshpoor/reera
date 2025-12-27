"use client";
import React from "react";
import Image from "next/image";
import ImageOverlay from "@/assets/images/wave-haikei.svg";
import Home from "@/assets/icons/home-hashtag.svg";
import Link from "next/link";
import Edit from "@/assets/icons/Edit2.svg";
import Arrow from "@/assets/icons/arrow-left.svg";
import Layer from "@/assets/icons/Layer.svg";
import User from "@/assets/icons/profile.svg";
import Tag from "@/assets/icons/Tag.svg";
import Star from "@/assets/icons/star.svg";
import LogUot from "@/assets/icons/Logout.svg";
import Card from "@/assets/icons/Card Recive.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { useParams, usePathname } from "next/navigation";
// import { d } from "@/components/SidebarContext";

const SidebarLink = ({ href, icon: Icon, label, locale }) => {
    const pathname = usePathname();
    // const { closeSidebar } = d();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            // onClick={closeSidebar}
            className={`flex justify-between py-4 px-4 w-full transition-colors 
        ${isActive ? `bg-Primary-50 border-Primary-400 ${locale === "fa" ? "border-r" : "border-l"}` : ""}
        hover:bg-white dark:hover:bg-[#252C36]`}
        >
            <div className="flex gap-2">
                <Icon className={`fill-Gray-800 w-5 h-5`}/>
                <p className="text-Gray-800 text-sm lg:text-base font-bold">{label}</p>
            </div>
            <Arrow className={`lg:hidden h-5 w-5 fill-Gray-800 ${locale === "en" && "rotate-180"}`}/>
        </Link>
    );
};

const Sidebar = () => {
    const { locale } = useParams();
    const dic = useTranslation();
    const s = dic.consultor1.Sidebar;
    // const { closeSidebar } = d();

    return (
        <div className="flex flex-col gap-8 border border-default-divider bg-Surface-2 rounded-2xl overflow-hidden shadow-lg lg:max-w-80 w-full h-fit">
            <div className="relative w-full rounded-t-2xl overflow-hidden">
                <Image
                    unoptimized
                    src="/images/city-profile.jpg"
                    alt="image"
                    width={100}
                    height={100}
                    className="w-screen"
                />
                <div className="w-full absolute bottom-0">
                    <ImageOverlay className="!w-full !h-full fill-Surface-2" />
                </div>
                <div className="w-full px-5 absolute z-30 bottom-0 sm:bottom-10 md:bottom-20 lg:bottom-0 ">
                    <div className="flex items-center gap-4 p-3 rounded-[12px] border w-full border-[#D1D5DB] dark:bg-black/40 bg-white/40 backdrop-blur-[25px] shadow-[0_4px_15px_0_rgba(28,28,28,0.04)]">
                        <div className="flex items-center justify-center p-2 bg-white w-12 h-12 dark:bg-[#252C36] rounded-full">
                            <Home className="fill-Gray-800" />
                        </div>
                        <div className="flex flex-col w-full">
                            <p className="text-sm text-Gray-950 font-semibold ">
                                {s.username}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col pb-6">
                <SidebarLink
                    href={`/${locale}/consultor-infirmation/edit-information`}
                    icon={Edit}
                    label={s.editProfile}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultor-infirmation`}
                    icon={Layer}
                    label={s.dashboard}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultor-infirmation/consultant-request`}
                    icon={User}
                    label={s.consultationRequest}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultor-infirmation/user-feedback`}
                    icon={Star}
                    label={s.userFeedback}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultor-infirmation/income-and-withdrawal`}
                    icon={Card}
                    label={s.incomeAndWithdrawal}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultor-infirmation/support-ticket`}
                    icon={Tag}
                    label={s.supportTicket}
                    locale={locale}
                />
            </div>

            <Link
                href={`/${locale}/consultor-infirmation/edit-information`}
                // onClick={closeSidebar}
                className="flex gap-2 hover:bg-white border border-t-[#D1D5DB] dark:border-t-[#374151] dark:hover:bg-[#252C36] py-4 px-4 w-full"
            >
                <LogUot className="fill-[#EF4444] w-5 h-5" />
                <p className="text-[#EF4444] text-sm lg:text-base font-bold">{s.logout}</p>
            </Link>
        </div>
    );
};

export default Sidebar;
