"use client";
import { IMAGES } from "@/lib/constant";
import Image from "next/image";
import React, { useRef } from "react";
import { ImageFile } from "./bg-remove";
import { UploadCloud } from "lucide-react";

interface Props {
  setImage: (image: ImageFile) => void;
}

const UploadImage = ({ setImage }: Props) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      setImage({ id: Date.now(), file, processedFile: undefined });
    }
  };

  return (
    <div className="flex items-center flex-col border justify-center gap-y-3 ">
      <p className="text-lg font-semibold">
        Upload the an Image to Remove the background
      </p>
      <button
        onClick={handleButtonClick}
        className="bg-blue-600 text-white py-2 px-8 rounded-3xl border-none hover:bg-blue-700 text-xl md:text-2xl font-semibold flex items-center gap-x-4"
      >
        <UploadCloud size={26} />
        <span>Upload Image</span>
      </button>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
        accept="image/*"
      />

      <div className="space-y-2">
        <p className="text-sm text-gray-600 text-center">
          No images? try these images
        </p>
        <div className="flex items-center justify-center gap-x-3">
          {IMAGES.map((img) => (
            <Image
              key={img}
              src={img}
              className="w-16 h-16 object-cover rounded-md"
              width={100}
              height={100}
              alt="img"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UploadImage;
