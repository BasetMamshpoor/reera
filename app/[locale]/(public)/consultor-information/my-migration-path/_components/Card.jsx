import React from 'react';
import Dollar from "@/assets/icons/dollarCircle.svg"
import Timer from "@/assets/icons/timer1.svg"
import Copy from "@/assets/icons/copySuccess.svg"
import Document from "@/assets/icons/DocumentText.svg"
import {Progress} from "@/components/ui/progress";

const Card = ({a}) => {
    return (
        <>
            <div className="flex flex-col px-4 pb-4 pt-6 border border-default-divider rounded-xl gap-6 w-full">
                <div className="flex flex-col w-full gap-3">
                    <p className="text-lg text-Gray-950 font-medium">مهاجرت کاری به آلمان</p>
                    <p className="text-base text-Gray-800 font-medium">مهاجرت کاری به آلمان</p>
                </div>
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-between w-full">
                        <p className="text-base text-Gray-950">{a.progress} :</p>
                        <p className="text-base text-Gray-950">30%</p>
                    </div>

                    <Progress value={30} className="w-full" />
                </div>
                <div className="flex flex-col gap-4 w-full px-2">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Dollar className="fill-Gray-800 !w-5 !h-5"/>
                            <p className="text-Gray-950 text-sm pt-1">{a.cost}</p>
                        </div>
                        <p className="text-Primary-950 text-sm lg:text-base font-semibold">450میلیون</p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Timer className="fill-Gray-800 !w-5 !h-5"/>
                            <p className="text-Gray-950 text-sm pt-1">{a.time}</p>
                        </div>
                        <p className="text-Primary-950 text-sm lg:text-base font-semibold">۸–۱۲ ماه</p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Copy className="fill-Gray-800 !w-5 !h-5"/>
                            <p className="text-Gray-950 text-sm pt-1">{a.success_rate}</p>
                        </div>
                        <p className="text-Primary-950 text-sm lg:text-base font-semibold">۷۸٪</p>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Document className="fill-Gray-800 !w-5 !h-5"/>
                            <p className="text-Gray-950 text-sm pt-1">{a.documents}</p>
                        </div>
                        <p className="text-Primary-950 text-sm lg:text-base font-semibold">پاسپورت، IELTS 6.5، پذیرش
                            دانشگاه</p>
                    </div>
                </div>
                <div className="w-full text-center py-3 bg-Primary-400 text-white text-base font-bold rounded-xl mt-4 cursor-pointer">{a.view_details}</div>
            </div>
        </>
    );
};

export default Card;