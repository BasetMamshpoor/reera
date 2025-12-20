import React from 'react';
import User from "@/assets/icons/profile.svg"
import Timer from "@/assets/icons/timer1.svg"
import Copy from "@/assets/icons/copySuccess.svg"
import Document from "@/assets/icons/DocumentText.svg"
import {Badge} from "@/components/ui/badge";
import Star from "@/assets/icons/Star-bold.svg";
import Calender from "@/assets/icons/Calendar.svg";
import Location from "@/assets/icons/location.svg";

const Card = ({a}) => {
    return (
        <>
            <div
                className="flex flex-col px-4 pb-4 pt-6 border border-default-divider rounded-xl gap-6 lg:gap-10 w-full">
                <div className="flex items-center gap-3 w-full">
                    <div className="max-w-20 w-full h-20  border-2 border-default-divider rounded-full p-1 bg-Gray-100">
                        <User className="!w-full !h-full fill-Gray-800"/>
                    </div>
                    <div className="flex flex-col w-full gap-2">
                        <p className="text-base text-Gray-950">حسین مهدوی</p>
                        <div className="flex items-center gap-2">
                            {/*icon*/}
                            <p className="text-xs text-Primary-400">آمریکا</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-6 w-full px-2">
                    <div className="flex items-center flex-wrap gap-2 w-full">
                        <Badge
                            className="bg-badge-background text-badge-text px-4 py-1 text-sm rounded-xl">{a.educational}</Badge>
                        <Badge
                            className="bg-badge-background text-badge-text px-4 py-1 text-sm rounded-xl">{a.family}</Badge>
                    </div>
                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Calender className="fill-Primary-600 !w-5 !h-5"/>
                                <p className="text-Primary-950 text-sm pt-1">۸ سال تجربه</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="fill-warning-main !w-5 !h-5"/>
                                <p className="text-Gray-950 pt-2">4.5</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center gap-2">
                                <Location className="fill-Primary-600 !w-5 !h-5"/>
                                <p className="text-Primary-950 text-sm pt-1">استانبول، ترکیه</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className="w-full text-center py-3 bg-Primary-400 text-white text-sm md:text-base font-bold rounded-xl mt-4 cursor-pointer">{a.start_chat}</div>
            </div>
        </>
    );
};

export default Card;