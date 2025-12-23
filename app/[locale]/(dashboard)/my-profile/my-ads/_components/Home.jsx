"use client";
import React from "react";
import Image from "next/image";
import Cut from "@/assets/images/wave-haikei.svg";
import {Badge} from "@/components/ui/badge";
import Hashtag from "@/assets/icons/home-hashtag.svg";
import Location from "@/assets/icons/location.svg";
import Tick from "@/assets/icons/tick-circle.svg";
import Clock from "@/assets/icons/clock.svg";
import Close from "@/assets/icons/close.svg";
import Eye from "@/assets/icons/eye.svg";
import Edit from "@/assets/icons/Edit2.svg";
import Trash from "@/assets/icons/Trash.svg";
import Link from "next/link";
import Refresh from "@/assets/icons/Refresh.svg";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useParams} from "next/navigation";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";

const Home = ({item, refetch}) => {
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
            <div
                key={item.id}
                className="grid pb-4 bg-surface rounded-xl overflow-hidden w-full shadow-lg border border-Gray-200"
            >
                <div className="h-[250px] relative w-full ">
                    <Link href={`/${locale}/ads/${item.slug}`}
                          className="relative">
                        <Image
                            src={item.image}
                            alt="image"
                            width={100}
                            height={100}
                            className="w-full h-full"
                        />
                        <div className="w-full absolute -bottom-9 right-0 left-0 ">
                            <Cut className="!w-full !h-full fill-white dark:fill-surface border-0 "/>
                        </div>
                    </Link>
                    {item.status === "approved" ? (
                        <Badge
                            className="absolute z-10 top-2 right-2 bg-success-accent text-success-main flex items-center gap-1  text-xs px-3">
                            <Tick className="fill-success-main !w-4 !h-4"/>
                            <p className="text-xs text-success-main ltr:pt-1">
                                {a.verified}
                            </p>
                        </Badge>
                    ) : item.status === "pending" ? (
                        <Badge
                            className="absolute z-10 top-2 right-2 bg-warning-accent text-success-main flex items-center gap-1  text-xs px-3">
                            <Clock className="fill-warning-main !w-4 !h-4"/>
                            <p className="text-xs text-warning-main ltr:pt-1">
                                {a.pending_verification}
                            </p>
                        </Badge>
                    ) : item.status === "rejected" ? (
                        <Badge
                            className="absolute z-10 top-2 right-2 bg-error-accent text-error-main flex items-center gap-1  text-xs px-3">
                            <Close className="fill-error-main !w-4 !h-4"/>
                            <p className="text-xs ltr:pt-1">{a.rejected}</p>
                        </Badge>
                    ) : item.status === "expired" ? (
                        <Badge
                            className="absolute z-10 top-2 right-2 bg-natural-accent text-natural-main flex items-center text-xs px-3">
                            <p className="text-xs ltr:pt-1">{a.expired}</p>
                        </Badge>
                    ) : item.status === "sold" ? (
                        <Badge
                            className="absolute z-10 top-2 right-2 bg-success-accent text-success-main flex items-center gap-1  text-xs px-3">
                            <Tick className="fill-success-main !w-4 !h-4"/>
                            <p className="text-xs text-success-main ltr:pt-1">{a.sold}</p>
                        </Badge>
                    ) : (
                        ""
                    )}
                    {item.created_at !== "expired" && (
                        <Badge
                            className="absolute z-10 top-2 left-2 bg-natural-accent text-natural-main flex items-center gap-1 text-xs px-2">
                            <Clock className="fill-natural-main !w-4 !h-4"/>
                            <p className="text-xs pt-1">
                                {item.created_at === "today"
                                    ? a.only_today
                                    : `${item.created_at} ${a.days_remaining}`}
                            </p>
                        </Badge>
                    )}
                </div>
                <div className=" relative z-10 flex flex-col px-4 justify-between h-full gap-4 w-full pt-2">
                    <div className="flex flex-col gap-4 w-full">
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
                                {(item.custom_info?.area || item.custom_info?.bedrooms) && (
                                    <div className="flex items-center gap-2">
                                        <Hashtag className="!w-4 lg:!w-5 !h-4 lg:!h-5 fill-Gray-700 "/>
                                        <div className="flex items-center gap-1">
                                            <p className="text-sm lg:text-base text-secondary pt-1">
                                                {item.custom_info?.area} {a.meter}
                                            </p>
                                            <p className="text-sm lg:text-base text-secondary pt-1">
                                                {item.custom_info?.bedrooms} {a.bedroom}
                                            </p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Location className="!w-4 lg:!w-5 !h-4 lg:!h-5 fill-Gray-700 "/>
                                    <p className="text-sm lg:text-base text-secondary pt-1">
                                        {item.location}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-between w-full">
                            <div className="flex items-center justify-center gap-2">
                                <Eye className="fill-Gray-700 !w-5 !h-5"/>
                                <p className="text-Gray-700 pt-1">{item.view}</p>
                            </div>
                            <p className="lg:text-lg text-alpha-100 font-bold">
                                {Number(item.price).toLocaleString()}{" "}
                                {locale === "fa" ? "تومان" : "Toman"}
                            </p>
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
                                            <Trash className="fill-error-main"/>
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
                                            {mutation.isPending ? <Spinner size={25}/> : a.delete}
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
                            className="flex items-center gap-2 justify-center py-2 border border-Primary-400 rounded-xl w-full text-Primary-400 text-base font-bold"
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

export default Home;
