import { useEffect, useState } from "react";
import AnswerItem from "@/components/AnswerItem";
import soundEffects from "../../../public/soundEffects";
import Link from "next/link";

function MatchQuestion({ questionData, onComplete }) {
  const data = questionData;

  const [leftChoice, setLeftChoice] = useState(null);
  const [rightChoice, setRightChoice] = useState(null);
  const [matched, setMatched] = useState([]);
  const [rightQues, setRightQues] = useState([]);
  const [leftQues, setLeftQues] = useState([]);
  const [feedback, setFeedback] = useState({});

  function shuffle(array) {
    let tmpArr = [...array];
    for (let i = tmpArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tmpArr[i], tmpArr[j]] = [tmpArr[j], tmpArr[i]];
    }
    return tmpArr;
  }

  const generateQuestion = () => {
    const selected = data.slice(0, 5);
    setLeftQues(shuffle(selected));
    setRightQues(shuffle(selected));
  };

  useEffect(() => {
    generateQuestion();
  }, [data]);

  const handleLeftChoice = (id) => {
    if (!matched.includes(id)) {
      setLeftChoice((prev) => (prev === id ? null : id));
    }
  };

  const handleRightChoice = (id) => {
    if (!matched.includes(id)) {
      setRightChoice((prev) => (prev === id ? null : id));
    }
  };

  useEffect(() => {
    if (leftChoice && rightChoice) {
      if (leftChoice === rightChoice) {
        // đúng
        setFeedback((prev) => ({
          ...prev,
          [`L-${leftChoice}`]: "correct",
          [`R-${rightChoice}`]: "correct",
        }));

        setTimeout(() => {
          setMatched((prev) => [...prev, leftChoice]);
          setFeedback((prev) => ({
            ...prev,
            [`L-${leftChoice}`]: "matched",
            [`R-${rightChoice}`]: "matched",
          }));
        }, 500);

        const sound = new Audio(soundEffects.correct);
        sound.play();
      } else {
        // sai
        setFeedback((prev) => ({
          ...prev,
          [`L-${leftChoice}`]: "wrong",
          [`R-${rightChoice}`]: "wrong",
        }));

        setTimeout(() => {
          setFeedback((prev) => ({
            ...prev,
            [`L-${leftChoice}`]: null,
            [`R-${rightChoice}`]: null,
          }));
        }, 500);

        const sound = new Audio(soundEffects.wrong);
        sound.play();
      }

      setRightChoice(null);
      setLeftChoice(null);
    }
  }, [leftChoice, rightChoice]);

  // 🟢 Khi ghép xong tất cả cặp -> hoàn thành
  useEffect(() => {
    if (matched.length > 0 && matched.length === leftQues.length) {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 800); // delay nhẹ cho mượt
    }
  }, [matched, leftQues, onComplete]);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <div className="flex items-center">
        <Link href="/learn" className="cst_btn"  >
          Quay về 
        </Link>

      </div>
      <h1 className="text-center my-4 text-2xl font-bold">Chọn đáp án đúng</h1>

      <div className="flex justify-center gap-8 p-4">
        {/* Cột trái */}
        <div className="flex flex-col gap-3">
          {leftQues.map((item) => (
            <AnswerItem
              key={`L-${item.id}`}
              title={item.matChu}
              onClick={() => handleLeftChoice(item.id)}
              state={feedback[`L-${item.id}`]}
              isActive={leftChoice === item.id}
            />
          ))}
        </div>

        {/* Cột phải */}
        <div className="flex flex-col gap-3">
          {rightQues.map((item) => (
            <AnswerItem
              key={`R-${item.id}`}
              title={item.nghiaTV}
              onClick={() => handleRightChoice(item.id)}
              state={feedback[`R-${item.id}`]}
              isActive={rightChoice === item.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MatchQuestion;
