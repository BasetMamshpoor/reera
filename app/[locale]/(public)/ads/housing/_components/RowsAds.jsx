import React from "react";
import Card from "./Card";

const RowsAds = ({ isRow, data }) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-10 w-full`}>
      {data?.map((i) => (
        <Card key={i.id} isRow={isRow} {...i} />
      ))}
      {/* <Card isRow={isRow} /> */}
      {/* <JobSearch isRow={isRow} /> */}
    </div>
  );
};

export default RowsAds;
