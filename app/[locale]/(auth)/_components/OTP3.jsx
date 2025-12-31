"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";
import Edit from "@/assets/icons/Edit2.svg";

const OtpPage = ({ email, phone, onEdit, p, mode = "signup" }) => {
    const [otp, setOtp] = useState("");
    const identifier = email || phone;
    const isEmail = !!email;

    const verifyMutation = useMutation({
        mutationFn: async (otpCode) => {
            const provider = isEmail ? "email-otp" : "phone-otp";

            const result = await signIn(provider, {
                email: isEmail ? identifier : undefined,
                mobile: !isEmail ? identifier : undefined,
                otp: otpCode.trim(),
                redirect: false,
                callbackUrl: "/", // به صفحه اصلی
            });

            if (result?.error) {
                throw new Error(result.error);
            }

            return result;
        },
        onSuccess: (result) => {
            console.log("SignIn result:", result);

            if (result?.ok) {
                toast.success("با موفقیت وارد شدید!");

                // همیشه به صفحه اصلی برو، چه result.url داشته باشه چه نه
                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                toast.error(result?.error || "ورود ناموفق بود");
            }
        },
        onError: (error) => {
            console.error("API Error:", error);
            toast.error(error.message || "خطا در تأیید کد");
        },
    });

    const handleOtpChange = (value) => {
        setOtp(value);
        if (value.length === 6 && !verifyMutation.isPending) {
            verifyMutation.mutate(value);
        }
    };

    const handleManualSubmit = () => {
        if (otp.length !== 6 || verifyMutation.isPending) return;
        verifyMutation.mutate(otp);
    };

    return (
        <div className="flex flex-col gap-6 w-full max-w-md p-8 bg-surface rounded-xl border">
            <div className="text-center">
                <h2 className="text-2xl font-semibold mb-2">{p.enter_verification_code}</h2>
                <p className="text-Gray-600">{isEmail ? p.enter_code_sent_to_email : p.enter_code_sent_to_number}</p>
                <div dir="ltr" className="mt-4 p-3 bg-Gray-50 rounded-lg flex items-center justify-between">
                    <span className="font-medium">{identifier}</span>
                    <button onClick={onEdit} className="text-Primary-400 hover:text-Primary-500 flex items-center gap-2 text-sm">
                        <Edit className="fill-Primary-400 w-4 h-4" /> {p.edit}
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <span className="text-sm text-Gray-600 text-center">{p.enter_6_digit_code}</span>
                <div className="flex justify-center">
                    <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={handleOtpChange}
                        disabled={verifyMutation.isPending}
                    >
                        <InputOTPGroup className="gap-2">
                            {[...Array(6)].map((_, index) => (
                                <InputOTPSlot
                                    key={index}
                                    index={index}
                                    className="w-12 h-12 text-lg border-2 data-[state=inactive]:border-Gray-300 data-[state=active]:border-Primary-400"
                                />
                            ))}
                        </InputOTPGroup>
                    </InputOTP>
                </div>
            </div>

            <Button
                onClick={handleManualSubmit}
                disabled={otp.length !== 6 || verifyMutation.isPending}
                className="bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl py-3 disabled:opacity-50"
            >
                {verifyMutation.isPending ? <Spinner size={25} /> :
                    (mode === "signup" ? "ثبت‌نام" : "ورود")}
            </Button>

        </div>
    );
};

export default OtpPage;