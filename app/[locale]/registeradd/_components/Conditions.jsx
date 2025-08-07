import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import { Label } from "@radix-ui/react-label";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
const Conditions = () => {
  return (
    <div className="w-full py-12 px-10">
      <div className="flex flex-col gap-4 h-full">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="انتخاب ارز" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel className={`rtl:text-right`}>انتخاب ارز</SelectLabel>
              <SelectItem className={``} value="ریال">
                ریال
              </SelectItem>
              <SelectItem className={``} value="usd">
                Dollar
              </SelectItem>
              <SelectItem className={``} value="euro">
                EURO
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="flex flex-row items-center gap-4">
          <Input placeholder="قیمت کل" />
          <Input placeholder="مبلغ بیعانه" />
        </div>
        <div className="flex flex-col gap-4">
          <h2>نحوه پرداخت</h2>
          <div className="flex flex-row gap-4 items-center">
            <Checkbox className={``} />
            <Label className={`dark:text-white text-xs`}>نقدی </Label>
            <Checkbox className={``} />
            <Label className={`dark:text-white text-xs`}>اقساط </Label>
            <Checkbox className={``} />
            <Label className={`dark:text-white text-xs`}>چک </Label>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2>مناسب برای</h2>
          <div className="flex flex-row gap-4 items-center">
            <Checkbox className={``} />
            <Label className={`dark:text-white text-xs`}>خانواده </Label>
            <Checkbox className={``} />
            <Label className={`dark:text-white text-xs`}>فقط خانم </Label>
            <Checkbox className={``} />
            <Label className={`dark:text-white text-xs`}>فقط آقا </Label>
            <Checkbox className={``} />
            <Label className={`dark:text-white text-xs`}>دانشجو </Label>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <h2>قوانین</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-row gap-4">
              <Checkbox className={``} />
              <Label className={`dark:text-white text-xs`}>
                استعمال دخانیات ممنوع{" "}
              </Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox className={``} />
              <Label className={`dark:text-white text-xs`}>
                استعمال دخانیات ممنوع{" "}
              </Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox className={``} />
              <Label className={`dark:text-white text-xs`}>
                استعمال دخانیات ممنوع{" "}
              </Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox className={``} />
              <Label className={`dark:text-white text-xs`}>
                استعمال دخانیات ممنوع{" "}
              </Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox className={``} />
              <Label className={`dark:text-white text-xs`}>
                استعمال دخانیات ممنوع{" "}
              </Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox className={``} />
              <Label className={`dark:text-white text-xs`}>
                استعمال دخانیات ممنوع{" "}
              </Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox className={``} />
              <Label className={`dark:text-white text-xs`}>
                استعمال دخانیات ممنوع{" "}
              </Label>
            </div>
            <div className="flex flex-row gap-4">
              <Checkbox className={``} />
              <Label className={`dark:text-white text-xs`}>
                استعمال دخانیات ممنوع{" "}
              </Label>
            </div>
          </div>
        </div>
        {/* Buttons */}
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

export default Conditions;
