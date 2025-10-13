import React, { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";
import { FaStar } from "react-icons/fa";
import Link from "next/link";

function LessonButton({ lessons }) {
  const [activeLesson, setActiveLesson] = useState(null);

  const currentLesson = activeLesson === lessons.id ? lessons : null;

  return (
    <>
      {/* Bọc nút và tooltip trong group */}
      <div className="relative group inline-block">
        {/* Nút mở modal */}
        <button
          className="cst_btn-primary w-[120px] flex items-center justify-center"
          onClick={() => setActiveLesson(lessons.id)}
        >
          <GiWhiteBook size={30} />
        </button>

        {/* Tooltip bài học */}
        <div
          className="absolute left-[130px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 
          shadow-lg rounded-xl w-[150px] lg:w-[270px] py-3 px-4 opacity-0 group-hover:opacity-100 
          group-hover:translate-x-2 transition-all duration-200 pointer-events-auto z-20"
        >
          <h3 className="text-gray-800 font-semibold text-sm lg:text-xl mb-2">
            {lessons.title || `Bài học ${lessons.id}`}
          </h3>
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
        </div>
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
