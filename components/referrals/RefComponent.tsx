"use client";
import {
  Button,
  Divider,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

interface ReferralName {
  first_name: string;
  last_name: string;
}

export default function RefComponent() {
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const url = pathname.split("/")[2];
  const [mobilizerName, setMobilizerName] = useState<ReferralName | null>(null);
  const [isValidReferralCode, setIsValidReferralCode] = useState(true); // For an invalid referral code
  const [isLoadingUser, setIsLoadingUser] = useState(true);

  useEffect(() => {
    if (!isLoadingUser) return; // Avoid additional fetches if data is already loaded or an error has occurred

    axios
      .get(`https://enetworks-tovimikailu.koyeb.app/get-mobilizer/${url}`)
      .then((response) => {
        if (
          response.data &&
          response.data.first_name &&
          response.data.last_name
        ) {
          setMobilizerName({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
          });
          setIsLoadingUser(false);
          setIsValidReferralCode(true);
        } else {
          setIsValidReferralCode(false);
          setIsLoadingUser(false);
        }
      })
      .catch((error) => {
        setIsValidReferralCode(false);
        setIsLoadingUser(false);
        console.error("Error fetching data:", error);
      });
  }, [isLoadingUser]);

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",
    state: "",
    address: "",
    local_goverment_area: "",
    account: null,
    enaira_id: "",
    bankName: null,
    password: "",
  });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [registrationStatus, setRegistrationStatus] = useState<"" | null>(null);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(""); // New state for user type selection
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 5) {
      setStep(step + 1);
    }
  };

  const handlePrev = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleRegister = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const formDataToSubmit = new FormData();

      formDataToSubmit.append("email", formData.email);
      formDataToSubmit.append("password", formData.password);
      formDataToSubmit.append("first_name", formData.first_name);
      formDataToSubmit.append("last_name", formData.last_name);
      formDataToSubmit.append("phone_number", formData.phone_number);
      formDataToSubmit.append("state", formData.state);
      formDataToSubmit.append("enaira_Id", formData.enaira_id);
      formDataToSubmit.append("address", formData.address);
      formDataToSubmit.append(
        "local_government_area",
        formData.local_goverment_area
      );

      if (selectedImage) {
        formDataToSubmit.append("profile_image", selectedImage);
      }

      const registerEndpoint = userType === "agent" ? "referral1" : "referral";

      const response = await fetch(
        `https://enetworks-tovimikailu.koyeb.app/${registerEndpoint}/${url}`,
        // `https://enetworks-tovimikailu.koyeb.app/${registerEndpoint}`,
        {
          method: "POST",
          body: formDataToSubmit,
        }
      );

      if (response.status === 200) {
        toast({
          title: "Successful Registration",
          description:
            "You have created your account successfully. Redirecting....",
        });
        setIsLoading(false);
        console.log("Registered");
        window.location.href = "/dashboard";
      } else {
        setIsLoading(false);
        const data = await response.json();
        toast({
          title: "Error",
          description: data.message,
        });
        setRegistrationStatus(data.error || "Registration failed");
      }
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message,
      });
      console.error("Registration error:", error);
      setRegistrationStatus("");
    }
  };

  const MAX_IMAGE_SIZE_MB = 3;

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;

    if (file) {
      const fileSizeInMB = file.size / (1024 * 1024); // Convert to MB
      if (fileSizeInMB > MAX_IMAGE_SIZE_MB) {
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }

    setSelectedImage(file);
  };

  const availableStates = [
    "Abia",
    "Adamawa",
    "Akwa Ibom",
    "Anambra",
    "Bauchi",
    "Bayelsa",
    "Benue",
    "Borno",
    "Cross River",
    "Delta",
    "Ebonyi",
    "Edo",
    "Ekiti",
    "Enugu",
    "FCT",
    "Gombe",
    "Imo",
    "Jigawa",
    "Kaduna",
    "Kano",
    "Katsina",
    "Kebbi",
    "Kogi",
    "Kwara",
    "Lagos",
    "Nasarawa",
    "Niger",
    "Ogun",
    "Ondo",
    "Osun",
    "Oyo",
    "Plateau",
    "Rivers",
    "Sokoto",
    "Taraba",
    "Yobe",
    "Zamfara",
  ];

  const availableCountry = [
    "Nigeria",
    "India",
    "United States of America",
    // Add more states to the list
  ];

  const areRequiredFieldsFilled = () => {
    return formData && selectedImage;
  };

  const handleUserTypeSelection = (selectedType: string) => {
    setUserType(selectedType);
    setStep(2); // Move to the next step after choosing user type
  };

  return (
    <div className="px-6">
      {isLoadingUser ? ( // If loading, display a spinner or loading message
        <div className="max-w-screen min-h-[60vh] max-h-screen flex items-center justify-center">
          <Spinner label="Grabbing refferal data" color="warning" />
        </div>
      ) : !isValidReferralCode ? ( // If the referral code is not valid, display an error message
        <div className="max-w-screen min-h-[60vh] max-h-screen flex flex-col items-center justify-center">
          <div>No data from the dashboard or an error occurred.</div>
          <Button color="secondary" onClick={() => window.location.reload()}>
            Refresh
          </Button>
        </div>
      ) : (
        <div>
          <div>
            {/* <ModalContent> */}
            {/* {(onClose) => ( */}
            <form onSubmit={handleFormSubmit}>
              <div>
                {step === 1 && (
                  <div className="flex flex-col gap-2">
                    <Card className="border border-transparent">
                      <CardHeader>
                        <CardTitle>Registeration Type</CardTitle>
                        <CardDescription>
                          Choose what to register for
                        </CardDescription>
                      </CardHeader>

                      <CardContent className="grid gap-4">
                        <div
                          className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer"
                          onClick={() => handleUserTypeSelection("agent")}
                        >
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Agent
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Click to register as an Agent.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                      <CardContent className="grid gap-4 cursor-pointer">
                        <div
                          className=" flex items-center space-x-4 rounded-md border p-4 cursor-pointer"
                          onClick={() => handleUserTypeSelection("intern")}
                        >
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">
                              Intern
                            </p>
                            <p className="text-sm text-muted-foreground">
                              Click to register as an intern.
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                )}
                {step === 2 && (
                  <>
                    <div className="flex flex-wrap mx-auto mb-4 text-center">
                      {!imagePreview ? (
                        <div className="flex flex-wrap mx-auto mb-4 text-center">
                          <label
                            htmlFor="profileImage"
                            className=" text-white p-3 rounded-xl bg-green-600 hover:bg-green-700 w-full"
                          >
                            Upload Passport Photograph
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="profileImage"
                            title="profileImage"
                            className="hidden p-5"
                          />
                        </div>
                      ) : (
                        <div className="flex flex-col items-center gap-2 flex-wrap mx-auto mb-4 text-center">
                          {imagePreview && (
                            <div className="mt-4">
                              <Image
                                isBlurred
                                width={240}
                                src={imagePreview}
                                alt="Register Pfp"
                                className="max-h-40 max-w-40 mx-auto"
                              />
                            </div>
                          )}
                          <label
                            htmlFor="profileImage"
                            className=" text-white p-3 rounded-xl bg-green-600 hover:bg-green-700 w-full"
                          >
                            Update Passport Photograph
                          </label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageChange}
                            id="profileImage"
                            title="profileImage"
                            className="hidden p-5"
                          />
                        </div>
                      )}
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="first_name"
                        >
                          First Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="first_name"
                          type="text"
                          className="w-full"
                          placeholder="Enter your First Name"
                          required
                          name="first_name"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="last_name"
                        >
                          Last Name <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="last_name"
                          type="text"
                          className="w-full"
                          placeholder="Enter your Last Name"
                          required
                          name="last_name"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    {/* Other inputs for step 1 */}
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="email"
                        >
                          Email Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          className="w-full"
                          placeholder="Enter your Email Address"
                          required
                          name="email"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </>
                )}
                {step === 3 && (
                  <>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="phoneNumber"
                        >
                          Phone Number <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="phone_number"
                          type="text"
                          className="w-full"
                          placeholder="Enter your Phone Number"
                          required
                          name="phone_number"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="state"
                        >
                          State of Origin{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <select
                          id="state"
                          className="form-select w-full text-default-800"
                          required
                          name="state"
                          onChange={handleInputChange}
                        >
                          <option value="">Select your state</option>
                          {availableStates.map((state) => (
                            <option key={state} value={state}>
                              {state}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="address"
                        >
                          Address <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="address"
                          type="text"
                          className="w-full"
                          placeholder="Enter your Address"
                          required
                          name="address"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </>
                )}
                {step === 4 && (
                  <>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="phoneNumber"
                        >
                          Local Goverment Area{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="local_goverment_area"
                          type="text"
                          className="w-full"
                          placeholder="Enter your L.G.A"
                          required
                          name="local_goverment_area"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="phoneNumber"
                        >
                          Enaira ID <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="enaira_id"
                          type="text"
                          className="w-full"
                          placeholder="Enter your Enaira ID"
                          required
                          name="enaira_id"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </>
                )}
                {step === 5 && (
                  <>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="password"
                        >
                          Password <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="password"
                          type="password"
                          className="w-full"
                          placeholder="Enter your Password"
                          required
                          name="password"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap -mx-3 mb-4 border border-dark rounded-xl p-3">
                      <div className="w-full px-3">
                        <label
                          className="block text-default-800 text-sm font-medium mb-1"
                          htmlFor="cPassword"
                        >
                          Confirm Password{" "}
                          <span className="text-red-600">*</span>
                        </label>
                        <input
                          id="cPassword"
                          type="password"
                          className="w-full"
                          placeholder="Confirm your password"
                          required
                          name="password"
                          onChange={handleInputChange}
                        />
                      </div>
                    </div>
                  </>
                )}
                {step === 2 && (
                  <div className="flex flex-col gap-2">
                    <button
                      className=" text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                      onClick={handlePrev}
                    >
                      Previous
                    </button>
                    <button
                      className=" text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                      onClick={handleFormSubmit}
                    >
                      Next
                    </button>
                  </div>
                )}
                {step === 3 && (
                  <div className="flex flex-col gap-2">
                    <button
                      className=" text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                      onClick={handlePrev}
                    >
                      Previous
                    </button>
                    <button
                      className=" text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                      onClick={handleFormSubmit}
                    >
                      Next
                    </button>
                  </div>
                )}
                {step === 4 && (
                  <div className="flex flex-col gap-2">
                    <button
                      className=" text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                      onClick={handlePrev}
                    >
                      Previous
                    </button>
                    <button
                      className=" text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                      onClick={handleFormSubmit}
                    >
                      Next
                    </button>
                  </div>
                )}
                {step === 5 && (
                  <div className="flex flex-col gap-2">
                    <button
                      className=" text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                      onClick={handlePrev}
                    >
                      Previous
                    </button>
                  </div>
                )}
              </div>
              {step === 5 && (
                <div className="mt-4">
                  {/* <Button
                    type="submit"
                    color="success"
                    className="text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                    onClick={handleRegister}
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
                    {isLoading ? "Loading" : "Register"}
                  </Button> */}
                  <Button
                    className="text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl text-medium"
                    onPress={onOpen}
                  >
                    Register
                  </Button>
                  <Modal
                    backdrop="opaque"
                    isOpen={isOpen}
                    onClose={onClose}
                    classNames={{
                      backdrop:
                        "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
                    }}
                  >
                    <ModalContent>
                      <ModalHeader className="flex flex-col gap-1">
                        Referral Data
                      </ModalHeader>
                      <ModalBody>
                        <div>
                          <div className="flex gap-2 items-center">
                            <Card className="w-[90vw] p-4">
                              <CardHeader className="flex gap-3">
                                <div className="flex flex-col">
                                  <p className="text-md">Confirmation</p>
                                  <p className="text-small text-default-500 font-semibold">
                                    Who is referring you?
                                  </p>
                                </div>
                              </CardHeader>
                              <Divider />
                              <CardFooter className="flex justify-between items-center text-sm mt-3 font-bold">
                                <div>Full Name</div>
                                <div className="flex items-center gap-2">
                                  {mobilizerName?.first_name}{" "}
                                  {mobilizerName?.last_name}
                                </div>
                              </CardFooter>
                            </Card>
                          </div>
                        </div>
                      </ModalBody>
                      <ModalFooter className="flex justify-between items-center">
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          No
                        </Button>
                        <Button
                          type="submit"
                          color="success"
                          className="text-white bg-green-600 hover:bg-green-700 w-full p-2 rounded-xl"
                          onClick={handleRegister}
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
                          {isLoading ? "Loading" : "Register"}
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
