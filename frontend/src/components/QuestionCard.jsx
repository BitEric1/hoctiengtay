"use client";
import { useContext, useState } from "react";
import { Context } from "@/context/Context";

import { AiOutlineSound } from "react-icons/ai";

export default function QuestionCard() {
  const { data } = useContext(Context);
  const [selected, setSelected] = useState(null);

  if (!data || data.length === 0) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  const question = data[0];

  // Hàm play audio
  const playAudio = () => {
    if (question.audio) {
      const audio = new Audio(question.audio);
      audio.play();
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">Chọn nghĩa đúng</h2>

      {/* Khi bấm thì play audio */}
      <div
        className=" bg-gray-100 border border-gray-300 rounded-lg px-4 py-2 text-lg font-medium inline-block mb-6 cursor-pointer hover:bg-gray-200 transition"
        onClick={playAudio}
      >
        {question.matChu}
        <span><AiOutlineSound size={25} /></span>
      </div>

      <div className="flex flex-col gap-4">
        {question.options.map((opt, idx) => {
          const isCorrect = opt.toLowerCase() === question.nghia.toLowerCase();
          const isSelected = selected === idx;

          return (
            <button
              key={idx}
              onClick={() => setSelected(idx)}
              className={`flex items-center gap-4 border rounded-xl px-4 py-3 text-left text-lg transition
                ${
                  isSelected
                    ? isCorrect
                      ? "bg-green-200 border-green-500"
                      : "bg-red-200 border-red-500"
                    : "border-gray-300 hover:bg-blue-100"
                }`}
            >
              <span className="font-bold">{idx + 1}</span>
              <span>{opt}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
