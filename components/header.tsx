// "use client";
// import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { User } from "@/app/types";
import httpClient from "@/components/charts/httpClient";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faRocket,
  faUserAlt,
  faUserAstronaut,
} from "@fortawesome/free-solid-svg-icons";
import logo from "@/public/images/e-logo .png";
import Image from "next/image";

type props = {
  href: string;
  title: string;
  className: string;
};

interface HeaderProps {
  user: User | null; // Assuming you have the user data in the parent component and passing it as a prop to Header
}

const CustomLink = ({ href, title, className = "" }: props) => {
  return (
    <Link href={href} className={`${className} relative group w-full`}>
      {title}

      <span
        className={`h-[1px] inline-block bg-dark absolute left-0 -bottom-0.5 group-hover:w-full transition-[width] ease duration-300 w-full" : "w-0"
        }`}
      >
        &nbsp;
      </span>
    </Link>
  );
};

const Header = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen((prevValue) => !prevValue);
  };

  // const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const access_token = localStorage.getItem("access_token");

        if (!access_token) {
          console.log("Not authorized");
          return;
        }

        // console.log(`Bearer ${access_token}`);

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
        // navigate.push("/login");
        console.log("Not Authorized");
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const logoutUser = async () => {
    // Clear the access token from local storage
    localStorage.removeItem("accessToken");

    // Make the logout request
    const resp = await httpClient.post(
      "https://enetworks-tovimikailu.koyeb.app/logout",
      {
        withCredentials: true, // Include cookies in the request
      }
    );

    // Redirect to the desired location
    window.location.href = "/account/login";
  };

  return (
    <div className="fixed top-0 left-0 min-w-screen max-w-screen w-full px-2 md:px-32 py-2 md:py-1 font-sm md:font-medium flex items-center md:items-center justify-between bg-white text-black z-50 border-b-2 border-black">
      <h1 className="p-3 relative ">
        <Link href={"/"}>
          <Image
            src={logo}
            alt="logo"
            width={50}
            height={50}
            className="h-full max-w-30"
          />
        </Link>
      </h1>
      <nav className="flex justify-center items-center md:p-3 px-1 py-2 gap-x-1 md:gap-x-6 md:gap-0 text-black bg-white">
        <div className="relative bg-white">
          <button
            onClick={toggleDropdown}
            className="mx-6 min-w-full max-w-[40vw] rounded-xl my-2 flex gap-3 items-center justify-between text-black"
          >
            <h1 className="text-black">Menu</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={`h-4 w-4 absolute top-3 right-1 md:right-1 ${
                isDropdownOpen ? "transform rotate-180" : ""
              }`}
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
          </button>
          {isDropdownOpen && (
            <div className="absolute mt-8 right-0 bg-white rounded-lg w-[94vw] h-[80vh] md:w-[200px] md:h-full border border-black max-w-screen">
              <div className="flex gap-2 items-center border-b-2 border-black  bg-white rounded-md">
                <FontAwesomeIcon
                  icon={faRocket}
                  width={50}
                  height={50}
                  scale={10}
                />
                <Link
                  href={"/interns/register"}
                  className="block w-full p-2 hover:bg-green-700 hover:text-white"
                >
                  <h1>Register as an Intern</h1>
                </Link>
              </div>
              <div className="flex gap-2 items-center border-b-2 border-black  bg-white rounded-md">
                <FontAwesomeIcon
                  icon={faRocket}
                  width={50}
                  height={50}
                  scale={10}
                />
                <Link
                  href={"/mobilizer/register"}
                  className="block w-full p-2 hover:bg-green-700 hover:text-white"
                >
                  <h1>Register as a Mobilizer</h1>
                </Link>
              </div>
              <div className="flex gap-2 items-center border-b-2 border-black  bg-white rounded-md">
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  width={50}
                  height={50}
                  scale={10}
                />
                <Link
                  href={"/interns/login"}
                  className="block w-full p-2 hover:bg-green-700 hover:text-white"
                >
                  <h1>Login Intern</h1>
                </Link>
              </div>
              <div className="flex gap-2 items-center bg-white rounded-md">
                <FontAwesomeIcon
                  icon={faUserAstronaut}
                  width={50}
                  height={50}
                  scale={10}
                />
                <Link
                  href={"/mobilizer/login"}
                  className="block w-full p-2 hover:bg-green-700 hover:text-white"
                >
                  <h1>Login Mobilizer</h1>
                </Link>
              </div>
            </div>
          )}
        </div>
        {user ? (
          <div className="hidden md:flex gap-2 text-center justify-center items-center bg-white">
            <button
              type="button"
              onClick={logoutUser}
              className="px-3 py-2 my-auto md:px-8 md:py-3 rounded-lg text-black uppercase bg-green-800 mx-1 md:mx-3 text-sm md:text-current"
            >
              Logout
            </button>
            <button
              onClick={toggleDropdown}
              className="mx-6 min-w-full max-w-[40vw] rounded-xl my-2 flex gap-3 items-center justify-between text-black"
            >
              <h1 className="text-black">Menu</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-4 w-4 absolute top-3 right-1 md:right-1 ${
                  isDropdownOpen ? "transform rotate-180" : ""
                }`}
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
            </button>
          </div>
        ) : (
          <div className="hidden md:flex text-center justify-center items-center">
            <Link href={"/account/login"} className="mx-3">
              <h1></h1>
            </Link>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
