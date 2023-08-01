"use client";
import React, { useState, useEffect } from "react";
import {
  faUser,
  faMessage,
  faPerson,
  faBell,
  faPeopleArrows,
  faSquareCheck,
  faMoneyBillTransfer,
  faMoneyBill,
  faSms,
} from "@fortawesome/free-solid-svg-icons";
import { ReferredUser, User } from "@/app/types";
import httpClient from "@/components/charts/httpClient";
import { useRouter } from "next/navigation";
// import Header from "@/components/header";
import Link from "next/link";
import router from "next/router";
import Image from "next/image";
import image from "@/app/favicon.ico";
import LeftSide from "@/components/LeftSide";
import axios from "axios";
import "@/app/globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-networks Intern Dashboard Page",
  description: "View your user information",
};

interface DashoardProps {
  user: User;
}

const Dashboard: React.FC<DashoardProps> = ({}) => {
  const navigate = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUserIntern, setIsIntern] = useState(false);

  useEffect(() => {
    // ... Fetch user data as you did before ...

    // Check if the user is an admin or super admin
    const isUserIntern = user?.role === "Intern";
    setIsIntern(isUserIntern);
  }, [user]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const access_token = localStorage.getItem("access_token");

        if (!access_token) {
          console.log("Not authorized");
          navigate.push("/interns/login");
          return;
        }

        httpClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        const response = await httpClient.get(
          // "https://enetworks-tovimikailu.koyeb.app/dashboard",
          "https://enetworks-tovimikailu.koyeb.app/dashboard",
          {
            withCredentials: true, // Include cookies in the request
          }
        );

        setUser(response.data);
      } catch (error) {
        navigate.push("/interns/login");
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

  const refresh = () => {
    window.location.href = "/interns/dashboard";
  };

  const isEmailVerified = user?.is_email_verified === "True";

  useEffect(() => {
    if (user && !isEmailVerified) {
      navigate.push(
        // "https://www.enetworksagencybanking.com.ng/interns/verify-email"
        "https://enetworksagencybanking.com.ng/interns/verify-email"
      );
    }
  }, [user, isEmailVerified, navigate]);

  const isPaid = user?.has_paid === "True";

  useEffect(() => {
    if (user && !isPaid) {
      navigate.push(
        // "https://www.enetworksagencybanking.com.ng/interns/verify-email"
        "https://enetworksagencybanking.com.ng/interns/pay-for-card"
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
        .post(
          "https://enetworks-tovimikailu.koyeb.app/update_profile_image",
          formData,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        )
        .then((response) => {
          setUser((prevUser) => {
            if (prevUser) {
              return { ...prevUser, profile_pic: response.data };
            }
            return null;
          });
          window.location.href = "/interns/dashboard";
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
        // "https://enetworks-tovimikailu.koyeb.app/pay/",
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
    <div className="max-w-screen overflow-x-hidden bg-gray-100">
      {isUserIntern ? (
        <div className="min-h-screen h-auto max-w-screen">
          {user ? (
            <div className="flex">
              <div className="hidden">
                <LeftSide />
              </div>
              {/*  */}
              <div className="w-0 md:min-w-[20vw] md:max-w-[20vw]"></div>
              <div className=" flex flex-col justify-center items-start p-3 md:p-32 text-white w-full bg-gray-100 max-w-screen md:max-w-[80vw] min-h-full">
                <div className="flex flex-col md:flex-row items-center justify-center mb-2 md:mt-20 md:mb-10 w-full h-auto my-auto">
                  <div className="md:max-w-[500px] w-full h-auto flex md:flex-row items-center pb-3 ">
                    <div className="flex items-center">
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
                            src={user.profile_image}
                            alt="Profile"
                            className="md:h-full md:w-full h-[50px] w-[50px] md:mx-auto md:rounded-2xl rounded-full"
                          />
                        </div>
                      )}
                      <div className="text-black">
                        <div className="flex">
                          <p className="text-sm md:text-xl text-black font-semibold">
                            {user.first_name}
                          </p>
                          <div className="text-[8px] p-1 bg-green-500 font-bold rounded-md text-white ml-2">
                            Activated
                          </div>
                        </div>
                        <p className="text-sm text-gray-800">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl">
                    <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3">
                      <h1 className="text-md md:text-2xl underline underline-offset-4 font-extrabold text-black">
                        Full Name
                      </h1>
                      <p className="text-sm md:text-xl text-black font-normal">
                        {user.first_name} {user.last_name}
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
                  </div>
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl mt-3 p-3 relative">
                    <FontAwesomeIcon
                      icon={faPeopleArrows}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">
                        Total Interns referred
                      </h3>
                      <div className="flex gap-2 items-center">
                        <h4>{user.total_referred_users}</h4>
                      </div>
                    </div>
                  </div>
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl mt-3 p-3 relative"
                    href={"/interns/referral-details"}
                  >
                    <FontAwesomeIcon
                      icon={faUser}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">Referral</h3>
                      <h1 className="font-normal text-sm">
                        Invite Interns to register
                      </h1>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 absolute top-6 right-10 md:right-1 transform -rotate-90`}
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
                  </Link>
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl mt-3 p-3 relative"
                    href={"/interns/referralList"}
                  >
                    <FontAwesomeIcon
                      icon={faBell}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">
                        Referral History
                      </h3>
                      <h1 className="font-normal text-sm">Click to view</h1>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 absolute top-6 right-10 md:right-1 transform -rotate-90`}
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
                  </Link>
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl mt-3 p-3 relative mb-3">
                    <FontAwesomeIcon
                      icon={faSquareCheck}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h1 className="text-sm md:text-2xl mb-2">Paid for ID</h1>
                      <p className="font-normal text-sm">
                        {user.has_paid === "True" ? (
                          <p>Yes</p>
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
                <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl p-3 relative mb-3 w-full">
                  <FontAwesomeIcon
                    icon={faSms}
                    width={50}
                    height={50}
                    scale={10}
                  />
                  <div className="mx-3">
                    <h1 className="text-sm md:text-2xl mb-2">
                      Transaction History
                    </h1>
                    <p className="font-normal text-sm">
                      You Paid for E-networks Digital Card
                    </p>
                    <p className="font-normal text-sm">
                      Total Amount:{" "}
                      <span className="">
                        <span className="line-through">N</span>1500
                      </span>
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={logoutUser}
                    className="px-3 py-3 my-auto md:px-8 md:py-3 rounded-lg text-white uppercase bg-green-500 mx-1 md:mx-3 text-sm md:text-current font-bolsemibold"
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
      ) : (
        <div className="w-screen h-screen flex flex-col justify-center items-center">
          <div>Verifying</div>
          <div className="spinner2"></div>
          {/* Add a button or link to redirect the user to another page */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
