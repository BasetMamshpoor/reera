"use client";

import React, {useState} from 'react';
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import Plus from "@/assets/icons/add.svg";
import {Input} from "@/components/ui/input";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import ReplyIcon from "@/assets/icons/reply.svg";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {toast} from "sonner";
import Spinner from "@/components/Spinner";
import {Textarea} from "@/components/ui/textarea";

const Reply = ({id, refetch}) => {
    const dic = useTranslation();
    const a = dic.public.profile.user_feedback;

    const [text, setText] = useState("");
    const [open, setOpen] = useState(false)

    const data = {
        body: text,
        parent_id: id
    }

    const mutation = useMutation({
        mutationFn: async (data) => {
            return await request({
                method: "post",
                url: "/comment",
                data
            });
        },
        onSuccess: (data) => {
            setText("");
            toast.success(data?.message);
            setOpen(false)
            refetch()
        },
        onError: (errors) => {
            toast.error(errors?.message);
        }
    });

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-0 shadow-none bg-transparent p-0">
                    <ReplyIcon className="fill-Gray-800"/>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col w-full h-fit gap-10">
                <DialogHeader>
                    <DialogTitle>{a.review_form}</DialogTitle>
                    <DialogDescription>
                    </DialogDescription>
                </DialogHeader>

                <div className="flex flex-col gap-2 w-full">
                    <p className="text-Gray-800">{a.write_review}</p>
                    <Textarea
                        type="text"
                        className="w-full text-Gray-800"
                        placeholder={a.text}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                    />
                </div>

                <DialogFooter>
                    <div className="grid grid-cols-3 gap-4 w-full">
                        <DialogClose asChild>
                            <Button variant="outline"
                                    className="hover:bg-transparent py-1.5 hover:text-warning-main bg-transparent text-center w-full font-bold border border-warning-main text-warning-main text-base rounded-xl">
                                {a.cancel}
                            </Button>
                        </DialogClose>

                        <Button
                            type="button"
                            onClick={() => mutation.mutate(data)}
                            className="w-full py-2 col-span-2 font-bold bg-Primary-400 hover:bg-Primary-400 text-white text-base rounded-xl text-center">
                            {mutation.isPending ? <Spinner size={20} color="white"/> : a.submit_review}
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default Reply;
