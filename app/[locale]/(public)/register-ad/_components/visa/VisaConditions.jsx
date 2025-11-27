"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { FormContext } from "../../NewCategorySelector";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import { Textarea } from "@/components/ui/textarea";
import CountrySelect from "../../_components/common/CountrySelect";
import { request } from "@/lib/api";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { Input } from "@/components/ui/input";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import CustomDatePicker from "../../_components/common/CustomDatePicker";
const schema = z.object({
  text: z.string().min(1, "توضیحات الزامی است"),
  Documents: z.string().min(1, "ارائه مدارک الزامی است"),
  credit: z.string().min(1, "وارد کردن اطلاعات اعتباری الزامی است"),
  date_of_get_visa: z.date().min(1, "تاریخ دریافت ویزا الزامی است"),
});
const VisaConditions = ({ isEditing, adData }) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {},
  });
  const dic = useTranslation();
  const selectedCountryId = watch("country_id");
  const l = dic.public.register_ad.location_form;
  const mutation = useMutation({
    mutationFn: (data) =>
      request({
        url: !isEditing && "/store/visa/third",
        method: "post",
        data,
      }),
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error("Error submitting visa conditions:", error);
    },
  });

  const onSubmit = (data) => {
    // Format the date to "YYYY-MM-DD"
    const formattedDate = data.date_of_get_visa
      ? new Date(data.date_of_get_visa).toISOString().split("T")[0]
      : null;

    const payload = {
      ad_id: apiResponseData,
      country_id: selectedCountryId,
      ...data,
      date_of_get_visa: formattedDate, // This will be "2025-06-08"
    };

    mutation.mutate(payload);
  };
  const { setCurrentStep, apiResponseData } = React.useContext(FormContext);
  return (
    <form
      className="w-full lg:p-10 p-4 flex flex-col lg:gap-10 gap-8 bg-Surface-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <CustomDatePicker
        value={watch("date_of_get_visa")}
        onChange={(date) => setValue("date_of_get_visa", date)}
        placeholder="تاریخ اخذ ویزا را انتخاب کنید"
      />
      {errors.date_of_get_visa && (
        <p className="text-red-500 text-sm mt-1">
          {errors.date_of_get_visa.message}
        </p>
      )}
      <CountrySelect
        value={selectedCountryId}
        onChange={(val) => {
          setValue("country_id", val, {
            shouldValidate: true,
          });
        }}
        label={l.location_country}
        translations={l}
      />
      <Input
        {...register("Documents")}
        className={`py-5 w-full rtl:text-right`}
        placeholder="مدارک خود را وارد کنید(مثال: پاسپورت، عکس و...)"
      />
      <Input
        {...register("credit")}
        className={`py-5 w-full rtl:text-right`}
        placeholder="اعتبار ویزا را وارد کنید(مثال: 6 ماهه، یکساله و...)"
      />
      <Textarea
        placeholder={`توضیحات لازم را وارد کنید`}
        className={``}
        {...register("text")}
      />

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] hover:scale-[0.98] duration-100 transition-all w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {/* {t.cancel} */}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row hover:scale-[0.98] duration-100 transition-all gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          {/* <span>{TicketMutation.isLoading ? t.sending : t.next}</span> */}
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default VisaConditions;
