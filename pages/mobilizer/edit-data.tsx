"use client";
import React, { useEffect, useState } from "react";
import httpClient from "@/components/charts/httpClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import { ReferredUser, User } from "@/app/types";
import Link from "next/link";
import router from "next/router";
import { useRouter } from "next/navigation";
import Header from "@/components/header";
// import LeftSide from "@/components/LeftSide";

interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image: File | null; // Add the profile_image field as a File or null
  state: string;
  local_goverment_area: string;
  address: string;
  account: number;
  enaira_id: number;
}

interface ErrorResponse {
  error: string;
}

const MAX_IMAGE_SIZE_MB = 3;

const RegisterPage: React.FC = () => {
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobilizer_intern_id, setMobilizer_intern_id] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [account, setAccount] = useState("");
  // const [LGA, setLGA] = useState("");
  const [enairaId, setEnairaID] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

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

  const registerUser = async () => {
    setLoading(true); // Show the loader

    setTimeout(async () => {
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

        const data = new FormData();
        if (email) data.append("email", email);
        if (password) data.append("password", password);
        if (firstName) data.append("first_name", firstName);
        if (lastName) data.append("last_name", lastName);
        if (phoneNumber) data.append("phone_number", phoneNumber);
        if (account) data.append("account", account);
        if (mobilizer_intern_id)
          data.append("mobilizer_intern_id", mobilizer_intern_id);
        if (enairaId) data.append("enaira_Id", enairaId);
        if (address) data.append("address", address);
        // if (LGA) data.append("local_government_area", LGA);

        try {
          const resp = await httpClient.patch(
            // "http://localhost:5000/edit-user",
            "https://enetworks-tovimikailu.koyeb.app/edit-user",
            data,
            {
              withCredentials: true,
            }
          );

          if (resp.data.message === "Email is valid") {
            toast(resp.data.message);
            console.log(resp.data.message);
          } else {
            console.log(resp.data.message);
            toast(resp.data.message);
            setLoading(false);
          }
        } catch (error: any) {
          console.error(error);
          toast(error.response.data.message);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
        // Handle any other errors that might occur outside the HTTP request.
      }
    }, 2000);
  };

  const nigeriaStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "Federal Capital Territory (FCT)",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nassarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  return (
    <div className="max-w-screen overflow-x-hidden">
      {user ? (
        <div>
          <main className="flex flex-col md:flex-row min-h-screen min-w-screen items-center justify-center bg-white">
            <div className="flex items-center justify-center">
              <div className="flex flex-col justify-center items-center mx-auto border border-white text-black bg-white mt-20 mb-5">
                {/* <LeftSide /> */}
                <div>
                  <h1 className="px-3 text-3xl font-bold mb-2">
                    Edit your Account details!
                  </h1>
                  <form className="flex flex-col justify-center md:items-start items-center p-2 min-w-screen">
                    <div className="flex flex-col md:flex-row">
                      <div className="p-1 md:p-2">
                        <label className="text-md font-bold text-black"></label>
                        <input
                          className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                          placeholder="Enter your Email:"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          id="email"
                          title="email"
                          autoComplete="true"
                          minLength={6}
                        />
                      </div>
                      <div className="p-1 md:p-2">
                        <label className="text-md font-bold text-black"></label>
                        <input
                          className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                          placeholder="Enter your Password:"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          id="password"
                          title="password"
                          autoComplete="true"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col md:flex-row">
                      <div className="p-1 md:p-2">
                        <label className="text-md font-bold text-black"></label>
                        <input
                          className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                          placeholder="Enter your Phone Number:"
                          type="text"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          id="pnumber"
                          title="pnumber"
                          autoComplete="true"
                          minLength={11}
                        />
                      </div>

                      <div className="p-1 md:p-2">
                        <label className="text-md font-bold text-black"></label>
                        <input
                          className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                          placeholder="Enter your Account:"
                          type="number"
                          value={account}
                          onChange={(e) => setAccount(e.target.value)}
                          id="account"
                          title="account"
                          autoComplete="true"
                        />
                      </div>
                    </div>
                    {!user?.mobilizer_intern_id && (
                      <div className="flex flex-col items-center md:items-start">
                        <h1 className="text-sm font-semibold p-2">
                          Input the email of the Intern account in which you
                          paid for the E-networks Cash card with below to verify
                          your payment and link to your mobilizer account.
                        </h1>
                        <h1 className="text-sm font-semibold p-2 text-red-600">
                          Note that this will be permanently linked to your
                          account. If you did not make payment for the cash card
                          through your personal Intern account then, ignore this
                          field. If you did, then input the email of the Intern
                          account in which you paid for the E-networks Cash card
                          with to verify your payment and link to your mobilizer
                          account.
                        </h1>

                        <div className="p-1 md:p-2">
                          <label className="text-md font-bold text-black"></label>
                          <input
                            className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                            placeholder="Intern Email address"
                            type="text"
                            value={mobilizer_intern_id}
                            onChange={(e) =>
                              setMobilizer_intern_id(e.target.value)
                            }
                            id="mobilizer_intern_id"
                            title="mobilizer_intern_id"
                          />
                        </div>
                      </div>
                    )}
                    <button
                      type="button"
                      onClick={() => !loading && registerUser()} // Prevent multiple clicks while loading
                      className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-blue-500 rounded-xl my-4 text-white font-semibold ${
                        loading ? "cursor-not-allowed" : ""
                      }`}
                    >
                      {loading ? <div className="spinner"></div> : "Submit"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
            {/* Toast Container */}
            <ToastContainer />
          </main>
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

export default RegisterPage;
