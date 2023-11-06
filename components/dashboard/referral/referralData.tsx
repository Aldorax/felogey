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
} from "@nextui-org/react";
import { User } from "@/types/user";
import axios from "axios";

interface TableComponentProps {
  user: User;
}

export default function ReferralTable({
  code,
  link,
}: {
  code: string;
  link: string;
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
              <p>Loading...</p>
            ) : (
              <div>
                <div className="flex gap-2 items-center">
                  <Code
                    className="mt-2 mb-2 text-black font-semibold"
                    color="secondary"
                    radius="none"
                    size="sm"
                  >
                    Referral code:
                  </Code>
                  <p className="mt-2 mb-2">{code}</p>
                </div>
                <Divider />
                <div className="flex gap-2 items-center">
                  <Code
                    className="mt-2 mb-2 text-black font-semibold"
                    color="secondary"
                    radius="none"
                    size="sm"
                  >
                    Referral link:
                  </Code>
                  <p className="mt-2 mb-2">{link}</p>
                </div>
              </div>
            )}
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
