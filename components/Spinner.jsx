"use client";
import React from "react";

const Spinner = ({ size = 50, color = "#2563EB" }) => {
    return (
        <div
            style={{ width: size, height: size }}
            className="flex items-center justify-center"
        >
            <div
                className="rounded-full border-4 border-t-transparent animate-spin"
                style={{
                    width: size,
                    height: size,
                    borderColor: `${color} ${color} ${color} transparent`,
                }}
            ></div>
        </div>
    );
};

export default Spinner;
