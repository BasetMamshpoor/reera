import React from "react";
import Card from "@/app/[locale]/(public)/ads/_components/Card";

const RowsAds = ({isRow, data, link}) => {
    return (
        <div className={`grid grid-cols-1 xl:grid-cols-2 gap-4 w-full`}>
            {data?.map((i) => (
                <Card key={i.id} link={link} isRow={isRow} i={i}/>
            ))}
        </div>
    );
};

export default RowsAds;
