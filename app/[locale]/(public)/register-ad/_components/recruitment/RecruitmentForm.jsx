import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import z from "zod";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { FormContext } from "../../NewCategorySelector";
import { useMutation, useQuery } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { useParams } from "next/navigation";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import Warning from "@/assets/icons/warning.svg";
const schema = z.object({
  title: z.string().min(1, "عنوان آگهی الزامی است"),
  recruitment_categories_id: z.string().min(1, "دسته بندی شغلی را انتخاب کنید"),
  work_type: z.string().min(1, "نوع همکاری را انتخاب کنید"),
  languages_id: z.string().min(1, "زبان را انتخاب کنید"),
  type: z.enum(["ad", "request"]),
  price: z.string().min(1, "حقوق خود را وارد کنید"),
  days: z.string().min(1, "روز های کاری خود را وارد کنید"),
  time: z.string().min(1, "ساعت های کاری خود را وارد کنید"),
});

const RecruitmentForm = ({ isEditing = false, adData }) => {
  const {
    handleSubmit,
    register,
    watch,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      type: adData?.first?.type || "ad",
    },
  });
  const dic = useTranslation();
  const r = dic.register_ad;
  const { locale } = useParams();
  const b = dic.register_ad;
  const info = dic.public.register_ad;

  const { setApiResponseData, setCurrentStep, categoryID } =
    useContext(FormContext);

  const { data } = useQuery({
    queryKey: ["recruitment"],
    queryFn: async () =>
      await request({
        url: "/store/recruitment",
        method: "get",
      }),
  });

  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: !isEditing
          ? "/store/recruitment/first"
          : `/update/recruitment/first/${adData?.first?.id}`,
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
      toast.error(`${err?.message} failed to submit the form`);
    },
  });

  const requesterType = watch("type");
  const languagesValue = watch("languages_id");

  const handleRequesterTypeChange = (type) => {
    setValue("type", type);
  };
  useEffect(() => {
    if (
      isEditing &&
      adData?.first &&
      data?.data?.category?.length &&
      data?.data?.language?.length
    ) {
      const first = adData.first;
      reset({
        title: first.title || "",

        price: first.price || "",
        time: first.time || "",
        type: first.type || "ad",
        days: first.days || "",
        languages_id: first.languages_id ? String(first.languages_id) : "",
        work_type: first.work_type || "",
        recruitment_categories_id: first.recruitment_categories_id
          ? String(first.recruitment_categories_id)
          : "",
      });
    }
  }, [reset, adData, isEditing, data?.data?.language, data?.data?.category]);

  const onSubmit = (formData) => {
    const payload = {
      category_id: categoryID, // This comes from context
      title: formData.title,
      languages_id: parseInt(formData.languages_id),
      recruitment_categories_id: parseInt(formData.recruitment_categories_id),
      days: formData.days,
      time: formData.time,
      price: formData.price,
      type: formData.type,
      work_type: formData.work_type,
    };

    mutation.mutate(payload);
  };

  const getJobCategories = () => {
    return data?.data?.category || [];
  };

  const workTypeOptions = [
    { id: "full_time", title: "تمام وقت", title_en: "Full Time" },
    { id: "part_time", title: "پاره وقت", title_en: "Part Time" },
    { id: "remote", title: "دورکاری", title_en: "Remote" },
  ];

  return (
    <form
      className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg h-160 "
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-4 lg:gap-10">
        <div>
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
      </div>

      {/* Job Category Select */}
      <div className="flex flex-col lg:flex-row w-full items-center gap-4">
        <div className="w-full">
          <Select
            onValueChange={(val) => setValue("recruitment_categories_id", val)}
          >
            <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
              <SelectValue placeholder={r.job_category} />
            </SelectTrigger>
            <SelectContent>
              {getJobCategories().map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}{" "}
                  {/* Using 'name' instead of 'title' based on your API */}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.recruitment_categories_id && (
            <p className="text-error-main text-sm mt-1">
              {errors.recruitment_categories_id.message}
            </p>
          )}
        </div>

        {/* Work Type Select */}
        <div className="w-full">
          <Select onValueChange={(val) => setValue("work_type", val)}>
            <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
              <SelectValue placeholder={r.cooperation_type} />
            </SelectTrigger>
            <SelectContent>
              {workTypeOptions.map((option) => (
                <SelectItem key={option.id} value={option.id}>
                  {locale === "en" ? option.title : option.title_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.work_type && (
            <p className="text-error-main text-sm mt-1">
              {errors.work_type.message}
            </p>
          )}
        </div>
      </div>

      {/* Language and Salary */}
      <div className="flex flex-col lg:flex-row w-full items-center gap-4">
        <div className="w-full">
          <Select
            value={languagesValue}
            onValueChange={(val) => setValue("languages_id", val)}
          >
            <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
              <SelectValue placeholder={r.language} />
            </SelectTrigger>
            <SelectContent>
              {data?.data?.language?.map((lang) => (
                <SelectItem key={lang.id} value={lang.id.toString()}>
                  {lang.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.languages_id && (
            <p className="text-error-main text-sm mt-1">
              {errors.languages_id.message}
            </p>
          )}
        </div>

        <div className="w-full">
          <Input
            {...register("price")}
            className="focus:placeholder:opacity-0 py-6 rounded-xl"
            placeholder={r.salary}
            type="number"
          />
          {errors.price && (
            <p className="text-error-main text-sm mt-1">
              {errors.price.message}
            </p>
          )}
        </div>
      </div>

      {/* Days and Hours of Work */}
      <div className="flex flex-col lg:flex-row w-full items-center gap-4">
        <div className="w-full">
          <Input
            {...register("days")}
            className="focus:placeholder:opacity-0 py-6 rounded-xl"
            placeholder={r.work_days}
          />
          {errors.days && (
            <p className="text-error-main text-sm mt-1">
              {errors.days.message}
            </p>
          )}
        </div>
        <div className="w-full">
          <Input
            {...register("time")}
            className="focus:placeholder:opacity-0 py-6 rounded-xl"
            placeholder={r.work_hours}
          />
          {errors.time && (
            <p className="text-error-main text-sm mt-1">
              {errors.time.message}
            </p>
          )}
        </div>
      </div>

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

export default RecruitmentForm;
