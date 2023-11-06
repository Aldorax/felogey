"use client";
import { useEffect, useState } from "react";
import { Spinner, Button, Input } from "@nextui-org/react";
import axios from "axios";
import { User } from "@/types/user";
import MobilizerComponent from "./mobilizer/MobilizerComponent";
import InternComponent from "./intern/InternComponent";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Divider,
  Link,
  Image,
} from "@nextui-org/react";

export default function ProfileCompnent() {
  const [loading, setLoading] = useState(true);
  const [loading1, setLoading1] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [userData, setUserData] = useState({
    password: "",
    address: "",
    phoneNumber: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setLoading1(true);
    const accessToken = localStorage.getItem("access_token");

    const formData = new FormData();
    if (password) formData.append("password", password);
    if (address) formData.append("address", address);
    if (phoneNumber) formData.append("phoneNumber", phoneNumber);
    if (email) formData.append("email", email);

    if (password) console.log(password);
    if (address) console.log(address);
    if (phoneNumber) console.log(phoneNumber);
    if (email) console.log(email);

    if (accessToken) {
      axios
        // .patch("https://enetworks-tovimikailu.koyeb.app/edit-user", formData, {
        .patch("https://enetworks-tovimikailu.koyeb.app/edit-user", formData, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data", // Add the Content-Type header
          },
        })
        .then((response) => {
          setLoading1(false);
          console.log("Changes saved:", response.data.message);
          window.location.reload();
        })
        .catch((error) => {
          setLoading1(false);
          console.error("Error saving changes:", error.response.data.message);
        });
    }
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    // Check if the access token is available
    if (accessToken) {
      // Make a GET request to the dashboard endpoint with the Authorization header
      axios
        // .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
        .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // Replace the following line with code to handle the response data
          const userData = response.data;
          console.log(response.data);
          setUser(userData);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching dashboard data", error);
          setLoading(false);
        });
    } else {
      // No access token found in local storage
      setLoading(false);
    }
  }, []);

  return (
    <section className="flex flex-col items-center justify-center gap-4 md:py-10">
      {loading ? (
        <div className="max-w-screen min-h-[60vh] max-h-screen flex items-center justify-center">
          <Spinner label="Loading profile" color="warning" />
        </div>
      ) : user ? (
        <>
          <div>
            <Card className="w-[90vw] p-4">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Profile Details</p>
                  <p className="text-small text-default-500 font-semibold">
                    Enetworksagencybanking.com.ng
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardFooter className="flex justify-between">
                <div>Balance</div>
                <div>&#x20A6;{user?.earnings}</div>
              </CardFooter>
            </Card>
            <br />
            <Card className="w-[90vw] p-4">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Profile data</p>
                  <p className="text-small text-default-500 font-semibold">
                    Your profile data
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardFooter className="flex flex-col">
                <div className="flex justify-between w-full mt-2 mb-2">
                  <div>Email Address</div>
                  <div>{user?.email}</div>
                </div>
                <Divider />
                <div className="flex justify-between w-full mt-2 mb-2">
                  <div>Phone Number</div>
                  <div>{user?.phone_number}</div>
                </div>
                <Divider />
                <div className="flex justify-between w-full mt-2 mb-2">
                  <div>First Name</div>
                  <div>{user?.first_name}</div>
                </div>
                <Divider />
                <div className="flex justify-between w-full mt-2 mb-2">
                  <div>Last Name</div>
                  <div>{user?.last_name}</div>
                </div>
                <Divider />
                <div className="flex justify-between w-full mt-2 mb-2">
                  <div>Paid for cash Card</div>
                  <div>{user?.has_paid == true ? "Yes" : "No"}</div>
                </div>
                <Divider />
                <div className="flex justify-between w-full mt-2 mb-2">
                  <div>Account Type</div>
                  <div>{user?.role}</div>
                </div>
                <Divider />
                {user?.reserved_earnings > 0 ? (
                  <div className="flex justify-between w-full mt-2 mb-2">
                    <div>Reserved Earnings</div>
                    <div>{user?.earnings}</div>
                  </div>
                ) : (
                  ""
                )}
              </CardFooter>
            </Card>
            <br />
            <Card className="w-[90vw] p-4">
              <CardHeader className="flex gap-3">
                <div className="flex flex-col">
                  <p className="text-md">Edit profile data</p>
                  <p className="text-small text-default-500 font-semibold">
                    Your profile data
                  </p>
                </div>
              </CardHeader>
              <Divider />
              <CardFooter className="flex flex-col md:flex-row">
                <p className="font-semi-bold mb-2">
                  You do not need to fill all the data below to make a change
                  for one thing. If all you want to change is for example your
                  password, then fill just the password field and click save
                  changes and it will go through
                </p>
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-2 w-full"
                >
                  <Input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                    placeholder="Enter your password"
                    type="password"
                    variant="bordered"
                  />
                  <Input
                    name="address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    label="Address"
                    placeholder="Edit your Address"
                    type="text"
                    variant="bordered"
                  />
                  <Input
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    label="Phone Number"
                    placeholder="Edit your Phone Number"
                    type="text"
                    variant="bordered"
                  />
                  <Input
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    label="Email"
                    placeholder="Edit your Email"
                    type="text"
                    variant="bordered"
                  />
                  {loading1 ? (
                    <Spinner label="Saving Changes" color="warning" />
                  ) : (
                    <Button type="submit">Save Changes</Button>
                  )}
                </form>
              </CardFooter>
            </Card>
          </div>
        </>
      ) : (
        <div className="max-w-screen min-h-[60vh] max-h-screen flex flex-col items-center justify-center">
          <div>No data from the dashboard or an error occurred.</div>
          <Button color="primary" onClick={() => alert("Log in")}>
            Log In
          </Button>
        </div>
      )}
    </section>
  );
}
