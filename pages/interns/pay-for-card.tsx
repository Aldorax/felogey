import React, { useState } from "react";
import "@/app/globals.css";
import axios from "axios";
import { Metadata } from "next";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

export const metadata: Metadata = {
  title: "E-networks Intern DIGITAL CARD purchase",
  description: "Get your Digital Card to complete your registration process",
};

interface PaymentDetails {
  account_name: string;
  account_number: string;
  bank_name: string;
}

const PaymentButton = () => {
  const navigate = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  ); // Explicitly set the type
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const handlePayment = () => {
    setLoading(true);
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        "https://enetworks-tovimikailu.koyeb.app/transfer",
        {},
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      )
      .then((response) => {
        setPaymentDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleVerifyPayment = () => {
    setLoading1(true); // Show loading spinner

    const access_token = localStorage.getItem("access_token");
    axios
      .get("https://enetworks-tovimikailu.koyeb.app/check-user-payment", {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      })
      .then((response) => {
        setLoading1(false); // Hide loading spinner

        if (response.status === 200) {
          if (
            response.data.message ===
            "Successful payment and earnings distribution done"
          ) {
            toast.success("Payment has been verified");
            navigate.push("/interns/dashboard"); // Redirect to dashboard
          } else {
            // Show error toast
            toast.error(response.data.message);
          }
        } else {
          // Show error toast
          toast.error("An error occurred. Please try again later.");
        }
      })
      .catch((error) => {
        console.log(error);
        setLoading1(false); // Hide loading spinner

        if (
          error.response &&
          error.response.data &&
          error.response.data.message
        ) {
          toast.error(error.response.data.message); // Show the backend error message
        } else {
          toast.error("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div>
      <main className="flex flex-col md:flex-row min-h-screen min-w-screen items-center justify-center bg-white">
        <div className="flex items-center justify-center">
          <div className="flex flex-col justify-center items-center mx-auto border border-white text-black bg-white mt-20 mb-5">
            <div className="p-4 flex flex-col justify-center items-center text-center">
              <h1 className="font-bold text-3xl">Pay For Your Card</h1>
              {paymentDetails ? (
                <h2 className="font-semibold mt-2">
                  Make Payment to the account details below. When you are done
                  making payment, Click the made payment button below.
                </h2>
              ) : (
                <h2 className="font-semibold mt-2">
                  You need to make a payment for your Digital card to complete
                  your registration
                </h2>
              )}
              {paymentDetails ? (
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
                    <h1>
                      Account Name:{" "}
                      <span className="font-bold">
                        {paymentDetails.account_name}
                      </span>
                    </h1>
                    <h1>
                      Account Number:{" "}
                      <span className="font-bold">
                        {paymentDetails.account_number}
                      </span>
                    </h1>
                    <h1>
                      Bank Name:{" "}
                      <span className="font-bold">
                        {paymentDetails.bank_name}
                      </span>
                    </h1>
                  </div>
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
            <button
              onClick={() => !loading1 && handleVerifyPayment()}
              className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
                loading1 ? "cursor-not-allowed" : ""
              }`}
            >
              {loading1 ? <div className="spinner"></div> : "Verify Payment"}
            </button>
          </div>
        </div>

        {/* Toast Container */}
        <ToastContainer />
      </main>
    </div>
  );
};

export default PaymentButton;
