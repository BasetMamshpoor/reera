import Home from "../assets/icons/home.svg";
import Car from "../assets/icons/car.svg";
import Mobile from "../assets/icons/mobile.svg";
import Settings from "../assets/icons/settings.svg";

import Tshirt from "../assets/icons/T-shirt.svg";
import Cpu from "../assets/icons/cpu.svg";
import Briefcase from "../assets/icons/briefcase.svg";
import Plane from "../assets/icons/airplane.svg";
import Visa from "../assets/icons/visa.svg";
import {Sofa} from "lucide-react";

export const categories = [
    {
        id: 1,
        name: "املاک",
        title: "املاک",
        slug: "housing",
        icon: <Home className="fill-alpha-100"/>,
        subcategories: [
            {
                id: 3,
                title: "اجاره کوتاه‌مدت",
                subcategories: [
                    {id: 13, title: "آپارتمان و سوئیت"},
                    {id: 14, title: "ویلا و باغ"},
                    {id: 15, title: "دفتر کار و فضای اموزشی"},
                ],
            },
            {
                id: 4,
                title: "اجاره بلند‌مدت",
                subcategories: [
                    {id: 11, title: "آپارتمان"},
                    {id: 12, title: "خانه و ویلا"},
                ],
            },
            {id: 5, title: "هم‌خانه"},
            {id: 16, title: "خرید و فروش"},
        ],
    },
    {
        id: 2,
        name: "دیجیتال",
        title: "دیجیتال",
        slug: "digital",
        icon: <Mobile className="fill-alpha-100"/>,
        subcategories: [
            {id: 6, title: "آپارتمان"},
            {id: 7, title: "ویلا"},
            {id: 8, title: "خوابگاه"},
            {id: 9, title: "سوییت"},
            {id: 10, title: "اتاق"},
        ],
    },
    {
        id: 20,
        name: "وسایل نقلیه",
        title: "وسایل نقلیه",
        slug: "vehicles",
        icon: <Car className="fill-alpha-100"/>,
        subcategories: [
            {
                id: 21,
                title: "خودرو",
                subcategories: [
                    {id: 25, title: "سواری و وانت"},
                    {id: 26, title: "کلاسیک"},
                    {id: 27, title: "اجاره ای"},
                    {id: 28, title: "سنگین"},
                ],
            },
            {id: 22, title: "موتورسیکلت"},
            {id: 23, title: "قطعات یدکی و لوازم جانبی"},
            {id: 24, title: "قایق و سایر وسایل نقلیه"},
        ],
    },
    {
        id: 29,
        name: "کاریابی و استخدام",
        title: "کاریابی و استخدام",
        slug: "recruitment",
        icon: <Briefcase className="fill-alpha-100"/>,
        subcategories: [
            {id: 30, title: "اداری و مدیریت"},
            {id: 31, title: "سرایداری و نظافت"},
            {id: 32, title: "معماری،عمران و ساختمانی"},
            {id: 33, title: "خدمات فروشگاه و رستوران"},
            {id: 34, title: "رایانه و فناوری اطلاعات"},
            {id: 35, title: "مالی، حسابداری، حقوقی"},
            {id: 36, title: "بازاریابی و فروش"},
            {id: 37, title: "صنعتی، فنی، مهندسی"},
            {id: 38, title: "آموزشی"},
            {id: 39, title: "حمل و نقل"},
            {id: 40, title: "درمانی، زیبایی، بهداشتی"},
            {id: 41, title: "هنری و رسانه"},
        ],
    },
    {
        id: 42,
        name: "خانه و آشپزخانه",
        title: "خانه و آشپزخانه",
        slug: "kitchen",
        icon: <Sofa className="text-alpha-100"/>,
        subcategories: [
            {
                id: 43,
                title: "لوازم خانگی برقی",
                subcategories: [
                    {id: 55, title: "یخچال و فریزر"},
                    {id: 56, title: "آب سرد کن و تصویه آب"},
                    {id: 57, title: "ماشین لباسشویی و خشک کن لباس"},
                    {id: 58, title: "ماشین ظرفشویی"},
                    {id: 59, title: "جارو برقی، جارو شارژی، بخارشو"},
                    {id: 60, title: "اتو و لوازم اتو"},
                    {id: 61, title: "آبمیوه گیروآب مرکبات گیر"},
                    {id: 62, title: "خردکن، آسیاب، غذاساز"},
                    {id: 63, title: "سماور،چای ساز، قهوه ساز"},
                    {id: 64, title: "اجاق گازولوازم برقی پخت وپز"},
                    {id: 65, title: "هود"},
                    {id: 66, title: "سایرلوازم برقی"},
                ],
            },
            {
                id: 44,
                title: "ظروف و لوازم آشپزخانه",
                subcategories: [
                    {id: 67, title: "سفره، حوله، دستمال آشپزخانه"},
                    {id: 68, title: "آب چکان و نظم دهنده ظروف"},
                    {id: 69, title: "قوری، کتری، قهوه سازدستی"},
                    {id: 70, title: "ظروف سرو پذیرایی"},
                    {id: 71, title: "ظروف نگهدارنده، پلاستیکی، یک بارمصرف"},
                    {id: 72, title: "ظروف پخت وپز"},
                ],
            },
            {id: 45, title: "خوردنی و آشامیدنی"},
            {
                id: 46,
                title: "خیاطی و بافتنی",
                subcategories: [
                    {id: 73, title: "چرخ خیاطی و ریسندگی"},
                    {id: 74, title: "لوازم خیاطی و بافتنی"},
                ],
            },
            {
                id: 47,
                title: "مبلمان و صنایع چوب",
                subcategories: [
                    {id: 75, title: "مبلمان خانگی و میز عسلی"},
                    {id: 76, title: "میزوصندلی غذاخوری"},
                    {id: 77, title: "بوفه، ویترین، کنسول"},
                    {id: 78, title: "کتابخانه، شلف، قفسه های دیواری"},
                    {id: 79, title: "جاکفشی، کمد، دراور"},
                    {id: 80, title: "تخت وسرویس خواب"},
                    {id: 81, title: "میزتلفن"},
                    {id: 82, title: "میز تلویزیون"},
                    {id: 83, title: "میزتحریروکامپیوتر"},
                    {id: 84, title: "مبلمان اداری"},
                    {id: 85, title: "صندلی ونیمکت"},
                ],
            },
            {
                id: 48,
                title: "نور و روشنایی",
                subcategories: [
                    {id: 86, title: "لوستر و چراغ آویز"},
                    {id: 87, title: "چراغ خواب وآباژور"},
                    {id: 88, title: "ریسه وچراغ تزئینی"},
                    {id: 89, title: "لامپ وچراغ"},
                ],
            },
            {
                id: 49,
                title: "فرش، گلیم، موکت",
                subcategories: [
                    {id: 90, title: "فرش"},
                    {id: 91, title: "تابلوفرش"},
                    {id: 92, title: "روفرشی"},
                    {id: 93, title: "پادری"},
                    {id: 94, title: "موکت"},
                    {id: 95, title: "گلیم، جاجیم، گبه"},
                    {id: 96, title: "پشتی"},
                ],
            },
            {
                id: 50,
                title: "تشک، روتختی، رختخواب",
                subcategories: [
                    {id: 97, title: "رختخواب، بالش، پتو"},
                    {id: 98, title: "تشک تختخواب"},
                    {id: 99, title: "سرویس روتختی"},
                ],
            },
            {
                id: 51,
                title: "لوازم دکوری و تزئینی",
                subcategories: [
                    {id: 100, title: "پرده، رانر، رومیزی"},
                    {id: 101, title: "آینه"},
                    {id: 102, title: "ساعت دیواری وتزئینی"},
                    {id: 103, title: "تابلو، نقاشی، عکس"},
                    {id: 104, title: "مجسمه، تندیس، ماکت"},
                    {id: 105, title: "گل مصنوعی"},
                    {id: 106, title: "گل وگیاه طبیعی"},
                    {id: 107, title: "صنایع دستی و سایر لوازم تزئینی"},
                ],
            },
            {
                id: 52,
                title: "تهویه، سرمایش، گرامایش",
                subcategories: [
                    {id: 108, title: "آبگرمکن، پکیج، شوفاژ"},
                    {id: 109, title: "بخاری، هیتر، شومینه"},
                    {id: 110, title: "کولرآبی"},
                    {id: 111, title: "کولرگازی وفن کوئل"},
                    {id: 112, title: "پنکه وتصویه کننده ی هوا"},
                ],
            },
            {
                id: 53,
                title: "شست وشوونظافت",
                subcategories: [
                    {id: 113, title: "موارد شوینده ودستمال کاغذی"},
                    {id: 114, title: "لوازم نظافت"},
                    {id: 115, title: "بندرخت ورخت آویز"},
                ],
            },
            {
                id: 54,
                title: "حمام وسرویس بهداشتی",
                subcategories: [
                    {id: 116, title: "لوازم حمام"},
                    {id: 117, title: "لوازم سرویس بهداشتی"},
                ],
            },
        ],
    },
    {
        id: 118,
        name: "توروبلیت",
        title: "توروبلیت",
        slug: "ticket",
        icon: <Plane className="fill-alpha-100"/>, // You might want to use a plane icon for travel
        subcategories: [
            {
                id: 119,
                title: "بلیت",
                subcategories: [
                    {id: 128, title: "کنسرت"},
                    {id: 129, title: "تئاتر و سینما"},
                    {id: 130, title: "کارت هدیه و تخفیف"},
                    {id: 131, title: "مسابقه ها و مکان های ورزشی"},
                    {id: 132, title: "ورزشی"},
                    {id: 133, title: "اتوبوس، مترو، قطار"},
                ],
            },
            {id: 120, title: "تور و چارتر"},
            {
                id: 121,
                title: "کتاب و مجله",
                subcategories: [
                    {id: 134, title: "آموزشی"},
                    {id: 135, title: "ادبی"},
                    {id: 136, title: "تاریخی"},
                    {id: 137, title: "مذهبی"},
                    {id: 138, title: "مجلات"},
                ],
            },
            {id: 122, title: "دوچرخه، اسکیت، اسکوتر"},
            {
                id: 123,
                title: "حیوانات",
                subcategories: [
                    {id: 139, title: "گربه"},
                    {id: 140, title: "موش و خرگوش"},
                    {id: 141, title: "خزنده"},
                    {id: 142, title: "پرنده"},
                    {id: 143, title: "ماهی"},
                    {id: 144, title: "لوازم جانبی"},
                    {id: 145, title: "حیوانات مزرعه"},
                    {id: 146, title: "سگ"},
                ],
            },
            {
                id: 124,
                title: "کلکسیون و سرگرمی",
                subcategories: [
                    {id: 147, title: "سکه، تمبر، اسکناس"},
                    {id: 148, title: "اشیاء عتیقه"},
                ],
            },
            {
                id: 125,
                title: "آلات موسیقی",
                subcategories: [
                    {id: 149, title: "گیتار، بیس، امپلیفایر"},
                    {id: 150, title: "سازهای بادی"},
                    {id: 151, title: "پیانو، کیبورد، آکاردئون"},
                    {id: 152, title: "سازهای سنتی"},
                    {id: 153, title: "درام و پرکاشن"},
                    {id: 154, title: "ویولن"},
                ],
            },
            {
                id: 126,
                title: "ورزش و تناسب اندام",
                subcategories: [
                    {id: 155, title: "ورزش های توپی"},
                    {id: 156, title: "کوهنوردی و کمپینگ"},
                    {id: 157, title: "غواصی و ورزش های آبی"},
                    {id: 158, title: "ماهیگیری"},
                    {id: 159, title: "تجهیزات ورزشی"},
                    {id: 160, title: "ورزش های زمستانی"},
                    {id: 161, title: "اسب و تجهیزات اسب سواری"},
                ],
            },
            {id: 127, title: "اسباب بازی"},
        ],
    },
    {
        id: 162,
        name: "خدمات",
        title: "خدمات",
        slug: "services",
        icon: <Settings className="fill-alpha-100"/>,
        subcategories: [
            {id: 163, title: "موتورو ماشین"},
            {id: 164, title: "پذیرایی، مراسم"},
            {id: 165, title: "رایانه ای و موبایل"},
            {id: 166, title: "مالی، حسابداری، بیمه"},
            {id: 167, title: "حمل و نقل"},
            {id: 168, title: "پیشه و مهارت"},
            {id: 169, title: "آرایشگری و زیبایی"},
            {id: 170, title: "نظافت"},
            {id: 171, title: "باغبانی و درختکاری"},
            {id: 172, title: "آموزشی"},
        ],
    },
    {
        id: 173,
        name: "تجارت",
        title: "تجارت",
        slug: "business",
        icon: <Cpu className="fill-alpha-100"/>,
        subcategories: [
            {id: 174, title: "مصالح و تجهیزات ساختمانی"},
            {id: 175, title: "ابزارآلات"},
            {id: 176, title: "ماشین‌آلات صنعتی"},
            {
                id: 177,
                title: "تجهیزات کسب‌و‌کار",
                subcategories: [
                    {id: 179, title: "پزشکی"},
                    {id: 180, title: "فروشگاه و مغازه"},
                    {id: 181, title: "کافی‌شاپ و رستوران"},
                    {id: 182, title: "آرایشگاه و سالن‌های زیبایی"},
                    {id: 183, title: "دفترکار"},
                ],
            },
            {id: 178, title: "عمده‌فروشی"},
        ],
    },
    {
        id: 184,
        name: "وسایل شخصی",
        title: "وسایل شخصی",
        slug: "personal",
        icon: <Tshirt className="fill-alpha-100"/>,
        subcategories: [
            {
                id: 185,
                title: "کیف، کفش، لباس",
                subcategories: [
                    {id: 191, title: "کیف، کفش، کمربند"},
                    {id: 192, title: "لباس"},
                ],
            },
            {
                id: 186,
                title: "زیورآلات و اکسسوری",
                subcategories: [
                    {id: 193, title: "ساعت"},
                    {id: 194, title: "جواهرات"},
                    {id: 195, title: "بدلیجات"},
                ],
            },
            {id: 187, title: "آرایشی، بهداشتی، درمانی"},
            {id: 188, title: "کفش و لباس بچه"},
            {
                id: 189,
                title: "وسایل بچه و اسباب‌بازی",
                subcategories: [
                    {id: 196, title: "اسباب‌بازی بچه"},
                    {id: 197, title: "کالسفه و لوازم جانبی"},
                    {id: 198, title: "تخت و صندلی بچه"},
                    {id: 199, title: "اسباب و اثاث بچه"},
                ],
            },
            {id: 190, title: "لوازم التحریر"},
        ],
    },
    {
        id: 200,
        name: "ویزا",
        title: "ویزا",
        slug: "visa",
        icon: <Visa className="fill-alpha-100"/>, // You might want to add a visa icon
        subcategories: [],
    },
    {
        id: 201,
        name: "سفریار",
        title: "سفریار",
        slug: "trip",
        icon: <Plane className="fill-alpha-100"/>, // Using plane icon for travel category
        subcategories: [],
    },
];

// You can also export currencies if needed
export const currencies = [
    {id: 1, title: "تومان", code: "IRT"},
    {id: 2, title: "دلار", code: "USD"},
    {id: 3, title: "یورو", code: "EUR"},
];
