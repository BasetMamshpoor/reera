"use client";
import React, { useContext, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import gregoria_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregoria from "react-date-object/calendars/gregorian";
import DatePicker from "react-multi-date-picker";

import { useParams } from "next/navigation";
import { Textarea } from "@/components/ui/textarea";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import DateObject from "react-date-object";

import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { FormContext } from "../../NewCategorySelector";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { toast } from "sonner";

// map labels to backend keys
const facilityMap = {
  elevator: "elevator",
  parking: "parking",
  storage: "storage",
  balcony: "balcony",
  cooling: "cooling",
  heating: "heating",
  open_kitchen: "open_kitchen",
  cabinets: "cabinets",
  flooring: "flooring",
  security_door: "security_door",
  double_glazed_windows: "double_glazed_windows",
  system: "system",
  security_guard: "security_guard",
  cctv: "cctv",
  generator: "generator",
  master_bedroom: "master_bedroom",
  guest_hall: "guest_hall",
  gym: "gym",
  pool: "pool",
  internet: "internet",
};

// use keys for statuses
const STATUS_KEYS = {
  VACANT: "vacant",
  OCCUPIED: "occupied",
  AVAILABLE_FROM_DATE: "available_from_date",
};

const statusToFieldMap = {
  [STATUS_KEYS.VACANT]: { empty: true, in_use: false, visit_from: null },
  [STATUS_KEYS.OCCUPIED]: { empty: false, in_use: true, visit_from: null },
  [STATUS_KEYS.AVAILABLE_FROM_DATE]: {
    empty: false,
    in_use: false,
    visit_from: true,
  },
};

const schema = z
  .object({
    facilities: z.record(z.string(), z.boolean()).optional(),
    residentialStatus: z.string().min(1, "لطفا وضعیت مسکونی را انتخاب کنید"),
    deliveryDate: z.date().optional().nullable(),
    text: z.string().min(1, "لطفا توضیحات تکمیلی را وارد کنید"),
  })
  .refine(
    (data) => {
      if (data.residentialStatus === STATUS_KEYS.AVAILABLE_FROM_DATE) {
        return data.deliveryDate !== null && data.deliveryDate !== undefined;
      }
      return true;
    },
    {
      message: "تاریخ تحویل را انتخاب کنید",
      path: ["deliveryDate"],
    }
  );

const Facilities = ({
  currentStep,
  setCurrentStep,
  category,
  isEditing,
  adData,
}) => {
  const { locale } = useParams();
  const { apiResponseData } = useContext(FormContext);
  const dic = useTranslation("");
  const f = dic.public.register_ad.facilities;

  // keep facilities & statuses as keys
  const facilities = Object.keys(facilityMap);
  const residential = [
    { key: STATUS_KEYS.VACANT, label: f.vacant },
    { key: STATUS_KEYS.AVAILABLE_FROM_DATE, label: f.available_from_date },
    { key: STATUS_KEYS.OCCUPIED, label: f.currently_occupied },
  ];

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      facilities: {},
      residentialStatus: "",
      deliveryDate: null,
      text: "",
    },
  });
  const FacilitiesMutation = useMutation({
    mutationFn: async (data) => {
      if (!isEditing) {
        await request({
          method: "post",
          url: "/store/housing/third",
          data: data,
        });
      } else {
        await request({
          method: "post",
          url: `/update/housing/third/${adData.first.id}`,
          data: data,
        });
      }
    },
    onSuccess: () => {
      setCurrentStep((prev) => prev + 1);
    },
    onError: (err) => {
      toast.error(`Failed to submit! ${err?.message || err}`);
    },
  });

  const handleFacilityChange = (facilityKey) => {
    const currentFacilities = watch("facilities") || {};
    setValue("facilities", {
      ...currentFacilities,
      [facilityKey]: !currentFacilities[facilityKey],
    });
  };
  useEffect(() => {
    if (isEditing && adData?.third) {
      const third = adData.third;

      // Map numeric flags (0/1) to boolean facilities
      const facilitiesDefault = {};
      Object.keys(facilityMap).forEach((key) => {
        facilitiesDefault[key] = Boolean(third[key]);
      });

      // Determine residential status
      let residentialStatus = "";
      if (third.empty === 1) residentialStatus = STATUS_KEYS.VACANT;
      else if (third.in_use === 1) residentialStatus = STATUS_KEYS.OCCUPIED;
      else if (third.visit_from)
        residentialStatus = STATUS_KEYS.AVAILABLE_FROM_DATE;

      // Convert visit_from to Date if exists
      let deliveryDate = null;
      if (third.visit_from) {
        deliveryDate = new Date(third.visit_from);
      }

      // Apply all defaults to the form
      reset({
        facilities: facilitiesDefault,
        residentialStatus,
        deliveryDate,
        text: third.text || "",
      });
    }
  }, [isEditing, adData, reset]);

  const handleResidentialChange = (statusKey) => {
    setValue("residentialStatus", statusKey);
    if (statusKey !== STATUS_KEYS.AVAILABLE_FROM_DATE) {
      setValue("deliveryDate", null);
    }
  };

  const handleDateChange = (date) => {
    if (date) {
      setValue("deliveryDate", date.toDate());
    } else {
      setValue("deliveryDate", null);
    }
  };

  const onSubmit = (data) => {
    const formData = {
      ad_id: apiResponseData,
    };

    // facilities mapping
    for (const [key, backendKey] of Object.entries(facilityMap)) {
      formData[backendKey] = data.facilities?.[key] || false;
    }

    // status mapping
    const statusFields = statusToFieldMap[data.residentialStatus] || {};
    Object.entries(statusFields).forEach(([key, val]) => {
      if (val !== null) formData[key] = val;
    });

    // date mapping
    if (
      data.residentialStatus === STATUS_KEYS.AVAILABLE_FROM_DATE &&
      data.deliveryDate
    ) {
      const dateObj = new DateObject(data.deliveryDate);
      const gregorianDate = dateObj.convert(gregoria);
      formData.visit_from = gregorianDate.format("YYYY-MM-DD");
    }

    formData.text = data.text || "";

    FacilitiesMutation.mutate(formData);
  };

  const selectedResidentialStatus = watch("residentialStatus");
  const deliveryDate = watch("deliveryDate");
  const requiresDeliveryDate =
    selectedResidentialStatus === STATUS_KEYS.AVAILABLE_FROM_DATE;

  const formatDateForDisplay = (date) => {
    if (!date) return "";
    const dateObj = new DateObject(date);
    if (locale === "fa") {
      dateObj.convert(persian);
      return dateObj.format("YYYY/MM/DD");
    }
    return dateObj.format("YYYY/MM/DD");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg h-160 "
    >
      <div className="flex flex-col gap-4">
        {/* Facilities */}
        <div>
          <span>{f.property_facilities}</span>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-6">
          {facilities.map((key) => (
            <div key={key} className="flex flex-row items-center gap-2">
              <Checkbox
                checked={watch(`facilities.${key}`) || false}
                onCheckedChange={() => handleFacilityChange(key)}
              />
              <Label className="dark:text-white text-xs">
                {f[key]} {/* show translated label */}
              </Label>
            </div>
          ))}
        </div>

        {/* Residential Status */}
        <div className="rtl:justify-end">
          <div className="flex flex-col gap-4">
            <h2>{f.occupancy_status}</h2>
            <RadioGroup
              value={selectedResidentialStatus}
              onValueChange={handleResidentialChange}
              className="flex flex-row items-center gap-4 rtl:justify-end"
            >
              {residential.map(({ key, label }) => (
                <div
                  className="flex flex-row items-center rtl:flex-row-reverse gap-2"
                  key={key}
                >
                  <RadioGroupItem value={key} id={key} />
                  <Label
                    htmlFor={key}
                    className="dark:text-white text-xs cursor-pointer"
                  >
                    {label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            {errors.residentialStatus && (
              <p className="text-red-500 text-sm mt-1">
                {errors.residentialStatus.message}
              </p>
            )}
          </div>
        </div>

        {/* Delivery Date */}
        {requiresDeliveryDate && (
          <div className="flex flex-col gap-2 mt-4">
            <label className="text-sm font-medium dark:text-white">
              {f.delivery_date}
            </label>
            <DatePicker
              multiple={false}
              inputClass="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2D3748] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              containerClassName="w-full"
              style={{ width: "100%" }}
              calendar={locale === "en" ? gregoria : persian}
              locale={locale === "en" ? gregoria_en : persian_fa}
              calendarPosition={
                locale === "fa" ? "bottom-center" : "bottom-right"
              }
              zIndex={1000}
              value={deliveryDate ? new DateObject(deliveryDate) : null}
              onChange={handleDateChange}
              render={(value, openCalendar) => (
                <div className="relative">
                  <input
                    type="text"
                    readOnly
                    value={formatDateForDisplay(value)}
                    onClick={openCalendar}
                    placeholder={f.select_delivery_date}
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-[#2D3748] text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer pr-10"
                  />
                </div>
              )}
            />
            {errors.deliveryDate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.deliveryDate.message}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col gap-4 w-full mt-4">
          <Textarea
            placeholder={f.description}
            className="rtl:placeholder:text-right focus:placeholder:opacity-0"
            {...register("text")}
          />
          {errors.text && (
            <p className="text-red-500 text-sm mt-1">{errors.text.message}</p>
          )}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
        >
          انصراف
        </button>
        <button
          type="submit"
          disabled={FacilitiesMutation.isPending}
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-[#4299C1] py-2 lg:w-32 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {FacilitiesMutation.isPending ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>{f.sending}</span>
            </div>
          ) : (
            <>
              <span>{f.next}</span>
              <Arrowleft className="fill-alphaw-100 ltr:rotate-180" />
            </>
          )}
        </button>
      </div>
    </form>
  );
};

export default Facilities;
