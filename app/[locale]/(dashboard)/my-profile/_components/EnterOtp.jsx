import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Close from "@/assets/icons/close.svg";
import { toast } from "sonner";
import { useCountdown } from "@/functions/otpCounter";
import { useTranslation } from "../../../TranslationContext";

const EnterOtp = ({ setIsModalOpen, setCreditCardState }) => {
  const [otp, setOtp] = useState("");
  const dic = useTranslation();
  const o = dic.consultor.edit;
  const { countdown, isActive, startCountdown, resetCountdown, formattedTime } =
    useCountdown(120);

  React.useEffect(() => {
    startCountdown();
  }, []);

  const handleResendCode = () => {
    toast.success("کد تأیید مجدداً ارسال شد", {
      description: "کد جدید به شماره شما ارسال گردید",
      duration: 3000,
    });

    resetCountdown();
    setOtp("");
  };

  const handleVerifyOtp = () => {
    if (otp.length === 5) {
      toast
        .promise(
          new Promise((resolve) => {
            setTimeout(() => resolve("success"), 1500);
          }),
          {
            loading: "در حال تأیید کد...",
            success: "کد با موفقیت تأیید شد",
            error: "خطا در تأیید کد",
          }
        )
        .then(() => {
          setCreditCardState("check");
        });
    } else {
      toast.error("لطفاً کد تأیید را کامل وارد کنید");
    }
  };

  const isResendDisabled = isActive && countdown > 0;

  return (
    <div className="flex flex-col gap-8 items-center justify-center h-full p-6">
      <div className="flex items-center justify-between w-full">
        <h2 className="self-end font-semibold text-lg">{o.verify_identity}</h2>
        <Close
          onClick={() => {
            setIsModalOpen(false);
            setCreditCardState("shaba");
          }}
          className="fill-error-main cursor-pointer"
        />
      </div>

      <div className="text-center">
        <span>{o.verification_code_sent}</span>
      </div>

      <InputOTP maxLength={5} value={otp} onChange={setOtp}>
        <InputOTPGroup className="gap-2">
          <InputOTPSlot index={0} className="w-12 h-12 text-lg" />
          <InputOTPSlot index={1} className="w-12 h-12 text-lg" />
          <InputOTPSlot index={2} className="w-12 h-12 text-lg" />
          <InputOTPSlot index={3} className="w-12 h-12 text-lg" />
          <InputOTPSlot index={4} className="w-12 h-12 text-lg" />
        </InputOTPGroup>
      </InputOTP>

      <div className="flex flex-col items-center gap-2">
        <button
          className={`text-Primary-400 font-semibold ${
            isResendDisabled
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          onClick={handleResendCode}
          disabled={isResendDisabled}
        >
          {isResendDisabled
            ? `ارسال مجدد کد (${formattedTime})`
            : "ارسال مجدد کد"}
        </button>

        {isResendDisabled && (
          <span className="text-sm text-Text-Secondary">
            امکان ارسال مجدد کد پس از {formattedTime} فعال می‌شود
          </span>
        )}
      </div>

      <button
        onClick={handleVerifyOtp}
        disabled={otp.length !== 5}
        className={`py-4 w-full rounded-xl ${
          otp.length === 5
            ? "bg-Primary-400 text-white cursor-pointer"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {o.calculate_sheba}
      </button>
    </div>
  );
};

export default EnterOtp;
