"use client";
import React from "react";
import StarIcon from "@/assets/icons/star.svg";
import StarBoldIcon from "@/assets/icons/add.svg";

/**
 * @param {{ rating: number, total?: number, className?: string }} props
 */
const Star = ({ rating, total = 5, className }) => {
  return (
    <div className={`flex items-center gap-1 ${className || ""}`}>
      {Array.from({ length: total }, (_, i) => {
        const starNumber = i + 1;
        return starNumber <= rating ? (
          <StarBoldIcon key={i} className="fill-[#F59E0B] w-4 h-4" />
        ) : (
          <StarIcon key={i} className="fill-[#F59E0B] w-3 h-3" />
        );
      })}
    </div>
  );
};

export default Star;
