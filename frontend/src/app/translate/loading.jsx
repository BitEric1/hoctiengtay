"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FaBookmark } from "react-icons/fa6";

export default function Loading() {
  return (
    <div className="lg:flex block lg:mt-20 mt-[120px] animate-pulse h-screen">
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
      <div className="w-full lg:w-10/12 h-full lg:px-24 py-6 md:px-4">
        <Skeleton className="w-full " height={500}  borderRadius={8} baseColor="#e0edff"
          highlightColor="#f5f9ff"/>
      </div>

      
      
    </div>
  );
}
