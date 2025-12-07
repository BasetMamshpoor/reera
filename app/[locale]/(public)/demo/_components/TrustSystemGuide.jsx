import React from 'react';
import { TrustBadge, UrgentBadge } from './TrustBadge';
import {
    Shield, Award, Star, TrendingUp, Clock, Bell,
    CheckCircle, Package, Users, Zap, Target, Gift
} from 'lucide-react';

export const TrustSystemGuide = () => {
    return (
        <div className="min-h-screen bg-gray-50 py-12" dir="rtl">
            <div className="max-w-6xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-3 bg-[#4299c1]/10 px-6 py-3 rounded-full mb-4">
                        <Shield className="size-6 text-[#4299c1]" />
                        <span className="text-[#142738]">سیستم اعتماد و امنیت ریرا</span>
                    </div>
                    <h1 className="text-4xl text-[#142738] mb-4">
                        چگونه اعتماد بسازیم؟
                    </h1>
                    <p className="text-lg text-[#64656f] max-w-3xl mx-auto">
                        در ریرا، اعتماد و امنیت در اولویت هستند. با سیستم سابقه اعتماد و نشان‌های اعتبار، می‌توانید با اطمینان بیشتری معامله کنید.
                    </p>
                </div>

                {/* Trust Badge Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Shield className="size-8 text-[#4299c1]" />
                        <h2 className="text-2xl text-[#142738]">نشان سابقه اعتماد</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg text-[#142738] mb-4">چیست؟</h3>
                            <p className="text-[#64656f] leading-relaxed mb-4">
                                نشان سابقه اعتماد یک نشانگر بصری است که تعداد ارسال‌های موفق یک کاربر را نمایش می‌دهد. این نشان به شما کمک می‌کند افراد قابل اعتماد را سریع‌تر شناسایی کنید.
                            </p>
                            <div className="bg-gray-50 p-4 rounded-xl">
                                <p className="text-sm text-[#64656f] mb-3">نمونه نشان‌ها:</p>
                                <div className="space-y-3">
                                    <TrustBadge successfulDeliveries={5} />
                                    <TrustBadge successfulDeliveries={15} />
                                    <TrustBadge successfulDeliveries={30} />
                                    <TrustBadge successfulDeliveries={50} />
                                </div>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg text-[#142738] mb-4">چگونه کار می‌کند؟</h3>
                            <div className="space-y-4">
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <CheckCircle className="size-5 text-green-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#142738] mb-1">۱. تکمیل موفق</p>
                                        <p className="text-xs text-[#64656f]">هر ارسال موفق به سابقه شما اضافه می‌شود</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0">
                                        <Star className="size-5 text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#142738] mb-1">۲. دریافت امتیاز</p>
                                        <p className="text-xs text-[#64656f]">طرف مقابل نظر مثبت ثبت کند</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-purple-100 flex items-center justify-center shrink-0">
                                        <Award className="size-5 text-purple-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#142738] mb-1">۳. ارتقای نشان</p>
                                        <p className="text-xs text-[#64656f]">با افزایش ارسال‌ها، نشان شما ارتقا می‌یابد</p>
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="size-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0">
                                        <TrendingUp className="size-5 text-orange-600" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-[#142738] mb-1">۴. اولویت بالاتر</p>
                                        <p className="text-xs text-[#64656f]">آگهی‌های شما در نتایج جستجو بالاتر نمایش داده می‌شود</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Levels */}
                    <div className="bg-gradient-to-r from-[#4299c1]/10 to-[#4299c1]/5 rounded-xl p-6">
                        <h3 className="text-lg text-[#142738] mb-4">سطوح اعتماد</h3>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="bg-white rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">🌱</div>
                                <p className="text-sm text-[#142738] mb-1">تازه‌کار</p>
                                <p className="text-xs text-[#64656f]">۱-۴ ارسال</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">⭐</div>
                                <p className="text-sm text-[#142738] mb-1">با تجربه</p>
                                <p className="text-xs text-[#64656f]">۵-۱۴ ارسال</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">💎</div>
                                <p className="text-sm text-[#142738] mb-1">حرفه‌ای</p>
                                <p className="text-xs text-[#64656f]">۱۵-۴۹ ارسال</p>
                            </div>
                            <div className="bg-white rounded-lg p-4 text-center">
                                <div className="text-2xl mb-2">👑</div>
                                <p className="text-sm text-[#142738] mb-1">نخبه</p>
                                <p className="text-xs text-[#64656f]">۵۰+ ارسال</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Urgent Delivery Section */}
                <section className="bg-white rounded-2xl p-8 shadow-sm mb-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Clock className="size-8 text-red-500" />
                        <h2 className="text-2xl text-[#142738]">سیستم ارسال فوری</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h3 className="text-lg text-[#142738] mb-4">چیست؟</h3>
                            <p className="text-[#64656f] leading-relaxed mb-4">
                                با فعال کردن گزینه ارسال فوری، آگهی شما به صورت خودکار به تمام مسافرانی که در چند ساعت آینده در همان مسیر سفر دارند، اطلاع‌رسانی می‌شود.
                            </p>
                            <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                                <UrgentBadge />
                                <p className="text-sm text-[#64656f] mt-3">
                                    این نشان روی آگهی‌های فوری نمایش داده می‌شود
                                </p>
                            </div>
                        </div>

                        <div>
                            <h3 className="text-lg text-[#142738] mb-4">مزایا</h3>
                            <div className="space-y-3">
                                <div className="flex gap-3 p-3 bg-green-50 rounded-lg">
                                    <Zap className="size-5 text-green-600 shrink-0" />
                                    <div>
                                        <p className="text-sm text-[#142738]">اطلاع‌رسانی هوشمند</p>
                                        <p className="text-xs text-[#64656f]">نوتیفیکیشن به مسافران مسیر</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 p-3 bg-blue-50 rounded-lg">
                                    <Target className="size-5 text-blue-600 shrink-0" />
                                    <div>
                                        <p className="text-sm text-[#142738]">پاسخ سریع‌تر</p>
                                        <p className="text-xs text-[#64656f]">احتمال پیدا کردن حمل‌کننده ۳ برابر بیشتر</p>
                                    </div>
                                </div>
                                <div className="flex gap-3 p-3 bg-purple-50 rounded-lg">
                                    <Bell className="size-5 text-purple-600 shrink-0" />
                                    <div>
                                        <p className="text-sm text-[#142738]">اولویت نمایش</p>
                                        <p className="text-xs text-[#64656f]">در بالای لیست نمایش داده می‌شود</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-orange-50 border border-orange-200 rounded-xl p-6">
                        <h3 className="text-lg text-[#142738] mb-4 flex items-center gap-2">
                            <Clock className="size-5 text-orange-600" />
                            نحوه عملکرد سیستم اطلاع‌رسانی فوری
                        </h3>
                        <div className="grid md:grid-cols-4 gap-4">
                            <div className="text-center">
                                <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-orange-600">۱</span>
                                </div>
                                <p className="text-sm text-[#142738] mb-1">ثبت آگهی فوری</p>
                                <p className="text-xs text-[#64656f]">انتخاب گزینه ارسال فوری</p>
                            </div>
                            <div className="text-center">
                                <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-orange-600">۲</span>
                                </div>
                                <p className="text-sm text-[#142738] mb-1">تطبیق هوشمند</p>
                                <p className="text-xs text-[#64656f]">پیدا کردن مسافران مسیر</p>
                            </div>
                            <div className="text-center">
                                <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-orange-600">۳</span>
                                </div>
                                <p className="text-sm text-[#142738] mb-1">ارسال نوتیفیکیشن</p>
                                <p className="text-xs text-[#64656f]">اطلاع‌رسانی به کاربران</p>
                            </div>
                            <div className="text-center">
                                <div className="size-12 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-3">
                                    <span className="text-orange-600">۴</span>
                                </div>
                                <p className="text-sm text-[#142738] mb-1">دریافت پاسخ</p>
                                <p className="text-xs text-[#64656f]">ارتباط سریع با حمل‌کننده</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="bg-gradient-to-br from-[#4299c1]/10 to-[#4299c1]/5 rounded-2xl p-8">
                    <h2 className="text-2xl text-[#142738] mb-6 text-center">مزایای سیستم اعتماد</h2>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                                <Users className="size-8 text-green-600" />
                            </div>
                            <h3 className="text-lg text-[#142738] mb-2">اعتماد بیشتر</h3>
                            <p className="text-sm text-[#64656f]">
                                با دیدن سابقه کاربران، با اطمینان خاطر بیشتری معامله کنید
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="size-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                                <Target className="size-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg text-[#142738] mb-2">شفافیت کامل</h3>
                            <p className="text-sm text-[#64656f]">
                                اطلاعات دقیق و شفاف از عملکرد هر کاربر
                            </p>
                        </div>
                        <div className="bg-white rounded-xl p-6 text-center">
                            <div className="size-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                                <Gift className="size-8 text-purple-600" />
                            </div>
                            <h3 className="text-lg text-[#142738] mb-2">پاداش فعالیت</h3>
                            <p className="text-sm text-[#64656f]">
                                با افزایش سابقه، مزایای بیشتری دریافت کنید
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <div className="mt-12 text-center">
                    <div className="bg-white rounded-2xl p-8 shadow-sm">
                        <h3 className="text-2xl text-[#142738] mb-4">آماده شروع هستید؟</h3>
                        <p className="text-[#64656f] mb-6 max-w-2xl mx-auto">
                            با ثبت اولین آگهی خود، سابقه اعتماد خود را شروع کنید و به جامعه کاربران قابل اعتماد ریرا بپیوندید.
                        </p>
                        <button className="px-8 py-4 bg-[#4299c1] text-white rounded-xl hover:bg-[#3a89b0] transition-colors shadow-lg">
                            شروع کنید
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
