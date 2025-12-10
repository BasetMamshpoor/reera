"use client"
import {useState, useEffect} from 'react';
import {
    ArrowRight, MapPin, Calendar, Clock, Package,
    Star, Send, User, Shield, CheckCircle, Phone, Mail,
    MessageCircle, X, ThumbsUp, Award, Users, Car
} from 'lucide-react';
// import {MobileNavAndSearch} from './MobileNavAndSearch';
import {TrustBadge, UrgentBadge} from '../_components/TrustBadge';
import {useParams, useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";


// Mock data - در production از API گرفته می‌شود
const mockAds = {
    '1': {
        id: '1',
        role: 'send-package',
        title: 'ارسال دارو از تهران به اصفهان',
        from: 'تهران',
        to: 'اصفهان',
        date: '۱۴۰۳/۰۹/۱۵',
        description: 'بسته دارویی کوچک، نیاز به حمل سریع دارم. لطفاً با احتیاط حمل شود.',
        price: '۱۵۰,۰۰۰ تومان',
        verified: true,
        urgent: true,
        ownerName: 'رضا احمدی',
        ownerPhone: '۰۹۱۲۳۴۵۶۷۸۹',
        ownerEmail: 'reza@example.com',
        packageType: 'دارو',
        weight: '۵۰۰ گرم',
        rating: 4.8,
        reviewCount: 24,
        successfulDeliveries: 24
    },
    '2': {
        id: '2',
        role: 'send-package',
        title: 'ارسال مدارک از مشهد به تهران',
        from: 'مشهد',
        to: 'تهران',
        date: '۱۴۰۳/۰۹/۱۸',
        description: 'مدارک مهم دانشگاهی که باید به دانشگاه تهران برسه.',
        price: '۱۰۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'فاطمه کریمی',
        ownerPhone: '۰۹۱۵۱۱۱۲۲۲۲',
        ownerEmail: 'fatemeh@example.com',
        packageType: 'مدارک',
        weight: '۲۰۰ گرم',
        rating: 4.5,
        reviewCount: 18,
        successfulDeliveries: 18
    },
    '3': {
        id: '3',
        role: 'carry-package',
        title: 'تهران به شیراز - می‌توانم بسته ببرم',
        from: 'تهران',
        to: 'شیراز',
        date: '۱۴۰۳/۰۹/۱۶',
        time: '۱۴:۰۰',
        description: 'با اتوبس به شیراز سفر می‌کنم. می‌تونم بسته‌های کوچک ببرم.',
        price: '۲۰۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'علی محمدی',
        ownerPhone: '۰۹۱۲۳۳۳۴۴۴۴',
        capacity: '۳ کیلو',
        acceptedTypes: ['مدارک', 'دارو', 'کتاب'],
        vehicle: 'اتوبس',
        rating: 4.7,
        reviewCount: 22,
        successfulDeliveries: 22
    },
    '4': {
        id: '4',
        role: 'carry-package',
        title: 'اصفهان به تهران - حمل بسته',
        from: 'اصفهان',
        to: 'تهران',
        date: '۱۴۰۳/۰۹/۱۷',
        time: '۰۸:۰۰',
        description: 'با ماشین شخصی به تهران می‌رم. ظرفیت حمل بسته دارم.',
        price: '۱۵۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'سارا کریمی',
        ownerPhone: '۰۹۱۳۵۵۵۶۶۶۶',
        capacity: '۵ کیلو',
        acceptedTypes: ['مدارک', 'مواد غذایی', 'پوشاک', 'هدیه'],
        vehicle: 'ماشین شخصی',
        rating: 4.9,
        reviewCount: 31,
        successfulDeliveries: 31
    },
    '5': {
        id: '5',
        role: 'driver',
        title: 'تهران به کرج - ۲ صندلی خالی',
        from: 'تهران',
        to: 'کرج',
        date: '۱۴۰۳/۰۹/۱۶',
        time: '۰۸:۰۰',
        description: 'صبح از تهران به کرج می‌رم. دو صندلی خالی دارم.',
        price: '۵۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'محمد رضایی',
        ownerPhone: '۰۹۱۲۷۷۷۸۸۸۸',
        seatsAvailable: 2,
        vehicle: 'پژو ۲۰۶',
        rating: 4.3,
        reviewCount: 12,
        successfulDeliveries: 12
    },
    '6': {
        id: '6',
        role: 'driver',
        title: 'تهران به اصفهان - ۳ نفر',
        from: 'تهران',
        to: 'اصفهان',
        date: '۱۴۰۳/۰۹/۱۷',
        time: '۰۶:۰۰',
        description: 'سفر صبح زود به اصفهان. سه صندلی خالی.',
        price: '۳۰۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'حسین امینی',
        ownerPhone: '۰۹۱۳۹۹۹۰۰۰۰',
        seatsAvailable: 3,
        vehicle: 'سمند',
        rating: 4.8,
        reviewCount: 27,
        successfulDeliveries: 27
    },
    '7': {
        id: '7',
        role: 'passenger',
        title: 'دنبال سفر از مشهد به تهران',
        from: 'مشهد',
        to: 'تهران',
        date: '۱۴۰۳/۰۹/۱۹',
        description: 'دو نفر هستیم و دنبال ماشین یا همسفر می‌گردیم.',
        price: '۴۰۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'زهرا حسینی',
        ownerPhone: '۰۹۱۵۲۲۲۳۳۳۳',
        seatsAvailable: 2,
        rating: 4.7,
        reviewCount: 14,
        successfulDeliveries: 14
    },
    '8': {
        id: '8',
        role: 'passenger',
        title: 'نیاز به سفر تهران - شیراز',
        from: 'تهران',
        to: 'شیراز',
        date: '۱۴۰۳/۰۹/۲۰',
        description: 'یک نفر هستم و دنبال ماشین یا اتوبس می‌گردم.',
        price: '۵۰۰,۰۰۰ تومان',
        verified: false,
        ownerName: 'امیر رضایی',
        ownerPhone: '۰۹۱۲۴۴۴۵۵۵۵',
        seatsAvailable: 1,
        rating: 4.1,
        reviewCount: 8,
        successfulDeliveries: 8
    },
    '9': {
        id: '9',
        role: 'send-package',
        title: 'ارسال هدیه از شیراز به تبریز',
        from: 'شیراز',
        to: 'تبریز',
        date: '۱۴۰۳/۰۹/۲۰',
        description: 'بسته هدیه تولد که باید به موقع برسه.',
        price: '۲۵۰,۰۰۰ تومان',
        verified: false,
        ownerName: 'علی رحمانی',
        ownerPhone: '۰۹۱۷۶۶۶۷۷۷۷',
        packageType: 'هدیه',
        weight: '۱ کیلو',
        rating: 4.2,
        reviewCount: 9,
        successfulDeliveries: 9
    },
    '10': {
        id: '10',
        role: 'carry-package',
        title: 'مشهد به تهران - هواپیما',
        from: 'مشهد',
        to: 'تهران',
        date: '۱۴۰۳/۰۹/۱۹',
        time: '۱۰:۰۰',
        description: 'با هواپیما به تهران پرواز می‌کنم. بسته‌های کوچک می‌تونم ببرم.',
        price: '۱۰۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'رضا نوری',
        ownerPhone: '۰۹۱۵۸۸۸۹۹۹۹',
        capacity: '۲ کیلو',
        acceptedTypes: ['مدارک', 'دارو'],
        vehicle: 'هواپیما',
        rating: 4.6,
        reviewCount: 15,
        successfulDeliveries: 15
    },
    '11': {
        id: '11',
        role: 'driver',
        title: 'مشهد به تهران - ۱ صندلی',
        from: 'مشهد',
        to: 'تهران',
        date: '۱۴۰۳/۰۹/۱۹',
        time: '۱۵:۰۰',
        description: 'بعدازظهر به تهران می‌رم. یک صندلی خالی دارم.',
        price: '۴۵۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'پروانه احمدی',
        ownerPhone: '۰۹۱۵۰۰۰۱۱۱۱',
        seatsAvailable: 1,
        vehicle: 'پژو پارس',
        rating: 4.6,
        reviewCount: 19,
        successfulDeliveries: 19
    },
    '12': {
        id: '12',
        role: 'passenger',
        title: 'تبریز به تهران - یک نفر',
        from: 'تبریز',
        to: 'تهران',
        date: '۱۴۰۳/۰۹/۲۱',
        description: 'یک نفر هستم و دنبال سفر به تهران می‌گردم.',
        price: '۵۵۰,۰۰۰ تومان',
        verified: true,
        ownerName: 'سمیرا کریم',
        ownerPhone: '۰۹۱۴۳۳۳۲۲۲۲',
        seatsAvailable: 1,
        rating: 4.4,
        reviewCount: 11,
        successfulDeliveries: 11
    }
};

const mockReviews = {
    '1': [
        {
            id: 'r1',
            userId: 'u1',
            userName: 'سارا محمدی',
            rating: 5,
            comment: 'فرد بسیار قابل اعتمادی. بسته رو با دقت و سرعت تحویل داد.',
            date: '۱۴۰۳/۰۹/۱۰',
            verified: true
        },
        {
            id: 'r2',
            userId: 'u2',
            userName: 'مریم حسینی',
            rating: 5,
            comment: 'عالی بود. حتماً دوباره باهاش کار می‌کنم.',
            date: '۱۴۰۳/۰۹/۰۵',
            verified: true
        },
        {
            id: 'r3',
            userId: 'u3',
            userName: 'امیر کاظمی',
            rating: 4,
            comment: 'خوب بود، فقط کمی تاخیر داشت.',
            date: '۱۴۰۳/۰۸/۲۸',
            verified: false
        }
    ],
    '2': [
        {
            id: 'r4',
            userId: 'u4',
            userName: 'حسین رضایی',
            rating: 5,
            comment: 'بسیار دقیق و مسئولیت‌پذیر. توصیه می‌کنم.',
            date: '۱۴۰۳/۰۹/۱۲',
            verified: true
        },
        {
            id: 'r5',
            userId: 'u5',
            userName: 'زهرا امینی',
            rating: 5,
            comment: 'عالی! مدارک سالم رسید.',
            date: '۱۴۰۳/۰۹/۰۸',
            verified: true
        }
    ],
    '3': [
        {
            id: 'r6',
            userId: 'u6',
            userName: 'علی نوری',
            rating: 5,
            comment: 'فوق‌العاده! خیلی راحت و سریع.',
            date: '۱۴۰۳/۰۹/۱۱',
            verified: true
        },
        {
            id: 'r7',
            userId: 'u7',
            userName: 'فاطمه رحمانی',
            rating: 4,
            comment: 'خوب بود ولی باید بیشتر هماهنگ می‌شد.',
            date: '۱۴۰۳/۰۹/۰۶',
            verified: false
        }
    ],
    '4': [
        {
            id: 'r8',
            userId: 'u8',
            userName: 'محمد صادقی',
            rating: 5,
            comment: 'بی‌نظیر! خیلی مسئولیت‌پذیر و دقیق.',
            date: '۱۴۰۳/۰۹/۱۳',
            verified: true
        }
    ],
    '5': [
        {
            id: 'r9',
            userId: 'u9',
            userName: 'نسرین اکبری',
            rating: 4,
            comment: 'راننده خوبی بود، فقط کمی سریع رانندگی می‌کرد.',
            date: '۱۴۰۳/۰۹/۱۰',
            verified: true
        }
    ],
    '6': [
        {
            id: 'r10',
            userId: 'u10',
            userName: 'رضا مرادی',
            rating: 5,
            comment: 'عالی! سفر راحتی بود.',
            date: '۱۴۰۳/۰۹/۱۲',
            verified: true
        }
    ],
    '7': [
        {
            id: 'r11',
            userId: 'u11',
            userName: 'پریسا حسینی',
            rating: 5,
            comment: 'خانم محترم و خوش‌برخوردی. توصیه می‌کنم.',
            date: '۱۴۰۳/۰۹/۱۴',
            verified: true
        }
    ],
    '8': [
        {
            id: 'r12',
            userId: 'u12',
            userName: 'کامران احمدی',
            rating: 4,
            comment: 'خوب بود.',
            date: '۱۴۰۳/۰۹/۱۵',
            verified: false
        }
    ],
    '9': [
        {
            id: 'r13',
            userId: 'u13',
            userName: 'مینا کریمی',
            rating: 4,
            comment: 'هدیه سالم رسید. ممنون.',
            date: '۱۴۰۳/۰۹/۱۶',
            verified: false
        }
    ],
    '10': [
        {
            id: 'r14',
            userId: 'u14',
            userName: 'سعید رضایی',
            rating: 5,
            comment: 'حرفه‌ای و دقیق. عالی بود.',
            date: '۱۴۰۳/۰۹/۱۴',
            verified: true
        }
    ],
    '11': [
        {
            id: 'r15',
            userId: 'u15',
            userName: 'لیلا محمدی',
            rating: 5,
            comment: 'رانندگی عالی و ایمن. توصیه می‌کنم.',
            date: '۱۴۰۳/۰۹/۱۵',
            verified: true
        }
    ],
    '12': [
        {
            id: 'r16',
            userId: 'u16',
            userName: 'حامد نوری',
            rating: 4,
            comment: 'همسفر خوبی بود.',
            date: '۱۴۰۳/۰۹/۱۷',
            verified: true
        }
    ]
};

export function Details() {
    const {id} = useParams();
    const router = useRouter();
    const [ad, setAd] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [showChat, setShowChat] = useState(false);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [hasSubmittedReview, setHasSubmittedReview] = useState(false);
    const [chatMessages, setChatMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [newReview, setNewReview] = useState({rating: 5, comment: ''});

    useEffect(() => {
        if (id && mockAds[id]) {
            setAd(mockAds[id]);
            setReviews(mockReviews[id] || []);

            // Load saved reviews from localStorage
            const savedReviews = localStorage.getItem(`reviews_${id}`);
            if (savedReviews) {
                setReviews(JSON.parse(savedReviews));
            }

            // Mock chat messages
            setChatMessages([
                {
                    id: 'msg1',
                    senderId: 'other',
                    senderName: mockAds[id].ownerName,
                    text: 'سلام، چطور می‌تونم کمکتون کنم؟',
                    timestamp: '۱۰:۳۰',
                    isCurrentUser: false
                }
            ]);
        }
    }, [id]);

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            const message = {
                id: `msg_${Date.now()}`,
                senderId: 'current',
                senderName: 'شما',
                text: newMessage,
                timestamp: new Date().toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'}),
                isCurrentUser: true
            };
            setChatMessages([...chatMessages, message]);
            setNewMessage('');

            // Mock response after 2 seconds
            setTimeout(() => {
                const response = {
                    id: `msg_${Date.now()}`,
                    senderId: 'other',
                    senderName: ad?.ownerName || 'کاربر',
                    text: 'ممنون از پیامتون. حتماً پیگیری می‌کنم.',
                    timestamp: new Date().toLocaleTimeString('fa-IR', {hour: '2-digit', minute: '2-digit'}),
                    isCurrentUser: false
                };
                setChatMessages(prev => [...prev, response]);
            }, 2000);
        }
    };

    const handleSubmitReview = () => {
        if (newReview.comment.trim() && id) {
            const review = {
                id: `r_${Date.now()}`,
                userId: 'current_user',
                userName: 'شما',
                rating: newReview.rating,
                comment: newReview.comment,
                date: new Date().toLocaleDateString('fa-IR'),
                verified: false
            };

            const updatedReviews = [review, ...reviews];
            setReviews(updatedReviews);

            // Save to localStorage
            localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));

            setNewReview({rating: 5, comment: ''});
            setShowReviewForm(false);
            setHasSubmittedReview(true);
        }
    };

    if (!ad) {
        return (
            <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center">
                <p className="text-Gray-600">آگهی یافت نشد</p>
            </div>
        );
    }

    const avgRating = reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : ad.rating || 0;

    return (
        <div className="h-full overflow-hidden scroll-hidden w-full">

            {/* Mobile Navbar */}
            <div className="md:hidden">
                {/*<MobileNavAndSearch currentPage="transport"/>*/}
            </div>

            <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-8 ">
                {/* Back Button */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-2 text-Gray-600 cursor-pointer mb-4 md:mb-6 transition-colors"
                >
                    <ArrowRight className="size-5 scale-x-[-1] rtl:rotate-180" />
                    <span>بازگشت</span>
                </button>

                <div className="grid lg:grid-cols-3 gap-4 md:gap-6">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-4 md:space-y-6">
                        {/* Ad Card */}
                        <div className="bg-surface rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-3 flex-wrap">
                                        <h1 className="text-Primary-950">{ad.title}</h1>
                                        {ad.verified && (
                                            <CheckCircle className="size-5 text-[#4299c1] flex-shrink-0"/>
                                        )}
                                        {ad.urgent && <UrgentBadge/>}
                                    </div>
                                    {ad.successfulDeliveries && ad.successfulDeliveries > 0 && (
                                        <div className="mb-2">
                                            <TrustBadge successfulDeliveries={ad.successfulDeliveries}/>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-3 text-Gray-600 text-sm">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="size-4"/>
                                            <span>{ad.from}</span>
                                            <ArrowRight className="size-3 scale-x-[-1]"/>
                                            <span>{ad.to}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="size-4"/>
                                            <span>{ad.date}</span>
                                        </div>
                                        {ad.time && (
                                            <div className="flex items-center gap-2">
                                                <Clock className="size-4"/>
                                                <span>{ad.time}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="text-left">
                                    <p className="text-[#4299c1] text-xl">{ad.price}</p>
                                </div>
                            </div>

                            {/* Urgent Alert Banner */}
                            {ad.urgent && (
                                <div
                                    className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                                    <div className="p-2 bg-red-100 rounded-lg">
                                        <Clock className="size-5 text-red-600 animate-pulse"/>
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm text-red-900 mb-1">ارسال فوری - اولویت بالا</h4>
                                        <p className="text-xs text-red-700">
                                            این درخواست فوری است و به تمام مسافرانی که در مسیر {ad.from} به {ad.to} سفر
                                            دارند، اطلاع‌رسانی شده است.
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="border-t border-gray-100 pt-4 mb-4">
                                <h3 className="text-Primary-950 mb-2">توضیحات</h3>
                                <p className="text-Gray-600 leading-relaxed">{ad.description}</p>
                            </div>

                            {/* Additional Info */}
                            <div className="grid sm:grid-cols-2 gap-4 border-t border-gray-100 pt-4">
                                {ad.packageType && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Package className="size-4 text-[#4299c1]"/>
                                        <span className="text-Gray-600">نوع بسته:</span>
                                        <span className="text-Primary-950">{ad.packageType}</span>
                                    </div>
                                )}
                                {ad.weight && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Package className="size-4 text-[#4299c1]"/>
                                        <span className="text-Gray-600">وزن:</span>
                                        <span className="text-Primary-950">{ad.weight}</span>
                                    </div>
                                )}
                                {ad.capacity && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Package className="size-4 text-[#4299c1]"/>
                                        <span className="text-Gray-600">ظرفیت:</span>
                                        <span className="text-Primary-950">{ad.capacity}</span>
                                    </div>
                                )}
                                {ad.vehicle && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Car className="size-4 text-[#4299c1]"/>
                                        <span className="text-Gray-600">وسیله:</span>
                                        <span className="text-Primary-950">{ad.vehicle}</span>
                                    </div>
                                )}
                                {ad.seatsAvailable && (
                                    <div className="flex items-center gap-2 text-sm">
                                        <Users className="size-4 text-[#4299c1]"/>
                                        <span className="text-Gray-600">صندلی خالی:</span>
                                        <span className="text-Primary-950">{ad.seatsAvailable}</span>
                                    </div>
                                )}
                            </div>

                            {ad.acceptedTypes && ad.acceptedTypes.length > 0 && (
                                <div className="border-t border-gray-100 pt-4 mt-4">
                                    <p className="text-Gray-600 text-sm mb-2">نوع بسته‌های قابل قبول:</p>
                                    <div className="flex flex-wrap gap-2">
                                        {ad.acceptedTypes.map((type, idx) => (
                                            <span
                                                key={idx}
                                                className="px-3 py-1 bg-[#f5f7fa] text-Primary-950 text-sm rounded-lg"
                                            >
                        {type}
                      </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reviews Section */}
                        <div className="bg-surface rounded-2xl p-6 shadow-sm">
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <h2 className="text-Primary-950">نظرات و امتیازات</h2>
                                    <div className="flex items-center gap-2">
                                        <Star className="size-5 text-yellow-500 fill-yellow-500"/>
                                        <span className="text-Primary-950">{avgRating.toFixed(1)}</span>
                                        <span className="text-Gray-600 text-sm">({reviews.length} نظر)</span>
                                    </div>
                                </div>
                                {!hasSubmittedReview && (
                                    <Button
                                        type="button"
                                        onClick={() => setShowReviewForm(!showReviewForm)}
                                        className="px-8 py-2 bg-[#4299c1] text-white rounded-xl hover:bg-[#3a89b0] transition-colors text-sm"
                                    >
                                        ثبت نظر
                                    </Button>
                                )}
                                {hasSubmittedReview && (
                                    <div className="flex items-center gap-2 text-sm text-green-600">
                                        <CheckCircle className="size-5"/>
                                        <span>نظر شما ثبت شد</span>
                                    </div>
                                )}
                            </div>

                            {/* Review Form */}
                            {showReviewForm && (
                                <div className="mb-6 p-4 bg-surface rounded-xl">
                                    <h3 className="text-Primary-950 mb-3">نظر شما</h3>
                                    <div className="mb-3">
                                        <label className="block text-sm text-Gray-600 mb-2">امتیاز</label>
                                        <div className="flex gap-2">
                                            {[1, 2, 3, 4, 5].map((star) => (
                                                <button
                                                    key={star}
                                                    onClick={() => setNewReview({...newReview, rating: star})}
                                                    className="transition-transform hover:scale-110"
                                                >
                                                    <Star
                                                        className={`size-6 ${
                                                            star <= newReview.rating
                                                                ? 'text-yellow-500 fill-yellow-500'
                                                                : 'text-gray-300'
                                                        }`}
                                                    />
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="mb-3">
                                        <label className="block text-sm text-Gray-600 mb-2">نظر شما</label>
                                        <textarea
                                            value={newReview.comment}
                                            onChange={(e) => setNewReview({...newReview, comment: e.target.value})}
                                            placeholder="نظر خود را بنویسید..."
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4299c1] resize-none"
                                            rows={3}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            onClick={handleSubmitReview}
                                            className="px-8 py-2 bg-[#4299c1] text-white rounded-xl hover:bg-[#3a89b0] transition-colors"
                                        >
                                            ثبت نظر
                                        </Button>
                                        <Button
                                            type="button"
                                            onClick={() => setShowReviewForm(false)}
                                            className="px-8 py-2 bg-Gray-200 text-Primary-950 rounded-xl hover:bg-Gray-300 transition-colors"
                                        >
                                            انصراف
                                        </Button>
                                    </div>
                                </div>
                            )}

                            {/* Reviews List */}
                            <div className="space-y-4">
                                {reviews.map((review) => (
                                    <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                                        <div className="flex items-start justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <div
                                                    className="size-10 bg-[#4299c1] rounded-full flex items-center justify-center text-white">
                                                    {review.userName.charAt(0)}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-Primary-950">{review.userName}</span>
                                                        {review.verified && (
                                                            <CheckCircle className="size-4 text-[#4299c1]"/>
                                                        )}
                                                    </div>
                                                    <span className="text-xs text-Gray-600">{review.date}</span>
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Star className="size-4 text-yellow-500 fill-yellow-500"/>
                                                <span className="text-Primary-950 text-sm">{review.rating}</span>
                                            </div>
                                        </div>
                                        <p className="text-Gray-600 pr-12">{review.comment}</p>
                                    </div>
                                ))}

                                {reviews.length === 0 && (
                                    <p className="text-center text-Gray-600 py-8">
                                        هنوز نظری ثبت نشده است
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-surface rounded-xl md:rounded-2xl p-4 md:p-6 shadow-sm lg:sticky lg:top-24">
                            {/* Owner Info */}
                            <div className="mb-6 pb-6 border-b border-gray-100">
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="size-16 bg-[#4299c1] rounded-full flex items-center justify-center text-white text-xl">
                                        {ad.ownerName.charAt(0)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-Primary-950">{ad.ownerName}</h3>
                                            {ad.verified && (
                                                <Shield className="size-4 text-[#4299c1]"/>
                                            )}
                                        </div>
                                        {ad.rating && (
                                            <div className="flex items-center gap-1 mt-1">
                                                <Star className="size-4 text-yellow-500 fill-yellow-500"/>
                                                <span className="text-sm text-Gray-600">
                          {ad.rating} ({ad.reviewCount} نظر)
                        </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Trust Badge */}
                                {ad.successfulDeliveries && ad.successfulDeliveries > 0 && (
                                    <div className="mb-4">
                                        <TrustBadge successfulDeliveries={ad.successfulDeliveries}/>
                                    </div>
                                )}

                                {ad.ownerPhone && (
                                    <div className="flex items-center gap-2 text-sm text-Gray-600 mb-2">
                                        <Phone className="size-4"/>
                                        <span>{ad.ownerPhone}</span>
                                    </div>
                                )}
                                {ad.ownerEmail && (
                                    <div className="flex items-center gap-2 text-sm text-Gray-600">
                                        <Mail className="size-4"/>
                                        <span>{ad.ownerEmail}</span>
                                    </div>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <button
                                    onClick={() => setShowChat(!showChat)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#4299c1] text-white rounded-xl hover:bg-[#3a89b0] transition-colors"
                                >
                                    <MessageCircle className="size-5"/>
                                    <span>شروع گفتگو</span>
                                </button>

                                {ad.ownerPhone && (
                                    <a
                                        href={`tel:${ad.ownerPhone}`}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white text-[#4299c1] border-2 border-[#4299c1] rounded-xl hover:bg-[#f5f7fa] transition-colors"
                                    >
                                        <Phone className="size-5"/>
                                        <span>تماس تلفنی</span>
                                    </a>
                                )}
                            </div>

                            {/* Trust Badges */}
                            <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                                <div className="flex items-center gap-3 text-sm">
                                    <Shield className="size-5 text-green-500"/>
                                    <span className="text-Gray-600">کاربر تایید شده</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <Award className="size-5 text-yellow-500"/>
                                    <span className="text-Gray-600">عضو برتر ریرا</span>
                                </div>
                                <div className="flex items-center gap-3 text-sm">
                                    <ThumbsUp className="size-5 text-blue-500"/>
                                    <span className="text-Gray-600">۹۵٪ رضایت مشتریان</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Chat Modal */}
            {showChat && (
                <div className="fixed inset-0 bg-black/50 flex items-end md:items-center justify-center md:p-4 z-50">
                    <div
                        className="bg-surface rounded-t-2xl md:rounded-2xl w-full max-w-2xl h-[90vh] md:max-h-[80vh] flex flex-col">
                        {/* Chat Header */}
                        <div className="flex items-center justify-between p-3 md:p-4 border-b border-Gray-200">
                            <div className="flex items-center gap-3">
                                <div
                                    className="size-10 bg-[#4299c1] rounded-full flex items-center justify-center text-Gray-50">
                                    {ad.ownerName.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="text-Primary-950">{ad.ownerName}</h3>
                                    <span className="text-xs text-green-500">آنلاین</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowChat(false)}
                                className="text-Gray-600 transition-colors"
                            >
                                <X className="size-6"/>
                            </button>
                        </div>

                        {/* Chat Messages */}
                        <div className="flex-1 overflow-y-auto p-3 md:p-4 space-y-3 md:space-y-4">
                            {chatMessages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`flex ${msg.isCurrentUser ? 'justify-start' : 'justify-end'}`}
                                >
                                    <div className={`max-w-[70%] ${msg.isCurrentUser ? 'order-2' : 'order-1'}`}>
                                        <div className={`rounded-2xl px-4 py-2 ${
                                            msg.isCurrentUser
                                                ? 'bg-[#4299c1] text-white'
                                                : 'bg-Primary-50 text-Primary-950'
                                        }`}>
                                            <p>{msg.text}</p>
                                        </div>
                                        <span className={`text-xs text-Gray-600 mt-1 block ${
                                            msg.isCurrentUser ? 'text-right' : 'text-left'
                                        }`}>
                      {msg.timestamp}
                    </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Chat Input */}
                        <div className="p-3 md:p-4 border-t border-gray-200">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="پیام خود را بنویسید..."
                                    className="flex-1 px-3 md:px-4 py-2 md:py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#4299c1] text-sm md:text-base"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="px-4 md:px-6 py-2 md:py-3 bg-[#4299c1] text-white rounded-xl hover:bg-[#3a89b0] transition-colors"
                                >
                                    <Send className="size-4 md:size-5"/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}