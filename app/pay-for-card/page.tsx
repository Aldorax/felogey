"use client";
import ProfileCompnent from "@/components/dashboard/ProfileComponent";
import axios from "axios";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardFooter, CardHeader, Divider } from "@nextui-org/react";

// export const metadata = {
//   title: "Pay for cash Card - Enetworks Agency Banking",
//   description: "Pay for Enetworks cash card",
// };

interface PaymentDetails {
  account_name: string;
  account_number: string;
  bank_name: string;
}

export default function PaymentPage() {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const { toast } = useToast();

  const handlePayment = () => {
    setLoading(true);
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        // "https://enetworks-tovimikailu.koyeb.app/transfer",
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
      // .get("https://enetworks-tovimikailu.koyeb.app/check-user-payment", {
      .get("https://enetworks-tovimikailu.koyeb.app/process-payment", {
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
            toast({
              title: "Payment Successful",
              description: response.data.message,
            });
          } else {
            // Show error toast
            toast({
              title: "Payment Verification Failed",
              description: response.data.message,
            });
          }
        } else {
          // Show error toast
          toast({
            title: "Payment Verification Failed",
            description: response.data.message,
          });
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
          toast({
            title: "Payment Verification Failed",
            description: error.response.data.message,
          });
        } else {
          toast({
            title: "Payment Verification Failed",
            description: error.error,
          });
        }
      });
  };

  return (
    <section className="flex flex-col items-center justify-center gap-4 md:py-10">
      {paymentDetails && (
        <Card className="w-full p-4">
          <CardHeader className="flex gap-3">
            <div className="flex w-full justify-between">
              <p className="text-small text-default-500 font-semibold">
                Make Payment
              </p>
              <p className="text-small text-default-500 font-semibold">
                E-cash Card
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardFooter className="flex flex-col w-full justify-start items-start">
            <div className="text-sm flex items-center justify-between my-3 w-full">
              <p>Account Number</p>
              <p className="font-semibold">{paymentDetails?.account_number}</p>
            </div>
            <Divider />
            <div className="text-sm flex md:flex-row flex-col my-3 w-full justify-between">
              <p>Account Name</p>
              <p className="mt-2 font-semibold">
                {paymentDetails?.account_name}
              </p>
            </div>
            <Divider />
            <div className="text-sm flex items-center justify-between my-3 w-full">
              <p>Account Name</p>
              <p className="font-semibold">{paymentDetails?.bank_name}</p>
            </div>
            <Divider />
            <div className="text-sm flex items-center justify-between my-3 w-full">
              <p>Amount to pay</p>
              <p className="font-semibold">&#x20A6;1500</p>
            </div>
          </CardFooter>
        </Card>
      )}
      {paymentDetails ? (
        <button
          onClick={() => !loading1 && handleVerifyPayment()}
          className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
            loading1 ? "cursor-not-allowed" : ""
          }`}
        >
          {loading1 ? <div className="spinner"></div> : "Verify Payment"}
        </button>
      ) : (
        <button
          onClick={() => !loading && handlePayment()}
          className={`md:py-6 py-4 px-5 md:px-3 md:min-w-[400px] min-w-[80vw] flex items-center justify-center bg-green-800 rounded-xl my-4 text-white ${
            loading ? "cursor-not-allowed" : ""
          }`}
        >
          {loading ? <div className="spinner"></div> : "Initiate Payment"}
        </button>
      )}
    </section>
  );
}
