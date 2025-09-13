import React from "react";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
const HiringHistory = () => {
  return (
    <>
      {/* mobile */}
      <div
        className={`flex md:hidden flex-col w-full bg-[#fff]  border-[1px] rounded-2xl border-gray-200 dark:bg-[#252C36] dark:border-[#374151] mt-10`}
      >
        <div
          className={`flex flex-row items-center w-full justify-around border-b-[2px] border-b-gray-200 gap-12 py-4 dark:border-[#374151]`}
        >
          <h2>نام آگهی استخدام</h2>
          <h2>وضعیت</h2>
        </div>
        <Accordion
          type="single"
          collapsible
          className="w-full "
          defaultValue="item-1"
        >
          <AccordionItem value="item-1">
            <AccordionTrigger
              className={`flex flex-row items-center justify-center gap-12 xl:justify-between`}
            >
              <div
                className={`py-1 px-2 max-w-38 bg-[#DCFCE8] text-[#16A34A] rounded-md`}
              >
                فرد موردنظر استخدام‌شده
              </div>
              <div className={``}>استخدام فرانت‌اند دولوپر</div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col text-balance text-right ">
              <div className={`flex flex-col gap-4 px-14 py-2`}>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>نوع همکاری</h2>
                  <span className={`font-[500]`}>حضوری</span>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>حقوق</h2>
                  <span className={`font-[500]`}>20.000.000 تومان</span>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>تاریخ</h2>
                  <span>1403/02/29</span>
                </div>
                <div className={`flex flex-col gap-2 justify-end items-end`}>
                  <h2 className={`text-gray-400`}>وضعیت</h2>
                  <div
                    className={`py-1 px-2 w-full max-w-52 flex items-center justify-center bg-[#DCFCE8] text-[#16A34A] rounded-md`}
                  >
                    <span>فرد موردنظر استخدام‌شده است</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger
              className={`flex flex-row items-center justify-around `}
            >
              <div
                className={`py-1 px-2 max-w-38 bg-[#DCFCE8] text-[#16A34A] rounded-md`}
              >
                فرد موردنظر استخدام‌شده
              </div>
              <div className={``}>استخدام فرانت‌اند دولوپر</div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col text-balance text-right ">
              <div className={`flex flex-col gap-4 px-14 py-2`}>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>نوع همکاری</h2>
                  <span className={`font-[500]`}>حضوری</span>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>حقوق</h2>
                  <span className={`font-[500]`}>20.000.000 تومان</span>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>تاریخ</h2>
                  <span>1403/02/29</span>
                </div>
                <div className={`flex flex-col gap-2 justify-end items-end`}>
                  <h2 className={`text-gray-400`}>وضعیت</h2>
                  <div
                    className={`py-1 px-2 w-full max-w-52 flex items-center justify-center bg-[#DCFCE8] text-[#16A34A] rounded-md`}
                  >
                    <span>فرد موردنظر استخدام‌شده است</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger
              className={`flex flex-row items-center justify-around `}
            >
              <div
                className={`py-1 px-2 max-w-38 bg-[#DCFCE8] text-[#16A34A] rounded-md`}
              >
                فرد موردنظر استخدام‌شده
              </div>
              <div className={``}>استخدام فرانت‌اند دولوپر</div>
            </AccordionTrigger>
            <AccordionContent className="flex flex-col text-balance text-right ">
              <div className={`flex flex-col gap-4 px-14 py-2`}>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>نوع همکاری</h2>
                  <span className={`font-[500]`}>حضوری</span>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>حقوق</h2>
                  <span className={`font-[500]`}>20.000.000 تومان</span>
                </div>
                <div className={`flex flex-col gap-2`}>
                  <h2 className={`text-gray-400`}>تاریخ</h2>
                  <span>1403/02/29</span>
                </div>
                <div className={`flex flex-col gap-2 justify-end items-end`}>
                  <h2 className={`text-gray-400`}>وضعیت</h2>
                  <div
                    className={`py-1 px-2 w-full max-w-52 flex items-center justify-center bg-[#DCFCE8] text-[#16A34A] rounded-md`}
                  >
                    <span>فرد موردنظر استخدام‌شده است</span>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {/* desktop */}

      <div className={`h-12`}></div>

      <div className="hidden md:block w-full border-[1px] border-[#D1D5DB] rounded-t-2xl">
        {/* Header */}
        <div className="flex flex-row rtl:flex-row-reverse bg-[#D9EDF4] dark:bg-[#263F53] py-2 font-semibold text-center rounded-t-2xl border-b-[1px] border-[#D1D5DB] dark:border-b-[#FFFFFF]">
          <div className="flex-1 py-2">نام آگهی استخدام</div>
          <div className="flex-1 py-2">نوع همکاری</div>
          <div className="flex-1 py-2">حقوق</div>
          <div className="flex-1 py-2">تاریخ</div>
          <div className="flex-1 py-2">وضعیت</div>
        </div>

        {/* Row */}
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="flex flex-row rtl:flex-row-reverse items-center py-4 border-b dark:border-gray-700 dark:bg-[#252C36]"
          >
            <div className="flex-1 flex flex-row rtl:flex-row-reverse items-center justify-center gap-4 text-center">
              <Image
                src="/images/hiring-history-prof.png"
                alt=""
                width={40}
                height={40}
              />
              <span>استخدام فرانت‌اند دولوپر</span>
            </div>
            <div className="flex-1 text-center">حضوری</div>
            <div className="flex-1 text-center">20.000.000 تومان</div>
            <div className="flex-1 text-center">1404/02/29</div>

            <div className="flex-1 flex justify-center">
              <div className="py-1 px-2 bg-[#DCFCE8] text-[#16A34A] rounded-md whitespace-nowrap">
                فرد موردنظر استخدام‌شده
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default HiringHistory;
