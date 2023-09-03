import React, { useState, useEffect } from "react";
import axios from "axios";
import "@/app/globals.css";
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface Bank {
  id: number;
  bank_name: string;
  nip_bank_code: string;
}

const Withdraw = () => {
  const navigate = useRouter();
  const [banks, setBanks] = useState<Bank[]>([]);
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [loadingBanks, setLoadingBanks] = useState(false);
  const [isloading, setisLoading] = useState(false);
  const [accountName, setAccountName] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const [showPassword, setShowPassword] = useState(false);
  const [earnings, setEarnings] = useState<number | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [withdrawAmount, setWithdrawAmount] = useState<string>("");
  const [password, setPassword] = useState<string>(""); // Add password state
  const [description] = useState<string>("Mobilizer Earnings withdrawal");
  const [showWithdrawConfirm, setShowWithdrawConfirm] = useState(false);

  useEffect(() => {
    // Fetch user's account details and earnings when the page loads
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axios
        .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setEarnings(response.data.earnings);
          // Also get the first and last name of the user and then add it to the name state
          setName(response.data.first_name);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  useEffect(() => {
    setLoadingBanks(true);
    axios
      .get("https://enetworks-tovimikailu.koyeb.app/get-banks")
      .then((response) => {
        setBanks(response.data.banks);
        setLoadingBanks(false);
      })
      .catch((error) => {
        console.log(error);
        setLoadingBanks(false);
      });
  }, []);

  const handleBankSelection = (bankCode: string) => {
    console.log(selectedBank);
    setSelectedBank(bankCode);
  };

  const verifyAccount = () => {
    setisLoading(true);

    if (selectedBank === "") {
      setisLoading(false);
      setValidationMessage("You need to select a bank");
      return;
    }

    if (accountNumber === "") {
      setisLoading(false);
      setValidationMessage("Account number is required");
      return;
    }

    const formData = new FormData();
    formData.append("account_number", accountNumber);
    formData.append("bank_code", selectedBank);

    axios
      .post(`https://enetworks-tovimikailu.koyeb.app/verify-account`, formData)
      .then((response) => {
        setAccountName(response.data.account_name);
        setValidationMessage(null);
        setisLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setValidationMessage(error.response.data.message);
        setisLoading(false);
      });
  };

  const handleWithdrawConfirm = () => {
    if (selectedBank === "") {
      setisLoading(false);
      setValidationMessage("You need to select a bank");
      return;
    }

    if (accountNumber === "") {
      setisLoading(false);
      setValidationMessage("Account number is required");
      return;
    }

    if (accountName === null) {
      setisLoading(false);
      setValidationMessage("A valid account is needed");
      return;
    }

    if (withdrawAmount === "") {
      setisLoading(false);
      setValidationMessage("A valid account is needed");
      return;
    }
    // Prompt user for password
    setShowWithdrawConfirm(true);
  };

  const handleConfirmWithdraw = () => {
    const accessToken = localStorage.getItem("access_token");

    // Get the users earnings amount and then compare with the withdrawal amount and exit the popup for confirming withdrawal
    if (earnings === null) {
      setValidationMessage("You need to have earnings to withdraw");

      return;
    }

    if (Number(withdrawAmount) > earnings) {
      setValidationMessage("You cannot withdraw more than your earnings");
      setShowWithdrawConfirm(false);
      return;
    }

    // Perform the withdrawal logic here
    const formData = new FormData();
    formData.append("account_number", accountNumber);
    formData.append("bank_code", selectedBank);
    formData.append("amount", withdrawAmount);
    formData.append("description", description);
    formData.append("password", password); // Add password to the request

    if (accessToken) {
      axios
        .post(
          "https://enetworks-tovimikailu.koyeb.app/make-transfer",
          formData,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message === "Transfer successful") {
            setValidationMessage(response.data.message);
            setisLoading(false);
            setShowWithdrawConfirm(false); // Close the confirmation popup
            navigate.push("/mobilizer/dashboard");
          } else {
            setValidationMessage(response.data.message);
            console.log(response.data.message);
            setisLoading(false);
          }
        })
        .catch((error) => {
          setValidationMessage(error.response.data.message);
          console.log(error.response.data.message);
          setisLoading(false);
          setShowWithdrawConfirm(false); // Close the confirmation popup
        });
    }
  };

  return (
    <div className="flex flex-col">
      <div className="bg-blue-500 border-black text-white font-bold p-6">
        <h1>Withdraw your Earnings</h1>
      </div>

      <div className="flex flex-col md:min-w-[80vw] md:max-w-[80vw] md:self-center md:justify-center">
        <select
          value={selectedBank}
          onChange={(e) => {
            setSelectedBank(e.target.value);
            handleBankSelection(e.target.value);
          }}
          className="border md:border-2 border-black p-4 md:p-8 m-3 mb-7"
        >
          <option value="">Select a bank</option>
          {banks.map((bank) => (
            <option key={bank.id} value={bank.nip_bank_code}>
              {bank.bank_name}
            </option>
          ))}
        </select>
        <div className="flex flex-col">
          <div className="flex flex-col border md:border-2 border-black rounded-lg bg-blue-500 m-3 text-white">
            {name !== null && (
              <p className="text-sm font-bold m-3 py-1">Good day, {name}</p>
            )}
            {earnings !== null && (
              <p className="text-sm font-bold m-3 py-1">
                Account Balance (Earnings): {earnings} NGN
              </p>
            )}
          </div>
          {/* ... your existing code ... */}
          <input
            type="number"
            placeholder="Enter account number"
            value={accountNumber}
            onChange={(e) => setAccountNumber(e.target.value)}
            className="border md:border-2 border-black p-4 md:p-8 m-3 mb-7"
          />
          <button
            className="p-4 md:p-8 m-3 border rounded-lg flex justify-center items-center bg-blue-500 text-white md:text-lg font-bold"
            onClick={verifyAccount}
          >
            {isloading ? <div className="spinner"></div> : "Verify Account"}
          </button>
          {accountName && (
            <div className="flex flex-col border md:border-2 border-black rounded-lg text-white bg-green-500 m-3">
              <p className="text-sm font-bold m-3 py-4">
                Account Name: {accountName}
              </p>
            </div>
          )}
          {validationMessage && (
            <div className="flex flex-col border md:border-2 border-black rounded-lg text-white bg-red-500 m-3">
              <p className="py-4 text-sm font-semibold m-3">
                Status: {validationMessage}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <input
            type="number"
            placeholder="Enter withdrawal amount"
            value={withdrawAmount}
            onChange={(e) => setWithdrawAmount(e.target.value)}
            className="border md:border-2 border-black p-4 md:p-8 m-3 mb-7"
          />

          <button
            className="p-4 md:p-8 m-3 border md:border-2 border-black rounded-lg flex justify-center items-center"
            onClick={handleWithdrawConfirm}
          >
            Withdraw
          </button>
          <div
            className={`${
              showWithdrawConfirm ? "block" : "hidden"
            } fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center w-full`}
          >
            <div className="bg-white p-7 rounded-lg relative">
              <p>Confirm withdrawal by entering your password</p>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border md:border-2 border-black p-3 md:p-3 m-3 mb-7 w-full mx-auto"
                id="password"
                title="password"
                autoComplete="true"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute md:top-20 top-20 right-12 cursor-pointer"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
              <div className="flex justify-center mt-4">
                <button
                  className="py-2 px-4 bg-green-500 text-white rounded"
                  onClick={handleConfirmWithdraw}
                >
                  Confirm
                </button>
                <button
                  className="py-2 px-4 bg-red-500 text-white rounded ml-2"
                  onClick={() => setShowWithdrawConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
