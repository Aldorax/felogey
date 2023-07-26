import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const PaymentButton = () => {
  const navigate = useRouter();
  const [paymentUrl, setPaymentUrl] = useState("");

  const handlePayment = () => {
    const access_token = localStorage.getItem("access_token");
    axios
      .post(
        "http://localhost:5000/pay/",
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
        navigate.push(paymentUrl);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {paymentUrl ? (
        <a href={paymentUrl} target="_blank" rel="noopener noreferrer">
          <button>Proceed to Payment</button>
        </a>
      ) : (
        <button onClick={handlePayment}>Initiate Payment</button>
      )}
    </div>
  );
};

export default PaymentButton;
