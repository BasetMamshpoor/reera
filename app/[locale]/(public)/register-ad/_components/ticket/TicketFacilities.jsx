import { Textarea } from "@/components/ui/textarea";
import { request } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { FormContext } from "../../NewCategorySelector";
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
const schema = z.object({
  text: z.string().min(1, "توضیحات الزامی است"),
});
const TicketFacilities = ({ isEditing = false, adData }) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const dic = useTranslation();
  const t = dic.register_ad;

  const { apiResponseData, setCurrentStep } = useContext(FormContext);

  const FacilitiesMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/ticket/third"
          : `/update/ticket/third/${adData.first.id}`,
        method: "post",
        data,
      }),

    onSuccess: (data) => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`failed to submit the from ${err?.message}`);
    },
  });

  useEffect(() => {
    if (isEditing && adData?.third) {
      const third = adData?.third;
      reset({
        text: third.text,
      });
    }
  }, [reset, isEditing, adData]);

  const onSubmit = (data) => {
    const payload = { ad_id: apiResponseData, ...data };
    FacilitiesMutation.mutate(payload);
  };
  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 w-full">
        <Textarea
          {...register("text")}
          className={`focus:placeholder:opacity-0 py-6 rounded-xl`}
          placeholder={t.description}
        />
      </div>

      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {t.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span>{FacilitiesMutation.isLoading ? t.sending : t.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default TicketFacilities;
