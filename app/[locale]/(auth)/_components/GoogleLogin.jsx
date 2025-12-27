"use client";

import {useState} from "react";
import {signIn} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import Google from "@/assets/icons/Google Icon.svg";
import Otp1 from "./Otp1";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import Spinner from "@/components/Spinner";

const request = async ({method, url, data}) => {
    const fullUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}${url}`;
    const res = await fetch(fullUrl, {
        method,
        headers: {"Content-Type": "application/json"},
        body: data ? JSON.stringify(data) : undefined,
    });

    const resData = await res.json();
    if (!res.ok) {
        throw new Error(resData?.message || "درخواست ناموفق بود");
    }
    return resData;
};

const Login = () => {
    const dic = useTranslation();
    const p = dic.auth.login;

    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");

    const sendOtpMutation = useMutation({
        mutationFn: async (email) =>
            await request({
                method: "post",
                url: "/auth/send-otp",
                data: {email},
            }),
        onSuccess: (data) => {
            setStep("otp");
            toast.success(data?.message || "کد تأیید ارسال شد");
        },
        onError: (error) => {
            toast.error(error.message || "ارسال کد ناموفق بود");
        },
    });

    const handleSendOtp = (e) => {
        e.preventDefault();
        if (!email.trim()) return;
        sendOtpMutation.mutate(email.trim());
    };

    if (step === "otp") {
        return <Otp1 email={email.trim()} p={p}/>;
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-md p-6 bg-surface rounded-xl border">
            <h2 className="text-2xl font-semibold">{p.login_signup}</h2>
            <p className="text-Gray-600">{p.login_with}</p>

            <button
                onClick={() => signIn("google")}
                className="flex items-center justify-center gap-2 border p-3 rounded-xl hover:scale-[0.99] transition"
            >
                <Google/>
                {p.continue_with_google}
            </button>

            <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-Gray-300"/>
                <span>OR</span>
                <div className="flex-1 h-px bg-Gray-300"/>
            </div>

            <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                    <p className="text-Gray-950 px-4">{p.email}:</p>
                    <Input
                        type="email"
                        placeholder="example@gmail.com"
                        className="border rounded-xl p-6"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        disabled={sendOtpMutation.isPending}
                    />
                </div>
                <Button
                    type="submit"
                    disabled={sendOtpMutation.isPending}
                    className="bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl py-3 font-semibold"
                >
                    {sendOtpMutation.isPending ? <Spinner size={25}/> : p.send_otp}
                </Button>
            </form>
        </div>
    );
};

export default Login;