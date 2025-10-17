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
            <div className="w-full bg-gradient-to-l from-blue-400 to-blue-600 text-white shadow-md rounded-xl py-3 flex items-center justify-center">
              <div className="flex items-center gap-3">
                <FaBookmark size={26} />
                <h1 className="text-lg sm:text-xl lg:text-2xl font-semibold">
                  {unit.title}
                </h1>
              </div>
            </div>

            {/* Danh sách bài học */}
            <ul
              className="mt-6 grid gap-4 sm:gap-6 md:gap-8
                        grid-cols-1 sm:grid-cols-2 lg:grid-cols-2
                        xl:grid-cols-3 place-items-center"
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
