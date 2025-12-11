"use client";
import React, { useContext, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { FormContext } from "../../NewCategorySelector";
import useSwipeScroll from "../../../../../../hooks/useHorizontalScroll";

export default function DesktopPagination({ currentStep, setCurrentStep }) {
  const dic = useTranslation("");
  const s = dic.public.register_ad.steps;
  const { slug } = useContext(FormContext);
  const scrollRef = useSwipeScroll();

  const [maxStepVisited, setMaxStepVisited] = useState(currentStep);

  useEffect(() => {
    if (currentStep > maxStepVisited) {
      setMaxStepVisited(currentStep);
    }
  }, [currentStep, maxStepVisited]);

  // ✅ Define steps conditionally based on slug
  let steps = [
    s.select_category,
    s.general_info,
    s.location_address,
    s.amenities,
    s.images,
    s.contact_info,
    s.conditions,
  ];

  if (slug === "recruitment") {
    steps.push(s.ad_type);
  }
  if (slug === "visa") {
    steps = [
      s.select_category,
      s.visa,
      s.visa_conditions,
      s.images,
      s.contact_info,
    ];
  }

  if (slug === "trip") {
    steps = [
      s.route_information,
      s.vehicle_capacity,
      s.price_confirmation,
      s.images,
    ];
  }

  return (
    <div className="bg-[#0F1E2E] block rounded-tl-2xl text-white lg:max-w-64 w-full py-6 px-4 relative lg:h-160">
      <div
        ref={scrollRef}
        className="flex lg:flex-col gap-6 relative z-10 flex-row overflow-x-auto scroll-smooth scroll-hidden h-full justify-around"
      >
        {steps.map((label, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isClickable = step <= maxStepVisited;

          return (
            <div
              key={step}
              onClick={() => {
                if (isClickable) setCurrentStep(step);
              }}
              className={cn(
                "flex items-center gap-3 select-none transition-colors flex-col lg:flex-row justify-c",
                isClickable ? "cursor-pointer hover:opacity-80" : "opacity-60"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all lg:flex-col flex-row",
                  isCurrent
                    ? "bg-white text-black border-white"
                    : isCompleted
                    ? "border-white bg-white text-black"
                    : "border-gray-400 text-gray-400"
                )}
              >
                {step}
              </div>
              <span
                className={cn(
                  "text-sm transition-colors whitespace-nowrap",
                  isCurrent || isCompleted ? "text-white" : "text-Gray-400"
                )}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
