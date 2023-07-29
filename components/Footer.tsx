import React from "react";
import Ecommunty from "@/public/images/enaira PNG WHITE.png";
import Enetwork from "@/public/images/e-logo .png";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="min-h-[30vh] h-full min-w-screen max-w-screen flex flex-col md:flex-row justify-evenly md:items-center items-start bg-orange-800 text-sm">
      <div className="w-full md:w-[50vw] flex flex-col text-white p-3">
        <div>
          <p>Enquires: 08128880362</p>
          <p>Orientation Starts: 28th - 29th July, 2023</p>
          <p>First Batch Training Starts: 4th - 5th August, 2023</p>
        </div>
      </div>
      <div className="w-full md:w-[50vw] flex text-white p-3">
        <div>
          <h1>Create an account</h1>
          <h1>Terms and Conditions</h1>
          <div className="flex flex-col md:flex-row gap-3">
            <p>Powered By:</p>
            <div className="flex gap-2 flex-wrap flex-grow flex-grow-1">
              <Image
                src={Ecommunty}
                alt="logo"
                width={150}
                height={50}
                className="h-full max-w-40"
              />
              <Image
                src={Enetwork}
                alt="logo"
                width={100}
                height={50}
                className="h-full max-w-20"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
