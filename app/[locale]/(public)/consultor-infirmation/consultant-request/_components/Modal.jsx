import React from 'react';
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import Link from "next/link";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useParams} from "next/navigation";

const Modal = ({b}) => {
    const {locale} = useParams()
    return (
        <>
            <Dialog className="bg-white dark:bg-[#252C36] ">
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="border-0 bg-white hover:bg-white w-fit p-0 ">
                            <div
                                className="flex items-center justify-center w-full px-4 py-2 border border-[#4299C1] rounded-lg text-[#295775] dark:text-[#B7DCEA] text-sm">
                                {b.view_profile}
                            </div>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-6 lg:gap-10 sm:max-w-[425px] h-fit">
                        <DialogHeader>
                            <DialogTitle>
                                <div className={`flex ${locale}==="fa"?"items-end":"" w-full pt-7`}>
                                    <p className="text-black dark:text-white font-semibold">{b.user_profile}</p>
                                </div>
                            </DialogTitle>
                            <DialogDescription>

                            </DialogDescription>
                        </DialogHeader>
                        <div className="flex flex-col gap-5 w-full">
                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#294A61] dark:text-[#B7DCEA]">{b.full_name}</p>
                                <p className="text-[#142738] dark:text-[#F0F9FB]">حسین محمدی</p>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#294A61] dark:text-[#B7DCEA]">{b.age}</p>
                                <p className="text-[#142738] dark:text-[#F0F9FB]">۲۳</p>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#294A61] dark:text-[#B7DCEA]">{b.nationality}</p>
                                <p className="text-[#142738] dark:text-[#F0F9FB]">ایرانی</p>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#294A61] dark:text-[#B7DCEA]">{b.migration_type}</p>
                                <p className="text-[#142738] dark:text-[#F0F9FB]">تحصیلی</p>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#294A61] dark:text-[#B7DCEA]">{b.destination_country}</p>
                                <p className="text-[#142738] dark:text-[#F0F9FB]">آمریکا</p>
                            </div>
                            <div className="flex items-center justify-between w-full">
                                <p className="text-[#294A61] dark:text-[#B7DCEA]">{b.language_level}</p>
                                <p className="text-[#142738] dark:text-[#F0F9FB]">سطح وارد شده توی فرم</p>
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex items-center gap-3 w-full">
                                <div
                                    className="flex items-center justify-center w-full px-4 py-2 border border-[#4299C1] rounded-lg text-[#295775] dark:text-[#B7DCEA] text-sm">
                                    {b.reject_request}
                                </div>
                                <div
                                    className="flex items-center justify-center w-full px-4 py-2 bg-[#4299C1] rounded-lg text-white dark:text-black text-sm">
                                    {b.accept_request}
                                </div>
                            </div>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default Modal;