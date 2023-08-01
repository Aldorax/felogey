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
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const metadata: Metadata = {
  title: "View Your Referrals",
  description: "See all the users you have registered",
};

interface DashoardProps {
  user: User;
}

const ReferralList: React.FC<DashoardProps> = ({}) => {
  const navigate = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isUserIntern, setIsIntern] = useState(false);

  useEffect(() => {
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
    <div className="max-w-screen overflow-x-hidden">
      {isUserIntern ? (
        <div className="min-h-screen bg-white h-auto max-w-screen">
          {user ? (
            <div className="flex flex-col">
              <div className="hidden">
                <LeftSide />
              </div>
              {/*  */}
              <div className="w-0 md:min-w-[green] md:max-w-[green]"></div>
              <div className=" flex flex-col justify-center items-start p-3 md:p-32 text-white w-full bg-gray-100 max-w-screen md:max-w-[80vw] min-h-full">
                <div className="flex flex-col w-full">
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-start justify-around bg-blue-500 text-white rounded-2xl mt-3 px-3 py-6 relative w-full"
                    href={"/interns/dashboard"}
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
                  d
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-start justify-start bg-white text-black rounded-2xl mt-3 p-3 relative">
                    <div>
                      <h3 className="text-sm md:text-3xl mb-2">
                        Referral History
                      </h3>
                      <h1 className="font-normal text-sm">
                        This are your Referrals
                      </h1>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 absolute top-6 right-10 md:right-1 transform rotate-360`}
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
                </div>
              </div>
              <div>
                {user.referral_list.map((referredUser: ReferredUser) => (
                  <div
                    key={referredUser.id}
                    className="p-4 bg-blue-800 border border-black m-4 rounded-xl text-white text-sm mb-2"
                  >
                    <div className="flex items-center gap-2">
                      <FontAwesomeIcon
                        icon={faUser}
                        width={50}
                        height={50}
                        scale={10}
                        className="rounded-xl py-10 px-4 bg-blue-500"
                      />
                      <div className="flex flex-col gap-2">
                        <p>
                          Full Name: {referredUser.first_name}{" "}
                          {referredUser.last_name}
                        </p>
                        <p>Email: {referredUser.email}</p>
                        <p>
                          Account Verified:{" "}
                          {referredUser.has_paid === "True" ? "Yes" : "No"}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
          <div className="spinner2">Loading</div>
          {/* Add a button or link to redirect the user to another page */}
        </div>
      )}
    </div>
  );
};

export default ReferralList;
