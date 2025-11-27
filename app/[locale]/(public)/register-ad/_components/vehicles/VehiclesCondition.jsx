import React, { useContext } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { FormContext } from "../CategoriesList";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const currencyOptions = [
  { id: 1, value: "ریال", label: "ریال" },
  { id: 2, value: "usd", label: "Dollar" },
  { id: 3, value: "euro", label: "EURO" },
];

const VehiclesCondition = ({ setCurrentStep, adId }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      currency: "",
      price: "",
      donation: "",
      cash: false,
      installments: false,
      check: false,
    },
  });
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;
  const dic = useTranslation();
  const v = dic.register_ad;
  const { apiResponseData } = useContext(FormContext);
  const ConditionMutation = useMutation({
    mutationFn: async (data) =>
      request({
        url: "store/housing/sixth",
        method: "post",
        data,
      }),

    onSuccess: () => {
      toast.success("Your Ad has been successfully submitted");
      router.push(`/${locale}/register-ad/successfull-ad`);
    },
    onError: (err) => {
      toast.error(`Failed to submit the form + ${err?.message}`);
    },
  });
  const handlePaymentChange = (method) => {
    // Reset all payment methods
    setValue("cash", false);
    setValue("installments", false);
    setValue("check", false);

    // Set only the selected method to true
    setValue(method, true);
  };

  const onSubmit = (data) => {
    const payload = {
      ad_id: apiResponseData,
      currencies_id:
        currencyOptions.find((c) => c.value === data.currency)?.id || 1,
      price: Number(data.price),
      donation: Number(data.donation),
      cash: data.cash,
      installments: data.installments,
      check: data.check,
    };
    ConditionMutation.mutate(payload);

    // setCurrentStep((prev) => prev + 1);
  };

  return (
    <div className="w-full lg:py-12 lg:px-10 p-4 bg-Surface-2">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-full"
      >
        <Select onValueChange={(value) => setValue("currency", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={v.currency_type} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="rtl:text-right">
                {v.select_type}
              </SelectLabel>
              {currencyOptions.map((currency) => (
                <SelectItem key={currency.id} value={currency.value}>
                  {currency.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>

        {/* Price Inputs */}
        <div className="flex flex-row items-center gap-4">
          <Input {...register("price")} type="number" placeholder="قیمت کل" />
          <Input
            {...register("donation")}
            type="number"
            placeholder="مبلغ بیعانه"
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2>نحوه پرداخت</h2>
          <div className="flex flex-row gap-4 items-center">
            <Checkbox
              checked={watch("cash")}
              onCheckedChange={() => handlePaymentChange("cash")}
              id="cash"
            />
            <Label htmlFor="cash" className="dark:text-white text-xs">
              نقدی
            </Label>

            <Checkbox
              checked={watch("installments")}
              onCheckedChange={() => handlePaymentChange("installments")}
              id="installments"
            />
            <Label htmlFor="installments" className="dark:text-white text-xs">
              اقساط
            </Label>

            <Checkbox
              checked={watch("check")}
              onCheckedChange={() => handlePaymentChange("check")}
              id="check"
            />
            <Label htmlFor="check" className="dark:text-white text-xs">
              چک
            </Label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
          <button
            type="button"
            className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warningborder-warning-main rounded-lg"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-2 lg:w-32 rounded-lg"
          >
            <span>بعدی</span>
            <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default VehiclesCondition;
