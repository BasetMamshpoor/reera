import React from "react";
import Card from "./Card";
import JobSearch from "./JobSearch";

const ColAds = ({ isRow, data }) => {
  return (
    <>
      <div
        className={`grid grid-cols-1 md:grid-cols-1 gap-x-6 gap-y-10 w-full`}
      >
        {data.map((i) => (
          <Card key={i.id} isRow={isRow} {...i} />
        ))}
      </div>
    </>
  );
};

export default ColAds;
