import React from "react";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import Arrowleft from "@/assets/icons/arrow-left.svg";
const ContactInfo = ({ setCurrentStep }) => {
  return (
    <div className="bg-white px-10 py-12 w-full">
      <div className="flex flex-col gap-6 h-full">
        <h2>نوع ارتباط:</h2>
        <div className="flex flex-row gap-4 items-center">
          <Checkbox className={``} />
          <Label className={`dark:text-white text-xs`}>پیام از چت ریرا</Label>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Checkbox className={``} />
          <Label className={`dark:text-white text-xs`}>
            {" "}
            تماس با شماره 09128745954{" "}
          </Label>
        </div>
        <div className="flex flex-row gap-4 items-center">
          <Checkbox className={``} />
          <Label className={`dark:text-white text-xs`}>
            تماس با شماره دیگر{" "}
          </Label>
        </div>

        <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
          <button
            type="button"
            className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
          >
            انصراف
          </button>
          <button
            onClick={() => setCurrentStep((prev) => prev + 1)}
            type="submit"
            className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-[#4299C1] py-2 lg:w-32  rounded-lg"
          >
            {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
            <span>بعدی</span>
            <Arrowleft className="fill-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
