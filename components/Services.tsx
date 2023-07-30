import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import Logo from "@/public/images/home.jpg";
import Image from "next/image";

const Services = () => {
  return (
    <main className="flex min-w-screen min-h-[50vh] h-full flex-col items-start justify-start text-white">
      <Image src={Logo} alt="p" />
    </main>
  );
};

export default Services;
