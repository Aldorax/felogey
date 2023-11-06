import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import TransactionsTable, { UserData } from "./Transactions";
import { User } from "@/types/user";
import axios from "axios";

interface TableComponentProps {
  user: User;
}

export default function TableButton() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<UserData[]>([]);

  useEffect(() => {
    const accessToken = localStorage.getItem("access_token");

    if (accessToken) {
      // Using axios to fetch data
      axios
        .get("https://enetworks-tovimikailu.koyeb.app/dashboard", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          // Transform received data to match the UserData type structure
          const transformedData: UserData[] = response.data.referral_list.map(
            (item: any) => ({
              name: `${item.first_name} ${item.last_name}`,
              hasPaid: item.has_paid === "True", // Convert string to boolean
            })
          );
          setData(transformedData); // Setting the transformed data
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
          setLoading(false);
        });
    } else {
      // No access token found in local storage
      setLoading(false);
    }
  }, []);

  return (
    <>
      <Button onPress={onOpen}>View Referrals</Button>
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
            View Referrals
          </ModalHeader>
          <ModalBody>
            {loading ? <p>Loading...</p> : <TransactionsTable data={data} />}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
