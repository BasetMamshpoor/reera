"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import Spinner from "@/components/Spinner";
import PhoneInput from "@/components/auth/phone-input";

const request = async ({ method, url, data }) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
    const res = await fetch(fullUrl, {
        method,
        headers: { "Content-Type": "application/json" },
        body: data ? JSON.stringify(data) : undefined,
    });
    const resData = await res.json();
    if (!res.ok) throw new Error(resData?.message || "درخواست ناموفق بود");
    return resData;
};

const checkUserExists = async (user) => {
    const data = await request({
        method: "POST",
        url: "/auth/check-user-exists",
        data: { user },
    });
    return data.data;
};

const SignupTab=({ onSendOtp }) =>{
    const dic = useTranslation();
    const p = dic.auth.login;

    const [method, setMethod] = useState("email");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    const sendOtpMutation = useMutation({
        mutationFn: async (data) => request({ method: "POST", url: "/auth/send-otp", data }),
        onSuccess: (data) => {
            toast.success(data?.message || "کد تأیید ارسال شد");
            if (onSendOtp) {
                onSendOtp(method === "email" ? { email } : { phone: phoneNumber });
            }
        },
        onError: (error) => toast.error(error.message || "ارسال کد ناموفق بود"),
    });

    const handleSendOtp = async (e) => {
        e.preventDefault();
        const userIdentifier = method === "email" ? email.trim() : phoneNumber;
        if (!userIdentifier) return;

        try {
            const data = await checkUserExists(userIdentifier);
            if (data.exists) {
                toast.error(data.message || "کاربر قبلاً ثبت‌نام کرده است.");
                return;
            }
            sendOtpMutation.mutate({ user: userIdentifier });
        } catch (err) {
            toast.error(err.message || "خطا در بررسی کاربر");
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-2 mb-4">
                <Button type="button" variant={method === "email" ? "default" : "outline"} onClick={() => setMethod("email")} className="flex-1">
                    با ایمیل
                </Button>
                <Button type="button" variant={method === "phone" ? "default" : "outline"} onClick={() => setMethod("phone")} className="flex-1">
                    با شماره تلفن
                </Button>
            </div>

            <form onSubmit={handleSendOtp} className="flex flex-col gap-4">
                {method === "email" ? (
                    <div className="flex flex-col gap-2">
                        <label className="text-Gray-950">{p.email}:</label>
                        <Input type="email" placeholder="example@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} required disabled={sendOtpMutation.isPending} />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <label className="text-Gray-950">شماره تلفن :</label>
                        <PhoneInput value={phoneNumber} onChange={setPhoneNumber} disabled={sendOtpMutation.isPending} />
                    </div>
                )}

                <Button type="submit" disabled={sendOtpMutation.isPending} className="bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl py-3 font-semibold">
                    {sendOtpMutation.isPending ? <Spinner size={25}/> : p.send_otp}
                </Button>
            </form>
        </div>
    );
}
export default SignupTab;
