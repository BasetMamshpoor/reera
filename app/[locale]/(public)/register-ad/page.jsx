import React from "react";

import NewCategorySelector from "./NewCategorySelector";

export const metadata = {
  title: ` Reera | Register Ad register ریرا | انتخاب دسته بندی`,
  description: "Select your ad Ctegory",
};
const Page = () => {
  return (
    <>
      <div className="px-4 mx-auto w-full relative h-screen">
        <NewCategorySelector />
      </div>
    </>
  );
};

export default Page;
