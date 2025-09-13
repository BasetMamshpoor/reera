"use client";
import React from "react";
import { cn } from "@/lib/utils";

const steps = [
  "انتخاب دسته‌بندی",
  "اطلاعات کلی",
  "موقعیت و آدرس",
  "امکانات",
  "تصاویر",
  "اطلاعات تماس",
  "شرایط",
];

export default function DesktopPagination({ currentStep, setCurrentStep }) {
  return (
    <div className="bg-[#0F1E2E] hidden lg:block rounded-tl-2xl text-white w-64 py-6 px-4 relative">
      {/* Vertical Line */}
      <div className="flex flex-col gap-16 relative z-10">
        {/* <div className="absolute left-4 top-8 bottom-8 w-px bg-gray-600 z-0" /> */}

        {steps.map((label, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div
              key={step}
              className={cn(
                "flex items-center gap-3 select-none",

                "cursor-default"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 flex items-center justify-center rounded-full border-2 transition-all",
                  isCurrent
                    ? "bg-white text-black border-white"
                    : isCompleted
                    ? "border-white bg-white text-black dark:text-black"
                    : "border-gray-400 text-gray-400"
                )}
              >
                {step}
              </div>
              <span
                className={cn(
                  "text-sm transition-colors",
                  isCurrent || isCompleted ? "text-white" : "text-gray-400"
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
