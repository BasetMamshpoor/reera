import React, { useState, useEffect } from 'react';
import { Package, Users, Clock, TrendingUp } from 'lucide-react';

export const LiveStats = () => {
    const [stats, setStats] = useState({
        activeAds: 127,
        activeUsers: 45,
        completedToday: 18,
        avgResponseTime: 2.3,
    });

    // Simulate live updates
    useEffect(() => {
        const interval = setInterval(() => {
            setStats(prev => ({
                activeAds: prev.activeAds + Math.floor(Math.random() * 3) - 1,
                activeUsers: prev.activeUsers + Math.floor(Math.random() * 5) - 2,
                completedToday: prev.completedToday + Math.floor(Math.random() * 2),
                avgResponseTime: Math.max(1, prev.avgResponseTime + (Math.random() * 0.4 - 0.2)),
            }));
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const statItems = [
        {
            icon: Package,
            value: stats.activeAds,
            label: 'آگهی فعال',
            color: 'text-blue-600',
            bgColor: 'bg-blue-100',
            pulse: true,
        },
        {
            icon: Users,
            value: stats.activeUsers,
            label: 'کاربر آنلاین',
            color: 'text-green-600',
            bgColor: 'bg-green-100',
            pulse: true,
        },
        {
            icon: Clock,
            value: `${stats.completedToday}`,
            label: 'ارسال امروز',
            color: 'text-purple-600',
            bgColor: 'bg-purple-100',
            pulse: false,
        },
        {
            icon: TrendingUp,
            value: `${stats.avgResponseTime.toFixed(1)}س`,
            label: 'میانگین پاسخ',
            color: 'text-orange-600',
            bgColor: 'bg-orange-100',
            pulse: false,
        },
    ];

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm" dir="rtl">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg text-[#142738] flex items-center gap-2">
          <span className="relative flex size-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full size-3 bg-green-500"></span>
          </span>
                    آمار لحظه‌ای
                </h3>
                <span className="text-xs text-[#64656f]">به‌روزرسانی هر ۵ ثانیه</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {statItems.map((item, index) => {
                    const Icon = item.icon;
                    return (
                        <div
                            key={index}
                            className="relative p-4 border border-gray-200 rounded-xl hover:border-[#4299c1] transition-all group"
                        >
                            <div className={`inline-flex p-2 rounded-lg ${item.bgColor} mb-3`}>
                                <Icon className={`size-5 ${item.color}`} />
                            </div>
                            {item.pulse && (
                                <div className="absolute top-2 left-2">
                  <span className="relative flex size-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
                  </span>
                                </div>
                            )}
                            <p className="text-2xl text-[#142738] mb-1 transition-all group-hover:scale-110">
                                {item.value}
                            </p>
                            <p className="text-xs text-[#64656f]">{item.label}</p>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 p-3 bg-[#4299c1]/5 rounded-lg">
                <p className="text-xs text-[#64656f] text-center">
                    🎉 در ۲۴ ساعت گذشته، ۴۲ ارسال با موفقیت انجام شده است
                </p>
            </div>
        </div>
    );
};
