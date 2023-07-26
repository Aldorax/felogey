import React from "react";

const Footer = () => {
  return (
    <div className="min-h-[30vh] h-full min-w-screen max-w-screen flex flex-col md:flex-row justify-evenly md:items-center items-start">
      <div className="min-w-screen w-full max-w-screen md:w-[50vw] flex flex-col justify-center items-center text-white font-semibold">
        <div>
          <p>Enquires: 08128880362</p>
          <p>Orientation Starts: 28th - 29th July, 2023</p>
          <p>First Batch Training Starts: 4th - 5th August, 2023</p>
        </div>
      </div>
      <div className="min-w-screen w-full max-w-screen md:w-[50vw] flex flex-col justify-center items-center text-white">
        <div>
          <h1>Create an account</h1>
          <h1>Terms and Conditions</h1>
          <div className="flex gap-3">
            <p>Powered By:</p>
            <p>E-networks</p>
            <p>E-naira Community</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
