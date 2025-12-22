import React from 'react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {
    RadioGroup,
    RadioGroupItem,
} from "@/components/ui/radio-group"
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import Flag from "@/assets/icons/Flag.svg"

const Modal = ({locale, b}) => {
    return (
        <>
            <div>
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline"
                                    className="flex items-center gap-2 border-none shadow-none hover:bg-transparent">
                                <Flag className="md:w-6 md:h-6 !w-5 !h-5 fill-error-main"/>
                                <p className="text-sm md:text-base text-error-main pt-1">{b.report_violation}</p>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="flex flex-col justify-between gap-6 p-10">
                            <div className="flex flex-col gap-6 pt-4">
                                <p className="lg:text-lg text-Primary-950 font-semibold pt-1">{b.report_violation}</p>
                                <RadioGroup dir={locale === "fa" ? "rtl" : "ltr"} defaultValue="comfortable"
                                            className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="default"/>
                                        <Label>{b.fraud}</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="comfortable"/>
                                        <Label>{b.illegal_or_unethical}</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact"/>
                                        <Label>{b.wrong_category}</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact1"/>
                                        <Label>{b.wrong_price}</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact2"/>
                                        <Label>{b.wrong_information}</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact3"/>
                                        <Label>{b.unavailable_or_unresponsive}</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact4"/>
                                        <Label>{b.other}</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <DialogFooter>
                                <Button type="submit"
                                        className="bg-[#4299C1] font-bold w-1/5 rounded-xl hover:bg-[#4299C1]">{b.submit}</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
        </>
    );
};

export default Modal;