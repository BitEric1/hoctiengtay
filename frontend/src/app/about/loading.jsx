"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function Loading() {
  return (
    <div className="relative max-w-screen-xl  mt-[120px] mx-auto"> 
    <Skeleton  className="w-full" height={300}  baseColor="#e0edff"/>
    <Skeleton  borderRadius={12} className="w-full h-screen"  baseColor="#e0edff"/>
      
    </div>
  )
}

