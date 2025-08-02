import React from "react";
import Image from "next/image";
import Category from "@/assets/icons/Category.svg";
import Location from "@/assets/icons/Location.svg";
import Calender from "@/assets/icons/Calendar.svg";
import Home from "@/assets/icons/HomeHashtag.svg";
import Photos from "@/assets/images/photo.png";
import Rectangle from "@/assets/images/Rectangle.png";
const Card = ({
  isRow,
  category,
  city,
  created,
  currency,
  id,
  main_image,
  price,
  title,
}) => {
  return (
    <>
      {isRow ? (
        <div className="flex md:p-6 gap-1 md:gap-6 bg-white rounded-xl [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] w-full">
          <div className="w-1/3 md:rounded-l-xl rounded-r-xl overflow-hidden">
            <Image
              src={main_image}
              alt={title}
              width={100}
              height={100}
              className="w-full h-full"
            />
          </div>
          <div className="flex flex-col justify-between p-2 md:p-0 gap-4 w-full">
            <div className="flex flex-col gap-1 md:gap-3 lg:gap-5">
              <div className="flex flex-col md:flex-row justify-between w-full gap-1">
                <p className="font-bold text-base md:text-lg text-gray-950">
                  {title}
                </p>
                <div className="flex items-center justify-center px-2 md:px-3 py-1 w-fit rounded-lg text-xs md:text-sm text-[#4299C1] bg-[#F0F9FB]">
                  {category}
                </div>
              </div>
              <div className="flex flex-col gap-1 md:gap-3">
                <div className="flex items-center gap-2">
                  <Category className="w-3 h-3 md:w-4 md:h-4 fill-gray-500" />
                  <p className="flex items-center justify-center text-sm md:text-base">
                    {}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Location className="w-3 h-3 md:w-4 md:h-4 fill-gray-500" />
                  <p className="flex items-center justify-center text-sm md:text-base">
                    {city}
                  </p>
                </div>
                {/*<div className="flex items-center gap-2">*/}
                {/*    <Calender className=" w-3 h-3 md:w-4 md:h-4 fill-gray-500"/>*/}
                {/*    <p className="flex items-center justify-center text-sm md:text-base">{new Date().toLocaleString(`fa-Ir`, {*/}
                {/*        year: 'numeric',*/}
                {/*        month: 'long',*/}
                {/*        day: 'numeric',*/}
                {/*    })}</p>*/}
                {/*</div>*/}
                {/*<div className="flex items-center gap-2">*/}
                {/*    <Home className="w-3 h-3 md:w-4 md:h-4 fill-gray-500"/>*/}
                {/*    <p className="flex items-center justify-center text-sm md:text-base">۸۰ متر، ۲ خواب</p>*/}
                {/*</div>*/}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between w-full">
              <p className="text-xs md:text-sm  text-gray-500 whitespace-nowrap">
                {created}
              </p>
              <div className="flex justify-end w-full">
                <div className="flex items-center gap-1">
                  <p className="font-bold text-base md:text-lg">{price}</p>
                  {/* <p className="font-bold text-base md:text-lg">یورو</p> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col pb-5 gap-4 max-w-[500px] min-w-52 bg-white rounded-xl [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] w-full">
          <Image
            src={main_image}
            alt={title}
            width={100}
            height={100}
            className="h-1/2 w-full"
          />
          <div className="flex flex-col justify-between px-4 md:px-5 gap-4 h-full">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center justify-center px-2 md:px-3 py-1 rounded-lg text-xs md:text-sm text-[#4299C1] bg-[#F0F9FB]">
                  {category}
                </div>
                <p className="text-xs md:text-sm  text-gray-500">{created}</p>
              </div>
              <p className="font-bold text-base md:text-lg text-gray-950">
                {title}
              </p>
              <div className="flex items-center gap-2">
                <Category className="w-3 h-3 md:w-4 md:h-4  fill-gray-500" />
                <p className="flex items-center justify-center text-sm md:text-base">
                  {}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Location className="w-3 h-3 md:w-4 md:h-4  fill-gray-500" />
                <p className="flex items-center justify-center text-sm md:text-base">
                  {city}
                </p>
              </div>
              {/*<div className="flex items-center gap-2">*/}
              {/*    <Calender className=" w-3 h-3 md:w-4 md:h-4  fill-gray-500"/>*/}
              {/*    <p className="flex items-center justify-center text-sm md:text-base">{new Date().toLocaleString(`fa-Ir`, {*/}
              {/*        year: 'numeric',*/}
              {/*        month: 'long',*/}
              {/*        day: 'numeric',*/}
              {/*    })}</p>*/}
              {/*</div>*/}
              {/*<div className="flex items-center gap-2">*/}
              {/*    <Home className="w-3 h-3 md:w-4 md:h-4  fill-gray-500"/>*/}
              {/*    <p className="flex items-center justify-center text-sm md:text-base">۸۰ متر، ۲ خواب</p>*/}
              {/*</div>*/}
            </div>
            <div className="flex justify-end w-full">
              <div className="flex items-center gap-1">
                <p className="font-bold text-base md:text-lg">{price}</p>
                {/* <p className="font-bold text-base md:text-lg">یورو</p> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
