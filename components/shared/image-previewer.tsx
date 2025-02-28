import React from "react";
import { ImageFile } from "./bg-remove";
import image from "next/image";
import Image from "next/image";

interface Props {
  image: ImageFile;
  setImage: (image: ImageFile) => void;
}

const ImagePreviewer = ({ image, setImage }: Props) => {
  return (
    <div className="w-full">
      <div className=" flex flex-col justify-center md:flex-row gap-3 ">
        <div className="border overflow-hidden h-60 items-center justify-center flex   md:w-2/3 w-full ">
          <Image
            src={URL.createObjectURL(image.file)}
            width={1000}
            height={800}
            alt="img"
            className="object-contain h-full w-fit  border-2  border-red-300"
          />
        </div>

        <div className="py-5 border md:w-1/4 w-full "></div>
      </div>
      <div className="py-5 border w-2/3 my-3 mx-auto"></div>
    </div>
  );
};

export default ImagePreviewer;
