"use client";
import { useDirection } from "@/hooks/useDirection";
import React from "react";

const InformationContent = () => {
  const dir = useDirection();

  return (
    <>
      <div
        className={`bg-[#fff] border-gray-200 dark:bg-[#252C36] dark:border-[#374151] border-[1px] mt-10 flex flex-col  gap-4 py-6 px-8 rounded-2xl rtl:items-end`}
      >
        <h2>اطلاعات</h2>
        <div dir={dir} className="grid grid-cols-3 gap-y-8 gap-x-12">
          {/* First item - will always be first */}
          <div className="flex flex-row gap-2  ">
            <h2>دسته‌بندی شغلی شرکت:</h2>
            <span>اداری و مدیریت</span>
          </div>

          {/* Second item - position changes based on direction */}
          <div className="flex flex-row gap-2  ">
            <h2>نوع همکاری:</h2>
            <span>حضوری</span>
          </div>

          {/* Third item - position changes based on direction */}
          <div className="flex flex-row gap-2  ">
            <h2>زبان:</h2>
            <span>انگلیسی</span>
          </div>

          {/* Fourth item - will always be in the first column of second row */}
          <div className="flex flex-row gap-2  ">
            <h2>روزهای کاری:</h2>
            <span>شنبه تا چهارشنبه</span>
          </div>

          {/* Fifth item - position changes based on direction */}
          <div className="flex flex-row gap-2 ">
            <h2>ساعت کاری:</h2>
            <span>شنبه تا چهارشنبه</span>
          </div>
        </div>
        <div className="flex flex-row gap-2">
          <h2>آدرس:</h2>
          <span>تهران، اتوبان لشگری، ایستگاه بیمه، کارخانه نوآوری آرادی</span>
        </div>
        <div className="flex flex-row gap-2">
          <h2>توضیحات:</h2>
          <span>دارای بیمه، صبحانه و ناهار، ساعت کاری منعطف، </span>
        </div>
      </div>
    </>
  );
};

export default InformationContent;
