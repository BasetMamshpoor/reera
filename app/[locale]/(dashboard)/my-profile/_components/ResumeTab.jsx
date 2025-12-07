"use client";
import React, { useState, useRef, useEffect } from "react";
import Upload from "@/assets/icons/upload.svg";
import Close from "@/assets/icons/close.svg";
import Tick from "@/assets/icons/tick-circle.svg";
import Spinner from "@/components/Spinner";
import { useTranslation } from "@/app/[locale]/TranslationContext";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { request } from "@/lib/api";
import { toast } from "sonner";

const ResumeTab = () => {
    const fileInputRef = useRef(null);
    const dic = useTranslation();
    const r = dic.consultor.edit;
    const queryClient = useQueryClient();

    // selectedFile: File object that user picked (not yet uploaded)
    // previewUrl: data URL (for local file) or remote URL (from server)
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

    // removedExisting: true if user chose to remove the existing server image (and didn't pick a new one)
    // This flag will inform submit to send remove=1 so backend can delete the old file (optional)
    const [removedExisting, setRemovedExisting] = useState(false);

    // -----------------------
    // fetch existing image from server (if any)
    // -----------------------
    const { data, isLoading: isFetching } = useQuery({
        queryKey: ["show_resume_file"],
        queryFn: async () =>
            await request({
                url: "/profile/show_resume_file",
                method: "get",
            }),
        // don't refetch on window focus by default (optional)
        staleTime: 1000 * 60 * 2,
    });

    // If server returns an image url, and user hasn't selected a new file, show it
    useEffect(() => {
        if (!selectedFile && data?.data?.video_url) {
            setPreviewUrl(data.data.video_url);
            setRemovedExisting(false);
        }
    }, [data, selectedFile]);

    // cleanup object URL when component unmounts or previewUrl changes from a local blob
    useEffect(() => {
        return () => {
            // if we created an object URL for selectedFile, revoke it
            if (previewUrl && previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // -----------------------
    // handle file selection (user picks a new image)
    // -----------------------
    const handleFileSelect = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // revoke previous local object URL if existed
        if (previewUrl && previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }

        const url = URL.createObjectURL(file);
        setSelectedFile(file);
        setPreviewUrl(url);
        setRemovedExisting(false); // user replaced existing image with a new one
    };

    // user clicks the big box to open file picker
    const handleDivClick = () => {
        fileInputRef.current?.click();
    };

    // user removes preview (local or server) — mark removedExisting if server image was present
    const handleRemove = () => {
        // revoke local blob url if any
        if (previewUrl && previewUrl.startsWith("blob:")) {
            URL.revokeObjectURL(previewUrl);
        }

        // clear selectedFile and preview
        setSelectedFile(null);
        setPreviewUrl(null);

        // if server had an image (data) mark it removed so submit will tell backend to remove it
        if (data?.data?.video_url) {
            setRemovedExisting(true);
        } else {
            setRemovedExisting(false);
        }

        // also clear file input element
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    // -----------------------
    // upload mutation
    // -----------------------
    // On success: we update previewUrl with response url (if available), invalidate queries if needed
    const mutation = useMutation({
        mutationFn: async (formData) =>
            await request({
                url: "/profile/store_resume_file",
                method: "post",
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            }),
        onSuccess: (res) => {
            toast.success("عکس با موفقیت ذخیره شد");
            // if backend returns the new image url, update preview
            const newUrl = res?.data?.video_url || res?.data?.resume_url || null;
            if (newUrl) {
                setPreviewUrl(newUrl);
                setSelectedFile(null);
                setRemovedExisting(false);
            }
            // optionally refresh the query that shows the image
            queryClient.invalidateQueries(["show_resume_file"]);
        },
        onError: (e) => {
            toast.error(e?.response?.data?.message || "خطا در آپلود فایل");
        },
    });

    // -----------------------
    // submit handler
    // -----------------------
    const handleSubmit = (e) => {
        e.preventDefault();

        // If user removed existing and didn't pick a new file -> tell backend to remove it
        if (!selectedFile && removedExisting) {
            const formData = new FormData();
            formData.append("remove", "1"); // backend should handle this flag (optional)
            mutation.mutate(formData);
            return;
        }

        // if user picked a new file -> upload it (will replace server-side)
        if (selectedFile) {
            const formData = new FormData();
            formData.append("resume_file", selectedFile); // change key if your backend expects different name
            mutation.mutate(formData);
            return;
        }

        // nothing to do
        toast("تغییری برای ذخیره وجود ندارد");
    };

    // -----------------------
    // render
    // -----------------------
    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full h-full">
            <div className="flex flex-col gap-4 w-full rtl:items-end">
                <div className="w-full flex flex-col lg:flex-row gap-4 rtl:justify-end">
                    {/* hidden file input */}
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleFileSelect}
                        accept="image/*"
                        className="hidden"
                    />

                    {/* Upload box */}
                    <div
                        className="border w-full max-w-lg p-6 bg-alphaw-100 border-dashed rounded-lg border-default-divider flex flex-col items-center justify-center py-4 gap-4 cursor-pointer hover:border-Primary-300 transition-colors duration-200"
                        onClick={handleDivClick}
                        style={{ minHeight: "200px" }}
                    >
                        <button
                            type="button"
                            className="p-4 bg-Gray-100 rounded-full hover:bg-Gray-200 transition-colors duration-200"
                        >
                            <Upload />
                        </button>

                        <div className="flex flex-col gap-2 text-center">
                            <div className="flex items-center gap-2 rtl:flex-row-reverse">
                <span className="text-Primary-500 cursor-pointer hover:text-Primary-600">
                  کلیک کنید
                </span>
                                <span className="text-Text-Secondary">
                  یا عکس خود را در اینجا قرار دهید
                </span>
                            </div>
                            <span className="text-Gray-400">JPG • PNG • GIF</span>
                        </div>
                    </div>

                    {/* preview */}
                    {previewUrl && (
                        <div className="flex flex-col gap-3 w-full max-w-lg rtl:items-end border border-default-divider rounded-lg p-3 bg-alphaw-100">
                            <div className="flex items-center justify-between w-full">
                                <h3 className="text-Gray-600 font-medium">پیش‌نمایش تصویر:</h3>

                                <div className="flex items-center gap-3">
                                    {/* Remove preview (local or server) */}
                                    <button
                                        type="button"
                                        onClick={handleRemove}
                                        className="text-error-main hover:text-error-dark flex items-center gap-2 transition-colors duration-200"
                                    >
                                        <Close className="w-4 h-4 fill-error-main" />
                                        حذف تصویر
                                    </button>
                                </div>
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

            {/* actions */}
            <div className="flex items-center gap-4 w-ful ltr:self-end rtl:self-start">
                <button
                    type="submit"
                    disabled={mutation.isPending || isFetching}
                    className="flex gap-2 items-center justify-center px-6 py-2 bg-Primary-400 rounded-xl text-white dark:text-black whitespace-nowrap text-base font-bold cursor-pointer transition-all duration-100 hover:scale-[0.98] ease-in-out disabled:opacity-50 disabled:cursor-not-allowed "
                >
                    {mutation.isPending || isFetching ? (
                        <Spinner size="small" />
                    ) : (
                        <>
                            <Tick className="fill-white dark:fill-black w-5 h-5" />
                            <p>{r.save_information}</p>
                        </>
                    )}
                </button>
            </div>
        </form>
    );
};

export default ResumeTab;
