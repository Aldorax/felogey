import React from "react";
import Link from "next/link";
import Logo from "@/public/images/home.jpg";
import Image from "next/image";

const Hero = () => {
  return (
    <div className="min-w-screen max-w-7xl flex flex-col justify-center items-start md:items-center bg-white md:bg-green-900">
      <Image src={Logo} alt="p" className="" />
    </div>
  );
};

export default Hero;
