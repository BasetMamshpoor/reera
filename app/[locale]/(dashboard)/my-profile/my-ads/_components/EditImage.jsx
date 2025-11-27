"use client";
import React, { useRef, useEffect } from "react";
import Image from "next/image";
import { useFormContext, useFieldArray } from "react-hook-form";

import Trash from "@/assets/icons/Trash.svg";
import Star from "@/assets/icons/star.svg";
import StarBold from "@/assets/icons/star.svg";
import Plus from "@/assets/icons/add.svg";

const EditImage = ({ a }) => {
  const { control, getValues } = useFormContext();

  const { fields, append, replace } = useFieldArray({
    control,
    name: "images",
  });

  const fileRef = useRef(null);

  useEffect(() => {
    const defaultImages = getValues("images") || [];
    if (defaultImages.length > 0 && fields.length === 0) {
      replace(defaultImages.map((img) => ({ ...img, isMain: !!img.isMain })));
    }
  }, []);

  const handleAddImage = (e) => {
    const files = e.target.files;
    if (!files || files.length === 0) {
      e.target.value = "";
      return;
    }

    const current = getValues("images") || [];

    const newFiles = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      url: URL.createObjectURL(file),
      file,
      isMain: false,
    }));

    if (!current.some((img) => img.isMain) && newFiles.length > 0) {
      newFiles[0].isMain = true;
    }

    append(newFiles);

    e.target.value = "";
  };

  const handleSetMain = (index) => {
    const current = getValues("images") || [];
    const updated = current.map((img, i) => ({ ...img, isMain: i === index }));
    replace(updated);
  };

  const handleRemove = (index) => {
    const current = getValues("images") || [];
    const removed = current[index];
    const updated = current.filter((_, i) => i !== index);

    if (removed?.isMain && updated.length > 0) {
      updated[0] = { ...updated[0], isMain: true };
    }

    replace(updated);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p className="text-Primary-950 text-xl font-medium">{a.images}</p>

      <div className="flex items-center justify-between w-full">
        <p className="text-Gray-700 text-base font-medium">{a.main_image}</p>

        <button
          type="button"
          onClick={() => fileRef.current.click()}
          className="flex items-center justify-center gap-1 py-2 px-4 bg-Primary-400 border rounded-xl w-fit text-white text-sm font-bold"
        >
          <Plus className="fill-white" />
          <span className="pt-1">{a.add_photo}</span>
        </button>

        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={handleAddImage}
        />
      </div>

      <div className="flex items-center gap-6 flex-wrap">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="relative max-w-32 max-h-32 h-full w-full"
          >
            <Image
              src={field.url || "/images/placeholder.jpg"}
              alt={`image-${index}`}
              width={120}
              height={120}
              className="w-32 h-32 rounded-xl"
              unoptimized
            />

            <div
              onClick={() => handleRemove(index)}
              className="absolute top-2 left-2 flex items-center justify-center p-1 rounded-lg bg-alphaw-60 cursor-pointer"
            >
              <Trash className="fill-error-main !w-4 !h-4" />
            </div>

            <div
              onClick={() => handleSetMain(index)}
              className="absolute top-2 right-2 flex items-center justify-center p-1 rounded-lg bg-alphaw-60 cursor-pointer"
            >
              {field.isMain ? (
                <StarBold className="fill-info-main !w-4 !h-4" />
              ) : (
                <Star className="fill-info-main !w-4 !h-4" />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditImage;
