"use client";
import React, { useState, useEffect } from "react";
import { ReferredUser, User } from "@/app/types";
import httpClient from "@/components/charts/httpClient";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import router from "next/router";
import Image from "next/image";
import image from "@/app/favicon.ico";
import LeftSide from "@/components/LeftSide";
import axios from "axios";
import "@/app/globals.css";

interface DashoardProps {
  user: User;
}

export const metadata: Metadata = {
  title: "Dashboard",
  description: "User dashboard",
};

const ReferralDetails: React.FC<DashoardProps> = ({}) => {
  const navigate = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [referralActivity, setReferralActivity] = useState<ReferredUser[]>([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const access_token = localStorage.getItem("access_token");

        if (!access_token) {
          console.log("Not authorized");
          navigate.push("/admin/main/login");
          return;
        }

        httpClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        const response = await httpClient.get(
          "https://enetworks-tovimikailu.koyeb.app/dashboard",
          {
            withCredentials: true, // Include cookies in the request
          }
        );

        setUser(response.data);
      } catch (error) {
        navigate.push("/admin/main/login");
        console.log("Not Authorized");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const logoutUser = async () => {
    // Clear the access token from local storage
    localStorage.removeItem("access_token");

    // Make the logout request
    const resp = await httpClient.post(
      "https://enetworks-tovimikailu.koyeb.app/logout",
      {
        withCredentials: true, // Include cookies in the request
      }
    );

    // Redirect to the desired location
    window.location.href = "/";
  };

  const handlePayment = () => {
    setLoading(true); // Show the loader
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        "https://enetworks-tovimikailu.koyeb.app/pay/",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        const { payment_url } = response.data;
        setPaymentUrl(payment_url);
        setLoading(false); // Hide the loader after registration attempt
        navigate.push(paymentUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="max-w-screen overflow-x-hidden flex flex-wrap bg-gray-100">
      <div className="min-h-screen h-auto w-full">
        {user ? (
          <div className=" flex flex-col justify-center items-start p-3 md:p-32 text-white w-full bg-gray-100 max-w-screen md:max-w-[80vw] min-h-auto">
            <Link
              className="flex flex-grow flex-grow-1 flex-wrap items-start justify-around bg-orange-500 text-white rounded-2xl mt-3 px-3 py-6 relative w-full"
              href={"/admin/main/dashboard"}
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 absolute top-3 left-6 md:right-1 transform rotate-90 mr-10`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </Link>
            <div className="w-full h-[70vh] flex flex-col justify-center items-center">
              <div className="md:p-5 rounded-xl mx-1 md:mx-3 my-1 md:my-3 w-full p-3 bg-orange-500">
                <h1 className="text-md md:text-2xl font-extrabold text-white px-2 py-4">
                  Referral Code
                </h1>
                <p className="text-sm md:text-xl text-white font-semibold word-wrap-break p-4 bg-orange-400 rounded-xl">
                  {user.referral_code}
                </p>
              </div>
              <div className="md:p-5 rounded-xl mx-1 md:mx-3 my-1 md:my-3 w-full p-3 bg-orange-500">
                <h1 className="text-md md:text-2xl font-extrabold text-white px-2 py-4">
                  Referral Link
                </h1>
                <p className="text-sm md:text-xl text-white font-semibold word-wrap-break p-4 bg-orange-400 rounded-xl">
                  {user.referral_link}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="min-w-screen min-h-screen flex items-center justify-center">
            <div className="spinner2"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReferralDetails;
