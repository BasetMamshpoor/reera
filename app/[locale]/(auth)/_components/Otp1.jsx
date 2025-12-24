"use client";

import {useState, useEffect, useCallback} from "react";
import {signIn} from "next-auth/react";
import {toast} from "sonner";

import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
} from "@/components/ui/input-otp";

import {useParams} from "next/navigation";
import {Button} from "@/components/ui/button";

const Otp1 = ({email, p}) => {
    const [otp, setOtp] = useState("");
    const {locale} = useParams();

    const handleSubmit = useCallback(async () => {
        if (otp.length !== 6) return;

        try {
            const res = await signIn("credentials", {
                email,
                otp,
                redirect: false,
                callbackUrl: `/${locale || "en"}`,
            });

            if (res?.error) {
                toast.error("Invalid OTP");
            } else if (res?.ok) {
                toast.success("Successfully logged in!");
                if (res?.url) window.location.href = res.url;
            }
        } catch (err) {
            toast.error("Login failed, try again.");
            console.error("OTP submit error:", err);
        }
    }, [email, otp, locale]);

    useEffect(() => {
        if (otp.length === 6) {
            (async () => await handleSubmit())();
        }
    }, [otp, handleSubmit]);

    return (
        <div className="flex flex-col gap-20 w-fit py-12 px-20 bg-surface rounded-xl border">
            <div className="flex flex-col gap-6 w-full">
             <span className="text-sm text-Gray-600 text-center">
               {p.enter_6_digit_code}
             </span>
                <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={(value) => setOtp(value)}
                >
                    <InputOTPGroup
                        className="data-[data-slot=input-otp-slot]:border data-[data-slot=input-otp-slot]:border-gray-300">
                        <InputOTPSlot index={0}/>
                        <InputOTPSlot index={1}/>
                        <InputOTPSlot index={2}/>
                        <InputOTPSlot index={3}/>
                        <InputOTPSlot index={4}/>
                        <InputOTPSlot index={5}/>
                    </InputOTPGroup>
                </InputOTP>
            </div>

            <Button
                type="button"
                onClick={handleSubmit}
                disabled={otp.length !== 6}
                className="cursor-pointer bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl py-3 px-6 disabled:opacity-50"
            >
                {p.login}
            </Button>
        </div>
    );
};

export default Otp1;
