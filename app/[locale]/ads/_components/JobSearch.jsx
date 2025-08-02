import React from "react";
import Image from "next/image";
import Location from "@/assets/icons/Location.svg";
import Photos from "@/assets/images/photo.png";
import Snapp from "@/assets/images/photo.png";

const JobSearch = ({ isRow }) => {
  return (
    <>
      {isRow ? (
        <div className="flex justify-between md:p-6 gap-2 md:gap-6 bg-white rounded-xl [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] w-full">
          <div className="relative w-1/3 md:rounded-l-xl rounded-r-xl overflow-hidden">
            <Image
              src={Photos}
              alt="photo"
              width={100}
              height={100}
              className="w-screen h-full"
            />
            <div className="w-28 h-10 bg-primary-500 rounded-b-full -mt-4 z-0"></div>
          </div>
          <div className="flex flex-col p-2 gap-2 md:gap-5 w-full">
            <div className="flex flex-col gap-2 md:gap-4 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <Image
                    src={Snapp}
                    alt="snapp"
                    width={100}
                    height={100}
                    className="max-w-8"
                  />
                  <p className="text-sm md:text-base font-bold">
                    استخدام فرانت‌اند دولوپر
                  </p>
                </div>
                <p className="hidden md:flex text-xs font-bold text-gray-700">
                  اسنپ
                </p>
              </div>
              <div className="flex flex-col md:flex-row items-center md:gap-2">
                <div className="flex items-center md:justify-between p-2 md:border rounded-lg gap-2 w-full">
                  <p className="text-xs font-medium md:font-bold text-gray-700">
                    حقوق
                  </p>
                  <p className="text-xs md:text-sm text-[#294A61] font-medium md:font-bold">
                    ۴۰ میلیون تومان
                  </p>
                </div>
                <div className="flex items-center md:justify-between p-2 md:border rounded-lg gap-2 w-full">
                  <p className="text-xs font-medium md:font-bold text-gray-700">
                    نوع همکاری
                  </p>
                  <p className="text-xs md:text-sm text-[#294A61] font-medium md:font-bold">
                    تمام وقت
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2">
                  <Location className="w-4 h-4 fill-gray-500" />
                  <p className="flex items-center justify-center text-xs md:text-sm text-gray-500">
                    اتریش
                  </p>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-1 md:flex-row justify-between w-full">
              <p className="text-xs md:text-sm bg-custom-primary-400 text-gray-500">
                ۵ دقیقه پیش
              </p>
              <button className="flex items-center justify-center py-2 px-8 w-full md:w-1/2 lg:w-1/3 bg-[#4299C1] rounded-xl text-base font-bold text-white whitespace-nowrap">
                ارسال رزومه
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-between pb-4 gap-4 max-w-[500px] min-w-52 bg-white rounded-xl [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] w-full">
          <div className="h-1/3">
            <Image
              src={Photos}
              alt="photo"
              width={100}
              height={100}
              className="w-screen "
            />
            <div className="flex items-center px-4 pt-0 gap-4 ">
              <Image
                src={Snapp}
                alt="snapp"
                width={100}
                height={100}
                className="max-w-[72px]"
              />
              <div className="flex flex-col gap-1">
                <p className="text-sm md:text-base font-bold">
                  استخدام فرانت‌اند دولوپر
                </p>
                <p className="hidden md:flex text-xs font-bold text-gray-700">
                  اسنپ
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col px-4 gap-6">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <div className="flex flex-col p-2 border rounded-lg gap-1 w-full">
                  <p className="text-xs font-medium md:font-bold text-gray-700">
                    حقوق
                  </p>
                  <p className="text-xs md:text-sm text-[#294A61] font-medium md:font-bold">
                    ۴۰ میلیون تومان
                  </p>
                </div>
                <div className="flex flex-col p-2 border rounded-lg gap-1 w-full">
                  <p className="text-xs font-medium md:font-bold text-gray-700">
                    نوع همکاری
                  </p>
                  <p className="text-xs md:text-sm text-[#294A61] font-medium md:font-bold">
                    تمام وقت
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex gap-2">
                  <Location className="w-4 h-4 fill-gray-500" />
                  <p className="flex items-center justify-center text-xs md:text-sm text-gray-500">
                    اتریش
                  </p>
                </div>
                <p className="text-xs md:text-sm bg-custom-primary-400 text-gray-500">
                  ۵ دقیقه پیش
                </p>
              </div>
            </div>
            <button className="flex items-center justify-center py-1 md:py-3 px-2 md:px-6 bg-[#4299C1] w-full rounded-xl text-base font-bold text-white whitespace-nowrap">
              ارسال رزومه
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default JobSearch;
