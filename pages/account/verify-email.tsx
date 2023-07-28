"use client";
import React, { useState } from "react";
import httpClient from "@/components/charts/httpClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import type { Metadata } from "next";
import { AxiosRequestConfig } from "axios";

// ... rest of the code

export const metadata: Metadata = {
  title: "Verify your Email",
  description: "Enter your Otp and verify your email to activate your account",
};
interface RegisterRequest {
  otp: string;
}

interface ErrorResponse {
  error: string;
}

interface RequestHeaders {
  "Content-Type": string;
  Authorization?: string; // Make the Authorization property optional
}

const VerifyEmail: React.FC = () => {
  const navigate = useRouter();

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const verifyOtp = async () => {
    setLoading(true); // Show the loader

    setTimeout(async () => {
      try {
        const data = new URLSearchParams();
        data.append("otp", otp); // Use URLSearchParams for form data

        const accessToken = localStorage.getItem("access_token");
        const headers: AxiosRequestConfig["headers"] = {
          "Content-Type": "application/x-www-form-urlencoded",
        };
        console.log("data", data);
        console.log("data", accessToken);

        if (accessToken) {
          headers["Authorization"] = `Bearer ${accessToken}`;
        }

        const resp = await httpClient.post(
          "http://localhost:5000/verify-email",
          data.toString(),
          {
            headers: headers,
            withCredentials: true,
          }
        );

        if ("error" in resp.data) {
          // Registration failed
          const errorResponse = resp.data;
          toast.error(errorResponse.error);
        } else {
          // Registration successful
          toast.success("Email Verified successfully");
          navigate.push("/account/login");
        }
      } catch (error: any) {
        toast.error(error);
        console.log(error);
      } finally {
        setLoading(false); // Hide the loader after registration attempt
      }
    }, 2000);
  };

  const resendOTP = async () => {
    try {
      setLoading1(true);

      // Call the backend API to resend OTP
      const accessToken = localStorage.getItem("access_token");
      const headers = {
        "Content-Type": "application/json",
      };

      httpClient.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${accessToken}`;

      await httpClient.post(
        "http://localhost:5000/resend-otp",
        {},
        {
          headers: headers,
          withCredentials: true,
        }
      );

      setLoading(false);
      toast.success("OTP Resent successfully");
    } catch (error) {
      setLoading1(false);
      toast.error("Failed to resend OTP");
      console.log(error);
    }
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen min-w-screen items-center justify-center bg-white">
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center items-center mx-auto border border-white text-black bg-white mt-20 mb-5">
          <div>
            <h1 className="px-3 text-2xl md:text-4xl font-bold mb-2">
              Verify Your Otp!
            </h1>
            <p className="px-3 text-lg font-normal mb-4">
              Verify your otp to activate your account
            </p>
            <form className="flex flex-col justify-center md:items-start items-center p-2 min-w-screen">
              <div className="p-1 md:p-2">
                <label className="text-md font-bold text-black"></label>
                <input
                  className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                  placeholder="Enter your Otp:"
                  type="email"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  id="email"
                  title="email"
                />
              </div>
              <button
                type="button"
                onClick={() => !loading && verifyOtp()} // Prevent multiple clicks while loading
                className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                {loading ? <div className="spinner"></div> : "Submit"}
              </button>
              <button
                type="button"
                onClick={resendOTP}
                className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
                  loading1 ? "cursor-not-allowed" : ""
                }`}
              >
                {loading1 ? <div className="spinner"></div> : "Resend OTP"}
              </button>{" "}
            </form>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </main>
  );
};

export default VerifyEmail;

{
  /* <button
                type="button"
                onClick={() => !loading && verifyOtp()} // Prevent multiple clicks while loading
                className={`py-6 px-3 min-w-[360px]  md:min-w-[400px] flex items-center justify-center bg-green-600 rounded-xl my-4 text-white ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                {loading ? <div className="spinner"></div> : "Submit"}
              </button>
            </form>
            ;
            <button
              type="button"
              onClick={resendOTP}
              className={`py-6 px-3 min-w-[360px]  md:min-w-[400px] flex items-center justify-center bg-green-600 rounded-xl my-4 text-white ${
                loading ? "cursor-not-allowed" : ""
              }`}
            >
              {loading ? <div className="spinner"></div> : "Resend OTP"}
            </button> */
}
