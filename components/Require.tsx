import { faDotCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { motion } from "framer-motion";
import React from "react";
import AnimatedText from "./AnimatedText";

const Require = () => {
  return (
    <div className="w-screen">
      <div className="flex min-w-screen w-full max-h-screen h-full flex-col items-center justify-start text-black">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <AnimatedText text="What We Require!" className="pt-10" />
        </motion.div>
      </div>
      <div className="p-4 md:p-10 text-sm md:text-2xl font-normal">
        <div className="flex items-start  md:items-center gap-2">
          <FontAwesomeIcon icon={faDotCircle} />
          <p>
            {" "}
            They will own their E-Naira/Regular POS buisness forthwith as AGENTS
            in E-Networks Technologies Smart Agency Banking
          </p>
        </div>
        <br />
        <div className="flex items-start  md:items-center gap-2">
          <FontAwesomeIcon icon={faDotCircle} />
          <p>
            {" "}
            They will be required to procure their E-Networks Cash Card for
            their Training at a cost of{" "}
            <span className="font-bold">N1,500</span> only during enrollment and
            registeration
          </p>
        </div>
      </div>
    </div>
  );
};

export default Require;
