"use client";
import { request } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { FormContext } from "../../NewCategorySelector";
import { useTranslation } from "@/app/[locale]/TranslationContext";
const schema = z.object({
  plan_type: z.enum(["free", "vip"]),
});

const RecruitmentAdType = ({ isEditing, adData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      plan_type: "free",
    },
  });

  const router = useRouter();
  const { locale } = useParams();
  const dic = useTranslation();
  const r = dic.register_ad;

  const adTypes = [
    { label: "رایگان", value: "free", title: "Free" },
    { label: "VIP", value: "vip", title: "VIP" },
  ];

  const paymentMethods = ["پرداخت مستقیم", "پرداخت از کیف پول"];

  const mutation = useMutation({
    mutationFn: async (data) => {
      if (!isEditing) {
        await request({
          url: "/store/recruitment/seventh",
          method: "post",
          data: data,
        });
      } else {
        await request({
          url: `/update/recruitment/seventh/${adData?.first?.id}`,
          method: "post",
          data: data,
        });
      }
    },

    onSuccess: () => {
      if (!isEditing) {
        toast.success("فرم شما با موفقیت ارسال شد");
        router.push(`/${locale}/register-ad/successfull-ad`);
      } else {
        toast.success("آگهی با موفقیت ویرایش شد");
        router.push(`/${locale}/my-profile/my-ads`);
      }
    },
    onError: (err) => {
      toast.error(err.message || "خطایی رخ داده است");
    },
  });

  const planType = watch("plan_type");
  const { apiResponseData } = useContext(FormContext);
  const onSubmit = (data) => {
    const payload = { ad_id: apiResponseData, ...data };
    mutation.mutate(payload);
  };

  const handlePlanTypeChange = (value) => {
    setValue("plan_type", value);
  };

  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg h-160"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-semibold">{r.ad_type}</h2>

        {adTypes.map((adType) => (
          <div key={adType.value} className="flex items-center gap-3">
            <input
              type="radio"
              id={adType.value}
              value={adType.value}
              checked={planType === adType.value}
              onChange={() => handlePlanTypeChange(adType.value)}
              className="w-4 h-4 text-primary bg-gray-100 border-gray-300 focus:ring-primary focus:ring-2"
            />
            <label
              htmlFor={adType.value}
              className="text-sm font-medium text-alpha-100 cursor-pointer"
            >
              {locale === "fa" ? adType.label : adType.title}
            </label>
          </div>
        ))}

        {errors.plan_type && (
          <p className="text-red-500 text-sm">{errors.plan_type.message}</p>
        )}
      </div>

      {/* {planType === "vip" && (
        <div className="flex flex-col gap-4 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-lg font-medium">مزایای آگهی VIP</h3>
          <ul className="list-disc list-inside text-sm text-gray-700">
            <li>نمایش در صدر نتایج جستجو</li>
            <li>مدت زمان نمایش بیشتر</li>
            <li>دسترسی به آمار پیشرفته</li>
          </ul>
        </div>
      )} */}

      {/* <div className="flex justify-end">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? "در حال ارسال..." : "تایید و ادامه"}
        </button>
      </div> */}

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {r.cancel}
        </button>
        <button
          type="submit"
          disabled={mutation.isLoading}
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg disabled:opacity-50"
        >
          <span>{mutation.isLoading ? r.sending : r.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default RecruitmentAdType;
