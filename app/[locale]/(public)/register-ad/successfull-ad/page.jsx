"use client";
import React from "react";
import ArrowRight from "@/assets/icons/arrow-right.svg";
import CheckAdCircle from "@/assets/icons/check-ad-circle.svg";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/[locale]/TranslationContext";
const Page = () => {
  const params = useParams();
  const locale = params.locale;
  const dic = useTranslation();
  const b = dic.register_ad;
  return (
    <div className="h-120 bg-surface w-full max-w-200 mx-auto mt-16 border border-default-divider rounded-xl flex  items-center justify-center">
      <div className="flex items-center flex-col justify-between gap-8">
        <CheckAdCircle className="fill-primary-400 !w-28 !h-28" />
        <span className="text-alpha-100 text-lg">
          {b.ad_successfully_registered}
        </span>
        <Link
          href={`/${locale}`}
          className="flex text-Primary-400 items-center gap-2 w-52 justify-center border border-Primary-400 py-2 px-2 rounded-xl cursor-pointer transition-all duration-150 ease-in hover:scale-[0.98]"
        >
          <span>{b.back_to_main_page}</span>
          <ArrowRight className="fill-Primary-400" />
        </Link>
      </div>
    </div>
  );
};

export default Page;
