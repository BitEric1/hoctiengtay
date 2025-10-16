import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import soundEffects from "../../../public/soundEffects";
import { CheckButton, SkipButton } from "@/components/Button";
import AnswerItem from "@/components/AnswerItem";
import Link from "next/link";

function ChoiceQuestion({ questionData, onComplete }) {
  const data = questionData;

  const [question, setQuestion] = useState(null);
  const [usedIds, setUsedIds] = useState([]);
  const [selected, setSelected] = useState(null);
  const [checked, setChecked] = useState("default"); // "default" | "correct" | "wrong"
  const [feedback, setFeedback] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const correctAudio = new Audio(soundEffects.correct);
  const wrongAudio = new Audio(soundEffects.wrong);

  useEffect(() => {
    correctAudio.load();
    wrongAudio.load();
  }, []);

  const shuffle = (array) => {
    const tmp = [...array];
    for (let i = tmp.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tmp[i], tmp[j]] = [tmp[j], tmp[i]];
    }
    return tmp;
  };

  const generateQuestion = () => {
    const uniqueData = [...new Map(data.map((i) => [i.id, i])).values()];
    const unused = uniqueData.filter((item) => !usedIds.includes(item.id));
    if (unused.length === 0) {
      // Nếu hết câu hỏi, reset lại tất cả hoặc giữ null
      setQuestion(null);
      if (onComplete) onComplete();
      return;
    }

    const correct = unused[Math.floor(Math.random() * unused.length)];
    const others = shuffle(uniqueData.filter((i) => i.id !== correct.id)).slice(
      0,
      3
    );
    const options = shuffle([correct, ...others]);

    setQuestion({ correct, options });
    setSelected(null);
    setFeedback({});
    setChecked("default");
  };

  useEffect(() => {
    if (data?.length > 0) generateQuestion();
  }, [data]);

  useEffect(() => {
    if (usedIds.length > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        generateQuestion();
        setIsTransitioning(false);
      }, 400);
    }
  }, [usedIds]);

  const handleSelected = (id) => {
    if (checked !== "default" || isTransitioning) return;
    setSelected(id);
  };

  const handleChecked = () => {
    if (!question || !selected || isTransitioning) return;

    const isCorrect = selected === question.correct.id;
    const sound = isCorrect ? correctAudio : wrongAudio;
    sound.currentTime = 0;
    sound.play();

    setFeedback({ [selected]: isCorrect ? "correct" : "wrong" });
    setChecked(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setTimeout(() => {
        setUsedIds((prev) => [...prev, question.correct.id]);
      }, 500);
    }
  };

  const handleRetry = () => {
    if (isTransitioning) return;
    setChecked("default");
    setFeedback({});
    setSelected(null);
  };

  const handleSkip = () => {
    if (!question || isTransitioning) return;
    setUsedIds((prev) => [...prev, question.correct.id]);
  };

  return (
    <div
      className={`flex flex-col items-center gap-6 p-4 transition-all duration-500 ${
        isTransitioning ? "opacity-50 pointer-events-none" : ""
      }`}
    >
      
      <AnimatePresence mode="wait">
        {question && (
          <motion.div
            key={question.correct.id}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col items-center gap-6 w-full"
          >
            <h2 className="text-xl font-bold text-center">
              <span className="text-blue-600">{question.correct.matChu}</span>{" "}
              có nghĩa là gì?
            </h2>

            <div className="grid gap-4">
              {question.options.map((item) => (
                <AnswerItem
                  key={item.id}
                  title={item.nghiaTV}
                  onClick={() => handleSelected(item.id)}
                  state={feedback[item.id]}
                  isActive={selected === item.id}
                  disabled={checked !== "default" || isTransitioning}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              
              <SkipButton onSkip={handleSkip} />
              <CheckButton
                state={checked}
                onCheck={handleChecked}
                onRetry={handleRetry}
                disabled={!selected || isTransitioning}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default ChoiceQuestion;
