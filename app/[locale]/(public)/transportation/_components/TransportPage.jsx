"use client"
import {useState} from 'react';
import {TrustBadge, UrgentBadge} from './TrustBadge';
import {PostAdModal} from './PostAdForm';
import {
    Package, Users, MapPin, Calendar, Clock, Car, Plane,
    Shield, CheckCircle, ArrowRight, Search, Filter, Star,
    FileText, DollarSign, Phone, User, Mail, PackageCheck, UserPlus
} from 'lucide-react';
import Link from "next/link";
import {useParams} from "next/navigation";
import {Button} from "@/components/ui/button";


const samplePackageSendAds = [
    {
        id: '1',
        role: 'send-package',
        title: 'ارسال دارو از تهران به اصفهان',
        from: 'تهران',
        to: 'اصفهان',
        date: '1403/09/15',
        weight: '500 گرم',
        packageType: 'دارو',
        description: 'بسته دارویی کوچک، نیاز به حمل سریع',
        price: '150,000',
        sender: 'رضا احمدی',
        verified: true,
        urgent: true,
        rating: 4.8,
        reviewCount: 24,
        successfulDeliveries: 24,
    },
    {
        id: '2',
        role: 'send-package',
        title: 'ارسال مدارک از مشهد به تهران',
        from: 'مشهد',
        to: 'تهران',
        date: '1403/09/18',
        weight: '200 گرم',
        packageType: 'مدارک',
        description: 'مدارک مهم دانشگاهی',
        price: '100,000',
        sender: 'فاطمه کریمی',
        verified: true,
        urgent: false,
        rating: 4.5,
        reviewCount: 18,
        successfulDeliveries: 18,
    },
    {
        id: '9',
        role: 'send-package',
        title: 'ارسال هدیه از شیراز به تبریز',
        from: 'شیراز',
        to: 'تبریز',
        date: '1403/09/20',
        weight: '1 کیلو',
        packageType: 'هدیه',
        description: 'بسته هدیه تولد',
        price: '250,000',
        sender: 'علی رحمانی',
        verified: false,
        urgent: false,
        rating: 4.2,
        reviewCount: 9,
        successfulDeliveries: 9,
    },
];

const samplePackageCarryAds = [
    {
        id: '3',
        role: 'carry-package',
        title: 'تهران به شیراز - می‌توانم بسته ببرم',
        from: 'تهران',
        to: 'شیراز',
        date: '1403/09/16',
        time: '14:00',
        capacity: '3 کیلو',
        acceptedTypes: ['مدارک', 'دارو', 'کتاب'],
        price: '200,000',
        carrier: 'علی محمدی',
        verified: true,
        vehicle: 'اتوبوس',
        rating: 4.7,
        reviewCount: 22,
        successfulDeliveries: 22,
    },
    {
        id: '4',
        role: 'carry-package',
        title: 'اصفهان به تهران - حمل بسته',
        from: 'اصفهان',
        to: 'تهران',
        date: '1403/09/17',
        time: '08:00',
        capacity: '5 کیلو',
        acceptedTypes: ['مدارک', 'مواد غذایی', 'پوشاک', 'هدیه'],
        price: '150,000',
        carrier: 'سارا کریمی',
        verified: true,
        vehicle: 'ماشین شخصی',
        rating: 4.9,
        reviewCount: 31,
        successfulDeliveries: 31,
    },
    {
        id: '10',
        role: 'carry-package',
        title: 'مشهد به تهران - هواپیما',
        from: 'مشهد',
        to: 'تهران',
        date: '1403/09/19',
        time: '10:00',
        capacity: '2 کیلو',
        acceptedTypes: ['مدارک', 'دارو'],
        price: '100,000',
        carrier: 'رضا نوری',
        verified: true,
        vehicle: 'هواپیما',
        rating: 4.6,
        reviewCount: 15,
        successfulDeliveries: 15,
    },
];

