"use client";
import React, { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/context/StoreCoursesContext";

import WriteAnswer from "@/features/questionTypes/WriteAnswer";
import CardQuestion from "@/features/questionTypes/CardQuestion";
import MatchQuestion from "@/features/questionTypes/MatchQuestion";
import ChoiceAudio from "@/features/questionTypes/ChoiceAudio";
import ChoiceQuestion from "@/features/questionTypes/ChoiceQuestion";
import FillInTheBlank from "@/features/questionTypes/FillInTheBlank";
import Arrange from "@/features/questionTypes/Arrange";
import WriteSentence from "@/features/questionTypes/WriteSentence";
import CompletePopup from "./CompletePopup";
import Link from "next/link";



function QuestionPart({ lessons, slug }) {
  const router = useRouter();
  const { data } = useStore();
  const [currentPartIndex, setCurrentPartIndex] = useState(0);

  // Chọn bài học theo slug (nếu có)
  const currentLesson = useMemo(() => {
    if (slug && data?.length) {
      // Tìm lesson theo slug trong tất cả các unit
      for (const unit of data) {
        const found = unit.lessons?.find(
          (lesson) =>
            lesson.slug === `/${slug}` || // so sánh cả dạng có dấu /
            lesson.slug === slug ||
            (lesson.slug && lesson.slug.replace(/^\//, "") === slug)
        );
        if (found) return found;
      }
      return null;
    }
    return lessons || null;
  }, [slug, data, lessons]);

  // Làm phẳng danh sách câu hỏi
  const questionParts = useMemo(() => {
    if (!currentLesson) return [];

    // Dạng dữ liệu 1: lessons có field questions
    if (currentLesson.questions) {
      return currentLesson.questions.flatMap((item) =>
        item.types.map((type) => ({
          type,
          data: item.questions || [],
        }))
      );
    }

    // Dạng dữ liệu 2: lesson có types và question
    if (currentLesson.types) {
      return currentLesson.types.map((type, idx) => ({
        id: idx + 1,
        type,
        data: currentLesson.question || [],
      }));
    }

    return [];
  }, [currentLesson]);

  const currentPart = questionParts[currentPartIndex];

  const handlePartComplete = () => {
    if (currentPartIndex < questionParts.length - 1) {
      setCurrentPartIndex((prev) => prev + 1);
    } else if (slug) {
      router.push("/learn");
    }
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

  const typeToComponentMap = {
    Card: CardQuestion,
    ChoiceQuestion: ChoiceQuestion,
    ChoiceAudio: ChoiceAudio,
    FillInTheBlank: FillInTheBlank,
    WriteAnswer: WriteAnswer,
    MatchQuestion: MatchQuestion,
    Arrange: Arrange,
    WriteSentence: WriteSentence,
  };

  const Component = typeToComponentMap[currentPart.type];

  return (
    <div className="p-5">
      <div className="flex justify-start">
        <Link href="/learn" className="cst_btn-danger">
          Thoát
        </Link>
      </div>
      {Component ? (
        <Component
          questionData={currentPart.data}
          onComplete={handlePartComplete}
        />
      ) : (
        <p>Không thể tải được câu hỏi.</p>
      )}
    </div>
  );
}

export default QuestionPart;
