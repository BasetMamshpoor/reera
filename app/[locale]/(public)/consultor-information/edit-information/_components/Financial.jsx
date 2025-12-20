"use client";
import React, { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Plus from "@/assets/icons/add.svg";
import EditPen from "@/assets/icons/Edit2.svg";

import { useTranslation } from "@/app/[locale]/TranslationContext";
import ConfrimCardInfo from "./ConfrimCardInfo";
import EnterCreditCard from "./EnterCreditCard";
import EnterOtp from "./EnterOtp";

const Financial = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [creditCardState, setCreditCardState] = useState("shaba");
  const dic = useTranslation();
  const b = dic.consultor.edit;
  return (
    <div className="flex flex-col gap-4 rtl:items-end w-full py-12 px-6">
      <h2 className="text-Gray-700 font-semibold">{b.bank_account_note}</h2>
      <div className="flex items-center gap-2">
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogTrigger className="flex items-center gap-2 rtl:flex-row-reverse">
            <Plus className="fill-Primary-400" />
            <span className="text-Primary-400 cursor-pointer font-semibold">
              {b.add_new_bank_account}
            </span>
          </DialogTrigger>

          <DialogContent
            className={`bg-surface ${
              creditCardState === "check" ? "h-130" : "h-90"
            }`}
          >
            {creditCardState === "shaba" && (
              <EnterCreditCard
                setIsModalOpen={setIsModalOpen}
                setCreditCardState={setCreditCardState}
              />
            )}
            {creditCardState === "otp" && (
              <EnterOtp
                setIsModalOpen={setIsModalOpen}
                setCreditCardState={setCreditCardState}
              />
            )}
            {creditCardState === "check" && (
              <ConfrimCardInfo
                setIsModalOpen={setIsModalOpen}
                setCreditCardState={setCreditCardState}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
        {/* first */}
        <div className="flex items-center w-full rtl:flex-row-reverse  justify-between py-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 rtl:justify-end">
              <h2 className="text-Gray-800 font-semibold">بانک تجارت</h2>
              <span className="bg-success-accent text-success-main py-1.5 rounded-lg px-2 font-semibold">
                {b.verified}
              </span>
            </div>
            <div>
              <span className="text-Text-Secondary font-semibold">
                IR-5801900000000003506535661
              </span>
            </div>
          </div>
          <div>
            <EditPen className="fill-Primary-400 cursor-pointer" />
          </div>
        </div>

        {/* sec */}
        <div className="flex items-center w-full justify-between py-4 rtl:flex-row-reverse">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-4 rtl:justify-end">
              <h2 className="text-Gray-800 font-semibold">بانک تجارت</h2>
              <span className="bg-success-accent text-success-main py-1.5 rounded-lg px-2 font-semibold">
                {b.verified}
              </span>
            </div>
            <div>
              <span className="text-Text-Secondary font-semibold">
                IR-5801900000000003506535661
              </span>
            </div>
          </div>
          <div>
            <EditPen className="fill-Primary-400 cursor-pointer" />
          </div>
        </div>
      </div>

      {/* buttons */}
      <div className="flex flex-row  ltr:justify-end rtl:flex-row-reverse  items-center w-full  gap-6 mt-auto ">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {b.cancel}
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full rtl:flex-row-reverse items-center justify-center text-white bg-Primary-400 py-2 lg:w-42  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
          <span> {b.save_information}</span>
        </button>
      </div>
    </div>
  );
};

export default Financial;
