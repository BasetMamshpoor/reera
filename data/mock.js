import Home from "../assets/icons/home.svg";
import Car from "../assets/icons/car.svg";
import Mobile from "../assets/icons/mobile.svg";
import Settings from "../assets/icons/settings.svg";
import Sofa from "../assets/icons/sofa.svg";
import Tshirt from "../assets/icons/T-shirt.svg";
import Happy from "../assets/icons/happy.svg";
import Cpu from "../assets/icons/cpu.svg";
import Briefcase from "../assets/icons/briefcase.svg";
export const categories = [
  {
    name: "املاک",
    subcategories: [
      "آپارتمان",
      "خانه و ویلا",
      "زمین و کلنگی",
      "تجاری",
      "اداری و دفتر",
    ],
    icon: <Home />,
  },
  {
    name: "وسیله نقلیه",
    subcategories: [
      "خودرو سواری",
      "موتورسیکلت",
      "قطعات یدکی",
      "لوازم جانبی",
      "قایق و دریایی",
    ],
    icon: <Car />,
  },
  {
    name: "خانه و آشپزخانه",
    subcategories: [
      "لوازم خانگی",
      "مبلمان و دکوراسیون",
      "ظروف و لوازم آشپزخانه",
      "لوازم برقی",
      "فرش و گلیم",
    ],
    icon: <Sofa />,
  },
  {
    name: "خدمات",
    subcategories: [
      "تعمیرات",
      "آموزشی",
      "پزشکی و سلامت",
      "کامپیوتر و IT",
      "حمل و نقل",
    ],
    icon: <Settings />,
  },
  {
    name: "وسایل شخصی",
    subcategories: ["لباس", "кфش", "اکسسوری", "طلا و جواهرات", "عینک و ساعت"],
    icon: <Tshirt />,
  },
  {
    name: "سرگرمی و فراغت",
    subcategories: [
      "ورزش و سفر",
      "کتاب و مجله",
      "آلات موسیقی",
      "اسباب بازی",
      "کلکسیون",
    ],
    icon: <Sofa />,
  },
  {
    name: "اجتماعی",
    subcategories: [
      "رویدادها",
      "داوطلبانه",
      "گروه‌ها و انجمن‌ها",
      "مذهبی",
      "فرهنگی",
    ],
    icon: <Happy />,
  },
  {
    name: "تجهیزات و صنعتی",
    subcategories: [
      "ماشین آلات",
      "ابزار و تجهیزات",
      "مواد اولیه",
      "انبارداری",
      "بسته بندی",
    ],
    icon: <Cpu />,
  },
  {
    name: "کاریابی و استخدام",
    subcategories: [
      "آگهی استخدام",
      "رزومه نویسی",
      "مشاغل فریلنس",
      "کارآموزی",
      "دورکاری",
    ],
    icon: <Briefcase />,
  },
];
