"use client";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation } from "@tanstack/react-query";
import { useContext, useEffect } from "react";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { request } from "@/lib/api";
import { FormContext } from "../../NewCategorySelector";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { toast } from "sonner";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Warning from "@/assets/icons/warning.svg";
const schema = z.object({
  title: z.string().min(1, "عنوان آگهی الزامی است"),
  area: z.coerce.string().min(1, "متراژ الزامی است"),
  year: z.coerce.string().min(1, "سال ساخت الزامی است"),
  number_of_bedrooms: z.string().min(1, "تعداد اتاق خواب الزامی است"),
  number_of_bathroom: z.string().min(1, "تعداد سرویس بهداشتی الزامی است"),
  type: z.enum(["ad", "request"]),
});

export default function AdForm({ isEditing = false, adData }) {
  const {
    formData,
    updateFormData,
    setCurrentStep,
    selectedCategory,
    setApiResponseData,
  } = useContext(FormContext);

  const dic = useTranslation("");
  const r = dic.public.register_ad.real_estate;
  const info = dic.public.register_ad;
  const sectionKey = "adForm";
  const savedValues = formData?.[sectionKey] || {};

  const defaultValues = {
    type: adData?.first?.type || savedValues.type || "ad",
    title: adData?.first?.title || savedValues.title || "",
    area: adData?.first?.area || savedValues.area || "",
    year: adData?.first?.year || savedValues.year || "",
    number_of_bedrooms:
      adData?.first?.number_of_bedrooms || savedValues.number_of_bedrooms || "",
    number_of_bathroom:
      adData?.first?.number_of_bathroom || savedValues.number_of_bathroom || "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // Watch all fields so we can save as they change
  const watchedValues = watch();

  // Persist to sessionStorage whenever something changes
  // useEffect(() => {
  //   updateFormData(sectionKey, watchedValues);
  // }, [watchedValues]);

  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/housing/first"
          : `/update/housing/first/${adData?.first?.id}`,
        method: "post",
        data,
      }),
    onSuccess: (res) => {
      if (!isEditing) {
        setApiResponseData(res?.data);
      }
      setCurrentStep((prev) => prev + 1);
    },
    onError: (error) => {
      toast.error(`Failed to submit the form ${error.message}`);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      ...data,
      category_id: selectedCategory?.id,
    };
    mutation.mutate(payload);
  };

  const requesterType = watch("type");

  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160"
    >
      <div className="flex flex-col gap-4 lg:gap-10">
        {/* Title */}
        <div className="w-full">
          <Input
            placeholder={r.ad_title}
            {...register("title")}
            className="focus:placeholder:opacity-0 py-6 rounded-xl"
          />
          {errors.title && (
            <p className="text-error-main text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Area + Year */}
        <div className="flex flex-col lg:flex-row w-full items-center gap-4">
          <div className="w-full">
            <Input
              type="number"
              className="py-6 rounded-xl"
              placeholder={r.area}
              {...register("area")}
            />
            {errors.area && (
              <p className="text-error-main text-sm mt-1">
                {errors.area.message}
              </p>
            )}
          </div>
          <div className="w-full">
            <Input
              type="text"
              className="py-6 rounded-xl"
              placeholder={r.build_year}
              {...register("year")}
            />
            {errors.year && (
              <p className="text-error-main text-sm mt-1">
                {errors.year.message}
              </p>
            )}
          </div>
        </div>

        {/* Requester Type Checkboxes */}
        <div className="w-full flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Checkbox
              id="request"
              checked={requesterType === "request"}
              onCheckedChange={(checked) =>
                checked && handleRequesterTypeChange("request")
              }
            />
            <HoverCard>
              <HoverCardTrigger>
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-Primary-700">{r.requester}</span>
                  <Warning className="fill-Primary-400" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className={`rtl:text-right`}>
                {info.select_to_be_requester}
              </HoverCardContent>
            </HoverCard>
            {/* <Label htmlFor="request" className="cursor-pointer">
              {r.requester}
            </Label> */}
          </div>
          <div className="flex items-center gap-2">
            <Checkbox
              id="ad"
              checked={requesterType === "ad"}
              onCheckedChange={(checked) =>
                checked && handleRequesterTypeChange("ad")
              }
            />

            <HoverCard>
              <HoverCardTrigger>
                {" "}
                <div className="flex items-center gap-2 cursor-pointer">
                  <span className="text-Primary-700">{r.register_ad}</span>
                  <Warning className="fill-Primary-400" />
                </div>
              </HoverCardTrigger>
              <HoverCardContent className={`rtl:text-right`}>
                {info.select_to_publish_ad}
              </HoverCardContent>
            </HoverCard>

            {/* <Label htmlFor="ad" className="cursor-pointer">
              {r.register_ad}
            </Label> */}
          </div>
        </div>

        {/* Bedroom + Bathroom */}
        <div className="flex flex-col lg:flex-row w-full items-center gap-4">
          <div className="w-full">
            <Select
              value={watchedValues.number_of_bedrooms}
              onValueChange={(val) => setValue("number_of_bedrooms", val)}
            >
              <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
                <SelectValue placeholder={r.bedroom_count} />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.number_of_bedrooms && (
              <p className="text-error-main text-sm mt-1">
                {errors.number_of_bedrooms.message}
              </p>
            )}
          </div>

          <div className="w-full">
            <Select
              value={watchedValues.number_of_bathroom}
              onValueChange={(val) => setValue("number_of_bathroom", val)}
            >
              <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
                <SelectValue placeholder={r.bathroom_count} />
              </SelectTrigger>
              <SelectContent>
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={`${i + 1}`}>
                    {i + 1}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.number_of_bathroom && (
              <p className="text-error-main text-sm mt-1">
                {errors.number_of_bathroom.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          onClick={() => setCurrentStep((prev) => prev - 1)}
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {r.back}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span>{mutation.isLoading ? r.sending : r.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
}
