// Real immigration pathways data

interface PathwayTemplate {
  id: string;
  title: string;
  country: string;
  baseSuccessRate: number;
  cost: string;
  duration: string;
  requirements: string[];
  documents: string[];
  timeline: { step: string; duration: string }[];
  nextSteps: string[];
  officialLinks: { title: string; url: string }[];
  difficulty: 'آسان' | 'متوسط' | 'سخت';
  pros: string[];
  cons: string[];
  conditions: {
    minAge?: number;
    maxAge?: number;
    minEducation?: string[];
    minBudget?: string[];
    minWorkExp?: number;
    languages?: string[];
    countries?: string[];
    goals?: string[];
  };
}

export const pathwayTemplates: PathwayTemplate[] = [
  // Germany Job Seeker Visa
  {
    id: 'germany_jobseeker',
    title: 'ویزای جستجوی کار آلمان',
    country: 'آلمان',
    baseSuccessRate: 85,
    cost: '5,000 - 8,000 یورو',
    duration: '8-12 ماه',
    requirements: [
      'مدرک دانشگاهی معتبر (لیسانس یا بالاتر)',
      'سابقه کار مرتبط حداقل 5 سال',
      'مدرک زبان آلمانی B1 یا انگلیسی B2',
      'اثبات توان مالی 6 ماه (حدود 5,000 یورو)'
    ],
    documents: [
      'مدرک دانشگاهی ترجمه شده و تأیید شده',
      'CV به زبان آلمانی یا انگلیسی',
      'گواهی سابقه کار',
      'بیمه سفر',
      'اثبات توان مالی (حساب بانکی مسدود)',
      'رزرو اقامتگاه'
    ],
    timeline: [
      { step: 'تهیه مدارک و ترجمه', duration: '2-3 هفته' },
      { step: 'آزمون زبان (در صورت نیاز)', duration: '1-2 ماه' },
      { step: 'باز کردن حساب مسدود', duration: '1-2 هفته' },
      { step: 'وقت سفارت', duration: '2-4 هفته' },
      { step: 'بررسی ویزا', duration: '4-8 هفته' },
      { step: 'جستجوی کار در آلمان', duration: '6 ماه' }
    ],
    nextSteps: [
      'ترجمه و تأیید مدارک تحصیلی از وزارت امور خارجه',
      'یادگیری زبان آلمانی یا بهبود انگلیسی',
      'باز کردن حساب بانکی مسدود (Blocked Account)',
      'تهیه CV آلمانی استاندارد و بهینه‌سازی LinkedIn'
    ],
    officialLinks: [
      { title: 'سفارت آلمان - ویزای جستجوی کار', url: 'https://teheran.diplo.de/ir-fa/service/-/2211286' },
      { title: 'Make it in Germany', url: 'https://www.make-it-in-germany.com' }
    ],
    difficulty: 'متوسط',
    pros: [
      'مدت زمان کوتاه نسبت به روش‌های دیگر',
      'امکان تبدیل به ویزای کاری با یافتن شغل',
      'هزینه نسبتاً مناسب',
      'بازار کار قوی آلمان'
    ],
    cons: [
      'نیاز به زبان آلمانی یا انگلیسی قوی',
      'فقط 6 ماه فرصت برای یافتن کار',
      'نیاز به مدرک دانشگاهی معتبر'
    ],
    conditions: {
      minEducation: ['کارشناسی', 'کارشناسی‌ارشد', 'دکتری'],
      minWorkExp: 5,
      minBudget: ['متوسط', 'بالا', 'خیلی‌بالا'],
      countries: ['آلمان', 'نمی‌دانم / باز هستم'],
      goals: ['کار', 'زندگی بهتر']
    }
  },

  // Germany Ausbildung
  {
    id: 'germany_ausbildung',
    title: 'آوسبیلدونگ آلمان (آموزش حرفه‌ای)',
    country: 'آلمان',
    baseSuccessRate: 92,
    cost: '3,000 - 5,000 یورو',
    duration: '6-9 ماه (تا اخذ ویزا)',
    requirements: [
      'سن بین 18 تا 35 سال',
      'حداقل دیپلم',
      'زبان آلمانی B1',
      'قرارداد Ausbildung از شرکت آلمانی'
    ],
    documents: [
      'گواهی زبان آلمانی B1',
      'مدرک تحصیلی (حداقل دیپلم)',
      'قرارداد Ausbildung',
      'اثبات توان مالی',
      'سوابق تحصیلی و کاری'
    ],
    timeline: [
      { step: 'یادگیری زبان آلمانی تا B1', duration: '4-8 ماه' },
      { step: 'جستجو و پیدا کردن Ausbildung', duration: '2-4 ماه' },
      { step: 'تهیه مدارک', duration: '2-3 هفته' },
      { step: 'درخواست ویزا', duration: '6-12 هفته' }
    ],
    nextSteps: [
      'شروع آموزش زبان آلمانی با هدف B1',
      'جستجو در سایت‌های Ausbildung.de و Arbeitsagentur',
      'تهیه CV و Motivation Letter به آلمانی',
      'درخواست به چندین شرکت'
    ],
    officialLinks: [
      { title: 'Ausbildung.de', url: 'https://www.ausbildung.de' },
      { title: 'سفارت آلمان', url: 'https://teheran.diplo.de' },
      { title: 'Arbeitsagentur', url: 'https://www.arbeitsagentur.de' }
    ],
    difficulty: 'آسان',
    pros: [
      'حقوق دریافت می‌کنید (800-1,200 یورو/ماه)',
      'هزینه کم',
      'درصد قبولی بالا',
      'مسیر مطمئن برای اقامت دائم',
      'یادگیری حرفه عملی'
    ],
    cons: [
      'نیاز به زبان آلمانی قوی',
      'مدت Ausbildung 2-3.5 سال',
      'محدودیت سنی'
    ],
    conditions: {
      maxAge: 35,
      minEducation: ['دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی‌ارشد', 'دکتری'],
      minBudget: ['کم', 'متوسط', 'بالا', 'خیلی‌بالا'],
      countries: ['آلمان', 'نمی‌دانم / باز هستم'],
      goals: ['کار', 'تحصیل', 'زندگی بهتر']
    }
  },

  // Portugal Startup Visa
  {
    id: 'portugal_startup',
    title: 'ویزای استارت‌آپ پرتغال',
    country: 'پرتغال',
    baseSuccessRate: 70,
    cost: '10,000 - 20,000 یورو',
    duration: '6-12 ماه',
    requirements: [
      'ایده کسب‌وکار نوآورانه',
      'تأیید از یکی از اینکوبیتورهای معتبر پرتغال',
      'سرمایه اولیه (حداقل 5,000 یورو)',
      'مدرک زبان انگلیسی یا پرتغالی'
    ],
    documents: [
      'طرح کسب‌وکار (Business Plan)',
      'نامه تأیید از اینکوبیتور',
      'اثبات سرمایه',
      'CV تیم',
      'سوابق کاری و تحصیلی'
    ],
    timeline: [
      { step: 'تهیه Business Plan', duration: '1-2 ماه' },
      { step: 'ارسال به اینکوبیتورها', duration: '1-2 ماه' },
      { step: 'دریافت تأیید', duration: '2-3 ماه' },
      { step: 'درخواست ویزا', duration: '2-4 ماه' }
    ],
    nextSteps: [
      'تحقیق درباره اکوسیستم استارت‌آپ پرتغال',
      'تهیه Business Plan حرفه‌ای',
      'شناسایی اینکوبیتورهای مناسب',
      'شبکه‌سازی با کارآفرینان پرتغالی'
    ],
    officialLinks: [
      { title: 'Startup Portugal', url: 'https://startupportugal.com' },
      { title: 'IAPMEI', url: 'https://www.iapmei.pt' },
      { title: 'Portugal Startup Visa', url: 'https://www.startupportugal.com/startup-visa' }
    ],
    difficulty: 'سخت',
    pros: [
      'مسیر سریع برای اقامت دائم (5 سال)',
      'هزینه زندگی پایین در اروپا',
      'دسترسی به بازار اتحادیه اروپا',
      'اجتماع استارت‌آپی فعال'
    ],
    cons: [
      'نیاز به ایده نوآورانه و قابل اجرا',
      'رقابت برای تأیید از اینکوبیتور',
      'عدم قطعیت موفقیت کسب‌وکار'
    ],
    conditions: {
      minEducation: ['کارشناسی', 'کارشناسی‌ارشد', 'دکتری'],
      minBudget: ['متوسط', 'بالا', 'خیلی‌بالا'],
      minWorkExp: 2,
      countries: ['نمی‌دانم / باز هستم'],
      goals: ['سرمایه‌گذاری', 'کار', 'زندگی بهتر']
    }
  },

  // Canada Express Entry
  {
    id: 'canada_express_entry',
    title: 'اکسپرس اینتری کانادا',
    country: 'کانادا',
    baseSuccessRate: 75,
    cost: '5,000 - 12,000 دلار کانادا',
    duration: '12-18 ماه',
    requirements: [
      'مدرک دانشگاهی',
      'سابقه کار حرفه‌ای (حداقل 1 سال)',
      'IELTS یا CELPIP (حداقل CLB 7)',
      'امتیاز CRS بالا (حداقل 470+)'
    ],
    documents: [
      'ECA (ارزیابی مدرک تحصیلی)',
      'مدرک زبان (IELTS)',
      'گواهی سوابق کاری',
      'گواهی پلیس',
      'معاینات پزشکی'
    ],
    timeline: [
      { step: 'آزمون زبان و ECA', duration: '2-3 ماه' },
      { step: 'ایجاد پروفایل Express Entry', duration: '1 هفته' },
      { step: 'دریافت دعوتنامه (ITA)', duration: '6-12 ماه' },
      { step: 'تکمیل درخواست', duration: '60 روز' },
      { step: 'پردازش ویزا', duration: '6 ماه' }
    ],
    nextSteps: [
      'محاسبه امتیاز CRS در سایت رسمی',
      'آزمون IELTS با هدف حداقل 8777',
      'ارزیابی مدرک از WES یا IQAS',
      'بهبود امتیاز (زبان دوم، تجربه کانادا، تحصیلات بیشتر)'
    ],
    officialLinks: [
      { title: 'Express Entry کانادا', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/immigrate-canada/express-entry.html' },
      { title: 'محاسبه CRS', url: 'https://www.cic.gc.ca/english/immigrate/skilled/crs-tool.asp' },
      { title: 'WES', url: 'https://www.wes.org' }
    ],
    difficulty: 'سخت',
    pros: [
      'مسیر مستقیم اقامت دائم',
      'بدون نیاز به Job Offer',
      'کیفیت زندگی بالا',
      'حمایت از مهاجران'
    ],
    cons: [
      'امتیاز CRS بالا مورد نیاز',
      'رقابت شدید',
      'نیاز به زبان انگلیسی قوی',
      'فرایند طولانی'
    ],
    conditions: {
      maxAge: 45,
      minEducation: ['کاردانی', 'کارشناسی', 'کارشناسی‌ارشد', 'دکتری'],
      minWorkExp: 1,
      minBudget: ['متوسط', 'بالا', 'خیلی‌بالا'],
      languages: ['IELTS', 'TOEFL'],
      countries: ['کانادا', 'نمی‌دانم / باز هستم'],
      goals: ['کار', 'زندگی بهتر']
    }
  },

  // Austria Red-White-Red Card
  {
    id: 'austria_rwr',
    title: 'کارت قرمز-سفید-قرمز اتریش',
    country: 'اتریش',
    baseSuccessRate: 65,
    cost: '8,000 - 15,000 یورو',
    duration: '9-15 ماه',
    requirements: [
      'مدرک دانشگاهی معتبر',
      'سابقه کار مرتبط (حداقل 5 سال)',
      'زبان آلمانی A1 یا انگلیسی B1',
      'امتیاز کافی در سیستم امتیازی (حداقل 70)'
    ],
    documents: [
      'مدرک تحصیلی تأیید شده',
      'گواهی سوابق کاری',
      'مدرک زبان',
      'CV',
      'اثبات توان مالی'
    ],
    timeline: [
      { step: 'محاسبه امتیاز', duration: '1 هفته' },
      { step: 'تهیه و تأیید مدارک', duration: '2-3 ماه' },
      { step: 'یادگیری زبان', duration: '2-4 ماه' },
      { step: 'درخواست ویزا', duration: '4-6 ماه' }
    ],
    nextSteps: [
      'محاسبه امتیاز در سیستم RWR Card',
      'شروع دوره زبان آلمانی',
      'ترجمه و تأیید مدارک رسمی',
      'مشاوره با وکیل مهاجرت اتریش'
    ],
    officialLinks: [
      { title: 'Migration Austria', url: 'https://www.migration.gv.at' },
      { title: 'RWR Card Calculator', url: 'https://www.migration.gv.at/en/types-of-immigration/permanent-immigration/skilled-workers-in-shortage-occupations/' }
    ],
    difficulty: 'سخت',
    pros: [
      'مسیر بدون نیاز به Job Offer',
      'کیفیت زندگی بسیار بالا',
      'دسترسی به بازار کار اتحادیه اروپا',
      'سیستم آموزشی و بهداشتی عالی'
    ],
    cons: [
      'امتیازدهی سخت‌گیرانه',
      'نیاز به زبان آلمانی',
      'هزینه زندگی بالا',
      'کوتا سالانه محدود'
    ],
    conditions: {
      maxAge: 45,
      minEducation: ['کارشناسی', 'کارشناسی‌ارشد', 'دکتری'],
      minWorkExp: 5,
      minBudget: ['بالا', 'خیلی‌بالا'],
      countries: ['اتریش', 'آلمان', 'نمی‌دانم / باز هستم'],
      goals: ['کار', 'زندگی بهتر']
    }
  },

  // Australia Skilled Migration
  {
    id: 'australia_skilled',
    title: 'مهاجرت مهارت‌محور استرالیا',
    country: 'استرالیا',
    baseSuccessRate: 70,
    cost: '8,000 - 15,000 دلار استرالیا',
    duration: '12-24 ماه',
    requirements: [
      'شغل در لیست SOL',
      'Skills Assessment مثبت',
      'IELTS حداقل 6 در هر مهارت',
      'سن زیر 45 سال',
      'امتیاز حداقل 65'
    ],
    documents: [
      'Skills Assessment',
      'IELTS',
      'مدارک تحصیلی',
      'سوابق کاری',
      'معاینات پزشکی',
      'گواهی پلیس'
    ],
    timeline: [
      { step: 'بررسی لیست SOL', duration: '1 هفته' },
      { step: 'Skills Assessment', duration: '3-4 ماه' },
      { step: 'آزمون IELTS', duration: '1-2 ماه' },
      { step: 'ثبت EOI', duration: '1 هفته' },
      { step: 'دریافت دعوتنامه', duration: '6-12 ماه' },
      { step: 'درخواست ویزا', duration: '6-9 ماه' }
    ],
    nextSteps: [
      'بررسی شغل در Skilled Occupation List',
      'محاسبه امتیاز SkillSelect',
      'دریافت Skills Assessment',
      'آزمون IELTS با هدف نمره بالا'
    ],
    officialLinks: [
      { title: 'Department of Home Affairs', url: 'https://immi.homeaffairs.gov.au' },
      { title: 'Skilled Occupation Lists', url: 'https://immi.homeaffairs.gov.au/visas/working-in-australia/skill-occupation-list' },
      { title: 'SkillSelect', url: 'https://www.homeaffairs.gov.au/skillselect' }
    ],
    difficulty: 'سخت',
    pros: [
      'اقتصاد قوی و حقوق بالا',
      'کیفیت زندگی عالی',
      'هوای پاک و طبیعت زیبا',
      'مسیر واضح اقامت دائم'
    ],
    cons: [
      'فرایند طولانی و پیچیده',
      'هزینه بالا',
      'فاصله زیاد از ایران',
      'رقابت شدید'
    ],
    conditions: {
      maxAge: 44,
      minEducation: ['کارشناسی', 'کارشناسی‌ارشد', 'دکتری'],
      minWorkExp: 3,
      minBudget: ['بالا', 'خیلی‌بالا'],
      languages: ['IELTS'],
      countries: ['استرالیا', 'نمی‌دانم / باز هستم'],
      goals: ['کار', 'زندگی بهتر']
    }
  },

  // Study Visa (General)
  {
    id: 'study_general',
    title: 'ویزای تحصیلی',
    country: 'کانادا/آلمان/استرالیا',
    baseSuccessRate: 80,
    cost: '10,000 - 50,000 دلار (سالانه)',
    duration: '6-12 ماه (تا اخذ ویزا)',
    requirements: [
      'پذیرش از دانشگاه معتبر',
      'مدرک زبان (IELTS/TOEFL/Duolingo)',
      'اثبات توان مالی',
      'مدارک تحصیلی قبلی'
    ],
    documents: [
      'Letter of Acceptance',
      'مدرک زبان',
      'مدارک تحصیلی',
      'اثبات توان مالی',
      'SOP (Statement of Purpose)',
      'توصیه‌نامه‌ها'
    ],
    timeline: [
      { step: 'آزمون زبان', duration: '1-3 ماه' },
      { step: 'انتخاب دانشگاه و رشته', duration: '1-2 ماه' },
      { step: 'Apply به دانشگاه‌ها', duration: '2-4 ماه' },
      { step: 'دریافت پذیرش', duration: '2-3 ماه' },
      { step: 'درخواست ویزا', duration: '1-3 ماه' }
    ],
    nextSteps: [
      'تعیین کشور، دانشگاه و رشته مورد علاقه',
      'آزمون IELTS یا TOEFL',
      'تهیه SOP و توصیه‌نامه‌ها',
      'Apply به 5-8 دانشگاه'
    ],
    officialLinks: [
      { title: 'Study in Canada', url: 'https://www.canada.ca/en/immigration-refugees-citizenship/services/study-canada.html' },
      { title: 'DAAD (Germany)', url: 'https://www.daad.de' },
      { title: 'Study Australia', url: 'https://www.studyaustralia.gov.au' }
    ],
    difficulty: 'متوسط',
    pros: [
      'امکان کار پاره‌وقت در حین تحصیل',
      'Work Permit پس از فارغ‌التحصیلی',
      'مسیر به سمت اقامت دائم',
      'کسب مدرک بین‌المللی'
    ],
    cons: [
      'هزینه بالای تحصیل',
      'نیاز به منابع مالی قابل توجه',
      'محدودیت کار (20 ساعت/هفته)',
      'رقابت برای پذیرش'
    ],
    conditions: {
      maxAge: 35,
      minEducation: ['دیپلم', 'کاردانی', 'کارشناسی', 'کارشناسی‌ارشد', 'دکتری'],
      minBudget: ['متوسط', 'بالا', 'خیلی‌بالا'],
      goals: ['تحصیل', 'زندگی بهتر']
    }
  }
];
