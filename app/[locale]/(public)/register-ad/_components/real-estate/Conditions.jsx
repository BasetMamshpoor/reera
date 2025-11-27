import React, { useContext, useEffect } from "react";
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
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { useRouter, useParams } from "next/navigation";
import { FormContext } from "../../NewCategorySelector";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { toast } from "sonner";

const currencyOptions = [
  { id: 1, value: "ریال", label: "ریال" },
  { id: 2, value: "usd", label: "Dollar" },
  { id: 3, value: "euro", label: "EURO" },
];

const Conditions = ({ category, apiUrl, isEditing, adData }) => {
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

  const router = useRouter();
  const params = useParams();
  const locale = params.locale;
  const dic = useTranslation();
  const c = dic.public.register_ad.conditions;

  const rulesOptions = [
    c.no_pets_allowed,
    c.no_smoking_inside,
    c.min_6_months_contract,
    c.no_night_parties,
    c.shared_parking,
    c.no_strong_smell_cooking,
    c.no_balcony_smoking,
    c.quiet_after_11pm,
  ];

  const { apiResponseData } = useContext(FormContext);

  const ConditionMutation = useMutation({
    mutationFn: async (data) => {
      if (!isEditing) {
        request({
          url: apiUrl,
          method: "post",
          data,
        });
      } else {
        request({
          url: `/update/${adData?.slug}/sixth/${adData?.first?.id}`,
          method: "post",
          data,
        });
      }
    },

    onSuccess: () => {
      if (!isEditing) {
        toast.success("your ad has been successfully submitted");
        router.push(`/${locale}/register-ad/successfull-ad`);
      } else {
        toast.success("your ad has been successfully edited");
        router.push(`/${locale}/my-profile/my-ads`);
      }
    },
    onError: (err) => {
      toast.error(`Error Occured + ${err?.message}`);
    },
  });

  // ✅ Only one payment method
  const handlePaymentChange = (method) => {
    setValue("cash", false);
    setValue("installments", false);
    setValue("check", false);
    setValue(method, true);
  };

  // ✅ Only one suitable-for option
  const handleSuitableChange = (field) => {
    setValue("family", false);
    setValue("man", false);
    setValue("woman", false);
    setValue("student", false);
    setValue(field, true);
  };
  useEffect(() => {
    if (isEditing && adData?.sixth) {
      const sixth = adData.sixth;

      // Set payment method
      setValue("cash", sixth.cash || false);
      setValue("installments", sixth.installments || false);
      setValue("check", sixth.check || false);

      // Set price, donation, currency
      setValue("price", sixth.price || "");
      setValue("donation", sixth.donation || "");
      setValue("currency", sixth.currencies_id || "");

      // If you have housing-specific fields in sixth, set them here
      if (category === "housing") {
        setValue("family", sixth.family || false);
        setValue("man", sixth.man || false);
        setValue("woman", sixth.woman || false);
        setValue("student", sixth.student || false);

        // Rules array
        if (Array.isArray(sixth.rules)) {
          const rulesIndexes = sixth.rules
            .map((rule) => rulesOptions.indexOf(rule))
            .filter((index) => index >= 0);
          setValue("rules", rulesIndexes);
        }
      }
    }
  }, [isEditing, adData, setValue, category]);

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
      ...(category === "housing" && {
        family: data.family,
        man: data.man,
        woman: data.woman,
        student: data.student,
        rules: rulesOptions.filter((_, index) => data.rules.includes(index)),
      }),
    };

    ConditionMutation.mutate(payload);
  };

  const handleRuleChange = (index) => {
    const currentRules = watch("rules");
    const newRules = currentRules.includes(index)
      ? currentRules.filter((i) => i !== index)
      : [...currentRules, index];
    setValue("rules", newRules);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg h-160 "
    >
      {/* Currency Selection */}
      <Select onValueChange={(value) => setValue("currency", value)}>
        <SelectTrigger className="w-full border border-default-divider py-5 rounded-lg">
          <SelectValue placeholder={c.select_currency} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="rtl:text-right">
              {c.select_currency}
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
        <Input
          {...register("price")}
          type="number"
          placeholder={c.total_price}
        />
        <Input
          {...register("donation")}
          type="number"
          placeholder={c.deposit_amount}
        />
      </div>

      {/* Payment Method (single selection) */}
      <div className="flex flex-col gap-4">
        <span>{c.payment_method}</span>
        <div className="flex flex-row gap-4 items-center">
          <Checkbox
            checked={watch("cash")}
            onCheckedChange={() => handlePaymentChange("cash")}
            id="cash"
          />
          <Label htmlFor="cash" className="dark:text-white text-xs">
            {c.cash}
          </Label>

          <Checkbox
            checked={watch("installments")}
            onCheckedChange={() => handlePaymentChange("installments")}
            id="installments"
          />
          <Label htmlFor="installments" className="dark:text-white text-xs">
            {c.installment}
          </Label>

          <Checkbox
            checked={watch("check")}
            onCheckedChange={() => handlePaymentChange("check")}
            id="check"
          />
          <Label htmlFor="check" className="dark:text-white text-xs">
            {c.check}
          </Label>
        </div>
      </div>

      {/* Suitable For (single selection) */}
      {category === "housing" && (
        <>
          <div className="flex flex-col gap-4">
            <span>{c.suitable_for}</span>
            <div className="flex flex-row gap-4 items-center">
              <Checkbox
                checked={watch("family")}
                onCheckedChange={() => handleSuitableChange("family")}
                id="family"
              />
              <Label htmlFor="family" className="dark:text-white text-xs">
                {c.family}
              </Label>

              <Checkbox
                checked={watch("woman")}
                onCheckedChange={() => handleSuitableChange("woman")}
                id="woman"
              />
              <Label htmlFor="woman" className="dark:text-white text-xs">
                {c.female_only}
              </Label>

              <Checkbox
                checked={watch("man")}
                onCheckedChange={() => handleSuitableChange("man")}
                id="man"
              />
              <Label htmlFor="man" className="dark:text-white text-xs">
                {c.male_only}
              </Label>

              <Checkbox
                checked={watch("student")}
                onCheckedChange={() => handleSuitableChange("student")}
                id="student"
              />
              <Label htmlFor="student" className="dark:text-white text-xs">
                {c.student}
              </Label>
            </div>
          </div>

          {/* Rules */}
          <div className="flex flex-col gap-4">
            <span>{c.rules}</span>
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
        </>
      )}

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer  text-warning-main border-warning-main rounded-lg"
        >
          {c.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center bg-Primary-400 py-2 lg:w-32 rounded-lg text-alphaw-100"
        >
          <span className="text-alphaw-100">{c.next}</span>
          <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default Conditions;
