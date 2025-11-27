"use client";
import React, { useEffect, useRef } from "react";
import { Input } from "../../ui/input";
import Close from "@/assets/icons/close.svg";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";
import Image from "next/image";
import SearchIcon from "@/assets/icons/search.svg";
import countries from "@/data/dist/json/countries.json";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
gsap.registerPlugin(Draggable, useGSAP);

const MobileLocationOverlay = ({ mobileLocation, setMobileLocation }) => {
  const layerRef = useRef(null);
  const [mobileSearchInput, setMobileSearchInput] = useState("");
  const closeLayerButtonRef = useRef(null);
  const dic = useTranslation();
  const m = dic.navbar;
  useEffect(() => {
    if (mobileLocation) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileLocation]);
  // animations
  useGSAP(
    () => {
      if (!mobileLocation || !layerRef.current) return;

      // Slide in from bottom when opened
      gsap.fromTo(
        layerRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      if (mobileLocation) {
        layerRef.current.style.display = "block";

        gsap.fromTo(
          layerRef.current,
          { y: "100%", opacity: 0 },
          {
            y: "0%",
            opacity: 1,
            duration: 0.4,
            ease: "power3.out",
          }
        );
      }
      const handleClose = () => {
        gsap.to(layerRef.current, {
          y: "100%",
          opacity: 0,
          duration: 1,
          ease: "power2.in",
          onComplete: () => {
            if (layerRef.current) {
              layerRef.current.style.display = "none";
            }
            setMobileLocation(false); // update parent state
          },
        });
      };
      closeLayerButtonRef.current?.addEventListener("click", handleClose);

      return () => {
        // draggable[0].kill(); // ✅ cleanup
        closeLayerButtonRef.current?.removeEventListener("click", handleClose);
      };
    },
    { dependencies: [mobileLocation], scope: layerRef }
  );
  return (
    <div
      ref={layerRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[8] w-full h-full bg-[#fff]  dark:bg-[#252C36] flex flex-col"
    >
      <div className="flex items-center flex-row-reverse justify-between  py-6 gap-4 px-2">
        <div className="w-full relative ">
          <SearchIcon className="absolute start-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 group-focus-within:opacity-0" />

          <Input
            className="rtl:placeholder:text-right py-5 px-12 border-gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 dark:bg-[#252C36]"
            placeholder={m.search}
          />
        </div>
        <div className="p-2" onClick={() => setMobileLocation(false)}>
          <Close className="fill-gray-500 dark:fill-white" />
        </div>
      </div>
      <button ref={closeLayerButtonRef} className="cursor-pointer"></button>
      <div className="w-full h-[2px] bg-[#D1D5DB] dark:bg-[#374151]"></div>
      <div className="flex-1 overflow-y-auto w-full h-[600px] px-4 touch-pan-y overscroll-contain scroll-hidden flex flex-col items-end py-4">
        {countries.map((c, i) => (
          <div
            key={i}
            className="py-4 px-2 flex flex-row-reverse cursor-pointer dark:border-gray-600 justify-between w-full"
          >
            <span className="text-[#7A7C88] dark:text-[#E0E2E5]">{c.name}</span>
            <Arrowleft className="dark:fill-white fill-gray-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MobileLocationOverlay;
