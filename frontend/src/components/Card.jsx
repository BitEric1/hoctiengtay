"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

function Card({ count, title, image, audio, onClick, state = "default" }) {
  const soundRef = useRef(null);
  const handleClick = () => {
    if (audio) {
      if (!soundRef.current) {
        soundRef.current = new Audio(audio);
      } else {
        soundRef.current.pause();
        soundRef.current.currentTime = 0;
      }

      soundRef.current.play();

    };
    onClick?.();
  }

  // 🎨 style theo state
  const stateStyles = {
    default: {
      border: "border-gray-300",
      bg: "bg-white",
      text: "text-gray-600",
    },
    active: {
      border: "border-blue-500",
      bg: "bg-blue-50",
      text: "text-blue-600",
    },
    correct: {
      border: "border-green-500",
      bg: "bg-green-50",
      text: "text-green-600",
    },
    wrong: {
      border: "border-red-500",
      bg: "bg-red-50",
      text: "text-red-600",
    },
  };

  const { border, bg, text } = stateStyles[state] || stateStyles.default;


  const variants = {
    idle: { x: 0, scale: 1 },
    correct: {
      scale: [1, 1.15, 1],
      transition: { duration: 0.4, ease: "easeInOut" },
    },
    wrong: {
      x: [0, -25, 25, -20, 20, 0],
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className={`p-2 shadow-md flex flex-col rounded-[8px] cursor-pointer
        hover:shadow-lg border-[3px] transition-all duration-300 ease-in-out hover:-translate-y-1
        ${border} ${bg}`}
      onClick={handleClick}
      variants={variants}
      initial="idle"
      animate={
        state === "correct" ? "correct" : state === "wrong" ? "wrong" : "idle"
      }
    >
      <span
        className={`p-3 border-gray-300 border w-[30px] h-[30px]
        flex items-center justify-center rounded-[8px] font-medium ${text}`}
      >
        {count + 1}
      </span>
      <Image
        width={200}
        height={200}
        className="object-cover rounded-[8px] mt-2"
        src={image}
        alt={title}
        loading="lazy"
      />
      <span className={`flex justify-center p-3 font-bold text-lg ${text}`}>
        {title}
      </span>
    </motion.div>
  );
}

export default Card;
