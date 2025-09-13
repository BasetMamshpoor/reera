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

const Modal = () => {
    return (
        <>
            <div>
                <Dialog>
                    <form>
                        <DialogTrigger asChild>
                            <Button variant="outline"
                                    className="flex items-center gap-2 border-none shadow-none hover:bg-transparent">
                                <Flag className="md:w-6 md:h-6 w-5 h-6 fill-[#EF4444]"/>
                                <p className="text-sm md:text-base text-[#EF4444] ">گزارش تخلف</p>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="flex flex-col gap-6 sm:max-w-[846px] p-10">
                            <div className="flex flex-col gap-6">
                                <p className="text-lg text-[#142738] font-semibold dark:text-[#D9EDF4]">گزارش تخلف آگهی</p>
                                <RadioGroup defaultValue="comfortable" className="flex flex-col gap-3">
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="default" id="r1" />
                                        <Label htmlFor="r1">کلاهبرداری</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="comfortable" id="r2" />
                                        <Label htmlFor="r2">غیرقانونی یا غیراخلاقی</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact" id="r3" />
                                        <Label htmlFor="r3">دسته‌بندی اشتباه</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact1" id="r3" />
                                        <Label htmlFor="r4">قیمت اشتباه</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact2" id="r3" />
                                        <Label htmlFor="r5">اطلاعات اشتباه</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact3" id="r3" />
                                        <Label htmlFor="r6">ناموجود یا پاسخگو نبودن</Label>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <RadioGroupItem value="compact4" id="r3" />
                                        <Label htmlFor="r7">سایر</Label>
                                    </div>
                                </RadioGroup>
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="bg-[#4299C1] font-bold w-1/5 rounded-xl hover:bg-[#4299C1]">ثبت</Button>
                            </DialogFooter>
                        </DialogContent>
                    </form>
                </Dialog>
            </div>
        </>
    );
};

export default Modal;