"use client";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Sparkles, BookOpen, MapPinned, Users } from "lucide-react";
import Header from "@/components/Header";

export default function Loading() {
  return (
    <div className="relative max-w-screen-xl  mt-[120px] mx-auto"> 
    <Skeleton  className="w-full h-20" baseColor="#e0edff"/>
    <Skeleton  borderRadius={12} className="w-full h-screen"  baseColor="#e0edff"/>
      
    </div>
  )
}

