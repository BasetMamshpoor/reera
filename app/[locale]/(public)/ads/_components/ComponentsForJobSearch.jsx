import React from 'react';
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import Trash from "@/assets/icons/Trash.svg"
import Edit from "@/assets/icons/Edit2.svg"
import DocumentDownload from "@/assets/icons/documentDownload.svg"
const ComponentsForJobSearch = ({data, a, locale}) => {
    return (
        <>
            <RadioGroup dir={locale === "fa" ? "rtl" : "ltr"} defaultValue="comfortable">
                <div className="flex flex-col w-full gap-4">
                    <div className="flex items-center justify-between w-full bg-Surface-2 p-2 rounded-lg">
                        <div className="flex items-center gap-2">
                            <RadioGroupItem value="reera_resume" id="1"/>
                            <p className="lg:text-base text-sm text-Gray-800">{a.reera_resume}</p>
                        </div>
                        <div className="flex items-center gap-5">
                            <Edit className="!w-5 !h-5 fill-primary-400 cursor-pointer"/>
                            <Trash className="!w-5 !h-5 fill-error-main cursor-pointer"/>
                        </div>
                    </div>

                    <div className="flex justify-between w-full bg-Surface-2 p-2 rounded-lg">
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-2">
                                <RadioGroupItem value="upload_personal_resume"  id="2"/>
                                <p className="lg:text-base text-sm text-Gray-800">{a.upload_personal_resume}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <DocumentDownload className="!w-6 !h-6 fill-Primary-400"/>
                                <p className="lg:text-base text-sm text-Primary-400 font-bold">{a.upload_personal_resume}</p>
                            </div>
                        </div>
                        <div className="flex gap-5">
                            <Edit className="!w-5 !h-5 fill-primary-400 cursor-pointer"/>
                            <Trash className="!w-5 !h-5 fill-error-main cursor-pointer"/>
                        </div>
                    </div>
                </div>
            </RadioGroup>
        </>
    );
};

export default ComponentsForJobSearch;