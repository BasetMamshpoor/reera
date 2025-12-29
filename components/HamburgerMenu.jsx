"use client";
import React, { useState, useEffect } from "react";
import { useParams, usePathname } from "next/navigation";

const HamburgerMenu = ({
  children,
  overlayColor = "bg-black/40",
  panelBackground = "bg-white dark:bg-gray-900",
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const locale = params.locale || "en";
  const isRTL = ["fa", "ar", "he"].includes(locale);
  const direction = isRTL ? "rtl" : "ltr";
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const positionClass =
    direction === "rtl" ? "right-0 top-0 bottom-0" : "left-0 top-0 bottom-0";

  const transformClass = isOpen
    ? "translate-x-0"
    : direction === "rtl"
    ? "translate-x-full"
    : "-translate-x-full";

  return (
    <>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="lg:hidden cursor-pointer z-50 relative w-6 h-6 flex flex-col justify-center items-center"
        aria-label={isOpen ? "Close Menu" : "Open Menu"}
      >
        <div className="w-6 h-6 relative">
          <span
            className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-1"
            }`}
          ></span>

          <span
            className={`absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "opacity-0" : "opacity-100"
            }`}
          ></span>

          <span
            className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${
              isOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-1"
            }`}
          ></span>
        </div>
      </button>

      <div
        className={`fixed inset-0 ${overlayColor} z-40 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed ${positionClass} w-80 ${panelBackground} shadow-xl z-40 transform transition-transform duration-300 ease-in-out lg:hidden ${transformClass}`}
        dir={direction}
      >
        <div className="h-fit overflow-y-auto">{children}</div>
      </div>
    </>
  );
};

export default HamburgerMenu;
