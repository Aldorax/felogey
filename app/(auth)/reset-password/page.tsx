"use client";
import { useState } from "react";
import { Input, Button } from "@nextui-org/react";

export default function ResetPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleSendOTP = async () => {
    try {
      const response = await fetch(
        "https://enetworks-tovimikailu.koyeb.app/forgot-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email }),
        }
      );

      if (response.status === 200) {
        setStep(2);
      } else {
        alert("Error sending OTP.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleVerifyOTP = async () => {
    try {
      const response = await fetch(
        "https://enetworks-tovimikailu.koyeb.app/reset-password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ otp, new_password: newPassword }),
        }
      );

      if (response.status === 200) {
        alert("Password updated successfully!");
      } else {
        alert("Error verifying OTP or updating password.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      {step === 1 && (
        <div>
          <Input
            type="email"
            variant="underlined"
            label="Reset"
            placeholder="Enter the email address to reset password for"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <Button onClick={handleSendOTP}>Send OTP</Button>
        </div>
      )}
      {step === 2 && (
        <div>
          <Input
            type="text"
            variant="underlined"
            label="Enter OTP"
            placeholder="Enter the OTP sent to your email"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <br />
          <Button onClick={() => setStep(3)}>Verify OTP</Button>
        </div>
      )}
      {step === 3 && (
        <div>
          <Input
            type="password"
            variant="underlined"
            label="New Password"
            placeholder="Enter your new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <br />
          <Button onClick={handleVerifyOTP}>Update Password</Button>
        </div>
      )}
    </div>
  );
}
