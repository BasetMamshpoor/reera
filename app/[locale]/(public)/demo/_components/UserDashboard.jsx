import React from 'react';
import { TrustBadge } from './TrustBadge';
import {
    Package, Star, Shield, TrendingUp, Award,
    Clock, CheckCircle, Users, MessageCircle
} from 'lucide-react';

export const UserDashboard = () => {
    const userStats = {
        name: 'رضا احمدی',
        memberSince: '۱۴۰۲/۰۳/۱۵',
        successfulDeliveries: 24,
        rating: 4.8,
        reviewCount: 24,
        completionRate: 96,
        responseTime: '۲ ساعت',
        totalEarned: '۳,۵۰۰,۰۰۰',
    };

    const recentActivities = [
        { id: 1, type: 'delivery', title: 'ارسال دارو به اصفهان', status: 'completed', date: '۱۴۰۳/۰۹/۱۲' },
        { id: 2, type: 'review', title: 'نظر جدید از فاطمه کریمی', rating: 5, date: '۱۴۰۳/۰۹/۱۰' },
        { id: 3, type: 'delivery', title: 'حمل بسته از مشهد', status: 'in-progress', date: '۱۴۰۳/۰۹/۰۸' },
        { id: 4, type: 'badge', title: 'دریافت نشان "حمل‌کننده قابل اعتماد"', date: '۱۴۰۳/۰۹/۰۵' },
    ];

    const achievements = [
        { icon: Award, title: 'حمل‌کننده برتر', description: '۲۰+ ارسال موفق', earned: true },
        { icon: Clock, title: 'پاسخ‌گوی سریع', description: 'زمان پاسخ کمتر از ۳ ساعت', earned: true },
        { icon: Star, title: 'رتبه ۵ ستاره', description: 'امتیاز ۴.۸ یا بالاتر', earned: true },
        { icon: Shield, title: 'کاربر تایید شده', description: 'احراز هویت کامل', earned: true },
        { icon: Users, title: 'محبوب جامعه', description: '۵۰+ نظر مثبت', earned: false },
        { icon: TrendingUp, title: 'حرفه‌ای', description: '۱۰۰+ ارسال موفق', earned: false },
    ];

    return (
        <div className="min-h-screen bg-gray-50 py-8" dir="rtl">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                    <div className="flex flex-col md:flex-row md:items-center gap-6">
                        {/* Avatar */}
                        <div className="size-24 bg-gradient-to-br from-[#4299c1] to-[#3a89b0] rounded-full flex items-center justify-center text-white text-3xl shrink-0">
                            {userStats.name.charAt(0)}
                        </div>

                        {/* User Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl text-[#142738]">{userStats.name}</h1>
                                <Shield className="size-5 text-[#4299c1]" />
                            </div>
                            <p className="text-sm text-[#64656f] mb-3">عضو از {userStats.memberSince}</p>

                            {/* Trust Badge */}
                            <TrustBadge successfulDeliveries={userStats.successfulDeliveries} />
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="text-center p-4 bg-[#4299c1]/5 rounded-xl">
                                <div className="flex items-center justify-center gap-1 mb-1">
                                    <Star className="size-4 text-yellow-500 fill-yellow-500" />
                                    <span className="text-xl text-[#142738]">{userStats.rating}</span>
                                </div>
                                <p className="text-xs text-[#64656f]">{userStats.reviewCount} نظر</p>
                            </div>
                            <div className="text-center p-4 bg-green-50 rounded-xl">
                                <div className="text-xl text-green-600 mb-1">{userStats.completionRate}%</div>
                                <p className="text-xs text-[#64656f]">نرخ تکمیل</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-3 gap-6">
                    {/* Main Stats */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Performance Metrics */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg text-[#142738] mb-4 flex items-center gap-2">
                                <TrendingUp className="size-5 text-[#4299c1]" />
                                آمار عملکرد
                            </h2>
                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="p-4 border border-gray-200 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Package className="size-4 text-[#4299c1]" />
                                        <span className="text-sm text-[#64656f]">ارسال موفق</span>
                                    </div>
                                    <p className="text-2xl text-[#142738]">{userStats.successfulDeliveries}</p>
                                </div>
                                <div className="p-4 border border-gray-200 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="size-4 text-[#4299c1]" />
                                        <span className="text-sm text-[#64656f]">زمان پاسخ</span>
                                    </div>
                                    <p className="text-2xl text-[#142738]">{userStats.responseTime}</p>
                                </div>
                                <div className="p-4 border border-gray-200 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <Award className="size-4 text-[#4299c1]" />
                                        <span className="text-sm text-[#64656f]">درآمد کل</span>
                                    </div>
                                    <p className="text-xl text-[#142738]">{userStats.totalEarned}</p>
                                    <p className="text-xs text-[#64656f]">تومان</p>
                                </div>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg text-[#142738] mb-4 flex items-center gap-2">
                                <Clock className="size-5 text-[#4299c1]" />
                                فعالیت‌های اخیر
                            </h2>
                            <div className="space-y-3">
                                {recentActivities.map((activity) => (
                                    <div key={activity.id} className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
                                        <div className="p-2 bg-[#4299c1]/10 rounded-lg shrink-0">
                                            {activity.type === 'delivery' && <Package className="size-4 text-[#4299c1]" />}
                                            {activity.type === 'review' && <Star className="size-4 text-yellow-500" />}
                                            {activity.type === 'badge' && <Award className="size-4 text-green-600" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm text-[#142738] mb-1">{activity.title}</p>
                                            <p className="text-xs text-[#64656f]">{activity.date}</p>
                                        </div>
                                        {activity.status === 'completed' && (
                                            <CheckCircle className="size-4 text-green-600 shrink-0" />
                                        )}
                                        {activity.status === 'in-progress' && (
                                            <Clock className="size-4 text-orange-500 shrink-0" />
                                        )}
                                        {activity.rating && (
                                            <div className="flex items-center gap-1 shrink-0">
                                                <Star className="size-3 text-yellow-500 fill-yellow-500" />
                                                <span className="text-sm text-[#142738]">{activity.rating}</span>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Achievements */}
                        <div className="bg-white rounded-2xl p-6 shadow-sm">
                            <h2 className="text-lg text-[#142738] mb-4 flex items-center gap-2">
                                <Award className="size-5 text-[#4299c1]" />
                                دستاوردها
                            </h2>
                            <div className="space-y-3">
                                {achievements.map((achievement, index) => {
                                    const Icon = achievement.icon;
                                    return (
                                        <div
                                            key={index}
                                            className={`p-3 rounded-lg border-2 transition-all ${
                                                achievement.earned
                                                    ? 'border-[#4299c1] bg-[#4299c1]/5'
                                                    : 'border-gray-200 bg-gray-50 opacity-60'
                                            }`}
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className={`p-2 rounded-lg ${
                                                    achievement.earned ? 'bg-[#4299c1]' : 'bg-gray-200'
                                                }`}>
                                                    <Icon className={`size-4 ${
                                                        achievement.earned ? 'text-white' : 'text-gray-400'
                                                    }`} />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-sm text-[#142738] mb-1">{achievement.title}</p>
                                                    <p className="text-xs text-[#64656f]">{achievement.description}</p>
                                                </div>
                                                {achievement.earned && (
                                                    <CheckCircle className="size-4 text-[#4299c1] shrink-0" />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* Trust Level Info */}
                        <div className="bg-gradient-to-br from-[#4299c1]/10 to-[#4299c1]/5 rounded-2xl p-6 border border-[#4299c1]/20">
                            <div className="flex items-center gap-2 mb-3">
                                <Shield className="size-5 text-[#4299c1]" />
                                <h3 className="text-base text-[#142738]">سطح اعتماد</h3>
                            </div>
                            <p className="text-sm text-[#64656f] mb-4">
                                با ادامه فعالیت و دریافت نظرات مثبت، سطح اعتماد شما افزایش می‌یابد و در نتایج جستجو اولویت بالاتری خواهید داشت.
                            </p>
                            <div className="space-y-2">
                                <div className="flex justify-between text-xs">
                                    <span className="text-[#64656f]">سطح فعلی: حرفه‌ای</span>
                                    <span className="text-[#4299c1]">۲۴/۵۰</span>
                                </div>
                                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#4299c1] rounded-full" style={{ width: '48%' }}></div>
                                </div>
                                <p className="text-xs text-[#64656f]">۲۶ ارسال تا سطح بعدی</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
