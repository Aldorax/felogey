"use client";
import React, { useState, useEffect } from "react";
import { ReferredUser, User } from "@/app/types";
import httpClient from "@/components/charts/httpClient";
import { useRouter } from "next/navigation";
import type { Metadata } from "next";
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

const Activities: React.FC<DashoardProps> = ({}) => {
  const navigate = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [referralActivity, setReferralActivity] = useState<ReferredUser[]>([]);

  useEffect(() => {
    // ... Fetch user data as you did before ...

    // Check if the user is an admin or super admin
    const isUserAdmin = user?.role === "Admin" || user?.role === "Super Admin";
    setIsAdmin(isUserAdmin);

    const fetchReferralActivity = async () => {
      try {
        const response = await httpClient.get(
          "https://enetworks-tovimikailu.koyeb.app/admins"
        );
        setReferralActivity(response.data);
      } catch (error) {
        console.log("Error fetching referral activity:", error);
      }
    };

    fetchReferralActivity();
  }, [user]);

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
        navigate.push("/Admin/login");
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
    window.location.href = "/admin/main/dashboard";
  };

  const parseProfilePic = (profilePic: string | "null"): string | null => {
    return profilePic === "null" ? null : profilePic;
  };

  return (
    <div className="max-w-screen overflow-x-hidden">
      {isAdmin ? (
        <div className="min-h-screen h-auto max-w-screen">
          {user ? (
            <div className="flex">
              <LeftSide />
              {/*  */}
              <div className="w-0 md:min-w-[20vw] md:max-w-[20vw]"></div>
              <div className=" flex flex-col justify-center items-start p-3 md:p-32 text-white w-full bg-green-500/25 max-screen md:max-w-[80vw] min-h-screen">
                <div className="p-3 bg-white text-black min-h-[10vh] h-auto w-full rounded-xl">
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
      ) : (
        <div className="w-screen h-screen flex justify-center items-center">
          <h1>You are not authorized to access this page.</h1>
          {/* Add a button or link to redirect the user to another page */}
        </div>
      )}
    </div>
  );
};

export default Activities;
