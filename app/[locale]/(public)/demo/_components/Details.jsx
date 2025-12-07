"use client"
import React, { useState } from 'react';
import { TrustBadge, UrgentBadge } from './TrustBadge';
import { LiveStats } from './LiveStats';
import { UserDashboard } from './UserDashboard';
import { TrustSystemGuide } from './TrustSystemGuide';
import { Package, Shield, Clock, BarChart3, BookOpen, X } from 'lucide-react';


export const Details = () => {
    const [activeView, setActiveView] = useState(null);

    const features = [
        {
            id: 'badges',
            icon: Shield,
            title: 'نشان‌های اعتبار',
            description: 'مشاهده نشان‌های سابقه اعتماد و ارسال فوری',
            color: 'from-blue-500 to-cyan-500',
        },
        {
            id: 'stats',
            icon: BarChart3,
            title: 'آمار زنده',
            description: 'مشاهده آمار لحظه‌ای سیستم',
            color: 'from-green-500 to-emerald-500',
        },
        {
            id: 'dashboard',
            icon: Package,
            title: 'داشبورد کاربری',
            description: 'پنل مدیریت و آمار شخصی',
            color: 'from-purple-500 to-pink-500',
        },
        {
            id: 'guide',
            icon: BookOpen,
            title: 'راهنمای سیستم',
            description: 'آموزش کامل سیستم اعتماد',
            color: 'from-orange-500 to-red-500',
        },
    ];

    const renderContent = () => {
        switch (activeView) {
            case 'badges':
                return (
                    <div className="space-y-8">
                        <div>
                            <h3 className="text-xl text-[#142738] mb-4">نشان‌های سابقه اعتماد</h3>
                            <p className="text-[#64656f] mb-6">
                                این نشان‌ها نشان‌دهنده تعداد ارسال‌های موفق کاربران هستند و به شما کمک می‌کنند افراد قابل اعتماد را شناسایی کنید.
                            </p>
                            <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                    <span className="text-sm text-[#142738]">کاربر تازه‌کار (۱-۴ ارسال)</span>
                                    <TrustBadge successfulDeliveries={3} />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                    <span className="text-sm text-[#142738]">کاربر با تجربه (۵-۱۴ ارسال)</span>
                                    <TrustBadge successfulDeliveries={10} />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                    <span className="text-sm text-[#142738]">کاربر حرفه‌ای (۱۵-۴۹ ارسال)</span>
                                    <TrustBadge successfulDeliveries={25} />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-white rounded-lg">
                                    <span className="text-sm text-[#142738]">کاربر نخبه (۵۰+ ارسال)</span>
                                    <TrustBadge successfulDeliveries={75} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl text-[#142738] mb-4">نشان ارسال فوری</h3>
                            <p className="text-[#64656f] mb-6">
                                این نشان روی آگهی‌هایی که نیاز به ارسال سریع دارند نمایش داده می‌شود و به صورت خودکار به مسافران مسیر اطلاع‌رسانی می‌شود.
                            </p>
                            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-[#142738] mb-2">نمونه نشان:</p>
                                        <UrgentBadge />
                                    </div>
                                    <Clock className="size-16 text-orange-300" />
                                </div>
                                <div className="mt-4 pt-4 border-t border-orange-200">
                                    <ul className="space-y-2 text-sm text-[#64656f]">
                                        <li className="flex items-center gap-2">
                                            <div className="size-1.5 rounded-full bg-orange-500"></div>
                                            اطلاع‌رسانی هوشمند به مسافران مسیر
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="size-1.5 rounded-full bg-orange-500"></div>
                                            نمایش در بالای لیست نتایج
                                        </li>
                                        <li className="flex items-center gap-2">
                                            <div className="size-1.5 rounded-full bg-orange-500"></div>
                                            ارسال نوتیفیکیشن به کاربران مرتبط
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'stats':
                return (
                    <div>
                        <h3 className="text-xl text-[#142738] mb-4">آمار زنده سیستم</h3>
                        <p className="text-[#64656f] mb-6">
                            این کامپوننت آمار لحظه‌ای سیستم را نمایش می‌دهد و هر ۵ ثانیه به‌روزرسانی می‌شود.
                        </p>
                        <LiveStats />
                        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-200">
                            <p className="text-sm text-[#64656f]">
                                💡 <strong>نکته:</strong> این آمار شامل تعداد آگهی‌های فعال، کاربران آنلاین، ارسال‌های انجام شده امروز و میانگین زمان پاسخ است.
                            </p>
                        </div>
                    </div>
                );

            case 'dashboard':
                return <UserDashboard />;

            case 'guide':
                return <TrustSystemGuide />;

            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {!activeView ? (
                <div className="py-16 px-4">
                    <div className="max-w-6xl mx-auto">
                        {/* Header */}
                        <div className="text-center mb-12">
                            <h1 className="text-4xl text-[#142738] mb-4">
                                نمایش فیچرهای جدید ریرا
                            </h1>
                            <p className="text-lg text-[#64656f] max-w-3xl mx-auto">
                                سیستم سابقه اعتماد، نشان‌های اعتبار، ارسال فوری و داشبورد کاربری
                            </p>
                        </div>

                        {/* Feature Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            {features.map((feature) => {
                                const Icon = feature.icon;
                                return (
                                    <button
                                        key={feature.id}
                                        onClick={() => setActiveView(feature.id)}
                                        className="relative group overflow-hidden bg-white rounded-2xl p-8 text-right hover:shadow-2xl transition-all duration-300 border-2 border-transparent hover:border-[#4299c1]"
                                    >
                                        <div className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${feature.color}`}></div>

                                        <div className="flex items-start gap-4">
                                            <div className={`p-4 rounded-xl bg-gradient-to-br ${feature.color} group-hover:scale-110 transition-transform`}>
                                                <Icon className="size-8 text-white" />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="text-xl text-[#142738] mb-2 group-hover:text-[#4299c1] transition-colors">
                                                    {feature.title}
                                                </h3>
                                                <p className="text-sm text-[#64656f]">
                                                    {feature.description}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex items-center gap-2 text-[#4299c1] opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span className="text-sm">مشاهده دمو</span>
                                            <svg className="size-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Info Box */}
                        <div className="mt-12 bg-gradient-to-r from-[#4299c1]/10 to-[#4299c1]/5 rounded-2xl p-8 border border-[#4299c1]/20">
                            <div className="flex items-start gap-4">
                                <Shield className="size-12 text-[#4299c1] shrink-0" />
                                <div>
                                    <h3 className="text-xl text-[#142738] mb-2">چرا سیستم اعتماد؟</h3>
                                    <p className="text-[#64656f] leading-relaxed">
                                        در ریرا، امنیت و اعتماد در اولویت هستند. با سیستم سابقه اعتماد و نشان‌های اعتبار، می‌توانید با اطمینان خاطر بیشتری با دیگر کاربران ارتباط برقرار کنید. هر کاربر با تکمیل موفق هر ارسال، امتیاز و نشان دریافت می‌کند که نشان‌دهنده قابل اعتماد بودن اوست.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="min-h-screen">
                    {/* Back Button */}
                    <div className="sticky top-0 bg-white border-b border-gray-200 z-50">
                        <div className="max-w-7xl mx-auto px-4 py-4">
                            <button
                                onClick={() => setActiveView(null)}
                                className="flex items-center gap-2 text-[#4299c1] hover:text-[#3a89b0] transition-colors"
                            >
                                <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19l7-7-7-7" />
                                </svg>
                                <span>بازگشت به منو</span>
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className={activeView === 'dashboard' || activeView === 'guide' ? '' : 'max-w-5xl mx-auto px-4 py-8'}>
                        {renderContent()}
                    </div>
                </div>
            )}
        </div>
    );
};
