"use client";
import React from "react";
import Prof from "@/public/images/city-profile.jpg";
import Image from "next/image";
import Cut from "@/assets/images/wave-haikei.svg";
import {Badge} from "@/components/ui/badge";
import Hashtag from "@/assets/icons/home-hashtag.svg";
import Location from "@/assets/icons/location.svg";

import Tick from "@/assets/icons/tick-circle.svg";
import Clock from "@/assets/icons/clock.svg";
import Snapp from "@/public/images/Buttoncontainer.png";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import Spinner from "@/components/Spinner";
import Trash from "@/assets/icons/Trash.svg";
import {Button} from "@/components/ui/button";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {useParams} from "next/navigation";
import Link from "next/link";


import Edit from "@/assets/icons/Edit2.svg";
import Refresh from "@/assets/icons/Refresh.svg";

const JobSearch = ({item, d, refetch}) => {
    const {locale} = useParams();
    const dic = useTranslation();
    const a = dic.public.profile.my_ads;
    const mutation = useMutation({
        mutationFn: async (id) => {
            await request({
                method: "delete",
                url: `/ads/delete/${id}`,
            });
        },
        onSuccess: () => {
            refetch();
        },
    });
    const mutation1 = useMutation({
        mutationFn: async (id) => {
            await request({
                method: "post",
                url: `/ad/extension/${id}`,
            });
        },
        onSuccess: () => {
            refetch();
        },
    });

    return (
        <>
            <div key={item.id}
                 className="grid grid-rows-4 pb-4 bg-surface rounded-xl overflow-hidden w-full border border-Gray-200 h-full">
                <div className="row-span-2 relative h-full w-full ">
                    <Image src={item.image} alt="image" width={100} height={100} className="w-full h-full"/>
                    <div className="w-full absolute -bottom-9 right-0 left-0 ">
                        <Cut className="!w-full !h-full fill-white dark:fill-surface border-0"/>
                    </div>
                </div>
                <div className="row-span-2 relative z-10 flex flex-col px-4 justify-between gap-6 w-full h-full">
                    <div class="flex flex-col gap-4 w-full">
                        <div className="flex gap-4 px-4">
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
                                {/*<p className="text-xs text-Gray-700 font-bold">اسنپ</p>*/}
                            </div>
                        </div>
                        <div className="flex flex-col gap-4 w-full">
                            <div className="flex items-center gap-2 w-full">
                                <div
                                    className="flex flex-col items-center gap-2 p-2 border border-default rounded-lg w-full">
                                    <p className="text-xs text-Gray-700 font-bold">{d.salary}</p>
                                    <p className="text-sm text-Primary-800 font-bold">
                                        {item.custom_info?.price} {item.custom_info?.currency}
                                    </p>
                                </div>
                                <div
                                    className="flex flex-col items-center gap-2 p-2 border border-default rounded-lg w-full">
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
                    </div>
                    {item.status === "pending" || item.status === "approved" ? (
                        <div className="grid grid-cols-4 items-center justify-center w-full gap-4">
                            <Link
                                onClick={() => {
                                    localStorage.setItem("slug", JSON.stringify(item.slug));
                                }}
                                href={`/${locale}/my-profile/my-ads/edit-ad/${item.id}`}
                                className="flex items-center col-span-3 gap-2 justify-center py-2 bg-Primary-400 border rounded-xl w-full  text-alphaw-100 text-sm lg:text-base font-bold"
                            >
                                <Edit className="fill-alphaw-100 !w-5 !h-5"/>
                                <p className="pt-1">{a.edit}</p>
                            </Link>
                            <Dialog className="w-full h-fit">
                                <DialogTrigger asChild>
                                    <button
                                        disabled={mutation.isLoading}
                                        className="flex items-center cursor-pointer justify-center py-2 border rounded-xl w-full border-error-main text-error-main text-sm lg:text-base font-bold"
                                    >
                                        {mutation.isLoading ? (
                                            <Spinner/>
                                        ) : (
                                            <Trash className="fill-error-main "/>
                                        )}
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="h-fit w-full">
                                    <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription>
                                            <div className="flex flex-col gap-3  rtl:text-right pt-6">
                                                <p className="lg:text-lg text-Gray-950 font-bold">
                                                    {a.confirm_delete_ad_title}
                                                </p>
                                                <p className="text-sm lg:text-sm text-Gray-950 font-medium">
                                                    {a.confirm_delete_ad_message}
                                                </p>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="grid grid-cols-2 gap-5 pt-6">
                                        <DialogClose asChild>
                                            <Button variant="outline">{a.cancel}</Button>
                                        </DialogClose>
                                        <Button
                                            variant="destructive"
                                            onClick={() => {
                                                mutation.mutate(item.id);
                                            }}
                                        >
                                            {a.delete}
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>
                    ) : item.status === "rejected" ? (
                        <div
                            className="flex items-center col-span-3 gap-2 justify-center py-2 bg-Gray-400 border rounded-xl w-full  text-alphaw-40 text-sm lg:text-base font-bold">
                            <p className="pt-1">{a.rejected}</p>
                        </div>
                    ) : item.status === "expired" ? (
                        <button
                            type={"button"}
                            onClick={() => {
                                mutation1.mutate(item.id);
                            }}
                            className="flex items-center cursor-pointer gap-2 justify-center py-2 border border-Primary-400 rounded-xl w-full text-Primary-400 text-base font-bold"
                        >
                            <Refresh className="fill-Primary-400 !w-5 !h-5"/>
                            <p className="pt-1">{a.renew_ad}</p>
                        </button>
                    ) : (
                        <div
                            className="flex items-center col-span-3 gap-2 justify-center py-2 bg-Gray-400 border rounded-xl w-full  text-alphaw-40 text-sm lg:text-base font-bold">
                            <p className="pt-1">{a.sold}</p>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default JobSearch;
