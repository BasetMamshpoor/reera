import React, { useState } from 'react';
import { BarChart, Bar, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { Globe, DollarSign, TrendingUp, Clock, Home, Award, ChevronDown, Check, Sparkles, Info } from 'lucide-react';


const countriesData = [
    {
        id: 'germany',
        name: 'آلمان',
        flag: '🇩🇪',
        monthlyCost: 1800,
        averageSalary: 4500,
        visaSpeed: 4,
        taxRate: 35,
        prChance: 85,
        qualityOfLife: 92,
        color: '#000000',
        highlights: ['اقتصاد قوی', 'بازار کار عالی', 'تحصیل رایگان'],
        details: {
            rentCost: 900,
            foodCost: 400,
            transportCost: 150,
            healthcareCost: 350,
            language: 'آلمانی',
            visaSuccessRate: 78,
            immigrationFriendly: 85
        }
    },
    {
        id: 'canada',
        name: 'کانادا',
        flag: '🇨🇦',
        monthlyCost: 2200,
        averageSalary: 4800,
        visaSpeed: 12,
        taxRate: 30,
        prChance: 95,
        qualityOfLife: 95,
        color: '#FF0000',
        highlights: ['مهاجرپذیر', 'کیفیت زندگی بالا', 'چندفرهنگی'],
        details: {
            rentCost: 1200,
            foodCost: 500,
            transportCost: 200,
            healthcareCost: 300,
            language: 'انگلیسی/فرانسه',
            visaSuccessRate: 65,
            immigrationFriendly: 95
        }
    },
    {
        id: 'australia',
        name: 'استرالیا',
        flag: '🇦🇺',
        monthlyCost: 2500,
        averageSalary: 5200,
        visaSpeed: 10,
        taxRate: 32,
        prChance: 80,
        qualityOfLife: 94,
        color: '#FFD700',
        highlights: ['حقوق بالا', 'آب و هوا عالی', 'استاندارد زندگی'],
        details: {
            rentCost: 1400,
            foodCost: 550,
            transportCost: 200,
            healthcareCost: 350,
            language: 'انگلیسی',
            visaSuccessRate: 70,
            immigrationFriendly: 80
        }
    },
    {
        id: 'austria',
        name: 'اتریش',
        flag: '🇦🇹',
        monthlyCost: 1900,
        averageSalary: 4200,
        visaSpeed: 6,
        taxRate: 38,
        prChance: 75,
        qualityOfLife: 93,
        color: '#ED2939',
        highlights: ['کیفیت زندگی', 'موقعیت مرکزی', 'فرهنگ غنی'],
        details: {
            rentCost: 950,
            foodCost: 450,
            transportCost: 150,
            healthcareCost: 350,
            language: 'آلمانی',
            visaSuccessRate: 72,
            immigrationFriendly: 75
        }
    },
    {
        id: 'portugal',
        name: 'پرتغال',
        flag: '🇵🇹',
        monthlyCost: 1300,
        averageSalary: 2800,
        visaSpeed: 5,
        taxRate: 28,
        prChance: 90,
        qualityOfLife: 88,
        color: '#006600',
        highlights: ['هزینه کم', 'آب و هوا', 'مالیات مناسب'],
        details: {
            rentCost: 650,
            foodCost: 350,
            transportCost: 100,
            healthcareCost: 200,
            language: 'پرتغالی',
            visaSuccessRate: 85,
            immigrationFriendly: 90
        }
    },
    {
        id: 'uae',
        name: 'امارات',
        flag: '🇦🇪',
        monthlyCost: 2800,
        averageSalary: 5500,
        visaSpeed: 2,
        taxRate: 0,
        prChance: 40,
        qualityOfLife: 85,
        color: '#FF6B00',
        highlights: ['بدون مالیات', 'حقوق بالا', 'پروسه سریع'],
        details: {
            rentCost: 1600,
            foodCost: 600,
            transportCost: 250,
            healthcareCost: 350,
            language: 'عربی/انگلیسی',
            visaSuccessRate: 90,
            immigrationFriendly: 60
        }
    }
];

export function CountryComparison() {
    const [selectedCountries, setSelectedCountries] = useState(['germany', 'canada', 'australia']);
    const [viewMode, setViewMode] = useState('radar');
    const [showDetails, setShowDetails] = useState(false);

    const toggleCountry = (countryId) => {
        if (selectedCountries.includes(countryId)) {
            if (selectedCountries.length > 1) {
                setSelectedCountries(selectedCountries.filter(id => id !== countryId));
            }
        } else {
            if (selectedCountries.length < 4) {
                setSelectedCountries([...selectedCountries, countryId]);
            }
        }
    };

    const selectedCountriesData = countriesData.filter(c => selectedCountries.includes(c.id));

    // Prepare data for radar chart
    const radarData = [
        {
            metric: 'کیفیت زندگی',
            ...Object.fromEntries(selectedCountriesData.map(c => [c.name, c.qualityOfLife]))
        },
        {
            metric: 'شانس اقامت',
            ...Object.fromEntries(selectedCountriesData.map(c => [c.name, c.prChance]))
        },
        {
            metric: 'سرعت ویزا',
            ...Object.fromEntries(selectedCountriesData.map(c => [c.name, Math.max(0, 100 - (c.visaSpeed * 5))]))
        },
        {
            metric: 'قدرت خرید',
            ...Object.fromEntries(selectedCountriesData.map(c => [c.name, Math.round((c.averageSalary - c.monthlyCost) / 50)]))
        },
        {
            metric: 'مالیات',
            ...Object.fromEntries(selectedCountriesData.map(c => [c.name, Math.max(0, 100 - c.taxRate)]))
        },
        {
            metric: 'مهاجرپذیری',
            ...Object.fromEntries(selectedCountriesData.map(c => [c.name, c.details.immigrationFriendly]))
        }
    ];

    // Bar chart data for costs
    const costComparisonData = selectedCountriesData.map(c => ({
        name: c.flag + ' ' + c.name,
        'هزینه زندگی': c.monthlyCost,
        'حقوق متوسط': c.averageSalary,
        'پس‌انداز': c.averageSalary - c.monthlyCost
    }));

    // Detailed costs breakdown
    const costBreakdownData = selectedCountriesData.map(c => ({
        name: c.flag + ' ' + c.name,
        'اجاره': c.details.rentCost,
        'غذا': c.details.foodCost,
        'حمل‌ونقل': c.details.transportCost,
        'بهداشت': c.details.healthcareCost
    }));

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white py-12 lg:py-16" dir="rtl">
            <div className="max-w-7xl mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-4">
                        <Sparkles className="w-5 h-5 text-blue-600" />
                        <span className="text-blue-600 font-medium">مقایسه هوشمند</span>
                    </div>
                    <h2 className="text-3xl lg:text-5xl text-[#142738] mb-4">
                        مقایسه زنده کشورها
                    </h2>
                    <p className="text-lg text-[#64656f] max-w-2xl mx-auto">
                        کشورهای مورد نظرتان را انتخاب کنید و تمام جزئیات را با هم مقایسه کنید
                    </p>
                </div>

                {/* Country Selector */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl text-[#142738] font-medium">انتخاب کشورها (حداکثر 4)</h3>
                        <span className="text-sm text-[#64656f]">{selectedCountries.length} کشور انتخاب شده</span>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
                        {countriesData.map(country => {
                            const isSelected = selectedCountries.includes(country.id);
                            const isDisabled = !isSelected && selectedCountries.length >= 4;

                            return (
                                <button
                                    key={country.id}
                                    onClick={() => !isDisabled && toggleCountry(country.id)}
                                    disabled={isDisabled}
                                    className={`relative p-4 rounded-xl border-2 transition-all ${
                                        isSelected
                                            ? 'border-blue-500 bg-blue-50 shadow-md'
                                            : isDisabled
                                                ? 'border-gray-200 bg-gray-50 opacity-50 cursor-not-allowed'
                                                : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                                    }`}
                                >
                                    {isSelected && (
                                        <div className="absolute top-2 left-2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                                            <Check className="w-4 h-4 text-white" />
                                        </div>
                                    )}

                                    <div className="text-4xl mb-2">{country.flag}</div>
                                    <div className="text-sm text-[#142738] font-medium">{country.name}</div>
                                    <div className="text-xs text-[#64656f] mt-1">
                                        {country.monthlyCost.toLocaleString()}€
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* View Mode Selector */}
                <div className="flex justify-center gap-2 mb-8">
                    <button
                        onClick={() => setViewMode('radar')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            viewMode === 'radar'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-[#64656f] border-2 border-gray-200 hover:border-blue-300'
                        }`}
                    >
                        نمودار راداری
                    </button>
                    <button
                        onClick={() => setViewMode('bar')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            viewMode === 'bar'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-[#64656f] border-2 border-gray-200 hover:border-blue-300'
                        }`}
                    >
                        نمودار میله‌ای
                    </button>
                    <button
                        onClick={() => setViewMode('table')}
                        className={`px-6 py-3 rounded-xl font-medium transition-all ${
                            viewMode === 'table'
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-white text-[#64656f] border-2 border-gray-200 hover:border-blue-300'
                        }`}
                    >
                        جدول مقایسه
                    </button>
                </div>

                {/* Radar Chart View */}
                {viewMode === 'radar' && (
                    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8 mb-8">
                        <h3 className="text-xl text-[#142738] font-medium mb-6 text-center">
                            مقایسه جامع شاخص‌ها
                        </h3>

                        <div className="h-[500px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <RadarChart data={radarData}>
                                    <PolarGrid stroke="#e5e7eb" />
                                    <PolarAngleAxis
                                        dataKey="metric"
                                        tick={{ fill: '#142738', fontSize: 14 }}
                                    />
                                    <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#64656f' }} />
                                    {selectedCountriesData.map((country) => (
                                        <Radar
                                            key={country.id}
                                            name={country.flag + ' ' + country.name}
                                            dataKey={country.name}
                                            stroke={country.color}
                                            fill={country.color}
                                            fillOpacity={0.3}
                                            strokeWidth={2}
                                        />
                                    ))}
                                    <Legend
                                        wrapperStyle={{ direction: 'rtl' }}
                                        iconType="circle"
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'white',
                                            border: '2px solid #e5e7eb',
                                            borderRadius: '12px',
                                            direction: 'rtl'
                                        }}
                                    />
                                </RadarChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                            {selectedCountriesData.map(country => (
                                <div key={country.id} className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl">
                                    <div className="text-3xl">{country.flag}</div>
                                    <div>
                                        <div className="text-[#142738] font-medium">{country.name}</div>
                                        <div className="text-sm text-[#64656f]">
                                            امتیاز کلی: {Math.round((country.qualityOfLife + country.prChance) / 2)}/100
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Bar Chart View */}
                {viewMode === 'bar' && (
                    <div className="space-y-8">
                        {/* Cost vs Salary */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                            <h3 className="text-xl text-[#142738] font-medium mb-6">
                                💰 هزینه زندگی و حقوق
                            </h3>

                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={costComparisonData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" tick={{ fill: '#142738', fontSize: 12 }} angle={-15} textAnchor="end" height={80} />
                                        <YAxis tick={{ fill: '#64656f' }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '2px solid #e5e7eb',
                                                borderRadius: '12px',
                                                direction: 'rtl'
                                            }}
                                            formatter={(value) => `${value.toLocaleString()}€`}
                                        />
                                        <Legend wrapperStyle={{ direction: 'rtl' }} />
                                        <Bar dataKey="هزینه زندگی" fill="#ef4444" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="حقوق متوسط" fill="#10b981" radius={[8, 8, 0, 0]} />
                                        <Bar dataKey="پس‌انداز" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Cost Breakdown */}
                        <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                            <h3 className="text-xl text-[#142738] font-medium mb-6">
                                📊 تفکیک هزینه‌های زندگی
                            </h3>

                            <div className="h-[400px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={costBreakdownData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                        <XAxis dataKey="name" tick={{ fill: '#142738' }} />
                                        <YAxis tick={{ fill: '#64656f' }} />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'white',
                                                border: '2px solid #e5e7eb',
                                                borderRadius: '12px',
                                                direction: 'rtl'
                                            }}
                                            formatter={(value) => `${value.toLocaleString()}€`}
                                        />
                                        <Legend wrapperStyle={{ direction: 'rtl' }} />
                                        <Bar dataKey="اجاره" stackId="a" fill="#8b5cf6" radius={[0, 0, 0, 0]} />
                                        <Bar dataKey="غذا" stackId="a" fill="#06b6d4" radius={[0, 0, 0, 0]} />
                                        <Bar dataKey="حمل‌ونقل" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
                                        <Bar dataKey="بهداشت" stackId="a" fill="#ec4899" radius={[8, 8, 0, 0]} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Visa Speed and PR Chance */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                                <h3 className="text-xl text-[#142738] font-medium mb-6">
                                    ⏱️ سرعت پروسه ویزا (ماه)
                                </h3>

                                <div className="space-y-4">
                                    {selectedCountriesData.map(country => (
                                        <div key={country.id}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[#142738]">{country.flag} {country.name}</span>
                                                <span className="font-medium text-blue-600">{country.visaSpeed} ماه</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all"
                                                    style={{ width: `${Math.max(10, 100 - (country.visaSpeed * 5))}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-8">
                                <h3 className="text-xl text-[#142738] font-medium mb-6">
                                    🏠 شانس اقامت دائم
                                </h3>

                                <div className="space-y-4">
                                    {selectedCountriesData.map(country => (
                                        <div key={country.id}>
                                            <div className="flex items-center justify-between mb-2">
                                                <span className="text-[#142738]">{country.flag} {country.name}</span>
                                                <span className="font-medium text-green-600">{country.prChance}%</span>
                                            </div>
                                            <div className="h-3 bg-gray-100 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-gradient-to-r from-green-500 to-green-600 rounded-full transition-all"
                                                    style={{ width: `${country.prChance}%` }}
                                                ></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Table View */}
                {viewMode === 'table' && (
                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                                <tr>
                                    <th className="px-6 py-4 text-right font-medium">کشور</th>
                                    <th className="px-6 py-4 text-center font-medium">هزینه زندگی</th>
                                    <th className="px-6 py-4 text-center font-medium">حقوق متوسط</th>
                                    <th className="px-6 py-4 text-center font-medium">پس‌انداز</th>
                                    <th className="px-6 py-4 text-center font-medium">سرعت ویزا</th>
                                    <th className="px-6 py-4 text-center font-medium">مالیات</th>
                                    <th className="px-6 py-4 text-center font-medium">شانس PR</th>
                                    <th className="px-6 py-4 text-center font-medium">کیفیت</th>
                                </tr>
                                </thead>
                                <tbody>
                                {selectedCountriesData.map((country, index) => (
                                    <tr
                                        key={country.id}
                                        className={`${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition-colors`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <span className="text-3xl">{country.flag}</span>
                                                <div>
                                                    <div className="font-medium text-[#142738]">{country.name}</div>
                                                    <div className="text-sm text-[#64656f]">{country.details.language}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="font-medium text-[#142738]">{country.monthlyCost.toLocaleString()}€</div>
                                            <div className="text-xs text-[#64656f]">ماهانه</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="font-medium text-green-600">{country.averageSalary.toLocaleString()}€</div>
                                            <div className="text-xs text-[#64656f]">ماهانه</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="font-medium text-blue-600">
                                                {(country.averageSalary - country.monthlyCost).toLocaleString()}€
                                            </div>
                                            <div className="text-xs text-[#64656f]">ماهانه</div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                                                <Clock className="w-4 h-4" />
                                                {country.visaSpeed} ماه
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${
                                                country.taxRate === 0 ? 'bg-green-100 text-green-700' :
                                                    country.taxRate < 30 ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                            }`}>
                                                {country.taxRate}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                                                <Home className="w-4 h-4" />
                                                {country.prChance}%
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center">
                                            <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                                                <Award className="w-4 h-4" />
                                                {country.qualityOfLife}/100
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Highlights Section */}
                        <div className="border-t border-gray-200 p-6">
                            <h4 className="text-lg text-[#142738] font-medium mb-4">✨ نکات کلیدی</h4>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                {selectedCountriesData.map(country => (
                                    <div key={country.id} className="flex items-start gap-3 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl">
                                        <div className="text-2xl">{country.flag}</div>
                                        <div className="flex-1">
                                            <div className="font-medium text-[#142738] mb-2">{country.name}</div>
                                            <div className="space-y-1">
                                                {country.highlights.map((highlight, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-sm text-[#64656f]">
                                                        <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                                                        {highlight}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Quick Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200">
                        <TrendingUp className="w-8 h-8 text-green-600 mb-3" />
                        <div className="text-2xl font-bold text-green-700 mb-1">
                            {Math.max(...selectedCountriesData.map(c => c.averageSalary)).toLocaleString()}€
                        </div>
                        <div className="text-sm text-green-800">بالاترین حقوق</div>
                        <div className="text-xs text-green-600 mt-1">
                            {selectedCountriesData.find(c => c.averageSalary === Math.max(...selectedCountriesData.map(c => c.averageSalary)))?.flag}{' '}
                            {selectedCountriesData.find(c => c.averageSalary === Math.max(...selectedCountriesData.map(c => c.averageSalary)))?.name}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-6 border-2 border-blue-200">
                        <DollarSign className="w-8 h-8 text-blue-600 mb-3" />
                        <div className="text-2xl font-bold text-blue-700 mb-1">
                            {Math.min(...selectedCountriesData.map(c => c.monthlyCost)).toLocaleString()}€
                        </div>
                        <div className="text-sm text-blue-800">کمترین هزینه</div>
                        <div className="text-xs text-blue-600 mt-1">
                            {selectedCountriesData.find(c => c.monthlyCost === Math.min(...selectedCountriesData.map(c => c.monthlyCost)))?.flag}{' '}
                            {selectedCountriesData.find(c => c.monthlyCost === Math.min(...selectedCountriesData.map(c => c.monthlyCost)))?.name}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200">
                        <Clock className="w-8 h-8 text-purple-600 mb-3" />
                        <div className="text-2xl font-bold text-purple-700 mb-1">
                            {Math.min(...selectedCountriesData.map(c => c.visaSpeed))} ماه
                        </div>
                        <div className="text-sm text-purple-800">سریع‌ترین ویزا</div>
                        <div className="text-xs text-purple-600 mt-1">
                            {selectedCountriesData.find(c => c.visaSpeed === Math.min(...selectedCountriesData.map(c => c.visaSpeed)))?.flag}{' '}
                            {selectedCountriesData.find(c => c.visaSpeed === Math.min(...selectedCountriesData.map(c => c.visaSpeed)))?.name}
                        </div>
                    </div>

                    <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-6 border-2 border-orange-200">
                        <Award className="w-8 h-8 text-orange-600 mb-3" />
                        <div className="text-2xl font-bold text-orange-700 mb-1">
                            {Math.max(...selectedCountriesData.map(c => c.qualityOfLife))}/100
                        </div>
                        <div className="text-sm text-orange-800">بهترین کیفیت</div>
                        <div className="text-xs text-orange-600 mt-1">
                            {selectedCountriesData.find(c => c.qualityOfLife === Math.max(...selectedCountriesData.map(c => c.qualityOfLife)))?.flag}{' '}
                            {selectedCountriesData.find(c => c.qualityOfLife === Math.max(...selectedCountriesData.map(c => c.qualityOfLife)))?.name}
                        </div>
                    </div>
                </div>

                {/* Info Box */}
                <div className="mt-8 bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-2xl p-6">
                    <div className="flex items-start gap-3">
                        <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-[#142738] font-medium mb-2">💡 نکته مهم</h4>
                            <p className="text-[#64656f] leading-relaxed">
                                این اطلاعات بر اساس میانگین‌های سال 2024 است و می‌تواند بسته به شهر، تخصص شغلی و شرایط شخصی متفاوت باشد.
                                برای اطلاعات دقیق‌تر حتماً با مشاور مهاجرت مشورت کنید.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}