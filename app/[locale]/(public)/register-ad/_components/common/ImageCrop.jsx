"use client";
import Crop from "@/assets/icons/crop.svg";
import Sun from "@/assets/icons/sun.svg";
import Rotate from "@/assets/icons/rotate.svg";
import Upload from "@/assets/icons/upload.svg";
import React, { useState, useRef, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import { canvasPreview } from "../common/CanvasPreview";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";
import { useTranslation } from "@/app/[locale]/TranslationContext";

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

export default function ImageCrop({ onSave }) {
  const dic = useTranslation();
  const u = dic.public.register_ad.upload_pics;
  const fileInputRef = useRef(null);
  const imgRef = useRef(null);
  const previewCanvasRef = useRef(null);

  // Core image states
  const [image, setImage] = useState(null);
  const [open, setOpen] = useState(false);

  // Crop-related states
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [showCrop, setShowCrop] = useState(false);
  const [aspect, setAspect] = useState(undefined);

  // Transform states
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [brightness, setBrightness] = useState(1);
  const [showBrightness, setShowBrightness] = useState(false);

  // Update crop when aspect changes
  useEffect(() => {
    if (aspect && imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerAspectCrop(width, height, aspect);
      setCrop(newCrop);
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    } else {
      setCrop(undefined);
    }
  }, [aspect]);

  // Debounced preview update
  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate
        );
      }
    },
    100,
    [completedCrop, scale, rotate]
  );

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
        // Reset states when new image is loaded
        setShowCrop(false);
        setScale(1);
        setRotate(0);
        setBrightness(1);
        setShowBrightness(false);
        setAspect(undefined);
        setCrop(undefined);
        setCompletedCrop(undefined);
      };
      reader.readAsDataURL(file);
    }
    // Reset input value so same file can be selected multiple times
    event.target.value = "";
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

  const handleSave = () => {
    const canvas = document.createElement("canvas");
    const imageElement = imgRef.current;

    if (!imageElement) return;

    if (completedCrop && showCrop) {
      // Save cropped image
      canvasPreview(imageElement, canvas, completedCrop, scale, rotate);
    } else {
      // Save the entire image with transformations applied
      const width = imageElement.naturalWidth * scale;
      const height = imageElement.naturalHeight * scale;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Apply brightness filter
      ctx.filter = `brightness(${brightness})`;

      // Move to center for rotation
      ctx.translate(width / 2, height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.translate(-width / 2, -height / 2);

      // Draw scaled image
      ctx.drawImage(imageElement, 0, 0, width, height);
    }

    const imageUrl = canvas.toDataURL("image/jpeg", 0.9);

    // Call parent callback with the saved image
    onSave(imageUrl);

    // Reset component state
    setImage(null);
    setOpen(false);
    setShowCrop(false);
    setAspect(undefined);
  };

  const removeImage = () => {
    setImage(null);
    setShowCrop(false);
    setScale(1);
    setRotate(0);
    setBrightness(1);
    setShowBrightness(false);
  };

  const toggleCrop = () => {
    setShowCrop((prev) => !prev);
    setShowBrightness(false); // Hide brightness when showing crop
  };

  const toggleBrightness = () => {
    setShowBrightness((prev) => !prev);
  };

  const handleRotate = () => {
    setRotate((prev) => (prev + 90) % 360);
  };

  return (
    <div className="App">
      <div className="Crop-Controls">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              type="button"
              className="bg-[#EEF0F1] border-dashed border-[2px] border-[#D1D5DB] flex items-center justify-center w-32 h-32 rounded-4xl cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <Upload />
            </button>
          </DialogTrigger>

          <DialogContent className="max-h-[80vh] max-w-2xl">
            <DialogHeader>
              <DialogTitle className={`rtl:text-right`}>
                {u.upload_your_photo_here}
              </DialogTitle>
              <DialogDescription className={`rtl:text-right`}>
                {image ? u.edit_image : u.drag_or_click_your_photo}
              </DialogDescription>
            </DialogHeader>

            {!image && (
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer transition hover:bg-gray-50"
                onClick={handleClick}
              >
                <Upload className="mx-auto mb-4 w-12 h-12 text-gray-400" />
                <p className="text-gray-500">{u.drag_or_click_your_photo}</p>
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </div>
            )}

            {image && (
              <div className="relative">
                <div className="max-h-[50vh] overflow-hidden flex items-center justify-center">
                  {showCrop ? (
                    <ReactCrop
                      crop={crop}
                      onChange={(c) => setCrop(c)}
                      onComplete={(c) => setCompletedCrop(c)}
                      aspect={aspect}
                      className="max-w-full"
                    >
                      <img
                        ref={imgRef}
                        src={image}
                        alt="Crop me"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "50vh",
                          transform: `scale(${scale}) rotate(${rotate}deg)`,
                        }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  ) : (
                    <img
                      ref={imgRef}
                      src={image}
                      alt="Preview"
                      style={{
                        filter: `brightness(${brightness})`,
                        maxWidth: "100%",
                        maxHeight: "50vh",
                        transform: `scale(${scale}) rotate(${rotate}deg)`,
                      }}
                      onLoad={onImageLoad}
                    />
                  )}
                </div>

                {/* Remove button */}
                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  ×
                </button>

                {/* Action buttons */}
                <div className="flex flex-row items-center justify-center gap-4 mt-4">
                  <button
                    onClick={toggleCrop}
                    className={`cursor-pointer p-3 rounded-lg transition-colors ${
                      showCrop
                        ? "bg-blue-100 text-blue-600"
                        : "hover:bg-gray-100"
                    }`}
                    title="Crop"
                  >
                    <Crop className="w-5 h-5" />
                  </button>

                  {!showCrop && (
                    <>
                      <button
                        onClick={toggleBrightness}
                        className={`cursor-pointer p-3 rounded-lg transition-colors ${
                          showBrightness
                            ? "bg-yellow-100 text-yellow-600"
                            : "hover:bg-gray-100"
                        }`}
                        title="Brightness"
                      >
                        <Sun className="w-5 h-5" />
                      </button>

                      <button
                        onClick={handleRotate}
                        className="cursor-pointer p-3 rounded-lg hover:bg-gray-100 transition-colors"
                        title="Rotate"
                      >
                        <Rotate className="w-5 h-5" />
                      </button>
                    </>
                  )}
                </div>

                {/* Brightness slider */}
                {showBrightness && (
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <span className="text-sm">Dark</span>
                    <input
                      type="range"
                      min="0.5"
                      max="2"
                      step="0.01"
                      value={brightness}
                      onChange={(e) =>
                        setBrightness(parseFloat(e.target.value))
                      }
                      className="w-40"
                    />
                    <span className="text-sm">Bright</span>
                  </div>
                )}

                {/* Scale slider for crop mode */}
                {showCrop && (
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <span className="text-sm">Scale:</span>
                    <input
                      type="range"
                      min="0.5"
                      max="3"
                      step="0.01"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-40"
                    />
                  </div>
                )}

                {/* Save button */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={handleSave}
                    className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    {u.save_photo}
                  </button>
                </div>
              </div>
            )}

            {/* Hidden preview canvas for processing */}
            <canvas ref={previewCanvasRef} style={{ display: "none" }} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
