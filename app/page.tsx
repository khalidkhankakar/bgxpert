import React from "react";
import Image from "next/image";

const HomePage = () => {
  return (
    <div className="bg-gray-400 py-3 mt-10 text-red-400 flex flex-col items-center">
      HomePage BgXpert
      <Image
        src={"/desktop-logo.svg"}
        alt="Vercel Logo"
        width={200}
        height={84}
      />
      <Image
        src={"/mobile-logo.svg"}
        alt="Vercel Logo"
        width={100}
        height={24}
      />
    </div>
  );
};

export default HomePage;
