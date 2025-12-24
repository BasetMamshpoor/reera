"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Google from "@/assets/icons/Google Icon.svg";
import Otp1 from "./Otp1";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";

const Login = () => {
    const dic = useTranslation();
    const p = dic.auth.login;

    const [step, setStep] = useState("email"); // email -> otp
    const [email, setEmail] = useState("");

    const handleSendOtp = async (e) => {
        e.preventDefault();
        if (!email) return;

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/send-otp`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();
            if (res.ok) {
                setStep("otp");
            } else {
                alert(data?.message || "Failed to send OTP");
            }
        } catch (err) {
            console.error(err);
            alert("Error sending OTP");
        }
    };

    if (step === "otp") {
        return <Otp1 p={p} email={email} />;
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-md p-6 bg-surface rounded-xl border">
            <h2 className="text-2xl font-semibold">{p.login_signup}</h2>
            <p className="text-Gray-600">{p.login_with}</p>

            <button
                onClick={() => signIn("google")}
                className="flex items-center gap-2 border p-3 rounded-xl justify-center hover:scale-[0.99]"
            >
                <Google />
                {p.continue_with_google}
            </button>

            <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-Gray-300" />
                <span>OR</span>
                <div className="flex-1 h-px bg-Gray-300" />
            </div>

            <form onSubmit={handleSendOtp} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3 w-full">
                  <p className="text-Gray-950 px-4">{p.email}:</p>
                <Input
                    type="email"
                    placeholder="example@gmail.com"
                    className="border rounded-xl p-6"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                </div>
                <Button
                    type="submit"
                    className=" bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl py-3 font-semibold"
                >
                    {p.send_otp}
                </Button>
            </form>
        </div>
    );
};

export default Login;
