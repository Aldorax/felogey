"use client";
import { useEffect, useState } from "react";
import { Spinner, Button } from "@nextui-org/react";
import axios from "axios";
import { User } from "@/types/user";
import MobilizerComponent from "./mobilizer/MobilizerComponent";
import InternComponent from "./intern/InternComponent";
import LogInTabForm from "../forms/LogInTabForm";

export default function DashboardCompnent() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    // Check if the access token is available
    if (accessToken) {
      // Make a GET request to the dashboard endpoint with the Authorization header
      axios
        .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
          // .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
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

          if (!userData.has_paid) {
            console.log("User has not paid. Redirecting..."); // Log the redirection
            window.location.href = "/pay-for-card";
          }
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
          <Spinner label="Loading dashboard" color="warning" />
        </div>
      ) : user ? (
        <div>
          {user.has_paid ? (
            // Display the dashboard content for users who have paid
            <>
              {user.role === "Intern" ? (
                <InternComponent user={user} />
              ) : user.role === "Agent" ? (
                <MobilizerComponent user={user} />
              ) : user.role === "Mobilizer" ? (
                <MobilizerComponent user={user} />
              ) : (
                <div>Unknown Role</div>
              )}
            </>
          ) : (
            <div className="max-w-screen min-h-[60vh] max-h-screen flex items-center justify-center">
              <Spinner
                label="Redirecting to make payment for card"
                color="danger"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="max-w-screen min-h-[60vh] max-h-screen flex flex-col items-center justify-center">
          <div>No data from the dashboard or an error occurred.</div>
          <Button color="secondary" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      )}
    </section>
  );
}
