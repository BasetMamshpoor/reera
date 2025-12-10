import React, {useState} from 'react';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import Link from "next/link";
import Messages from "@/assets/icons/Messages.svg";
import Share from "@/components/Share";
import Image from "next/image";
import Star from "@/assets/icons/Star-bold.svg";
import Location from "@/assets/icons/location.svg";
import Modal from "@/app/[locale]/(public)/ads/_components/Modal";
import Tick from "@/assets/icons/tick-circle.svg";
import Like from "@/components/Like"
import User from "@/assets/icons/profile.svg"
import {useMutation, useQuery} from "@tanstack/react-query";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";
import ModalRequest from "./ModalRequest";
import ModalChatAndCall from "./ModalCall";
import {useParams} from "next/navigation";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import ComponentsForJobSearch from "./ComponentsForJobSearch";

const InformationAd = ({locale, data, isLoading, session, payment, jobSearch}) => {
    const dic = useTranslation()
    const a = dic.public.ads.business
    const [changePrice, setChangePrice] = useState(data?.price || 0);
    const [changeDonation, setChangeDonation] = useState(data?.donation || 0);
    const [currencySelect, setCurrencySelect] = useState(data?.currency_code || "IRT");
    const {id} = useParams()
    const mutation = useMutation({
        mutationFn: async (payload) => {
            return await request({
                method: "post",
                url: "/ads/convert",
                data: payload,
            });
        },
        onSuccess: (res, variables) => {
            if (variables?.type === "price") {
                setChangePrice(Number(res?.data));
            } else if (variables?.type === "donation") {
                setChangeDonation(Number(res?.data));
            }
        },
    });
    const handleCurrencyChange = (value, type) => {
        setCurrencySelect(value);

        const payload = {
            price: type === "price" ? data?.price : data?.donation,
            from: data?.currency_code,
            to: value,
            type,
        };
        mutation.mutate(payload);
    };

    const {data: item} = useQuery({
        queryKey: ["currency", "informationAd"],
        queryFn: async () => {
            return await request({
                method: "get",
                url: "/ads/currency",
            })
        }
    })


    return (
        <>
            <div className="w-full">
                <div
                    className="lg:hidden flex flex-col gap-12 px-4 py-6 border border-default-divider bg-surface  w-full">
                    <div className="flex flex-col gap-6 bg-surface">
                        <div className="flex flex-col gap-4">
                            <p className="font-bold text-gray-950 dark:text-gray-50">
                                {data?.title}
                            </p>
                            <div className="flex justify-between w-full">
                                <div
                                    className="lex items-center justify-center px-3 py-1 bg-badge-background rounded-lg text-sm text-badge-text w-fit">
                                    {data?.seller.is_iran ? a.iranian_roommate : a.non_iranian_roommate}
                                </div>
                                <Modal id={id} locale={locale}/>
                            </div>
                        </div>
                        <div
                            className="flex flex-col gap-4 p-4 border border-default-divider bg-surface rounded-xl">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div
                                        className="w-8 h-8 border-2 border-default-divider rounded-full flex items-center justify-center ">
                                        {data?.seller.profile ?
                                            <Image
                                                src={data?.seller.profile}
                                                alt=""
                                                width={100}
                                                height={100}
                                                className="w-screen"
                                            /> :
                                            <User className="fill-Gray-800"/>
                                        }
                                    </div>
                                    <p className="text-sm text-secondary font-bold">{data?.seller.name?.trim() ? data?.seller.name : a.anonymous}</p>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Star className="!w-4 !h-4 fill-warning-main"/>
                                    <p className="text-sm text-gray-800 dark:text-gray-200 pt-2">{data?.seller.ratings}</p>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <p className="text-xs text-Gray-700">{a.membership_duration}</p>
                                    <p className="text-sm text-gray-950 dark:text-gray-50">{data?.seller.duration}</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Location className="w-4 h-4 fill-Gray-700"/>
                                    <p className="text-sm text-gray-950 dark:text-gray-50">{data?.location}</p>
                                </div>
                            </div>
                            <Link
                                href="/public"
                                className="flex items-center justify-center px-4 py-2 w-full border border-[#4299C1] rounded-xl text-sm text-Primary-400 font-bold"
                            >{a.view_profile}</Link>
                        </div>
                        {payment && <div
                            className="flex flex-col gap-2 p-4 border border-default-divider dark:bg-[#DCFCE8] bg-[#DCFCE8] rounded-xl">
                            <div className="flex items-center gap-2">
                                <Tick className=" fill-[#16A34A]"/>
                                <p className="text-sm font-bold text-black">{a.secure_payment}</p>
                            </div>
                            <p className="text-xs text-black">{a.secure_payment_info}</p>
                        </div>}
                    </div>
                    <div className="flex flex-col gap-6">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-Gray-700">{a.price}</p>
                            <div className="flex items-center gap-1">
                                <p className="text-Primary-950 font-bold text-xl">
                                    {mutation.isPending ?
                                        <Spinner size="30px"/> : Number(changePrice).toLocaleString()}
                                </p>
                                <Select onValueChange={(val) => handleCurrencyChange(val, "price")}>
                                    <SelectTrigger
                                        className="border-none shadow-none text-Primary-400 dark:text-[#D9EDF4]">
                                        <SelectValue placeholder={currencySelect || a.select_currency_type}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="IRT">{a.toman}</SelectItem>
                                            <SelectItem value="USD">{a.dollar}</SelectItem>
                                            <SelectItem value="EUR">{a.euro}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        {data?.donation && <div className="flex items-center justify-between">
                            <p className="text-sm text-Gray-700">{a.deposit_amount}</p>
                            <div className="flex items-center gap-1">
                                <p className="text-Primary-950 font-bold text-xl">
                                    {mutation.isPending ?
                                        <Spinner size="30px"/> : Number(currencySelect).toLocaleString()}
                                </p>
                                <Select onValueChange={(val) => handleCurrencyChange(val, "donation")}>
                                    <SelectTrigger
                                        className="border-none shadow-none text-Primary-400 dark:text-[#D9EDF4]">
                                        <SelectValue placeholder={changeDonation || a.select_currency_type}/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            <SelectItem value="IRT">{a.toman}</SelectItem>
                                            <SelectItem value="USD">{a.dollar}</SelectItem>
                                            <SelectItem value="EUR">{a.euro}</SelectItem>
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>}
                    </div>
                    {jobSearch && <ComponentsForJobSearch locale={locale} data={data} a={a}/>}
                    <div
                        className={`grid ${data?.contact.mobile ? "grid-cols-2" : "grid-cols-1"} items-center gap-4 w-full`}>
                        {!!data?.contact?.mobile &&
                            <ModalChatAndCall data={data} locale={locale} a={a}/>
                            // <Link href="/" variant="outline"
                            //       className="shadow-none cursor-pointer hover:bg-transparent flex items-center justify-center gap-2 w-full border border-Primary-400 rounded-xl px-5 py-1">
                            //     <Messages className="fill-Primary-400"/>
                            //     <p className="text-base text-Primary-400 whitespace-nowrap">{a.chat}</p>
                            // </Link>
                        }
                        <ModalRequest id={id} data={data} locale={locale} a={a}/>
                    </div>
                </div>

                <div className="hidden lg:flex items-start w-full flex-col gap-6 ">
                    <div
                        className="flex flex-col gap-12 px-4 py-6 border border-default-divider bg-surface rounded-2xl w-full">
                        <div className="flex flex-col gap-6">
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <p className="text-2xl font-bold text-gray-950 dark:text-gray-50">
                                        {data?.title}
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <Share/>
                                        <Like isLike={data?.is_like} id={data?.id} url={"/ads"}/>
                                    </div>
                                </div>
                                {/*<div*/}
                                {/*    className="lex items-center justify-center px-3 py-1 bg-badge-background rounded-lg text-sm text-badge-text w-fit">*/}
                                {/*    {data?.seller.is_iran ? a.iranian_roommate : a.non_iranian_roommate}*/}
                                {/*</div>*/}
                            </div>
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-Gray-700">{a.price}</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-Primary-950 font-bold text-xl">
                                        {mutation.isPending ?
                                            <Spinner size="30px"/> : Number(changePrice).toLocaleString()}
                                    </p>
                                    <Select onValueChange={(val) => handleCurrencyChange(val, "price")}>
                                        <SelectTrigger
                                            className="border-none shadow-none text-Primary-400 dark:text-[#D9EDF4]">
                                            <SelectValue placeholder={currencySelect || a.select_currency_type}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="IRT">{a.toman}</SelectItem>
                                                <SelectItem value="USD">{a.dollar}</SelectItem>
                                                <SelectItem value="EUR">{a.euro}</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            {data?.donation && <div className="flex items-center justify-between">
                                <p className="text-sm text-Gray-700">{a.deposit_amount}</p>
                                <div className="flex items-center gap-1">
                                    <p className="text-Primary-950 font-bold text-xl">
                                        {mutation.isPending ?
                                            <Spinner size="30px"/> : Number(changeDonation).toLocaleString()}
                                    </p>
                                    <Select onValueChange={(val) => handleCurrencyChange(val, "donation")}>
                                        <SelectTrigger
                                            className="border-none shadow-none text-Primary-400 dark:text-[#D9EDF4]">
                                            <SelectValue placeholder={currencySelect || a.select_currency_type}/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectItem value="IRT">{a.toman}</SelectItem>
                                                <SelectItem value="USD">{a.dollar}</SelectItem>
                                                <SelectItem value="EUR">{a.euro}</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>}
                        </div>
                        {jobSearch && <ComponentsForJobSearch locale={locale} data={data} a={a}/>}
                        <div
                            className={`grid ${data?.contact.mobile ? "grid-cols-2" : "grid-cols-1"} items-center gap-4 w-full`}>
                            {data?.contact.mobile &&
                                <ModalChatAndCall data={data} locale={locale} a={a}/>
                                // <Link href="/" variant="outline"
                                //       className="shadow-none cursor-pointer hover:bg-transparent flex items-center justify-center gap-2 w-full border border-Primary-400 rounded-xl px-5 py-1">
                                //     <Messages className="fill-Primary-400"/>
                                //     <p className="text-base text-Primary-400 whitespace-nowrap">{a.chat}</p>
                                // </Link>
                            }
                            <ModalRequest session={session} id={id} data={data} locale={locale} a={a}/>
                        </div>
                    </div>
                    <Link href="/public"
                          className="flex flex-col gap-6 p-4 border border-default-divider bg-surface rounded-xl hover:scale-95 transition-transform w-full">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 flex items-center justify-center border-3 border-default-divider rounded-full ">
                                    {data?.seller.profile ?
                                        <Image
                                            src={data?.seller.profile}
                                            alt=""
                                            width={100}
                                            height={100}
                                            className="w-screen"
                                        /> :
                                        <User className="fill-Gray-800"/>
                                    }
                                </div>
                                <p className="text-lg text-secondary font-bold pt-1">{data?.seller.name?.trim() ? data?.seller.name : a.anonymous}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Star className="fill-warning-main !w-4 !h-4"/>
                                <p className="text-base text-Gray-800 pt-2">{data?.seller.ratings}</p>
                            </div>
                        </div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <p className="text-sm text-Gray-700">{a.membership_duration}</p>
                                <p className="text-base text-gray-950 dark:text-gray-50">{data?.seller.duration}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <Location className="!w-5 !h-5 fill-Gray-700"/>
                                <p className="text-base text-gray-950 dark:text-gray-50 pt-1">{data?.location}</p>
                            </div>
                        </div>
                    </Link>
                    <Modal locale={locale} id={id}/>
                    {payment && <div
                        className="flex flex-col gap-2 p-4 border border-default-divider dark:bg-[#DCFCE8] bg-[#DCFCE8] rounded-xl">
                        <div className="flex items-center gap-2">
                            <Tick className="w-10 h-10 fill-[#16A34A]"/>
                            <p className="text-lg font-bold text-black pt-1">{a.secure_payment}</p>
                        </div>
                        <p className="text-sm text-black">{a.secure_payment_info}</p>
                    </div>}
                </div>
            </div>
        </>
    );
};

export default InformationAd;