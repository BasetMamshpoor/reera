import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Profile from "@/public/images/legal.png";
import Image from "next/image";
import {Badge} from "@/components/ui/badge";
import Spinner from "@/components/Spinner";
import AdvPagination from "@/components/AdvPagination";

const TableTransaction = ({a, data, isLoading}) => {
    return (
        <>
            {isLoading ?
                <div className="flex items-center justify-center w-full pt-6 lg:pt-10"><Spinner/></div>
                : <Table className="min-w-[700px] border border-default-divider rounded-lg lg:border-0 ">
                    <TableHeader className="overflow-hidden bg-Primary-100">
                        <TableRow>
                            <TableHead className="text-center">{a.transaction_code}</TableHead>
                            <TableHead className="text-center">{a.type}</TableHead>
                            <TableHead className="text-center">{a.amount}</TableHead>
                            <TableHead className="text-center">{a.date}</TableHead>
                            <TableHead className="text-center">{a.time}</TableHead>
                            <TableHead className="text-center">{a.status}</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody className="border-0">
                        {data?.map((item) => (
                            <TableRow key={item.id}>
                                <TableCell>
                                    <p className="text-sm text-Gray-800">{item.id}</p>
                                </TableCell>
                                <TableCell className="text-Gray-800 text-base">{item.type}</TableCell>
                                <TableCell className="text-Gray-800 text-base">{item.amount}</TableCell>
                                <TableCell className="text-Gray-800 text-base">{item.date}</TableCell>
                                <TableCell className="text-Gray-800 text-base">{item.time}</TableCell>
                                <TableCell className="flex items-center justify-center">
                                    {item?.status === "successful" &&
                                        <Badge
                                            className="flex items-center justify-center w-fit px-4 py-1 bg-success-accent rounded-xl text-success-main text-sm">
                                            {a.successful}
                                        </Badge>
                                    }
                                    {item?.status === "failed" &&
                                        <Badge
                                            className="flex items-center justify-center w-fit px-4 py-1 bg-error-accent rounded-xl text-error-main text-sm">
                                            {a.unsuccessful}
                                        </Badge>}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            }
        </>
    );
};

export default TableTransaction;
