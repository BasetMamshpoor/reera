"use client";
import React, { useContext, useEffect } from "react";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { FormContext } from "../../NewCategorySelector";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { useParams } from "next/navigation";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Warning from "@/assets/icons/warning.svg";
const schema = z.object({
  title: z.string().min(1, "عنوان الزامی است"),
  type: z.enum(["ad", "request"]),
  condition: z.enum(["new", "almost_new", "used", "needs_repair"]),
});
const BusinessForm = ({ isEditing = false, adData }) => {
  const { id } = useParams();
  const dic = useTranslation();
  const { locale } = useParams();
  const b = dic.register_ad;
  const info = dic.public.register_ad;
  const {
    handleSubmit,
    setValue,
    watch,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "ad",
    },
  });
  const conditionOptions = [
    { value: "new", label: "نو", title: "New" },
    { value: "almost_new", label: "در حد نو", title: "Almost New" },
    { value: "used", label: "کار کرده", title: "Used" },
    { value: "needs_repair", label: "نیاز به تعمیر", title: "Needs Repair" },
  ];
  function setFormValues(setValue, data, map) {
    Object.entries(map).forEach(([formKey, dataPath]) => {
      setValue(formKey, data[dataPath] || "");
    });
  }
  useEffect(() => {
    if (isEditing && adData?.first) {
      setFormValues(setValue, adData.first, {
        title: "title",
        brand: "brand_id",
        model: "model_id",
        condition: "condition",
        duration: "duration",
        type: "type",
      });
    }
  }, [isEditing, adData, setValue]);

  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };
  const requesterType = watch("type");
  const { setCurrentStep, categoryID, setApiResponseData } =
    useContext(FormContext);
  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/business/first"
          : `/update/business/first/${adData?.first?.id}`,
        method: "post",
        data,
      }),

    onSuccess: (data) => {
      if (!isEditing) {
        setApiResponseData(data?.data);
      }
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`Something went wrong ${err?.message}`);
    },
  });

  const onSubmit = (data) => {
    const payload = {
      category_id: categoryID,
      ...data,
    };
    mutation.mutate(payload);
  };
  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg h-160 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-6 w-full">
        <div className="w-full">
          <Input
            placeholder={b.ad_title}
            {...register("title")}
            className="focus:placeholder:opacity-0 py-6 rounded-xl"
          />
          {errors.title && (
            <p className="text-error-main text-sm mt-1">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* Condition */}

        <div className="flex flex-col gap-4 w-full">
          {/* Condition Select */}
          <Select onValueChange={(val) => setValue("condition", val)}>
            <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
              <SelectValue placeholder={b.item_condition} />
            </SelectTrigger>
            <SelectContent>
              {conditionOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {locale === "fa" ? option.label : option.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.condition && (
            <p className="text-error-main text-sm mt-1">
              {errors.condition.message}
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
                <span className="text-Primary-700">{b.requester}</span>
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
                <span className="text-Primary-700">{b.post_ad}</span>
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

      {/* Requester Type Checkboxes */}
      {/* <div className="w-full flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Checkbox
            id="request"
            checked={requesterType === "request"}
            onCheckedChange={(checked) => {
              if (checked) {
                handleRequesterTypeChange("request");
              }
            }}
          />
          <Label htmlFor="request" className="cursor-pointer">
            {b.requester}
          </Label>
        </div>
        <div className="flex items-center gap-2">
          <Checkbox
            id="ad"
            checked={requesterType === "ad"}
            onCheckedChange={(checked) => {
              if (checked) {
                handleRequesterTypeChange("ad");
              }
            }}
          />
          <Label htmlFor="ad" className="cursor-pointer">
            {b.post_ad}
          </Label>
        </div>
      </div> */}
      {/* buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {b.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default BusinessForm;
