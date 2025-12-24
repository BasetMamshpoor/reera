"use client";
import React, { useState } from "react";
import Image from "next/image";
import Cut from "@/assets/images/wave-haikei.svg";
import Location from "@/assets/icons/location.svg";

import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import Spinner from "@/components/Spinner";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {toast} from "sonner";

const JobSearch = ({item, d, tab, refetch, favorite}) => {
    console.log(item)
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [isSoldDialogOpen, setIsSoldDialogOpen] = useState(false);

    const mutation = useMutation({
        mutationFn: async (id) => {
            await request({
                method: "delete",
                url: `/ads/delete/${id}`,
            });
        },
        onSuccess: (data) => {
            refetch();
            toast.success(data.message);
            setIsDeleteDialogOpen(false);
        },
        onError: (err) => {
            toast.error(err.message);

        }
    });

    const mutation1 = useMutation({
        mutationFn: async (id) => {
            await request({
                method: "post",
                url: `/ad/sold/${id}`,
            });
        },
        onSuccess: (data) => {
            refetch();
            toast.success(data.message);
            setIsSoldDialogOpen(false);
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    return (
        <div className="flex flex-col pb-4 bg-surface rounded-xl overflow-hidden w-full border border-Gray-200 h-full">
            <div className="relative max-h-[194px] h-full w-full ">
                <Image src={item?.image} alt="image" width={100} height={100} className="w-full h-full"/>
                <div className="w-full absolute bottom-0 right-0 left-0 ">
                    <Cut className="!w-full !h-full fill-white dark:fill-surface border-0"/>
                </div>
                <div className="absolute left-0 right-0 -bottom-5 flex gap-4 px-4">
                    <div className="max-w-[72px] w-full">
                        <Image
                            src={item.custom_info?.icon}
                            alt="logo"
                            width={72}
                            height={72}
                            className={`w-full`}
                        />
                    </div>
                    <div className="flex flex-col gap-2 pt-2">
                        <p className="text-sm text-alpha-100 font-bold">{item.title}</p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col px-4 justify-between gap-6 w-full h-full pt-8">
                <div className="flex flex-col gap-4 w-full">
                    <div className="flex items-center gap-2 w-full">
                        <div className="flex flex-col items-center gap-2 p-2 border border-default rounded-lg w-full">
                            <p className="text-xs text-Gray-700 font-bold">{d.salary}</p>
                            <p className="text-sm text-Primary-800 font-bold">
                                {item.custom_info?.price|| 0} {item.custom_info?.currency}
                            </p>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-2 border border-default rounded-lg w-full">
                            <p className="text-xs text-Gray-700 font-bold">{d.employment_type}</p>
                            <p className="text-sm text-Primary-800 font-bold">{item.custom_info?.type}</p>
                        </div>
                    </div>
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-2">
                            <Location className="!w-4 lg:!w-5 !h-4 lg:!h-5 fill-Gray-700 "/>
                            <p className="text-sm text-Gray-700 pt-1">{item.location}</p>
                        </div>
                        <p className="text-sm text-Gray-700 ">{item.time}</p>
                    </div>
                </div>

                {!!favorite ? null : (
                    <div className="flex items-center justify-center w-full gap-4">
                        {/* حذف */}
                        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                            <DialogTrigger asChild>
                                <button
                                    disabled={mutation.isLoading}
                                    className="flex items-center justify-center py-2 border rounded-xl w-full border-error-main text-error-main text-sm lg:text-base font-bold"
                                >
                                    {mutation.isLoading ? <Spinner/> :
                                        <p className="pt-1">{tab === "request" ? d.i_cancelled : d.rejected_ad}</p>
                                    }
                                </button>
                            </DialogTrigger>

                            <DialogContent className="h-fit w-full">
                                <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                    <DialogDescription>
                                        <div className="flex flex-col gap-3  rtl:text-right pt-6">
                                            <p className="text-sm lg:text-sm text-Gray-950 font-medium">{tab === "ad" ? d.confirm_reject_ad : d.confirm_cancel_ad}</p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="grid grid-cols-2 gap-5 pt-6">
                                    <DialogClose asChild>
                                        <Button variant="outline">{d.close}</Button>
                                    </DialogClose>
                                    <Button
                                        variant="outline"
                                        className="bg-error-main text-white hover:bg-error-main  hover:text-white"
                                        onClick={() => mutation.mutate(item.id)}
                                    >
                                        {mutation.isPending ? <Spinner size={25}/> : tab === "ad" ? d.rejected_ad : d.i_cancelled}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>

                        {/* استخدام */}
                        <Dialog open={isSoldDialogOpen} onOpenChange={setIsSoldDialogOpen}>
                            <DialogTrigger asChild>
                                <button
                                    disabled={mutation1.isLoading}
                                    className="flex items-center justify-center py-2 bg-Primary-400 border rounded-xl w-full text-white text-sm lg:text-base font-bold"
                                >
                                    {mutation1.isLoading ? <Spinner/> :
                                        <p className="pt-1">{tab === "request" ? d.hired_status : d.hired}</p>
                                    }
                                </button>
                            </DialogTrigger>

                            <DialogContent className="h-fit w-full">
                                <DialogHeader>
                                    <DialogTitle></DialogTitle>
                                    <DialogDescription>
                                        <div className="flex flex-col gap-3  rtl:text-right pt-6">
                                            <p className="text-sm lg:text-sm text-Gray-950 font-medium">{tab === "ad" ? d.confirm_hired_someone : d.confirm_got_hired}</p>
                                        </div>
                                    </DialogDescription>
                                </DialogHeader>
                                <DialogFooter className="grid grid-cols-2 gap-5 pt-6">
                                    <DialogClose asChild>
                                        <Button variant="outline">{d.close}</Button>
                                    </DialogClose>
                                    <Button
                                        className="bg-Primary-400 hover:bg-Primary-300 text-white hover:text-white"
                                        onClick={() => mutation1.mutate(item.id)}
                                    >
                                        {mutation1.isPending ? <Spinner size={25}/> : tab === "request" ? d.hired_status : d.hired}
                                    </Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobSearch;
