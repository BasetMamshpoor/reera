import Image from "next/image";
import React, { useContext } from "react";
import Home from "@/assets/icons/home-hashtag.svg";
import Location from "@/assets/icons/location.svg";
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
import Eye from "@/assets/icons/eye.svg";
import Tick from "@/assets/icons/tick-circle.svg";
import Close from "@/assets/icons/close.svg";
import ChevronDown from "@/assets/icons/arrow-down.svg";
import { FilterContext } from "./RequestDetails";
const BuyingSelling = () => {
  const { selected, setSelected } = useContext(FilterContext);
  return (
    <div className="flex flex-col gap-8 w-full">
      <div className="flex items-center gap-4 px-4 lg:px-16 xl:flex-row flex-col w-full ">
        <div className="flex  border-default-divider border rounded-xl w-full mx-auto ">
          <div>
            <Image
              src={`/images/photo-2.png`}
              width={0}
              height={0}
              sizes="100%"
              className="w-46 h-50"
              alt=""
            />
          </div>
          <div className="absolute top-2 start-4">تایید شده</div>
          <div className="flex flex-col gap-2 w-full px-2 py-4">
            <h2>آپارتمان دو خوابه در استانبول</h2>
            <div>
              <span className="bg-badge-background text-badge-text">
                آپارتمان مبله
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="fill-Gray-700" />
              <span>۸۰ متر، ۲ خواب</span>
            </div>
            <div className="flex items-center gap-2">
              <Location className="fill-Gray-700" />
              <span>استانبول، ترکیه </span>
            </div>
          </div>
        </div>

        <div className="flex  border-default-divider border rounded-xl w-full mx-auto ">
          <div>
            <Image
              src={`/images/photo-2.png`}
              width={0}
              height={0}
              sizes="100%"
              className="w-46 h-50"
              alt=""
            />
          </div>
          <div className="absolute top-2 start-4">تایید شده</div>
          <div className="flex flex-col gap-2 w-full px-2 py-4">
            <h2>آپارتمان دو خوابه در استانبول</h2>
            <div>
              <span className="bg-badge-background text-badge-text">
                آپارتمان مبله
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Home className="fill-Gray-700" />
              <span>۸۰ متر، ۲ خواب</span>
            </div>
            <div className="flex items-center gap-2">
              <Location className="fill-Gray-700" />
              <span>استانبول، ترکیه </span>
            </div>
          </div>
        </div>
      </div>
      <div className="px-4 lg:block hidden">
        <Table>
          {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
          <TableHeader className="[&_th]:bg-Primary-100 [&_th]:py-4">
            <TableRow className={``}>
              <TableHead className="bg-Primary-100">پروفایل خریدار</TableHead>
              <TableHead>تاریخ درخواست</TableHead>
              <TableHead>صفحه چت</TableHead>
              <TableHead className="">وضعیت</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/images/Avatars.png`}
                    width={40}
                    height={40}
                    alt=""
                  />
                  <span className="text-Primary-500 text-md">محمد حسینی</span>
                </div>
              </TableCell>
              <TableCell className={`text-Gray-600`}>1404/02/29</TableCell>
              <TableCell
                className={`flex items-center justify-center gap-2 cursor-pointer`}
              >
                <Eye className="fill-Primary-400" />
                <span className="text-Primary-400">مشاهده</span>
              </TableCell>
              <TableCell className="">
                <div className="flex items-center justify-center gap-2">
                  <button className="w-18 flex items-center justify-center gap-1 text-sm font-bold rounded-2xl border-2 border-success-main text-success-main px-2 py-2 cursor-pointer">
                    <span className="text-center">تایید</span>
                    <Tick className="fill-success-main" />
                  </button>
                  <button className="w-16 flex items-center justify-center gap-1 text-sm font-bold rounded-2xl border-2 border-error-main text-error-main px-2 py-2 cursor-pointer">
                    <span className="text-center">رد</span>
                    <Close className="fill-error-main" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
            {/*  */}
            <TableRow>
              <TableCell className="font-medium flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <Image
                    src={`/images/Avatars.png`}
                    width={40}
                    height={40}
                    alt=""
                  />
                  <span className="text-Primary-500 text-md">محمد حسینی</span>
                </div>
              </TableCell>
              <TableCell className={`text-Gray-600`}>1404/02/29</TableCell>
              <TableCell className={``}>
                <div className="flex items-center justify-center gap-2 cursor-pointer">
                  <Eye className="fill-Primary-400" />
                  <span className="text-Primary-400">مشاهده</span>
                </div>
              </TableCell>
              <TableCell className="">
                <div className="flex items-center justify-center gap-2">
                  <button className="w-18 flex items-center justify-center gap-1 text-sm font-bold rounded-2xl border-2 border-success-main text-success-main px-2 py-2 cursor-pointer">
                    <span className="text-center">تایید</span>
                    <Tick className="fill-success-main" />
                  </button>
                  <button className="w-16 flex items-center justify-center gap-1 text-sm font-bold rounded-2xl border-2 border-error-main text-error-main px-2 py-2 cursor-pointer">
                    <span className="text-center">رد</span>
                    <Close className="fill-error-main" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>

      {/* Mobile accordion view - MODIFIED SECTION */}
      <div className="px-4 lg:hidden block">
        <div className="w-full border border-default-divider rounded-tr-2xl rounded-tl-2xl">
          <div className="flex items-center justify-around bg-Primary-100 gap-12 py-4 rounded-tr-2xl rounded-tl-2xl border-b border-b-default-divider">
            <span className="flex-1 text-center">پروفایل خریدار</span>
            <span className="flex-1 text-center">وضعیت</span>
          </div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger className="bg-surface">
                <div className="flex items-center w-full justify-between px-4 py-4">
                  {/* Status buttons - aligned to the left */}
                  <div className="flex items-center gap-2 flex-1 justify-center">
                    <ChevronDown className="fill-Gray-600" />
                    <button className="w-18 flex items-center justify-center gap-1 text-sm font-bold rounded-2xl border-2 border-success-main text-success-main px-2 py-2 cursor-pointer">
                      <span className="text-center">تایید</span>
                      <Tick className="fill-success-main" />
                    </button>
                    <button className="w-16 flex items-center justify-center gap-1 text-sm font-bold rounded-2xl border-2 border-error-main text-error-main px-2 py-2 cursor-pointer">
                      <span className="text-center">رد</span>
                      <Close className="fill-error-main" />
                    </button>
                  </div>

                  {/* Buyer profile - aligned to the right and centered under header */}
                  <div className="flex items-center justify-center gap-2 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-Primary-500 text-md">
                        محمد حسینی
                      </span>
                      <Image
                        src={`/images/Avatars.png`}
                        width={40}
                        height={40}
                        alt="Buyer"
                      />
                    </div>
                  </div>

                  {/* Chevron icon */}
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 gap-4 p-4">
                  <div className="text-Gray-600">تاریخ درخواست:</div>
                  <div className="font-semibold">1404/02/29</div>
                  <div className="text-Gray-600">صفحه چت</div>
                  <div className="flex items-center gap-2 cursor-pointer text-Primary-400">
                    <Eye className="fill-Primary-400" />
                    <span>مشاهده</span>
                  </div>
                  <div className="flex items-center gap-2 flex-1 justify-center w-full">
                    <button className="w-full flex items-center justify-center gap-1 text-sm font-bold rounded-2xl border-2 border-success-main text-success-main px-2 py-2 cursor-pointer">
                      <Tick className="fill-success-main" />
                      <span className="text-center">تایید</span>
                    </button>
                    <button className="w-full flex items-center justify-center gap-1 text-sm font-bold rounded-2xl border-2 border-error-main text-error-main px-2 py-2 cursor-pointer">
                      <Close className="fill-error-main" />
                      <span className="text-center">رد</span>
                    </button>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  );
};

export default BuyingSelling;
