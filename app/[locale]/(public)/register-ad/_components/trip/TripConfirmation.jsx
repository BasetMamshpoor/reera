import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";

const TripConfirmation = () => {
  const { handleSubmit } = useForm();
  const { locale } = useParams();
  const router = useRouter();

  const onSubmit = () => {
    router.push(`/${locale}/register-ad/successfull-ad`);
    sessionStorage.clear();
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full flex flex-col gap-8 h-full py-12 bg-surface  "
    >
      <div className="flex flex-col gap-4 w-full max-w-sm mx-auto bg-Gray-100 p-4 rounded-lg">
        <p className="font-bold text-xl text-center">تایید نهایی</p>
        <div className="flex w-full justify-between">
          <p className="font-semibold">مبلغ سفر</p>
          <span>{sessionStorage.getItem("price")}</span>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-semibold">تاریخ شروع</p>
          <span>{sessionStorage.getItem("start_date")}</span>
        </div>
        <div className="flex w-full justify-between">
          <p className="font-semibold">تاریخ پایان</p>
          <span>{sessionStorage.getItem("end_date")}</span>
        </div>

        <button
          type="submit"
          className="border border-Primary-400 rounded-lg py-3 w-full max-w-42 cursor-pointer hover:bg-Primary-400 transition-all duration-150 ease-in-out text-Primary-400 self-center hover:text-alphaw-100"
        >
          تایید و ثبت آگهی
        </button>
      </div>
    </form>
  );
};

export default TripConfirmation;
