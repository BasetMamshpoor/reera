"use client"
import { useState } from 'react';
import  Link  from 'next/link';
import {
    MapPin, Calendar, Users, Search, Languages, Plane, GraduationCap, Briefcase,
    Home, Sparkles, Flag, Cross, Heart, Scale, Globe2, FileText, AlertCircle, Info,
    Utensils, TrendingUp, ShoppingCart, Phone, Hotel, Leaf, Church, MessageSquare,
    UserCheck, DollarSign, Coins, Banknote
} from 'lucide-react';
// import { Country, City } from 'country-state-city';
import { DesktopNavbar } from './DesktopNavbar';
// import { SearchBarContainer } from './SearchBar';
import { getCityName } from '../utils/cityTranslations';
import { getCountryNameByCode } from '../utils/countryTranslations';
import { TravelGuideResults } from './TravelGuideResults';
// import {Select} from '@/components/ui/select';

export function TravelGuidePage() {
    // Nationality & Destination
    const [selectedNationality, setSelectedNationality] = useState(null);
    const [selectedDestCountry, setSelectedDestCountry] = useState(null);
    const [selectedDestCity, setSelectedDestCity] = useState(null);

    // Other fields
    const [travelPurpose, setTravelPurpose] = useState('');
    const [arrivalDate, setArrivalDate] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [showResults, setShowResults] = useState(false);
    const [listLanguage, setListLanguage] = useState('fa');

    // Additional optional fields
    const [dietaryRestrictions, setDietaryRestrictions] = useState([]);
    const [religiousNeeds, setReligiousNeeds] = useState([]);
    const [destinationLanguageLevel, setDestinationLanguageLevel] = useState('');
    const [travelingWith, setTravelingWith] = useState('');
    const [accommodationBudget, setAccommodationBudget] = useState('');

    // Get all countries with automatic translation
    // const allCountries = Country.getAllCountries().map(country => ({
    //     value: country.isoCode,
    //     label: getCountryNameByCode(country.isoCode, listLanguage),
    //     isoCode: country.isoCode
    // })).sort((a, b) => a.label.localeCompare(b.label, listLanguage));

    // Get cities for selected destination country
    // const citiesOptions = selectedDestCountry
    //     ? City.getCitiesOfCountry(selectedDestCountry.isoCode)?.map(city => ({
    //     value: city.name,
    //     label: getCityName(city.name, listLanguage)
    // })).sort((a, b) => a.label.localeCompare(b.label, listLanguage === 'fa' ? 'fa' : listLanguage === 'ar' ? 'ar' : listLanguage === 'tr' ? 'tr' : 'en')) || []
    //     : [];

    const purposes = [
        { value: 'tourist', label: 'توریستی', icon: Plane },
        { value: 'study', label: 'تحصیلی', icon: GraduationCap },
        { value: 'work', label: 'کاری', icon: Briefcase },
        { value: 'residence', label: 'مقیم', icon: Home },
    ];

    const languages = [
        { value: 'persian', label: 'فارسی' },
        { value: 'english', label: 'انگلیسی' },
        { value: 'arabic', label: 'عربی' },
        { value: 'turkish', label: 'ترکی' },
        { value: 'hindi', label: 'هندی' },
        { value: 'urdu', label: 'اردو' },
        { value: 'chinese', label: 'چینی' },
        { value: 'spanish', label: 'اسپانیایی' },
        { value: 'french', label: 'فرانسوی' },
        { value: 'german', label: 'آلمانی' },
    ];

    const dietaryOptions = [
        { value: 'halal', label: 'حلال', icon: Utensils },
        { value: 'vegan', label: 'وگان', icon: Leaf },
        { value: 'vegetarian', label: 'گیاه‌خوار', icon: Leaf },
        { value: 'kosher', label: 'کوشر', icon: Utensils },
        { value: 'no-pork', label: 'بدون گوشت خوک', icon: Utensils },
        { value: 'no-alcohol', label: 'بدون الکل', icon: Utensils },
        { value: 'spicy', label: 'غذای ادویه‌دار', icon: Utensils },
        { value: 'gluten-free', label: 'بدون گلوتن', icon: Utensils },
    ];

    const religiousOptions = [
        { value: 'prayer-space', label: 'فضای نماز/عبادت', icon: Church },
        { value: 'religious-community', label: 'جامعه مذهبی', icon: Users },
        { value: 'religious-events', label: 'رویدادهای مذهبی', icon: Calendar },
        { value: 'religious-guidance', label: 'راهنمای دینی', icon: FileText },
    ];

    const languageLevels = [
        { value: 'native', label: 'زبان مادری', description: 'تسلط کامل' },
        { value: 'fluent', label: 'روان', description: 'صحبت بدون مشکل' },
        { value: 'intermediate', label: 'متوسط', description: 'مکالمه روزمره' },
        { value: 'basic', label: 'ابتدایی', description: 'جملات ساده' },
        { value: 'none', label: 'هیچ', description: 'نیاز به مترجم' },
    ];

    const travelingWithOptions = [
        { value: 'alone', label: 'تنها', icon: Users },
        { value: 'partner', label: 'با همسر/همراه', icon: Users },
        { value: 'small-family', label: 'خانواده کوچک (۲-۳ نفر)', icon: Users },
        { value: 'large-family', label: 'خانواده بزرگ (۴+ نفر)', icon: Users },
        { value: 'with-children', label: 'با کودکان', icon: Users },
        { value: 'with-elderly', label: 'با سالمندان', icon: Users },
    ];

    const budgetOptions = [
        { value: 'budget', label: 'اقتصادی', range: 'تا €50/شب', icon: Coins },
        { value: 'moderate', label: 'متوسط', range: '€50-€100/شب', icon: DollarSign },
        { value: 'comfortable', label: 'راحت', range: '€100-€200/شب', icon: DollarSign },
        { value: 'luxury', label: 'لوکس', range: '€200+/شب', icon: Banknote },
        { value: 'flexible', label: 'انعطاف‌پذیر', range: 'بدون محدودیت', icon: DollarSign },
    ];

    const toggleLanguage = (lang) => {
        setSelectedLanguages(prev =>
            prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
        );
    };

    const toggleDietaryRestriction = (restriction) => {
        setDietaryRestrictions(prev =>
            prev.includes(restriction) ? prev.filter(r => r !== restriction) : [...prev, restriction]
        );
    };

    const toggleReligiousNeed = (need) => {
        setReligiousNeeds(prev =>
            prev.includes(need) ? prev.filter(n => n !== need) : [...prev, need]
        );
    };

    // Sample data - این داده‌ها باید از بک‌اند بیایند
    const getNationalityBasedData = () => {
        const nationalityName = selectedNationality ? getCountryNameByCode(selectedNationality.isoCode, 'fa') : '';
        const destName = selectedDestCity?.label || selectedDestCountry?.label || '';

        return {
            restaurants: [
                {
                    id: 1,
                    name: `رستوران ${nationalityName} تاج`,
                    description: `غذاهای اصیل ${nationalityName} با پرسنل ${nationalityName}‌زبان`,
                    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800',
                    rating: 4.8,
                    tags: [`${nationalityName}‌زبان`, 'غذای حلال', `منوی ${nationalityName}`],
                    verified: true,
                    phone: '+49 30 1234567',
                    address: `${destName}, خیابان اصلی ۱۲۳`,
                    hours: '۱۰:۰۰ - ۲۳:۰۰',
                },
                {
                    id: 2,
                    name: `رستوران ${nationalityName} رویال`,
                    description: `سرویس کیترینگ و غذای خانگی ${nationalityName}`,
                    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=800',
                    rating: 4.7,
                    tags: ['غذای وگان', `منوی ${nationalityName}`, 'سرویس بیرون‌بر'],
                    verified: true,
                    phone: '+49 30 7654321',
                    address: `${destName}, میدان مرکزی ۴۵`,
                    hours: '۱۱:۰۰ - ۲۲:۰۰',
                },
                {
                    id: 3,
                    name: `کافه ${nationalityName}`,
                    description: `نوشیدنی‌ها و غذاهای سنتی ${nationalityName}`,
                    image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800',
                    rating: 4.6,
                    tags: ['کافه', 'شیرینی سنتی', 'Wi-Fi رایگان'],
                    verified: true,
                    phone: '+49 30 9876543',
                    address: `${destName}, پارک شهر`,
                    hours: '۸:۰۰ - ۲۰:۰۰',
                },
            ],
            supermarkets: [
                {
                    id: 1,
                    name: `سوپرمارکت ${nationalityName}`,
                    description: `مواد غذایی و محصولات ${nationalityName}`,
                    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?w=800',
                    tags: [`مواد ${nationalityName}`, 'حلال', 'ارسال رایگان'],
                    verified: true,
                    phone: '+49 30 1112223',
                    address: `${destName}, خیابان تجاری ۷۸`,
                },
                {
                    id: 2,
                    name: `فروشگاه ${nationalityName} آسیا`,
                    description: `ادویه‌جات، برنج و محصولات خاص ${nationalityName}`,
                    image: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=800',
                    tags: ['ادویه', 'برنج باسماتی', 'محصولات ارگانیک'],
                    verified: true,
                    phone: '+49 30 4445556',
                    address: `${destName}, بازار شرقی`,
                },
            ],
            hotels: [
                {
                    id: 1,
                    name: 'هتل اینترکانتیننتال',
                    description: `پرسنل ${nationalityName}‌زبان، آشپزخانه مشترک، امکانات مذهبی`,
                    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
                    rating: 4.9,
                    tags: [`پرسنل ${nationalityName}‌زبان`, 'آشپزخانه مشترک', 'امکانات مذهبی'],
                    verified: true,
                    price: '€120/شب',
                    facilities: ['Wi-Fi رایگان', 'صبحانه حلال', 'نماز خانه', 'پارکینگ'],
                },
                {
                    id: 2,
                    name: 'هتل آپارتمان میراژ',
                    description: `مناسب خانواده‌های ${nationalityName} با آشپزخانه کامل`,
                    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
                    rating: 4.7,
                    tags: ['آپارتمان', 'آشپزخانه', 'مناسب خانواده'],
                    verified: true,
                    price: '€90/شب',
                    facilities: ['آشپزخانه کامل', 'ماشین لباسشویی', 'بالکن', 'نزدیک مترو'],
                },
            ],
            medicalCenters: [
                {
                    id: 1,
                    name: `کلینیک پزشکی ${nationalityName}`,
                    description: `پزشکان و پرسنل ${nationalityName}‌زبان`,
                    icon: <Cross className="size-6" />,
                    tags: [`پزشک ${nationalityName}‌زبان`, 'بیمه معتبر', 'اورژانس ۲۴ ساعته'],
                    verified: true,
                    phone: '+49 30 9998887',
                    specialties: ['پزشک عمومی', 'دندانپزشکی', 'کودکان'],
                },
                {
                    id: 2,
                    name: `داروخانه ${nationalityName}`,
                    description: `داروساز ${nationalityName}‌زبان و داروهای سنتی`,
                    icon: <Heart className="size-6" />,
                    tags: ['داروساز مجرب', 'داروی سنتی', 'مشاوره رایگان'],
                    verified: true,
                    phone: '+49 30 7776665',
                    specialties: ['داروهای سنتی', 'مکمل‌ها', 'بهداشتی'],
                },
            ],
            religiousCenters: [
                {
                    id: 1,
                    name: `مرکز مذهبی ${nationalityName}`,
                    description: `محل برگزاری مراسم و اجتماعات ${nationalityName}`,
                    image: 'https://images.unsplash.com/photo-1564769610726-4b8c7c3d0f5f?w=800',
                    tags: ['مراسم هفتگی', 'کلاس‌های زبان', 'رویدادهای فرهنگی'],
                    verified: true,
                    address: `${destName}, خیابان فرهنگی ۵۶`,
                    schedule: 'هر جمعه ۱۸:۰۰',
                },
            ],
            legalServices: [
                {
                    id: 1,
                    icon: <Scale className="size-6" />,
                    name: 'مشاور مهاجرت',
                    description: `وکیل و مشاور ${nationalityName}‌زبان متخصص ویزا و اقامت`,
                    tags: [`تجربه با ملیت ${nationalityName}`, 'مشاوره رایگان اولیه'],
                    verified: true,
                    phone: '+49 30 3332221',
                    services: ['ویزای کار', 'اقامت دائم', 'تابعیت', 'ویزای خانواده'],
                },
                {
                    id: 2,
                    icon: <Globe2 className="size-6" />,
                    name: 'دفتر ترجمه رسمی',
                    description: `ترجمه رسمی به ${nationalityName} و آلمانی`,
                    tags: ['مترجم رسمی', 'تحویل سریع'],
                    verified: true,
                    phone: '+49 30 6665554',
                    services: ['ترجمه اسناد', 'گواهی رسمی', 'ترجمه شفاهی', 'تأییدیه'],
                },
                {
                    id: 3,
                    icon: <FileText className="size-6" />,
                    name: 'مشاور مالیاتی',
                    description: `مشاور مالیاتی با تجربه خدمت به ${nationalityName}‌ها`,
                    tags: ['مالیات شخصی', 'مالیات کسب‌وکار'],
                    verified: true,
                    phone: '+49 30 8887776',
                    services: ['اظهارنامه مالیاتی', 'برنامه‌ریزی مالی', 'مشاوره سرمایه‌گذاری'],
                },
            ],
            attractions: [
                {
                    id: 1,
                    name: `پارک ${nationalityName}`,
                    description: `محل تجمع جامعه ${nationalityName} در تعطیلات`,
                    image: 'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800',
                    tags: ['پیک‌نیک', 'ورزش', 'رویدادهای فرهنگی'],
                    rating: 4.5,
                },
                {
                    id: 2,
                    name: `جشنواره ${nationalityName}`,
                    description: `برگزاری سالانه در تابستان`,
                    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800',
                    tags: ['موسیقی', 'غذا', 'فرهنگ'],
                    rating: 4.9,
                    nextEvent: 'تیر ۱۴۰۵',
                },
            ],
            culturalTips: [
                {
                    id: 1,
                    icon: <AlertCircle className="size-6 text-blue-500" />,
                    title: 'آداب و رسوم محلی',
                    description: `در ${destName}، احترام به وقت‌شناسی بسیار مهم است. همچنین سلام کردن با دست‌دهی معمول است.`,
                    category: 'فرهنگی',
                },
                {
                    id: 2,
                    icon: <Info className="size-6 text-green-500" />,
                    title: 'نکات امنیتی',
                    description: 'همیشه مدارک شناسایی همراه داشته باشید. شماره اورژانس: ۱۱۲',
                    category: 'امنیتی',
                },
                {
                    id: 3,
                    icon: <Utensils className="size-6 text-orange-500" />,
                    title: 'توصیه‌های غذایی',
                    description: `محصولات حلال در سوپرمارکت‌های ${nationalityName} و فروشگاه‌های ترکی موجود است.`,
                    category: 'غذایی',
                },
                {
                    id: 4,
                    icon: <TrendingUp className="size-6 text-purple-500" />,
                    title: 'هزینه زندگی',
                    description: 'متوسط هزینه ماهانه برای یک نفر: €1200-1500 (شامل اجاره، غذا، حمل‌ونقل)',
                    category: 'مالی',
                },
            ],
            checklist: [
                { task: 'خرید سیم‌کارت محلی', category: 'ضروری', priority: 'high' },
                { task: 'افتتاح حساب بانکی', category: 'ضروری', priority: 'high' },
                { task: 'ثبت‌نام در کنسولگری', category: 'اداری', priority: 'high' },
                { task: `یافتن سوپرمارکت ${nationalityName}`, category: 'خرید', priority: 'medium' },
                { task: `اتصال به جامعه ${nationalityName}`, category: 'اجتماعی', priority: 'medium' },
                { task: 'تهیه بیمه درمانی', category: 'ضروری', priority: 'high' },
                { task: 'آشنایی با مسیرهای حمل‌ونقل عمومی', category: 'حمل‌ونقل', priority: 'medium' },
                { task: 'یادگیری جملات ضروری زبان محلی', category: 'زبان', priority: 'low' },
            ],
            quickGuides: [
                {
                    id: 1,
                    icon: <ShoppingCart className="size-6" />,
                    title: `نحوهٔ پیدا کردن سوپرمارکت ${nationalityName}`,
                    steps: [
                        'از Google Maps عبارت "Asian Market" یا "Halal Shop" را جستجو کنید',
                        `در گروه‌های ${nationalityName} در فیسبوک بپرسید`,
                        'از هم‌وطنان آدرس بگیرید',
                    ],
                },
                {
                    id: 2,
                    icon: <Hotel className="size-6" />,
                    title: `رزرو هتل با درخواست غذای ${nationalityName}`,
                    steps: [
                        'هنگام رزرو، در بخش "درخواست‌های ویژه" نیاز خود را بنویسید',
                        'با هتل تماس بگیرید و از امکانات حلال بپرسید',
                        'از اپلیکیشن‌های Booking یا Airbnb استفاده کنید',
                    ],
                },
                {
                    id: 3,
                    icon: <Phone className="size-6" />,
                    title: `تماس با مشاور مهاجرت ${nationalityName}‌زبان`,
                    steps: [
                        'از لیست بالا شماره تماس را پیدا کنید',
                        'قبل از تماس، سوالات خود را یادداشت کنید',
                        'درخواست مشاوره رایگان اولیه کنید',
                    ],
                },
            ],
        };
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (selectedNationality && selectedDestCountry) {
            setShowResults(true);
            // Scroll to results
            setTimeout(() => {
                document.getElementById('results-section')?.scrollIntoView({ behavior: 'smooth' });
            }, 100);
        }
    };

    const data = showResults ? getNationalityBasedData() : null;

    return (
        <div className="min-h-screen bg-gray-50" dir="rtl">
            {/* Navbar */}
            {/*<DesktopNavbar currentPage="travel-guide" />*/}



            {/* Search Bar Section */}
            {/*<div className="bg-white border-b border-gray-100 sticky top-[120px] z-40">*/}
            {/*    <div className="max-w-[1280px] mx-auto px-8 py-4">*/}
            {/*        <SearchBarContainer />*/}
            {/*    </div>*/}
            {/*</div>*/}



            {/* Hero Section */}
            <section className="relative bg-gradient-to-b from-[#4299c1]/10 to-white py-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="inline-block mb-6">
                            <div className="flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-lg">
                                <Sparkles className="size-6 text-[#4299c1]" />
                                <span className="text-[#142738]">سیستم هوشمند پیشنهاد بر اساس ملیت</span>
                            </div>
                        </div>
                        <h1 className="text-5xl text-[#142738] mb-6">
                            سفریار — راهنمای هوشمند سفر
                        </h1>
                        <p className="text-xl text-[#64656f] mb-8 max-w-3xl mx-auto">
                            با انتخاب ملیت و مقصد، بسته کاملی از رستوران‌ها، هتل‌ها، سوپرمارکت‌ها، مراکز پزشکی، خدمات قانونی و نکات فرهنگی مخصوص شما ارائه می‌دهیم
                        </p>
                    </div>
                </div>
            </section>

            {/* Search Form Section */}
            <section className="py-16 bg-white">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <form onSubmit={handleSearch} className="space-y-8">
                        {/* Nationality Selection */}
                        <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl border-2 border-blue-200 p-8 hover:border-[#4299c1] transition-all shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-[#4299c1] rounded-xl flex items-center justify-center shadow-md">
                                        <Flag className="size-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl text-[#142738]">ملیت شما</h3>
                                        <p className="text-sm text-[#64656f] mt-1">کشور متولد یا اقامت فعلی</p>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button
                                        type="button"
                                        onClick={() => setListLanguage('fa')}
                                        className={`px-3 py-1.5 rounded-lg border transition-all text-sm ${
                                            listLanguage === 'fa'
                                                ? 'border-[#4299c1] bg-[#4299c1] text-white'
                                                : 'border-gray-300 bg-white text-[#64656f] hover:border-[#4299c1]'
                                        }`}
                                    >
                                        فارسی
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setListLanguage('en')}
                                        className={`px-3 py-1.5 rounded-lg border transition-all text-sm ${
                                            listLanguage === 'en'
                                                ? 'border-[#4299c1] bg-[#4299c1] text-white'
                                                : 'border-gray-300 bg-white text-[#64656f] hover:border-[#4299c1]'
                                        }`}
                                    >
                                        EN
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setListLanguage('ar')}
                                        className={`px-3 py-1.5 rounded-lg border transition-all text-sm ${
                                            listLanguage === 'ar'
                                                ? 'border-[#4299c1] bg-[#4299c1] text-white'
                                                : 'border-gray-300 bg-white text-[#64656f] hover:border-[#4299c1]'
                                        }`}
                                    >
                                        AR
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setListLanguage('tr')}
                                        className={`px-3 py-1.5 rounded-lg border transition-all text-sm ${
                                            listLanguage === 'tr'
                                                ? 'border-[#4299c1] bg-[#4299c1] text-white'
                                                : 'border-gray-300 bg-white text-[#64656f] hover:border-[#4299c1]'
                                        }`}
                                    >
                                        TR
                                    </button>
                                </div>
                            </div>
                            {/*<Select*/}
                            {/*    value={selectedNationality}*/}
                            {/*    onChange={(e) => setSelectedNationality(e)}*/}
                            {/*    // options={allCountries}*/}
                            {/*    placeholder="ملیت خود را انتخاب کنید (مثلاً هند، پاکستان، ایران)"*/}
                            {/*    isClearable*/}
                            {/*    isSearchable*/}
                            {/*    styles={{*/}
                            {/*        control: (base, state) => ({*/}
                            {/*            ...base,*/}
                            {/*            minHeight: '64px',*/}
                            {/*            borderRadius: '0.75rem',*/}
                            {/*            borderWidth: '2px',*/}
                            {/*            borderColor: state.isFocused ? '#4299c1' : '#e5e7eb',*/}
                            {/*            boxShadow: state.isFocused ? '0 0 0 3px rgba(66, 153, 193, 0.1)' : 'none',*/}
                            {/*            '&:hover': {*/}
                            {/*                borderColor: '#4299c1'*/}
                            {/*            }*/}
                            {/*        }),*/}
                            {/*        menu: (base) => ({*/}
                            {/*            ...base,*/}
                            {/*            borderRadius: '0.75rem',*/}
                            {/*            overflow: 'hidden',*/}
                            {/*            boxShadow: '0 10px 30px rgba(0,0,0,0.15)'*/}
                            {/*        }),*/}
                            {/*        option: (base, state) => ({*/}
                            {/*            ...base,*/}
                            {/*            backgroundColor: state.isFocused ? '#4299c1' : 'white',*/}
                            {/*            color: state.isFocused ? 'white' : '#142738',*/}
                            {/*            cursor: 'pointer'*/}
                            {/*        })*/}
                            {/*    }}*/}
                            {/*/>*/}
                        </div>

                        {/* Destination */}
                        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#4299c1] transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#4299c1]/10 rounded-xl flex items-center justify-center">
                                    <MapPin className="size-6 text-[#4299c1]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl text-[#142738]">مقصد سفر</h3>
                                    <p className="text-sm text-[#64656f] mt-1">کجا می‌خواهید بروید؟</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/*<Select*/}
                                {/*    value={selectedDestCountry}*/}
                                {/*    onChange={(e) => {*/}
                                {/*        setSelectedDestCountry(e);*/}
                                {/*        setSelectedDestCity(null);*/}
                                {/*    }}*/}
                                {/*    // options={allCountries}*/}
                                {/*    placeholder="کشور مقصد"*/}
                                {/*    isClearable*/}
                                {/*    isSearchable*/}
                                {/*    styles={{*/}
                                {/*        control: (base, state) => ({*/}
                                {/*            ...base,*/}
                                {/*            minHeight: '56px',*/}
                                {/*            borderRadius: '0.75rem',*/}
                                {/*            borderWidth: '2px',*/}
                                {/*            borderColor: state.isFocused ? '#4299c1' : '#e5e7eb',*/}
                                {/*            boxShadow: 'none',*/}
                                {/*            '&:hover': {*/}
                                {/*                borderColor: '#4299c1'*/}
                                {/*            }*/}
                                {/*        }),*/}
                                {/*        menu: (base) => ({*/}
                                {/*            ...base,*/}
                                {/*            borderRadius: '0.75rem',*/}
                                {/*            overflow: 'hidden'*/}
                                {/*        })*/}
                                {/*    }}*/}
                                {/*/>*/}

                                {/*<Select*/}
                                {/*    value={selectedDestCity}*/}
                                {/*    onChange={(e) => setSelectedDestCity(e)}*/}
                                {/*    // options={citiesOptions}*/}
                                {/*    placeholder="شهر مقصد (اختیاری)"*/}
                                {/*    isClearable*/}
                                {/*    isSearchable*/}
                                {/*    isDisabled={!selectedDestCountry}*/}
                                {/*    styles={{*/}
                                {/*        control: (base, state) => ({*/}
                                {/*            ...base,*/}
                                {/*            minHeight: '56px',*/}
                                {/*            borderRadius: '0.75rem',*/}
                                {/*            borderWidth: '2px',*/}
                                {/*            borderColor: state.isFocused ? '#4299c1' : '#e5e7eb',*/}
                                {/*            boxShadow: 'none',*/}
                                {/*            '&:hover': {*/}
                                {/*                borderColor: state.isDisabled ? '#e5e7eb' : '#4299c1'*/}
                                {/*            }*/}
                                {/*        }),*/}
                                {/*        menu: (base) => ({*/}
                                {/*            ...base,*/}
                                {/*            borderRadius: '0.75rem',*/}
                                {/*            overflow: 'hidden'*/}
                                {/*        })*/}
                                {/*    }}*/}
                                {/*/>*/}
                            </div>
                        </div>

                        {/* Purpose & Date */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#4299c1] transition-all">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-[#4299c1]/10 rounded-xl flex items-center justify-center">
                                        <Users className="size-6 text-[#4299c1]" />
                                    </div>
                                    <h3 className="text-2xl text-[#142738]">هدف سفر</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-3">
                                    {purposes.map((purpose) => {
                                        const Icon = purpose.icon;
                                        return (
                                            <button
                                                key={purpose.value}
                                                type="button"
                                                onClick={() => setTravelPurpose(purpose.value)}
                                                className={`px-5 py-4 rounded-xl border-2 transition-all flex items-center justify-center gap-2 ${
                                                    travelPurpose === purpose.value
                                                        ? 'border-[#4299c1] bg-[#4299c1]/10 text-[#142738]'
                                                        : 'border-gray-200 bg-white text-[#64656f] hover:border-[#4299c1]/50'
                                                }`}
                                            >
                                                <Icon className="size-5" />
                                                <span>{purpose.label}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#4299c1] transition-all">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-12 h-12 bg-[#4299c1]/10 rounded-xl flex items-center justify-center">
                                        <Calendar className="size-6 text-[#4299c1]" />
                                    </div>
                                    <h3 className="text-2xl text-[#142738]">زمان ورود</h3>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    {['این ماه', 'ماه بعد', '۲ ماه دیگر', '۳ ماه دیگر', '۴ ماه دیگر', '۵ ماه دیگر', '۶ ماه دیگر', 'بیشتر'].map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => setArrivalDate(time)}
                                            className={`px-5 py-4 rounded-xl border-2 transition-all ${
                                                arrivalDate === time
                                                    ? 'border-[#4299c1] bg-[#4299c1]/10 text-[#142738]'
                                                    : 'border-gray-200 bg-white text-[#64656f] hover:border-[#4299c1]/50'
                                            }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Languages */}
                        <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 hover:border-[#4299c1] transition-all">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-[#4299c1]/10 rounded-xl flex items-center justify-center">
                                    <Languages className="size-6 text-[#4299c1]" />
                                </div>
                                <div>
                                    <h3 className="text-2xl text-[#142738] text-[24px]">زبان‌های قابل فهم</h3>
                                    <p className="text-sm text-[#64656f] mt-1">برای یافتن خدمات با پرسنل هم‌زبان</p>
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3">
                                {languages.map((lang) => (
                                    <button
                                        key={lang.value}
                                        type="button"
                                        onClick={() => toggleLanguage(lang.value)}
                                        className={`px-5 py-3 rounded-xl border-2 transition-all ${
                                            selectedLanguages.includes(lang.value)
                                                ? 'border-[#4299c1] bg-[#4299c1] text-white shadow-md'
                                                : 'border-gray-200 bg-white text-[#64656f] hover:border-gray-300'
                                        }`}
                                    >
                                        {lang.label}
                                    </button>
                                ))}
                            </div>
                            {selectedLanguages.length > 0 && (
                                <p className="mt-4 text-sm text-[#64656f]">
                                    {selectedLanguages.length} زبان انتخاب شده
                                </p>
                            )}
                        </div>

                        {/* Optional Questions Section */}
                        <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl border-2 border-purple-200 p-8">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center shadow-md">
                                    <Sparkles className="size-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl text-[#142738]">پرسش‌های تکمیلی</h3>
                                    <p className="text-sm text-[#64656f] mt-1">اختیاری ولی برای پیشنهادات بهتر توصیه می‌شود</p>
                                </div>
                            </div>

                            <div className="space-y-6">
                                {/* Dietary Restrictions */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Utensils className="size-5 text-purple-600" />
                                        <h4 className="text-lg text-[#142738]">ملاحظات غذایی</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {dietaryOptions.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => toggleDietaryRestriction(option.value)}
                                                    className={`px-4 py-2.5 rounded-xl border-2 transition-all flex items-center gap-2 text-sm ${
                                                        dietaryRestrictions.includes(option.value)
                                                            ? 'border-purple-500 bg-purple-500 text-white shadow-md'
                                                            : 'border-gray-200 bg-white text-[#64656f] hover:border-purple-300'
                                                    }`}
                                                >
                                                    <Icon className="size-4" />
                                                    <span>{option.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {dietaryRestrictions.length > 0 && (
                                        <p className="mt-2 text-xs text-purple-600">
                                            ✓ {dietaryRestrictions.length} مورد انتخاب شده
                                        </p>
                                    )}
                                </div>

                                {/* Religious Needs */}
                                <div>
                                    <div className="flex items-center gap-2 mb-3">
                                        <Church className="size-5 text-purple-600" />
                                        <h4 className="text-lg text-[#142738]">نیازهای مذهبی</h4>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {religiousOptions.map((option) => {
                                            const Icon = option.icon;
                                            return (
                                                <button
                                                    key={option.value}
                                                    type="button"
                                                    onClick={() => toggleReligiousNeed(option.value)}
                                                    className={`px-4 py-2.5 rounded-xl border-2 transition-all flex items-center gap-2 text-sm ${
                                                        religiousNeeds.includes(option.value)
                                                            ? 'border-purple-500 bg-purple-500 text-white shadow-md'
                                                            : 'border-gray-200 bg-white text-[#64656f] hover:border-purple-300'
                                                    }`}
                                                >
                                                    <Icon className="size-4" />
                                                    <span>{option.label}</span>
                                                </button>
                                            );
                                        })}
                                    </div>
                                    {religiousNeeds.length > 0 && (
                                        <p className="mt-2 text-xs text-purple-600">
                                            ✓ {religiousNeeds.length} مورد انتخاب شده
                                        </p>
                                    )}
                                </div>

                                {/* Language Level, Traveling With, Budget in Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                                    {/* Language Level */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <MessageSquare className="size-5 text-purple-600" />
                                            <h4 className="text-base text-[#142738]">سطح زبان مقصد</h4>
                                        </div>
                                        <div className="space-y-2">
                                            {languageLevels.map((level) => (
                                                <button
                                                    key={level.value}
                                                    type="button"
                                                    onClick={() => setDestinationLanguageLevel(level.value)}
                                                    className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-right ${
                                                        destinationLanguageLevel === level.value
                                                            ? 'border-purple-500 bg-purple-50 text-[#142738]'
                                                            : 'border-gray-200 bg-white text-[#64656f] hover:border-purple-200'
                                                    }`}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="text-sm">{level.label}</span>
                                                        <span className="text-xs opacity-70">{level.description}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Traveling With */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <UserCheck className="size-5 text-purple-600" />
                                            <h4 className="text-base text-[#142738]">همراهان سفر</h4>
                                        </div>
                                        <div className="space-y-2">
                                            {travelingWithOptions.map((option) => {
                                                const Icon = option.icon;
                                                return (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => setTravelingWith(option.value)}
                                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all flex items-center gap-2 text-sm ${
                                                            travelingWith === option.value
                                                                ? 'border-purple-500 bg-purple-50 text-[#142738]'
                                                                : 'border-gray-200 bg-white text-[#64656f] hover:border-purple-200'
                                                        }`}
                                                    >
                                                        <Icon className="size-4" />
                                                        <span>{option.label}</span>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* Accommodation Budget */}
                                    <div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <DollarSign className="size-5 text-purple-600" />
                                            <h4 className="text-base text-[#142738]">بودجه اقامت</h4>
                                        </div>
                                        <div className="space-y-2">
                                            {budgetOptions.map((option) => {
                                                const Icon = option.icon;
                                                return (
                                                    <button
                                                        key={option.value}
                                                        type="button"
                                                        onClick={() => setAccommodationBudget(option.value)}
                                                        className={`w-full px-4 py-3 rounded-xl border-2 transition-all text-right ${
                                                            accommodationBudget === option.value
                                                                ? 'border-purple-500 bg-purple-50 text-[#142738]'
                                                                : 'border-gray-200 bg-white text-[#64656f] hover:border-purple-200'
                                                        }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex flex-col text-right">
                                                                <span className="text-sm">{option.label}</span>
                                                                <span className="text-xs opacity-70">{option.range}</span>
                                                            </div>
                                                            <Icon className="size-4 flex-shrink-0" />
                                                        </div>
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={!selectedNationality || !selectedDestCountry}
                            className="w-full bg-gradient-to-r from-[#4299c1] to-[#3a87ab] text-white px-8 py-5 rounded-2xl hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            <Search className="size-6 group-hover:scale-110 transition-transform" />
                            <span className="text-xl">
                {selectedNationality && selectedDestCountry
                    ? `دریافت بسته سفارشی ${getCountryNameByCode(selectedNationality.isoCode, 'fa')} → ${selectedDestCity?.label || selectedDestCountry.label}`
                    : 'ابتدا ملیت و مقصد را انتخاب کنید'
                }
              </span>
                        </button>
                    </form>
                </div>
            </section>

            {/* Results Section */}
            {showResults && data && selectedNationality && (
                <TravelGuideResults
                    nationalityName={getCountryNameByCode(selectedNationality.isoCode, 'fa')}
                    destinationName={selectedDestCity?.label || selectedDestCountry.label}
                    data={data}
                />
            )}

            {/* Footer */}
            <footer className="bg-[#142738] text-white py-12">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                        <div>
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-2xl text-[#4299c1]">ریرا</span>
                            </div>
                            <p className="text-gray-400">
                                پلتفرم جامع آگهی‌های املاک و خدمات با بیش از ۱۰ سال تجربه
                            </p>
                        </div>
                        <div>
                            <h4 className="mb-4">دسترسی سریع</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>
                                    <Link href="/" className="hover:text-white transition-colors">
                                        صفحه اصلی
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" className="hover:text-white transition-colors">
                                        درباره ما
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="mb-4">تماس با ما</h4>
                            <ul className="space-y-2 text-gray-400">
                                <li>تلفن: ۰۲۱-۱۲۳۴۵۶۷۸</li>
                                <li>ایمیل: info@rira.com</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
                        <p>© ۱۴۰۴ ریرا. تمامی حقوق محفوظ است.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
