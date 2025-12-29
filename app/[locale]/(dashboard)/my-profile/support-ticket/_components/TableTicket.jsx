import React from 'react';
import Image from "next/image";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Eye from "@/assets/icons/eye.svg";
import Tick from "@/assets/icons/tick.svg";
import Close from "@/assets/icons/close.svg";
import {Badge} from "@/components/ui/badge";

const TableTicket = ({a, chat, setChat, data}) => {
    return (
        <>
            <div className="w-full">
                <div className="hidden lg:flex w-full p-6">
                    {!!data?.data?.length ? <Table>
                        <TableHeader className="[&_th]:bg-Primary-100 [&_th]:py-4">
                            <TableRow className={``}>
                                <TableHead className="bg-Primary-100">{a.ticket_number}</TableHead>
                                <TableHead>{a.ticket_subject}</TableHead>
                                <TableHead>{a.support_department}</TableHead>
                                <TableHead className="">{a.chat_page}</TableHead>
                                <TableHead className="">{a.status}</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.data.map((item) =>
                                <TableRow key={item.id}>
                                    <TableCell className="text-Primary-500">{item.ticket_number}</TableCell>
                                    <TableCell className={`text-Gray-600`}>{item.subject}</TableCell>
                                    <TableCell className={`text-Gray-600`}>{item.department}</TableCell>
                                    <TableCell
                                        className={`flex items-center justify-center gap-2 cursor-pointer`}
                                        onClick={() => setChat(true)}
                                    >
                                        <span className="text-xs font-bold text-Primary-400 pt-1">مشاهده</span>
                                        <Eye className="!w-5 !h-5 fill-Primary-400"/>
                                    </TableCell>

                                    <TableCell className="">
                                        {item.status === "open" ?
                                            <Badge
                                                className="text-success-main bg-success-accent text-sm px-3 py-1">{a.answered}</Badge> :
                                            item.status === "pending" ?
                                                <Badge
                                                    className="text-warning-main bg-warning-accent text-sm px-3 py-1">{a.under_review}</Badge> :
                                                <Badge
                                                    className="text-error-main bg-error-accent text-sm px-3 py-1">{a.closed}</Badge>}
                                    </TableCell>
                                </TableRow>)
                            }
                        </TableBody>
                    </Table> :
                        <div className="text-center text-Gray-950 py-4 font-medium w-full">{a.no_support_tickets}</div>}
                </div>
                <div className="lg:hidden flex flex-col px-4 py-6 gap-6 w-full">
                    {!!data?.data?.length ?
                        data?.data.map((item) =>
                            <div onClick={() => setChat(true)}
                                 className="flex flex-col px-3 py-4 border border-default-divider rounded-xl">
                                <div
                                    className="flex items-center justify-between w-full pb-6 border-b border-default-divider">
                                    <p className="text-sm font-bold text-secondary">{item.subject}</p>
                                    {item.status === "open" ?
                                        <Badge
                                            className="text-success-main bg-success-accent text-xs px-2 py-1">{a.answered}</Badge> :
                                        item.status === "pending" ?
                                            <Badge
                                                className="text-warning-main bg-warning-accent text-xs px-2 py-1">{a.under_review}</Badge> :
                                            <Badge
                                                className="text-error-main bg-error-accent text-xs px-2 py-1">{a.closed}</Badge>}
                                </div>
                                <div className="flex items-center justify-between w-full pt-6 ">
                                    <p className="text-Gray-800 text-xs">{item.department}</p>
                                    <div className="flex items-center gap-2">
                                        <p className="text-Gray-800 text-xs font-medium">{a.ticket_number}</p>
                                        <p className="text-Gray-800 text-xs font-medium">{item.ticket_number}</p>
                                    </div>
                                </div>
                            </div>) :
                        <p className="text-center text-Gray-950 py-4 font-medium w-full">{a.no_support_tickets}</p>
                    }
                </div>
            </div>
        </>
    );
};

export default TableTicket;