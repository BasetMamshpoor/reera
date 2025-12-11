"use client";
import React, {useContext, useEffect, useRef, useState} from "react";
import Upload from "@/assets/icons/upload.svg";
import Arrowleft from "@/assets/icons/arrow-left.svg";
import ImageCrop from "../common/ImageCrop";
import {useMutation} from "@tanstack/react-query";
import {request} from "@/lib/api";
import {FormContext} from "../../NewCategorySelector";
import {useTranslation} from "@/app/[locale]/TranslationContext";
import {toast} from "sonner";

const UploadPics = ({apiUrl, adData, isEditing}) => {
    const [savedImages, setSavedImages] = useState([]);
    const [mainImageIndex, setMainImageIndex] = useState(null);
    const {apiResponseData, setCurrentStep} = useContext(FormContext);
    const dic = useTranslation();
    const u = dic.public.register_ad.upload_pics;
    const handleSaveImage = (imageUrl) => {
        setSavedImages((prev) => {
            const newImages = [...prev, imageUrl];
            if (newImages.length === 1) {
                setMainImageIndex(0);
            }
            return newImages;
        });
    };

    const handleRemoveImage = (index) => {
        setSavedImages((prev) => {
            const newImages = prev.filter((_, i) => i !== index);

            if (mainImageIndex === index) {
                setMainImageIndex(newImages.length > 0 ? 0 : null);
            } else if (mainImageIndex > index) {
                setMainImageIndex(mainImageIndex - 1);
            }

            return newImages;
        });
    };

    const handleSetMainImage = (index) => {
        setMainImageIndex(index);
    };

    const PicMutation = useMutation({
        mutationFn: async (formData) => {
            if (!isEditing) {
                return request({
                    url: apiUrl,
                    method: "post",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    data: formData,
                });
            } else {
                return request({
                    url: `/update/${adData?.slug}/fourth/${adData?.first?.id}`,
                    method: "post",
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    data: formData,
                });
            }
        },
        onSuccess: () => {
            setCurrentStep((prev) => prev + 1);
        },
        onError: (err) => {
            toast.error(
                err?.response?.data?.message || err.message || "Upload failed"
            );
        },
    });

    function base64ToFile(base64, filename) {
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new File([u8arr], filename, {type: mime});
    }

    const isBase64 = (str) => str.startsWith("data:image");

    const handlePicsSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("ad_id", isEditing ? apiResponseData?.first?.id : apiResponseData);

        let realIndex = 0; // فقط برای عکس‌های جدید شماره‌گذاری کنیم

        savedImages.forEach((image, index) => {
            // اگر لینک بود → کامل رد شو
            if (!isBase64(image)) return;

            // اگر Base64 بود → فایل بساز
            const file = base64ToFile(image, `photo-${realIndex}.jpg`);

            formData.append(`images[${realIndex}][image]`, file);
            formData.append(
                `images[${realIndex}][is_main]`,
                index === mainImageIndex ? 1 : 0
            );

            realIndex++;
        });

        PicMutation.mutate(formData);
    };

    // Populate images in edit mode
    useEffect(() => {
        if (isEditing && adData?.fourth?.length > 0) {
            const images = adData.fourth.map((img) => img.image_path);
            setSavedImages(images);

            // Set main image index based on is_main property
            const mainIndex = adData.fourth.findIndex((img) => img.is_main === 1);
            setMainImageIndex(mainIndex >= 0 ? mainIndex : 0);
        }
    }, [isEditing, adData]);

    return (
        <form
            onSubmit={handlePicsSubmit}
            className="flex flex-col justify-between gap-10 w-full lg:px-10 p-4 lg:py-8 bg-surface rounded-lg h-160 "
        >
            <h2>{u.ad_image}</h2>
            <div className="flex flex-wrap gap-4 items-center">
                <ImageCrop onSave={handleSaveImage}/>
                {savedImages.map((img, index) => (
                    <div
                        key={index}
                        className={`relative w-32 h-32 ${
                            mainImageIndex === index ? "" : ""
                        }`}
                    >
                        <img
                            src={img}
                            alt={`Saved ${index}`}
                            className="w-full h-full object-cover rounded-lg"
                        />

                        {/* Remove button */}
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-black/50 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-black/70 transition-colors"
                        >
                            ×
                        </button>

                        {/* Star button for main image */}
                        <button
                            type="button"
                            onClick={() => handleSetMainImage(index)}
                            className={`absolute top-1 left-1 rounded-full w-6 h-6 flex items-center justify-center transition-all duration-200 ${
                                mainImageIndex === index
                                    ? "bg-yellow-500 text-white shadow-lg scale-110"
                                    : "bg-black/50 text-white hover:bg-yellow-500/80"
                            }`}
                            title={
                                mainImageIndex === index ? "Main image" : "Set as main image"
                            }
                        >
                            {mainImageIndex === index ? (
                                // Filled star for main image
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                >
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            ) : (
                                // Outline star for non-main images
                                <svg
                                    width="14"
                                    height="14"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                >
                                    <path
                                        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            )}
                        </button>

                        {/* Main image indicator */}
                        {mainImageIndex === index && (
                            <div
                                className="absolute bottom-1 left-1 right-1 bg-yellow-500/90 text-white text-xs px-2 py-1 rounded text-center font-medium">
                                {u.main_pic}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="flex flex-row items-center w-full rtl:justify-end gap-6 mt-auto justify-end">
                <button
                    type="button"
                    className="py-2 lg:w-32 border-[2px] w-full cursor-pointer border-[#F59E0B] text-[#F59E0B] rounded-lg"
                >
                    {u.cancel}
                </button>
                <button
                    type="submit"
                    className="flex cursor-pointer w-full flex-row gap-4 items-center justify-center text-white bg-[#4299C1] py-2 lg:w-32 rounded-lg"
                >
                    <span className="text-alphaw-100">{u.next}</span>
                    <Arrowleft className="fill-alphaw-100 ltr:rotate-180"/>
                </button>
            </div>
        </form>
    );
};

export default UploadPics;
