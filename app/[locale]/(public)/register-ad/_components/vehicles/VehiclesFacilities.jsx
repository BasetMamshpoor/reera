import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { Input } from "@/components/ui/input";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { FormContext } from "../../NewCategorySelector";
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const schema = z.object({
  motor: z.string().min(1, "وضعیت موتور الزامی است"),
  chassis_status: z.string().min(1, "وضعیت شاسی الزامی است"),
  body: z.string().min(1, "بدنه اوتومبیل الزامی است"),
  feul_type: z.string().min(1, "نوع سوخت الزامی است"),
  text: z.string().min(1, "لطفا توضیحات را وارد کنید"),
});
const VehiclesFacilities = ({ isEditing = false, adData }) => {
  const {
    handleSubmit,
    register,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const dic = useTranslation();
  const v = dic.register_ad;
  const { setCurrentStep, apiResponseData } = useContext(FormContext);
  const FacilitiesMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/vehicle/third"
          : `/update/vehicles/third/${adData.first.id}`,
        method: "post",
        data,
      }),

    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`Failed to submit the from ${err?.message}`);
    },
  });
  useEffect(() => {
    const third = adData?.third;
    if (third && isEditing) {
      reset({
        motor: third?.motor || "",
        body: third?.frame || "",
        chassis_status: third?.chassis_status || "",
        feul_type: third?.feul_type || "",
        text: third?.text || "",
      });
    }
  }, [adData, reset, isEditing]);

  const onSubmit = (data) => {
    const payload = {
      ad_id: apiResponseData,
      ...data,
    };

    FacilitiesMutation.mutate(payload);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:p-10 p-6 flex flex-col gap-6 lg:gap-10 bg-Surface-2"
    >
      <div className="flex lg:flex-row flex-col gap-6">
        <Input
          {...register("motor")}
          placeholder={v.engine}
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
        />
        <Input
          {...register("chassis_status")}
          placeholder={v.chassis_condition}
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
        />
      </div>
      <div className="flex lg:flex-row flex-col gap-6">
        <Input
          {...register("body")}
          placeholder={v.body}
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
        />
        <Input
          {...register("feul_type")}
          placeholder={v.fuel_type}
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
        />
      </div>
      <div className="w-full">
        <Textarea
          {...register("text")}
          className={`focus:placeholder:opacity-0 py-6 rounded-xl`}
          placeholder={v.description}
        />
      </div>

      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
        >
          {v.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-[#4299C1] py-2 lg:w-32 rounded-lg"
        >
          <span className="text-alphaw-100">
            {FacilitiesMutation.isPending ? v.sending : v.next}
          </span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default VehiclesFacilities;
