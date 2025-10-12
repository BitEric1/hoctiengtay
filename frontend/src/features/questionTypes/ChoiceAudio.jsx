import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import soundEffects from "../../../public/soundEffects";
import { CheckButton } from "@/components/Button";
import { FaVolumeUp } from "react-icons/fa";
import AnswerItem from "@/components/AnswerItem";
import Link from "next/link";

function ChoiceAudio({ questionData, onComplete }) {
  const data = questionData;

  const [selected, setSelected] = useState(null);
  const [question, setQuestion] = useState(null);
  const [usedIds, setUsedIds] = useState([]);
  const [feedback, setFeedback] = useState({});
  const [checked, setChecked] = useState("default");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [audio, setAudio] = useState(null);

  const correctAudio = new Audio(soundEffects.correct);
  const wrongAudio = new Audio(soundEffects.wrong);

  useEffect(() => {
    correctAudio.load();
    wrongAudio.load();
  }, []);

  const shuffle = (array) => {
    const tmpArr = [...array];
    for (let i = tmpArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tmpArr[i], tmpArr[j]] = [tmpArr[j], tmpArr[i]];
    }
    return tmpArr;
  };

  const generateQuestion = () => {
    const uniqueData = [...new Map(data.map((i) => [i.id, i])).values()];
    const unused = uniqueData.filter((item) => !usedIds.includes(item.id));
    if (unused.length === 0) {
      if (onComplete) onComplete();
      setQuestion(null);
      return;
    }

    const correct = unused[Math.floor(Math.random() * unused.length)];
    const othersPool = uniqueData.filter((item) => item.id !== correct.id);
    const others = shuffle(othersPool).slice(0, 3);
    const options = shuffle([correct, ...others]);

    setFeedback({});
    setSelected(null);
    setChecked("default");
    setQuestion({ correct, options });

    if (correct?.audio) {
      const newAudio = new Audio(correct.audio);
      setAudio(newAudio);
    } else setAudio(null);
  };

  useEffect(() => {
    if (audio) {
      const playAudio = async () => {
        try {
          await audio.play();
        } catch {
          console.log("Autoplay bị chặn, chờ người dùng bấm loa.");
        }
      };
      const timer = setTimeout(playAudio, 400);
      return () => clearTimeout(timer);
    }
  }, [audio]);

  useEffect(() => {
    if (data?.length > 0) generateQuestion();
  }, [data]);

  useEffect(() => {
    if (usedIds.length > 0 && data?.length > 0) generateQuestion();
  }, [usedIds]);

  const handlePlayAudio = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    }
  };

  const handleSelected = (id) => {
    if (checked !== "default" || isTransitioning) return;
    setSelected(id);
  };

  const handleChecked = async () => {
    if (!selected || isTransitioning) return;

    setIsTransitioning(true);
    await new Promise((resolve) => setTimeout(resolve, 400));
    const isCorrect = selected === question.correct.id;

    const resultAudio = isCorrect ? correctAudio : wrongAudio;
    resultAudio.currentTime = 0;
    resultAudio.play();

    setFeedback({ [selected]: isCorrect ? "correct" : "wrong" });
    setChecked(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setIsTransitioning(true);
      setTimeout(() => {
        setUsedIds((prev) => [...prev, question.correct.id]);
        setIsTransitioning(false);
      }, 500);
    } else {
      setIsTransitioning(false);
    }
  };

  const handleRetry = () => {
    if (isTransitioning) return;
    setChecked("default");
    setFeedback({});
    setSelected(null);
  };

  const handleSkip = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      generateQuestion();
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={question?.correct?.id || "placeholder"} // fallback key để tránh lỗi
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`flex flex-col items-center gap-6 w-full ${
            isTransitioning ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          {question ? (
            <>
              <h2 className="text-xl font-bold text-center flex items-center gap-3">
                <button
                  onClick={handlePlayAudio}
                  className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition shadow"
                  disabled={isTransitioning || !audio}
                >
                  <FaVolumeUp className="text-blue-600 w-6 h-6" />
                </button>
                <span className="text-blue-600 font-semibold">
                  Nghe và chọn nghĩa đúng
                </span>
              </h2>

              <div className="grid gap-4">
                {question.options.map((item) => (
                  <AnswerItem
                    key={item.id}
                    title={item.nghia || item.meaning || item.matChu}
                    onClick={() => handleSelected(item.id)}
                    state={feedback[item.id]}
                    isActive={selected === item.id}
                    disabled={checked === "wrong" && !feedback[item.id]}
                  />
                ))}
              </div>

              <div className="flex items-center gap-4">
                <Link href="/learn" className="block cst_btn">
                  Quay lại
                </Link>
                <CheckButton
                  state={checked}
                  onCheck={handleChecked}
                  onRetry={handleRetry}
                  onNext={handleSkip}
                  disabled={!selected || isTransitioning}
                />
              </div>
            </>
          ) : (
            <></> // nếu question null thì chỉ render khoảng trắng
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ChoiceAudio;
