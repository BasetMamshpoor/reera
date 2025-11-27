"use client";
import React from "react";
import Empty from "@/assets/icons/message.svg";
const Null = ({ a }) => {
  return (
    <>
      <div className="flex flex-col items-center justify-center w-full gap-4 pb-6">
        <Empty className="fill-Gray-950 !w-44 !h-44" />
        <div className="flex flex-col items-center justify-center w-full h-full gap-10">
          <div
            className={`flex items-center justify-center w-full flex-col gap-4`}
          >
            <p className="lg:text-xl text-secondary font-bold ">
              {a.no_ratings_yet}
            </p>
            <p className="text-sm lg:text-base text-Gray-700 text-center">
              {a.ratings_info}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Null;
