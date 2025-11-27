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
import { Badge } from "@/components/ui/badge";
const TableTransaction = ({ a }) => {
  return (
    <>
      <Table className="min-w-[700px] border border-[#F0F9FB] rounded-lg lg:border-0 ">
        <TableHeader className="overflow-hidden bg-Primary-100">
          <TableRow>
            <TableHead className="text-center">{a.ad_name}</TableHead>
            <TableHead className="text-center">{a.ad_type}</TableHead>
            <TableHead className="text-center">{a.payment_amount}</TableHead>
            <TableHead className="text-center">{a.payment_date}</TableHead>
            <TableHead className="text-center">{a.status}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-0">
          <TableRow>
            <TableCell className="text-black dark:text-[#F0F9FB] text-base">
              <div className="flex items-center justify-center gap-3">
                <div className="bg-surface rounded-full overflow-hidden w-10 h-10">
                  <Image
                    src={Profile}
                    alt="profile"
                    width={40}
                    height={40}
                    className="w-full h-full"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <p className="text-sm text-Gray-800">
                    خرید آپارتمان <br />
                    در استانبول
                  </p>
                </div>
              </div>
            </TableCell>
            <TableCell className="text-Gray-800 text-base">مسکن</TableCell>
            <TableCell className="text-Gray-800 text-base">
              {(20000000).toLocaleString()} تومان{" "}
            </TableCell>
            <TableCell className="text-Gray-800 text-base">
              1404/02/29
            </TableCell>
            <TableCell className="flex items-center justify-center">
              {/*<Badge*/}
              {/*      className="flex items-center justify-center w-fit px-4 py-1 bg-success-accent rounded-xl text-success-main text-sm">*/}
              {/*    {a.paid}*/}
              {/*</Badge>*/}
              <Badge className="flex items-center justify-center w-fit px-4 py-1 bg-error-accent rounded-xl text-error-main text-sm">
                {a.canceled_by_buyer}
              </Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default TableTransaction;
