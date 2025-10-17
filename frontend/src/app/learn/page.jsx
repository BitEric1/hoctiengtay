"use client";

import { useStore } from "@/context/StoreCoursesContext";
import LeftNavbar from "@/components/LeftNavbar";
import RightNavbar from "@/components/RightNavbar";
import LessonButton from "@/components/LessionButton";
import { FaBookmark } from "react-icons/fa6";
import Loading from "./loading";

export default function Home() {
  const { data } = useStore();

  if (!data || data.length === 0) return <Loading />;

  return (
    <div className="lg:flex block lg:mt-20 mt-[120px] bg-[#f8faff] min-h-screen">
      <LeftNavbar />

      <main className="flex-1 h-full px-4 sm:px-6 md:px-10 lg:px-16 py-8">
        {data.map((unit) => (
          <section key={unit.id} className="mb-12">
            {/* Tiêu đề chương */}

            <div
              className="relative w-full rounded-2xl bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 
  text-white shadow-lg overflow-hidden py-5 flex items-center justify-center group transition-all duration-300 hover:shadow-2xl hover:scale-[1.01]"
            >
              {/* Hiệu ứng ánh sáng mờ nền */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_60%)] opacity-70 pointer-events-none"></div>

              {/* Viền sáng động */}
              <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white/40 transition-all duration-300"></div>

              {/* Nội dung chính */}
              <div className="relative flex items-center gap-3 text-center px-4">
                <div
                  className="p-3 rounded-full bg-white/20 backdrop-blur-sm 
      shadow-inner border border-white/30 flex items-center justify-center transition duration-300 group-hover:scale-110"
                >
                  <FaBookmark
                    size={24}
                    className="text-yellow-300 drop-shadow"
                  />
                </div>

                <h1 className="text-xl sm:text-2xl font-bold tracking-wide drop-shadow-sm">
                  {unit.title}
                </h1>
              </div>
            </div>

            {/* Danh sách bài học */}
            <ul
              className="mt-6 grid gap-2 sm:gap-4 md:gap-6
                        grid-cols-1 sm:grid-cols-2 lg:grid-cols-2
                        xl:grid-cols-2 place-items-center"
            >
              {unit.lessons.map((lesson) => (
                <li key={lesson.id} className="w-full max-w-[320px]">
                  <LessonButton lessons={lesson} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      <RightNavbar />
    </div>
  );
}
