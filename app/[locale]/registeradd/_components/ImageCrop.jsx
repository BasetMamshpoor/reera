"use client";

import Crop from "@/assets/icons/crop.svg";
import Sun from "@/assets/icons/sun.svg";
import Rotate from "@/assets/icons/rotate.svg";
import React, { useState, useRef, useImperativeHandle, useEffect } from "react";
import Star from "@/assets/icons/star.svg";
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
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "@/hooks/useDebounceEffect";
import "react-image-crop/dist/ReactCrop.css";
import Upload from "@/assets/icons/upload.svg";

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

export default function ImageCrop({ onSave }, ref) {
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const [crop, setCrop] = useState();
  const [completedCrop, setCompletedCrop] = useState();
  const [scale, setScale] = useState(1);
  const [rotate, setRotate] = useState(0);
  const [aspect, setAspect] = useState(undefined);
  const [image, setImage] = useState(null);
  const [savedImages, setSavedImages] = useState([]);
  const [showCrop, setShowCrop] = useState(false);
  const [open, setOpen] = useState(false);
  const [showBrightness, setShowBrightness] = useState(false);
  const [brightness, setBrightness] = useState(1);

  const [dragging, setDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStartPos = useRef({ x: 0, y: 0 });
  const imgRefDrag = useRef(null);

  const onDragStart = (e) => {
    setDragging(true);
    dragStartPos.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
    e.preventDefault(); // prevent default drag image
  };

  const onDragMove = (e) => {
    if (dragging) {
      setPosition({
        x: e.clientX - dragStartPos.current.x,
        y: e.clientY - dragStartPos.current.y,
      });
    }
  };

  const onDragEnd = () => {
    setDragging(false);
  };
  useImperativeHandle(ref, () => ({
    saveImage: () => {
      if (completedCrop && imgRef.current && previewCanvasRef.current) {
        const canvas = document.createElement("canvas");
        canvasPreview(imgRef.current, canvas, completedCrop, scale, rotate);
        const newImage = canvas.toDataURL("image/jpeg", 0.9);
        setSavedImages((prev) => [...prev, newImage]);
        return newImage;
      }
      return null;
    },
    savedImages,
  }));
  useEffect(() => {
    if (aspect && imgRef.current) {
      const { width, height } = imgRef.current;
      const newCrop = centerAspectCrop(width, height, aspect);
      setCrop(newCrop);
      setCompletedCrop(convertToPixelCrop(newCrop, width, height));
    } else {
      // free crop: maybe reset crop area or leave as is
      setCrop(undefined);
    }
  }, [aspect]);
  // const handleSave = () => {
  //   if (completedCrop && imgRef.current && previewCanvasRef.current) {
  //     const canvas = document.createElement("canvas");
  //     canvasPreview(imgRef.current, canvas, completedCrop, scale, rotate);
  //     const imageUrl = canvas.toDataURL("image/jpeg", 0.9);
  //     onSave(imageUrl); // Pass the saved image URL to parent
  //     setImage(null); // Clear the current image
  //   }
  // };
  // const handleSave = () => {
  //   if (completedCrop && imgRef.current) {
  //     const canvas = document.createElement("canvas");

  //     canvasPreview(imgRef.current, canvas, completedCrop, scale, rotate);

  //     const imageUrl = canvas.toDataURL("image/jpeg", 0.9);

  //     // Replace current preview with cropped image
  //     setImage(imageUrl);

  //     // Exit crop mode
  //     setShowCrop(false);

  //     // Optional: store in saved images array
  //     setSavedImages((prev) => [...prev, imageUrl]);
  //   }
  // };
  const handleSave = () => {
    const canvas = document.createElement("canvas");
    const imageElement = imgRef.current;

    if (!imageElement) return; // no image to save

    if (completedCrop) {
      // Save cropped image
      canvasPreview(imageElement, canvas, completedCrop, scale, rotate);
    } else {
      // No crop: save the entire image with scale and rotate applied

      // Set canvas size same as original image dimensions
      const width = imageElement.naturalWidth * scale;
      const height = imageElement.naturalHeight * scale;

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Move to center to rotate around image center
      ctx.translate(width / 2, height / 2);
      ctx.rotate((rotate * Math.PI) / 180);
      ctx.translate(-width / 2, -height / 2);

      // Draw scaled image
      ctx.drawImage(imageElement, 0, 0, width, height);
    }

    const imageUrl = canvas.toDataURL("image/jpeg", 0.9);

    onSave(imageUrl);
    setImage(null);
    setOpen(false);
    showCrop(false);
    setAspect(undefined);
  };

  const onSelectFile = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const onImageLoad = (e) => {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  };

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
        setImage(reader.result); // update the image state with new upload
      };
      reader.readAsDataURL(file);
    }
    // Reset input value so same file can be selected multiple times
    showCrop(false);
    event.target.value = "";
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    setImage(null);
  };

  return (
    <div className="App">
      <div className="Crop-Controls">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setOpen(true)}
              type="button"
              className="bg-[#EEF0F1] border-dashed border-[2px] border-[#D1D5DB] flex items-center justify-center w-32 h-32 rounded-4xl cursor-pointer"
            >
              <Upload />
            </button>
          </DialogTrigger>
          <DialogContent className="max-h-280">
            <DialogHeader>
              <DialogTitle>Upload your picture here</DialogTitle>
              <DialogDescription>
                {image
                  ? "Your uploaded picture"
                  : "Drag and drop your picture below, or click to upload"}
              </DialogDescription>
            </DialogHeader>

            {!image && (
              <div
                className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center cursor-pointer transition hover:bg-gray-50"
                onClick={handleClick}
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

            {image && (
              <div className="relative">
                <div className="max-h-[60vh] overflow-hidden flex items-center justify-center flex-col">
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
                          maxHeight: "60vh",
                          transform: `scale(${scale}) rotate(${rotate}deg)`,
                        }}
                        onLoad={onImageLoad}
                      />
                    </ReactCrop>
                  ) : (
                    <img
                      src={image}
                      alt="Preview"
                      style={{
                        filter: `brightness(${brightness})`,
                        maxWidth: "100%",
                        maxHeight: "60vh",
                      }}
                    />
                  )}
                </div>

                <button
                  onClick={removeImage}
                  className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
                >
                  ×
                </button>

                {/* Action buttons under image */}
                <div className="flex flex-row items-center justify-center gap-4 mt-4">
                  <button
                    onClick={() => setShowCrop((prev) => !prev)}
                    className="cursor-pointer p-2 "
                  >
                    <Crop className="dark:fill-white" />
                  </button>
                  {!showCrop && (
                    <>
                      <button
                        onClick={() => setShowBrightness((prev) => !prev)}
                        className="cursor-pointer p-2"
                      >
                        <Sun className="dark:fill-white" />
                      </button>

                      <button
                        onClick={() => setRotate((prev) => (prev + 90) % 360)}
                        className="cursor-pointer p-2 "
                      >
                        <Rotate className="dark:fill-white" />
                      </button>
                    </>
                  )}
                </div>
                {showBrightness && (
                  <input
                    type="range"
                    min="0.5"
                    max="2"
                    step="0.01"
                    value={brightness}
                    onChange={(e) => setBrightness(e.target.value)}
                    className="mt-2 w-40"
                  />
                )}
              </div>
            )}

            {/* {completedCrop && (
              <div className="mt-4">
                <canvas
                  ref={previewCanvasRef}
                  style={{
                    border: "1px solid black",
                    maxWidth: "100%",
                    maxHeight: "200px",
                  }}
                />
              </div>
            )} */}
            {image && (
              <div className="flex justify-end mt-4">
                <button
                  onClick={handleSave}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Save Image
                </button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
