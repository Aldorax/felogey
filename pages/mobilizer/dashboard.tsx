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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faDollar,
  faMoneyBill,
  faMoneyBill1Wave,
  faPeopleArrows,
  faPerson,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

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
  const [isUserMobilizer, setIsMobilizer] = useState(false);

  useEffect(() => {
    const isUserMobilizer = user?.role === "Mobilizer";
    setIsMobilizer(isUserMobilizer);
  }, [user]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const access_token = localStorage.getItem("access_token");

        if (!access_token) {
          console.log("Not authorized");
          navigate.push("/mobilizer/login");
          return;
        }

        httpClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${access_token}`;

        const response = await httpClient.get(
          "https://enetworks-tovimikailu.koyeb.app/dashboard",
          // "http://localhost:5000/dashboard",
          {
            withCredentials: true, // Include cookies in the request
          }
        );

        setUser(response.data);
      } catch (error) {
        navigate.push("/mobilizer/login");
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
    window.location.href = "/mobilizer/dashboard";
  };

  const isEmailVerified = user?.is_email_verified === "True";

  useEffect(() => {
    if (user && !isEmailVerified) {
      navigate.push(
        // "https://www.enetworksagencybanking.com.ng/mobilizer/verify-email"
        "https://enetworksagencybanking.com.ng/mobilizer/verify-email"
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
          window.location.href = "/mobilizer/dashboard";
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
        "https://enetworks-tovimikailu.koyeb.app/pay/",
        // "http://localhost:5000/pay/",
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
      {isUserMobilizer ? (
        <div className="min-h-screen h-auto max-w-screen bg-blue-600">
          {user ? (
            <div className="flex">
              <div className="hidden">
                <LeftSide />
              </div>
              {/*  */}
              <div className=" flex flex-col justify-center items-start py-3 px-6 text-white w-full bg-blue-600 max-w-screen min-h-full">
                <div className="flex flex-col md:flex-row items-center justify-center mb-2 md:mt-3 md:mb-10 w-full h-auto my-auto">
                  <div className="w-full h-auto flex items-center py-3 md:py-6 md:bg-blue-400 bg-transparent rounded-xl">
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
                            // src={`https://enetworks-tovimikailu.koyeb.app/profile_images/${user.profile_image}`}
                            alt="Profile"
                            className="md:h-40 md:w-40 h-[50px] w-[50px] md:mx-auto md:rounded-full rounded-full bg-center"
                          />
                        </div>
                      )}
                      <div className="text-white">
                        <div className="flex">
                          <p className="text-sm md:text-2xl font-semibold">
                            {user.first_name}
                          </p>
                          <div className="text-[8px] md:text-lg p-1 bg-orange-500 rounded-md ml-2">
                            {user.total_referred_users >= 200
                              ? " Verified"
                              : " Newbie"}
                          </div>
                        </div>
                        <p className="text-sm md:text-xl text-gray-200">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {user.total_referred_users >= 200 ? (
                  ""
                ) : (
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white rounded-2xl mb-3 p-8 relative hover:bg-blue w-full md:text-lg font-semibold text-black cursor-pointer text-sm md:text-md">
                    <h1>
                      Note: Before you can become a verified mobilizer of
                      Enetworks Agency Banking, you need to meet the minimum
                      target of <b>200 users</b>. This will unlock the ability
                      to withdraw your earnings and also access future benefits
                      of Enetworks.
                    </h1>
                  </div>
                )}
                <div className="flex flex-col w-full">
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl">
                    <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3 bg-blue-400 text-white">
                      <h1 className="text-md md:text-2xl underline underline-offset-4 font-bold">
                        Full Name
                      </h1>
                      <p className="text-sm md:text-xl font-normal">
                        {user.first_name} {user.last_name}
                      </p>
                    </div>
                    <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3 bg-blue-400 text-white">
                      <h1 className="text-md md:text-2xl md:min-w-[80vw] underline underline-offset-4 font-bold ">
                        Phone Number
                      </h1>
                      <p className="text-sm md:text-xl font-normal">
                        {user.phone_number}
                      </p>
                    </div>
                  </div>
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white rounded-2xl mt-3 p-3 relative text-black"
                    href={"/mobilizer/edit-data"}
                  >
                    <FontAwesomeIcon
                      icon={faPerson}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">
                        Edit account details
                      </h3>
                      <div className="flex gap-2 items-center text-sm md:text-md">
                        <h4>Click to edit your account details</h4>{" "}
                        {/* Display total_registeblue_users */}
                      </div>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-4 w-4 md:w-10 md:h-10 absolute top-3 md:top-6 right-10 md:right-6 transform -rotate-90`}
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
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-blue-400 rounded-2xl mt-3 p-3 relative">
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
                        <h4>{user.total_referred_users} / 200</h4>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white rounded-2xl mt-3 p-3 relative text-black">
                    <FontAwesomeIcon
                      icon={faDollar}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">Earnings</h3>
                      <div className="flex gap-2 items-center">
                        <h4>
                          <span className="line-through">N</span>
                          {user.earnings}
                        </h4>
                      </div>
                    </div>
                  </div>
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-blue-400 rounded-2xl mt-3 p-3 relative hover:bg-blue-800"
                    href={"/mobilizer/referral-details"}
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
                      className={`h-4 w-4 md:w-10 md:h-10 absolute top-3 md:top-6 right-10 md:right-6 transform -rotate-90`}
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
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-blue-400 rounded-2xl mt-3 p-3 relative hover:bg-blue-800"
                    href={"/mobilizer/referralList"}
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
                      className={`h-4 w-4 md:w-10 md:h-10 absolute top-3 md:top-6 right-10 md:right-6 transform -rotate-90`}
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
                </div>
                <div className="w-full bg-white h-full text-sm text-black mt-3 rounded-2xl">
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl">
                    {user.has_paid === "True" ? (
                      <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl p-3">
                        <FontAwesomeIcon
                          icon={faMoneyBill}
                          width={50}
                          height={50}
                          scale={10}
                        />
                        <div className="mx-3">
                          <h3 className="text-sm md:text-3xl mb-2">
                            Paid for Cash Card
                          </h3>
                          <h1 className="font-normal text-sm">Yes</h1>
                        </div>
                      </div>
                    ) : (
                      <div className="p-3">
                        <h1 className="font-bold text-lg underline underline-offset-8">
                          Notice
                        </h1>
                        <br />
                        <div>
                          <h1>
                            Dear <b>MOBILIZER</b>,
                          </h1>
                          <br />
                          <p>
                            Please be informed that you will be <b>required</b>{" "}
                            to access your{" "}
                            <b>
                              PROVISIONAL BENEFITS AND STATUS AS AN AGGREGATOR
                            </b>{" "}
                            as a result of your mobilising for the internship
                            program with your <b>E-NETWORKS CASH CARD NUMBER</b>
                            . Ensure that you have one but if you do not have,
                            Click the button below to pay and book for it.
                          </p>
                          {paymentUrl ? (
                            <a
                              href={paymentUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <button
                                type="button"
                                onClick={() => !loading} // Prevent multiple clicks while loading
                                className={`min-w-[100px] md:min-w-[400px] flex items-center justify-center rounded-xl my-2 md:my-4 text-white p-1 bg-blue-600 ${
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
                              className={`min-w-[100px] md:min-w-[400px] flex items-center justify-center rounded-xl my-2 md:my-4 text-white p-2 bg-blue-600 ${
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
                  </div>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={logoutUser}
                    className="min-w-[100px] px-3 py-2 my-auto md:px-8 md:py-3 rounded-lg text-white uppercase bg-blue-400 mx-1 md:mx-3 text-sm md:text-current font-semibold"
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
        <div className="w-screen h-screen flex justify-center items-center">
          <div className="spinner2"></div>
          {/* Add a button or link to redirect the user to another page */}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
