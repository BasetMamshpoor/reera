"use client";

import React from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormContext } from "../../NewCategorySelector";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { useParams } from "next/navigation";
import Warning from "@/assets/icons/warning.svg";

// ✅ Validation schema
const schema = z.object({
  title: z.string().min(1, "عنوان آگهی را وارد کنید"),
  visa_type_ids: z
    .array(z.string())
    .min(1, "لطفا حداقل یک گزینه را انتخاب کنید"),
  type: z.enum(["ad", "request"]),
});

const VisaForm = ({ isEditing, adData }) => {
  const {
    register,
    setValue,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      visa_type_ids: [],
      type: "ad",
    },
  });

  const { id } = useParams();
  const dic = useTranslation();
  const { setCurrentStep, categoryID, setApiResponseData } =
    React.useContext(FormContext);

  const b = dic.register_ad;
  const info = dic.public.register_ad;

  const requesterType = watch("type");
  const selectedVisas = watch("visa_type_ids") || [];

  const { data: visaData } = useQuery({
    queryKey: ["visa-data"],
    queryFn: async () => {
      const res = await request({
        url: "/store/visa",
        method: "get",
      });
      return res?.data?.data ?? res?.data ?? [];
    },
  });

  // ✅ Mutation to submit form
  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/store/visa/first",
        method: "post",
        data,
      }),
    onSuccess: (data) => {
      if (!isEditing) {
        setApiResponseData(data?.data);
      }
      setCurrentStep((prev) => prev + 1);
    },
    onError: (e) => {
      toast.error(e?.message || "خطایی رخ داده است");
    },
  });

  // ✅ Handle submit
  const onSubmit = (data) => {
    const payload = {
      category_id: categoryID,
      ...data,
      visa_type_ids: data.visa_type_ids.map((id) => parseInt(id)),
    };
    mutation.mutate(payload);
  };

  // ✅ Type checkbox handler
  const handleRequesterTypeChange = (type) => {
    setValue("type", type, { shouldDirty: true });
  };
  console.log(visaData);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full lg:p-10 p-4 flex flex-col lg:gap-10 gap-8 bg-Surface-2"
    >
      {/* 🔹 Title Input */}
      <div>
        <Input
          {...register("title")}
          placeholder={b.title_placeholder || "عنوان آگهی"}
          className="py-5 rtl:text-right"
        />
        {errors.title && (
          <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* 🔹 Visa Type Multi-Select */}
      <div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-between">
              {selectedVisas.length > 0
                ? visaData?.type
                    ?.filter((v) => selectedVisas.includes(v.id.toString()))
                    .map((v) => v.name)
                    .join(", ")
                : "نوع ویزا را انتخاب کنید"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full">
            <div className="flex flex-col gap-2">
              {visaData?.type?.map((visaType) => {
                const value = visaType.id.toString();
                const checked = selectedVisas.includes(value);
                return (
                  <div key={visaType.id} className="flex items-center gap-2">
                    <Checkbox
                      id={value}
                      checked={checked}
                      onCheckedChange={(isChecked) => {
                        const newValues = isChecked
                          ? [...selectedVisas, value]
                          : selectedVisas.filter((v) => v !== value);
                        setValue("visa_type_ids", newValues, {
                          shouldDirty: true,
                          shouldValidate: true,
                        });
                      }}
                    />
                    <label htmlFor={value}>{visaType.name}</label>
                  </div>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>

        {errors.visa_type_ids && (
          <p className="text-red-500 text-sm mt-1">
            {errors.visa_type_ids.message}
          </p>
        )}
      </div>

      {/* 🔹 Requester / Ad Type */}
      <div className="w-full flex items-center gap-4">
        {/* Requester */}
        <div className="flex items-center gap-2">
          <Checkbox
            id="requester"
            checked={requesterType === "requester"}
            onCheckedChange={(checked) =>
              checked && handleRequesterTypeChange("requester")
            }
          />
          <HoverCard>
            <HoverCardTrigger>
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-Primary-700">{b.requester}</span>
                <Warning className="fill-Primary-400" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="rtl:text-right">
              {info.select_to_be_requester}
            </HoverCardContent>
          </HoverCard>
        </div>

        {/* Ad */}
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
              <div className="flex items-center gap-2 cursor-pointer">
                <span className="text-Primary-700">{b.post_ad}</span>
                <Warning className="fill-Primary-400" />
              </div>
            </HoverCardTrigger>
            <HoverCardContent className="rtl:text-right">
              {info.select_to_publish_ad}
            </HoverCardContent>
          </HoverCard>
        </div>
      </div>

      {errors.type && (
        <p className="text-red-500 text-sm">{errors.type.message}</p>
      )}

      {/* 🔹 Submit Button */}
      <Button
        type="submit"
        disabled={mutation.isPending}
        className="w-full py-6"
      >
        {mutation.isPending ? "Loading..." : b.submit || "ادامه"}
      </Button>
    </form>
  );
};

export default VisaForm;