const sampleDriverAds = [
    {
        id: '5',
        role: 'driver',
        title: 'تهران به کرج - 2 صندلی خالی',
        from: 'تهران',
        to: 'کرج',
        date: '1403/09/16',
        time: '08:00',
        seats: 2,
        pricePerSeat: '50,000',
        driver: 'محمد رضایی',
        verified: true,
        carModel: 'پژو 206',
        rating: 4.3,
        reviewCount: 12,
        successfulDeliveries: 12,
    },
    {
        id: '6',
        role: 'driver',
        title: 'تهران به اصفهان - 3 نفر',
        from: 'تهران',
        to: 'اصفهان',
        date: '1403/09/17',
        time: '06:00',
        seats: 3,
        pricePerSeat: '300,000',
        driver: 'حسین امینی',
        verified: true,
        carModel: 'سمند',
        rating: 4.8,
        reviewCount: 27,
        successfulDeliveries: 27,
    },
    {
        id: '11',
        role: 'driver',
        title: 'مشهد به تهران - 1 صندلی',
        from: 'مشهد',
        to: 'تهران',
        date: '1403/09/19',
        time: '15:00',
        seats: 1,
        pricePerSeat: '450,000',
        driver: 'پروانه احمدی',
        verified: true,
        carModel: 'پژو پارس',
        rating: 4.6,
        reviewCount: 19,
        successfulDeliveries: 19,
    },
];

const samplePassengerAds = [
    {
        id: '7',
        role: 'passenger',
        title: 'دنبال سفر از مشهد به تهران',
        from: 'مشهد',
        to: 'تهران',
        date: '1403/09/19',
        passengers: 2,
        priceOffer: '400,000',
        passenger: 'زهرا حسینی',
        verified: true,
        rating: 4.7,
        reviewCount: 14,
        successfulDeliveries: 14,
    },
    {
        id: '8',
        role: 'passenger',
        title: 'نیاز به سفر تهران - شیراز',
        from: 'تهران',
        to: 'شیراز',
        date: '1403/09/20',
        passengers: 1,
        priceOffer: '500,000',
        passenger: 'امیر رضایی',
        verified: false,
        rating: 4.1,
        reviewCount: 8,
        successfulDeliveries: 8,
    },
    {
        id: '12',
        role: 'passenger',
        title: 'تبریز به تهران - یک نفر',
        from: 'تبریز',
        to: 'تهران',
        date: '1403/09/21',
        passengers: 1,
        priceOffer: '550,000',
        passenger: 'سمیرا کریمی',
        verified: true,
        rating: 4.4,
        reviewCount: 11,
        successfulDeliveries: 11,
    },
];

const roleConfig = {
    'send-package': {
        title: 'می‌خواهم بسته ارسال کنم',
        icon: Package,
        color: 'blue',
        description: 'بسته خود را با مسافر به مقصد برسانید',
    },
    'carry-package': {
        title: 'می‌توانم بسته حمل کنم',
        icon: PackageCheck,
        color: 'green',
        description: 'در مسیر سفر خود بسته حمل کنید',
    },
    'driver': {
        title: 'ماشین دارم و جا دارم',
        icon: Car,
        color: 'purple',
        description: 'صندلی خالی ماشین را پر کنید',
    },
    'passenger': {
        title: 'دنبال هم‌سفر می‌گردم',
        icon: UserPlus,
        color: 'orange',
        description: 'به عنوان مسافر همراه شوید',
    },
};

