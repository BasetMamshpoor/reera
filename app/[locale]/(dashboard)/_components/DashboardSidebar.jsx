"use client";
import React from "react";
import Image from "next/image";
import ImageOverlay from "@/assets/images/wave-haikei.svg";
import Home from "@/assets/icons/home-hashtag.svg";
import Coin from "@/assets/icons/Coin1.svg";
import Link from "next/link";
import Edit from "@/assets/icons/Edit2.svg";
import Arrow from "@/assets/icons/arrow-left.svg";
import DigitalCurrency from "@/assets/icons/coin.svg";
import Layer from "@/assets/icons/Layer.svg";
import User from "@/assets/icons/profile.svg";
import Transaction from "@/assets/icons/TransactionMinus.svg";
import Star from "@/assets/icons/star.svg";
import Heart from "@/assets/icons/heart.svg";
import Tag from "@/assets/icons/Tag.svg";
import LogUot from "@/assets/icons/Logout.svg";
import Modal from "@/app/[locale]/(dashboard)/my-profile/_components/ModalCoinIncrease";
import List from "@/assets/icons/Card Recive.svg";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {signOut} from "next-auth/react";

const SidebarLink = ({href, icon: Icon, label}) => {
    const dic = useTranslation();
    const pathname = usePathname();
    const {locale} = useParams();
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={`flex justify-between py-4 px-4 w-full transition-colors hover:bg-white dark:hover:bg-[#252C36] 
        ${
                isActive
                    ? `bg-Primary-50 border-Primary-400 ${
                        locale === "fa" ? "border-r" : "border-l"
                    }`
                    : ""
            }`}
        >
            <div className="flex gap-2">
                <Icon className="fill-gray-800 dark:fill-gray-200 w-5 h-5"/>
                <p className="text-gray-800 dark:text-gray-200 text-sm lg:text-base font-bold pt-1">
                    {label}
                </p>
            </div>
            <Arrow
                className={`lg:hidden h-5 w-5 fill-gray-800 dark:fill-gray-200 ${
                    locale === "en" ? "rotate-180" : ""
                }`}
            />
        </Link>
    );
};

const DashboardSidebar = () => {
    const dic = useTranslation("");
    const {locale} = useParams();
    const p = dic.dashboard.myprofile.sidebar;

    const router = useRouter();
    const handleLogout = async () => {
        try {
            await signOut({
                redirect: true,
                callbackUrl: `/${locale}`,
            });
            router.push(`/${locale}`);
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return (
        <div
            className="max-h-[85vh] h-fit lg:max-h-[100vh] overflow-y-auto scrollbar-hide flex flex-col gap-8 border border-default-divider bg-Surface-2 rounded-2xl shadow-lg w-full max-w-80 lg:sticky lg:top-4">
            {/* Rest of the component remains the same */}
            <div className="relative w-full rounded-t-2xl lg:overflow-hidden">
                <Image
                    src={"/images/city-profile.jpg"}
                    alt="image"
                    width={100}
                    height={100}
                    className="w-screen"
                />
                <div className="w-full absolute -bottom-1">
                    <ImageOverlay className="!w-full !h-full fill-Surface-2"/>
                </div>
                <div className="w-full px-5 absolute z-30 bottom-0">
                    <div
                        className="flex items-center gap-4 p-3 rounded-[12px] border w-full border-[#D1D5DB] dark:bg-black/40 bg-white/40 backdrop-blur-[25px] shadow-[0_4px_15px_0_rgba(28,28,28,0.04)]">
                        <div className="flex items-center justify-center p-2 bg-white dark:bg-[#252C36] rounded-full">
                            <Home className="fill-gray-800 dark:fill-gray-200"/>
                        </div>
                        <div className="flex flex-col w-full">
                            <p className="text-sm text-Gray-700 font-semibold">
                                {p.username}
                            </p>
                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-1">
                                    <Coin className="fill-[#F59E0B]"/>
                                    <p className="text-Gray-900 pt-2 text-sm">300 {p.toman}</p>
                                </div>
                                <Modal/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col pb-6">
                <SidebarLink
                    href={`/${locale}/my-profile`}
                    icon={Edit}
                    label={p.edit_information}
                />
                <SidebarLink
                    href={`/${locale}/my-profile/dashboard`}
                    icon={Layer}
                    label={p.dashboard}
                />
                <SidebarLink
                    href={`/${locale}/my-profile/my-ads`}
                    icon={User}
                    label={p.my_ads}
                />
                {/*<SidebarLink*/}
                {/*    href={`/${locale}/my-profile/requests`}*/}
                {/*    icon={Document}*/}
                {/*    label={p.requests}*/}
                {/*/>*/}
                <SidebarLink
                    href={`/${locale}/my-profile/transaction-history`}
                    icon={Transaction}
                    label={p.transaction_history}
                />
                <SidebarLink
                    href={`/${locale}/my-profile/user-feedback`}
                    icon={Star}
                    label={p.user_ratings_and_feedback}
                />
                <SidebarLink
                    href={`/${locale}/my-profile/favorite-ads`}
                    icon={Heart}
                    label={p.favorite_ads}
                />
                <SidebarLink
                    href={`/${locale}/my-profile/support-ticket`}
                    icon={Tag}
                    label={p.support_ticket}
                />
                <SidebarLink
                    href={`/${locale}/my-profile/transaction-list`}
                    icon={List}
                    label={p.transactions_list}
                />
                <SidebarLink
                    href={`/${locale}/my-profile/digital-currency`}
                    icon={DigitalCurrency}
                    label={p.digital_currency}
                />
            </div>
            <button
                onClick={handleLogout}
                className="cursor-pointer flex gap-2 hover:bg-white border border-t-[#D1D5DB] dark:border-t-[#374151] dark:hover:bg-[#252C36] py-4 px-4 w-full"
            >
                <LogUot
                    className={`fill-[#EF4444] w-5 h-5 ${
                        locale === "en" ? "rotate-180" : ""
                    }`}
                />
                <p className="text-[#EF4444] text-sm lg:text-base font-bold pt-1">
                    {p.exit}
                </p>
            </button>
        </div>
    );
};

export default DashboardSidebar;
