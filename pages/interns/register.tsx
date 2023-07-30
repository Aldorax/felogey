"use client";
import React, { useState } from "react";
import httpClient from "@/components/charts/httpClient";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@/app/globals.css";
import Link from "next/link";
import { useRouter } from "next/router";
import Header from "@/components/header";

interface RegisterRequest {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image: File | null; // Add the profile_image field as a File or null
}

interface ErrorResponse {
  error: string;
}

const MAX_IMAGE_SIZE_MB = 3;

const RegisterPage: React.FC = () => {
  const navigate = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const registerUser = async () => {
    setLoading(true); // Show the loader

    setTimeout(async () => {
      try {
        // Check if profile_image is provided and within the size limit
        if (selectedImage) {
          const fileSizeInMB = selectedImage.size / (1024 * 1024); // Convert to MB
          if (fileSizeInMB > MAX_IMAGE_SIZE_MB) {
            toast.error("Image size exceeds the maximum limit (3MB).");
            setLoading(false); // Hide the loader
            return;
          }
        }

        const data = new FormData();
        data.append("email", email);
        data.append("password", password);
        data.append("first_name", firstName);
        data.append("last_name", lastName);
        data.append("phone_number", phoneNumber);
        if (selectedImage) {
          data.append("profile_image", selectedImage);
        }

        const resp = await httpClient.post(
          // Replace "https://enetworks.onrender.com/intern/register" with your backend API endpoint
          "https://enetworks.onrender.com/intern/register",
          data,
          {
            withCredentials: true,
          }
        );

        const { otp } = resp.data;

        // Save the access_token and otp to the local storage
        localStorage.setItem("otp", otp);

        if ("error" in resp.data) {
          // Registration failed
          const errorResponse: ErrorResponse = resp.data;
          toast.error(errorResponse.error);
        } else {
          // Registration successful
          toast.success("User registered successfully");
          navigate.push("/interns/login");
        }
      } catch (error) {
        console.log("An error occurred during registration");
        console.log(error);
        toast.error("An error occurred during registration");
      } finally {
        setLoading(false); // Hide the loader after registration attempt
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

  const handleImageUpload = async () => {
    const access_token = localStorage.getItem("access_token");
    if (selectedImage) {
      try {
        // Perform the image upload using httpClient or any other method you have
        // For example:
        const formData = new FormData();
        formData.append("profile_image", selectedImage);

        // Now you can use formData to send the image to the backend
        await httpClient.post(
          "https://enetworks.onrender.com/update_profile_image",
          formData,
          {
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        // Handle success after image upload
        toast.success("Profile image uploaded successfully");
      } catch (error) {
        console.log("An error occurred during image upload");
        console.log(error);
        toast.error("An error occurred during image upload");
      }
    } else {
      // Handle the case when no image is selected
      toast.error("Please select an image to upload.");
    }
  };

  return (
    <main className="flex flex-col md:flex-row min-h-screen min-w-screen items-center justify-center bg-white">
      <Header />
      <div className="flex items-center justify-center">
        <div className="flex flex-col justify-center items-center mx-auto border border-white text-black bg-white mt-20 mb-5">
          <div>
            <h1 className="px-3 text-4xl font-bold mb-2">Hello!</h1>
            <p className="px-3 text-lg font-normal mb-4">
              Sign Up to Get Started
            </p>
            <form className="flex flex-col justify-center md:items-start items-center p-2 min-w-screen">
              <div className="p-1 md:p-2 flex flex-col items-center justify-center">
                <label className="text-md font-bold text-black"></label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  id="profileImage"
                  title="profileImage"
                  className="p-5 max-w-40 max-h-40 bg-green-600 rounded-md text-sm"
                  placeholder="Upload"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img
                      src={imagePreview}
                      alt="Profile Preview"
                      className="max-h-40 mx-auto"
                    />
                  </div>
                )}
              </div>
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
                />
              </div>
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
                />
              </div>
              <div className="p-1 md:p-2">
                <label className="text-md font-bold text-black"></label>
                <input
                  className="md:py-6 py-4 px-5 md:px-10 border border-gray-400 rounded-xl my-1 min-w-[80vw] md:min-w-[400px]"
                  placeholder="Enter your Full Name:"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  id="fname"
                  title="firstName"
                />
              </div>
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
                />
              </div>
              <button
                type="button"
                onClick={() => !loading && registerUser()} // Prevent multiple clicks while loading
                className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-600 rounded-xl my-4 text-white ${
                  loading ? "cursor-not-allowed" : ""
                }`}
              >
                {loading ? <div className="spinner"></div> : "Submit"}
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

export default RegisterPage;
// export default register;
