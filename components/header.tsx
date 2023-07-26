// "use client";
// import { motion } from "framer-motion";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "@/app/globals.css";
import { User } from "@/app/types";
import httpClient from "@/components/charts/httpClient";
import { useRouter } from "next/navigation";

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
  const navigate = useRouter();

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
          "http://localhost:5000/dashboard",
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
    const resp = await httpClient.post("http://localhost:5000/logout", {
      withCredentials: true, // Include cookies in the request
    });

    // Redirect to the desired location
    window.location.href = "/account/login";
  };

  return (
    <div className="fixed top-0 left-0 w-screen px-2 md:px-32 py-2 md:py-1 font-sm md:font-medium flex items-start md:items-center justify-around md:justify-evenly bg-white text-black z-50 border-b-2 border-black">
      <h1 className="p-3 relative md:inherit left-10 md:left-0">
        <Link href={"/"}>E-networks</Link>
      </h1>
      <nav className="min-w-screen flex justify-center items-center md:p-3 px-1 py-2 mx-auto gap-x-1 md:gap-x-6 md:gap-0">
        {isMobileMenuOpen && (
          <div className="flex flex-col text-center justify-center min-w-screen w-full items-center uppercase">
            {user ? (
              <div className="md:hidden md:px-12 flex flex-col items-center justify-center  text-black min-h-screen text-5xl font-bold min-w-screen">
                <div className="flex flex-col items-center">
                  <h1 className="mx-3 px-2 py-5 min-w-full max-w-[80vw] border rounded-xl bg-green-800 text-white text-3xl my-2">
                    Welcome, {user.first_name}
                  </h1>
                  <Link
                    href={"/user/dashboard"}
                    className="mx-3 px-5 py-4 min-w-full max-w-[80vw] border rounded-xl bg-green-800 text-white text-3xl my-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    type="button"
                    onClick={logoutUser}
                    className="px-3 py-4 my-auto md:px-8 md:py-3 rounded-lg text-black uppercase bg-green-500 mx-1 md:mx-3 text-sm md:text-current"
                  >
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="md:hidden md:px-12 flex flex-col items-center justify-center  text-black min-h-screen text-5xl font-bold min-w-screen">
                <Link
                  href={"/account/register"}
                  className="mx-3 px-4 py-5 min-w-full max-w-[80vw] border rounded-xl bg-green-800 text-white text-xl md:text-3xl my-2"
                >
                  <h1>Register</h1>
                </Link>
                <Link
                  href={"/account/login"}
                  className="mx-3 px-2 py-4 min-w-full max-w-[80vw] border rounded-xl bg-green-800 text-white text-xl md:text-3xl my-2"
                >
                  <h1>Login</h1>
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
      <div className="md:hidden relative right-10">
        <button
          className="text-white focus:outline-none p-3 rounded-md bg-green-800 text-center"
          onClick={toggleMobileMenu}
        >
          {isMobileMenuOpen ? "Close" : "Menu"}
        </button>
      </div>
      {user ? (
        // If user is logged in, show the user's name
        <div className="hidden md:flex text-center justify-center items-center">
          <p>Welcome, {user.first_name}</p>
          <button
            type="button"
            onClick={logoutUser}
            className="px-3 py-2 my-auto md:px-8 md:py-3 rounded-lg text-black uppercase bg-green-500 mx-1 md:mx-3 text-sm md:text-current"
          >
            Logout
          </button>
        </div>
      ) : (
        // If user is not logged in, show the login and register options
        <div className="hidden md:flex text-center justify-center items-center">
          <Link href={"/account/register"} className="mx-3">
            <h1>Register</h1>
          </Link>
          <Link href={"/account/login"} className="mx-3">
            <h1>Login</h1>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
