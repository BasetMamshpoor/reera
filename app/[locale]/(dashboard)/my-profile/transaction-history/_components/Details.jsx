"use client";
import React from "react";

import Transaction from "@/assets/icons/TransactionMinus.svg";
import Null from "./Null";
import Table from "./TableTransaction";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const Details = () => {
  const dic = useTranslation();
  const a = dic.public.profile.transaction_history;
  return (
    <>
      <div className="flex flex-col bg-surface w-full py-6 px-4 lg:p-6 border border-default-divider rounded-xl">
        <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
          <Transaction className="fill-gray-800 dark:fill-gray-200" />
          <p className="text-xl dark:text-[#E0E2E5] text-black font-bold pt-1">
            {a.transaction_history}
          </p>
        </div>

        <div className="w-full py-6">
          <Table a={a} />
        </div>

        {/*<div className=" w-full">*/}
        {/*    <Null a={a}/>*/}
        {/*</div>*/}
      </div>
    </>
  );
};

export default Details;
