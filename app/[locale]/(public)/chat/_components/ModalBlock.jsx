"use client";
import React, {useState} from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import Flag from "@/assets/icons/";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Link from "next/link";
import {useSession} from "next-auth/react";
import {useMutation} from "@tanstack/react-query";
import {toast} from "sonner";
import {request} from "@/lib/api";
import Spinner from "@/components/Spinner";

const ModalBlock = ({locale, id}) => {
    const dic = useTranslation();
    const b = dic.public.ads.roommate;

    const {data: session} = useSession();
    const [isOpen, setIsOpen] = useState(false);
    const [choos, setChoos] = useState("");

    const loginLink = session?.user
        ? `/${locale}/ads/all-ads/${id}`
        : `/${locale}/login?callbackUrl=/${locale}/ads/all-ads/${id}`;

    const mutation = useMutation({
        mutationFn: async (item) => {
            return await request({
                method: "post",
                url: `/ads/${id}/report`,
                data: item,
                headers: {
                    Authorization: `Bearer ${session?.accessToken}`,
                },
            });
        },
        onSuccess: () => {
            toast.success(b.report_success);
            setIsOpen(false);
        },
        onError: () => {
            toast.error(b.report_failed);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!choos) {
            toast.error(b.please_select_one);
            return;
        }
        mutation.mutate({reason: choos});
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    type="button"
                    variant="outline"
                    className="flex gap-2 border-none shadow-none hover:bg-transparent cursor-pointer"
                >
                    <Flag className="md:w-6 md:h-6 !w-5 !h-5 fill-error-main"/>
                    <p className="text-sm md:text-base text-error-main pt-1">
                        مسدود کردن
                    </p>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col justify-between gap-6 p-10 h-fit">
                {session?.accessToken ? (
                    <form onSubmit={handleSubmit}>
                        <DialogTitle>{b.report_violation}</DialogTitle>

                        <div className="flex flex-col gap-6 pt-4">
                            <p className="lg:text-lg text-Primary-950 font-semibold pt-1">
                                {b.report_violation}
                            </p>

                            <RadioGroup dir={locale === "fa" ? "rtl" : "ltr"} onValueChange={setChoos}>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="fraud"/>
                                    <Label>{b.fraud}</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="illegal_or_unethical"/>
                                    <Label>{b.illegal_or_unethical}</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="wrong_category"/>
                                    <Label>{b.wrong_category}</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="wrong_price"/>
                                    <Label>{b.wrong_price}</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="wrong_information"/>
                                    <Label>{b.wrong_information}</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="unavailable_or_unresponsive"/>
                                    <Label>{b.unavailable_or_unresponsive}</Label>
                                </div>
                                <div className="flex items-center gap-3">
                                    <RadioGroupItem value="other"/>
                                    <Label>{b.other}</Label>
                                </div>
                            </RadioGroup>
                        </div>

                        <DialogFooter className="grid grid-cols-2 gap-4 w-full pt-6 lg:pt-10">
                            <DialogClose
                                className="flex items-center justify-center text-warning-main gap-2 w-full border border-warning-main rounded-xl py-2 cursor-pointer"
                                asChild>
                                <Button variant="outline">{b.cancel}</Button>
                            </DialogClose>

                            <Button
                                className="bg-Primary-400 font-bold w-full py-5 rounded-xl hover:bg-Primary-400 cursor-pointer text-white text-center"
                                type="submit" disabled={mutation.isPending}>
                                {mutation.isPending ? <Spinner size="30px"/> : b.submit}
                            </Button>
                        </DialogFooter>
                    </form>
                ) : (
                    <div className="flex flex-col justify-between gap-6 p-10 h-fit">
                        <VisuallyHidden>
                            <DialogTitle>{b.login_required_to_report}</DialogTitle>
                        </VisuallyHidden>
                        <p className="lg:text-lg text-Primary-950 font-semibold pt-1">
                            {b.login_required_to_report}
                        </p>

                        <DialogFooter className="grid grid-cols-2 gap-4 w-full">
                            <DialogClose asChild>
                                <Button variant="outline">{b.cancel}</Button>
                            </DialogClose>
                            <Link
                                href={loginLink}
                                className="bg-Primary-400 font-bold w-full py-2 rounded-xl hover:bg-Primary-400 cursor-pointer text-white text-center"
                            >
                                {b.login_or_signup}
                            </Link>
                        </DialogFooter>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ModalBlock;
