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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DateObject from "react-date-object";
import { Button } from "@/components/ui/button";
// import { Calendar } from "@/components/ui/calendar";
import Arrowdown from "@/assets/icons/arrow-down.svg";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { PersionCalendar } from "@/components/ui/persioncalendar";
const facilityMap = {
  آسانسور: "elevator",
  پارکینگ: "parking",
  انباری: "storage",
  "تراس/بالکن": "balcony",
  سرمایشی: "cooling",
  گرماشی: "heating",
  "آشپزخانه اپن": "open_kitchen",
  کابینت: "cabinets",
  "کف سرامیک / پارکت": "flooring",
  "درب ضد سرقت": "security_door",
  "پنجره دو جداره": "double_glazed_windows",
  "سیستم اعلام و اطفای حریق": "system",
  "نگهبانی 24 ساعته / لابی من": "security_guard",
  "دوربین کدار بسته": "cctv",
  "ژنراتور برق اضظراری": "generator",
  "اتاق مستر": "master_bedroom",
  "سالن اجتماعات / مهمان خانه": "guest_hall",
  "سالن ورزشی / باشگاه اختصاصی": "gym",
  "استخر / سونا / جکوزی": "pool",
  "اینترنت فیبر نوری / مخابراتی فعال": "internet",
};
const statusToFieldMap = {
  خالی: { empty: true, in_use: false, visit_from: null },
  "(قابل بازدید)در حال استفاده ": {
    empty: false,
    in_use: true,
    visit_from: null,
  },
  "قابل تحویل از تاریخ": {
    empty: false,
    in_use: false,
    visit_from: true, // we'll use this as a flag to include the delivery date
  },
};
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
  "دوربین مدار بسته",
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

// Create Zod schema
const schema = z.object({
  facilities: z.record(z.string(), z.boolean()).optional(),
  residentialStatus: z.string().min(1, "لطفا وضعیت مسکونی را انتخاب کنید"),
  deliveryDates: z.array(z.date()).min(1, "تاریخ تحویل را انتخاب کنید"),
  description: z.string().min(1, "لطفا توضیحات تکمیلی را وارد کنید"),
});

const Facilities = ({ currentStep, setCurrentStep }) => {
  const [open, setOpen] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const { locale } = useParams();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      facilities: {},
      residentialStatus: "",
      deliveryDates: [],
      description: "",
    },
  });

  // Handle checkbox changes
  const handleFacilityChange = (facility) => {
    const currentFacilities = watch("facilities") || {};
    setValue("facilities", {
      ...currentFacilities,
      [facility]: !currentFacilities[facility],
    });
  };

  // Handle residential status change
  const handleResidentialChange = (status) => {
    setValue("residentialStatus", status);
  };

  // Handle date picker change
  const handleDateChange = (dates) => {
    setValue(
      "deliveryDates",
      dates.map((date) => date.toDate())
    );
  };

  const onSubmit = (data) => {
    const formData = {
      ad_id: 12,
    };

    for (const [persianLabel, engKey] of Object.entries(facilityMap)) {
      formData[engKey] = data.facilities?.[persianLabel] || false;
    }

    const statusFields = statusToFieldMap[data.residentialStatus] || {};
    Object.entries(statusFields).forEach(([key, val]) => {
      if (val !== null) {
        formData[key] = val;
      }
    });

    if (
      data.residentialStatus === "قابل تحویل از تاریخ" &&
      data.deliveryDates.length > 0
    ) {
      const dateObj = new DateObject(data.deliveryDates[0]);
      formData.visit_from = dateObj.convert(persian).format("YYYY-MM-DD");
    }

    formData.text = data.description || "";

    console.log("✅ Final data to send to backend:", formData);

    setCurrentStep((prev) => prev + 1);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-[#252C36] px-6 py-10 rounded-lg w-full space-y-4"
    >
      <div className="flex flex-col gap-4">
        <div>
          <h2>امکانات ملک</h2>
        </div>
        <div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
            {facilities.map((label) => (
              <div key={label} className="flex flex-row items-center gap-2">
                <Checkbox
                  checked={watch(`facilities.${label}`) || false}
                  onCheckedChange={() => handleFacilityChange(label)}
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
              {residential.map((status) => (
                <div className="flex flex-row gap-2" key={status}>
                  <Checkbox
                    checked={watch("residentialStatus") === status}
                    onCheckedChange={() => handleResidentialChange(status)}
                  />
                  <Label className={`dark:text-white text-xs`}>{status}</Label>
                </div>
              ))}
            </div>
            {errors.residentialStatus && (
              <p className="text-red-500 text-sm mt-1">
                {errors.residentialStatus.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-4">
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
              value={watch("deliveryDates")}
              onChange={handleDateChange}
            />
            <CalendarIcon className="absolute top-1/2 ltr:right-2 rtl:left-2 -translate-y-1/2  fill-gray-400 dark:fill-white group-focus-within:opacity-0" />
          </div>
          {/* shadcn */}
          {/* <div className="flex flex-col gap-3">
            <Label htmlFor="date" className="px-1">
              تاریخ تحویل
            </Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  id="date"
                  className="w-full justify-between font-normal"
                >
                  {date
                    ? new DateObject({
                        date,
                        calendar: persian,
                        locale: persian_fa,
                      }).format("YYYY/MM/DD")
                    : "تاریخ را انتخاب کنید"}
                  <Arrowdown className="dark:fill-white" />
                </Button>
              </PopoverTrigger>
              <PopoverContent
                className="w-auto overflow-hidden p-0"
                align="start"
              >
                <PersionCalendar
                  mode="single"
                  selected={date}
                  captionLayout="dropdown"
                  onSelect={(selectedDate) => {
                    setDate(selectedDate);
                    setValue("deliveryDates", [selectedDate]);
                    setOpen(false);
                  }}
                />
              </PopoverContent>
            </Popover>
          </div> */}
          {errors.deliveryDates && (
            <p className="text-red-500 text-sm mt-1">
              {errors.deliveryDates.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-4 w-full mt-4">
          <Textarea
            placeholder="توضیحات"
            className={"rtl:placeholder:text-right focus:placeholder:opacity-0"}
            {...register("description")}
          />
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-[#4299C1] py-2 lg:w-32  rounded-lg"
        >
          <span>بعدی</span>
          <Arrowleft className="fill-white ltr:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default Facilities;
