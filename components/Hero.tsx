import React from "react";
import AnimatedText from "./AnimatedText";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="min-h-[45vh] max-h-[94vh] min-w-screen max-w-screen flex flex-col justify-center items-start bg-white">
      <AnimatedText
        text="1 Million E-NAIRA AND REGULAR P.O.S AGENT INTERNS NEEDED URGENTLY"
        className="md:mb-16 mb-1 text-black p-2"
      />
      <div className="flex p-3 items-center">
        <Link
          href={"/interns/register"}
          className="text-sm text-center font-bold p-2 text-black rounded-md mx-2 bg-blue-400"
        >
          Register as an intern
        </Link>
        <Link
          href={"/mobilizer/register"}
          className="text-sm text-center font-bold p-2 text-black rounded-md mx-2 bg-green-400"
        >
          Register as a Mobilizer
        </Link>
      </div>
    </div>
  );
};

export default Hero;
