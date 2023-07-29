import React from "react";
import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDotCircle } from "@fortawesome/free-solid-svg-icons";

const Services = () => {
  return (
    <main className="flex min-w-screen min-h-[50vh] h-full flex-col items-start justify-start text-white bg-orange-800">
      <div className="flex min-w-screen w-full max-h-screen h-full flex-col items-center justify-start text-white">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <AnimatedText text="Our Agents!" className="" />
        </motion.div>
      </div>
      <div className="p-4 md:p-10 text-sm md:text-2xl font-normal">
        <div>
          <div className="flex items-start md:items-center gap-2">
            <FontAwesomeIcon icon={faDotCircle} />
            <p> All Agents will be trained for free</p>
          </div>
          <br />
          <div className="flex items-start  md:items-center gap-2">
            <FontAwesomeIcon icon={faDotCircle} />
            <p>
              They will be engaged for a one month probationary HANDS-ON
              PRODUCTIVITY DRIVEN PRACTICAL FIELD EXPERIENCE within their
              locality
            </p>
          </div>
          <br />
          <div className="flex items-start  md:items-center gap-2">
            <FontAwesomeIcon
              icon={faDotCircle}
              width={30}
              height={30}
              scale={10}
            />
            <p>
              {" "}
              They will be paid daily stipidens for basic upkeep during the one
              month probation based upon their productivity
            </p>
          </div>
          <br />
          <div className="flex items-start  md:items-center gap-2">
            <FontAwesomeIcon
              icon={faDotCircle}
              width={30}
              height={30}
              scale={10}
            />
            <p>
              {" "}
              After a successful one month hands-on pratical probation
              experience following thier evaluation, assessment and screening,
              they will be given a collateral free and interest free buisness
              loan of <span className="font-bold">
                N300,000 to N700,000
              </span>{" "}
              covering starter kits, branding, buisness stock and working
              capital
            </p>
          </div>
          <br />
          <div className="flex items-start  md:items-center gap-2">
            <FontAwesomeIcon icon={faDotCircle} />
            <p> They will also have a 3 months moratorium</p>
          </div>
          <br />
          <div className="flex items-start  md:items-center gap-2">
            <FontAwesomeIcon
              icon={faDotCircle}
              width={30}
              height={30}
              scale={10}
            />
            <p>
              {" "}
              They will start repayment of the loan for 12 months after the
              first 3 months moratorium
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Services;
