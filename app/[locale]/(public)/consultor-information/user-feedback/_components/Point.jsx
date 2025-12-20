import React from 'react';
import StarBold from "@/assets/icons/Star-bold.svg"
import Star from "@/components/Star"
import {useTranslation} from "@/app/[locale]/TranslationContext";
const Point = () => {
    const dic = useTranslation()
    const f = dic.consultor.user_feedback
    return (
        <>
            <div
                className="flex flex-col lg:flex-row items-center p-6 gap-10 border border-gray-200 dark:border-[#374151] rounded-xl bg-white dark:bg-Surface-2 ">
                <div
                    className="flex flex-col items-center justify-center pl-6 lg:border-l border-gray-200 dark:border-[#374151] h-full">
                    <p className="text-xl text-[#142738] dark:text-[#D9EDF4] font-bold whitespace-nowrap">{f.total_scores}</p>
                    <div className="flex items-center gap-2">
                        <p className="text-2xl text-gray-800 dark:text-gray-200 text-center">4.5</p>
                        <StarBold className="fill-[#F59E0B] w-5 h-5"/>
                    </div>
                </div>
                <div className="flex flex-col gap-6 py-5 w-full">
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                        <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200">{f.information_honesty}</p>
                        <div className="flex items-center gap-2">
                            <Star rating={4.2}/>
                            <p className="text-sm lg:text-lg text-gray-800 dark:text-gray-200">4.2</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                        <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200">{f.price_transparency}</p>
                        <div className="flex items-center gap-2">
                            <Star rating={3.2}/>
                            <p className="text-sm lg:text-lg text-gray-800 dark:text-gray-200">3.2</p>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center lg:justify-between w-full">
                        <p className="text-sm lg:text-base text-gray-800 dark:text-gray-200">{f.owner_behavior}</p>
                        <div className="flex items-center gap-2">
                            <Star rating={4.2}/>
                            <p className="text-sm lg:text-lg text-gray-800 dark:text-gray-200">4.2</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Point;