"use client";
import { useState } from "react";
import { useStore } from "@/context/StoreCoursesContext";

import { GiWhiteBook } from "react-icons/gi";
import { FaBookmark, FaStar } from "react-icons/fa";
import LeftNavbar from "@/components/LeftNavbar";
import Link from "next/link";
import RightNavbar from "@/components/RightNavbar";

export default function Home() {
  const [activeLesson, setActiveLesson] = useState(null);
  const { data } = useStore();

  const currentLesson = data.find((d) => d.id === activeLesson);

  return (
    <div className="lg:flex block mt-20">
      <LeftNavbar />
      <div className="sm:w-full md:w-6/12 lg:w-7/12 h-full  lg:px-24 pb-6 px-4 mt-24">
        {/* Chương */}
        <div className="w-full bg-gradient-to-t from-blue-400 to-blue-600 text-white shadow-md rounded-xl p-4 flex items-center justify-center mt-5">
          <div className="flex items-center justify-center gap-3 mb-2">
            <FaBookmark size={30} />
            <h1 className="text-3xl font-bold">Chương 1</h1>
          </div>
        </div>

        {/* Danh sách bài */}
        <div className="flex flex-col pl-5 gap-4 relative mt-8">
          {data.map((item) => (
            <div key={item.id} className="relative group">
              <button
                onClick={() => setActiveLesson(item.id)}
                className={`${
                  item.done
                    ? "cst_btn-rounded-disable"
                    : "cst_btn-primary"
                }  w-[120px] flex items-center justify-center relative`}
              >
                <GiWhiteBook size={30} />
              </button>

              {/* Tooltip */}
              <div
                className="absolute left-[130px] top-1/2 -translate-y-1/2 bg-white border border-gray-200 
                            shadow-lg rounded-xl w-[150px] lg:w-[270px] py-3 px-4 opacity-0 group-hover:opacity-100 
                            group-hover:translate-x-2 transition-all duration-200 pointer-events-none"
              >
                <h3 className="text-gray-800 font-semibold text-sm lg:text-xl  mb-2">
                  {item.title || `Bài học ${item.id}`}
                </h3>

                <div className="flex items-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={16}
                      className={`${
                        i < (item.stars || 0)
                          ? "text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overlay chọn bài */}
        {currentLesson && (
          <div
            className="fixed inset-0 bg-black/15  z-50"
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
                <button className="cst_btn" onClick={() => setActiveLesson(null)}>
                  Quay lại
                </button>
                <Link
                  href={`/learn/${currentLesson.slug || `bai-${currentLesson.id}`}`}
                  className="cst_btn-primary"
                >
                  {currentLesson.done ? "Ôn lại" : "Bắt đầu"}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      <RightNavbar />
    </div>
  );
}
