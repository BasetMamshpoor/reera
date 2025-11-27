"use client"
import React from 'react';
import Empty from "@/assets/icons/Tags_empty_ticket.svg"
import PLus from "@/assets/icons/add.svg"

const Null = ({a}) => {
    return (
        <>
            <div className="flex flex-col items-center w-full h-full gap-4 lg:py-6 lg:px-4">
                <Empty className="fill-Gray-950 !w-44 !h-44"/>
                <div className="flex flex-col items-center justify-between lg:justify-normal w-full h-full gap-10">
                    <div className={`flex items-center justify-center w-full flex-col gap-4`}>
                        <p className="lg:text-xl text-secondary font-bold ">{a.no_support_tickets}</p>
                        <p className="text-sm lg:text-base text-Gray-700 text-center">{a.support_info}</p>
                    </div>
                    <div className={`flex items-center justify-center gap-6 lg:max-w-96 w-full border-t lg:border-0 border-Primary-400 py-6 px-4 rounded-t-xl shadow-2xl lg:shadow-none`}>
                        <div className="flex items-center justify-center gap-1 px-6 py-2 bg-Primary-400 border rounded-xl w-full lg:w-fit text-white text-base font-bold">
                            <PLus className="fill-white"/>
                            <p className="pt-1.5">{a.submit_ticket}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Null;