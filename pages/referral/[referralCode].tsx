"use client";
import React, { useState, useEffect } from "react";
import httpClient from "@/components/charts/httpClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/header";
import { FiEye, FiEyeOff } from "react-icons/fi";

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

const ReferralRegisterPage = () => {
  const router = useRouter();
  const { referralCode } = router.query; // Access the referral code from the URL

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [account, setAccount] = useState("");
  const [bankName, setBankName] = useState("");
  const [LGA, setLGA] = useState("");
  const [enairaId, setEnairaID] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async () => {
    if (!areRequiredFieldsFilled()) {
      toast.error("Please fill all required details", {
        position: "top-right",
        autoClose: 3000, // Close the toast after 3 seconds
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setIsLoading(true);

    setTimeout(async () => {
      try {
        // Check if profile_image is provided and within the size limit
        if (selectedImage) {
          const fileSizeInMB = selectedImage.size / (1024 * 1024); // Convert to MB
          if (fileSizeInMB > MAX_IMAGE_SIZE_MB) {
            toast.error("Image size exceeds the maximum limit (3MB).");
            setIsLoading(false); // Hide the loader
            return;
          }
        }

        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        data.append("first_name", firstName);
        data.append("last_name", lastName);
        data.append("phone_number", phoneNumber);
        data.append("state", state);
        data.append("account", account);
        data.append("bankName", bankName);
        data.append("enaira_Id", enairaId);
        data.append("address", address);
        data.append("local_government_area", LGA);
        if (selectedImage) {
          data.append("profile_image", selectedImage);
        }

        // Replace the following with your registration form data

        const response = await httpClient.post(
          `https://enetworks-tovimikailu.koyeb.app/referral/${referralCode}`,
          // `http://localhost:5000/referral/${referralCode}`,
          data,
          {
            withCredentials: true,
          }
        );

        const { otp } = response.data;

        // Save the access_token and otp to the local storage
        localStorage.setItem("otp", otp);

        if ("error" in response.data) {
          // Registration failed
          const errorResponse: ErrorResponse = response.data;
          toast.error(errorResponse.error);
        } else {
          // Registration successful
          toast.success("User registered successfully");
          router.push("/interns/login");
        }
      } catch (error) {
        console.log("An error occurred during registration");
        console.log(error);
        toast.error("An error occurred during registration");
      } finally {
        setIsLoading(false); // Hide the loader after registration attempt
      }
    }, 2000);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    // Check if an image is selected
    if (file) {
      // Check image size
      const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB
      if (fileSizeInMB > MAX_IMAGE_SIZE_MB) {
        toast.error("Image size exceeds the maximum limit (3MB).");
        return; // Don't set the image if it exceeds the limit
      }

      // Preview the selected image
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      // If no image is selected, clear the preview
      setImagePreview(null);
    }

    setSelectedImage(file);
  };

  const areRequiredFieldsFilled = () => {
    return (
      email &&
      password &&
      phoneNumber &&
      firstName &&
      lastName &&
      state &&
      LGA &&
      address &&
      account &&
      selectedImage
    );
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
    "FCT", // Corrected entry
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
    "Nassarawa", // Corrected spelling
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
    <main className="flex flex-col md:flex-row min-h-screen min-w-screen items-center justify-center bg-white">
      <Header />
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center items-center mx-auto border border-white text-black bg-white mt-20 mb-5">
          <div>
            <h1 className="px-3 text-3xl font-bold mb-2">Hello!</h1>
            <p className="px-3 text-lg mb-4 font-semibold">
              Sign Up to become an Intern!
            </p>
            <form className="flex flex-col justify-center md:items-start items-center p-2 min-w-screen">
              <div className="p-1 md:p-2 flex flex-col items-center justify-center">
                <label
                  htmlFor="profileImage"
                  className="cursor-pointer text-md font-bold bg-green-500 px-3 py-4 rounded-xl text-white min-w-[80vw] md:min-w-[400px] text-center"
                >
                  Upload Passport Photograph
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="profileImage"
                  title="profileImage"
                  className="hidden p-5"
                  required
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="max-h-40 max-w-40 mx-auto"
                    />
                  </div>
                )}
              </div>
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
                    required
                    minLength={6}
                  />
                </div>
                <div className="p-1 md:p-2 relative">
                  <label className="text-md font-bold text-black"></label>
                  <input
                    className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px] custom-password-input"
                    placeholder="Enter your Password:"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    title="password"
                    autoComplete="true"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute md:top-10 top-7 right-7 cursor-pointer"
                  >
                    {showPassword ? <FiEyeOff /> : <FiEye />}
                  </button>
                </div>
              </div>
              {/*  */}
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
                    required
                    minLength={11}
                  />
                </div>
                <div className="p-1 md:p-2">
                  <label className="text-md font-bold text-black"></label>
                  <input
                    className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                    placeholder="Enter your First Name:"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    id="fname"
                    title="firstName"
                    autoComplete="true"
                    required
                  />
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col md:flex-row">
                <div className="p-1 md:p-2">
                  <label className="text-md font-bold text-black"></label>
                  <input
                    className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                    placeholder="Enter your Last Name:"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    id="lname"
                    title="lastName"
                    autoComplete="true"
                    required
                  />
                </div>
                <div className="p-1 md:p-2">
                  <label className="text-md font-bold text-black"></label>
                  <select
                    className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    id="state"
                    title="state"
                    required
                  >
                    <option value="">Select a state</option>
                    {nigeriaStates.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              {/*  */}
              <div className="flex flex-col md:flex-row">
                <div className="p-1 md:p-2">
                  <label className="text-md font-bold text-black"></label>
                  <input
                    className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                    placeholder="Enter your L.G.A:"
                    type="text"
                    value={LGA}
                    onChange={(e) => setLGA(e.target.value)}
                    id="local_government_area"
                    title="local_government_area"
                    autoComplete="true"
                    required
                  />
                </div>
                <div className="p-1 md:p-2">
                  <label className="text-md font-bold text-black"></label>
                  <input
                    className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                    placeholder="Enter your Address:"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="address"
                    title="address"
                    autoComplete="true"
                    required
                    minLength={5}
                  />
                </div>
              </div>
              <div className="flex flex-col md:flex-row">
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
                    required
                  />
                </div>
                <div className="p-1 md:p-2">
                  <label className="text-md font-bold text-black"></label>
                  <input
                    className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                    placeholder="Bank Name (eg) Zenith Bank"
                    type="text"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    id="bankName"
                    title="bankName"
                    autoComplete="true"
                    required
                  />
                </div>
              </div>
              <div className="p-1 md:p-2">
                <label className="text-md font-bold text-black"></label>
                <input
                  className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                  placeholder="Enter your EnairaID (if you have one):"
                  type="number"
                  value={enairaId}
                  onChange={(e) => setEnairaID(e.target.value)}
                  id="enaira_Id"
                  title="enaira_Id"
                  autoComplete="true"
                />
              </div>
              <button
                type="button"
                onClick={() => !isLoading && handleRegister()} // Prevent multiple clicks while loading
                className={`md:py-5 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-500 rounded-xl my-4 text-white font-semibold ${
                  isLoading ? "cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? <div className="spinner"></div> : "Submit"}
              </button>
            </form>
            <p className="text-center">
              Already have an account?{" "}
              <Link href={"/interns/login"} className="text-blue-700">
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      {/* Toast Container */}
      <ToastContainer />
    </main>
  );
};

export default ReferralRegisterPage;
