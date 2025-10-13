import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import soundEffects from "../../../public/soundEffects";
import { FaVolumeUp } from "react-icons/fa";
import { CheckButton } from "@/components/Button";
import Link from "next/link";

function WriteAnswer({ questionData, onComplete }) {
  const data = questionData;
  const [question, setQuestion] = useState(null);
  const [usedIds, setUsedIds] = useState([]);
  const [checked, setChecked] = useState("default"); // default | correct | wrong
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");

  const questionAudio = useRef(null);
  const correctAudio = useRef(new Audio(soundEffects.correct));
  const wrongAudio = useRef(new Audio(soundEffects.wrong));
  const firstRender = useRef(true);

  // 🔹 Hàm shuffle
  function shuffle(array) {
    let tmpArr = [...array];
    for (let i = tmpArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [tmpArr[i], tmpArr[j]] = [tmpArr[j], tmpArr[i]];
    }
    return tmpArr;
  }

  // 🔹 Preload âm thanh hiệu ứng
  useEffect(() => {
    correctAudio.current.load();
    wrongAudio.current.load();
  }, []);

  // Cleanup audio khi unmount
  useEffect(() => {
    return () => {
      if (questionAudio.current) {
        questionAudio.current.pause();
        questionAudio.current.src = "";
        questionAudio.current.load();
        questionAudio.current = null;
      }
    };
  }, []);

  // 🔹 Tạo câu hỏi mới
  const generateQuestion = () => {
    // Dừng audio cũ nếu có
    if (questionAudio.current) {
      questionAudio.current.pause();
      questionAudio.current.src = "";
      questionAudio.current.load();
      questionAudio.current = null;
    }

    const unused = data.filter((item) => !usedIds.includes(item.id));

    // Hết câu hỏi
    if (unused.length === 0) {
      setQuestion(null);
      if (onComplete) onComplete();
      return;
    }
    // Chọn ngẫu nhiên 1 câu hỏi chưa dùng làm đáp án
    const correct = unused[Math.floor(Math.random() * unused.length)];
    let others = data.filter((item) => item.id !== correct.id);
    others = shuffle(others).slice(0, 3);
    const options = shuffle([correct, ...others]);

    setQuestion({ id: correct.id, correct, options });
    setUserAnswer("");
    setChecked("default");

    //phát audio câu hỏi
    if (correct.audio) {
      const audio = new Audio(correct.audio);
      questionAudio.current = audio;
      audio.load();
      setTimeout(() => audio.play().catch(() => {}), 400);
    }
    console.log("Phát audio câu", correct.matChu);
  };

  //Gọi 1 lần khi khởi tạo
  useEffect(() => {
    if (data?.length > 0) {
      generateQuestion();
    }
  }, [data]);

  //  Gọi khi usedIds thay đổi (sau khi đúng hoặc skip)
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (usedIds.length > 0) {
      setTimeout(() => {
        generateQuestion();
      }, 400);
    }
  }, [usedIds]);

  const normalize = (str) => str.trim().toLowerCase().replace(/\s+/g, " ");

  const handlePlayAudio = () => {
    if (questionAudio.current) {
      questionAudio.current.currentTime = 0;
      questionAudio.current.play().catch(() => {});
    }
  };

  const handleChecked = () => {
    if (isTransitioning || !userAnswer.trim()) return;
    setIsTransitioning(true);

    const isCorrect =
      normalize(userAnswer) === normalize(question.correct.matChu);
    const resultAudio = isCorrect ? correctAudio.current : wrongAudio.current;
    resultAudio.currentTime = 0;
    resultAudio.play();

    setChecked(isCorrect ? "correct" : "wrong");

    if (isCorrect) {
      setTimeout(() => {
        setUsedIds((prev) => [...prev, question.id]);
        setUserAnswer("");
        setChecked("default");
        setIsTransitioning(false);
      }, 800);
    } else {
      setIsTransitioning(false);
    }
  };
  // Làm lại khi sai
  const handleRetry = () => {
    if (isTransitioning) return;
    setChecked("default");
    setUserAnswer("");
    handlePlayAudio();
  };
  // Bỏ qua câu hỏi
  const handleSkip = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setUsedIds((prev) => [...prev, question.id]);
    setTimeout(() => {
      setIsTransitioning(false);
    }, 400);
  };

  return (
    <div className="flex flex-col items-center gap-6 p-4 relative overflow-hidden">
      <div className="flex justify-start w-full">
        <Link href="/learn" className="cst_btn-danger">
          Thoát
        </Link>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={question?.id || "placeholder"}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={`flex flex-col items-center gap-6 w-full max-w-md ${
            isTransitioning ? "opacity-50 pointer-events-none" : "opacity-100"
          }`}
        >
          {!question ? (
            ""
          ) : (
            <>
              <h3 className="text-blue-600 font-semibold text-center">
                Nghe và viết lại câu bằng tiếng Tày
              </h3>

              <button
                className="bg-blue-100 hover:bg-blue-200 p-3 rounded-full transition shadow"
                onClick={handlePlayAudio}
                disabled={isTransitioning}
              >
                <FaVolumeUp className="text-blue-600 w-6 h-6" />
              </button>

              <input
                type="text"
                placeholder="Nhập câu trả lời..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={checked !== "default" || isTransitioning}
                className="border-2 border-gray-300 rounded-xl p-3 w-[300px] text-lg text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <div className="flex items-center gap-4">
                <CheckButton
                  state={checked}
                  onCheck={handleChecked}
                  onRetry={handleRetry}
                  onNext={handleSkip}
                  disabled={!userAnswer.trim() || isTransitioning}
                />
              </div>
            </>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default WriteAnswer;
