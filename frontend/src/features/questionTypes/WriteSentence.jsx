import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";


import { FaVolumeUp } from "react-icons/fa";
import { CheckButton } from "@/components/Button";

function WriteSentence() {
  const correctSentence = {
    id: 1,
    ques: "Chị làm việc ở đâu?",
    // Hỗ trợ nhiều đáp án hợp lệ
    answer: ["Ché hất fiệc dú hâư", "Ché hất fiệc dú tâu", "Ché hắt việc dú tâu", "dú nẩy"],
    audio: "/audio/chilamviec.mp3", // 🔹 file âm thanh câu hỏi (bạn thay bằng file thật)
  };

  const [userAnswer, setUserAnswer] = useState("");
  const [checked, setChecked] = useState("default"); // "default" | "correct" | "wrong"
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Âm thanh phản hồi
  const correctAudio = new Audio(correct_sound);
  const wrongAudio = new Audio(wrong_sound);
  const woshAudio = new Audio(wosh_sound);

  // Âm thanh câu hỏi
  const questionAudio = new Audio(correctSentence.audio);

  useEffect(() => {
    correctAudio.load();
    wrongAudio.load();
    woshAudio.load();
    questionAudio.load();
  }, []);

  const playQuestion = () => {
    questionAudio.currentTime = 0;
    questionAudio.play();
  };

  // 🔍 Kiểm tra câu trả lời
  const handleChecked = () => {
    const normalizedUser = userAnswer.trim().toLowerCase();

    const isCorrect = correctSentence.answer.some(
      (ans) => ans.trim().toLowerCase() === normalizedUser
    );

    const audio = isCorrect ? correctAudio : wrongAudio;
    audio.currentTime = 0;
    audio.play();

    if (isCorrect) {
      setChecked("correct");
      setIsTransitioning(true);
      setTimeout(() => {
        setUserAnswer("");
        setChecked("default");
        setIsTransitioning(false);
      }, 1000);
    } else {
      setChecked("wrong");
    }
  };

  const handleRetry = () => {
    if (isTransitioning) return;
    setChecked("default");
    setUserAnswer("");
  };

  const handleSkip = () => {
    if (isTransitioning) return;
    setChecked("default");
    setUserAnswer("");
  };

  return (
    <div
      className={`flex mx-auto flex-col items-center gap-5 justify-center w-[300px] transition-all duration-500 ease-in-out ${isTransitioning ? "opacity-50 pointer-events-none" : "opacity-100"
        }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={correctSentence.id}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="flex flex-col items-center gap-6 w-full"
        >
          {/* Câu hỏi + Loa */}
          <div className="flex items-center gap-3">
            <h2
              className={`text-2xl font-bold text-center leading-snug transition-colors ${checked === "wrong"
                ? "text-red-600"
                : checked === "correct"
                  ? "text-green-600"
                  : "text-gray-800"
                }`}
            >
              {correctSentence.ques}
            </h2>
            <button
              onClick={playQuestion}
              className="p-2 bg-blue-100 hover:bg-blue-200 rounded-full transition"
              title="Nghe lại câu hỏi"
            >
              <FaVolumeUp size={22} className="text-blue-500" />
            </button>
          </div>

          {/* Ô nhập câu trả lời */}
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            disabled={checked !== "default"}
            placeholder="Nhập câu trả lời của bạn..."
            className={`w-full text-center border-2 rounded-xl px-4 py-3 text-lg outline-none transition-all duration-300 ${checked === "wrong"
              ? "border-red-400 bg-red-50 text-red-600"
              : checked === "correct"
                ? "border-green-400 bg-green-50 text-green-600"
                : "border-blue-300 bg-blue-50 focus:border-blue-500"
              }`}
          />

          {/* Nút điều khiển */}
          <CheckButton
            state={checked}
            onCheck={handleChecked}
            onRetry={handleRetry}
            onNext={handleSkip}
            disabled={!userAnswer.trim() || isTransitioning}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default WriteSentence;
