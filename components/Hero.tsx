import React from "react";
import AnimatedText from "./AnimatedText";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-[94vh] max-h-[94vh] min-w-screen max-w-screen flex flex-col justify-center items-center">
      <AnimatedText
        text="1 Million E-NAIRA AND REGULAR P.O.S AGENT INTERNS NEEDED URGENTLY"
        className="md:mb-16 mb-7 text-white"
      />
      <Link
        href={"/account/register"}
        className="text-3xl text-center font-bold p-4 border bg-white text-black rounded-xl"
      >
        Register Now
      </Link>
    </div>
  );
};

export default Hero;
