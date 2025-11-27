"use client";
import React, { useContext, useEffect } from "react";
import { useTranslation } from "@/app/[locale]/TranslationContext";

import { Controller, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import Arrow from "@/assets/icons/arrow-down.svg";
import { FormContext } from "../../NewCategorySelector";
import { toast } from "sonner";

const DigitalFacilities = ({ isEditing, adData }) => {
  const dic = useTranslation();
  const a = dic.public.register_ad.digital;

  const { setCurrentStep, apiResponseData } = useContext(FormContext);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ad_id: apiResponseData,
      phone_case: false,
      glass: false,
      stand: false,
      cable: false,
      text: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (formData) =>
      await request({
        method: "post",
        url: !isEditing
          ? "/store/digital/third"
          : `/update/digital/third/${adData?.first.id}`,
        data: formData,
      }),

    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`something went wrong! ${err?.message}`);
    },
  });

  const onSubmit = (dataForm) => {
    const payload = {
      ad_id: apiResponseData,
      phone_case: dataForm.phone_case,
      glass: dataForm.glass,
      stand: dataForm.stand,
      cable: dataForm.cable,
      text: dataForm.text,
    };
    mutation.mutate(payload);
  };

  useEffect(() => {
    if (isEditing && adData?.third) {
      const third = adData.third;
      setValue("phone_case", Boolean(third.phone_case));
      setValue("glass", Boolean(third.glass));
      setValue("stand", Boolean(third.stand));
      setValue("cable", Boolean(third.cable));
      setValue("text", third.text || "");
    }
  }, [isEditing, adData, setValue]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between w-full h-screen lg:h-full bg-surface"
    >
      <div className="flex flex-col gap-4 lg:gap-10 w-full py-12 ltr:pl-12 ltr:pr-6 rtl:pr-12 rtl:pl-6">
        <div className="flex flex-col gap-3 w-full">
          <p className="text-base text-Gray-700 font-medium">{a.facilities}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
            <div className="flex items-center gap-2">
              <Controller
                name="phone_case"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label className="text-sm">{a.case}</label>
            </div>
            <div className="flex items-center gap-2">
              <Controller
                name="glass"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label className="text-sm">{a.screen_protector}</label>
            </div>
            <div className="flex items-center gap-2">
              <Controller
                name="stand"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label className="text-sm">{a.stand}</label>
            </div>
            <div className="flex items-center gap-2">
              <Controller
                name="cable"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <label className="text-sm">{a.extra_cable}</label>
            </div>
          </div>
        </div>
        <div>
          <Controller
            name="text"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder={a.description}
                className="w-full py-5 border rounded-xl"
              />
            )}
          />
        </div>
      </div>

      <div className="flex flex-row items-center rounded-xl shadow-mobile lg:shadow-none w-full justify-end gap-6 mt-auto py-6 px-4">
        <button
          type="button"
          className="py-2 lg:w-32 border-2 w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          <p className="ltr:pt-1">{a.cancel}</p>
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span className="ltr:pt-1">{a.next}</span>
          <Arrow className="fill-white rotate-90 ltr:-rotate-90" />
        </button>
      </div>
    </form>
  );
};

export default DigitalFacilities;
