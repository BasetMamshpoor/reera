"use client"
import React, {useState} from 'react';
// import { MobileNavAndSearch } from './MobileNavAndSearch';
import {CountryComparison} from './CountryComparison';
import {DocumentTimeline} from './DocumentTimeline';
import {
    CheckCircle2,
    AlertCircle,
    Clock,
    DollarSign,
    FileText,
    ArrowRight,
    TrendingUp,
    Award,
    ChevronRight,
    ChevronLeft,
    Globe,
    Briefcase,
    GraduationCap,
    Users,
    Languages,
    Target,
    Wallet,
    ExternalLink,
    ThumbsUp,
    ThumbsDown,
    MessageCircle
} from 'lucide-react';
import {calculateRealPathways} from '../../travelguide/utils/calculateRealPathways';
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export function LegalServicesPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [showResults, setShowResults] = useState(false);
    const totalSteps = 6;

    const {locale} = useParams();

    const [profile, setProfile] = useState({
        age: '',
        education: '',
        workExperience: '',
        workField: '',
        languageType: '',
        languageLevel: '',
        maritalStatus: '',
        familyMembers: '',
        budget: '',
        targetCountry: '',
        immigrationGoal: ''
    });

    const updateProfile = (field, value) => {
        setProfile({...profile, [field]: value});
    };

    const isStepValid = () => {
        switch (currentStep) {
            case 1:
                return profile.age !== '' && profile.education !== '';
            case 2:
                return profile.workExperience !== '' && profile.workField !== '';
            case 3:
                return profile.languageType !== '' && profile.languageLevel !== '';
            case 4:
                return profile.maritalStatus !== '' && profile.familyMembers !== '';
            case 5:
                return profile.budget !== '' && profile.targetCountry !== '';
            case 6:
                return profile.immigrationGoal !== '';
            default:
                return false;
        }
    };

    const nextStep = () => {
        if (isStepValid() && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === totalSteps && isStepValid()) {
            setShowResults(true);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'آسان':
                return 'text-green-600 bg-green-50';
            case 'متوسط':
                return 'text-yellow-600 bg-yellow-50';
            case 'سخت':
                return 'text-red-600 bg-red-50';
            default:
                return 'text-Gray-600 bg-Gray-50';
        }
    };

    const getStepIcon = (step) => {
        switch (step) {
            case 1:
                return <GraduationCap className="w-6 h-6"/>;
            case 2:
                return <Briefcase className="w-6 h-6"/>;
            case 3:
                return <Languages className="w-6 h-6"/>;
            case 4:
                return <Users className="w-6 h-6"/>;
            case 5:
                return <Wallet className="w-6 h-6"/>;
            case 6:
                return <Target className="w-6 h-6"/>;
            default:
                return null;
        }
    };

    const getStepTitle = (step) => {
        switch (step) {
            case 1:
                return 'اطلاعات تحصیلی';
            case 2:
                return 'تجربه شغلی';
            case 3:
                return 'مهارت‌های زبانی';
            case 4:
                return 'وضعیت خانوادگی';
            case 5:
                return 'بودجه و مقصد';
            case 6:
                return 'هدف مهاجرت';
            default:
                return '';
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                                <GraduationCap className="w-8 h-8 text-Primary-600"/>
                            </div>
                            <h3 className="text-2xl text-Primary-950 mb-2">اطلاعات تحصیلی شما</h3>
                            <p className="text-Gray-700">سن و سطح تحصیلات خود را مشخص کنید</p>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">سن شما</label>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {['18', '26', '31', '36', '41', '46'].map((age) => (
                                    <button
                                        key={age}
                                        onClick={() => updateProfile('age', age)}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            profile.age === age
                                                ? 'border-blue-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {age === '18' && '18-25 سال'}
                                        {age === '26' && '26-30 سال'}
                                        {age === '31' && '31-35 سال'}
                                        {age === '36' && '36-40 سال'}
                                        {age === '41' && '41-45 سال'}
                                        {age === '46' && 'بالای 45 سال'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">آخرین مدرک تحصیلی</label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {['دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی‌ارشد', 'دکتری'].map((edu) => (
                                    <button
                                        key={edu}
                                        onClick={() => updateProfile('education', edu)}
                                        className={`p-4 rounded-xl border-2 transition-all cursor-pointer ${
                                            profile.education === edu
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {edu}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                                <Briefcase className="w-8 h-8 text-purple-600"/>
                            </div>
                            <h3 className="text-2xl text-Primary-950 mb-2">تجربه کاری شما</h3>
                            <p className="text-Gray-700">سابقه کار و حوزه شغلی خود را مشخص کنید</p>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">سابقه کار (سال)</label>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {['0', '1', '3', '6', '11'].map((exp) => (
                                    <button
                                        key={exp}
                                        onClick={() => updateProfile('workExperience', exp)}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            profile.workExperience === exp
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {exp === '0' && 'بدون سابقه'}
                                        {exp === '1' && '1-2 سال'}
                                        {exp === '3' && '3-5 سال'}
                                        {exp === '6' && '5-10 سال'}
                                        {exp === '11' && 'بیش از 10 سال'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">حوزه شغلی</label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {[
                                    'فناوری اطلاعات (IT)',
                                    'مهندسی',
                                    'پزشکی و درمان',
                                    'آموزش',
                                    'مالی و حسابداری',
                                    'مدیریت و بازاریابی',
                                    'هنر و طراحی',
                                    'سایر'
                                ].map((field) => (
                                    <button
                                        key={field}
                                        onClick={() => updateProfile('workField', field)}
                                        className={`p-4 rounded-xl border-2 transition-all text-right ${
                                            profile.workField === field
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {field}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 3:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                                <Languages className="w-8 h-8 text-green-600"/>
                            </div>
                            <h3 className="text-2xl text-Primary-950 mb-2">مهارت‌های زبانی</h3>
                            <p className="text-Gray-700">سطح زبان خارجی خود را مشخص کنید</p>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">نوع آزمون زبان</label>
                            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
                                {[
                                    'IELTS',
                                    'TOEFL',
                                    'Duolingo',
                                    'TestDaF (آلمانی)',
                                    'DELF/DALF (فرانسه)',
                                    'هنوز نداده‌ام'
                                ].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => updateProfile('languageType', lang)}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            profile.languageType === lang
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">سطح زبان</label>
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                                {['مبتدی', 'متوسط', 'پیشرفته'].map((level) => (
                                    <button
                                        key={level}
                                        onClick={() => updateProfile('languageLevel', level)}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            profile.languageLevel === level
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className="font-medium mb-1">{level}</div>
                                        <div className="text-sm">
                                            {level === 'مبتدی' && 'A1-A2 / IELTS 4-5'}
                                            {level === 'متوسط' && 'B1-B2 / IELTS 5.5-6.5'}
                                            {level === 'پیشرفته' && 'C1-C2 / IELTS 7+'}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 4:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                                <Users className="w-8 h-8 text-pink-600"/>
                            </div>
                            <h3 className="text-2xl text-Primary-950 mb-2">وضعیت خانوادگی</h3>
                            <p className="text-Gray-700">اطلاعات خانواده خود را وارد کنید</p>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">وضعیت تأهل</label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {['مجرد', 'متأهل', 'متأهل با فرزند'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => updateProfile('maritalStatus', status)}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            profile.maritalStatus === status
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {status}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">تعداد کل افراد (شامل شما)</label>
                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                                {['1', '2', '3', '4', '5'].map((num) => (
                                    <button
                                        key={num}
                                        onClick={() => updateProfile('familyMembers', num)}
                                        className={`p-4 rounded-xl border-2 transition-all ${
                                            profile.familyMembers === num
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {num} {num === '1' ? 'نفر' : 'نفر'}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 5:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                                <Wallet className="w-8 h-8 text-yellow-600"/>
                            </div>
                            <h3 className="text-2xl text-Primary-950 mb-2">بودجه و کشور مقصد</h3>
                            <p className="text-Gray-700">بودجه و کشور مورد علاقه خود را انتخاب کنید</p>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">بودجه تقریبی (دلار/یورو)</label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {[
                                    {value: 'کم', label: 'کمتر از 10,000'},
                                    {value: 'متوسط', label: '10,000 - 30,000'},
                                    {value: 'بالا', label: '30,000 - 100,000'},
                                    {value: 'خیلی‌بالا', label: 'بیش از 100,000'}
                                ].map((budget) => (
                                    <button
                                        key={budget.value}
                                        onClick={() => updateProfile('budget', budget.value)}
                                        className={`p-4 rounded-xl border-2 transition-all text-right ${
                                            profile.budget === budget.value
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <div className="font-medium">{budget.label}</div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">کشور مورد علاقه</label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {[
                                    'کانادا',
                                    'استرالیا',
                                    'آلمان',
                                    'انگلستان',
                                    'امریکا',
                                    'اتریش',
                                    'هلند',
                                    'نمی‌دانم / باز هستم'
                                ].map((country) => (
                                    <button
                                        key={country}
                                        onClick={() => updateProfile('targetCountry', country)}
                                        className={`p-4 rounded-xl border-2 transition-all text-right ${
                                            profile.targetCountry === country
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        {country}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            case 6:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <div
                                className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                                <Target className="w-8 h-8 text-red-600"/>
                            </div>
                            <h3 className="text-2xl text-Primary-950 mb-2">هدف از مهاجرت</h3>
                            <p className="text-Gray-700">هدف اصلی شما از مهاجرت چیست؟</p>
                        </div>

                        <div>
                            <label className="block text-Primary-950 mb-3 font-medium">انتخاب هدف</label>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                {[
                                    {value: 'تحصیل', emoji: '🎓'},
                                    {value: 'کار', emoji: '💼'},
                                    {value: 'سرمایه‌گذاری', emoji: '💰'},
                                    {value: 'زندگی بهتر', emoji: '🌟'},
                                    {value: 'ازدواج', emoji: '💑'},
                                    {value: 'پناهندگی', emoji: '🆘'}
                                ].map((goal) => (
                                    <button
                                        key={goal.value}
                                        onClick={() => updateProfile('immigrationGoal', goal.value)}
                                        className={`p-5 rounded-xl border-2 transition-all text-right ${
                                            profile.immigrationGoal === goal.value
                                                ? 'border-Primary-600 bg-Primary-50 text-Primary-600'
                                                : 'border-Gray-200 hover:border-blue-300'
                                        }`}
                                    >
                                        <span className="text-2xl ml-3">{goal.emoji}</span>
                                        <span className="font-medium">{goal.value}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (showResults) {
        const pathways = calculateRealPathways(profile);

        return (
            <div className="h-full bg-surface">
                {/*<div className="block lg:hidden">*/}
                {/*    <MobileNavAndSearch currentPage="legal" />*/}
                {/*</div>*/}

                {/* Results Header */}
                <div className="bg-gradient-to-b from-Primary-600 to-Primary-300 text-white py-12 lg:py-16">
                    <div className="max-w-7xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-4">
                            <CheckCircle2 className="w-5 h-5"/>
                            <span>تحلیل کامل شد</span>
                        </div>
                        <h1 className="text-3xl lg:text-4xl mb-3">مسیرهای پیشنهادی شما</h1>
                        <p className="text-lg text-blue-100 max-w-2xl mx-auto">
                            بر اساس اطلاعات شما، {pathways.length} مسیر مناسب پیدا کردیم
                        </p>
                    </div>
                </div>

                <div className="bg-Surface-2 w-full mx-auto px-4 py-8 lg:py-12">
                    {/* Summary */}
                    <div className="bg-surface rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
                        <div
                            className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
                            <h2 className="text-2xl text-Primary-950">خلاصه پروفایل شما</h2>
                            <Button
                                type="button"
                                onClick={() => {
                                    setShowResults(false);
                                    setCurrentStep(1);
                                }}
                                className="px-6 py-3 bg-Primary-100 border-1 border-Primary-400 text-Primary-600 rounded-xl transition-all"
                            >
                                ویرایش اطلاعات
                            </Button>
                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                                <div className="text-gray-700 text-sm mb-1">سن</div>
                                <div className="text-blue-950 font-medium">
                                    {profile.age === '18' && '18-25 سال'}
                                    {profile.age === '26' && '26-30 سال'}
                                    {profile.age === '31' && '31-35 سال'}
                                    {profile.age === '36' && '36-40 سال'}
                                    {profile.age === '41' && '41-45 سال'}
                                    {profile.age === '46' && 'بالای 45'}
                                </div>
                            </div>
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                                <div className="text-gray-700 text-sm mb-1">تحصیلات</div>
                                <div className="text-blue-950 font-medium">{profile.education}</div>
                            </div>
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                                <div className="text-gray-700 text-sm mb-1">زبان</div>
                                <div className="text-blue-950 font-medium">{profile.languageLevel}</div>
                            </div>
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
                                <div className="text-gray-700 text-sm mb-1">هدف</div>
                                <div className="text-blue-950 font-medium">{profile.immigrationGoal}</div>
                            </div>
                        </div>
                    </div>

                    {/* Pathways */}
                    {pathways.map((pathway) => (
                        <div
                            key={pathway.id}
                            className={`bg-surface rounded-2xl shadow-lg p-6 lg:p-8 transition-all hover:shadow-xl ${
                                pathway.recommended ? 'ring-2 ring-blue-500' : ''
                            }`}
                        >
                            {pathway.recommended && (
                                <div
                                    className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-2 rounded-full text-sm mb-4">
                                    <Award className="w-4 h-4"/>
                                    پیشنهاد ویژه - {pathway.matchScore}% تطابق
                                </div>
                            )}

                            <div className="flex flex-col lg:flex-row justify-between items-start gap-4 mb-6">
                                <div className="flex-1">
                                    <h3 className="text-xl lg:text-2xl text-Primary-950 mb-3">{pathway.title}</h3>
                                    <div className="flex flex-wrap items-center gap-2">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(pathway.difficulty)}`}>
                                              {pathway.difficulty}
                                            </span>
                                        <span className="px-3 py-1 rounded-full text-sm bg-Primary-50 text-Primary-600">
                                               تطابق: {pathway.matchScore}%
                                            </span>
                                    </div>
                                </div>

                                <div
                                    className="flex items-center gap-2 bg-gradient-to-br from-green-50 to-green-100 px-6 py-4 rounded-xl">
                                    <TrendingUp className="w-6 h-6 text-green-600"/>
                                    <div>
                                        <div className="text-3xl font-bold text-green-600">{pathway.successRate}%</div>
                                        <div className="text-xs text-green-700">شانس موفقیت</div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
                                <div className="flex items-start gap-3 bg-Gray-50 rounded-xl p-4">
                                    <DollarSign className="w-5 h-5 text-Primary-600 mt-0.5"/>
                                    <div>
                                        <div className="text-Gray-700 text-sm mb-1">هزینه تقریبی</div>
                                        <div className="text-Primary-950 font-medium">{pathway.cost}</div>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3 bg-Gray-50 rounded-xl p-4">
                                    <Clock className="w-5 h-5 text-Primary-600 mt-0.5"/>
                                    <div>
                                        <div className="text-Gray-700 text-sm mb-1">مدت زمان</div>
                                        <div className="text-Primary-950 font-medium">{pathway.duration}</div>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-Primary-950 font-medium mb-3">
                                    <FileText className="w-5 h-5"/>
                                    مدارک و شرایط لازم
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                    {pathway.requirements.map((req, idx) => (
                                        <div key={idx} className="flex items-start gap-2">
                                            <CheckCircle2 className="w-4 h-4 text-green-600 mt-1 flex-shrink-0"/>
                                            <span className="text-Gray-700 text-sm">{req}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-Primary-950 font-medium mb-3">
                                    <Clock className="w-5 h-5"/>
                                    زمان‌بندی دقیق
                                </div>
                                <div className="relative">
                                    {pathway.timeline.map((item, idx) => (
                                        <div key={idx} className="flex gap-4 mb-4 last:mb-0">
                                            <div className="flex flex-col items-center">
                                                <div
                                                    className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0">
                                                    {idx + 1}
                                                </div>
                                                {idx < pathway.timeline.length - 1 && (
                                                    <div className="w-0.5 h-full bg-blue-200 my-1 flex-1 min-h-[30px]"/>
                                                )}
                                            </div>
                                            <div className="flex-1 pb-4">
                                                <div className="text-Primary-950 font-medium mb-1">{item.step}</div>
                                                <div
                                                    className="text-sm text-Gray-700 bg-Gray-50 px-3 py-1 rounded-full inline-block">
                                                    ⏱️ {item.duration}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Complete Documents List */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-Primary-950 font-medium mb-3">
                                    <FileText className="w-5 h-5"/>
                                    لیست کامل مدارک مورد نیاز
                                </div>
                                <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl p-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                                        {pathway.documents.map((doc, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <div
                                                    className="w-5 h-5 bg-orange-500 text-white rounded flex items-center justify-center flex-shrink-0 text-xs font-medium mt-0.5">
                                                    {idx + 1}
                                                </div>
                                                <span className="text-Primary-950 text-sm">{doc}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Pros and Cons */}
                            <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5">
                                    <div className="flex items-center gap-2 text-green-700 font-medium mb-3">
                                        <ThumbsUp className="w-5 h-5"/>
                                        مزایا
                                    </div>
                                    <ul className="space-y-2">
                                        {pathway.pros.map((pro, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-green-800">
                                                <span className="text-green-600 font-bold">✓</span>
                                                <span>{pro}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-xl p-5">
                                    <div className="flex items-center gap-2 text-red-700 font-medium mb-3">
                                        <ThumbsDown className="w-5 h-5"/>
                                        معایب و چالش‌ها
                                    </div>
                                    <ul className="space-y-2">
                                        {pathway.cons.map((con, idx) => (
                                            <li key={idx} className="flex items-start gap-2 text-sm text-red-800">
                                                <span className="text-red-600 font-bold">✗</span>
                                                <span>{con}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {/* Official Links */}
                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-Primary-950 font-medium mb-3">
                                    <ExternalLink className="w-5 h-5"/>
                                    لینک‌های رسمی و مفید
                                </div>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                                    {pathway.officialLinks.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-between gap-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 border border-blue-200 rounded-xl p-4 transition-all group"
                                        >
                                            <span className="text-Primary-950 font-medium text-sm">{link.title}</span>
                                            <ExternalLink
                                                className="w-4 h-4 text-Primary-600 group-hover:translate-x-[-4px] transition-transform"/>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="flex items-center gap-2 text-Primary-950 font-medium mb-3">
                                    <ArrowRight className="w-5 h-5"/>
                                    قدم‌های بعدی شما
                                </div>
                                <div className="space-y-3">
                                    {pathway.nextSteps.map((step, idx) => (
                                        <div key={idx} className="flex items-start gap-3 bg-Primary-50 rounded-xl p-4">
                                            <div
                                                className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                                                {idx + 1}
                                            </div>
                                            <span className="text-Primary-950 flex-1">{step}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="pt-6 border-t border-Gray-200">
                                <button
                                    className="w-full lg:w-auto px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-lg transition-all transform hover:-translate-y-0.5">
                                    مشاوره رایگان برای این مسیر
                                </button>
                            </div>
                        </div>
                    ))}

                    {/* Country Comparison Section */}
                    <CountryComparison/>

                    {/* Document Timeline Section */}
                    {pathways.length > 0 && (
                        <DocumentTimeline
                            country={pathways[0].country}
                            pathway={pathways[0].title}
                        />
                    )}

                    {/* Notice */}
                    <div className="bg-yellow-50 border-r-4 border-yellow-400 rounded-xl p-6 mt-6">
                        <div className="flex items-start gap-3">
                            <AlertCircle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"/>
                            <div>
                                <h4 className="text-blue-950 font-medium mb-2">نکته مهم</h4>
                                <p className="text-gray-700 text-sm leading-relaxed">
                                    این نتایج بر اساس الگوریتم هوشمند و اطلاعات عمومی تهیه شده و نمی‌تواند جایگزین
                                    مشاوره تخصصی حقوقی باشد.
                                    برای اطمینان کامل، حتماً با وکیل مهاجرت مشورت کنید.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12 mt-8">
                    <div className="max-w-4xl mx-auto px-4 text-center">
                        <h3 className="text-2xl lg:text-3xl mb-4">آماده شروع مسیر مهاجرت هستید؟</h3>
                        <p className="text-blue-100 mb-6 text-lg">
                            با تیم متخصص ما مشورت کنید و اولین قدم را با اطمینان بردارید
                        </p>
                        <button
                            className="bg-white text-Primary-600 px-8 py-4 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 font-medium">
                            رزرو جلسه مشاوره رایگان (30 دقیقه)
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full bg-Surface-2">
            {/*<div className="block lg:hidden">*/}
            {/*    <MobileNavAndSearch currentPage="legal" />*/}
            {/*</div>*/}

            {/* Hero */}
            <div className="bg-gradient-to-b from-Primary-600 to-Primary-50 text-white py-12 lg:py-16">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <Globe className="w-16 h-16 mx-auto mb-4 opacity-90"/>
                    <h1 className="text-3xl lg:text-5xl mb-4">ویزارد هوشمند مهاجرت</h1>
                    <p className="text-lg lg:text-xl text-blue-100 max-w-2xl mx-auto mb-6">
                        در 6 قدم ساده، مسیر مهاجرت خود را کشف کنید
                    </p>

                    {/* Chat Button */}
                    <Link href={`/${locale}/migration-chatbot`}
                          className="inline-flex items-center gap-2 bg-white text-Primary-600 px-6 py-3 rounded-xl hover:shadow-xl transition-all transform hover:-translate-y-1 font-medium"
                    >
                        <MessageCircle className="w-5 h-5"/>
                        <p className="pt-1">یا با مهاجریار چت کنید (مثل ChatGPT)</p>
                    </Link>
                </div>
            </div>

            {/* Progress Bar */}
            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="bg-surface rounded-2xl shadow-lg p-6 lg:p-8 mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-Primary-950 font-medium">قدم {currentStep} از {totalSteps}</span>
                        <span className="text-Gray-700 text-sm">{Math.round((currentStep / totalSteps) * 100)}% تکمیل شده</span>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center justify-between mb-8">
                        {[1, 2, 3, 4, 5, 6].map((step) => (
                            <div key={step} className="flex flex-col items-center flex-1">
                                <div
                                    className={`w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all mb-2 ${
                                        step < currentStep
                                            ? 'bg-green-500 text-white'
                                            : step === currentStep
                                                ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                                                : 'bg-Gray-200 text-Gray-400'
                                    }`}
                                >
                                    {step < currentStep ? (
                                        <CheckCircle2 className="w-5 h-5 lg:w-6 lg:h-6"/>
                                    ) : (
                                        getStepIcon(step)
                                    )}
                                </div>
                                <div className="hidden lg:block text-xs text-center text-Gray-700">
                                    {getStepTitle(step)}
                                </div>
                                {/*{step < totalSteps && (*/}
                                {/*    <div*/}
                                {/*        className={`absolute h-1 w-[calc(100%/6)] mt-5 transition-all ${*/}
                                {/*            step < currentStep ? 'bg-green-500' : 'bg-Gray-200'*/}
                                {/*        }`}*/}
                                {/*        style={{ right: `${(6 - step) * (100 / 6)}%` }}*/}
                                {/*    />*/}
                                {/*)}*/}
                            </div>
                        ))}
                    </div>

                    <div className="relative">
                        <div className="absolute top-0 right-0 left-0 h-2 bg-Gray-200 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                                style={{width: `${(currentStep / totalSteps) * 100}%`}}
                            />
                        </div>
                    </div>
                </div>

                {/* Form Card */}
                <div className="bg-surface rounded-2xl shadow-xl p-6 lg:p-10">
                    {renderStep()}

                    {/* Navigation Buttons */}
                    <div className="flex gap-4 mt-8 pt-6 border-t border-Gray-200">
                        {currentStep > 1 && (
                            <button
                                onClick={prevStep}
                                className="flex items-center gap-2 px-6 py-3 border-2 border-Gray-300 text-Gray-700 rounded-xl hover:bg-Gray-50 transition-all"
                            >
                                <ChevronRight className="w-5 h-5"/>
                                قبلی
                            </button>
                        )}

                        <button
                            onClick={nextStep}
                            disabled={!isStepValid()}
                            className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-xl text-white text-lg font-medium transition-all ${
                                isStepValid()
                                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg transform hover:-translate-y-0.5'
                                    : 'bg-Gray-300 cursor-not-allowed'
                            }`}
                        >
                            {currentStep === totalSteps ? 'مشاهده نتایج' : 'بعدی'}
                            {currentStep < totalSteps && <ChevronLeft className="w-5 h-5"/>}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}