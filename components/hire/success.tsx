"use client";
import React from "react";
import { useRouter } from "next/navigation";

const Success = () => {
  const history = useRouter();

  const handleGoHome = () => {
    history.push("/");
  };

  return (
    <div className="flex flex-col justify-center items-center max-h-screen h-screen overflow-hidden bg-gradient-to-br from-green-400 to-green-700 w-screen">
      <div className="flex text-white flex-col justify-center items-center p-6 bg-green-800 rounded-xl">
        <h1 className="text-lg font-bold">Thank you for applying!</h1>
        <p>We will get back to you soon.</p>
        <button
          className="p-2 bg-white my-2 text-black rounded-xl"
          onClick={handleGoHome}
        >
          Go back home
        </button>
      </div>
    </div>
  );
};

export default Success;
