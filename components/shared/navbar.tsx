import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  return (
    <header className="z-50 bg-white  shadow-md  py-2 fixed top-0 left-0 right-0 w-full">
      <nav className="flex items-center justify-around gap-x-4 ">
        <Image
          src={"/desktop-logo.svg"}
          width={220}
          height={100}
          alt="logo"
          className="cursor-pointer md:block hidden w-auto h-auto"
          priority
        />
        <Image
          src={"/mobile-logo.svg"}
          width={130}
          height={60}
          alt="logo"
          className="cursor-pointer block md:hidden w-auto h-auto"
          priority
        />

        <ul className="flex items-center gap-x-4">
          <Link href={"/"}>
            <ol className="font-semibold text-lg hover:text-gray-800 dark:hover:text-gray-400">
              Home
            </ol>
          </Link>
          <Link href={"/"}>
            <ol className="font-semibold text-lg hover:text-gray-800 dark:hover:text-gray-400">
              Servics
            </ol>
          </Link>
          <Link href={"/"}>
            <ol className="font-semibold text-lg hover:text-gray-800 dark:hover:text-gray-400">
              Remove BG
            </ol>
          </Link>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
