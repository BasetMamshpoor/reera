"use client";
import React from "react";

import Link from "next/link";

import Profile from "@/assets/icons/profile.svg";
import Message from "@/assets/icons/message.svg";
import Add from "@/assets/icons/add-square.svg";
import Category from "@/assets/icons/category-2.svg";
import Home from "@/assets/icons/home.svg";
import { useParams, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const MobileFooter = () => {
  const pathname = usePathname();
  const { locale } = useParams();
  const { data: session } = useSession();
  const profUrl = session?.user ? `/${locale}/my-profile` : `/${locale}/login`;
  const registerAdUrl = session?.user
    ? `/${locale}/register-ad`
    : `/${locale}/login`;
  return (
    <>
      <div className="h-42 lg:h-0"></div>
      <div className="w-full flex flex-row justify-around items-center  py-6 bg-[#ffffff] fixed bottom-0 md:hidden dark:bg-[#252C36] z-40">
        <Link
          href={profUrl}
          className={`p-4 rounded-full ${
            pathname === `/${locale}/my-profile`
              ? "bg-Primary-400"
              : "bg-transparent"
          }`}
        >
          <Profile
            className={` ${
              pathname === `/${locale}/my-profile`
                ? "fill-white"
                : "fill-Gray-700"
            }`}
          />
        </Link>
        <Link
          className={`p-4 rounded-full ${
            pathname === `/${locale}/my-chats`
              ? "bg-Primary-400"
              : "bg-transparent"
          }`}
          href={`/${locale}/my-chats`}
        >
          <Message
            className={` ${
              pathname === `/${locale}/my-chats`
                ? "fill-white"
                : "fill-Gray-700"
            }`}
          />
        </Link>
        <Link
          className={`p-4 rounded-full ${
            pathname === `/${locale}/register-ad`
              ? "bg-Primary-400"
              : "bg-transparent"
          }`}
          href={registerAdUrl}
        >
          <Add
            className={` ${
              pathname === `/${locale}/register-ad`
                ? "fill-white"
                : "fill-Gray-700"
            }`}
          />
        </Link>
        <button href={`/`}>
          <Category className="fill-Gray-700" />
        </button>

        <Link
          href={`/${locale}`}
          className={`${
            pathname === `/${locale}` ? "bg-Primary-400" : ""
          } rounded-2xl w-10 h-10 flex justify-center items-center`}
        >
          <Home
            className={` ${
              pathname === `/${locale}` ? "fill-white" : "fill-Gray-700"
            }`}
          />
        </Link>
      </div>
    </>
  );
};

export default MobileFooter;
