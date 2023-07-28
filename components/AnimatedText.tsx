import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const quote = {
  initial: {
    opacity: 1,
  },
  animate: {
    opacity: 1,
    transition: {
      delay: 0.5,
      staggerChildren: 0.08,
    },
  },
};

const singleWord = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      //   delay: 0.5,
      duration: 1,
    },
  },
};

type props = {
  text: string;
  className: string;
};

type textprops = {
  name: string;
  age: number;
  className: string;
};

const AnimatedText = ({ text, className = "" }: props) => {
  return (
    <div className="min-w-screen mx-auto py-2 flex items-center justify-center text-center md:overflow-hidden">
      <motion.h1
        className={`inline-block min-w-screen text-dark font-bold uppercase text-2xl md:text-7xl ${className}`}
        variants={quote}
        initial="initial"
        animate="animate"
      >
        {text.split(" ").map((word, index) => (
          <motion.span
            key={word + "-" + index}
            className="inline-block"
            variants={singleWord}
            whileInView={{ opacity: 1, y: 0 }}
          >
            {word}&nbsp;
          </motion.span>
        ))}
      </motion.h1>
    </div>
  );
};

const AdminName = ({ name, age, className = "" }: textprops) => {
  return (
    <motion.div className={`${className}`}>
      <motion.h1>{name}</motion.h1>
      <motion.p>{age}</motion.p>
    </motion.div>
  );
};

export default AnimatedText;
