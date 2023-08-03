import React from "react";
import AnimatedText from "./AnimatedText";
import Link from "next/link";
import Logo from "@/public/images/home.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-h-full h-full min-w-screen max-w-screen flex flex-col justify-center items-start md:items-center bg-white md:bg-green-900">
      <Image
        src={Logo}
        alt="p"
        className="relative md:top-8 mt-10 md:mt-0 mb-10"
      />

      <div className="flex p-3 items-center">
        <Link
          href={"/interns/register"}
          className="text-sm text-center font-bold p-2 md:p-6 md:text-lg md:text-white text-black rounded-md mx-2 bg-blue-400 md: hover:bg-blue-600"
        >
          Register as an intern
        </Link>
        <Link
          href={"/mobilizer/register"}
          className="text-sm text-center font-bold p-2 md:p-6 md:text-lg md:text-white text-black rounded-md mx-2 bg-green-400 md: hover:bg-green-600"
        >
          Register as a Mobilizer
        </Link>
      </div>
    </div>
  );
};

export default Hero;
