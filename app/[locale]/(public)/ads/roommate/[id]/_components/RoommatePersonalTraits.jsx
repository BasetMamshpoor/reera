import React from 'react';
import Tick from "@/assets/icons/tick-circle.svg"

const RoommatePersonalTraits = () => {
    return (
        <>
            <div
                className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                <div className="flex items-center gap-2">
                    <Tick className="fill-green-600"/>
                    <p className="text-sm lg:text-base text-secondary pt-1">آهل موزیک گوش دادن هستم</p>
                </div>
            </div>
        </>
    );
};

export default RoommatePersonalTraits;