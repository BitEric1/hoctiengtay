"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaBookmark } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="lg:flex block lg:mt-20 mt-[120px] animate-pulse">
      {/* Left Navbar placeholder */}
      <div className="hidden lg:block md:w-3/12 lg:w-2/12 py-6 border-r-[3px] border-blue-200 px-4">
        <Skeleton
          count={6}
          height={50}
          className="mb-3"
          baseColor="#e0edff"
          highlightColor="#f5f9ff"
        />
      </div>

      {/* Main content */}
      <div className="sm:w-full md:w-full lg:w-7/12 h-full lg:px-24 py-6 md:px-4">
        {[1, 2, 3].map((i) => (
          <div className="w-full p-4" key={i}>
            {/* Unit Header */}
            <div className="w-full bg-gradient-to-l from-blue-300 to-blue-500 text-white shadow-md rounded-xl p-4 flex items-center justify-center mt-1">
              <div className="flex items-center justify-center gap-3 mb-2">
                <FaBookmark size={28} className="opacity-80" />
                <Skeleton
                  width={180}
                  height={28}
                  baseColor="#4b9af5"
                  highlightColor="#73b7ff"
                  borderRadius={6}
                />
              </div>
            </div>

            {/* Lessons Skeleton */}
            <ul className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-x-10 lg:gap-x-24 gap-y-4 mt-6">
              {[1, 2, 3, 4].map((j) => (
                <li key={j} className="mb-2">
                  <Skeleton
                    height={60}
                    borderRadius={10}
                    baseColor="#e0edff"
                    highlightColor="#f5f9ff"
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Right Navbar placeholder */}
      <div className="hidden lg:block lg:w-3/12 min-h-screen px-6 py-4 border-l-[3px] border-blue-200 shadow-lg">
        <Skeleton
          count={4}
          height={200}
          className="w-full mb-3"
          baseColor="#e0edff"
          highlightColor="#f5f9ff"
        />
      </div>
    </div>
  );
}
