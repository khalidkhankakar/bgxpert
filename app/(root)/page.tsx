import React from "react";

import { ColourfulText } from "@/components/ui/colourful-text";
import Image from "next/image";
import { ActivityIcon } from "lucide-react";
import { BentoGridDemo } from "@/components/shared/grid-pic";

const HomePage = () => {
  return (
    <div className="min-h-screen pt-20 pb-12 md:pt-28 flex items-center justify-center gap-y-4 flex-col">
      <div className="px-3">
        <h1 className="text-3xl md:text-5xl lg:text-7xl font-bold text-center font-sans">
          <ColourfulText text="BGXpert" /> AI-Powered Background Remover for
          Flawless Images
        </h1>

        <p className="text-sm md:text-lg  text-center  w-full md:w-1/2 mx-auto text-gray-600">
          Remove backgrounds instantly with BGXpert—an AI-powered tool for
          clean, professional cutouts. Upload, process, and download in seconds!
          🚀
        </p>
      </div>
      <div className="flex items-center flex-col md:flex-row justify-center gap-3 ">
        <div className="h-40 w-60 ">
          <Image
            src="/assets/img-5.jpg"
            width={500}
            height={500}
            alt="img-1"
            className="h-full w-full rounded-md object-contain"
            priority
          />
        </div>
        <ActivityIcon
          size={40}
          className="rotate-90 md:rotate-0 text-gray-600"
        />
        <div className="h-40 w-60 ">
          <Image
            src="/assets/img-5.jpg"
            width={400}
            height={400}
            alt="img-1"
            className="h-full w-full object-contain"
            priority
          />
        </div>
      </div>

      <div className="mt-20">
        <h1 className="text-2xl md:text-4xl text-gray-600 font-bold text-center ">
          Try images on BGXpert
        </h1>

        <BentoGridDemo />
      </div>
    </div>
  );
};

export default HomePage;
