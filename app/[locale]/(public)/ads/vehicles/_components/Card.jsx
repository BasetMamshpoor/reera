import React from "react";
import Image from "next/image";
import Category from "@/assets/icons/Category.svg";
import Location from "@/assets/icons/location.svg";
import Link from "next/link";
import {useParams} from "next/navigation";

const Card = ({
                  isRow,
                  category,
                  city,
                  created,
                  currency,
                  id,
                  image,
                  price,
                  title,
                  location,
                  time,
              }) => {
    const {locale} = useParams();
    return (
        <>
            {isRow ? (
                <Link
                    href={`/${locale}/ads/vehicles/${id}`}
                    className="flex md:p-6 gap-1 md:gap-6 bg-surface rounded-xl [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] w-full h-fit "
                >
                    <div className="w-full h-64 relative rounded-2xl overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        />
                    </div>
                    <div className="flex flex-col justify-between p-2 md:p-0 gap-4 w-full">
                        <div className="flex flex-col gap-1 md:gap-3 lg:gap-5">
                            <div className="flex flex-col md:flex-row justify-between w-full gap-1">
                                <p className="font-bold text-base md:text-lg text-gray-950">
                                    {title}
                                </p>
                                <div
                                    className="flex items-center justify-center px-2 md:px-3 py-1 w-fit rounded-lg text-xs md:text-sm text-Primary-400 bg-Primary-50">
                                    {category}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 md:gap-3">
                                <div className="flex items-center gap-2">
                                    <Category className="w-3 h-3 md:w-4 md:h-4 fill-Gray-500"/>
                                    <p className="flex items-center justify-center text-sm md:text-base">
                                        {category}
                                    </p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Location className="w-3 h-3 md:w-4 md:h-4 fill-Gray-500"/>
                                    <p className="flex items-center justify-center text-sm md:text-base">
                                        {location}
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
                            <p className="text-xs md:text-sm  text-Gray-500 whitespace-nowrap">
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
                </Link>
            ) : (
                <Link
                    href={`/${locale}/ads/vehicles/${id}`}
                    className="flex flex-row gap-4 p-2.5 h-42  w-full bg-surface rounded-lg border border-default-divider [box-shadow:0_2px_32px_0_rgba(28,_28,_28,_0.06)] cursor-pointer"
                >
                    <div className="w-full max-w-32 min-h-32 relative rounded-xl overflow-hidden">
                        <Image
                            src={image}
                            alt={title}
                            fill
                            className="object-cover "
                            sizes=""
                        />
                    </div>
                    <div className="flex flex-col justify-between gap-4 w-full">
                        <div className="flex flex-col">
                            <div className="flex items-center justify-between w-full">
                                <p className="text-xs md:text-sm  text-gray-500">{created}</p>
                            </div>
                            <p className="font-bold text-base md:text-lg text-Gray-950">
                                {title}
                            </p>
                            {/* <div className="flex items-center gap-2">
                <Category className="w-3 h-3 md:w-4 md:h-4  fill-Gray-500" />
                <p className="flex items-center justify-center text-sm md:text-base">
                  {category}
                </p>
              </div> */}
                            {/* <div className="flex items-center gap-2">
                <Location className="w-3 h-3 md:w-4 md:h-4  fill-Gray-500" />
                <p className="flex items-center justify-center text-sm md:text-base">
                  {location}
                </p>
              </div> */}
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
                        <div className="flex w-full">
                            <div className="flex w-full justify-between">
                                <p className="text-xs text-Gray-700">{time}</p>
                                <p>{price}</p>
                                <div
                                    className="flex items-center justify-center p-2 text-xs max-w-[100px] overflow-hidden text-ellipsis whitespace-nowrap rounded-lg text-Primary-400 bg-Primary-50">
                                    {category}
                                </div>

                                {/* <p className="font-bold text-base md:text-lg">یورو</p> */}
                            </div>
                        </div>
                    </div>
                </Link>
            )}
        </>
    );
};

export default Card;
