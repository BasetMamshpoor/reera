"use client";
import React, { useState, useRef } from "react";
import Upload from "@/assets/icons/upload.svg";
import Close from "@/assets/icons/close.svg";
import Tick from "@/assets/icons/tick.svg";

const ResumeTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      console.log("Selected file:", file);
    }
  };

  const handleDivClick = () => {
    fileInputRef.current?.click();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      setSelectedFile(file);

      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        setPreviewUrl(url);
      }

      console.log("Dropped file:", file);
    }
  };

  const removeFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className=" flex flex-col gap-6 w-full h-full">
      <div className="flex flex-col gap-4 w-full rtl:items-end">
        <div className="w-full flex rtl:justify-end">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileSelect}
            accept="image/*,video/*"
            className="hidden"
          />

          <div
            className="border w-full max-w-lg p-6 bg-alphaw-100 border-dashed rounded-lg border-default-divider flex flex-col items-center justify-center py-4 gap-4 cursor-pointer hover:border-Primary-300 transition-colors duration-200"
            onClick={handleDivClick}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            style={{ minHeight: "200px" }}
          >
            <button className="p-4 bg-Gray-100 rounded-full hover:bg-Gray-200 transition-colors duration-200">
              <Upload />
            </button>
            <div className="flex flex-col gap-2 text-center">
              <div className="flex items-center gap-2 rtl:flex-row-reverse">
                <span className="text-Primary-500 cursor-pointer hover:text-Primary-600">
                  کلیک کنید
                </span>
                <span className="text-Text-Secondary">
                  یا فایل خود را در این محل قرار دهید
                </span>
              </div>
              <span className="text-Gray-400">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </span>
            </div>
          </div>

          {previewUrl && (
            <div className="flex flex-col gap-3 w-full max-w-lg rtl:items-end">
              <div className="flex items-center justify-between w-full">
                <h3 className="text-Gray-600 font-medium">پیش‌نمایش تصویر:</h3>
                <button
                  onClick={removeFile}
                  className="text-error-main hover:text-error-dark flex items-center gap-2 transition-colors duration-200"
                >
                  <Close className="w-4 h-4 fill-error-main" />
                  حذف تصویر
                </button>
              </div>

              <div className="border border-default-divider rounded-lg p-3 bg-alphaw-100 w-full">
                <div className="flex flex-col items-center gap-3">
                  <img
                    src={previewUrl}
                    alt="پیش‌نمایش تصویر آپلود شده"
                    className="max-w-full max-h-64 object-contain rounded-md"
                    onLoad={() => URL.revokeObjectURL(previewUrl)}
                  />
                  <div className="text-center">
                    <p className="text-Text-Secondary text-sm">
                      {selectedFile.name}
                    </p>
                    <p className="text-Gray-400 text-xs">
                      {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedFile &&
            selectedFile.type.startsWith("video/") &&
            !previewUrl && (
              <div className="flex flex-col gap-3 w-full max-w-lg rtl:items-end">
                <div className="flex items-center justify-between w-full">
                  <h3 className="text-Gray-600 font-medium">فایل ویدیویی:</h3>
                  <button
                    onClick={removeFile}
                    className="text-error-main hover:text-error-dark flex items-center gap-2 transition-colors duration-200"
                  >
                    <Close className="w-4 h-4 fill-error-main" />
                    حذف فایل
                  </button>
                </div>

                <div className="border border-default-divider rounded-lg p-4 bg-alphaw-100 w-full">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-Primary-100 rounded-full">
                      <Upload className="w-6 h-6 fill-Primary-500" />
                    </div>
                    <div className="flex flex-col">
                      <p className="text-Text-Secondary text-sm font-medium">
                        {selectedFile.name}
                      </p>
                      <p className="text-Gray-400 text-xs">
                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
        </div>
      </div>

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
          <Tick className="fill-white " />
        </button>
      </div>
    </div>
  );
};

export default ResumeTab;
