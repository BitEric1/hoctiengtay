import { useState, useEffect } from "react";
import { correct_sound, wrong_sound} from "../../../../public/soundEffects";
import {motion, AnimatePresence} from "framer-motion";
import soundEffects from "../../../public/soundEffects";
function ArrangeSentence() {
  const correctSentence = {
    ques: "Chị làm việc ở đâu?",
    answer: ["Ché", "hất", "fiệc", "dú", "hâư"]};

  const [words, setWords] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [checked, setChecked] = useState("default"); // "default" | "correct" | "wrong"
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [sceneId, setSceneId] = useState(0);

  const correctAudio = new Audio(soundEffects.correct);
  const wrongAudio = new Audio(soundEffects.wrong);

  
    useEffect(() => {
      correctAudio.load();
      wrongAudio.load();

    }, []);

  const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);

  useEffect(() => {
    setWords(shuffle(correctSentence.answer));
  }, []);

  const handleSelect = (word) => {
    if (checked !== "default" || answer.includes(word)) return;
    setAnswer([...answer, word]);
  };

  const handleRemove = (word) => {
    if (checked !== "default") return;
    setAnswer(answer.filter((w) => w !== word));
  };

  const handleCheck = () => {
    if (answer.length !== correctSentence.answer.length) return;

    const isCorrect = answer.join(" ") === correctSentence.answer.join(" ");
    const audio = isCorrect ? correctAudio : wrongAudio;
    audio.currentTime = 0;
    audio.play();
    if (isCorrect) {
      setChecked("correct");
      setSceneId((prev) => prev + 1);
      setIsTransitioning(true);
      setTimeout(() => {
        setAnswer([]);
        setWords(shuffle(correctSentence.answer));
        setChecked("default");
        setIsTransitioning(false);
      }, 1000);
    } else {
      setChecked("wrong");
      // Sau 1s thì tự reset về trạng thái wrong (không auto làm lại)
      setTimeout(() => setChecked("wrong"), 100);
    }
  };

  const handleRetry = () => {
    if (isTransitioning) return;
    setChecked("default");
    setAnswer([]);
  };

  const handleNext = () => {
    if (isTransitioning) return;
    setChecked("default");
    setAnswer([]);
    setWords(shuffle(correctSentence.answer));
  };

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-50 to-white transition-all duration-500 ease-in-out ${
        isTransitioning ? "opacity-50 pointer-events-none" : "opacity-100"
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={sceneId}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`flex flex-col items-center gap-6 w-full ${
            isTransitioning ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
      <div
        className={`bg-white shadow-lg rounded-2xl p-6 w-[90%] max-w-md flex flex-col items-center gap-6 border transition-all duration-300 ${
          checked === "wrong"
            ? "border-red-400 animate-shake"
            : checked === "correct"
            ? "border-green-400"
            : "border-gray-100"
        }`}
      >
        {/* Câu hỏi */}
        <h2
          className={`text-2xl font-bold text-center leading-snug transition-colors ${
            checked === "wrong"
              ? "text-red-600"
              : checked === "correct"
              ? "text-green-600"
              : "text-gray-800"
          }`}
        >
          {correctSentence.ques}
        </h2>

        {/* Ô hiển thị câu trả lời */}
        <div
          className={`min-h-[70px] flex flex-wrap justify-center gap-2 border-2 rounded-2xl p-3 w-full transition-all duration-300 ${
            checked === "wrong"
              ? "border-red-300 bg-red-50"
              : checked === "correct"
              ? "border-green-300 bg-green-50"
              : "border-blue-200 bg-blue-50"
          }`}
        >
          {answer.length === 0 && (
            <span className="text-gray-400 italic">
              Hãy sắp xếp các từ...
            </span>
          )}
          {answer.map((word, index) => (
            <div
              key={index}
              onClick={() => handleRemove(word)}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md cursor-pointer hover:bg-blue-600 active:scale-95 transition-transform"
            >
              {word}
            </div>
          ))}
        </div>

        {/* Các từ lựa chọn */}
        <div className="flex flex-wrap justify-center gap-3 max-w-md">
          {words.map((word, index) => (
            <div
              key={index}
              onClick={() => handleSelect(word)}
              className={`px-4 py-2 rounded-xl text-lg font-medium border shadow-sm transition-all select-none 
              ${
                answer.includes(word)
                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-default"
                  : "bg-white hover:bg-blue-100 active:scale-95 cursor-pointer"
              }`}
            >
              {word}
            </div>
          ))}
        </div>

        {/* Nút điều khiển */}
        <div className="flex justify-center mt-4">
          
          {checked === "wrong" && (
            <button
              className="bg-red-500 text-white font-bold rounded-xl px-6 py-3 min-w-[150px] hover:bg-red-600 shadow-md active:scale-95 transition"
              onClick={handleRetry}
              disabled={isTransitioning}
            >
              Thử lại ❌
            </button>
          )}

          {checked === "correct" && (
            <button
              className="bg-green-500 text-white font-bold rounded-xl px-6 py-3 min-w-[150px] hover:bg-green-600 shadow-md active:scale-95 transition"
              onClick={handleNext}
              disabled={isTransitioning}
            >
              Tiếp tục ✅
            </button>
          )}

          {checked === "default" && (
            <button
              onClick={handleCheck}
              disabled={answer.length !== correctSentence.answer.length}
              className={`px-6 py-3 rounded-xl font-semibold shadow-md transition active:scale-95
                ${
                  answer.length !== correctSentence.answer.length
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
            >
              Kiểm tra
            </button>
          )}
        </div>
      </div>
      </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default ArrangeSentence;



