"use client";
import React, { useState } from "react";
import UploadImage from "./upload-image";

export interface ImageFile {
  id: number;
  file: File;
  processedFile?: File;
}

const BGRemove = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  return (
    <div className="w-full border min-h-screen flex py-16 items-center justify-center ">
      <div>
        <UploadImage setImage={setImage} />
      </div>
    </div>
  );
};

export default BGRemove;
