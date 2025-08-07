"use client";
import React, { useRef, useState } from "react";
import Upload from "@/assets/icons/upload.svg";
import Crop from "@/assets/icons/crop.svg";
import Sun from "@/assets/icons/sun.svg";
import Rotate from "@/assets/icons/rotate.svg";
import Star from "@/assets/icons/star.svg";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
const UploadPics = ({ setCurrentStep }) => {
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(null); // store single image

  const handleFileChange = (event) => {
    const file = event.target.files?.[0]; // only one file
    if (file) {
      setImage(URL.createObjectURL(file));
    }
    event.target.value = ""; // allow selecting the same file again
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => e.preventDefault();

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="bg-white w-full py-12 px-8">
      <div className="flex flex-col gap-6 justify-between">
        <h2>عکس روی آگهی</h2>
        <div className="grid grid-cols-5 gap-x-4">
          <Dialog>
            <DialogTrigger asChild>
              <button
                type="button"
                className="bg-[#EEF0F1] border-dashed border-[2px] border-[#D1D5DB] flex items-center justify-center w-32 h-32 rounded-4xl cursor-pointer"
              >
                <Upload />
              </button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Upload your picture here</DialogTitle>
                <DialogDescription className="text-gray-500 text-sm mb-4">
                  {image
                    ? "Your uploaded picture"
                    : "Drag and drop your picture below, or click to upload"}
                </DialogDescription>
              </DialogHeader>

              {/* Show Upload Zone ONLY if no image */}
              {!image && (
                <div
                  className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer transition hover:bg-gray-50"
                  onClick={handleClick}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <p className="text-gray-500">
                    Drop your image here or click to upload
                  </p>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                  />
                </div>
              )}

              {/* Image Preview */}
              {image && (
                <div className="relative h-full w-full rounded-lg overflow-hidden py-10 flex flex-col gap-2">
                  <img
                    src={image}
                    alt="Uploaded preview"
                    className="object-cover w-full h-full"
                  />
                  <button
                    onClick={removeImage}
                    className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center"
                  >
                    ×
                  </button>
                  <div className="flex flex-row items-center justify-center gap-4">
                    <button className="cursor-pointer">
                      <Crop />
                    </button>
                    <button className="cursor-pointer">
                      {" "}
                      <Sun />
                    </button>
                    <button className="cursor-pointer">
                      {" "}
                      <Rotate />
                    </button>
                    <button className="cursor-pointer">
                      {" "}
                      <Star />
                    </button>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            multiple
            style={{ display: "none" }}
          />
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

export default UploadPics;
