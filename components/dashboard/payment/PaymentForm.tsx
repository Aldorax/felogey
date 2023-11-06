import {
  Button,
  Card,
  CardFooter,
  CardHeader,
  Divider,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectItem,
  Spinner,
  useDisclosure,
} from "@nextui-org/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";

interface Bank {
  id: number;
  bank_name: string;
  nip_bank_code: string;
}

export default function PaymentForm() {
  const { toast } = useToast();
  const [loadingBanks, setLoadingBanks] = useState(true); // Set initial value to true
  const [selectedBank, setSelectedBank] = useState<string>("");
  const [banks, setBanks] = useState<Bank[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [earnings, setEarnings] = useState<number | null>();
  const [isloading, setisLoading] = useState(false);
  const [isloading1, setisLoading1] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [accountName, setAccountName] = useState<string | null>(null);
  const [hasPaid, setHaspaid] = useState<string>("");
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null
  );
  const [accountNumber, setAccountNumber] = useState<string>("");
  const [bankData, setBankData] = useState({
    bank_code: "",
    account_number: "",
    amount: "",
    password: "",
  });
  const [description] = useState<string>("Mobilizer Earnings withdrawal");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBankData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (loadingBanks) {
      // Make a GET request to fetch banks
      axios
        .get("https://enetworks-tovimikailu.koyeb.app/get-banks")
        .then((response) => {
          const userData = response.data.banks;
          setBanks(userData);
          setLoadingBanks(false);
        })
        .catch((error) => {
          console.error("Error fetching banks data", error);
          setLoadingBanks(false);
        });
    }
  }, []); // No need for loadingBanks as a dependency

  useEffect(() => {
    // Fetch user's account details and earnings when the page loads
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      axios
        // .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
        .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setEarnings(response.data.earnings);
          setName(response.data.first_name);
          setHaspaid(response.data.has_paid);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const verifyAccount = () => {
    onOpen();

    console.log(bankData.account_number);
    console.log(selectedBank);

    setisLoading(true);
    setisLoading1(false);

    const formData = new FormData();
    formData.append("account_number", bankData.account_number);
    formData.append("bank_code", selectedBank);

    axios
      // .post(`https://enetworks-tovimikailu.koyeb.app/verify-account`, formData)
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

  const withdraw = () => {
    const accessToken = localStorage.getItem("access_token");

    console.log(bankData.amount);
    console.log(bankData.account_number);
    console.log(selectedBank);
    console.log(bankData.password);
    console.log(description);

    const formData = new FormData();
    formData.append("amount", bankData.amount);
    formData.append("account_number", bankData.account_number); // Update field names
    formData.append("bank_code", selectedBank); // Update field names
    formData.append("description", description);
    formData.append("password", bankData.password);

    if (accessToken) {
      axios
        .post(
          "https://enetworks-tovimikailu.koyeb.app/make-transfer",
          formData,
          {
            // .post(
            //   "https://enetworks-tovimikailu.koyeb.app/make-transfer",
            //   formData,
            //   {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        .then((response) => {
          if (response.data.message === "Transfer successful") {
            toast({
              title: "Withdrawal Successfull",
              description: response.data.message,
            });
            setisLoading(false);
            window.location.reload();
          } else {
            toast({
              title: "Withdrawal not successful",
              description: response.data.message,
            });
            console.log(response.data.message);
            setisLoading(false);
          }
        })
        .catch((error) => {
          toast({
            title: "Withdrawal not successful",
            description: error.response.data.message,
          });
          console.log(error.response.data.message);
          setisLoading(false);
        });
    }
  };

  return (
    <div className="max-w-xl">
      <form className="flex flex-col justify-center items-center">
        <Card className="w-full p-4">
          <CardHeader className="flex gap-3">
            <div className="flex w-full justify-between">
              <p className="text-small text-default-500 font-semibold">
                UserName
              </p>
              <p className="text-small text-default-500 font-semibold">
                {name}
              </p>
            </div>
          </CardHeader>
          <Divider />
          <CardFooter className="flex w-full justify-between">
            <p>Balance</p>
            <p>{earnings}</p>
          </CardFooter>
        </Card>
        <br />
        {loadingBanks ? (
          <div className="w-full flex justify-center items-center">
            <Spinner />
          </div>
        ) : (
          <select
            // variant="bordered"
            // label="Bank name"
            placeholder="Select your bank"
            className="w-full p-2 border border-dark"
            name="bank_code"
            // value={selectedBank}
            onChange={(e) => setSelectedBank(e.target.value)}
          >
            {banks.map((bank) => (
              <option key={bank.id} value={bank.nip_bank_code}>
                {bank.bank_name}
              </option>
            ))}
          </select>
        )}
        <br />
        <Input
          type="text"
          name="account_number"
          variant="underlined"
          label="Account"
          placeholder="Enter your account number"
          // value={accountNumber}
          onChange={handleInputChange}
        />
        <br />
        <Input
          type="text"
          variant="underlined"
          label="Amount"
          name="amount"
          placeholder="Enter the amount to withdraw"
          onChange={handleInputChange}
        />
        <br />
        <div>
          <Button onPress={verifyAccount}>Withdraw</Button>
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
                Confirm Withdrawal
              </ModalHeader>
              <ModalBody>
                {accountName ? (
                  <div>
                    <p className="mb-2">
                      This action cannot be undone. Once you make a withdrawal,
                      we assume that you have giving your consent and no refund
                      will be made for this transaction.
                    </p>
                    <Divider />
                    <div className="flex flex-col justify-between items-center mt-2">
                      <h1 className="underlined font-bold mb-2">
                        Account Name
                      </h1>
                      <p>{accountName}</p>
                    </div>
                    <Divider />
                    <div className="flex flex-col justify-between items-center mt-2">
                      <h1 className="underlined font-bold mb-2">Amount</h1>
                      <p>{bankData.amount}</p>
                    </div>
                    <Divider />
                    <p className="my-2 font-bold">
                      Confirm password below to withdraw
                    </p>
                    <Divider />
                    <Input
                      type="password"
                      name="password"
                      variant="underlined"
                      label="Enter Password"
                      placeholder="Enter your password"
                      className="my-2"
                      onChange={handleInputChange}
                    />
                  </div>
                ) : (
                  <Spinner label="Grabbing bank details" color="warning" />
                )}
              </ModalBody>
              <ModalFooter className="flex items-center gap-2">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" variant="light" onPress={withdraw}>
                  Withdraw
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </form>
    </div>
  );
}
