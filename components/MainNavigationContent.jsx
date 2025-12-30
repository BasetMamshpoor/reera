"use client";
import Link from "next/link";
import {useParams, usePathname, useRouter} from "next/navigation";
import localTranslate from "@/helpers/localTranslate";
import {links} from "@/app/[locale]/(public)/links";
import Profile from "@/assets/icons/profile.svg";
import Plus from "@/assets/icons/add.svg";
import {signOut, useSession} from "next-auth/react";
import LogUot from "@/assets/icons/Logout.svg";
import React from "react";
import {useTranslation} from "@/app/[locale]/TranslationContext";

const MainNavigationContent = () => {
    const params = useParams();
    const pathname = usePathname();
    const locale = params.locale || "en";
    const {data} = useSession()
    const dic = useTranslation("");
    const p = dic.dashboard.myprofile.sidebar;

    const router = useRouter();
    const handleLogout = async () => {
        try {
            await signOut({
                redirect: true,
                callbackUrl: "/",
            });
            router.push("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };
    return (
        <div className="p-4 z-60">
            <div className="flex flex-col p-4 space-y-4 py-16">
                {links.map((link) => {
                    const href = link.href.replace("[locale]", locale);
                    const isActive = link.activeCondition(pathname, locale);
                    return (
                        <Link
                            key={href}
                            href={href}
                            className={`${
                                isActive
                                    ? "text-[#142738] font-[700] bg-gray-100 dark:bg-gray-800"
                                    : "text-[#3B3E46]"
                            } dark:text-[#E0E2E5] px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800`}
                        >
                            {localTranslate(locale, link.label)}
                        </Link>
                    );
                })}

                <Link
                    href={!!data?.accessToken ? `/${locale}/my-profile` : `/${locale}/login`}
                    className={`flex items-center gap-2 dark:text-[#E0E2E5] px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800`}
                >
                    {/*<Profile className="fill-Gray-950"/>*/}
                    <span className="pt-2">{p.profile}</span>
                </Link>
                <Link
                    href={!!data?.accessToken ? `/${locale}/register-ad` : `/${locale}/login`}
                    className={`flex items-center gap-2 dark:text-[#E0E2E5] px-4 py-3 rounded-lg transition-colors duration-200 hover:bg-gray-100 dark:hover:bg-gray-800`}
                >
                    {/*<Plus className="fill-Gray-950"/>*/}
                    <span className="pt-2">{p.register}</span>
                </Link>
                <button
                    onClick={handleLogout}
                    className="cursor-pointer flex gap-2 py-4 px-4 w-full"
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
        </div>
    );
};

export default MainNavigationContent;
