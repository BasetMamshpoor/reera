"use client";
import React from "react";
import StarIcon from "@/assets/icons/star.svg";
import Point from "./Point";
import Null from "./Null";
import Comment from "../../_components/Comment";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const Details = () => {
  const dic = useTranslation();
  const a = dic.public.profile.user_feedback;
  return (
    <>
      <div className="flex flex-col dark:bg-[#252C36] w-full border border-gray-200 dark:border-[#374151] rounded-xl bg-white">
        <div className="hidden lg:flex items-center gap-2 p-5 border-b dark:border-[#374151] border-gray-200">
          <StarIcon className="fill-gray-800 dark:fill-gray-200" />
          <p className="text-xl dark:text-[#E0E2E5] text-black font-bold pt-1">
            {a.user_ratings_feedback}
          </p>
        </div>
        <div className="flex flex-col gap-8 p-6">
          <Point a={a} />
          <Comment a={a} />
        </div>
      </div>
    </>
  );
};

export default Details;
