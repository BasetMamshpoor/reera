"use client";
import { Input } from "@/components/ui/input";
import React from "react";
import Tick from "@/assets/icons/tick.svg";
import { useTranslation } from "@/app/[locale]/TranslationContext";
const ConsultationRate = () => {
  const dic = useTranslation();
  const c = dic.consultor.edit;
  return (
    <div className="flex flex-col gap-6 w-full h-full ">
      <div className="flex flex-col gap-2 w-full rtl:items-end">
        <Input
          type={`text`}
          placeholder={c.enter_desired_amount}
          className={`w-1/2 placeholder:text-Gray-500 border rtl:text-right border-default-divider rtl:placeholder:text-right py-6 rounded-2xl`}
        />
      </div>

      <div className="flex flex-row ltr:justify-end rtl:flex-row-reverse  items-center w-full  gap-6 mt-auto ">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full rtl:flex-row-reverse items-center justify-center text-white bg-Primary-400 py-2 lg:w-42  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
          <span>ذخیره اطلاعات</span>
          <Tick className="fill-white " />
        </button>
      </div>
    </div>
  );
};

export default ConsultationRate;
