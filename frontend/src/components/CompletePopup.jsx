import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";

function CompletePopup({ onNext }) {
  const [show, setShow] = useState(true);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm z-50">
      <Confetti width={width} height={height} numberOfPieces={200} recycle={false} />

      <motion.div
        className="bg-white rounded-2xl shadow-2xl p-10 text-center max-w-md"
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      >
        <motion.h1
          className="text-3xl font-bold text-blue-600 mb-4"
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
            Tuyệt vời!
        </motion.h1>
        <p className="text-gray-700 mb-6 text-lg">
          Bạn đã hoàn thành bài học này xuất sắc!
        </p>
        <button
          onClick={() => {
            setShow(false);
            onNext?.();
          }}
          className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg font-semibold transition-all"
        >
            Tiếp tục
        </button>
      </motion.div>
    </div>
  );
}

export default CompletePopup;
