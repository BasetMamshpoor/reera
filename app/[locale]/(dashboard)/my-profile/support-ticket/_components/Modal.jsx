import React from 'react';
import {Button} from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

import Plus from "@/assets/icons/add.svg"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


const Modal = ({a}) => {
    return (
        <>
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button variant="outline"
                                className="flex items-center justify-center hover:bg-Primary-400 hover:text-white gap-1 px-6 py-5 whitespace-nowrap bg-Primary-400 rounded-xl w-fit text-white text-base font-bold">
                            <Plus className="fill-white"/>
                            <p className="pt-1.5">{a.submit_ticket}</p>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] h-fit">
                        <DialogHeader>
                            <DialogTitle>{a.new_ticket}</DialogTitle>
                        </DialogHeader>
                        <div className="flex flex-col gap-6 py-10">
                            <Select>
                                <SelectTrigger className="border border-default-divider rounded-xl w-full">
                                    <SelectValue placeholder={a.related_unit}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="apple">Apple</SelectItem>
                                        <SelectItem value="banana">Banana</SelectItem>
                                        <SelectItem value="blueberry">Blueberry</SelectItem>
                                        <SelectItem value="grapes">Grapes</SelectItem>
                                        <SelectItem value="pineapple">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <Select>
                                <SelectTrigger className="border border-default-divider rounded-xl w-full">
                                    <SelectValue placeholder={a.request_title}/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="apple1">Apple</SelectItem>
                                        <SelectItem value="banana2">Banana</SelectItem>
                                        <SelectItem value="blueberry3">Blueberry</SelectItem>
                                        <SelectItem value="grapes4">Grapes</SelectItem>
                                        <SelectItem value="pineapple5">Pineapple</SelectItem>
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <textarea placeholder={a.description}
                                      className="border border-default-divider rounded-xl w-full py-2 px-4"/>
                        </div>
                        <DialogFooter>
                            <div className="flex items-center gap-6 w-full ">
                                <DialogClose asChild>
                                    <button
                                        className="flex cursor-pointer items-center justify-center gap-1 px-6 py-2 border border-warning-main text-warning-main rounded-xl w-full text-base font-bold">
                                        <p className="pt-1.5">{a.cancel}</p>
                                    </button>
                                </DialogClose>
                                <div
                                    className="flex cursor-pointer items-center justify-center gap-1 px-6 py-2 bg-Primary-400 border rounded-xl w-full text-white text-base font-bold">
                                    <p className="pt-1.5">{a.send_ticket}</p>
                                </div>
                            </div>
                            {/*<DialogClose asChild>*/}
                            {/*    <Button variant="outline">Cancel</Button>*/}
                            {/*</DialogClose>*/}
                            {/*<Button type="submit">Save changes</Button>*/}
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>
        </>
    );
};

export default Modal;