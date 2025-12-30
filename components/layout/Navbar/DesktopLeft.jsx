"use client";
import React from "react";
import Add from "@/assets/icons/add.svg";
import ProfileAdd from "@/assets/icons/profile-add.svg";
import ProfileUser from "@/assets/icons/profile-user.svg";
import Message from "@/assets/icons/message.svg";
import Moon from "@/assets/icons/moon.svg";
import Sun from "@/assets/icons/sun.svg";
import Logout from "@/assets/icons/Logout.svg";
import {useState, useEffect} from "react";
import {useTheme} from "next-themes";
import Link from "next/link";
import {useParams} from "next/navigation";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {signOut} from "next-auth/react";

const DesktopLeft = ({}) => {
    const [mounted, setMounted] = useState(false);
    const {theme, setTheme} = useTheme();
    const {locale} = useParams();
    const dic = useTranslation();
    const n = dic.navbar;
    const router = useRouter();
    const {data: session, status} = useSession();

    const profileLink = session?.user
        ? `/${locale}/my-profile`
        : `/${locale}/login`;

    const chatUrl = session?.user
        ? `/${locale}/chat`
        : `/${locale}/login`;

    const registerAdLink = session?.user
        ? `/${locale}/register-ad`
        : `/${locale}/login?callbackUrl=/${locale}/register-ad`;

    const profileAriaLabel = session?.user ? "My Profile" : "Login";

    useEffect(() => {
        setMounted(true);
    }, []);

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

    if (status === "loading") {
        return (
            <div className="hidden md:flex flex-row gap-2 lg:gap-4 items-center">
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="w-24 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
                <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse"></div>
            </div>
        );
    }

    return (
        <div className="hidden md:flex flex-row gap-2 lg:gap-4 items-center">
            {/* Profile/Login Link with different icon for authenticated users */}
            <Link
                href={profileLink}
                aria-label={profileAriaLabel}
                className="bg-transparent cursor-pointer border-2 border-gray-500 dark:border-white p-2.5 rounded-lg transition-all hover:scale-105"
                title={
                    session?.user
                        ? `Welcome, ${session.user.mobile || session.user.name || "User"}`
                        : "Please login"
                }
            >
                {mounted &&
                    (session?.user ? (
                        <ProfileUser className="dark:fill-white fill-black"/>
                    ) : (
                        <ProfileAdd className="dark:fill-white fill-black"/>
                    ))}
            </Link>

            <Link
                href={chatUrl}
                aria-label="Messages"
                className="bg-transparent border-2 border-gray-500 dark:border-white p-2.5 rounded-lg cursor-pointer hover:scale-105 transition-all"
            >
                {mounted && <Message className="dark:fill-white fill-black"/>}
            </Link>

            <Link
                href={registerAdLink}
                aria-label="Register Ad"
                className="bg-alpha-100 px-6 py-2 rounded-lg flex items-center gap-2 cursor-pointer hover:scale-105 transition-all"
            >
                <span className="text-alphaw-100 font-normal">{n.register_ad}</span>
                {mounted && <Add className="fill-alphaw-100"/>}
            </Link>

            {mounted && (
                <button
                    aria-label="Toggle theme"
                    onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                    className="hover:scale-105 transition-all"
                >
                    {theme === "light" ? (
                        <Moon className="fill-alpha-100 cursor-pointer"/>
                    ) : (
                        <Sun className="fill-alpha-100 cursor-pointer"/>
                    )}
                </button>
            )}

            {/* Logout Button - Only show when user is authenticated */}
            {session?.user && (
                <button
                    onClick={handleLogout}
                    className="bg-transparent cursor-pointer border-2 border-red-500 p-2.5 rounded-lg transition-all hover:scale-105 hover:bg-red-50 dark:hover:bg-red-900/20"
                    aria-label="Logout"
                    title="Logout"
                >
                    <Logout className="fill-red-500"/>
                </button>
            )}
        </div>
    );
};

export default DesktopLeft;
