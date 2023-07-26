import React from "react";
import Router from "next/router";
import { useRouter } from "next/navigation";
import Link from "next/link";
import router from "next/router";

const LeftSide = () => {
  return (
    <div className="md:visible hidden">
      {/*  */}
      <div className="min-w-[20vw] max-w-[30vw] min-h-screen bg-green-800 p-5 items-center justify-center flex flex-col text-center fixed">
        <div className="flex flex-col w-full items-center justify-center">
          {/*  */}
          <div className="w-full self-start flex px-2">
            <Link
              className={`py-4 px-12 ${
                router.pathname === "/user/dashboard"
                  ? "bg-[#16a072] font-bold"
                  : "bg-transparent font-normal"
              } my-1 rounded-xl text-left w-full`}
              href="/dashboard"
            >
              Dashboard
            </Link>
          </div>
          <div className="w-full self-start flex px-2">
            <Link
              className={`py-4 px-12 ${
                router.pathname === "/user/dashboard/edit"
                  ? "bg-[#6359E9] font-bold"
                  : "bg-transparent font-normal hover:bg-green-500/25"
              } my-1 rounded-xl text-left w-full`}
              href="/name"
            >
              Edit User Details
            </Link>
          </div>
          <div className="w-full self-start flex px-2">
            <Link
              className={`py-4 px-12 ${
                router.pathname === "/name"
                  ? "bg-[#6359E9] font-bold"
                  : "bg-transparent font-normal hover:bg-green-500/25"
              } my-1 rounded-xl text-left w-full`}
              href="/name"
            >
              Logout
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftSide;
