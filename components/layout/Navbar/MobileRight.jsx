import React from "react";
import Image from "next/image";
import Menu from "@/assets/icons/menu.svg";
const MobileRight = () => {
  return (
    <button className="lg:hidden cursor-pointer" aria-label="Open Menu">
      <Menu className="dark:fill-white" />
    </button>
  );
};

export default MobileRight;
