import React, { useState } from "react";
import axios from "axios";
import "@/app/globals.css";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-networks Intern DIGITAL CARD purchase",
  description: "Get your Digital Card to complete your registration process",
};

const PaymentButton = () => {
  const navigate = useRouter();
  const [paymentUrl, setPaymentUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    setLoading(true); // Show the loader
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        "https://enetworks-tovimikailu.koyeb.app/pay/",
        // "http://localhost:5000/pay/",
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
        setLoading(false);
        navigate.push(paymentUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <main className="flex flex-col md:flex-row min-h-screen min-w-screen items-center justify-center bg-white">
        <div className="flex items-center justify-center">
          <div className="flex flex-col justify-center items-center mx-auto border border-white text-black bg-white mt-20 mb-5">
            <div className="p-4 flex flex-col justify-center items-center text-center">
              <h1 className="font-bold text-3xl">Pay For Your Card</h1>
              <h2 className="font-semibold mt-2">
                You need to make a payment for your Digital card to cmplete your
                registration
              </h2>
              {paymentUrl ? (
                <div className="p-3 border border-black text-start mt-5 bg-gray-200">
                  <div>
                    <h1>
                      Amount: <span className="line-through">N</span>
                      <span className="font-bold">1500</span>
                    </h1>
                    <h1>
                      Payment For:{" "}
                      <span className="font-bold">
                        E-NETWORKS DIGITAL IDENTITY CARD
                      </span>
                    </h1>
                  </div>
                  <a
                    href={paymentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <button
                      className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
                        loading ? "cursor-not-allowed" : ""
                      }`}
                    >
                      Proceed to Payment
                    </button>
                  </a>
                </div>
              ) : (
                <button
                  onClick={() => !loading && handlePayment()}
                  className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
                    loading ? "cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? (
                    <div className="spinner"></div>
                  ) : (
                    "Initiate Payment"
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </main>
    </div>
  );
};

export default PaymentButton;
