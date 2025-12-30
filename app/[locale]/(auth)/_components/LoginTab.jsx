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

// تابع برای چک کردن وضعیت کاربر
const checkUserStatus = async (user) => {
    try {
        // اول سعی می‌کنیم از endpoint جدید استفاده کنیم
        const data = await request({
            method: "POST",
            url: "/auth/check-user-status",
            data: { user },
        });
        return data.data; // { exists: boolean, hasPassword: boolean, message: string }
    } catch (error) {
        // اگر endpoint جدید نبود، از endpoint قدیمی استفاده می‌کنیم
        console.log("check-user-status failed, trying check-user-exists");

        const data = await request({
            method: "POST",
            url: "/auth/check-user-exists",
            data: { user },
        });

        // فرمت کردن پاسخ
        return {
            exists: data.data?.exists || false,
            hasPassword: false, // اطلاعات کافی نداریم
            message: data.data?.message || ""
        };
    }
};

const LoginTab = ({ onSendOtp, onLogin, onForgotPassword }) => {
    const dic = useTranslation();
    const p = dic.auth.login;

    const [method, setMethod] = useState("email"); // "email" or "phone"
    const [email, setEmail] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [password, setPassword] = useState("");
    const [showForgotPasswordOption, setShowForgotPasswordOption] = useState(false);
    const [isCheckingUser, setIsCheckingUser] = useState(false);

    // Mutation برای لاگین با رمز عبور (ایمیل)
    const loginWithPasswordMutation = useMutation({
        mutationFn: async (credentials) => {
            return await signIn("password-login", {
                email: credentials.email,
                password: credentials.password,
                redirect: false,
            });
        },
        onSuccess: (result) => {
            if (result?.ok) {
                toast.success(p.successfully_logged_in || "با موفقیت وارد شدید!");
                if (onLogin) onLogin();
                // ریدایرکت به dashboard یا صفحه اصلی
                window.location.href = "/dashboard";
            } else {
                toast.error(result?.error || "ورود ناموفق بود");
                setShowForgotPasswordOption(true);
            }
        },
        onError: (error) => {
            toast.error(error.message || "خطا در ورود");
            setShowForgotPasswordOption(true);
        },
    });

    // Mutation برای لاگین با رمز عبور (شماره تلفن)
    const loginWithPhoneMutation = useMutation({
        mutationFn: async (data) =>
            await request({
                method: "post",
                url: "/auth/login",
                data,
            }),
        onSuccess: (data) => {
            toast.success(p.successfully_logged_in || "با موفقیت وارد شدید!");
            if (onLogin) onLogin(data);
            // ریدایرکت
            window.location.href = "/dashboard";
        },
        onError: (error) => {
            if (error.message.includes("رمز") || error.message.includes("password")) {
                setShowForgotPasswordOption(true);
                toast.error("رمز عبور اشتباه است");
            } else {
                toast.error(error.message || "ورود ناموفق بود");
            }
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

            // ارسال اطلاعات به والد برای رفتن به صفحه OTP
            if (onForgotPassword) {
                const otpData = method === "email"
                    ? { email, phone: null }
                    : { email: null, phone: phoneNumber };

                onForgotPassword({
                    ...otpData,
                    mode: "login" // حالت ورود (نه ثبت‌نام)
                });
            }
        },
        onError: (error) => {
            toast.error(error.message || "ارسال کد ناموفق بود");
        },
    });

    const handleLogin = async (e) => {
        e.preventDefault();

        if (method === "email") {
            if (!email.trim() || !password) {
                toast.error("لطفاً ایمیل و رمز عبور را وارد کنید");
                return;
            }

            // لاگین با ایمیل و رمز عبور
            loginWithPasswordMutation.mutate({
                email: email.trim(),
                password,
            });
        } else {
            if (!phoneNumber || !password) {
                toast.error("لطفاً شماره تلفن و رمز عبور را وارد کنید");
                return;
            }

            // لاگین با شماره تلفن و رمز عبور
            loginWithPhoneMutation.mutate({
                user: phoneNumber,
                password,
            });
        }
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

        // اول چک می‌کنیم کاربر وجود دارد یا نه
        setIsCheckingUser(true);

        try {
            const userStatus = await checkUserStatus(userValue);

            if (!userStatus.exists) {
                // کاربر ثبت‌نام نکرده است
                toast.error("این کاربر ثبت‌نام نکرده است. لطفاً ابتدا ثبت‌نام کنید.");
                return;
            }

            // اگر کاربر وجود دارد، OTP ارسال می‌کنیم
            sendOtpMutation.mutate(userValue);

        } catch (err) {
            console.error("Error checking user:", err);

            // اگر چک کردن کاربر با خطا مواجه شد، می‌توانیم مستقیماً OTP ارسال کنیم
            // یا پیام خطا نمایش دهیم
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
                            disabled={loginWithPasswordMutation.isPending || sendOtpMutation.isPending || isCheckingUser}
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
                            disabled={loginWithPhoneMutation.isPending || sendOtpMutation.isPending || isCheckingUser}
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
                        disabled={loginWithPasswordMutation.isPending || loginWithPhoneMutation.isPending}
                    />
                </div>

                <Button
                    type="submit"
                    disabled={loginWithPasswordMutation.isPending || loginWithPhoneMutation.isPending}
                    className="bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl py-3 font-semibold"
                >
                    {(loginWithPasswordMutation.isPending || loginWithPhoneMutation.isPending) ? (
                        <Spinner size={25} />
                    ) : (
                        p.login
                    )}
                </Button>
            </form>

            {/* دکمه فراموشی رمز عبور (همیشه نمایش داده شود) */}
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

            {/* نمایش وضعیت بررسی کاربر */}
            {isCheckingUser && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-blue-700 text-sm text-center">
                        در حال بررسی اطلاعات کاربر...
                    </p>
                </div>
            )}
        </div>
    );
};

export default LoginTab;