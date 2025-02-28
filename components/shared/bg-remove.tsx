"use client";
import React, { useState } from "react";
import UploadImage from "./upload-image";
import ImagePreviewer from "./image-previewer";

export interface ImageFile {
  id: number;
  file: File;
  processedFile?: File;
}

const BGRemove = () => {
  const [image, setImage] = useState<ImageFile | null>(null);
  return (
    <div className="w-full flex items-center justify-center min-h-screen bg-green-400  pt-16 ">
      {!image ? (
        <div className="">
          <UploadImage setImage={setImage} />
        </div>
      ) : (
        <div className="min-h-[calc(100vh-64px)] w-full p-5 flex items-center justify-center">
          <ImagePreviewer image={image} setImage={setImage} />
        </div>
      )}
    </div>
  );
};

export default BGRemove;
