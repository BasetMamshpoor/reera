"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

import Profile from "@/assets/icons/profile.svg";
import Message from "@/assets/icons/message.svg";
import Add from "@/assets/icons/add-square.svg";
import Home from "@/assets/icons/home.svg";

const MobileFooter = () => {
    const pathname = usePathname();
    const { locale } = useParams();
    const { data: session } = useSession();

    const profUrl = session?.user
        ? `/${locale}/my-profile`
        : `/${locale}/login`;

    const chatUrl = session?.user
        ? `/${locale}/chat`
        : `/${locale}/login`;

    const registerAdUrl = session?.user
        ? `/${locale}/register-ad`
        : `/${locale}/login`;

    const itemBase =
        "flex justify-center items-center w-full h-12 rounded-full transition-all duration-200";

    const activeBg = "bg-Primary-400";
    const inactiveBg = "bg-transparent";

    const activeIcon = "fill-white";
    const inactiveIcon = "fill-Gray-700";

    return (
        <>
            <div className="h-42 lg:h-0"></div>

            <div className="fixed bottom-0 z-40 grid w-full grid-cols-4 items-center justify-center bg-white py-6 md:hidden dark:bg-[#252C36]">

                <Link
                    href={profUrl}
                    className={`${itemBase} ${
                        pathname.startsWith(`/${locale}/my-profile`)
                            ? activeBg
                            : inactiveBg
                    }`}
                >
                    <Profile
                        className={
                            pathname.startsWith(`/${locale}/my-profile`)
                                ? activeIcon
                                : inactiveIcon
                        }
                    />
                </Link>

                <Link
                    href={chatUrl}
                    className={`${itemBase} ${
                        pathname.startsWith(`/${locale}/chat`)
                            ? activeBg
                            : inactiveBg
                    }`}
                >
                    <Message
                        className={
                            pathname.startsWith(`/${locale}/chat`)
                                ? activeIcon
                                : inactiveIcon
                        }
                    />
                </Link>

                <Link
                    href={registerAdUrl}
                    className={`${itemBase} ${
                        pathname.startsWith(`/${locale}/register-ad`)
                            ? activeBg
                            : inactiveBg
                    }`}
                >
                    <Add
                        className={
                            pathname.startsWith(`/${locale}/register-ad`)
                                ? activeIcon
                                : inactiveIcon
                        }
                    />
                </Link>

                <Link
                    href={`/${locale}`}
                    className={`${itemBase} ${
                        pathname === `/${locale}` ? activeBg : inactiveBg
                    }`}
                >
                    <Home
                        className={
                            pathname === `/${locale}?page` ? activeIcon : inactiveIcon
                        }
                    />
                </Link>

            </div>
        </>
    );
};

export default MobileFooter;
