import React from 'react';
import DigitalSidebar from "./DigitalSidebar"
import AdvsRes from "@/app/[locale]/(public)/ads/_components/AdvsRes";
const Details = () => {
    return (
        <div className="flex gap-6 lg:flex-row flex-col">
            <DigitalSidebar/>
            <AdvsRes link={`/${locale}/ads`} category_id={categoryId} category_slug={"digital"}
                     page={page}/>
        </div>
    );
};

export default Details;