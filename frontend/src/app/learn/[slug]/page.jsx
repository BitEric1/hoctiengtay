"use client";
import { useState, useContext } from "react";
import { AiOutlineSound } from "react-icons/ai";
import { Context } from "@/context/Context";
import { useParams, useRouter } from "next/navigation";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { toast } from "react-toastify"; // Thêm dòng này

export default function Page({ params }) {
  const [selected, setSelected] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | correct | wrong
  const [disableCheck, setDisableCheck] = useState(false);
  const { data } = useContext(Context);
  const { slug } = useParams();
  const router = useRouter();

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  // Lấy đúng bài học theo slug
  const question = data.find((item) => item.slug === slug);
  if (!question) {
    return <p className="text-center mt-10">Không tìm thấy bài học.</p>;
  }

  // Tìm index hiện tại và slug tiếp theo
  const currentIdx = data.findIndex((item) => item.slug === slug);
  const nextQuestion = data[currentIdx + 1];

  // Hàm play audio
  const playAudio = () => {
    if (question.audio) {
      const audio = new Audio(question.audio);
      audio.play();
    }
  };

  // Kiểm tra đáp án đúng
  const isCorrect =
    selected !== null &&
    question.options[selected].toLowerCase() === question.nghia.toLowerCase();

  // Xử lý khi chọn đáp án
  const handleCheck = () => {
    if (isCorrect) {
      setStatus("correct");
      setDisableCheck(true);
      if (nextQuestion) {
        setTimeout(() => {
          setSelected(null);
          setStatus("idle");
          setDisableCheck(false);
          router.push(`/learn/${nextQuestion.slug}`);
        }, 1200);
      } else {
        // Hết bài, chuyển về trang chính và toast thành công
        setTimeout(() => {
          toast.success("🎉 Chúc mừng bạn đã hoàn thành chương học!");
          router.push("/");
        }, 1200);
      }
    } else {
      setStatus("wrong");
    }
  };

  const handleSelect = (idx) => {
    setSelected(idx);
    setStatus("idle");
    setDisableCheck(false);
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 bg-gradient-to-br from-blue-50 to-blue-100 rounded-3xl shadow-2xl p-8 relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <span className="inline-block bg-blue-500 text-white rounded-full px-3 py-1 text-sm font-semibold shadow">
          Bài {question.id}
        </span>
        <h2 className="text-2xl font-extrabold text-blue-700 tracking-wide">Chọn nghĩa đúng</h2>
      </div>
      {/* Audio + từ */}
      <div
        className="flex items-center gap-3 bg-white border border-blue-200 rounded-xl px-6 py-4 text-xl font-bold mb-8 shadow hover:shadow-lg cursor-pointer transition"
        onClick={playAudio}
      >
        <span className="text-blue-600">{question.matChu}</span>
        <AiOutlineSound size={28} className="text-blue-400 hover:text-blue-600 transition" />
      </div>
      {/* Options */}
      <div className="flex flex-col gap-5">
        {question.options.map((opt, idx) => {
          const isSelected = selected === idx;
          let optionStyle = "border-gray-300 bg-white hover:bg-blue-50";
          if (isSelected && status === "correct") optionStyle = "border-green-500 bg-green-100";
          else if (isSelected && status === "wrong") optionStyle = "border-red-500 bg-red-100";
          else if (isSelected) optionStyle = "border-blue-400 bg-blue-50";
          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              className={`flex items-center gap-4 border-2 rounded-2xl px-5 py-4 text-lg font-medium transition-all duration-200 shadow-sm ${optionStyle} ${
                status === "correct" ? "cursor-not-allowed" : ""
              }`}
              disabled={status === "correct"}
            >
              <span className="font-bold text-blue-500">{idx + 1}</span>
              <span>{opt}</span>
              {isSelected && status === "correct" && (
                <FaCheckCircle className="ml-auto text-green-500" size={22} />
              )}
              {isSelected && status === "wrong" && (
                <FaTimesCircle className="ml-auto text-red-500" size={22} />
              )}
            </button>
          );
        })}
      </div>
      {/* Nút kiểm tra kết quả */}
      {selected !== null && (
        <button
          className={`mt-10 w-full py-4 rounded-2xl font-bold text-lg shadow-lg transition-all duration-200 flex items-center justify-center gap-2
            ${
              status === "correct"
                ? "bg-green-500 text-white"
                : status === "wrong"
                ? "bg-red-500 text-white"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          onClick={handleCheck}
          disabled={disableCheck}
        >
          {status === "correct" ? (
            <>
              <FaCheckCircle size={22} />
              {nextQuestion
                ? "Chính xác! Đang chuyển sang bài tiếp theo..."
                : "Chính xác! Đã hết bài."}
            </>
          ) : status === "wrong" ? (
            <>
              <FaTimesCircle size={22} />
              Sai rồi, thử lại nhé!
            </>
          ) : (
            "Kiểm tra kết quả"
          )}
        </button>
      )}
      {/* Hiệu ứng nền */}
      <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-200 rounded-full opacity-30 z-0"></div>
      <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-blue-300 rounded-full opacity-20 z-0"></div>
    </div>
  );
}