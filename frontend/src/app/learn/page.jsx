"use client";

import { useStore } from "@/context/StoreCoursesContext";
import LeftNavbar from "@/components/LeftNavbar";

import RightNavbar from "@/components/RightNavbar";
import { FaBookmark } from "react-icons/fa6";
import LessonButton from "@/components/LessonButton";

export default function Home() {
  const { data } = useStore();
  if (!data || data.length === 0) {
    return <Loading />;
  }
  return (
    <div className="lg:flex block lg:mt-20 mt-[120px]">
      <LeftNavbar />
      <div className="sm:w-full md:w-full  lg:w-7/12 h-full  lg:px-24 py-6 md:px-4 ">
        {data.map((unit) => (
          <div className="w-full p-4" key={unit.id}>
            <div
              className="w-full bg-gradient-to-l from-blue-400 to-blue-600 text-white shadow-md rounded-xl p-4 flex items-center justify-center mt-1">
              <div className="flex items-center justify-center gap-3 mb-2">
                <FaBookmark size={30} />
                <h1 className="text-xl lg:text-3xl font-bold">{unit.title}</h1>
              </div>
            </div>

            <ul className="w-full grid grid-cols-1 md:grid-cols-2  lg:grid-cols-2 gap-x-10 md:gap-x-20  lg:gap-x-10 gap-y-4  mt-6 px-20  md:px-20 lg:px-10">
              {unit.lessons.map((lesson) => (
                <li key={lesson.id} className="mb-2">
                  <LessonButton
                    lessons={lesson}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <RightNavbar />
    </div>
  );
}
