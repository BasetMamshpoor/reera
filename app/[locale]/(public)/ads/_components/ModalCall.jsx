import React from 'react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import Messages from "@/assets/icons/Messages.svg";
import Phone from "@/assets/icons/Icon-1.svg"
import Call from "@/assets/icons/Call.svg"
import Copy from "@/assets/icons/Copy.svg"
import {toast} from "sonner";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Link from "next/link";

const ModalRequest = ({locale, data}) => {
    const dic = useTranslation()
    const a = dic.public.ads.all_ads.slug
    const handlerCopy = async (number) => {
        try {
            await navigator.clipboard.writeText(number);
            toast.success(a.copy_success);
        } catch (err) {
            toast.error(a.copy_failed);
        }
    }
    return (
        <>
            <div>
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline"
                                    className="shadow-none cursor-pointer hover:bg-transparent flex items-center justify-center gap-2 w-full border border-Primary-400 rounded-xl py-1">
                                {/*{data?.contact.site_massage && <Messages className="fill-Primary-400"/>}*/}
                                <p className="text-base text-Primary-400 whitespace-nowrap pt-1">{a.call}</p>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="flex flex-col justify-between gap-10 p-10 w-full h-fit">
                            <div className="flex flex-col gap-10 pt-4 w-full">
                                <p className="lg:text-lg text-Primary-950 font-semibold pt-1">{a.contact_info}</p>
                                <Accordion
                                    type="single"
                                    collapsible
                                    className="w-full border border-default-divider rounded-xl p-4 bg-surface"
                                    defaultValue="item-1"
                                >
                                    <AccordionItem value="item-1">
                                        <AccordionTrigger>{a.contact_info}</AccordionTrigger>
                                        <AccordionContent className="flex flex-col gap-6 text-balance pt-6">
                                            <div className="flex items-center justify-between w-full">
                                                <div className="flex items-center gap-2">
                                                    <Call className="!w-5 !h-5 fill-Gray-700"/>
                                                    <p className="text-sm text-Gray-800 font-medium pt-1">{a.mobile_number}</p>
                                                </div>
                                                <div onClick={() => handlerCopy(data?.contact?.mobile)}
                                                     className="lg:flex hidden items-center gap-2 cursor-pointer hover:scale-110 transition-transform px-4">
                                                    <p className="text-sm text-Primary-500 font-bold pt-1">{data?.contact?.mobile}</p>
                                                    <Copy className="!w-6 !h-6 fill-Primary-500 "/>
                                                </div>
                                                <a href={`tel:${data?.contact?.mobile}`}
                                                   className="lg:hidden flex items-center gap-2 px-4 text-Primary-500 cursor-pointer hover:scale-110 transition-transform">{data?.contact?.mobile}</a>
                                            </div>
                                            {/*<div className="flex items-center justify-between w-full">*/}
                                            {/*    <div className="flex items-center gap-2">*/}
                                            {/*        <Phone className="!w-5 !h-5 fill-Gray-700"/>*/}
                                            {/*        <p className="text-sm text-Gray-800 font-medium pt-1">{a.whatsapp_number}</p>*/}
                                            {/*    </div>*/}
                                            {/*    <div onClick={() => handlerCopy(whatsappNumber)}*/}
                                            {/*         className="flex items-center gap-2 cursor-pointer hover:scale-110 transition-transform px-4">*/}
                                            {/*        <p className="text-sm text-Primary-500 font-bold pt-1">{whatsappNumber}</p>*/}
                                            {/*        <Copy className="!w-6 !h-6 fill-Primary-500 "/>*/}
                                            {/*    </div>*/}
                                            {/*</div>*/}
                                        </AccordionContent>
                                    </AccordionItem>
                                </Accordion>
                            </div>
                            <DialogFooter
                                className="grid grid-cols-1 gap-4 w-full"
                            >
                                <DialogClose asChild>
                                    <div
                                        className="flex items-center justify-center gap-2 w-full border border-warning-main rounded-xl py-2 cursor-pointer">
                                        <p className="text-base text-warning-main whitespace-nowrap">{a.cancel}</p>
                                    </div>
                                </DialogClose>
                                {/*{data?.contact.site_massage === 1 &&*/}
                                {/*    <Link href="/"*/}
                                {/*          className="bg-Primary-400 font-bold w-full py-2 rounded-xl hover:bg-Primary-400 text-center text-white cursor-pointer">{a.chat}</Link>}*/}
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
        </>
    );
};

export default ModalRequest;