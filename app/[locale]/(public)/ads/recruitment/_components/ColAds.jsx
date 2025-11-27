import React from "react";
import JobSearch from "./JobSearch";

const ColAds = ({isRow, data}) => {
    return (
        <>
            <div
                className={`grid ${
                    !isRow ? "xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2" : "grid-cols-1"
                }   w-full mx-auto px-4 gap-2`}
            >
                {data.map((i) => (
                    <JobSearch key={i.id} isRow={isRow} i={i}/>
                ))}
            </div>
        </>
    );
};

export default ColAds;
