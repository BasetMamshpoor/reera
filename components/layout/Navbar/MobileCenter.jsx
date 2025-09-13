"use client";
import React, { useRef } from "react";
import Image from "next/image";

import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(useGSAP, ScrollTrigger);

const MobileCenter = () => {
  // const logoRef = useRef(null);
  //
  // useGSAP(() => {
  //   if (!logoRef.current) return;
  //
  //   gsap.to(logoRef.current, {
  //     y: 2000,
  //     rotate: 360,
  //     ease: "sine.out", // Smoother easing
  //     scrollTrigger: {
  //       trigger: document.body,
  //       start: "top top",
  //       end: "+=2600",
  //       scrub: 1, // Smoother scrubbing (1 second delay)
  //       markers: false, // Remove in production
  //     },
  //   });
  // });

  return (
    <div
      // ref={logoRef}
      className="lg:hidden absolute -translate-x-1/2 left-1/2 cursor-pointer z-50 will-change-transform"
    >
      {/* <ManiLogo /> */}
      <Image alt="" src="/images/logo.png" width={68} height={80}></Image>
    </div>
  );
};

export default MobileCenter;
