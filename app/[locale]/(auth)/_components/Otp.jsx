"use client";
import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Edit from "@/assets/icons/Edit2.svg";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useTranslation } from "../../TranslationContext";
const Otp = ({ phoneNumber }) => {
  const dic = useTranslation();
  const o = dic.auth.login;
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const params = useParams();
  const locale = params.locale;

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || `/${locale}`;

  const handleForm = async (e) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      mobile: phoneNumber,
      otp,
      callbackUrl,
    });

    if (result?.error) {
      toast.error("Something went wrong! try again please");
    } else {
      toast.success("Successfully logged in!");
    }
  };

  return (
    <form
      onSubmit={handleForm}
      className="bg-surface flex items-center flex-col gap-6 w-full max-w-2xl p-10 rounded-xl border border-default-divider h-140 justify-between"
    >
      <div className="w-full flex flex-col gap-4 items-center">
        <h2 className="font-bold text-2xl">{o.login_signup}</h2>
        <div className="self-start rtl:self-end"></div>
      </div>

      <div className="flex flex-col gap-4 w-full items-center">
        <span className="text-Gray-600 text-left rtl:text-right">
          {o.enter_code_sent_to_number}
        </span>
        <InputOTP maxLength={6} value={otp} onChange={(value) => setOtp(value)}>
          <InputOTPGroup
            className={`data-[data-slot=input-otp-slot]:border data-[data-slot=input-otp-slot]:border-default-divider`}
          >
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <button
        onClick={() => {
          router.back();
        }}
        className="text-Primary-400 text-lg font-semibold cursor-pointer flex items-center gap-2"
      >
        <span>{o.edit_phone}</span>
        <Edit className="fill-Primary-400" />
      </button>
      <button
        type="submit"
        className="w-full py-3 bg-Primary-400 text-white font-semibold cursor-pointer rounded-xl"
      >
        {o.login}
      </button>
    </form>
  );
};

export default Otp;
