"use client";
import React, { useState } from "react";
import Google from "@/assets/icons/Google Icon.svg";
import PhoneInput from "@/components/auth/phone-input";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useTranslation } from "../../TranslationContext";

const PhoneEnter = ({ setStep, phoneNumber, setPhoneNumber }) => {
  const dic = useTranslation();
  const p = dic.auth.login;
  const LoginMutation = useMutation({
    mutationFn: async (data) =>
      await request({
        method: "post",
        url: `/auth/send-otp`,
        data,
      }),
    onSuccess: () => {
      toast.success("Sent a code to your phone number");
      setStep("otp");
    },
    onError: (err) => {
      toast.error(`something went wrong ${err}`);
    },
  });

  const handleLogin = (e) => {
    e.preventDefault();
    const payload = {
      mobile: phoneNumber,
    };
    LoginMutation.mutate(payload);
  };
  return (
    <form
      onSubmit={handleLogin}
      className="bg-surface flex items-center flex-col gap-6 w-full max-w-2xl p-10 rounded-xl border border-default-divider h-140 justify-between"
    >
      <div className="w-full flex flex-col gap-4 rtl:items-start">
        <h2 className="font-bold text-2xl">{p.login_signup}</h2>

        <span className="text-Gray-600 ltr:text-left rtl:text-right">
          {p.enter_your_mobile_number}
        </span>
      </div>

      <div className="w-full">
        <PhoneInput value={phoneNumber} onChange={setPhoneNumber} />
      </div>

      <div className="w-full flex flex-col gap-4">
        <button
          type="submit"
          className="bg-Primary-400 text-white rounded-xl w-full py-3 font-semibold cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!phoneNumber}
        >
          {p.send_verification_code}
        </button>
        <button
          onClick={() => signIn("google")}
          className="flex items-center gap-2 border p-2 rounded-md mt-4 cursor-pointer justify-center transition-all  duration-100  hover:scale-[0.99]"
        >
          <Google />
          {p.continue_with_google}
        </button>
        <button
          onClick={() => signIn("twitter", { callbackUrl: "/en" })}
          className="flex items-center gap-2 border p-2 rounded-md cursor-pointer justify-center transition-all  duration-100  hover:scale-[0.99]"
        >
          <Image
            src={`/icons/twitter.png`}
            width={28}
            height={28}
            alt="twitter"
          />
          {p.continue_with_twitter}
        </button>
      </div>
    </form>
  );
};

export default PhoneEnter;
