"use client";
import React, {useState, useRef} from "react";
import Upload from "@/assets/icons/upload.svg";
import Close from "@/assets/icons/close.svg";
import Tick from "@/assets/icons/tick-circle.svg";
import Spinner from "@/components/Spinner";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {toast} from "sonner";

const ResumeTab = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const fileInputRef = useRef(null);
    const dic = useTranslation();
    const r = dic.consultor.edit;

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            if (file.type.startsWith("image/")) {
                const url = URL.createObjectURL(file);
                setPreviewUrl(url);
            }
        }
    };

    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    const removeFile = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // ✅ ارسال فایل به بک‌اند
    const mutation = useMutation({
        mutationFn: async (formData) =>
            await request({
                url: "/profile/resumeUpdate",
                method: "post",
                data: formData,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),

        onSuccess: () => {
            toast.success("Your resume has been Updated");
        },
        onError: (e) => {
            toast.error(`${e?.message} failed to update`);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!selectedFile) {
            toast.error("No file selected");
            return;
        }

        const formData = new FormData();
        formData.append("resume", selectedFile); // 👈 اسم فیلد مطابق API تو

        mutation.mutate(formData);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className=" flex flex-col gap-6 w-full h-full"
        >
            <div className="flex flex-col gap-4 w-full rtl:items-end">
                <div className="w-full flex flex-col lg:flex-row gap-4 rtl:justify-end">

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
                        style={{minHeight: "200px"}}
                    >
                        <button className="p-4 bg-Gray-100 rounded-full hover:bg-Gray-200 transition-colors duration-200">
                            <Upload/>
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
                        <div className="flex flex-col gap-3 w-full max-w-lg rtl:items-end border border-default-divider rounded-lg p-3 bg-alphaw-100">
                            <div className="flex items-center justify-between w-full">
                                <h3 className="text-Gray-600 font-medium">پیش‌نمایش تصویر:</h3>
                                <button
                                    onClick={removeFile}
                                    type="button"
                                    className="text-error-main hover:text-error-dark flex items-center gap-2 transition-colors duration-200"
                                >
                                    <Close className="w-4 h-4 fill-error-main"/>
                                    حذف تصویر
                                </button>
                            </div>

                            <img
                                src={previewUrl}
                                alt="preview"
                                className="max-w-full max-h-64 object-contain rounded-md"
                            />
                        </div>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-4 w-full ltr:self-end rtl:self-start">
                <button
                    type="submit"
                    disabled={mutation.isPending}
                    className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    <p>{r.save_information}</p>
                    {mutation.isPending ?
                        <Spinner size={20} color="white"/> :
                        <Tick className="fill-white dark:fill-black w-5 h-5"/>
                    }
                </button>
            </div>
        </form>
    );
};

export default ResumeTab;
