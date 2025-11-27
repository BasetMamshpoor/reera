"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import Close from "@/assets/icons/close.svg";
import z from "zod";
import { useTranslation } from "../../../TranslationContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";

const schema = z.object({
  card_number: z
    .string()
    .min(16, "شماره کارت باید 16 رقمی باشد")
    .max(16, "شماره کارت باید 16 رقمی باشد")
    .regex(/^[0-9]+$/, "شماره کارت باید فقط شامل اعداد باشد"),
});

const EnterCreditCard = ({ setIsModalOpen, mode = "add", cardData = null }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      card_number: cardData?.card_number || "",
    },
  });

  const dic = useTranslation();
  const e = dic.consultor.edit;
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (data) => {
      const url =
        mode === "edit"
          ? `/profile/finances/${cardData.id}`
          : "/profile/finances";

      const method = mode === "edit" ? "put" : "post";

      return await request({
        url,
        method,
        data,
      });
    },
    onSuccess: () => {
      const successMessage =
        mode === "edit"
          ? "Card information updated successfully"
          : "Your card information has been added";

      toast.success(successMessage);
      setIsModalOpen(false);
      queryClient.invalidateQueries(["finance"]);
    },
    onError: (err) => {
      const errorMessage =
        mode === "edit"
          ? "Failed to update card information"
          : "Failed to add your card number";

      toast.error(`${err?.message} ${errorMessage}`);
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    mutation.mutate(data);
  };

  const title =
    mode === "edit" ? "ویرایش شماره کارت" : e.sheba_calculation_note;
  const submitText = mode === "edit" ? "ذخیره تغییرات" : e.add_card;
  const loadingText = mode === "edit" ? "در حال ذخیره..." : e.checking;

  return (
    <div className="flex flex-col gap-6 justify-between h-full p-8">
      <div className="flex flex-row w-full justify-between items-center">
        <h2 className="text-xl font-semibold text-Gray-700">{title}</h2>
        <Close
          onClick={() => {
            setIsModalOpen(false);
          }}
          className="fill-error-main cursor-pointer"
        />
      </div>

      <span className="w-full max-w-md text-lg text-Text-Secondary">
        {mode === "edit"
          ? "شماره کارت بانکی خود را ویرایش کنید"
          : e.card_number_note}
      </span>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <div className="space-y-2">
          <Input
            type="text"
            placeholder={e.card_number}
            className={`py-6 border ${
              errors.card_number
                ? "border-error-main"
                : "border-default-divider"
            }`}
            {...register("card_number")}
            dir="ltr"
            maxLength={16}
          />
          {errors.card_number && (
            <p className="text-error-main text-sm">
              {errors.card_number.message}
            </p>
          )}
        </div>

        <div className="flex flex-row items-center w-full self-start gap-6 mt-auto ltr:justify-end rtl:justify-start">
          <button
            onClick={() => {
              setIsModalOpen(false);
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
            {isSubmitting ? loadingText : submitText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnterCreditCard;
