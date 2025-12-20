"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Close from "@/assets/icons/close.svg";
import z from "zod";
import { useTranslation } from "@/app/[locale]/TranslationContext";

const shabaSchema = z.object({
  shaba: z
    .string()
    .min(26, "شماره شبا باید 26 رقمی باشد")
    .max(26, "شماره شبا باید 26 رقمی باشد")
    .regex(/^IR/, "شماره شبا باید با IR شروع شود")
    .regex(/^[0-9IR]+$/, "شماره شبا باید فقط شامل اعداد و حروف IR باشد")
    .refine((shaba) => isValidIranianShaba(shaba), {
      message: "",
    }),
});

function isValidIranianShaba(shaba) {
  if (!shaba.startsWith("IR")) return false;
  if (shaba.length !== 26) return false;

  const rearranged = shaba.substring(4) + shaba.substring(0, 4);

  let numeric = "";
  for (let i = 0; i < rearranged.length; i++) {
    const char = rearranged.charAt(i);
    if (char >= "A" && char <= "Z") {
      numeric += (char.charCodeAt(0) - 55).toString();
    } else {
      numeric += char;
    }
  }

  let remainder = 0;
  for (let i = 0; i < numeric.length; i++) {
    const digit = parseInt(numeric.charAt(i), 10);
    remainder = (remainder * 10 + digit) % 97;
  }

  return remainder === 1;
}

const EnterCreditCard = ({ setIsModalOpen, setCreditCardState }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    resolver: zodResolver(shabaSchema),
    defaultValues: {
      shaba: "",
    },
  });
  const dic = useTranslation();
  const e = dic.consultor.edit;

  const onSubmit = async (data) => {
    try {
      console.log("Valid Shaba:", data.shaba);

      setCreditCardState("otp");
    } catch (error) {
      setError("shaba", {
        type: "manual",
        message: "خطا در اعتبارسنجی شماره شبا",
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 justify-between h-full p-8">
      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="text-xl font-semibold"> {e.add_sheba_number}</h2>
        <Close
          onClick={() => {
            setIsModalOpen(false);
            setCreditCardState("shaba");
          }}
          className="fill-error-main cursor-pointer"
        />
      </div>

      <span className="w-full max-w-md text-lg text-Text-Secondary">
        {e.sheba_calculation_note}
      </span>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder={e.card_number}
            className={`py-6 border ${
              errors.shaba ? "border-error-main" : "border-default-divider"
            }`}
            {...register("shaba")}
            dir="ltr"
          />
          {errors.shaba && (
            <p className="text-error-main text-sm">{errors.shaba.message}</p>
          )}
        </div>

        <div className="flex flex-row items-center w-full self-start gap-6 mt-auto ltr:justify-end rtl:justify-start">
          <button
            onClick={() => {
              setIsModalOpen(false);
              setCreditCardState("shaba");
            }}
            type="button"
            className="py-4 lg:w-32 flex-1 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
          >
            {e.cancel}
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex cursor-pointer flex-1 w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-4 lg:w-42 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? e.checking : e.calculate_sheba}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnterCreditCard;
