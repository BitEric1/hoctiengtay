import { motion } from "framer-motion";

function AnswerItem({ title, onClick, state, isActive, disabled }) {
  let base =
    "border p-3 rounded-lg text-center transition-all duration-300 select-none text-lg font-medium w-[250px]";

  if (state === "correct") {
    base +=
      " bg-green-500 text-white shadow-lg cursor-default pointer-events-none";
  } else if (state === "wrong") {
    base +=
      " bg-red-500 text-white shadow-lg cursor-not-allowed pointer-events-none";
  } else if (state === "matched") {
    base += " bg-gray-300 text-gray-400 cursor-not-allowed pointer-events-none";
  } else if (disabled) {
    base += " bg-gray-100 text-gray-400 border-gray-200 opacity-60 cursor-not-allowed";
  } else if (isActive) {
    base += " bg-blue-100 border-blue-400 text-blue-700 shadow-md scale-105";
  } else {
    base += " bg-white hover:bg-gray-100 cursor-pointer";
  }

  // Hiệu ứng motion khi đúng / sai
 const variants = {
  idle: { x: 0, scale: 1 },

  correct: {
    scale: [1, 1.2, 1],
    transition: { duration: 0.4, ease: "easeInOut" },
  },

  wrong: {
    x: [0, -35, 35, -30, 30, 0], // ← lắc trái phải
    transition: { duration: 0.5, ease: "easeInOut" },
  },
};

  return (
    <motion.div
      className={base}
      onClick={!disabled && state !== "matched" ? onClick : undefined}
      variants={variants}
      initial="idle"
      animate={
        state === "correct" ? "correct" : state === "wrong" ? "wrong" : "idle"
      }
    >
      {title}
    </motion.div>
  );
}

export default AnswerItem;
