"use client";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import Add from "@/assets/icons/add.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Info from "@/assets/icons/info-circle.svg";
import Tick from "@/assets/icons/tick-circle.svg";

const ModalCoinIncrease = () => {
    const dic = useTranslation();

    const [selectedValue, setSelectedValue] = useState("");

    const coinOptions = [2, 5, 10, 20];

    return (
        <Dialog className={`rtl:direction-${dic}`}>
            <form>
                <DialogTrigger asChild>
                    <button className="border-none bg-transparent shadow-none">
                        <div className="flex items-center justify-center p-1 bg-[#F59E0B] rounded-lg">
                            <Add className="fill-white"/>
                        </div>
                    </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px] rtl:text-right">
                    <DialogHeader>
                        <DialogTitle className="text-base text-[#142738] dark:text-[#D9EDF4]">
                            {dic.profile.dashboard.ModalCoinIncrease.title}
                        </DialogTitle>
                        <DialogDescription className="text-sm text-[#3B3E46] dark:text-[#E0E2E5]">
                            {dic.profile.dashboard.ModalCoinIncrease.text}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-6">
                        {/* بخش اطلاعات قیمت */}
                        <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-1">
                                <Info className="fill-[#51A3C3]"/>
                                <p className="text-[#51A3C3] text-sm">
                                    {dic.profile.dashboard.ModalCoinIncrease.price}
                                </p>
                            </div>

                            {/* اینپوت */}
                            <Input
                                id="picture3"
                                type="text"
                                placeholder="0 سکه"
                                value={selectedValue ? `${selectedValue} سکه` : ""}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, "");
                                    setSelectedValue(val);
                                }}
                                className="rtl:text-right w-full rounded-xl px-3 py-2 text-sm text-gray-400 lg:text-base"
                            />

                            <p className="text-sm text-gray-400">
                                {dic.profile.dashboard.ModalCoinIncrease.price}
                            </p>
                        </div>

                        <div className="grid grid-cols-4 gap-6">
                            {coinOptions.map((coin) => (
                                <Button
                                    key={coin}
                                    type="button"
                                    onClick={() => setSelectedValue(coin)}
                                    className={`border bg-white rounded-xl bg-transparent hover:bg-transparent
                    ${
                                        Number(selectedValue) === coin
                                            ? "text-[#4299C1] border-[#4299C1]"
                                            : "text-[#CCCCCC] border-[#CCCCCC]"
                                    }
                  `}
                                >
                                    {coin} {dic.profile.dashboard.ModalCoinIncrease.coin}
                                </Button>
                            ))}
                        </div>
                    </div>

                    <DialogFooter className="w-full items-center gap-3">
                        <DialogClose asChild>
                            <Button
                                className="flex items-center justify-center  bg-white hover:bg-transparent dark:bg-black py-2 border border-[#F59E0B] rounded-xl w-1/2 text-[#F59E0B] text-base font-bold">
                                {dic.profile.dashboard.ModalCoinIncrease.Cancellation}
                            </Button>
                        </DialogClose>
                        <button
                            className="flex gap-2 items-center justify-center px-3 py-2 w-1/2 bg-[#4299C1] rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold">
                            <p> {dic.profile.dashboard.ModalCoinIncrease.inventory}</p>
                        </button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default ModalCoinIncrease;
