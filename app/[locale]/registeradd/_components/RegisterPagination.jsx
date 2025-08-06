"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

const RegisterPagination = ({ totalSteps, currentStep, setCurrentStep }) => {
  // ← Updated from 5 to 6

  return (
    <Pagination className={`lg:hidden`}>
      <PaginationContent className="relative flex items-center w-full max-w-xl mx-auto">
        {/* Background line (gray) */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 w-full -z-10 transform -translate-y-1/2" />

        {/* Progress line (blue) */}
        <div
          className="absolute top-1/2 left-0 h-1 bg-blue-500 -z-10 transform -translate-y-1/2 transition-all duration-500 ease-in-out"
          style={{
            width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%`,
          }}
        />

        {/* Steps */}
        {[...Array(totalSteps)].map((_, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;

          return (
            <div key={step} className="flex-1 flex justify-center">
              <div
                className={`p-2 rounded-full border-[1px] transition-colors duration-300 cursor-pointer ${
                  isCompleted
                    ? "bg-blue-100 border-blue-500"
                    : isCurrent
                    ? "bg-blue-500 border-blue-500"
                    : "hover:bg-blue-100 border-gray-300"
                }`}
              >
                <PaginationItem>
                  <PaginationLink
                    className={`hover:bg-transparent transition-colors duration-300 ${
                      isCompleted
                        ? "text-blue-600"
                        : isCurrent
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                    href="#"
                    onClick={() => setCurrentStep(step)}
                  >
                    {step}
                  </PaginationLink>
                </PaginationItem>
              </div>
            </div>
          );
        })}
      </PaginationContent>
    </Pagination>
  );
};

export default RegisterPagination;