export function TransportPage() {
    const [activeRole, setActiveRole] = useState('send-package');
    const [showForm, setShowForm] = useState(false);
    const [open, setOpen] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [searchOrigin, setSearchOrigin] = useState('');
    const [searchDestination, setSearchDestination] = useState('');
    const [searchDate, setSearchDate] = useState('');
    const [filterVerified, setFilterVerified] = useState(false);
    const [filterUrgent, setFilterUrgent] = useState(false);
    const {locale} = useParams()
    const getCurrentAds = () => {
        switch (activeRole) {
            case 'send-package':
                return samplePackageSendAds;
            case 'carry-package':
                return samplePackageCarryAds;
            case 'driver':
                return sampleDriverAds;
            case 'passenger':
                return samplePassengerAds;
            default:
                return [];
        }
    };

    const filterAds = (ads) => {
        return ads.filter((ad) => {
            // Filter by origin
            if (searchOrigin && !ad.from.toLowerCase().includes(searchOrigin.toLowerCase())) {
                return false;
            }

            // Filter by destination
            if (searchDestination && !ad.to.toLowerCase().includes(searchDestination.toLowerCase())) {
                return false;
            }

            // Filter by date
            if (searchDate && ad.date !== searchDate) {
                return false;
            }

            // Filter by verified
            if (filterVerified && !ad.verified) {
                return false;
            }

            // Filter by urgent (only for send-package)
            else if (filterUrgent && ad.role === 'send-package' && !ad.urgent) {
                return false;
            }

            return true;
        });
    };

    const currentAds = filterAds(getCurrentAds());

    return (
        <div className="h-full overflow-hidden scroll-hidden w-full">
            <section className="relative w-full">
                <div className=" mx-auto  w-full">
                    <div className="text-center mb-8 bg-gradient-to-b from-Primary-100 to-surface py-10 w-full">
                        <div
                            className="inline-flex items-center gap-3 bg-surface px-6 py-3 rounded-full shadow-lg mb-6">
                            <Car className="size-6 text-[#4299c1]"/>
                            <span className="text-Primary-950 pt-1">پلتفرم هوشمند حمل و نقل اشتراکی</span>
                        </div>
                        <h1 className="text-2xl lg:text-5xl text-Primary-950 mb-4">
                            حمل و نقل اشتراکی
                        </h1>
                        <p className="lg:text-xl text-Gray-500 max-w-3xl mx-auto">
                            ارسال بسته با مسافر یا پیدا کردن هم‌سفر — راهی اقتصادی، سریع و مطمئن
                        </p>
                    </div>

                    {/* Role Selection Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto p-6">
                        {(Object.entries(roleConfig)).map(([role, config]) => {
                            const Icon = config.icon;
                            const isActive = activeRole === role;
                            return (
                                <button
                                    key={role}
                                    onClick={() => setActiveRole(role)}
                                    className={`relative p-6 rounded-2xl border-2 transition-all w-full ${
                                        isActive
                                            ? 'border-[#4299c1] bg-[#4299c1]/5 shadow-lg'
                                            : 'border-Gray-200 bg-surface hover:border-[#4299c1]/50'
                                    }`}
                                >
                                    <div className="flex flex-col items-center text-center gap-3">
                                        <div className={`p-3 rounded-xl ${
                                            isActive ? 'bg-[#4299c1]' : 'bg-Gray-100'
                                        }`}>
                                            <Icon className={`size-6 ${
                                                isActive ? 'text-white' : 'text-Gray-500'
                                            }`}/>
                                        </div>
                                        <div>
                                            <h3 className="text-base text-Primary-950 mb-1">{config.title}</h3>
                                            <p className="text-xs text-Gray-500">{config.description}</p>
                                        </div>
                                        {isActive && (
                                            <div className="absolute top-3 left-3">
                                                <CheckCircle className="size-5 text-[#4299c1]"/>
                                            </div>
                                        )}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Search and Filter Section */}
            <section className="bg-surface p-6">
                <div className=" mx-auto">
                    <div className="grid md:grid-cols-12 gap-4">
                        <div className="md:col-span-3">
                            <input
                                type="text"
                                placeholder="شهر مبدأ"
                                value={searchOrigin}
                                onChange={(e) => setSearchOrigin(e.target.value)}
                                className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1] focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-3">
                            <input
                                type="text"
                                placeholder="شهر مقصد"
                                value={searchDestination}
                                onChange={(e) => setSearchDestination(e.target.value)}
                                className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1] focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <input
                                type="text"
                                placeholder="تاریخ (1403/09/15)"
                                value={searchDate}
                                onChange={(e) => setSearchDate(e.target.value)}
                                className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1] focus:border-transparent"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`w-full flex items-center justify-center gap-2 px-4 cursor-pointer py-3 rounded-xl transition-colors ${
                                    showFilters ? 'bg-[#4299c1] text-white' : 'bg-Gray-100 hover:bg-Gray-200'
                                }`}
                            >
                                <Filter className="size-5"/>
                            </button>
                        </div>
                        <div className="md:col-span-3 py-0.5">
                            <Button
                                type="button"
                                onClick={() => setOpen(true)}
                                className="flex items-center justify-center gap-2 px-4 py-2 bg-Primary-600 hover:bg-Primary-600 text-white rounded-xl w-full h-full"
                            >
                                ثبت آگهی جدید
                                <ArrowRight className="size-5"/>
                            </Button>

                            <PostAdModal open={open} onOpenChange={setOpen}/>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 p-4 bg-Gray-50 rounded-xl">
                            <h4 className="text-sm text-Primary-950 mb-3">فیلترهای پیشرفته</h4>
                            <div className="flex flex-wrap gap-4">
                                <label className="flex items-center gap-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={filterVerified}
                                        onChange={(e) => setFilterVerified(e.target.checked)}
                                        className="size-5 text-[#4299c1]"
                                    />
                                    <span className="text-Gray-500">فقط کاربران تایید شده</span>
                                </label>
                                {activeRole === 'send-package' && (
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={filterUrgent}
                                            onChange={(e) => setFilterUrgent(e.target.checked)}
                                            className="size-5 text-[#4299c1]"
                                        />
                                        <span className="text-Gray-500">فقط آگهی‌های فوری</span>
                                    </label>
                                )}
                                <button
                                    onClick={() => {
                                        setSearchOrigin('');
                                        setSearchDestination('');
                                        setSearchDate('');
                                        setFilterVerified(false);
                                        setFilterUrgent(false);
                                    }}
                                    className="mr-auto px-4 py-2 text-sm text-[#4299c1] hover:bg-surface rounded-lg transition-colors"
                                >
                                    پاک کردن فیلترها
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* New Ad Form */}
            {showForm && (
                <section className="bg-[#4299c1]/5 border-b border-[#4299c1]/20 p-6">
                    <div className="mx-auto">
                        <div className="bg-surface rounded-2xl shadow-xl p-8">
                            <div className="flex items-center gap-3 mb-6">
                                {(() => {
                                    const Icon = roleConfig[activeRole].icon;
                                    return <Icon className="size-6 text-[#4299c1]"/>;
                                })()}
                                <h3 className="text-2xl text-Primary-950">
                                    {roleConfig[activeRole].title}
                                </h3>
                            </div>

                            {activeRole === 'send-package' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-Primary-950 mb-2">عنوان آگهی</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: ارسال دارو از تهران به اصفهان"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">نوع بسته</label>
                                        <select
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1] bg-surface">
                                            <option value="">انتخاب کنید</option>
                                            <option value="documents">مدارک</option>
                                            <option value="food">مواد غذایی</option>
                                            <option value="clothing">پوشاک</option>
                                            <option value="medicine">دارو</option>
                                            <option value="gift">هدیه</option>
                                            <option value="book">کتاب</option>
                                            <option value="other">سایر</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">شهر مبدأ</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: تهران"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">شهر مقصد</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: اصفهان"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">تاریخ تقریبی ارسال</label>
                                        <input
                                            type="text"
                                            placeholder="1403/09/15"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">وزن تقریبی</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: 500 گرم یا 2 کیلو"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">ابعاد تقریبی (طول × عرض ×
                                            ارتفاع)</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: 30 × 20 × 10 سانتی‌متر"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">مبلغ پیشنهادی به مسافر
                                            (تومان)</label>
                                        <input
                                            type="text"
                                            placeholder="150,000"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-Primary-950 mb-2">نیاز به مراقبت خاص؟</label>
                                        <textarea
                                            rows={2}
                                            placeholder="مثال: باید در یخچال نگهداری شود، شکننده است، ..."
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-Primary-950 mb-2">توضیحات تکمیلی</label>
                                        <textarea
                                            rows={3}
                                            placeholder="سایر توضیحات درباره بسته و نحوه تحویل..."
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input type="checkbox" className="size-5 text-[#4299c1]"/>
                                            <span
                                                className="text-Gray-500">این بسته فوری است (باید امروز یا فردا برسد)</span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {activeRole === 'carry-package' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-Primary-950 mb-2">عنوان مسیر</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: تهران به اصفهان"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">وسیله نقلیه</label>
                                        <select
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1] bg-surface">
                                            <option value="">انتخاب کنید</option>
                                            <option value="personal-car">ماشین شخصی</option>
                                            <option value="bus">اتوبوس</option>
                                            <option value="train">قطار</option>
                                            <option value="airplane">هواپیما</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">شهر مبدأ</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: تهران"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">شهر مقصد</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: اصفهان"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">تاریخ دقیق حرکت</label>
                                        <input
                                            type="text"
                                            placeholder="1403/09/15"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">ساعت دقیق حرکت</label>
                                        <input
                                            type="text"
                                            placeholder="08:00"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">ظرفیت خالی برای بسته
                                            (وزن)</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: 5 کیلو"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">ظرفیت خالی (ابعاد)</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: 50 × 40 × 30 سانتی‌متر"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-Primary-950 mb-2">نوع بسته‌هایی که قبول
                                            می‌کنید</label>
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-2">
                                            {['مدارک', 'مواد غذایی', 'پوشاک', 'دارو', 'هدیه', 'کتاب', 'سایر'].map((type) => (
                                                <label key={type} className="flex items-center gap-2 cursor-pointer">
                                                    <input type="checkbox" className="size-4 text-[#4299c1]"/>
                                                    <span className="text-sm text-Gray-500">{type}</span>
                                                </label>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">قیمت پیشنهادی برای حمل بسته
                                            (تومان)</label>
                                        <input
                                            type="text"
                                            placeholder="150,000"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">مشخصات خودرو (در صورت ماشین
                                            شخصی)</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: پژو 206 سفید"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-Primary-950 mb-2">توضیحات تکمیلی</label>
                                        <textarea
                                            rows={3}
                                            placeholder="سایر توضیحات درباره سفر، نحوه تحویل و دریافت بسته..."
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeRole === 'driver' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-Primary-950 mb-2">عنوان مسیر</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: تهران به کرج"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">مدل خودرو</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: پژو 206"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">شهر مبدأ</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: تهران"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">شهر مقصد</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: کرج"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">تاریخ حرکت</label>
                                        <input
                                            type="text"
                                            placeholder="1403/09/15"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">ساعت حرکت</label>
                                        <input
                                            type="text"
                                            placeholder="08:00"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">تعداد صندلی خالی</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="4"
                                            placeholder="2"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">قیمت هر صندلی (��ومان)</label>
                                        <input
                                            type="text"
                                            placeholder="50,000"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-Primary-950 mb-2">توضیحات</label>
                                        <textarea
                                            rows={3}
                                            placeholder="توضیحات تکمیلی درباره سفر..."
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                </div>
                            )}

                            {activeRole === 'passenger' && (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-Primary-950 mb-2">عنوان</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: نیاز به سفر از تهران به اصفهان"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">تعداد مسافران</label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="4"
                                            placeholder="1"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">شهر مبدأ</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: تهران"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">شهر مقصد</label>
                                        <input
                                            type="text"
                                            placeholder="مثال: اصفهان"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">تاریخ مورد نظر</label>
                                        <input
                                            type="text"
                                            placeholder="1403/09/15"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-Primary-950 mb-2">مبلغ پیشنهادی (تومان)</label>
                                        <input
                                            type="text"
                                            placeholder="400,000"
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                    <div className="md:col-span-2">
                                        <label className="block text-Primary-950 mb-2">توضیحات</label>
                                        <textarea
                                            rows={3}
                                            placeholder="سایر توضیحات..."
                                            className="w-full px-4 py-3 border border-Gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4299c1]"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-4 mt-8">
                                <button
                                    onClick={() => setShowForm(false)}
                                    className="px-8 py-3 border border-Gray-300 hover:bg-Gray-50 rounded-xl transition-colors"
                                >
                                    انصراف
                                </button>
                                <button
                                    className="px-8 py-3 bg-[#4299c1] hover:bg-[#3a89b0] text-white rounded-xl transition-colors shadow-lg">
                                    ثبت آگهی
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Ads List Section */}
            <section className="py-12 px-6">
                <div className="mx-auto">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl text-Primary-950">
                            {roleConfig[activeRole].title}
                        </h2>
                        <div className="text-left">
              <span className="text-[#4299c1] font-['IRANSansWebFaNum:Bold',sans-serif]">
                {currentAds.length}
              </span>
                            <span className="text-Gray-500"> آگهی یافت شد</span>
                        </div>
                    </div>

                    {currentAds.length === 0 ? (
                        <div className="text-center py-16">
                            <div
                                className="inline-flex items-center justify-center size-20 bg-Gray-100 rounded-full mb-4">
                                <Search className="size-10 text-Gray-400"/>
                            </div>
                            <h3 className="text-xl text-Primary-950 mb-2">آگهی یافت نشد</h3>
                            <p className="text-Gray-500 mb-6">
                                با فیلترهای انتخابی آگهی یافت نشد. لطفاً فیلترها را تغییر دهید.
                            </p>
                            <button
                                onClick={() => {
                                    setSearchOrigin('');
                                    setSearchDestination('');
                                    setSearchDate('');
                                    setFilterVerified(false);
                                    setFilterUrgent(false);
                                }}
                                className="px-6 py-3 bg-[#4299c1] text-white rounded-xl hover:bg-[#3a89b0] transition-colors"
                            >
                                پاک کردن فیلترها
                            </button>
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentAds.map((ad) => (
                                <Link
                                    key={ad.id}
                                    href={`/${locale}/transportation/${ad.id}`}
                                    className="bg-surface rounded-2xl border border-Gray-200 hover:border-[#4299c1] hover:shadow-xl transition-all overflow-hidden group block"
                                >
                                    {/* Header */}
                                    <div
                                        className="bg-gradient-to-br from-[#4299c1]/10 to-[#4299c1]/5 p-6 border-b border-Gray-100">
                                        <div className="flex items-center gap-2 mb-3">
                                            <h3 className="text-base text-Primary-950 flex-1 min-w-0 line-clamp-1 text-[14px]">{ad.title}</h3>
                                            <div className="flex items-center gap-2 shrink-0">
                                                {ad.role === 'send-package' && ad.urgent &&
                                                    <UrgentBadge className="text-xs"/>}
                                                {ad.verified && (
                                                    <div
                                                        className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-sm">
                                                        <CheckCircle className="size-4"/>
                                                        <span>تایید شده</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        {ad.successfulDeliveries && ad.successfulDeliveries > 0 && (
                                            <TrustBadge successfulDeliveries={ad.successfulDeliveries} showLabel={false}
                                                        className="text-xs"/>
                                        )}
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 space-y-4">
                                        {/* Route */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#4299c1]/10 rounded-lg">
                                                <MapPin className="size-5 text-[#4299c1]"/>
                                            </div>
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-Primary-950 text-[13px]">{ad.from}</span>
                                                    <ArrowRight className="size-4 text-Gray-500 scale-x-[-1]"/>
                                                    <span className="text-Primary-950 text-[13px]">{ad.to}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Date */}
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-[#4299c1]/10 rounded-lg">
                                                <Calendar className="size-5 text-[#4299c1]"/>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <span className="text-Gray-500">{ad.date}</span>
                                                {('time' in ad) && (
                                                    <>
                                                        <span className="text-Gray-500">—</span>
                                                        <span className="text-Gray-500">{ad.time}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Role Specific Info */}
                                        {ad.role === 'send-package' && (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#4299c1]/10 rounded-lg">
                                                        <Package className="size-5 text-[#4299c1]"/>
                                                    </div>
                                                    <span
                                                        className="text-Gray-500">{ad.packageType} - {ad.weight}</span>
                                                </div>
                                                <p className="text-Gray-500 text-sm line-clamp-2">{ad.description}</p>
                                            </>
                                        )}

                                        {ad.role === 'carry-package' && (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#4299c1]/10 rounded-lg">
                                                        <Car className="size-5 text-[#4299c1]"/>
                                                    </div>
                                                    <span className="text-Gray-500">{ad.vehicle}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#4299c1]/10 rounded-lg">
                                                        <PackageCheck className="size-5 text-[#4299c1]"/>
                                                    </div>
                                                    <span className="text-Gray-500">ظرفیت: {ad.capacity}</span>
                                                </div>
                                                <div className="flex flex-wrap gap-1">
                                                    {ad.acceptedTypes.map((type) => (
                                                        <span key={type}
                                                              className="text-xs bg-Gray-100 px-2 py-1 rounded">
                            {type}
                          </span>
                                                    ))}
                                                </div>
                                            </>
                                        )}

                                        {ad.role === 'driver' && (
                                            <>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#4299c1]/10 rounded-lg">
                                                        <Car className="size-5 text-[#4299c1]"/>
                                                    </div>
                                                    <span className="text-Gray-500">{ad.carModel}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <div className="p-2 bg-[#4299c1]/10 rounded-lg">
                                                        <Users className="size-5 text-[#4299c1]"/>
                                                    </div>
                                                    <span className="text-Gray-500">{ad.seats} صندلی خالی</span>
                                                </div>
                                            </>
                                        )}

                                        {ad.role === 'passenger' && (
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-[#4299c1]/10 rounded-lg">
                                                    <Users className="size-5 text-[#4299c1]"/>
                                                </div>
                                                <span className="text-Gray-500">{ad.passengers} نفر</span>
                                            </div>
                                        )}

                                        {/* Divider */}
                                        <div className="border-t border-Gray-100 pt-4">
                                            <div className="flex items-center justify-between mb-3">
                                                <div className="flex items-center gap-2">
                                                    <div
                                                        className="size-10 rounded-full bg-[#4299c1]/10 flex items-center justify-center">
                                                        <User className="size-5 text-[#4299c1]"/>
                                                    </div>
                                                    <div>
                          <span className="text-Primary-950 block">
                            {ad.role === 'send-package' ? ad.sender :
                                ad.role === 'carry-package' ? ad.carrier :
                                    ad.role === 'driver' ? ad.driver :
                                        ad.passenger}
                          </span>
                                                        {ad.rating && ad.reviewCount && (
                                                            <div className="flex items-center gap-1 mt-0.5">
                                                                <Star
                                                                    className="size-3 text-yellow-500 fill-yellow-500"/>
                                                                <span className="text-xs text-Gray-500">
                                {ad.rating} ({ad.reviewCount} نظر)
                              </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="text-left">
                                                    <div
                                                        className="text-[#4299c1] font-['IRANSansWebFaNum:Bold',sans-serif]">
                                                        {ad.role === 'send-package' ? ad.price :
                                                            ad.role === 'carry-package' ? ad.price :
                                                                ad.role === 'driver' ? ad.pricePerSeat :
                                                                    ad.priceOffer} تومان
                                                    </div>
                                                    {ad.role === 'driver' && (
                                                        <div className="text-xs text-Gray-500">هر نفر</div>
                                                    )}
                                                    {ad.role === 'passenger' && (
                                                        <div className="text-xs text-Gray-500">پیشنهادی</div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Button */}
                                        <button
                                            className="w-full py-3 bg-[#4299c1] hover:bg-[#3a89b0] text-white rounded-xl transition-colors group-hover:shadow-lg">
                                            مشاهده جزئیات و تماس
                                        </button>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Info Section */}
            <section className="text-center mb-8 bg-gradient-to-b from-Primary-100 to-surface py-10 px-6 w-full">
                <div className="mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl text-Primary-950 mb-4">چرا حمل و نقل اشتراکی؟</h2>
                        <p className="text-Gray-500 max-w-2xl mx-auto">
                            راهی هوشمند، اقتصادی و مطمئن برای ارسال بسته یا سفر
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div
                            className="bg-surface rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div
                                className="inline-flex items-center justify-center size-16 bg-green-100 rounded-2xl mb-4">
                                <DollarSign className="size-8 text-green-600"/>
                            </div>
                            <h3 className="text-xl text-Primary-950 mb-3">صرفه‌جویی در هزینه</h3>
                            <p className="text-Gray-500">
                                تا 70٪ ارزان‌تر از روش‌های سنتی حمل و نقل
                            </p>
                        </div>

                        <div
                            className="bg-surface rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div
                                className="inline-flex items-center justify-center size-16 bg-blue-100 rounded-2xl mb-4">
                                <Clock className="size-8 text-blue-600"/>
                            </div>
                            <h3 className="text-xl text-Primary-950 mb-3">سریع و آسان</h3>
                            <p className="text-Gray-500">
                                بسته شما با اولین مسافر به مقصد می‌رسد
                            </p>
                        </div>

                        <div
                            className="bg-surface rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-shadow">
                            <div
                                className="inline-flex items-center justify-center size-16 bg-purple-100 rounded-2xl mb-4">
                                <Shield className="size-8 text-purple-600"/>
                            </div>
                            <h3 className="text-xl text-Primary-950 mb-3">امن و قابل اعتماد</h3>
                            <p className="text-Gray-500">
                                تایید هویت و رتبه‌بندی کاربران برای اطمینان شما
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Safety Tips Section */}
            <section className="pt-16 bg-surface">
                <div className="mx-auto">
                    <div className="border border-amber-200 rounded-t-2xl p-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-amber-100 rounded-xl">
                                <Shield className="size-6 text-amber-600"/>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl text-Primary-950 mb-4">نکات ایمنی مهم</h3>
                                <ul className="space-y-3 text-Gray-500">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="size-5 text-amber-600 shrink-0 mt-0.5"/>
                                        <span>همیشه هویت طرف مقابل را بررسی و تایید کنید</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="size-5 text-amber-600 shrink-0 mt-0.5"/>
                                        <span>از ارسال اشیای قیمتی، ممنوعه یا غیرقانونی خودداری کنید</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="size-5 text-amber-600 shrink-0 mt-0.5"/>
                                        <span>محتویات بسته را قبل از ارسال بررسی و تایید کنید</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="size-5 text-amber-600 shrink-0 mt-0.5"/>
                                        <span>هزینه را در زمان تحویل بسته یا پایان سفر پرداخت کنید</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle className="size-5 text-amber-600 shrink-0 mt-0.5"/>
                                        <span>در صورت مشکل، موضوع را به پشتیبانی گزارش دهید</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
}
