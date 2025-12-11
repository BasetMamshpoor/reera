import React from 'react';
import Tick from "@/assets/icons/check-ad-circle.svg"

const RoommatePersonalTraits = ({data}) => {
    return (
        <>
            <div
                className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-6 bg-surface border border-default-divider rounded-2xl">
                {data?.attributes?.map((index) =>
                    <div className="flex items-center gap-2">
                        <Tick className="fill-success-main !w-5 !h-5"/>
                        <p className="text-base text-secondary pt-1">{index}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default RoommatePersonalTraits;