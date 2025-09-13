"use client";
import React from "react";
import Image from "next/image";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
gsap.registerPlugin(useGSAP);
const LogoSpin = () => {
  const logoRef = useRef(null);
  useGSAP(() => {
    const el = logoRef.current;

    if (!el) return;
    gsap.to(el, {
      rotation: 360,
      duration: 5,
      repeat: -1,
      ease: "linear",
    });

    // const handleEnter = () => {
    //   gsap.to(el, {
    //     width: 205,
    //     duration: 0.3,
    //     ease: "power2.out",
    //   });
    // };

    // const handleLeave = () => {
    //   gsap.to(el, {
    //     scale: 1,
    //     duration: 0.3,
    //     ease: "power2.out",
    //   });
    // };

    // el.addEventListener("mouseenter", handleEnter);
    // el.addEventListener("mouseleave", handleLeave);

    // return () => {
    //   el.removeEventListener("mouseenter", handleEnter);
    //   el.removeEventListener("mouseleave", handleLeave);
    // };
  }, []);
  return (
    <div
      ref={logoRef}
      className="logo absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2  bg-white/75 dark:bg-[#000000]/75  w-70 h-70 rounded-full flex justify-center shadow-md items-center z-[4] cursor-pointer"
    >
      <Image
        src="/images/biglogo.png"
        alt=""
        width={160}
        height={188}
        className=""
      ></Image>
    </div>
  );
};

export default LogoSpin;
