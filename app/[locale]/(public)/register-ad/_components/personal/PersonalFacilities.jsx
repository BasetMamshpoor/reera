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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const schema = z.object({
  condition: z.enum(["new", "almost_new", "used", "needs_repair"]),
  text: z.string().min(1, "توضیحات الزامی است"),
});

const PersonalFacilities = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const { locale } = useParams();
  const dic = useTranslation();
  const p = dic.register_ad;
  const { setCurrentStep, apiResponseData } = useContext(FormContext);

  const PersonalMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/store/personal/third",
        method: "post",
        data,
      }),
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`error ${err?.message}`);
    },
  });

  const onSubmit = (data) => {
    const payload = { ...data, ad_id: apiResponseData };
    PersonalMutation.mutate(payload);
  };

  const conditionOptions = [
    { value: "new", label: "نو", title: "New" },
    { value: "almost_new", label: "در حد نو", title: "Almost New" },
    { value: "used", label: "کار کرده", title: "Used" },
    { value: "needs_repair", label: "نیاز به تعمیر", title: "Needs Repair" },
  ];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-10 w-full lg:px-10 px-6 py-8 bg-surface rounded-lg h-160"
    >
      <div className="flex items-center w-full flex-col gap-8">
        <div className="flex flex-col gap-4 w-full">
          {/* Condition Select */}
          <Select onValueChange={(val) => setValue("condition", val)}>
            <SelectTrigger className="w-full py-6 rounded-xl border border-default-divider cursor-pointer">
              <SelectValue placeholder={p.item_condition} />
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

        <div className="flex flex-col gap-4 w-full">
          <Textarea
            placeholder={p.description}
            {...register("text")}
            className={`p-6 focus:placeholder:opacity-0 py-6 rounded-xl`}
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
          {p.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row hover:scale-[0.98] duration-100 transition-all gap-4 items-center justify-center text-alphaw-100 bg-Primary-400 py-2 lg:w-32 rounded-lg"
        >
          <span>{PersonalMutation.isLoading ? p.sending : p.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default PersonalFacilities;
