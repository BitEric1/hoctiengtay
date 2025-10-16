import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import soundEffects from "../../../public/soundEffects";
import { CheckButton, SkipButton } from "@/components/Button";
import Card from "@/components/Card";
import Link from "next/link";

function CardQuestion({ questionData, onComplete }) {
  const data = questionData || [];

  const [usedIds, setUsedIds] = useState([]);
  const [currQues, setCurrQues] = useState(null);
  const [selected, setSelected] = useState(null);
  const [answerState, setAnswerState] = useState("default"); // default | active | correct | wrong
  const [activeId, setActiveId] = useState(null);
  const [roundKey, setRoundKey] = useState(0);

  const correctAudio = useRef(new Audio(soundEffects.correct));
  const wrongAudio = useRef(new Audio(soundEffects.correct));

  // Xáo trộn mảng
  const shuffle = (array) => {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  const generateRound = () => {
    // Lọc các câu chưa dùng và khác câu hiện tại
    const unused = data.filter(
      (item) => !usedIds.includes(item.id) && item.id !== currQues?.correct.id
    );

    if (unused.length === 0) {
      setCurrQues(null);
      onComplete?.();
      return;
    }

    const correct = unused[Math.floor(Math.random() * unused.length)];

    let others = data.filter((item) => item.id !== correct.id);
    others = shuffle(others).slice(0, Math.min(3, others.length));

    const newQues = { correct, options: shuffle([correct, ...others]) };

    setCurrQues(newQues);
    setRoundKey((prev) => prev + 1);
  };

  useEffect(() => {
    if (data.length > 0 && currQues === null && usedIds.length < data.length) {
      generateRound();
    }
  }, [data, currQues, usedIds]);

  const handleSelected = (id) => {
    if (answerState === "default" || answerState === "active") {
      setActiveId(id);
      setSelected(id);
      setAnswerState("active");
    }
  };

  const handleChecked = () => {
    if (!selected || !currQues) return;

    if (selected === currQues.correct.id) {
      setAnswerState("correct");
      setUsedIds((prev) => [...prev, currQues.correct.id]);
      correctAudio.current.play();

      setTimeout(() => {
        setAnswerState("default");
        setSelected(null);
        setActiveId(null);
        setRoundKey((prev) => prev + 1);
        generateRound();
      }, 600);
    } else {
      setAnswerState("wrong");
      wrongAudio.current.play();

      // auto highlight correct after 1s
      setTimeout(() => { }, 300);
    }
  };

  const handleRetry = () => {
    setAnswerState("default");
    setSelected(null);
    setActiveId(null);
  };

  const handleSkip = () => {
    if (!currQues) return;
    // nếu chưa chọn hoặc đang check sai/correct đều cho skip
    setUsedIds((prev) => [...prev, currQues.correct.id]);
    setAnswerState("default");
    setSelected(null);
    setActiveId(null);
    setRoundKey((prev) => prev + 1);
    generateRound();
  };

  if (!currQues) return null;

  return (
    <div className="flex items-center justify-center">
      <div className="w-[900px] mx-auto">

        <AnimatePresence mode="wait">
          <motion.div
            key={roundKey}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex flex-col items-center gap-6 w-full"
          >
            <h1 className="text-[30px] text-center mb-[24px]">
              Đâu là{" "}
              <span className="font-bold text-blue-600">
                {currQues.correct.nghiaTV}
              </span>
              ?
            </h1>

            <div
              className={`grid gap-5 justify-center transition ${answerState === "wrong" || answerState === "correct"
                  ? "pointer-events-none"
                  : ""
                } grid-cols-2 md:grid-cols-4`}
            >
              {currQues.options.map((ques, index) => (
                <Card
                  key={ques.id}
                  count={index}
                  title={ques.matChu}
                  image={ques.img}
                  audio={ques.audio}
                  onClick={() => handleSelected(ques.id)}
                  state={
                    activeId === ques.id
                      ? answerState === "correct"
                        ? "correct"
                        : answerState === "wrong"
                          ? "wrong"
                          : "active"
                      : "default"
                  }
                />
              ))}
            </div>

            <div className="p-4 flex justify-between w-full max-w-md">
              <SkipButton
                onSkip={handleSkip}
                disabled={answerState === "correct"}
              />
              <CheckButton
                onCheck={handleChecked}
                onRetry={handleRetry}
                onSkip={handleSkip}
                state={answerState}
                disabled={!selected}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default CardQuestion;
