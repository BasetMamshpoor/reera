import React from "react";
import Card from "@/app/[locale]/(public)/ads/_components/Card";

const ColAds = ({isRow, data, link}) => {
    return (
        <>
            <div
                className={`grid xl:grid-cols-3 md:grid-cols-2 grid-cols-1 w-full mx-auto gap-2`}
            >
                {data.map((i) => (
                    <Card key={i.id} link={link} isRow={isRow} i={i}/>
                ))}
            </div>
        </>
    );
};

export default ColAds;
