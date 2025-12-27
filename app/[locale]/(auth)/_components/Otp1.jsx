"use client";

import { useState, useEffect, useCallback } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";
import { useParams, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/Spinner";

const Otp1 = ({ email, p }) => {
    const [otp, setOtp] = useState("");
    const [hasSubmitted, setHasSubmitted] = useState(false); // ← اضافه شده برای جلوگیری از تکرار

    const { locale } = useParams();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get("callbackUrl") || `https://rira24.com/${locale}`;

    const loginMutation = useMutation({
        mutationFn: async (otp) =>
            await signIn("email-otp", {
                email,
                otp: otp.trim(),
                redirect: false,
                callbackUrl,
            }),
        onSuccess: (result) => {
            if (result?.ok) {
                toast.success(p.successfully_logged_in || "با موفقیت وارد شدید!");
                if (result.url) {
                    // مستقیم ریدایرکت کن بدون اینکه منتظر بمونی
                    window.location.href = result.url;
                }
            }
        },
        onError: () => {
            toast.error("کد تأیید اشتباه است یا منقضی شده");
            setOtp("");
            setHasSubmitted(false); // اجازه بده دوباره امتحان کنه
        },
    });

    const handleSubmit = useCallback(() => {
        if (otp.length !== 6 || hasSubmitted || loginMutation.isPending) return;

        setHasSubmitted(true);
        loginMutation.mutate(otp);
    }, [otp, hasSubmitted, loginMutation]);

    // فقط وقتی otp کامل شد و قبلاً ارسال نشده، خودکار بفرست
    useEffect(() => {
        if (otp.length === 6 && !hasSubmitted) {
            handleSubmit();
        }
    }, [otp, hasSubmitted, handleSubmit]);

    return (
        <div className="flex flex-col gap-20 w-fit py-12 px-20 bg-surface rounded-xl border">
            <div className="flex flex-col gap-6 w-full">
        <span className="text-sm text-Gray-600 text-center">
          {p.enter_6_digit_code}
        </span>
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    disabled={loginMutation.isPending || hasSubmitted}
                >
                    <InputOTPGroup className="data-[data-slot=input-otp-slot]:border data-[data-slot=input-otp-slot]:border-gray-300">
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <Button
                onClick={handleSubmit}
                disabled={otp.length !== 6 || loginMutation.isPending || hasSubmitted}
                className="bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl py-3 px-6 disabled:opacity-50"
            >
                {loginMutation.isPending ? <Spinner size={25}/> : p.login}
            </Button>
        </div>
    );
};

export default Otp1;