"use client";
import React, { useRef, useState } from "react";
import Upload from "@/assets/icons/upload.svg";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import ImageCrop from "./ImageCrop";

const UploadPics = ({ setCurrentStep }) => {
  const [savedImages, setSavedImages] = useState([]);

  const handleSaveImage = (imageUrl) => {
    setSavedImages((prev) => [...prev, imageUrl]);
  };

  const handleRemoveImage = (index) => {
    setSavedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-white w-full py-12 dark:bg-[#252C36] px-8">
      <div className="flex flex-col gap-6 justify-between h-full">
        <h2>عکس روی آگهی</h2>
        <div className="flex flex-wrap gap-4 items-center">
          <ImageCrop onSave={handleSaveImage} />
          {savedImages.map((img, index) => (
            <div key={index} className="relative w-32 h-32">
              <img
                src={img}
                alt={`Saved ${index}`}
                className="w-full h-full object-cover rounded-lg"
              />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center"
              >
                ×
              </button>
            </div>
          ))}
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
            className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-[#4299C1] py-2 lg:w-32 rounded-lg"
          >
            <span>بعدی</span>
            <Arrowleft className="fill-white ltr:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UploadPics;
