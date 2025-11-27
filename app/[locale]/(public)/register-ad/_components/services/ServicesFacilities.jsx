import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { request } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { FormContext } from "../../NewCategorySelector";
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
const schema = z.object({
  work_hours: z.string().min(1, "ساعات کاری الزامی است"),
  text: z.string().min(1, "توضیحات الزامی است"),
});
const ServicesFacilities = () => {
  const {
    handleSubmit,
    formState: { errors },
    register,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { apiResponseData, setCurrentStep } = useContext(FormContext);
  const dic = useTranslation();
  const s = dic.register_ad;

  const ServicesFacilities = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/store/services/third",
        method: "post",
        data,
      }),
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`Failed to submit ${err?.message}`);
    },
  });

  const onSubmit = (data) => {
    const payload = { ad_id: apiResponseData, ...data, time: data.work_hours };

    ServicesFacilities.mutate(payload);
  };
  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full flex flex-col gap-6">
        <div className="w-full flex flex-col gap-2">
          <Input
            {...register("work_hours")}
            className="focus:placeholder:opacity-0 py-6 rounded-xl"
            placeholder={s.work_hours}
          />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Textarea
            {...register("text")}
            placeholder={s.description}
            className={`focus:placeholder:opacity-0 py-6 rounded-xl`}
          />
          {errors.text && (
            <p className="text-error-main text-sm mt-1">
              {errors.text.message}
            </p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] hover:scale-[0.98] duration-100 transition-all w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {s.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row hover:scale-[0.98] duration-100 transition-all gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span className="text-alphaw-100">
            {ServicesFacilities.isLoading ? s.sending : s.next}
          </span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default ServicesFacilities;
