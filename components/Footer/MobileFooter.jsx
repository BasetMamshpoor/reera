"use client";
import React from "react";

import Link from "next/link";

import Profile from "@/assets/icons/profile.svg";
import Message from "@/assets/icons/message.svg";
import Add from "@/assets/icons/add-square.svg";
import Category from "@/assets/icons/category-2.svg";
import Home from "@/assets/icons/home.svg";
import { usePathname } from "next/navigation";

const MobileFooter = () => {
  const pathname = usePathname();
  return (
    <>
      <div className="h-42"></div>
      <div className="w-full flex flex-row justify-around items-center  py-6 bg-[#ffffff] fixed bottom-0 md:hidden dark:bg-[#252C36]">
        <Link href={`/`}>
          <Profile className="dark:fill-white" />
        </Link>
        <Link href={`/`}>
          <Message className="dark:fill-white" />
        </Link>
        <Link href={`/`}>
          <Add className="dark:fill-white" />
        </Link>
        <Link href={`/`}>
          <Category className="dark:fill-white" />
        </Link>

        <Link
          href="/"
          className={`${
            pathname === "/" ? "bg-[#4299C1] dark:bg-[#295775]" : ""
          } rounded-2xl w-10 h-10 flex justify-center items-center`}
        >
          <Home className="dark:fill-white" />
        </Link>
      </div>
    </>
  );
};

export default MobileFooter;
