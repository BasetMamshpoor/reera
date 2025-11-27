import React from "react";
import Close from "@/assets/icons/close.svg";
import { useTranslation } from "../../../TranslationContext";

const ConfrimCardInfo = ({ setIsModalOpen, setCreditCardState }) => {
  const dic = useTranslation();
  const c = dic.consultor.edit;
  return (
    <div className="flex flex-col gap-8 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">بررسی اطلاعات واریز وجه</h2>
        <Close
          onClick={() => {
            setIsModalOpen(false);
            setCreditCardState("shaba");
          }}
          className="fill-error-main"
        />
      </div>
      <div>
        <span className="text-lg text-Text-Secondary">
          لطفا اطلاعات زیر را جهت واریز وجه به دقت بازرسی کرده و اقدام لازم را
          انجام دهید
        </span>
      </div>

      <div className="border grid grid-cols-2 border-default-divider rounded-lg p-6 gap-2">
        <span className="text-Gray-700"> {c.sheba_number}</span>
        <span className="text-Text-Secondary font-semibold">
          IR-5801900000000003506535661
        </span>
        <span className="text-Gray-700">{c.bank_card_number}</span>
        <span className="text-Text-Secondary font-semibold">
          5859831112410385
        </span>
        <span className="text-Gray-700"> {o.issuing_bank} </span>
        <span className="text-Text-Secondary font-semibold">تجارت</span>
        <span className="text-Gray-700"> {o.account_holder_name} </span>
        <span className="text-Text-Secondary font-semibold">محمد ایرانی</span>
      </div>

      <div className="flex flex-row items-center w-full self-start gap-6 mt-auto ltr:justify-end rtl:justify-start">
        <button
          type="submit"
          className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-Primary-400 py-2 lg:w-42  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}

          <span> {o.confirm_verification} </span>
        </button>
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          {o.back}
        </button>
      </div>
    </div>
  );
};

export default ConfrimCardInfo;
