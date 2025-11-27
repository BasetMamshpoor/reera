import React from "react";
import Card from "./Card";
import JobSearch from "./JobSearch";

const ColAds = ({ isRow, data }) => {
  return (
    <>
      <div
        className={`grid ${
          !isRow ? "xl:grid-cols-3 lg:grid-cols-2" : "grid-cols-1"
        }   w-full mx-auto px-4 gap-2`}
      >
        {data.map((i) => (
          <Card key={i.id} isRow={isRow} {...i} />
        ))}
      </div>
    </>
  );
};

export default ColAds;
