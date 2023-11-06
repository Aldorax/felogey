import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Checkbox,
  Input,
  Link,
} from "@nextui-org/react";
import { MailIcon } from "./MailIcon.jsx";
import { LockIcon } from "./LockIcon.jsx";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

export default function LogInTabForm() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log(formData);

    try {
      const response = await axios.post(
        "https://enetworks-tovimikailu.koyeb.app/login",
        // "https://enetworks-tovimikailu.koyeb.app/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { access_token } = response.data;
      console.log(access_token);

      // Save the access_token and otp to the local storage
      localStorage.setItem("access_token", access_token);

      if (response.status === 200) {
        setIsLoading(false);
        toast({
          title: "Successful logged in",
          description: "You have logged in successfully. Redirecting....",
        });
        window.location.href = "/dashboard";
      } else {
        toast({
          title: "Error Loggin In",
          description: response.data.messagee,
        });
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Login error:", error);
    }
  };

  return (
    <>
      <Button onPress={onOpen} color="primary">
        Log In
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="top-center">
        <ModalContent>
          {(onClose) => (
            <form onSubmit={handleFormSubmit}>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  autoFocus
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  endContent={
                    <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  endContent={
                    <LockIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                  }
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="/reset-password" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                {/* <Button type="submit" color="primary">
                  Sign in
                </Button> */}
                <Button
                  type="submit"
                  color="primary"
                  // className="text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                  isLoading={isLoading}
                  spinner={
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      />
                      <path
                        className="opacity-75"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        fill="currentColor"
                      />
                    </svg>
                  }
                >
                  {isLoading ? "Loading" : "Log In"}
                </Button>
              </ModalFooter>
            </form>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
