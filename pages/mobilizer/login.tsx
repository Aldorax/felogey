/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import httpClient from "@/components/charts/httpClient";
import { FiEye, FiEyeOff } from "react-icons/fi";
import "@/app/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/header";
import type { Metadata } from "next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLock,
  faLockOpen,
  faMailBulk,
  faMessage,
} from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "Login to your account",
  description: "Enter your detaila and log inato your account",
};

interface ErrorResponse {
  error: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const logInUser = async () => {
    setLoading(true); // Show the loader

    setTimeout(async () => {
      try {
        const data: LoginRequest = {
          email,
          password,
        };

        const resp = await httpClient.post(
          "https://enetworks-tovimikailu.koyeb.app/login",
          // "http://localhost:5000/login",
          //
          data,
          {
            withCredentials: true, // Include cookies in the request
          }
        );

        // Retrieve the access token from the response data

        const { access_token } = resp.data;

        // Save the access_token and otp to the local storage
        localStorage.setItem("access_token", access_token);

        // Save the response headers
        const responseHeaders = resp.headers;
        if ("error" in resp.data) {
          // Registration failed
          const errorResponse: ErrorResponse = resp.data;
          toast.error(errorResponse.error);
        } else {
          // Registration successful
          toast.success("User Logged in successfully");
          navigate.push("/mobilizer/dashboard");
        }
        // console.log("Response Headers:", responseHeaders);
      } catch (error: any) {
        if (error) {
          toast.error(
            "There was an issue when Logging in. Check your details and try again!"
          );
        }
      } finally {
        setLoading(false); // Hide the loader after registration attempt
      }
    }, 2000);
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen min-w-screen items-center justify-center bg-white">
      <Header />
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center items-center mx-auto border border-white text-black bg-white mt-20 mb-5">
          <div className="text-center flex flex-col justify-center items-center">
            <h1 className="px-3 text-4xl font-bold mb-2">Welcome Back!</h1>
            <p className="px-3 text-lg font-normal mb-4">
              Login to your account
            </p>
            <form className="flex flex-col justify-center md:items-start items-center p-2 min-w-screen">
              <div className="p-1 md:p-2 relative">
                <label className="text-md font-bold text-black"></label>
                <FontAwesomeIcon
                  icon={faMailBulk}
                  // width={50}
                  // height={50}
                  // scale={10}
                  className="absolute top-7 md:top-9 left-2 md:left-4 w-[20px] h-[20px] md:w-[30px] md:h-[30px] px-1"
                />
                <input
                  className="md:py-6 py-4 px-8 md:px-12 border-2 border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px] focus:border-black"
                  placeholder="Enter your Email:"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  title="email"
                />
              </div>
              <div className="p-1 md:p-2 relative">
                <label className="text-md font-bold text-black"></label>
                <FontAwesomeIcon
                  icon={showPassword ? faLockOpen : faLock}
                  // width={50}
                  // height={50}
                  // scale={10}
                  className="absolute top-7 md:top-9 left-2 md:left-4 w-[20px] h-[20px] md:w-[30px] md:h-[30px] px-1"
                />
                <input
                  // When clicked the placeholder text should raise and be on the border using tailwindcss
                  className="md:py-6 py-4 px-8 md:px-12 border-2 border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px] focus:border-black custom-password-input"
                  placeholder="Enter your Password:"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  title="password"
                  autoComplete="true"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute md:top-10 top-7 right-7 cursor-pointer"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <button
                type="button"
                onClick={() => !loading && logInUser()} // Prevent multiple clicks while loading
                className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-blue-500 hover:bg-white hover:text-black hover:border-black border rounded-xl my-4 text-white font-semibold ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                {loading ? <div className="spinner"></div> : "Submit"}
              </button>
            </form>
            <p className="text-center">
              Don't have an account?{" "}
              <Link href={"/mobilizer/register"} className="text-blue-700">
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </main>
  );
};

export default LoginPage;
