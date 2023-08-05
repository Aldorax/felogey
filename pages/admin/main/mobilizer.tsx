"use client";
import React, { useState, useEffect } from "react";
import { Mobilizer, User } from "@/app/AdminTypes";
import httpClient from "@/components/charts/httpClient";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";
import image from "@/app/favicon.ico";
import LeftSide from "@/components/LeftSide";
import axios from "axios";
import "@/app/globals.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export const metadata: Metadata = {
  title: "View All Referrals",
  description: "See all the users Registered through a referral",
};

interface DashboardProps {
  user: User;
}

const MobilizerComponent: React.FC<DashboardProps> = ({}) => {
  const navigate = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isUserAdmin, setIsAdmin] = useState(false);
  const [referralActivity, setReferralActivity] = useState<Mobilizer | null>(
    null
  );

  useEffect(() => {
    const isUserAdmin = user?.role === "Admin";
    setIsAdmin(isUserAdmin);
  }, [user]);

  useEffect(() => {
    const fetchReferralHistory = async () => {
      try {
        const response = await axios.get(
          "https://enetworks-tovimikailu.koyeb.app/admin-dashboard"
          //   "http://localhost:5000/admin-dashboard"
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
          "https://enetworks-tovimikailu.koyeb.app/admin-dashboard",
          //   "http://localhost:5000/admin-dashboard",
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
              {/* <div className="w-0 md:min-w-[green] md:max-w-[green]"></div> */}
              <div className=" flex flex-col justify-center items-start p-3 md:p-32 text-white w-full bg-gray-100 max-w-screen min-h-full">
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
                        Mobilizer User Data
                      </h3>
                      <h1 className="font-normal text-sm">
                        This are all the Register Mobilizer of Enetworks
                      </h1>
                    </div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`h-6 w-6 md:w-10 md:h-10 absolute top-6 right-10 md:right-6 transform rotate-360`}
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
                <table className="p-4 rounded-xs w-full text-sm md:text-md">
                  <thead>
                    <tr className="bg-orange-500 text-white">
                      <th className="px-2 py-6">Name</th>
                      <th className="px-2 py-6">Email</th>
                      <th className="px-2 py-6">Phone Number</th>
                      <th className="px-2 py-6">Address</th>
                      <th className="px-2 py-6">State</th>
                      <th className="px-2 py-6">Has Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user.mobilizers_data.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-3">
                          No intern data available.
                        </td>
                      </tr>
                    ) : (
                      user.mobilizers_data.map((intern, index) => (
                        <tr
                          key={index}
                          className="text-black font-bold text-center border-b-2 border-black"
                        >
                          <td className="px-2 py-6">{intern.name}</td>
                          <td className="px-2 py-6">{intern.email}</td>
                          <td className="px-2 py-6">{intern.phone_number}</td>
                          <td className="px-2 py-6">{intern.address}</td>
                          <td className="px-2 py-6">{intern.state}</td>
                          <td className="px-2 py-6">
                            {intern.has_paid ? "Yes" : "No"}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
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

export default MobilizerComponent;
