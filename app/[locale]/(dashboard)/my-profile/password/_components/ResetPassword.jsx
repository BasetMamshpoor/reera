"use client";

import {useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {toast} from "sonner";
import Spinner from "@/components/Spinner";
import {request} from "@/lib/api";
import {Eye, EyeOff} from "lucide-react";

// Hook برای نمایش/مخفی کردن رمز
const usePasswordVisibility = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePassword = () => setShowPassword(prev => !prev);
    const toggleConfirmPassword = () => setShowConfirmPassword(prev => !prev);

    return {
        showPassword,
        showConfirmPassword,
        togglePassword,
        toggleConfirmPassword,
    };
};

const ResetPassword = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // استفاده از hook
    const {
        showPassword,
        showConfirmPassword,
        togglePassword,
        toggleConfirmPassword
    } = usePasswordVisibility();

    const resetPasswordMutation = useMutation({
        mutationFn: async (body) => {
            return await request({
                method: "post",
                url: "/auth/resetPassword",
                data: body,
            })
        },
        onSuccess: (data) => {
            toast.success(data?.message || "رمز عبور با موفقیت تغییر یافت");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        // اعتبارسنجی ساده
        if (!password || !confirmPassword) {
            toast.error("لطفاً همه فیلدها را پر کنید");
            return;
        }

        if (password.length < 6) {
            toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
            return;
        }

        if (password !== confirmPassword) {
            toast.error("رمز عبور و تکرار آن مطابقت ندارند");
            return;
        }

        const body = {
            password: password
        }

        resetPasswordMutation.mutate(body);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface p-4">
            <div className="w-full max-w-md bg-Surface-2 rounded-xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-6">
                    تغییر رمز عبور
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* رمز عبور با آیکون نمایش */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            رمز عبور جدید
                        </label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="حداقل ۶ کاراکتر"
                                disabled={resetPasswordMutation.isPending}
                                className="w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={togglePassword}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={resetPasswordMutation.isPending}
                            >
                                {showPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* تکرار رمز عبور با آیکون نمایش */}
                    <div>
                        <label className="block text-sm font-medium mb-2">
                            تکرار رمز عبور
                        </label>
                        <div className="relative">
                            <Input
                                type={showConfirmPassword ? "text" : "password"}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="تکرار رمز عبور"
                                disabled={resetPasswordMutation.isPending}
                                className="w-full pr-10"
                            />
                            <button
                                type="button"
                                onClick={toggleConfirmPassword}
                                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                disabled={resetPasswordMutation.isPending}
                            >
                                {showConfirmPassword ? (
                                    <EyeOff className="h-5 w-5" />
                                ) : (
                                    <Eye className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                    </div>

                    {/* دکمه ارسال */}
                    <Button
                        type="submit"
                        disabled={resetPasswordMutation.isPending}
                        className="w-full bg-Primary-400 hover:bg-Primary-500 text-white py-3 rounded-xl font-semibold"
                    >
                        {resetPasswordMutation.isPending ? (
                            <Spinner size={20}/>
                        ) : (
                            "تغییر رمز عبور"
                        )}
                    </Button>
                </form>

            </div>
        </div>
    );
};

export default ResetPassword;