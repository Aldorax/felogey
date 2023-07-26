"use client";
import React, { useState } from "react";
import httpClient from "@/components/charts/httpClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/header";

// ... rest of the code

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

const RegisterPage: React.FC = () => {
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const registerUser = async () => {
    setLoading(true); // Show the loader

    setTimeout(async () => {
      try {
        const data: RegisterRequest = {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        };

        const resp = await httpClient.post(
          "http://localhost:5000/user/register",
          data,
          {
            withCredentials: true,
          }
        );

        if ("error" in resp.data) {
          // Registration failed
          const errorResponse: ErrorResponse = resp.data;
          toast.error(errorResponse.error);
        } else {
          // Registration successful
          toast.success("User registered successfully");
          navigate.push("/account/verify-email");
        }
      } catch (error) {
        console.log("An error occurred during registration");
        console.log(error);
        toast.error("An error occurred during registration");
      } finally {
        setLoading(false); // Hide the loader after registration attempt
      }
    }, 2000);
  };

  return (
    <>
      <div className="flex flex-col justify-evenly items-center bg-white text-black">
        <Header />
        <main className="flex min-h-screen items-center justify-between">
          <div className="min-w-screen min-h-screen max-w-screen flex flex-col justify-center items-center mx-auto border border-white text-black bg-white">
            <div>
              <h1 className="px-3 text-4xl font-bold mb-2">Hello!</h1>
              <p className="px-3 text-lg font-normal mb-4">
                Sign Up to Get Started
              </p>
              <form className="flex flex-col justify-center md:items-start items-center p-2 md:w-full w-screen">
                <div className="p-1 md:p-2">
                  <label className="text-md font-bold text-black"></label>
                  <input
                    className="py-6 px-10 border border-gray-400 rounded-xl my-1 min-w-[380px] md:min-w-[400px]"
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
                    className="py-6 px-10 border border-gray-400 rounded-xl my-1 min-w-[380px] md:min-w-[400px]"
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
                    className="py-6 px-10 border border-gray-400 rounded-xl my-1 min-w-[380px] md:min-w-[400px]"
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
                    className="py-6 px-10 border border-gray-400 rounded-xl my-1 min-w-[380px] md:min-w-[400px]"
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
                    className="py-6 px-10 border border-gray-400 rounded-xl my-1 min-w-[380px] md:min-w-[400px]"
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
                  onClick={() => !loading && registerUser()} // Prevent multiple clicks while loading
                  className={`py-6 px-3 md:min-w-[400px] min-w-[380px] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
                    loading ? "cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? <div className="spinner"></div> : "Submit"}
                </button>
              </form>
              ;
              <p className="text-center">
                Already have an account?{" "}
                <Link href={"/account/login"} className="text-blue-700">
                  Log In
                </Link>
              </p>
            </div>
          </div>
        </main>

        {/* Toast Container */}
        <ToastContainer />
      </div>
    </>
  );
};

export default RegisterPage;
// export default register;
