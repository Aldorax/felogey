"use client";
import React, { useState, useEffect } from "react";
import { ReferredUser, User } from "@/app/types";
import httpClient from "@/components/charts/httpClient";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
// import Header from "@/components/header";
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

const Dashboard: React.FC<DashoardProps> = ({}) => {
  const navigate = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const access_token = localStorage.getItem("access_token");

        if (!access_token) {
          console.log("Not authorized");
          navigate.push("/account/login");
          return;
        }

        httpClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        const response = await httpClient.get(
          "https://enetworks.onrender.com/dashboard",
          {
            withCredentials: true, // Include cookies in the request
          }
        );

        setUser(response.data);
      } catch (error) {
        navigate.push("/account/login");
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
      "https://enetworks.onrender.com/logout",
      {
        withCredentials: true, // Include cookies in the request
      }
    );

    // Redirect to the desired location
    window.location.href = "/";
  };

  const refresh = () => {
    window.location.href = "/user/dashboard";
  };

  const isEmailVerified = user?.is_email_verified === "True";

  useEffect(() => {
    if (user && !isEmailVerified) {
      navigate.push(
        "https://www.enetworksagencybanking.com.ng/account/verify-email"
      );
    }
  }, [user, isEmailVerified, navigate]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const access_token = localStorage.getItem("access_token");
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("profile_image", file); // Use the correct field name "profile_image"

      httpClient
        .post("https://enetworks.onrender.com/update_profile_image", formData, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          setUser((prevUser) => {
            if (prevUser) {
              return { ...prevUser, profile_pic: response.data };
            }
            return null;
          });
          window.location.href = "/user/dashboard";
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const parseProfilePic = (profilePic: string | "null"): string | null => {
    return profilePic === "null" ? null : profilePic;
  };

  const handlePayment = () => {
    setLoading(true); // Show the loader
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        "https://enetworks.onrender.com/pay/",
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
    <div className="max-w-screen overflow-x-hidden">
      {/* <Header /> */}
      <div className="min-h-screen h-auto max-w-screen">
        {user ? (
          <div className="flex">
            <LeftSide />
            {/*  */}
            <div className="w-0 md:min-w-[20vw] md:max-w-[20vw]"></div>
            <div className=" flex flex-col justify-center items-start p-3 md:p-32 text-white w-full bg-green-500/25 max-screen md:max-w-[80vw] min-h-screen">
              <div className="flex flex-col md:flex-row items-center justify-center mb-5 md:mt-20 md:mb-10 w-full h-auto my-auto">
                <div className="md:max-w-[500px] w-full h-auto flex md:flex-row justify-between md:justify-center items-center mb-3 border-b-2 md:border-b-transparent border-b-white pb-3 ">
                  <div className="md:p-5 p-3 mx-1 md:mx-3 my-1 md:my-3 md:hidden visible">
                    <p className="text-md md:text-xl text-gray-300 font-semibold uppercase">
                      {user.first_name} {user.last_name}
                    </p>
                  </div>
                  <div>
                    {user.profile_image === "None" ? (
                      <div className="flex flex-col">
                        <input
                          type="file"
                          id="profile_image"
                          accept="image/*"
                          onChange={handleImageChange}
                          title="profile_image"
                          // value={"profile_image"}
                        />
                        <button
                          className="bg-black px-6 py-2 text-white"
                          onClick={refresh}
                        >
                          Submit Image
                        </button>
                      </div>
                    ) : (
                      <div className="mx-4 my-auto">
                        <img
                          src={`https://enetworks.onrender.com/profile_images/${user.profile_image}`}
                          alt="Profile"
                          className="md:h-full md:w-full h-[60px] w-[80px] md:mx-auto md:rounded-2xl rounded-full"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl">
                  {/* <div className="md:p-5 p-3 bg-green-900/100 rounded-xl mx-1 md:mx-3 my-1 md:my-3">
                      <h1 className="text-xl md:text-2xl underline underline-offset-4 font-extrabold">
                        Full Name
                      </h1>
                      <p className="text-md md:text-xl text-gray-300 font-semibold uppercase">
                        {user.first_name} {user.last_name}
                      </p>
                    </div> */}
                  <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3">
                    <h1 className="text-md md:text-2xl underline underline-offset-4 font-extrabold text-black">
                      Email Address
                    </h1>
                    <p className="text-sm md:text-xl text-black font-normal">
                      {user.email}
                    </p>
                  </div>
                  <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3">
                    <h1 className="text-md md:text-2xl underline underline-offset-4 font-extrabold text-black">
                      Phone Number
                    </h1>
                    <p className="text-sm md:text-xl text-black font-normal">
                      {user.phone_number}
                    </p>
                  </div>
                  <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3">
                    <h1 className="text-md md:text-2xl underline underline-offset-4 font-extrabold text-black">
                      Referral Code
                    </h1>
                    <p className="text-sm md:text-xl text-black font-normal">
                      {user.referral_code}
                    </p>
                  </div>

                  <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3 w-full">
                    <h1 className="text-md md:text-2xl underline underline-offset-4 font-extrabold text-black">
                      Referral Link
                    </h1>
                    <p className="text-sm md:text-xl text-black font-normal word-wrap-break">
                      {user.referral_link}
                    </p>
                  </div>
                  <div className="md:p-5 p-3 bg-white text-black rounded-md mx-1 md:mx-3 my-1 md:my-3">
                    <h1 className="text-md md:text-2xl underline underline-offset-4 font-extrabold">
                      Paid for ID
                    </h1>
                    <p className="text-md md:text-xl text-black font-semibold uppercase">
                      {user.has_paid === "True" ? (
                        "Yes"
                      ) : (
                        <div>
                          <div>
                            {paymentUrl ? (
                              <a
                                href={paymentUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <button
                                  type="button"
                                  onClick={() => !loading} // Prevent multiple clicks while loading
                                  className={`min-w-[100px] md:min-w-[400px] flex items-center justify-center rounded-xl my-2 md:my-4 text-white p-1 bg-green-600 ${
                                    loading ? "cursor-not-allowed" : ""
                                  }`}
                                >
                                  {loading ? (
                                    <div className="spinner"></div>
                                  ) : (
                                    "Proceed"
                                  )}
                                </button>
                              </a>
                            ) : (
                              <button
                                type="button"
                                onClick={() => !loading && handlePayment()} // Prevent multiple clicks while loading
                                className={`min-w-[100px] md:min-w-[400px] flex items-center justify-center rounded-xl my-2 md:my-4 text-white p-2 bg-green-600 ${
                                  loading ? "cursor-not-allowed" : ""
                                }`}
                              >
                                {loading ? (
                                  <div className="spinner"></div>
                                ) : (
                                  "Make Payment"
                                )}
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full items-center justify-center">
                <div className="md:p-5 p-3 bg-white rounded-xl mx-1 md:mx-3 my-1 md:my-3 text-black mt-2 mb-2 w-full">
                  Copy and share the referral to onboard users
                </div>
                <div className="md:p-5 p-3 bg-white rounded-xl mx-1 md:mx-3 my-1 md:my-3 text-black mb-2 w-full">
                  {user.has_paid === "True"
                    ? "You have paid for your Card successfully"
                    : "You need to pay for your E-network card"}
                </div>
                {/* <div className="md:p-5 p-3 bg-white rounded-xl mx-1 md:mx-3 my-1 md:my-3 text-black mb-4 w-full">
                  <h1 className="text-md md:text-2xl underline underline-offset-4 font-extrabold">
                    Earnings
                  </h1>
                  <p className="text-md md:text-xl text-black font-semibold uppercase">
                    <span className=" line-through">N</span> {user.earnings}
                  </p>
                </div> */}
              </div>

              <div className="p-3 bg-white text-black h-[50vh] w-full rounded-xl">
                <h3 className="text-xl md:text-3xl font-extrabold p-2 border-b-2 border-black">
                  Referral Activity
                </h3>
                <ul>
                  {user.referral_list.map((referredUser: ReferredUser) => (
                    <li
                      key={referredUser.id}
                      className="p-4 bg-green-800 border border-black m-4 rounded-xl text-white"
                    >
                      <p>Email: {referredUser.email}</p>
                      <p>
                        Has Paid:{" "}
                        {referredUser.has_paid === "True" ? "Yes" : "No"}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4">
                <button
                  type="button"
                  onClick={logoutUser}
                  className="px-3 py-4 my-auto md:px-8 md:py-3 rounded-lg text-white uppercase bg-green-800 mx-1 md:mx-3 text-sm md:text-current font-bold"
                >
                  Logout
                </button>
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

export default Dashboard;
