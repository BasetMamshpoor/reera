"use client";
import { PixelCrop } from "react-image-crop";

const TO_RADIANS = Math.PI / 180;

/**
 * Renders a cropped preview of an image to a canvas
 * @param {HTMLImageElement} image - Source image element
 * @param {HTMLCanvasElement} canvas - Target canvas element
 * @param {PixelCrop} crop - Crop dimensions and coordinates
 * @param {number} [scale=1] - Image scale factor
 * @param {number} [rotate=0] - Image rotation in degrees
 */
export async function canvasPreview(
  image,
  canvas,
  crop,
  scale = 1,
  rotate = 0
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  // Set canvas dimensions
  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const rotateRads = rotate * TO_RADIANS;
  const centerX = image.naturalWidth / 2;
  const centerY = image.naturalHeight / 2;

  ctx.save();

  // Apply transformations in reverse order:
  // 1. Move center to origin (0,0)
  // 2. Scale the image
  // 3. Rotate around origin
  // 4. Move origin back to center
  // 5. Move crop origin to canvas origin (0,0)
  ctx.translate(-cropX, -cropY);
  ctx.translate(centerX, centerY);
  ctx.rotate(rotateRads);
  ctx.scale(scale, scale);
  ctx.translate(-centerX, -centerY);

  // Draw the image
  ctx.drawImage(
    image,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight,
    0,
    0,
    image.naturalWidth,
    image.naturalHeight
  );

  ctx.restore();
}
