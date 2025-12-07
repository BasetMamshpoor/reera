import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import Plus from "@/assets/icons/add.svg";
import Rating from "./Rating";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea";
import Spinner from "@/components/Spinner";

const ModalComment = ({a}) => {
    const [body, setBody] = useState({
        id: 794,
        parent_id: 1,
        owner_behavior_rating: "" || 0,
        price_clarity_rating: "" || 0,
        info_honesty_rating: "" || 0,
        body: "",
    });

    const mutation = useMutation({
        mutationFn: async (form) =>
            await request({
                method: "post",
                url: "/comments",
                data: form,
            }),
        onSuccess: (data) => toast.success(data?.message),
        onError: (error) => toast.error(error?.message),
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        mutation.mutate(body)
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" className="border-0 shadow-none bg-transparent p-0">
                    <div
                        className="flex items-center justify-center border border-[#4299C1] gap-2 px-2 lg:px-3 py-2 rounded-2xl">
                        <span className="text-primary-500 font-bold text-sm pt-1">{a.submit_comment}</span>
                        <Plus className="fill-primary-400"/>
                    </div>
                </Button>
            </DialogTrigger>

            <DialogContent className="flex flex-col w-full h-fit gap-10">
                <form onSubmit={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{a.review_form}</DialogTitle>
                    </DialogHeader>
                    <div className="flex flex-col gap-10 w-full">
                        <div className="grid gap-3 pt-6">

                            <div className="flex items-center justify-between w-full gap-3">
                                <p>{a.rating_owner_behavior}</p>
                                <Rating onChange={(v) => setBody((p) => ({...p, owner_behavior_rating: v}))}/>
                            </div>

                            <div className="flex items-center justify-between w-full gap-3">
                                <p>{a.rating_price_transparency}</p>
                                <Rating onChange={(v) => setBody((p) => ({...p, price_clarity_rating: v}))}/>
                            </div>

                            <div className="flex items-center justify-between w-full gap-3">
                                <p>{a.rating_information_honesty}</p>
                                <Rating onChange={(v) => setBody((p) => ({...p, info_honesty_rating: v}))}/>
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <p className="text-Gray-800">{a.write_review}</p>
                            <Textarea
                                type="text"
                                className="w-full py-6 text-Gray-500"
                                placeholder={a.text}
                                value={body.body}
                                onChange={(e) =>
                                    setBody((p) => ({...p, body: e.target.value}))
                                }
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <div className="grid grid-cols-3 gap-4 w-full mt-6">
                            <DialogClose asChild>
                                <Button
                                    variant="outline"
                                    className="py-1.5 bg-transparent border border-warning-main text-warning-main hover:text-warning-main rounded-xl"
                                >
                                    {a.cancel}
                                </Button>
                            </DialogClose>

                            <Button
                                type="submit"
                                className="col-span-2 py-2 bg-Primary-400 hover:bg-Primary-400 text-white rounded-xl"
                            >
                                {mutation.isPending ? <Spinner size={20} color="white"/> : a.submit_review}
                            </Button>
                        </div>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
        ;
};

export default ModalComment;
