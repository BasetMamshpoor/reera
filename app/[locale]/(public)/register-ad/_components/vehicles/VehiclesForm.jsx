import React, { useContext, useEffect, useState } from "react";
import z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { toast } from "sonner";
import { FormContext } from "../../NewCategorySelector";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Warning from "@/assets/icons/warning.svg";
const schema = z.object({
  title: z.string().min(1, "عنوان آگهی الزامی است"),
  brand_id: z.string().min(1, "برند الزامی است"),
  model_id: z.string().min(1, "لطفا مدل را انتخاب کنید"),
  function: z.string().min(1, "کارکرد الزامی است"),
  gearbox: z.string().min(1, "گیربکس الزامی است"),
  color: z.string().min(1, "لطفا رنگ را انتخاب کنید"),
  year_of_built: z.string().min(1, "لطفا سال تولید را انتخاب کنید"),
  type: z.enum(["ad", "request"]),
});

const VehiclesForm = ({ isEditing = false, adData }) => {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      brand_id: "",
      model_id: "",
      type: "ad",
    },
  });
  const dic = useTranslation();
  const v = dic.register_ad;
  const b = dic.register_ad;
  const info = dic.public.register_ad;
  const { setCurrentStep, categoryID, setApiResponseData } =
    useContext(FormContext);
  const selectedBrand = watch("brand_id");

  const { data: brandsData } = useQuery({
    queryKey: ["vehicle-brands"],
    queryFn: async () =>
      await request({
        url: "/store/vehicle",
        method: "get",
      }),
  });

  const { data: modelsData, isLoading: modelsLoading } = useQuery({
    queryKey: ["vehicle-models", selectedBrand],
    queryFn: async () => {
      if (!selectedBrand) return { data: { models: [] } };
      return await request({
        url: `/store/vehicle?brand=${selectedBrand}`,
        method: "get",
      });
    },
    enabled: !!selectedBrand,
  });
  const requesterType = watch("type");

  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };

  useEffect(() => {
    if (isEditing && adData?.first && brandsData?.data?.brands?.length) {
      const first = adData.first;
      reset({
        title: first.title || "",
        brand_id: first.vehicle_brand_id ? String(first.vehicle_brand_id) : "",
        model_id: first.vehicle_model_id ? String(first.vehicle_model_id) : "",
        function: first.function || "",
        gearbox: first.gearbox || "",
        color: first.color || "",
        year_of_built: first.date_model || "",
        type: first.type || "ad",
      });
    }
  }, [isEditing, adData, brandsData, reset]);

  const vehicleMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/vehicle/first"
          : `/update/vehicles/first/${adData?.first?.id}`,
        method: "post",
        data,
      }),
    onSuccess: (data) => {
      toast.success("اطلاعات با موفقیت ذخیره شد");
      if (!isEditing) {
        setApiResponseData(data.data);
      }

      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error("خطا در ارسال اطلاعات");
    },
  });

  const onSubmit = (data) => {
    // Find brand and model names from IDs
    const selectedBrand = brandsData?.data?.brands?.find(
      (b) => b.id === data.brand_id
    );
    const selectedModel = modelsData?.data?.models?.find(
      (m) => m.id === data.model_id
    );

    const payload = {
      category_id: categoryID,
      ...data,
      date_model: data.year_of_built,
      vehicle_brand_id: data.brand_id,
      vehicle_model_id: data.model_id,
    };

    vehicleMutation.mutate(payload);
  };

  return (
    <form
      className="w-full lg:p-10 p-4 flex flex-col lg:gap-10 gap-8 bg-Surface-2"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="w-full">
        <Input
          {...register("title")}
          placeholder={v.ad_title}
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
        />
        {errors.title && (
          <p className="text-error-main text-sm mt-1">{errors.title.message}</p>
        )}
      </div>

      {/* Requester Type Checkboxes */}
      {/* Requester Type Checkboxes */}
      <div className="w-full flex items-center gap-4 py-4">
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
        </div>
      </div>

      <div className="flex lg:flex-row gap-6 flex-col">
        {/* Brand Select with Controller */}
        <div className="w-full">
          <Controller
            name="brand_id"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} value={field.value}>
                <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
                  <SelectValue placeholder={v.brand} />
                </SelectTrigger>
                <SelectContent>
                  {brandsData?.data?.brands?.map((brand) => (
                    <SelectItem key={brand.id} value={String(brand.id)}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.brand_id && (
            <p className="text-error-main text-sm mt-1">
              {errors.brand_id.message}
            </p>
          )}
        </div>

        {/* Model Select with Controller */}
        <div className="w-full">
          <Controller
            name="model_id"
            control={control}
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value}
                disabled={!selectedBrand || modelsLoading}
              >
                <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
                  <SelectValue placeholder={v.model_type} />
                </SelectTrigger>
                <SelectContent>
                  {modelsData?.data?.models?.map((model) => (
                    <SelectItem key={model.id} value={String(model.id)}>
                      {model.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.model_id && (
            <p className="text-error-main text-sm mt-1">
              {errors.model_id.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex lg:flex-row gap-6 flex-col">
        <Input
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
          {...register("function")}
          placeholder={v.mileage}
        />
        {errors.function && (
          <p className="text-error-main text-sm mt-1">
            {errors.function.message}
          </p>
        )}

        <Input
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
          {...register("gearbox")}
          placeholder={v.transmission}
        />
        {errors.gearbox && (
          <p className="text-error-main text-sm mt-1">
            {errors.gearbox.message}
          </p>
        )}
      </div>

      <div className="flex lg:flex-row gap-6 flex-col">
        <Input
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
          {...register("color")}
          placeholder={v.color}
        />
        {errors.color && (
          <p className="text-error-main text-sm mt-1">{errors.color.message}</p>
        )}

        <Input
          className="focus:placeholder:opacity-0 py-6 rounded-xl"
          {...register("year_of_built")}
          placeholder={v.model_year}
        />
        {errors.year_of_built && (
          <p className="text-error-main text-sm mt-1">
            {errors.year_of_built.message}
          </p>
        )}
      </div>

      {/* Debug button - remove in production */}

      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {v.model_year}
        </button>
        <button
          type="submit"
          disabled={vehicleMutation.isLoading}
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg disabled:opacity-50"
        >
          <span>{vehicleMutation.isLoading ? v.sending : v.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default VehiclesForm;
