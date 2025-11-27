import Image from "next/image";
import React from "react";
import Search from "@/assets/icons/search.svg";
const NoRequests = () => {
  return (
    <div className="w-full flex flex-col gap-4 items-center justify-center py-8">
      <Image src={`/images/Email_empty.png`} width={180} height={180} alt="" />
      <h2 className="text-lg font-semibold text-Text-Secondary">
        در حال حاضر هیچ درخواستی برای بررسی وجود ندارد
      </h2>
      <span className="text-Gray-700">
        هر زمان کاربری درخواستی ثبت کند، می‌توانید از این بخش آن را تأیید یا رد
        کنید.
      </span>
      <button className="w-full lg:max-w-52 gap-2 cursor-pointer font-semibold text-Primary-400 border border-Primary-400  py-3 rounded-xl flex items-center justify-center">
        <span>جستجو آگهی</span>
        <Search className="fill-Primary-400" />
      </button>
    </div>
  );
};

export default NoRequests;
