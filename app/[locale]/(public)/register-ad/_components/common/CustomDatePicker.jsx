"use client";

import React from "react";
import DatePicker from "react-multi-date-picker";
import DateObject from "react-date-object";
import gregoria_en from "react-date-object/locales/gregorian_en";
import persian_fa from "react-date-object/locales/persian_fa";
import persian from "react-date-object/calendars/persian";
import gregoria from "react-date-object/calendars/gregorian";
import { useParams } from "next/navigation";
import { cn } from "@/lib/utils";

/**
 * Custom DatePicker Component
 *
 * @param {Object} props
 * @param {Date | string | null} props.value - The current date value
 * @param {function} props.onChange - Callback when date changes
 * @param {string} props.placeholder - Placeholder text
 * @param {boolean} props.multiple - Whether to allow multiple date selection
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.disabled - Whether the datepicker is disabled
 * @param {Object} props.style - Custom styles
 * @param {string} props.calendarPosition - Calendar position (bottom-right, bottom-center, etc.)
 * @param {number} props.zIndex - Z-index for the calendar
 * @param {function} props.render - Custom render function
 */
const CustomDatePicker = ({
  value,
  onChange,
  placeholder = "Select date",
  multiple = false,
  className = "",
  disabled = false,
  style = {},
  calendarPosition,
  zIndex = 1000,
  render,
  ...props
}) => {
  const params = useParams();
  const locale = params.locale || "en";

  // Format date for display
  const formatDateForDisplay = (date) => {
    if (!date) return "";
    const dateObj = new DateObject(date);
    if (locale === "fa") {
      dateObj.convert(persian);
      return dateObj.format("YYYY/MM/DD");
    }
    return dateObj.format("YYYY/MM/DD");
  };

  // Handle date change
  const handleDateChange = (date) => {
    if (onChange) {
      if (date) {
        onChange(date.toDate());
      } else {
        onChange(null);
      }
    }
  };

  // Default render function
  const defaultRender = (value, openCalendar) => (
    <div className="relative">
      <input
        type="text"
        readOnly
        value={formatDateForDisplay(value)}
        onClick={openCalendar}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg",
          "bg-white dark:bg-[#2D3748] text-gray-900 dark:text-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          "cursor-pointer pr-10",
          disabled && "opacity-50 cursor-not-allowed",
          className
        )}
        style={style}
      />
    </div>
  );

  return (
    <div className="w-full">
      <DatePicker
        multiple={multiple}
        inputClass={cn(
          "w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg",
          "bg-white dark:bg-[#2D3748] text-gray-900 dark:text-white",
          "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
          disabled && "opacity-50 cursor-not-allowed"
        )}
        containerClassName="w-full"
        style={{
          width: "100%",
          ...style,
        }}
        calendar={locale === "en" ? gregoria : persian}
        locale={locale === "en" ? gregoria_en : persian_fa}
        calendarPosition={
          calendarPosition ||
          (locale === "fa" ? "bottom-center" : "bottom-right")
        }
        zIndex={zIndex}
        value={value ? new DateObject(value) : null}
        onChange={handleDateChange}
        disabled={disabled}
        render={render || defaultRender}
        {...props}
      />
    </div>
  );
};

export default CustomDatePicker;
