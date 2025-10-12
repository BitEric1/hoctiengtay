"use client";
import { useStore } from "@/context/StoreCoursesContext";
import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";

import CompletePopup from "./CompletePopup";
import CardQuestion from "@/features/questionTypes/CardQuestion";
import ChoiceQuestion from "@/features/questionTypes/ChoiceQuestion";
import ChoiceAudio from "@/features/questionTypes/ChoiceAudio";
import FillInTheBlank from "@/features/questionTypes/FillInTheBlank";
import WriteAnswer from "@/features/questionTypes/WriteAnswer";
import MatchQuestion from "@/features/questionTypes/MatchQuestion";

function QuestionPart({ slug }) {
  const { data } = useStore();
  const router = useRouter();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  // Lấy đúng bài học theo slug (nếu có)
  const currentLesson = useMemo(() => {
    if (slug) {
      return data.find(
        (item) =>
          item.slug === slug ||
          (item.slug && item.slug.toLowerCase() === slug.toLowerCase())
      );
    }
    return null;
  }, [slug, data]);

  // Nếu có slug, chỉ lấy các loại câu hỏi của bài học đó
  const questionParts = useMemo(() => {
    const lesson = currentLesson || data[0];
    if (!lesson) return [];
    return lesson.types.map((type, idx) => ({
      id: idx + 1,
      type,
      data: lesson.question || [],
    }));
  }, [currentLesson, data]);

  // Nếu không có slug, lấy toàn bộ các loại câu hỏi như cũ (nếu muốn)
  // (Có thể bỏ qua nếu chỉ học theo từng bài)

  const currentPart = questionParts[currentPartIndex];

  // Khi hoàn thành phần học
  const handlePartComplete = () => {
    if (slug) {
      if (currentPartIndex < questionParts.length - 1) {
        setCurrentPartIndex((prev) => prev + 1);
      } else {
        router.push("/learn");
      }
      return;
    }
    setCurrentPartIndex((prev) => prev + 1);
  };

  if (!currentPart || !currentPart.data?.length) {
    return (
      <div className="text-center text-gray-500 mt-20">
        Không tìm thấy nội dung cho phần học này.
      </div>
    );
  }

  if (currentPartIndex >= questionParts.length) {
    return <CompletePopup />;
  }

  const renderCurrentPart = () => {
    const ComponentMap = {
      card: <CardQuestion questionData={currentPart.data} onComplete={handlePartComplete} />,
      choiceQuestion: <ChoiceQuestion questionData={currentPart.data} onComplete={handlePartComplete} />,
      choiceAudio: <ChoiceAudio questionData={currentPart.data} onComplete={handlePartComplete} />,
      FillInTheBlank: <FillInTheBlank questionData={currentPart.data} onComplete={handlePartComplete} />,
      writeAnswer: <WriteAnswer questionData={currentPart.data} onComplete={handlePartComplete} />,
      matchQuestion: <MatchQuestion questionData={currentPart.data} onComplete={handlePartComplete} />,
    };
    return ComponentMap[currentPart.type] || <p>Không thể tải được câu hỏi.</p>;
  };

  return <div className="p-5">{renderCurrentPart()}</div>;
}

export default QuestionPart;