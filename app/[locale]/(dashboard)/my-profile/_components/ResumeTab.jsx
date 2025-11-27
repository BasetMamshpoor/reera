"use client";
import React, { useState, useRef } from "react";
import Upload from "@/assets/icons/upload.svg";
import Close from "@/assets/icons/close.svg";
import Tick from "@/assets/icons/tick-circle.svg";
import Spinner from "@/components/Spinner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";

const ResumeTab = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);
  const dic = useTranslation();
  const r = dic.consultor.edit;
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

  const mutation = useMutation({
    mutationFn: async (data) =>
      await request({
        url: "/profile/resumeUpdate",
        method: "post",
        data,
      }),

    onSuccess: () => {
      toast.success("Your resume has been Updated");
    },
    onError: (e) => {
      toast.error(`${e?.message} failed to update`);
    },
  });

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

      <div className="flex items-center gap-4 w-ful ltr:self-end rtl:self-start">
        <button
          type="submit"
          disabled={mutation.isPending}
          className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
        >
          {mutation.isPending ? (
            <Spinner size="small" />
          ) : (
            <>
              <p>{r.save_information}</p>
              <Tick className="fill-white dark:fill-black w-5 h-5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ResumeTab;
