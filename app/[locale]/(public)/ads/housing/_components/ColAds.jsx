import React from "react";
import Card from "../../_components/Card";
import JobSearch from "./JobSearch";

const ColAds = ({isRow, data}) => {
    const Type = "housing"

    return (
        <>
            <div
                className={`grid ${
                    !isRow ? "lg:grid-cols-2 md:grid-cols-2 grid-cols-1" : "grid-cols-1"
                }   w-full mx-auto px-4 gap-2`}
            >
                {data.map((i) => (
                    <Card key={i.id} isRow={isRow} i={i} Type={Type}/>
                ))}
            </div>
        </>
    );
};

export default ColAds;
