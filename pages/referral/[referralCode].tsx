"use client";
import React, { useState, useEffect } from "react";
import httpClient from "@/components/charts/httpClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/header";

interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
}

interface ErrorResponse {
  error: string;
}

const ReferralRegisterPage = () => {
  const router = useRouter();
  const { referralCode } = router.query; // Access the referral code from the URL

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        const data: RegisterRequest = {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        };

        // Replace the following with your registration form data

        const response = await httpClient.post(
          `http://localhost:5000/referral/${referralCode}`,
          data,
          {
            withCredentials: true,
          }
        );

        if ("error" in response.data) {
          // Registration failed
          const errorResponse: ErrorResponse = response.data;
          toast.error(errorResponse.error);
        } else {
          // Registration successful
          toast.success("User registered successfully");
          router.push("/account/verify-email");
        }
      } catch (error) {
        console.log("An error occurred during registration");
        console.log(error);
        toast.error("An error occurred during registration");
      } finally {
        setIsLoading(false); // Hide the loader after registration attempt
      }
    }, 2000);
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen min-w-screen items-center justify-center bg-white">
      <Header />
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center items-center mx-auto border border-white text-black bg-white mt-20 mb-5">
          <div>
            <h1 className="px-3 text-4xl font-bold mb-2">Hello!</h1>
            <p className="px-3 text-lg font-normal mb-4">
              Sign Up to Get Started
            </p>
            <form className="flex flex-col justify-center md:items-start items-center p-2 min-w-screen">
              <div className="p-1 md:p-2">
                <label className="text-md font-bold text-black"></label>
                <input
                  className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[90vw] md:min-w-[400px]"
                  placeholder="Enter your Email:"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  title="email"
                />
              </div>
              <div className="p-1 md:p-2">
                <label className="text-md font-bold text-black"></label>
                <input
                  className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[90vw] md:min-w-[400px]"
                  placeholder="Enter your Password:"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  title="password"
                />
              </div>
              <div className="p-1 md:p-2">
                <label className="text-md font-bold text-black"></label>
                <input
                  className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[90vw] md:min-w-[400px]"
                  placeholder="Enter your Phone Number:"
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  id="pnumber"
                  title="pnumber"
                />
              </div>
              <div className="p-1 md:p-2">
                <label className="text-md font-bold text-black"></label>
                <input
                  className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[90vw] md:min-w-[400px]"
                  placeholder="Enter your Full Name:"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="fname"
                  title="firstName"
                />
              </div>
              <div className="p-1 md:p-2">
                <label className="text-md font-bold text-black"></label>
                <input
                  className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[90vw] md:min-w-[400px]"
                  placeholder="Enter your Last Name:"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  id="lname"
                  title="lastName"
                  autoComplete="true"
                />
              </div>
              <button
                type="button"
                onClick={() => !isLoading && handleRegister()} // Prevent multiple clicks while loading
                className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[90vw] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? <div className="spinner"></div> : "Submit"}
              </button>
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <Link href={"/account/login"} className="text-blue-700">
                Log In
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

export default ReferralRegisterPage;
