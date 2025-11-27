"use client";
import React from "react";
import { useParams, usePathname } from "next/navigation";
import HamburgerMenu from "@/components/HamburgerMenu";
import MainNavigationContent from "@/components/MainNavigationContent";
import ProfileNavigationContent from "./ProfileNavigationContent"; // You'll create this

const NavigationMenuWrapper = () => {
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale || "en";
  const getMenuContent = () => {
    if (pathname.includes("/my-profile")) {
      return <ProfileNavigationContent />;
    }
    return <MainNavigationContent />;
  };

  return <HamburgerMenu>{getMenuContent()}</HamburgerMenu>;
};

export default NavigationMenuWrapper;
