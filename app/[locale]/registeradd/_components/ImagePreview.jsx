"use client";
import { PixelCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";

let previewUrl = "";

function toBlob(canvas) {
  return new Promise((resolve) => {
    canvas.toBlob(resolve);
  });
}

/**
 * Generates a preview image source from the cropped area
 * @param {HTMLImageElement} image - Source image element
 * @param {PixelCrop} crop - Crop dimensions and coordinates
 * @param {number} [scale=1] - Image scale factor
 * @param {number} [rotate=0] - Image rotation in degrees
 * @returns {Promise<string>} Object URL for the cropped image preview
 */
export async function imgPreview(image, crop, scale = 1, rotate = 0) {
  const canvas = document.createElement("canvas");
  canvasPreview(image, canvas, crop, scale, rotate);

  const blob = await toBlob(canvas);

  if (!blob) {
    console.error("Failed to create blob");
    return "";
  }

  // Clean up previous URL if exists
  if (previewUrl) {
    URL.revokeObjectURL(previewUrl);
  }

  // Create new object URL for the blob
  previewUrl = URL.createObjectURL(blob);
  return previewUrl;
}
