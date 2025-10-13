import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import soundEffects from "../../../public/soundEffects";
import { FaVolumeUp } from "react-icons/fa";
import AnswerItem from "@/components/AnswerItem";
import { CheckButton } from "@/components/Button";
import Link from "next/link";

function FillInTheBlank({ questionData = [], onComplete }) {
  const data = questionData;

  const [question, setQuestion] = useState(null);
  const [usedIds, setUsedIds] = useState([]);
  const [selected, setSelected] = useState("");
  const [checked, setChecked] = useState("default");
  const [feedback, setFeedback] = useState({});
  const [isTransitioning, setIsTransitioning] = useState(false);

  const audioRef = useRef(null);
  const correctAudio = useRef(new Audio(soundEffects.correct));
  const wrongAudio = useRef(new Audio(soundEffects.wrong));

  // preload âm thanh phản hồi
  useEffect(() => {
    correctAudio.current.load();
    wrongAudio.current.load();
  }, []);

  // cleanup audio khi unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Khởi tạo câu đầu tiên
  useEffect(() => {
    if (data.length > 0) generateQuestion();
  }, [data]);

  // Khi usedIds thay đổi → chuyển câu mới
  useEffect(() => {
    if (usedIds.length > 0) {
      setIsTransitioning(true);
      setTimeout(() => {
        generateQuestion();
        setIsTransitioning(false);
      }, 400);
    }
  }, [usedIds]);

  const generateQuestion = () => {
    // dừng audio cũ
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }

    const unused = data.filter((q) => !usedIds.includes(q.id));

    // hết câu hỏi → gọi onComplete
    if (unused.length === 0) {
      onComplete?.();
      setQuestion(null);
      return;
    }

    const newQ = unused[Math.floor(Math.random() * unused.length)];
    if (!newQ) return; // ✅ tránh crash

    setQuestion(newQ);
    setSelected("");
    setChecked("default");
    setFeedback({});

    if (newQ.audio) {
      const newAudio = new Audio(newQ.audio);
      audioRef.current = newAudio;
      setTimeout(() => {
        audioRef.current?.play().catch(() => console.log("Autoplay bị chặn"));
      }, 500);
    }
  };

  const handlePlayAudio = () => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = 0;
    audioRef.current.play().catch(() => {});
  };

  const handleChecked = () => {
    if (!selected || !question) return;
    const isCorrect = selected === question.correct;

    setChecked(isCorrect ? "correct" : "wrong");

    const sound = isCorrect ? correctAudio.current : wrongAudio.current;
    sound.currentTime = 0;
    sound.play();

    setFeedback({ [selected]: isCorrect ? "correct" : "wrong" });

    if (isCorrect) {
      setTimeout(() => {
        setUsedIds((prev) => [...prev, question.id]);
      }, 800);
    }
  };

  const handleRetry = () => {
    if (isTransitioning) return;
    setChecked("default");
    setFeedback({});
    setSelected(null);
  };

  if (!question) return null;

  return (
    <div className="flex flex-col items-center gap-6 p-4 relative overflow-hidden">
      <div className="flex justify-start w-full">
        <Link href="/learn" className="cst_btn-danger">
          Thoát
        </Link>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={question.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center gap-6 w-full max-w-md mx-auto"
        >
          {/* Tiêu đề */}
          <h2 className="text-xl font-bold text-center flex items-center gap-3">
            <button
              onClick={handlePlayAudio}
              disabled={isTransitioning}
              className={`p-3 rounded-full transition shadow ${
                isTransitioning
                  ? "bg-gray-200 cursor-not-allowed"
                  : "bg-blue-100 hover:bg-blue-200"
              }`}
            >
              <FaVolumeUp className="text-blue-600 w-6 h-6" />
            </button>
            <span className="text-blue-600 font-semibold">
              Nghe và chọn từ còn thiếu
            </span>
          </h2>

          {/* Câu hỏi */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-800 font-medium text-center px-3"
          >
            {question.first}{" "}
            <span className="underline px-3 text-blue-600 font-semibold">
              _____
            </span>{" "}
            {question.last}
          </motion.p>

          {/* Gợi ý */}
          <div className="grid gap-4 justify-center">
            {question.answer.map((word) => (
              <AnswerItem
                key={word}
                title={word}
                onClick={() => setSelected(word)}
                isActive={selected === word}
                state={feedback[word]}
                disabled={checked !== "default" || isTransitioning}
              />
            ))}
          </div>

          {/* Nút kiểm tra */}
          <div className="flex items-center gap-4">
            <CheckButton
              state={checked}
              onCheck={handleChecked}
              disabled={!selected || isTransitioning}
              onRetry={handleRetry}
            />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default FillInTheBlank;
