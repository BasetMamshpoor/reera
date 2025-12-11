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
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Close from "@/assets/icons/close.svg";
import {useParams} from "next/navigation";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
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

const Home = ({item, isLoading, refetch, tab, favorite}) => {
    const dic = useTranslation();
    const d = dic.public.profile.dashboard;
    const {locale} = useParams()
    const mutation = useMutation({
        mutationFn: async (id) => {
            await request({
                method: "delete",
                url: `/ad/delete/${id}`,
            });
        },
        onSuccess: () => {
            refetch()
        },
    });
    const mutation1 = useMutation({
        mutationFn: async (id) => {
            await request({
                method: "post",
                url: `/ad/sold/${id}`,
            });
        },
        onSuccess: () => {
            refetch()
        },
    });
    return (
        <>
            <div key={item.id}
                 className="flex flex-col pb-4 bg-surface rounded-xl overflow-hidden w-full h-full border border-Gray-200">
                <div className="relative max-h-[194px] h-full w-full ">
                    <Image src={item.image} width={100} height={100} alt="image" className="w-full h-full"/>
                    <div className="w-full absolute bottom-0 right-0 left-0 ">
                        <Cut className="!w-full !h-full fill-white dark:fill-surface border-0 "/>
                    </div>
                    {item.status === "approved" ?
                        <Badge
                            className="absolute top-2 right-2 bg-success-accent text-success-main flex items-center gap-1  text-xs px-3">
                            <Tick className="fill-success-main !w-4 !h-4"/>
                            <p className="text-xs text-success-main ltr:pt-1">{d.verified}</p>
                        </Badge>
                        : item.status === "pending" ?
                            <Badge
                                className="absolute top-2 right-2 bg-warning-accent text-success-main flex items-center gap-1  text-xs px-3">
                                <Clock className="fill-warning-main !w-4 !h-4"/>
                                <p className="text-xs text-warning-main ltr:pt-1">{d.pending_verification}</p>
                            </Badge> :
                            item.status === "rejected" ?
                                <Badge
                                    className="absolute top-2 right-2 bg-error-accent text-error-main flex items-center gap-1  text-xs px-3">
                                    <Close className="fill-error-main !w-4 !h-4"/>
                                    <p className="text-xs ltr:pt-1">{d.rejected}</p>
                                </Badge> :
                                item.status === "expired" ?
                                    <Badge
                                        className="absolute top-2 right-2 bg-natural-accent text-natural-main flex items-center text-xs px-3">
                                        <p className="text-xs ltr:pt-1">{d.expired}</p>
                                    </Badge> : ""
                    }
                    {item.remaining !== "expired" &&
                        <Badge
                            className="absolute top-2 left-2 bg-natural-accent text-natural-main flex items-center gap-1 text-xs px-2">
                            <Clock className="fill-natural-main !w-4 !h-4"/>
                            <p className="text-xs pt-1">
                                {item.remaining === "today" ? d.only_today : `${item.remaining} ${d.days_remaining}`}
                            </p>
                        </Badge>}
                </div>
                <div className="flex flex-col justify-between h-full px-4 gap-4 w-full pt-2">
                    <div className="flex flex-col px-4 gap-4 w-full pt-2">
                        <div className="flex flex-col gap-3 w-full">
                            <div className="flex items-center justify-between w-full ">
                                <Badge className="bg-badge-background text-badge-text text-xs px-3">
                                    {item.category}
                                </Badge>
                                <p className="text-sm text-Gray-500 ">{item.time}</p>
                            </div>
                            <p className=" lg:text-lg font-bold text-Gray-950 ">
                                {item.title}
                            </p>
                            <div className="flex flex-col gap-2">
                                {(item.custom_info?.area || item.custom_info?.bedrooms) &&
                                    <div className="flex items-center gap-2">
                                        <Hashtag className="!w-4 lg:!w-5 !h-4 lg:!h-5 fill-Gray-700 "/>
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm lg:text-base text-secondary pt-1">
                                                {item.custom_info?.area} {d.meter}
                                            </p>
                                            <p className="text-sm lg:text-base text-secondary pt-1">
                                                {item.custom_info?.bedrooms} {d.bedroom}
                                            </p>
                                        </div>
                                    </div>}
                                <div className="flex items-center gap-2">
                                    <Location className="!w-4 lg:!w-5 !h-4 lg:!h-5 fill-Gray-700 "/>
                                    <p className="text-sm lg:text-base text-secondary pt-1">{item.location}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end w-full">
                            <p className="lg:text-lg text-alpha-100 font-bold">
                                {Number(item.price).toLocaleString()} {locale === "fa" ? "تومان" : "Toman"}
                            </p>
                        </div>
                    </div>
                    {favorite === 1 ? null :
                        <div className="flex items-center justify-center w-full mt-auto gap-4">
                            <Dialog className="w-full h-fit">
                                <DialogTrigger asChild>
                                    <button
                                        disabled={mutation.isLoading}
                                        className="flex items-center cursor-pointer justify-center py-2 border rounded-xl w-full border-error-main text-error-main text-sm lg:text-base font-bold"
                                    >
                                        {mutation.isLoading ? <Spinner/> :
                                            <p className="pt-1">{d.i_cancelled}</p>
                                        }
                                    </button>
                                </DialogTrigger>
                                <DialogContent
                                    className="h-fit w-full">
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
                                        <DialogClose asChild>
                                            <Button
                                                variant="destructive"
                                                onClick={() => {
                                                    mutation.mutate(item.id);
                                                }}
                                            >
                                                {d.confirm_cancel_ad}
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <Dialog className="w-full h-fit">
                                <DialogTrigger asChild>
                                    <button
                                        disabled={mutation1.isLoading}
                                        className="flex items-center cursor-pointer justify-center py-2 bg-Primary-400 border rounded-xl w-full  text-white text-sm lg:text-base font-bold">
                                        {mutation1.isLoading ? <Spinner/> :
                                            <p className="pt-1">{tab === "request" ? d.delivered : d.i_delivered}</p>
                                        }
                                    </button>
                                </DialogTrigger>
                                <DialogContent
                                    className="h-fit w-full">
                                    <DialogHeader>
                                        <DialogTitle></DialogTitle>
                                        <DialogDescription>
                                            <div className="flex flex-col gap-3  rtl:text-right pt-6">
                                                <p className="text-sm lg:text-sm text-Gray-950 font-medium">{tab === "request" ? d.confirm_received : d.confirm_delivered}</p>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                    <DialogFooter className="grid grid-cols-2 gap-5 pt-6">
                                        <DialogClose asChild>
                                            <Button variant="outline">{d.close}</Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button
                                                variant="destructive"
                                                className="bg-Primary-400 hover:bg-Primary-400"
                                                onClick={() => {
                                                    mutation1.mutate(item.id);
                                                }}
                                            >
                                                {tab === "request" ? d.delivered : d.i_delivered}
                                            </Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                        </div>}
                </div>
            </div>
        </>
    );
};

export default Home;
