"use client";

import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { signIn } from "next-auth/react";
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
    if (!res.ok) {
        throw new Error(resData?.message || "درخواست ناموفق بود");
    }
    return resData;
};

const checkUserStatus = async (user) => {
    try {
        const data = await request({
            method: "POST",
            url: "/auth/check-user-status",
            data: { user },
        });
        return data.data;
    } catch (error) {
        console.log("check-user-status failed, trying check-user-exists");

        const data = await request({
            method: "POST",
            url: "/auth/check-user-exists",
            data: { user },
        });

        return {
            exists: data.data?.exists || false,
            hasPassword: false,
            message: data.data?.message || ""
        };
    }
};

const LoginTab = ({ onSendOtp, onLogin, onForgotPassword }) => {
    const dic = useTranslation();
    const p = dic.auth.login;

    const [method, setMethod] = useState("email");
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPasswordOption, setShowForgotPasswordOption] = useState(false);
    const [isCheckingUser, setIsCheckingUser] = useState(false);

    // Mutation برای لاگین
    const loginMutation = useMutation({
        mutationFn: async ({ identifier, password: pwd }) => {
            console.log("🔐 Attempting password login for:", identifier);

            const result = await signIn("password-login", {
                identifier: identifier,
                password: pwd,
                redirect: false,
            });

            console.log("SignIn result:", result);
            return result;
        },
        onSuccess: (result) => {
            console.log("Login onSuccess:", result);

            if (result?.ok) {
                toast.success(p.successfully_logged_in || "با موفقیت وارد شدید!");

                if (onLogin) onLogin();

                setTimeout(() => {
                    window.location.href = "/";
                }, 1000);
            } else {
                toast.error(result?.error || "ورود ناموفق بود");
                setShowForgotPasswordOption(true);
            }
        },
        onError: (error) => {
            console.error("Login error:", error);
            toast.error(error.message || "خطا در ورود");
            setShowForgotPasswordOption(true);
        },
    });

    // Mutation برای ارسال OTP
    const sendOtpMutation = useMutation({
        mutationFn: async (user) =>
            await request({
                method: "post",
                url: "/auth/send-otp",
                data: { user },
            }),
        onSuccess: (data) => {
            toast.success(data?.message || "کد تأیید ارسال شد");

            if (onForgotPassword) {
                const otpData = method === "email"
                    ? { email, phone: null }
                    : { email: null, phone: phoneNumber };

                onForgotPassword({
                    ...otpData,
                    mode: "login"
                });
            }
        },
        onError: (error) => {
            toast.error(error.message || "ارسال کد ناموفق بود");
        },
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        let identifier;

        if (method === "email") {
            if (!email.trim() || !password) {
                toast.error("لطفاً ایمیل و رمز عبور را وارد کنید");
                return;
            }
            identifier = email.trim();
        } else {
            if (!phoneNumber || !password) {
                toast.error("لطفاً شماره تلفن و رمز عبور را وارد کنید");
                return;
            }
            identifier = phoneNumber;
        }

        loginMutation.mutate({
            identifier,
            password,
        });
    };

    const handleForgotPassword = async () => {
        let userValue;

        if (method === "email") {
            if (!email.trim()) {
                toast.error("لطفاً ایمیل را وارد کنید");
                return;
            }
            userValue = email.trim();
        } else {
            if (!phoneNumber) {
                toast.error("لطفاً شماره تلفن را وارد کنید");
                return;
            }
            userValue = phoneNumber;
        }

        setIsCheckingUser(true);

        try {
            const userStatus = await checkUserStatus(userValue);

            if (!userStatus.exists) {
                toast.error("این کاربر ثبت‌نام نکرده است. لطفاً ابتدا ثبت‌نام کنید.");
                return;
            }

            sendOtpMutation.mutate(userValue);

        } catch (err) {
            console.error("Error checking user:", err);
            toast.error("خطا در بررسی کاربر. لطفاً دوباره تلاش کنید.");
        } finally {
            setIsCheckingUser(false);
        }
    };

    return (
        <div className="flex flex-col gap-6">
            <div className="flex gap-2 mb-4">
                <Button
                    type="button"
                    variant={method === "email" ? "default" : "outline"}
                    onClick={() => {
                        setMethod("email");
                        setShowForgotPasswordOption(false);
                    }}
                    className="flex-1"
                >
                    با ایمیل
                </Button>
                <Button
                    type="button"
                    variant={method === "phone" ? "default" : "outline"}
                    onClick={() => {
                        setMethod("phone");
                        setShowForgotPasswordOption(false);
                    }}
                    className="flex-1"
                >
                    با شماره تلفن
                </Button>
            </div>

            <form onSubmit={handleLogin} className="flex flex-col gap-4">
                {method === "email" ? (
                    <div className="flex flex-col gap-2">
                        <label className="text-Gray-950">{p.email} :</label>
                        <Input
                            type="email"
                            placeholder="example@gmail.com"
                            className="border rounded-xl p-4"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setShowForgotPasswordOption(false);
                            }}
                            required
                            disabled={loginMutation.isPending || sendOtpMutation.isPending || isCheckingUser}
                        />
                    </div>
                ) : (
                    <div className="flex flex-col gap-2">
                        <label className="text-Gray-950">شماره تلفن :</label>
                        <PhoneInput
                            value={phoneNumber}
                            onChange={(value) => {
                                setPhoneNumber(value);
                                setShowForgotPasswordOption(false);
                            }}
                            disabled={loginMutation.isPending || sendOtpMutation.isPending || isCheckingUser}
                        />
                    </div>
                )}

                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <label className="text-Gray-950">رمز :</label>
                        {showForgotPasswordOption && (
                            <button
                                type="button"
                                onClick={handleForgotPassword}
                                className="text-Primary-400 text-sm hover:underline"
                                disabled={sendOtpMutation.isPending || isCheckingUser}
                            >
                                {sendOtpMutation.isPending || isCheckingUser ? (
                                    <Spinner size={16} />
                                ) : (
                                    "ارسال کد تایید"
                                )}
                            </button>
                        )}
                    </div>
                    <Input
                        type="password"
                        placeholder="••••••••"
                        className="border rounded-xl p-4"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setShowForgotPasswordOption(false);
                        }}
                        required
                        disabled={loginMutation.isPending}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loginMutation.isPending}
                    className="bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl py-3 font-semibold"
                >
                    {loginMutation.isPending ? (
                        <Spinner size={25} />
                    ) : (
                        p.login
                    )}
                </Button>
            </form>

            <div className="text-center">
                <button
                    type="button"
                    onClick={handleForgotPassword}
                    className="text-Primary-400 text-sm hover:underline"
                    disabled={sendOtpMutation.isPending || isCheckingUser ||
                        (method === "email" ? !email.trim() : !phoneNumber)}
                >
                    {sendOtpMutation.isPending || isCheckingUser ? (
                        <Spinner size={16} />
                    ) : (
                        "فراموشی رمز عبور (ارسال کد تایید)"
                    )}
                </button>
            </div>

        </div>
    );
};

export default LoginTab;