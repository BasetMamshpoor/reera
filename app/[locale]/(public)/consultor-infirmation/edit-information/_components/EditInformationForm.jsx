import Image from "next/image";
import React from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Upload from "@/assets/icons/upload.svg";
import ArrowRight from "@/assets/icons/arrow-right.svg";
const EditInformationForm = () => {
  return (
    <form
      action=""
      className="flex flex-col gap-6 mt-8 px-4 py-2 rtl:items-end w-full"
    >
      <button className="border border-Gray-200 w-full max-w-24 rounded-2xl p-4 flex items-center justify-center">
        <Image
          src={`/images/profpicalt.png`}
          width={62}
          height={62}
          alt="profile"
        />
      </button>

      <div className="flex flex-col w-full gap-4">
        <div className="flex flex-col lg:flex-row rtl:flex-row-reverse gap-4">
          <Input
            className={`py-5 bg-surface   placeholder:text-Gray-400 rounded-lg focus:border-Gray-600 rtl:text-right rtl:placeholder:text-right`}
            type="name"
            placeholder="Name"
          />
          <Input
            className={`py-5 bg-surface  placeholder:text-Gray-400 rounded-lg focus:border-Gray-600 rtl:text-right rtl:placeholder:text-right`}
            type="fullname"
            placeholder="Full Name"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 rtl:flex-row-reverse">
          <Input
            className={`py-5 bg-surface  placeholder:text-Gray-400 rounded-lg focus:border-Gray-600 rtl:text-right rtl:placeholder:text-right`}
            type="phone"
            placeholder="Phone Number"
          />
          <Input
            className={`py-5 bg-surface   placeholder:text-Gray-400 rounded-lg focus:border-Gray-600 rtl:text-right rtl:placeholder:text-right`}
            type="nationalcode"
            placeholder="National Code"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 rtl:flex-row-reverse">
          <Select>
            <SelectTrigger className="w-full border  border-Gray-200 bg-surface rounded-lg py-5">
              <SelectValue placeholder="Language" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="w-full border border-Gray-200 bg-surface rounded-lg py-5 ">
              <SelectValue placeholder="Nationality" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Light</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {/*  */}
      {/* <div className="flex flex-col gap-4 rtl:self-end">
              <h2>برای احراز هویت مدرک شناسایی خود را بارگذاری کنید</h2>
              <div className="flex items-center gap-4">
                <span className="px-4 py-1.5 bg-success-accent rounded-lg text-success-main ">
                  تایید شده
                </span>
                <Image
                  src={`/images/doc.png`}
                  width={180}
                  height={113}
                  alt="document"
                />
              </div>
            </div> */}

      <button
        type="button"
        className="bg-Comments border-dashed border-[2px] border-default-divider flex items-center justify-center w-32 h-32 rounded-4xl cursor-pointer"
      >
        <Upload />
      </button>

      <div className="flex flex-row  ltr:justify-end rtl:flex-row-reverse  items-center w-full  gap-6 mt-auto ">
        <button
          type="button"
          className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-warning-main text-warning-main rounded-lg"
        >
          انصراف
        </button>
        <button
          type="submit"
          className="flex cursor-pointer w-full rtl:flex-row-reverse items-center justify-center text-white bg-Primary-400 py-2 lg:w-42  rounded-lg"
        >
          {/* <span>{mutation.isLoading ? "در حال ارسال..." : "بعدی"}</span> */}
          <span>ذخیره اطلاعات</span>
          <ArrowRight className="fill-white rtl:rotate-180" />
        </button>
      </div>
    </form>
  );
};

export default EditInformationForm;
