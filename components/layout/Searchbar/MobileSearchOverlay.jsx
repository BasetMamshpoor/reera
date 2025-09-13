"use client";
import React, { useRef } from "react";
import { Input } from "../../ui/input";
import Close from "@/assets/icons/close.svg";
import { useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { Draggable } from "gsap/Draggable";

import SearchIcon from "@/assets/icons/search.svg";
// import { RiDeleteBin6Line } from "react-icons/ri";
gsap.registerPlugin(Draggable, useGSAP);

const MobileSearchOverlay = ({ mobileSearchFocus, setMobileSearchFocus }) => {
  const layerRef = useRef(null);
  const [mobileSearchInput, setMobileSearchInput] = useState("");
  const closeLayerButtonRef = useRef(null);
  useGSAP(
    () => {
      if (!mobileSearchFocus || !layerRef.current) return;

      // Slide in from bottom when opened
      gsap.fromTo(
        layerRef.current,
        { y: "100%", opacity: 0 },
        { y: "0%", opacity: 1, duration: 0.4, ease: "power3.out" }
      );

      // Make draggable
      const draggable = Draggable.create(layerRef.current, {
        type: "y",
        bounds: { minY: 0, maxY: window.innerHeight },
        inertia: true,
        onDragEnd: function () {
          if (this.y > 150) {
            gsap.to(layerRef.current, {
              y: "100%",
              opacity: 0,
              duration: 0.3,
              ease: "power2.in",
              onComplete: () => {
                setMobileSearchFocus(false);
              },
            });
          } else {
            gsap.to(layerRef.current, { y: 0, duration: 0.2 });
          }
        },
      });
      if (mobileSearchFocus) {
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
          duration: 0.3,
          ease: "power2.in",
          onComplete: () => {
            if (layerRef.current) {
              layerRef.current.style.display = "none";
            }
            setMobileSearchFocus(false); // update parent state
          },
        });
      };
      closeLayerButtonRef.current?.addEventListener("click", handleClose);

      return () => {
        draggable[0].kill(); // ✅ cleanup
        closeLayerButtonRef.current?.removeEventListener("click", handleClose);
      };
    },
    { dependencies: [mobileSearchFocus], scope: layerRef }
  );
  return (
    <div
      ref={layerRef}
      style={{ display: "none" }}
      className="fixed inset-0 z-[8] w-full h-full bg-[#fff]  dark:bg-[#252C36] flex flex-col"
    >
      <div className="flex items-center flex-row-reverse justify-between  py-6 gap-4 px-2">
        <div className="w-full relative group focus-within:ring-0">
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4 pointer-events-none transition-opacity duration-200 group-focus-within:opacity-0 dark:fill-white" />

          <Input
            className="placeholder:text-right py-3 placeholder:font-['yekanbakh'] placeholder:font-[200] placeholder:pr-8 border-gray-500 focus:placeholder-transparent focus:outline-none focus:ring-0 dark:bg-[#252C36] rounded-lg  dark:border-[#fff] dark:placeholder:text-white"
            placeholder="جستجو"
          />
        </div>
        <div className="p-2" onClick={() => setMobileSearchFocus(false)}>
          <Close className="fill-gray-500 dark:fill-white" />
          {/* <IoClose size={22} /> */}
        </div>
      </div>
      <button ref={closeLayerButtonRef} className="cursor-pointer"></button>
      <div className="w-full h-[2px] bg-[#D1D5DB] dark:bg-[#374151]"></div>

      <div className="flex flex-row-reverse mt-4 justify-between px-4 w-full mx-auto items-center">
        <div className="text-[#000] dark:text-[#fff]">جستجو های اخیر شما</div>
        <div onClick={() => {}}>{/* <RiDeleteBin6Line */}</div>
      </div>
      <div className="flex flex-wrap gap-4 items-center mt-4">
        <button className=" bg-[#EEF0F1] dark:bg-[#CDCFD4] dark:text-[#000]  px-2 py-1 rounded-md cursor-pointer">
          موبایل
        </button>
        <button className=" bg-[#EEF0F1] dark:bg-[#CDCFD4] dark:text-[#000]  px-2 py-1 rounded-md cursor-pointer">
          موبایل
        </button>
        <button className=" bg-[#EEF0F1] dark:bg-[#CDCFD4] dark:text-[#000]  px-2 py-1 rounded-md cursor-pointer">
          موبایل
        </button>
      </div>
    </div>
  );
};

export default MobileSearchOverlay;
