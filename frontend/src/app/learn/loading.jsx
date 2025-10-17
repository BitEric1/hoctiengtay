"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaBookmark } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="lg:flex block lg:mt-20 mt-[120px] bg-[#f8faff] min-h-screen animate-pulse">
      {/* Left Navbar placeholder */}
      <aside className="hidden lg:block w-2/12 py-6 px-4 border-r-[3px] border-blue-200">
        <Skeleton
          count={6}
          height={50}
          className="mb-3"
          baseColor="#e0edff"
          highlightColor="#f5f9ff"
        />
      </aside>

      {/* Main content */}
      <main className="flex-1 px-4 sm:px-6 md:px-10 lg:px-16 py-8">
        {[1, 2, 3].map((i) => (
          <section key={i} className="mb-12">
            {/* Unit header */}
            <div className="w-full bg-gradient-to-l from-blue-300 to-blue-500 text-white rounded-xl py-3 shadow-md flex items-center justify-center">
              <div className="flex items-center gap-3">
                <FaBookmark size={26} className="opacity-70" />
                <Skeleton
                  width={160}
                  height={26}
                  baseColor="#4b9af5"
                  highlightColor="#73b7ff"
                  borderRadius={6}
                />
              </div>
            </div>

            {/* Lesson cards */}
            <ul
              className="mt-6 grid gap-4 sm:gap-6 md:gap-8 
                         grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 
                         xl:grid-cols-3 place-items-center"
            >
              {[1, 2, 3, 4].map((j) => (
                <li key={j} className="w-full max-w-[320px]">
                  <Skeleton
                    height={90}
                    borderRadius={12}
                    baseColor="#e0edff"
                    highlightColor="#f5f9ff"
                  />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </main>

      {/* Right Navbar placeholder */}
      <aside className="hidden lg:block w-3/12 px-6 py-4 border-l-[3px] border-blue-200">
        <Skeleton
          height={40}
          width={120}
          className="mb-4"
          baseColor="#e0edff"
          highlightColor="#f5f9ff"
        />
        {[1, 2, 3].map((i) => (
          <Skeleton
            key={i}
            height={180}
            className="w-full mb-4 rounded-xl"
            baseColor="#e0edff"
            highlightColor="#f5f9ff"
          />
        ))}
      </aside>
    </div>
  );
}
