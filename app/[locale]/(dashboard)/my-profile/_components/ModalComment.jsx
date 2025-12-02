import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Plus from "@/assets/icons/add.svg";
import Rating from "./Rating";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";

const ModalComment = ({ a }) => {
    const [behavior, setBehavior] = useState(0);
    const [price, setPrice] = useState(0);
    const [honesty, setHonesty] = useState(0);
    const [text, setText] = useState("");

    const body = {
        id: 1,
        owner_behavior_rating: behavior ,
        price_clarity_rating : price,
        info_honesty_rating : honesty ,
        cleanliness_rating : text ,
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        const mutation = useMutation({
            mutationFn : async (body) => {
                await request({
                    method: "post",
                    url: "/api/comments",
                })
            }
        })
    };
    return (
        <Dialog>
            <form onSubmit={handleSubmit}>
                <DialogTrigger asChild>
                    <Button variant="outline" className="border-0 shadow-none bg-transparent p-0">
                        <div className="flex items-center justify-center border border-[#4299C1] gap-2 px-2 lg:px-3 py-2 rounded-2xl">
                            <span className="text-primary-500 font-bold text-sm pt-1">{a.submit_comment}</span>
                            <Plus className="fill-primary-400" />
                        </div>
                    </Button>
                </DialogTrigger>
                <DialogContent className="flex flex-col w-full h-fit gap-10">
                    <DialogHeader>
                        <DialogTitle>{a.review_form}</DialogTitle>
                        <DialogDescription>

                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col gap-10 w-full">
                        <div className="grid gap-3 pt-6">
                            <div className="flex items-center justify-between w-full gap-3">
                                <p className="text-base text-secondary">{a.rating_owner_behavior}</p>
                                <Rating onChange={setBehavior} />
                            </div>
                            <div className="flex items-center justify-between w-full gap-3">
                                <p className="text-base text-secondary">{a.rating_price_transparency}</p>
                                <Rating onChange={setPrice} />
                            </div>
                            <div className="flex items-center justify-between w-full gap-3">
                                <p className="text-base text-secondary">{a.rating_information_honesty}</p>
                                <Rating onChange={setHonesty} />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2 w-full">
                            <p className="text-Gray-800">{a.write_review}</p>
                            <Input
                                type="text"
                                className="w-full h-20 text-Gray-500"
                                placeholder={a.text}
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />
                        </div>
                    </div>

                    <DialogFooter>
                        <div className="grid grid-cols-3 gap-4 w-full">
                            <DialogClose asChild>
                                <Button variant="outline" className="hover:bg-transparent py-1.5 hover:text-warning-main bg-transparent text-center w-full font-bold border border-warning-main text-warning-main text-base rounded-xl">
                                   <p className="pt-2">{a.cancel}</p>
                                </Button>
                            </DialogClose>
                            <Button className="w-full py-2 col-span-2 font-bold hover:bg-Primary-400 bg-Primary-400 text-white text-base rounded-xl text-center">
                                <p className="pt-2">{a.submit_review}</p>
                            </Button>
                        </div>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    );
};

export default ModalComment;
