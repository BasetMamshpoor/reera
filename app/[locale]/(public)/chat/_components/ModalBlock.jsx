"use client";
import React, {useMemo, useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {RadioGroup} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import Flag from "@/assets/icons/block.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";

const ModalBlock = ({id, status,refetch}) => {
    const dic = useTranslation();
    const b = dic.public.ads.roommate;

    const [isOpen, setIsOpen] = useState(false);

    const fan = useMemo(
        () => (status === "blocked" ? "unblock" : "block"),
        [status]
    );

    const mutation = useMutation({
        mutationFn: async (item) => {
            return await request({
                method: "post",
                url: `/chat/${fan}/${id}`,
                data: item,
            });
        },
        onSuccess: (data) => {
            toast.success(data?.message);
            setIsOpen(false);
            refetch()
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate();
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="flex gap-2 border-none w-full shadow-none hover:bg-transparent cursor-pointer"
                >
                    <p className="text-sm md:text-base text-error-main pt-1">
                        {status === "blocked" ? "آزاد سازی" : "مسدود کردن"}
                    </p>
                    <Flag className="md:w-6 md:h-6 !w-5 !h-5 fill-error-main"/>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-between gap-6 h-fit">
                <form onSubmit={handleSubmit}>
                    <DialogTitle></DialogTitle>

                    <RadioGroup>
                        <p className="rtl:text-right pt-10">
                            {status === "blocked" ? "آیا از آزاد کردن کاربر مطمئن هستید؟" : "آیا از مسدود کردن کاربر مطمئن هستید؟"}
                        </p>
                    </RadioGroup>

                    <DialogFooter className="grid grid-cols-2 gap-4 w-full pt-6 lg:pt-10">
                        <DialogClose
                            className="flex items-center justify-center text-error-main gap-2 w-full hover:text-error-main border border-error-main rounded-xl py-2 cursor-pointer"
                            asChild>
                            <Button variant="outline">{b.cancel}</Button>
                        </DialogClose>

                        <Button
                            className="bg-error-main font-bold w-full py-5 rounded-xl hover:bg-error-main cursor-pointer text-white text-center"
                            type="submit" disabled={mutation.isPending}>
                            {mutation.isPending ?
                                <Spinner size="30px"/> : (status === "blocked" ? "بله آزاد کن" : "بله مسدود کن")}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ModalBlock;
