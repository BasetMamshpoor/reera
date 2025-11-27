"use client";
import { useState } from "react";
import StarFilled from "@/assets/icons/Star-bold.svg";
import StarOutline from "@/assets/icons/star.svg";

const RatingInput = ({ onChange }) => {
    const [value, setValue] = useState(0);

    const handleSelect = (num) => {
        setValue(num);
        if (typeof onChange === "function") {
            onChange(num);
        }
    };

    return (
        <div className="flex flex-row-reverse gap-4 items-center">
            {[1, 2, 3, 4, 5].map((num) => (
                <div
                    key={num}
                    className="flex flex-col items-center cursor-pointer"
                    onClick={() => handleSelect(num) }
                >
                    {value >= num ? (
                        <StarFilled className="w-6 h-6 fill-warning-main" />
                    ) : (
                        <StarOutline className="w-6 h-6 fill-warning-main" />
                    )}
                    <span className="text-sm mt-1">{num}</span>
                </div>
            ))}
        </div>
    );
};

export default RatingInput;
