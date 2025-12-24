"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import Google from "@/assets/icons/Google Icon.svg";
import { useTranslation } from "../../TranslationContext";

const Login = () => {
    const dic = useTranslation();
    const p = dic.auth.login;

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleEmailLogin = async (e) => {
        e.preventDefault();

        await signIn("credentials", {
            email,
            password,
            callbackUrl: "/en",
        });
    };

    return (
        <div className="bg-surface flex flex-col gap-6 w-full max-w-2xl p-10 rounded-xl border border-default-divider">

            <div>
                <h2 className="font-bold text-2xl">{p.login_signup}</h2>
                <p className="text-Gray-600">
                    Login with Google or Email
                </p>
            </div>

            {/* Google Login */}
            <button
                type="button"
                onClick={() => signIn("google")}
                className="flex cursor-pointer items-center gap-2 border p-3 rounded-xl justify-center hover:scale-[0.99]"
            >
                <Google />
                {p.continue_with_google}
            </button>

            {/* Divider */}
            <div className="flex items-center gap-4">
                <div className="flex-1 h-px bg-default-divider" />
                <span className="text-sm text-Gray-400">OR</span>
                <div className="flex-1 h-px bg-default-divider" />
            </div>

            {/* Email Login */}
            <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
                <input
                    type="email"
                    placeholder="Email"
                    className="border rounded-xl p-3"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="border rounded-xl p-3"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <button
                    type="submit"
                    className="bg-Primary-400 text-white rounded-xl py-3 font-semibold"
                >
                    {p.login}
                </button>
            </form>
        </div>
    );
};

export default Login;
