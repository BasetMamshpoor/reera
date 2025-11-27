import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { request } from "@/lib/api";

/**
 * Custom hook for handling image upload and management
 * @returns {Object} Image upload state and functions
 */
export const useImageUpload = () => {
  const [savedImages, setSavedImages] = useState([]);
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [uploadedImageUrls, setUploadedImageUrls] = useState([]);

  // Mutation for uploading individual images to get URLs
  const uploadImageMutation = useMutation({
    mutationFn: async (imageFile) => {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await request({
        url: "/store/category/fourth", // Your image upload endpoint
        method: "post",
        data: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      return response.data; // Should return { url: "image_url.jpg" }
    },
    onSuccess: (data, imageFile) => {
      // Add the uploaded image URL to our state
      setUploadedImageUrls((prev) => [...prev, data.url]);
    },
    onError: (error) => {},
  });

  /**
   * Convert base64 to File object for upload
   */
  const base64ToFile = (base64String, filename = "image.jpg") => {
    const arr = base64String.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  /**
   * Handle saving a new image (convert base64 to file and upload)
   */
  const handleSaveImage = async (base64ImageUrl) => {
    // Add to local display state immediately
    const newImages = [...savedImages, base64ImageUrl];
    setSavedImages(newImages);

    // Set as main image if it's the first one
    if (newImages.length === 1) {
      setMainImageIndex(0);
    }

    // Convert to file and upload to get URL
    const imageFile = base64ToFile(base64ImageUrl, `image_${Date.now()}.jpg`);
    await uploadImageMutation.mutateAsync(imageFile);
  };

  /**
   * Remove an image
   */
  const handleRemoveImage = (index) => {
    const newImages = savedImages.filter((_, i) => i !== index);
    const newUrls = uploadedImageUrls.filter((_, i) => i !== index);

    setSavedImages(newImages);
    setUploadedImageUrls(newUrls);

    // Adjust main image index
    if (index === mainImageIndex) {
      const newMainIndex = newImages.length > 0 ? 0 : -1;
      setMainImageIndex(newMainIndex);
    } else if (index < mainImageIndex) {
      setMainImageIndex(mainImageIndex - 1);
    }
  };

  /**
   * Set main image
   */
  const handleSetMainImage = (index) => {
    setMainImageIndex(index);
  };

  /**
   * Get data in the format your API expects
   */
  const getApiData = (adId) => {
    return {
      ad_id: adId,
      images: uploadedImageUrls,
      image: uploadedImageUrls[mainImageIndex] || uploadedImageUrls[0] || "",
    };
  };

  return {
    savedImages,
    mainImageIndex,
    uploadedImageUrls,
    handleSaveImage,
    handleRemoveImage,
    handleSetMainImage,
    getApiData,
    isUploading: uploadImageMutation.isPending,
    uploadError: uploadImageMutation.error,
  };
};
