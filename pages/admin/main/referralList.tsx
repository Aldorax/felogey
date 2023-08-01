"use client";
import React, { useState, useEffect } from "react";
import { ReferralHistory, ReferredUser, User } from "@/app/types";
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
  const [isUserAdmin, setIsAdmin] = useState(false);
  const [referralActivity, setReferralActivity] = useState<ReferralHistory[]>(
    []
  );

  useEffect(() => {
    const isUserAdmin = user?.role === "Admin";
    setIsAdmin(isUserAdmin);
  }, [user]);

  useEffect(() => {
    const fetchReferralHistory = async () => {
      try {
        const response = await axios.get(
          "https://enetworks-tovimikailu.koyeb.app/referral-history"
        );
        console.log("Response from server:", response.data); // Check the response from the server
        setReferralActivity(response.data);
      } catch (error) {
        console.error("Error fetching referral history:", error);
      }
    };

    fetchReferralHistory();
  }, []);

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

  return (
    <div className="max-w-screen overflow-x-hidden">
      {isUserAdmin ? (
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
                  d
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-start justify-start bg-white text-black rounded-2xl mt-3 p-3 relative">
                    <div>
                      <h3 className="text-sm md:text-3xl mb-2">
                        Referral Registration History
                      </h3>
                      <h1 className="font-normal text-sm">
                        This are all the Referral registrations
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
                <ul>
                  {referralActivity.length === 0 ? (
                    <li>No Referral Registration history data available.</li>
                  ) : (
                    referralActivity.map((referral, index) => (
                      <li
                        key={index}
                        className="p-4 bg-orange-600 border border-black m-4 rounded-xl text-white text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <FontAwesomeIcon
                            icon={faUser}
                            width={50}
                            height={50}
                            scale={10}
                            className="rounded-xl py-10 px-4 bg-orange-500"
                          />
                          <div>
                            <p className="mb-3 font-semibold">
                              {referral.referrer} Referred {referral.referred}
                            </p>
                            <p>Date of registration: {referral.date}</p>
                          </div>
                        </div>
                      </li>
                    ))
                  )}
                </ul>
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

export default ReferralList;
