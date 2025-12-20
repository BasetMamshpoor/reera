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
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useParams, usePathname} from "next/navigation";
// import {useSidebar} from "@/components/SidebarContext";
import Airplane from "@/assets/icons/airplane.svg"
import User2 from "@/assets/icons/profile-user.svg"
import Folder from "@/assets/icons/Folder_empty_favorits.svg"


const SidebarLink = ({href, icon: Icon, label, locale}) => {
    const pathname = usePathname();
    // const {closeSidebar} = useSidebar();
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
                <Icon className={`fill-gray-800 dark:fill-gray-200 w-5 h-5`}/>
                <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold pt-1">{label}</p>
            </div>
            <Arrow className={`lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 ${locale === "en" && "rotate-180"}`}/>
        </Link>
    );
};

const Sidebar = () => {
    const {locale} = useParams();
    const dic = useTranslation();
    const s = dic.consultor.Sidebar;
    // const {closeSidebar} = useSidebar();

    return (
        <div
            className="flex flex-col gap-8 border border-[#D1D5DB] dark:border-[#374151] bg-[#F9FAFB] dark:bg-[#14181D] rounded-2xl overflow-hidden [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] lg:max-w-80 w-full">
            <div className="relative w-full rounded-t-2xl overflow-hidden">
                <Image
                    src="/images/ImageSidebar.png"
                    alt="image"
                    width={100}
                    height={100}
                    className="w-screen"
                />
                <div className="w-full absolute bottom-0">
                    <ImageOverlay className="!w-full !h-full fill-[#F9FAFB] dark:fill-[#14181D]"/>
                </div>
                <div className="w-full px-5 absolute z-30 bottom-0 ">
                    <div
                        className="flex items-center gap-4 p-3 rounded-[12px] border w-full border-[#D1D5DB] dark:bg-black/40 bg-white/40 backdrop-blur-[25px] shadow-[0_4px_15px_0_rgba(28,28,28,0.04)]">
                        <div
                            className="flex items-center justify-center p-2 bg-white w-12 h-12 dark:bg-[#252C36] rounded-full">
                            <Home className="fill-Gray-800"/>
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
                    href={`/${locale}/consultation/consultant/consultor-information/edit-information`}
                    icon={Edit}
                    label={s.editProfile}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultation/consultant/consultor-information/dashboard`}
                    icon={Layer}
                    label={s.dashboard}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultation/consultant/consultor-information/consultant-request`}
                    icon={User}
                    label={s.consultationRequest}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultation/consultant/consultor-information/user-feedback`}
                    icon={Star}
                    label={s.userFeedback}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultation/consultant/consultor-information/income-and-withdrawal`}
                    icon={Card}
                    label={s.incomeAndWithdrawal}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultation/consultant/consultor-information/my-migration-path`}
                    icon={Airplane}
                    label={s.my_migration_path}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultation/consultant/consultor-information/support-ticket`}
                    icon={Tag}
                    label={s.supportTicket}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultation/consultant/consultor-information/my-consultant`}
                    icon={User2}
                    label={s.my_consultant}
                    locale={locale}
                />
                <SidebarLink
                    href={`/${locale}/consultation/consultant/consultor-information/documentation-toolbox`}
                    icon={Folder}
                    label={s.document_toolbox}
                    locale={locale}
                />
            </div>

            <Link
                href={`/${locale}/consultation/consultant/consultor-information/edit-information`}
                // onClick={closeSidebar}
                className="flex gap-2 hover:bg-white border border-t-[#D1D5DB] dark:border-t-[#374151] dark:hover:bg-[#252C36] py-4 px-4 w-full"
            >
                <LogUot className="fill-[#EF4444] w-5 h-5"/>
                <p className="text-[#EF4444] text-sm lg:text-base font-bold">{s.logout}</p>
            </Link>
        </div>
    );
};

export default Sidebar;
