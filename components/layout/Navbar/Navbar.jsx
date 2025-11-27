import React from "react";
import DesktopCenter from "./DesktopCenter";
import MobileCenter from "./MobileCenter";
import MobileLeft from "./MobileLeft";
import DesktopLeft from "./DesktopLeft";
import MobileRight from "./MobileRight";
import DesktopRight from "./DesktopRight";
const Navbar = () => {
  return (
    <div className="relative flex items-center justify-between py-10 md:py-4 z-[6] px-4 mx-auto w-full">
      <MobileRight />
      <DesktopRight />
      <MobileCenter />
      <DesktopCenter />
      <MobileLeft />
      <DesktopLeft />
    </div>
  );
};

export default Navbar;
