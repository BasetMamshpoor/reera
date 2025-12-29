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
import {Checkbox} from "@/components/ui/checkbox";
import {Badge} from "@/components/ui/badge";
import Edit from "@/assets/icons/Edit2.svg"
const Modal = ({b}) => {
    const {locale} = useParams()

    return (
        <>
            <Dialog className="bg-white dark:bg-[#252C36] !max-w-[625px] w-full">
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="border-0 bg-white hover:bg-white w-fit p-0 ">
                            <div
                                className="flex items-center justify-center w-full lg:w-fit px-4 py-2 bg-[#4299C1] rounded-lg text-white dark:text-black text-sm whitespace-nowrap">
                                {b.request_card_transfer}
                            </div>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="flex flex-col gap-6 lg:gap-10 sm:max-w-[425px] h-fit">
                        <DialogHeader>
                            <DialogTitle>
                                <div className={`flex ${locale}==="fa"?"items-end":"" w-full mt-10`}>
                                    <p className="text-black dark:text-white font-semibold">{b.transfer_to_card}</p>
                                </div>
                            </DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-6 w-full">
                            <div className="flex flex-col gap-4 w-full">
                                <p className="text-[#294A61] dark:text-[#B7DCEA]">{b.enter_amount}</p>
                                <Input type="text" placeholder={b.toman}/>
                            </div>
                            <div className="flex items-center gap-4 w-full">
                                <Checkbox id="terms" className="rounded-full"/>
                                <div className="flex items-center justify-between w-full">
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <p className="text-Gray-800 text-base">بانک تجارت</p>
                                            <Badge className="text-success-main bg-color-success-accent">{b.approved}</Badge>
                                        </div>
                                        <p className="text-base text-Gray-950">IR-5801900000000003506535661</p>
                                    </div>
                                    <Edit className="fill-Primary-400"/>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <div className="flex items-center gap-3 w-full">
                                <div
                                    className="flex items-center cursor-pointer justify-center w-full px-4 py-2 bg-[#4299C1] rounded-lg text-white dark:text-black text-sm">
                                    {b.request}
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