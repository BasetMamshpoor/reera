"use client";
import React from "react";
import Empty from "@/assets/icons/EmptyWallet.svg";
import PLus from "@/assets/icons/add.svg";
import Search from "@/assets/icons/search.svg";
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
              {a.no_transactions}
            </p>
            <p className="text-sm lg:text-base text-Gray-700 text-center">
              {a.transaction_info}
            </p>
          </div>
          <div className={`flex items-center justify-center gap-6 w-full`}>
            <div className="flex items-center justify-center gap-1 py-2 px-6 border border-Primary-400 rounded-xl w-fit text-Primary-400 text-base font-bold">
              <Search className="fill-primary-400" />
              <p className="pt-1">{a.search_ad}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Null;
