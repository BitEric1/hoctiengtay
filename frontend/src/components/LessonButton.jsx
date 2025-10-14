"use client"

import { FaStar } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";
import { MdMenuBook } from "react-icons/md";

function LessonButton({ lessons }) {
  const [activeLesson, setActiveLesson] = useState(null);
  const progress = 0;
  const currentLesson = activeLesson === lessons.id ? lessons : null;

  return (
    <>
      {/* Bọc nút và tooltip trong group */}
      <div className="relative group flex items-center justify-center">
        {/* Nút mở modal */}
        <button
          className="cst_btn w-full flex items-center justify-between gap-4 py-4"
          onClick={() => setActiveLesson(lessons.id)}
        >
          <MdMenuBook size={30} />
          <div className="relative w-full bg-gray-100 h-4 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-l from-blue-400 via-blue-500 to-blue-600 "
            style={{ width: `${progress}%` }}
          ></div>
          <span className=" text-black/85 absolute inset-0 flex items-center justify-end px-4 text-xs font-bold  border-[1.8px] border-gray-300">
            {progress}%
          </span>
        </div>
        </button>

        
      </div>

      {/* Modal xác nhận */}
      {currentLesson && (
        <div
          className="fixed inset-0 bg-black/15 z-50"
          onClick={() => setActiveLesson(null)}
        >
          <div
            className="mt-[300px] mx-auto w-[280px] h-[200px] bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4 animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-semibold text-gray-700">
              {currentLesson.done
                ? `Ôn lại bài học ${currentLesson.id}?`
                : `Bắt đầu bài học ${currentLesson.id}?`}
            </h2>
            <p className="text-sm">
              {lessons.title}
            </p>
            <div className="flex items-center gap-1">
            {[...Array(3)].map((_, i) => (
              <FaStar
                key={i}
                size={16}
                className={`${
                  i < (lessons.stars || 0) ? "text-yellow-400" : "text-gray-300"
                }`}
              />
            ))}
          </div>
            
            <div className="flex items-center justify-center gap-4">
              <button
                className="cst_btn"
                onClick={() => setActiveLesson(null)}
              >
                Quay lại
              </button>

              <Link
                href={`/learn/${lessons.slug}`}
                className="cst_btn-primary"
              >
                {currentLesson.done ? "Ôn lại" : "Bắt đầu"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LessonButton;
