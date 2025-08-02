import React from "react";
import Image from "next/image";
import Global from "@/assets/icons/global.svg";
const DesktopRight = () => {
  return (
    <div className="hidden lg:flex flex-row gap-4 items-center">
      <Image src="/images/logo.png" alt="" width={68} height={80} />
      <Global className="fill-gray-800 dark:fill-white" />
    </div>
  );
};

export default DesktopRight;
