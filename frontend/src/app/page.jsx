"use client";
import { useState } from "react";
import { GiWhiteBook } from "react-icons/gi";
import { FaBookmark } from "react-icons/fa";
import Navbar from "@/components/Navbar";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";

const data = [
  { id: 1, done: true, href: "/bai1" },
  { id: 2, done: false, href: "/bai2" },
];

export default function Home() {
  const [activeLesson, setActiveLesson] = useState(null);
  const progress = 36;

  // lấy bài học hiện tại
  const currentLesson = data.find((d) => d.id === activeLesson);

  return (
    <div className="w-full h-screen flex items-center">
      <Navbar />
      <div className="w-10/12 h-full px-4 pb-6">
        {/* Khung chương + progress */}
        <div className="bg-white shadow-md rounded-xl p-4 flex items-center">
          <div className="w-5/6 h-full">
            <div className="flex items-center gap-2 mb-2">
              <FaBookmark size={24} className="text-blue-500" />
              <h1 className="text-xl font-bold">Chương 1</h1>
            </div>
            <div className="relative w-full bg-gray-200 h-4 rounded-full overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-400 to-blue-600"
                style={{ width: `${progress}%` }}
              ></div>
              <span className="absolute inset-0 flex items-center px-4 text-xs font-medium text-white">
                {progress}%
              </span>
            </div>
          </div>
          <div className="w-1/6 h-full flex items-center justify-end">
            <UserButton showName />
          </div>
        </div>

        {/* Danh sách nút */}
        <div className="flex flex-col gap-4 items-center relative mt-4">
          {data.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveLesson(item.id)}
              className={item.done ? "ct__btn-disable" : "ct__btn"}
            >
              <GiWhiteBook size={30} className="mx-auto" />
            </button>
          ))}
        </div>

        {/* Overlay + Card */}
        {currentLesson && (
          <div
            className="fixed inset-0 bg-black/15 flex items-center justify-center z-50"
            onClick={() => setActiveLesson(null)}
          >
            <div
              className="w-[260px] h-[160px] bg-white border border-gray-200 rounded-xl shadow-lg flex flex-col items-center justify-center gap-4 animate-fadeIn"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-lg font-semibold text-gray-700">
                {currentLesson.done
                  ? `Ôn lại bài học ${currentLesson.id}?`
                  : `Bắt đầu bài học ${currentLesson.id}?`}
              </h2>
              <Link
                href={currentLesson.href}
                className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-[0_4px_0_#1e3a8a] active:translate-y-[2px] active:shadow-none transition"
              >
                {currentLesson.done ? "Ôn lại" : "Bắt đầu"}
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
