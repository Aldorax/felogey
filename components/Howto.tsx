import React from "react";
import "@/app/globals.css";

const Howto = () => {
  return (
    <div className="text-black p-2 bg-white">
      <h1 className="text-lg font-semibold">How to register</h1>
      <div className="p-3 text-sm">
        <div>
          <h1 className="bg-orange-700 p-2">For Interns</h1>
        </div>
        <ol className="p-2 gap-1 flex flex-col">
          <li>
            Click the{" "}
            <i>
              <span className="font-semibold bg-orange-600 p-1">Menu</span>
            </i>{" "}
            on the top corner of the screen.
          </li>
          <li>A list of options will be displayed.</li>
          <li>
            Click on register as{" "}
            <i>
              <span className="font-semibold bg-orange-600 p-1">an Intern</span>
            </i>
          </li>
          <li>You will be redirected to a the Intern Registration page.</li>
          <li>
            Fill the details in and upload your profile image. (
            <span className="font-semibold">
              NOTE: Profile Image should be an image of yourself only! Any other
              image can cause your acccount to be flagged or permanently removed
            </span>
            ).
          </li>
          <li>
            Your account will be created and you will be redirected to the{" "}
            <i className="font-semibold bg-orange-600 p-1">Login </i>
            page.
          </li>
          <li>Input the details used during registration and log in.</li>
          <li>
            You will be redirected to verify your account, check your email for
            your Otp.{" "}
            <span className="font-semibold">
              (If you do not see the email, check your spam for the email. It
              could be there.).
            </span>
          </li>
          <li>Copy the OTP code and verify your account.</li>
          <li>
            You will be taken to a checkout page to pay for your{" "}
            <span className="font-bold bg-orange-600 p-1">
              E-Networks Digital cash card.
            </span>
          </li>
          <li>
            Upon succesful payment, you will be redirected to your activated
            account dashboard.
          </li>
        </ol>
      </div>
    </div>
  );
};

export default Howto;
