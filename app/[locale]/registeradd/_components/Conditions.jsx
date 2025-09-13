import React from "react";
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

const currencyOptions = [
  { id: 1, value: "ریال", label: "ریال" },
  { id: 2, value: "usd", label: "Dollar" },
  { id: 3, value: "euro", label: "EURO" },
];

const rulesOptions = [
  "پذیرش حیوان خانگی ممنوع است.",
  "کشیدن سیگار در داخل واحد ممنوع است.",
  "حداقل قرارداد 6 ماهه است.",
  "مهمانی شبانه ممنوع است.",
  "استفاده از پارکینگ مشترک است.",
  "آشپزی با بوی شدید ممنوع است.",
  "سیگار کشیدن در بالکن ممنوع است.",
  "حفظ سکوت پس از ساعت 11 شب الزامی است.",
];

const Conditions = ({ setCurrentStep, adId }) => {
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      currency: "",
      price: "",
      donation: "",
      cash: false,
      installments: false,
      check: false,
      family: false,
      man: false,
      woman: false,
      student: false,
      rules: [],
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
      ad_id: adId,
      currencies_id:
        currencyOptions.find((c) => c.value === data.currency)?.id || 1,
      price: Number(data.price),
      donation: Number(data.donation),
      cash: data.cash,
      installments: data.installments,
      check: data.check,
      family: data.family,
      man: data.man,
      woman: data.woman,
      student: data.student,
      rules: rulesOptions.filter((_, index) => data.rules.includes(index)),
    };

    console.log("Form data to be submitted:", payload);
    setCurrentStep((prev) => prev + 1);
  };

  const handleRuleChange = (index) => {
    const currentRules = watch("rules");
    const newRules = currentRules.includes(index)
      ? currentRules.filter((i) => i !== index)
      : [...currentRules, index];
    setValue("rules", newRules);
  };

  return (
    <div className="w-full py-12 px-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 h-full"
      >
        {/* Currency Selection */}
        <Select onValueChange={(value) => setValue("currency", value)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب ارز" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className="rtl:text-right">انتخاب ارز</SelectLabel>
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

        {/* Payment Method (single selection with checkboxes) */}
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

        {/* Suitable For */}
        <div className="flex flex-col gap-4">
          <h2>مناسب برای</h2>
          <div className="flex flex-row gap-4 items-center">
            <Checkbox {...register("family")} id="family" />
            <Label htmlFor="family" className="dark:text-white text-xs">
              خانواده
            </Label>

            <Checkbox {...register("woman")} id="woman" />
            <Label htmlFor="woman" className="dark:text-white text-xs">
              فقط خانم
            </Label>

            <Checkbox {...register("man")} id="man" />
            <Label htmlFor="man" className="dark:text-white text-xs">
              فقط آقا
            </Label>

            <Checkbox {...register("student")} id="student" />
            <Label htmlFor="student" className="dark:text-white text-xs">
              دانشجو
            </Label>
          </div>
        </div>

        {/* Rules */}
        <div className="flex flex-col gap-4">
          <h2>قوانین</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {rulesOptions.map((rule, index) => (
              <div key={index} className="flex flex-row gap-4 items-center">
                <Checkbox
                  id={`rule-${index}`}
                  checked={watch("rules")?.includes(index)}
                  onCheckedChange={() => handleRuleChange(index)}
                />
                <Label
                  htmlFor={`rule-${index}`}
                  className="dark:text-white text-xs"
                >
                  {rule}
                </Label>
              </div>
            ))}
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
            <Arrowleft className="fill-white ltr:rotate-180" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default Conditions;
