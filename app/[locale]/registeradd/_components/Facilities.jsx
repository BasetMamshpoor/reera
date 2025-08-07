"use client";
import React from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import gregoria_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregoria from "react-date-object/calendars/gregorian";
import DatePicker, { Calendar } from "react-multi-date-picker";
import { useParams } from "next/navigation";
import CalendarIcon from "@/assets/icons/Calendar.svg";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Arrowleft from "@/assets/icons/arrow-left.svg";
const facilities = [
  "اسانسور",
  "پارکینگ",
  "انباری",
  "تراس/بالکن",
  "سرمایشی",
  "گرماشی",
  "آشپزخانه اپن",
  "کابینت",
  "کف سرامیک / پارکت",
  "درب ضد سرقت",
  "پنجره دو جداره",
  "سیستم اعلام و اطفای حریق",
  "نگهبانی 24 ساعته / لابی من",
  "دوربین کدار بسته",
  "ژنراتور برق اضظراری",
  "اتاق مستر",
  "سالن اجتماعات / مهمان خانه",
  "سالن ورزشی / باشگاه اختصاصی",
  "استخر / سونا / جکوزی",
  "اینترنت فیبر نوری / مخابراتی فعال",
];
const residential = [
  "خالی",
  "قابل تحویل از تاریخ",
  "(قابل بازدید)در حال استفاده ",
];
const Facilities = ({ currentStep, setCurrentStep }) => {
  const { locale } = useParams();
  const [selected, setSelected] = React.useState(() => {
    const initial = { همه: false };
    facilities.forEach((cat) => (initial[cat] = false));
    return initial;
  });
  const handleChange = (label) => {
    if (label === "همه") {
      // When "همه" is checked, uncheck all others
      setSelected({
        همه: true,
        ...Object.fromEntries(categories.map((cat) => [cat, false])),
      });
    } else {
      // When any category is toggled, uncheck "همه"
      setSelected((prev) => ({
        ...prev,
        همه: false,
        [label]: !prev[label],
      }));
    }
  };
  return (
    <div className="bg-white px-6 py-10 rounded-lg w-full space-y-4">
      <div className="flex flex-col gap-4">
        <div>
          <h2>امکانات ملک</h2>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-4">
            {[...facilities].map((label) => (
              <div key={label} className="flex flex-row items-center gap-2">
                <Checkbox
                  className={``}
                  checked={selected[label]}
                  onCheckedChange={() => handleChange(label)}
                />
                <Label className={`dark:text-white text-xs`}>{label}</Label>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-4">
            <h2>وضعیت مسکونی</h2>
            <div className="flex felx-row items-center gap-4">
              {[
                residential.map((r) => {
                  return (
                    <div className="flex flex-row gap-2" key={r}>
                      <Checkbox className={``} checked={selected[r]} />
                      <Label className={`dark:text-white text-xs`}>{r}</Label>
                    </div>
                  );
                }),
              ]}
            </div>
          </div>
        </div>
        <div className="relative w-full group">
          <span className="absolute left-2 rtl:right-2 text-gray-400 -translate-y-1/2 top-1/2 group-focus-within:opacity-0">
            تاریخ تحویل
          </span>
          <DatePicker
            containerClassName="custom-container"
            style={{
              padding: "1rem",
            }}
            containerStyle={{
              width: "100%",
            }}
            multiple
            calendar={locale === "en" ? gregoria : persian}
            locale={locale === "en" ? gregoria_en : persian_fa}
            calendarPosition="bottom-right"
          />
          <CalendarIcon className="absolute top-1/2 ltr:right-2 rtl:left-2 -translate-y-1/2  fill-gray-400 dark:fill-white group-focus-within:opacity-0" />
        </div>
        <Textarea
          placeholder="توضیحات"
          className={"rtl:placeholder:text-right focus:placeholder:opacity-0"}
        />
      </div>
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
        >
          انصراف
        </button>
        <button
          onClick={() => setCurrentStep((prev) => prev + 1)}
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-[#4299C1] py-2 lg:w-32  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
          <span>بعدی</span>
          <Arrowleft className="fill-white" />
        </button>
      </div>
    </div>
  );
};

export default Facilities;
