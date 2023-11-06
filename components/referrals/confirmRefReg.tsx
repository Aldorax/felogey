import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Code,
  Divider,
  Spinner,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { User } from "@/types/user";
import axios from "axios";

interface TableComponentProps {
  user: User;
}

export default function ConfirmRefReg({
  first_name,
  last_name,
}: {
  first_name: string;
  last_name: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Button onPress={onOpen}>Click to refer a user</Button>
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
            {loading ? (
              <Spinner label="Loading" color="warning" />
            ) : (
              <div>
                <div className="flex gap-2 items-center">
                  <Card className="w-[90vw] p-4">
                    <CardHeader className="flex gap-3">
                      <div className="flex flex-col">
                        <p className="text-md">Refferal data</p>
                        <p className="text-small text-default-500 font-semibold">
                          Who is referring you?
                        </p>
                      </div>
                    </CardHeader>
                    <Divider />
                    <CardFooter className="flex justify-between">
                      <div>You are about to register under</div>
                      <div>
                        {first_name} {last_name}
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              </div>
            )}
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose}>
              Yes
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
