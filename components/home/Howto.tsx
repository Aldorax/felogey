"use client";
import { Accordion, AccordionItem } from "@nextui-org/react";
import React from "react";

const Howto = () => {
  return (
    <div className="text-dark p-2 md:p-16 bg-light pt-4 overflow-x-hidden">
      <h1 className="text-lg font-semibold">How to register</h1>
      <Accordion variant="bordered" isCompact className="mt-2 mb-2">
        <AccordionItem key="1" aria-label="Intern" title="As an Intern">
          <div className="p-3 text-sm md:text-lg">
            <div>
              <h1 className="bg-orange-700 p-2 text-white">For Interns</h1>
            </div>
            <ol className="p-2 gap-1 flex flex-col text-foreground">
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
                  <span className="font-semibold bg-orange-600 p-1">
                    an Intern
                  </span>
                </i>
              </li>
              <li>You will be redirected to the Intern Registration page.</li>
              <li>
                Fill in the details and upload your profile image. (
                <span className="font-semibold">
                  NOTE: Profile Image should be an image of yourself only! Any
                  other image can cause your acccount to be flagged or
                  permanently removed
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
                You will be redirected to verify your account, check your email
                for your Otp.{" "}
                <span className="font-semibold">
                  (If you do not see the email, check your spam for the email.
                  It could be there.).
                </span>
              </li>
              <li>Copy the OTP code and verify your account.</li>
              <li>
                You will be taken to the checkout page to pay for your{" "}
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
        </AccordionItem>
        <AccordionItem key="2" aria-label="Mobilizer" title="As a Mobilizer">
          <div className="p-3 text-sm md:text-lg">
            <div>
              <h1 className="bg-orange-700 p-2 text-white">For Interns</h1>
            </div>
            <ol className="p-2 gap-1 flex flex-col text-foreground">
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
                  <span className="font-semibold bg-orange-600 p-1">
                    an Intern
                  </span>
                </i>
              </li>
              <li>You will be redirected to the Intern Registration page.</li>
              <li>
                Fill in the details and upload your profile image. (
                <span className="font-semibold">
                  NOTE: Profile Image should be an image of yourself only! Any
                  other image can cause your acccount to be flagged or
                  permanently removed
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
                You will be redirected to verify your account, check your email
                for your Otp.{" "}
                <span className="font-semibold">
                  (If you do not see the email, check your spam for the email.
                  It could be there.).
                </span>
              </li>
              <li>Copy the OTP code and verify your account.</li>
              <li>
                You will be taken to the checkout page to pay for your{" "}
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
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default Howto;
