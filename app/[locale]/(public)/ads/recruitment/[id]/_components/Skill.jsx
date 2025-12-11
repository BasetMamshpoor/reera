import React from 'react';
import Tick from "@/assets/icons/tick-circle.svg"
import {log} from "next/dist/server/typescript/utils";

const Skill = ({data ,a}) => {
    return (
        <>
            <div className="flex flex-col gap-4 w-full p-6 bg-surface border border-default-divider rounded-2xl">
                <p className="lg:hidden text-base text-Gray-800">
                    {a.skills}
                </p>
                <div
                    className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6 ">
                    {data?.skill?.map((skill, index) => <div key={index} className="flex items-center gap-2">
                        <Tick className="fill-success-main"/>
                        <p className="text-sm lg:text-base text-secondary pt-1">{skill}</p>
                    </div>)}
                </div>
            </div>
        </>
    );
};

export default Skill;