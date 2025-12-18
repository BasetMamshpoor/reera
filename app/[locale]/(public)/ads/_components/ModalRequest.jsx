import React, {useState} from 'react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogFooter, DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {toast} from "sonner";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import Spinner from "@/components/Spinner";
import {VisuallyHidden} from "@radix-ui/react-visually-hidden";
import Link from "next/link";

const ModalRequest = ({locale, id, session}) => {
    const dic = useTranslation()
    const a = dic.public.ads.all_ads.slug
    const [isOpen, setIsOpen] = useState(false);

    const [text, setText] = useState("")
    const mutation = useMutation({
        mutationFn: async (data) => {
            return await request({
                method: "post",
                url: `/ads/request/${id}`,
                data
            })
        },
        onSuccess: () => {
            toast.success(a.request_success);
            setIsOpen(false);
            setText("")
        },
        onError: (error) => {
            const message = error?.response?.data?.message;
            if (message?.includes("قبلا")) {
                toast.error(a.already_requested);
            } else {
                toast.error(a.request_failed);
            }
            setIsOpen(false);
            setText("")
        },
    });
    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate({text})
    }
    return (
        <>
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogTrigger asChild>
                    <Button
                        type="button"
                        variant="outline"
                        className="border-none shadow-none py-2 hover:bg-Primary-400 flex items-center justify-center gap-2 w-full bg-Primary-400 rounded-xl px-5 cursor-pointer"
                    >
                        <p className="text-base text-white whitespace-nowrap pt-1">{a.request_submission}</p>
                    </Button>
                </DialogTrigger>

                {!!session?.accessToken ?
                    <DialogContent className="flex flex-col gap-10 p-10 h-fit w-full">
                        <form className="flex flex-col gap-10 w-full" onSubmit={handleSubmit}>
                            <VisuallyHidden>
                                <DialogTitle></DialogTitle>
                            </VisuallyHidden>
                            <div className="flex flex-col gap-10 pt-4 w-full">
                                <p className="lg:text-lg text-Primary-950 font-semibold pt-1">{a.request_form}</p>
                                <div className="flex flex-col w-full gap-4">
                                    <p className="text-sm text-secondary">{a.request_info}</p>
                                    <Textarea
                                        value={text}
                                        onChange={(e) => setText(e.target.value)}
                                        placeholder={a.request_text_placeholder}
                                        className="w-full h-24 align-top"
                                    />
                                </div>
                            </div>

                            <DialogFooter className="grid grid-cols-2 gap-4 w-full">
                                <DialogClose asChild>
                                    <div
                                        className="flex items-center justify-center gap-2 w-full border border-warning-main rounded-xl py-2 cursor-pointer">
                                        <p className="text-base text-warning-main whitespace-nowrap">{a.cancel}</p>
                                    </div>
                                </DialogClose>

                                <Button
                                    type="submit"
                                    disabled={mutation.isPending}
                                    className="bg-Primary-400 font-bold w-full py-6 rounded-xl hover:bg-Primary-400 cursor-pointer"
                                >
                                    {mutation.isPending ? <Spinner size="30px"/> : a.send_request}
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent> :
                    <DialogContent className="flex flex-col gap-10 p-10 h-fit w-full">
                        <form className="flex flex-col gap-10 w-full" onSubmit={handleSubmit}>
                            <VisuallyHidden>
                                <DialogTitle></DialogTitle>
                            </VisuallyHidden>
                            <div className="flex flex-col gap-10 pt-4 w-full">
                                <p className="lg:text-lg text-Primary-950 font-semibold pt-1">{a.login_required_for_request}</p>
                            </div>
                            <DialogFooter className="grid grid-cols-2 gap-4 w-full">
                                <DialogClose asChild>
                                    <div
                                        className="flex items-center justify-center gap-2 w-full border border-warning-main rounded-xl py-2 cursor-pointer">
                                        <p className="text-base text-warning-main whitespace-nowrap">{a.cancel}</p>
                                    </div>
                                </DialogClose>

                                <Link href={`/${locale}/login`}
                                      className="text-center pt-2 bg-Primary-400 font-bold w-full py-2 rounded-xl hover:bg-Primary-400 cursor-pointer text-white"
                                >
                                    {a.login_or_signup}
                                </Link>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                }
            </Dialog>
        </>
    );
};

export default ModalRequest;