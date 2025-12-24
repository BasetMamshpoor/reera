"use client";
import React, { useState } from "react";
import Image from "next/image";
import Profile_circle from "@/assets/icons/profile.svg";
import Arrow from "@/assets/icons/arrow-down.svg";
const ChatSidebar = ({ a }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <div className="w-full">
        <div className="relative hidden lg:flex flex-col items-center gap-4 lg:justify-between w-full h-full p-4 lg:p-6 bg-Primary-100 rounded-xl">
          <div className="absolute top-0 bottom-0 right-0 left-0">
            <Image
              src={"/images/Lines.png"}
              alt="lines"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col items-center gap-4 lg:gap-10 w-full">
            <div className="flex lg:flex-col items-center gap-2">
              <Profile_circle className="fill-Gray-700 w-10 h-10 lg:!w-16 lg:!h-16" />
              {/*<div className="border-3 border-Gray-800 rounded-full w-10 h-10 lg:w-16 lg:h-16 p-1">*/}
              {/*    <Image src={User} alt="user" width={100} height={100} className="w-full h-full"/>*/}
              {/*</div>*/}
              <div className="flex items-center gap-2 pt-1 lg:pt-0">
                <p className="text-sm text-Gray-800">{a.support}</p>
                <p className="text-sm text-Primary-400 font-bold">
                  نیکی میزانی
                </p>
              </div>
            </div>
            <div className="flex flex-col items-center gap-6 w-full">
              <p className="hidden lg:flex text-lg text-Primary-400 font-bold">
                {a.ticket_info}
              </p>
              <div className="flex flex-col gap-2 w-full">
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">
                    {a.ticket_title}
                  </p>
                  <p className="text-xs lg:text-sm text-secondary font-medium">
                    تیکت به پشتیبانی
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">
                    {a.ticket_created_at}
                  </p>
                  <p className="text-xs lg:text-sm text-secondary font-medium">
                    ۱۴۰۳/۰۱/۲۳
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">
                    {a.ticket_last_update}
                  </p>
                  <p className="text-xs lg:text-sm text-secondary font-medium">
                    ۲ ساعت پیش
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">
                    {a.ticket_last_reply_by}
                  </p>
                  <p className="text-xs lg:text-sm text-secondary font-medium">
                    نیکی میزانی
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">
                    {a.total_replies}
                  </p>
                  <p className="text-xs lg:text-sm text-secondary font-medium">
                    2
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">
                    {a.ticket_department}
                  </p>
                  <p className="text-xs lg:text-sm text-secondary font-medium">
                    اصلاحیه وجه
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">{a.status}</p>
                  <p className="text-xs lg:text-sm text-success-main font-medium">
                    پاسخ داده شده
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 lg:gap-6 w-full">
            <div className="flex flex-col gap-4">
              <p className="lg:flex hidden text-sm text-Primary-400 font-semibold">
                {a.close_ticket}
              </p>
              <p className="text-xs text-Gray-800">{a.ticket_closure_note}</p>
            </div>
            <div className="flex items-center justify-center gap-1 px-6 py-1 bg-Primary-400 border rounded-xl w-full text-alphaw-100 text-sm font-bold">
              <p className="pt-1.5">{a.close_ticket}</p>
            </div>
          </div>
        </div>
        <div className="relative lg:hidden flex flex-col items-center gap-4 lg:justify-between w-full h-full p-4 lg:p-6 bg-Primary-100 rounded-xl">
          <div className="absolute top-0 bottom-0 right-0 left-0">
            <Image
              src={"/images/Lines.png"}
              alt="lines"
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col items-center gap-4 lg:gap-10 w-full">
            <div className="flex lg:flex-col items-center gap-2">
              <Profile_circle className="fill-Gray-700 w-10 h-10 lg:!w-16 lg:!h-16" />
              {/*<div className="border-3 border-Gray-800 rounded-full w-10 h-10 lg:w-16 lg:h-16 p-1">*/}
              {/*    <Image src={User} alt="user" width={100} height={100} className="w-full h-full"/>*/}
              {/*</div>*/}
              <div className="flex items-center gap-2 pt-1 lg:pt-0">
                <p className="text-sm text-Gray-800">{a.support}</p>
                <p className="text-sm text-Primary-400 font-bold">
                  نیکی میزانی
                </p>
              </div>
            </div>
            {!show && (
              <div className="flex flex-col items-center w-full gap-2">
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">
                    {a.ticket_title}
                  </p>
                  <p className="text-xs lg:text-sm text-secondary font-medium">
                    تیکت به پشتیبانی
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">
                    {a.ticket_created_at}
                  </p>
                  <p className="text-xs lg:text-sm text-secondary font-medium">
                    ۱۴۰۳/۰۱/۲۳
                  </p>
                </div>
                <div className="flex items-center justify-between w-full">
                  <p className="text-xs lg:text-sm text-Gray-800">{a.status}</p>
                  <p className="text-xs lg:text-sm text-success-main font-medium">
                    پاسخ داده شده
                  </p>
                </div>
              </div>
            )}
            {show && (
              <div className="flex flex-col items-center gap-6 w-full">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs lg:text-sm text-Gray-800">
                      {a.ticket_title}
                    </p>
                    <p className="text-xs lg:text-sm text-secondary font-medium">
                      تیکت به پشتیبانی
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs lg:text-sm text-Gray-800">
                      {a.ticket_created_at}
                    </p>
                    <p className="text-xs lg:text-sm text-secondary font-medium">
                      ۱۴۰۳/۰۱/۲۳
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs lg:text-sm text-Gray-800">
                      {a.ticket_last_update}
                    </p>
                    <p className="text-xs lg:text-sm text-secondary font-medium">
                      ۲ ساعت پیش
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs lg:text-sm text-Gray-800">
                      {a.ticket_last_reply_by}
                    </p>
                    <p className="text-xs lg:text-sm text-secondary font-medium">
                      نیکی میزانی
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs lg:text-sm text-Gray-800">
                      {a.total_replies}
                    </p>
                    <p className="text-xs lg:text-sm text-secondary font-medium">
                      2
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs lg:text-sm text-Gray-800">
                      {a.ticket_department}
                    </p>
                    <p className="text-xs lg:text-sm text-secondary font-medium">
                      اصلاحیه وجه
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <p className="text-xs lg:text-sm text-Gray-800">
                      {a.status}
                    </p>
                    <p className="text-xs lg:text-sm text-success-main font-medium">
                      پاسخ داده شده
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
          {show && (
            <div className="flex flex-col gap-4 lg:gap-6 w-full">
              <div className="flex flex-col gap-4">
                <p className="text-xs text-Gray-800">{a.ticket_closure_note}</p>
              </div>
              <div className="flex items-center justify-center gap-1 px-6 py-1 bg-Primary-400 border rounded-xl w-full text-alphaw-100 text-sm font-bold">
                <p className="pt-1.5">{a.close_ticket}</p>
              </div>
            </div>
          )}
          <div
            onClick={() => setShow(!show)}
            className="flex items-center justify-center gap-2 w-full relative z-10 cursor-pointer"
          >
            <Arrow
              className={`fill-Primary-400 !w-5 !h-5 transition-transform duration-300 ${
                show ? "rotate-180" : ""
              }`}
            />
            <p className="text-base font-bold text-Primary-400 pt-1">
              {show ? a.show_less : a.show_more}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatSidebar;
