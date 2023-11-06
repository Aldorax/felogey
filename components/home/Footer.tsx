import React from "react";
import Ecommunty from "@/public/images/enaira PNG 1.png";
import Enetwork from "@/public/images/e-logo.png";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="h-full min-w-screen max-w-screen flex flex-col md:flex-row justify-evenly md:items-center items-start bg-light text-sm md:text-lg border-t-2 border-dark">
      <div className="w-screen md:w-[50vw] flex flex-col text-dark p-3 md:items-center">
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
      <div className="w-full md:w-[50vw] flex text-dark p-3 md:justify-center">
        <div>
          <h1>
            <b>Terms and Conditions</b>
          </h1>
          <div className="flex flex-col gap-3">
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
