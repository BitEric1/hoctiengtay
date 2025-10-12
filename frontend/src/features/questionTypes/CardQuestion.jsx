"use client";
import Card from "@/components/Card";
import React, { useState, useEffect } from "react";
import soundEffects from "../../../public/soundEffects";
import Link from "next/link";


function CardQuestion({ questionData, onComplete }) {
  const data = questionData || [];

  const [usedIds, setUsedIds] = useState([]);
  const [currQues, setCurrQues] = useState(null);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState("default");
  const [activeStyle, setActiveStyle] = useState(null);

  function shuffle(array) {
    let tmpArr = [...array];
    for (let i = tmpArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tmpArr[i], tmpArr[j]] = [tmpArr[j], tmpArr[i]];
    }
    return tmpArr;
  }

  function generateRound() {
    const unused = data.filter((item) => !usedIds.includes(item.id));
    if (unused.length === 0) {
      setCurrQues(null);
      if (onComplete) onComplete();
      return;
    }
    const correct = unused[Math.floor(Math.random() * unused.length)];
    let others = data.filter((item) => item.id !== correct.id);
    others = shuffle(others).slice(0, 2);
    const options = shuffle([correct, ...others]);
    setCurrQues({ correct, options });
  }

  useEffect(() => {
    if (Array.isArray(data) && data.length > 0) generateRound();
  }, [data]);

  const handleSelected = (id) => {
    if (checked === "default") {
      setActiveStyle(id);
      setSelected(id);
    }
  };

  const handleChecked = () => {
    if (!selected) return;
    if (selected === currQues.correct.id) {
      setChecked("correct");
      setUsedIds((prev) => [...prev, currQues.correct.id]);
      new Audio(soundEffects.correct).play();
    } else {
      setChecked("wrong");
      new Audio(soundEffects.wrong).play();
    }
  };

  const handleRetry = () => {
    setChecked("default");
    setSelected(null);
    setActiveStyle(null);
  };

  const handleSkip = () => {
    setChecked("default");
    setActiveStyle(null);
    setSelected(null);
    generateRound();
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br px-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl p-8 ">
        {currQues ? (
          <div>
            <h1 className="text-3xl font-semibold text-center mb-8 text-gray-800">
              Đâu là{" "}
              <span className="text-blue-700 font-bold">
                {currQues.correct.nghiaTV}
              </span>
              ?
            </h1>

            <div
              className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-items-center transition ${
                checked !== "default" ? "pointer-events-none opacity-80" : ""
              }`}
            >
              {currQues.options.map((ques, index) => (
                <Card
                  key={ques.id}
                  count={index}
                  title={ques.matChu}
                  image={ques.img}
                  audio={ques.audio}
                  onClick={() => handleSelected(ques.id)}
                  active={activeStyle === ques.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600">Đã hoàn thành tất cả câu hỏi 🎉</p>
        )}

        <div
          className={`mt-10 h-[140px] flex justify-center items-center gap-4 rounded-xl transition-all duration-500 ${
            checked === "correct"
              ? "bg-green-100"
              : checked === "wrong"
              ? "bg-red-100"
              : "bg-blue-50"
          }`}
        >
          <Link href="/learn" className="block cst_btn" >
              Quay lại
          </Link>


          {checked === "wrong" && (
            <button
              className="cst_btn-danger"
              onClick={handleRetry}
            >
              Thử lại
            </button>
          )}

          {checked === "correct" && (
            <button
              className="cst_btn-success"
              onClick={handleSkip}
            >
              Tiếp tục
            </button>
          )}

          {checked === "default" && (
            <button
              onClick={handleChecked}
              disabled={!selected}
              className={`px-8 py-3 rounded-lg font-semibold shadow-md transition-all ${
                !selected
                  ? "cst_btn"
                  : "cst_btn-primary"
              }`}
            >
              Kiểm tra
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CardQuestion;
