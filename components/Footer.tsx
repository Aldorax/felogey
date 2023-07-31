import React from "react";
import Ecommunty from "@/public/images/enaira PNG 1.png";
import Enetwork from "@/public/images/e-logo .png";
import Image from "next/image";

const Footer = () => {
  return (
    <div className="min-h-[30vh] h-full min-w-screen max-w-screen flex flex-col md:flex-row justify-evenly md:items-center items-start bg-white text-sm">
      <div className="w-full md:w-[50vw] flex flex-col text-black p-3">
        <div>
          <p>
            <b>Enquires</b>: 08128880362
          </p>
          <p>
            <b>Orientation Starts</b>: Ongoing
          </p>
          <p>
            <b>First Batch Training Starts</b>: Ongoing
          </p>
        </div>
      </div>
      <div className="w-full md:w-[50vw] flex text-black p-3">
        <div>
          <h1>
            <b>Create an account</b>
          </h1>
          <h1>
            <b>Terms and Conditions</b>
          </h1>
          <div className="flex flex-col md:flex-row gap-3">
            <p className="font-bold">Powered By:</p>
            <div className="flex gap-2 flex-wrap flex-grow flex-grow-1 items-center">
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
