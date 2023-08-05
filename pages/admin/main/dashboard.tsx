"use client";
import React, { useState, useEffect } from "react";
import { User, Intern, Mobilizer, Referral } from "@/app/AdminTypes";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
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
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    // ... Fetch user data as you did before ...

    // Check if the user is an admin or super admin
    const isUserAdmin = user?.role === "Admin" || user?.role === "Super Admin";
    setIsAdmin(isUserAdmin);
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
          "https://enetworks-tovimikailu.koyeb.app/admin-dashboard",
          // "http://localhost:5000/admin-dashboard",
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

  const logoutUser = async () => {
    // Clear the access token from local storage
    localStorage.removeItem("access_token");

    // Make the logout request
    const resp = await httpClient.post(
      "https://enetworks-tovimikailu.koyeb.app/logout",
      {
        withCblueentials: true, // Include cookies in the request
      }
    );

    // blueirect to the desiblue location
    window.location.href = "/";
  };

  const refresh = () => {
    window.location.href = "/user/dashboard";
  };

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

  return (
    <div className="max-w-screen overflow-x-hidden bg-orange-600">
      {isAdmin ? (
        <div className="min-h-screen h-auto max-w-screen">
          {user ? (
            <div className="flex">
              {/* <LeftSide /> */}
              {/*  */}
              {/* <div className="w-0 md:min-w-[20vw] md:max-w-[20vw]"></div> */}
              <div className=" flex flex-col justify-center items-start py-3 px-6 text-white w-full bg-orange-600 max-w-screen min-h-full">
                <div className="flex flex-col md:flex-row items-center justify-center mb-2 md:mt-3 md:mb-10 w-full h-auto my-auto">
                  <div className="w-full h-auto flex items-center py-3 md:py-6 md:bg-orange-400 bg-transparent rounded-xl">
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
                          <p className="text-sm md:text-xl font-semibold">
                            {user.name}
                          </p>
                          <div className="text-[8px] p-1 bg-blue-500 rounded-md ml-2">
                            Activated
                          </div>
                        </div>
                        <p className="text-sm text-gray-200">{user.email}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white text-black rounded-2xl">
                    <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3 bg-orange-400 text-white">
                      <h1 className="text-md md:text-2xl underline underline-offset-4 font-bold">
                        Full Name
                      </h1>
                      <p className="text-sm md:text-xl font-normal">
                        {user.name}
                      </p>
                    </div>
                    <div className="md:p-5 p-3 rounded-xl mx-1 md:mx-3 my-1 md:my-3 bg-orange-400 text-white">
                      <h1 className="text-md md:text-2xl underline underline-offset-4 font-bold ">
                        Phone Number
                      </h1>
                      <p className="text-sm md:text-xl font-normal">
                        {user.phone_number}
                      </p>
                    </div>
                  </div>
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-white rounded-2xl mt-3 p-3 relative text-black"
                    href={"/admin/main/edit-data"}
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
                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-orange-400 rounded-2xl mt-3 p-3 relative">
                    <FontAwesomeIcon
                      icon={faPeopleArrows}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">
                        Total Registered Users
                      </h3>
                      <div className="flex gap-2 items-center">
                        <h4>{user.total_users}</h4>{" "}
                        {/* Display total_registeblue_users */}
                      </div>
                    </div>
                  </div>
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-orange-400 rounded-2xl mt-3 p-3 relative"
                    href={"/admin/main/interns"}
                  >
                    <FontAwesomeIcon
                      icon={faPeopleArrows}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">
                        Total Registered Interns
                      </h3>
                      <div className="flex gap-2 items-center">
                        <h4>{user.total_interns}</h4>{" "}
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
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-orange-400 rounded-2xl mt-3 p-3 relative"
                    href={"/admin/main/mobilizer"}
                  >
                    <FontAwesomeIcon
                      icon={faPeopleArrows}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">
                        Total Registered Mobilizers
                      </h3>
                      <div className="flex gap-2 items-center">
                        <h4>{user.total_mobilizers}</h4>{" "}
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
                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-orange-400 rounded-2xl mt-3 p-3 relative"
                    href={"/admin/main/executive"}
                  >
                    <FontAwesomeIcon
                      icon={faPeopleArrows}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">
                        Total Registered Executives
                      </h3>
                      <div className="flex gap-2 items-center">
                        <h4>{user.total_executives}</h4>{" "}
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

                  <div className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-orange-400 rounded-2xl mt-3 p-3 relative">
                    <FontAwesomeIcon
                      icon={faPeopleArrows}
                      width={50}
                      height={50}
                      scale={10}
                    />
                    <div className="mx-3">
                      <h3 className="text-sm md:text-3xl mb-2">
                        Global Mobilizer Referral Value
                      </h3>
                      <div className="flex gap-2 items-center">
                        <h4>{user.total_referrals}</h4>{" "}
                        {/* Display total_registeblue_users */}
                      </div>
                    </div>
                  </div>

                  <Link
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-orange-400 rounded-2xl mt-3 p-3 relative"
                    href={"/admin/main/referral-details"}
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
                      className={`h-4 w-4 absolute top-3 md:top-6 right-10 md:right-1 transform -rotate-90`}
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
                    className="flex flex-grow flex-grow-1 flex-wrap items-center justify-start bg-orange-400 rounded-2xl mt-3 p-3 relative"
                    href={"/admin/main/referralList"}
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
                      className={`h-4 w-4 absolute top-4 md:top-6 right-10 md:right-1 transform -rotate-90`}
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
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={logoutUser}
                    className="min-w-[100px] px-3 py-2 my-auto md:px-8 md:py-3 rounded-lg text-white uppercase bg-orange-400 mx-1 md:mx-3 text-sm md:text-current font-semibold"
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
        </div>
      )}
    </div>
  );
};

export default Dashboard;
