"use client";

import {useState} from "react";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import LoginTab from "./LoginTab";
import SignupTab from "./SignupTab";
import OtpPage from "./OTP3";
import {useParams} from "next/navigation";

const Auth = ({onSendOtp}) => {
    const dic = useTranslation();
    const p = dic.auth.login;
    const {locale} = useParams();
    const [activeTab, setActiveTab] = useState("login");
    const [step, setStep] = useState("auth"); // "auth" یا "otp"
    const [otpData, setOtpData] = useState({
        email: null,
        phone: null,
        mode: "signup" // "signup" یا "login"
    });

    const handleSendOtp = (data) => {
        setOtpData({...data, mode: "signup"});
        setStep("otp");
    };

    const handleForgotPassword = (data) => {
        setOtpData({...data, mode: "login"});
        setStep("otp");
    };

    const handleLoginSuccess = (data) => {
        // لاگین موفق با رمز عبور
        console.log("Login successful:", data);
        // ریدایرکت یا مدیریت session
    };

    const handleEditOtp = () => {
        setStep("auth");
        // برگشت به تب مناسب
        setActiveTab(otpData.mode === "signup" ? "signup" : "login");
    };

    if (step === "otp") {
        return (
            <OtpPage
                email={otpData.email}
                phone={otpData.phone}
                onEdit={handleEditOtp}
                p={p}
                mode={otpData.mode} // "signup" یا "login"
            />
        );
    }

    return (
        <div className="flex flex-col gap-6 w-full max-w-md p-6 bg-surface rounded-xl border">
            <h2 className="text-2xl font-semibold text-center">{p.login_signup}</h2>

            <Tabs dir={locale === "fa" ? "rtl" : "ltr"} value={activeTab} onValueChange={setActiveTab}
                  className="w-full">
                <TabsList className="hidden lg:flex w-full bg-transparent border-b p-0 rounded-0">
                    <TabsTrigger
                        className="data-[state=active]:border-b-Primary-400 cursor-pointer data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                        value="login">
                        {p.login}
                    </TabsTrigger>
                    <TabsTrigger
                        className="data-[state=active]:border-b-Primary-400 cursor-pointer data-[state=active]:border-b-2 pb-2  font-bold text-sm"
                        value="signup">
                        ثبت نام
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="login">
                    <LoginTab
                        onSendOtp={handleSendOtp}
                        onLogin={handleLoginSuccess}
                        onForgotPassword={handleForgotPassword}
                    />
                </TabsContent>

                <TabsContent value="signup">
                    <SignupTab
                        onSendOtp={handleSendOtp}
                    />
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default Auth;