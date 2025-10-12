"use client";
import LeftNavbar from "@/components/LeftNavbar";
import RightNavbar from "@/components/RightNavbar";
import React from "react";
import { toast } from "react-toastify";



const page = () => {

  const handleTranslate = () => {
    // Xử lý dịch thuật ở đây
    toast.info("Chức năng này hiện đang phát triển! Cùng đón chờ nhé");
  }  


  return (
    <div className="w-full h-screen flex items-center mt-20">
      <LeftNavbar />
      <div className="md:w-6/12 lg:w-7/12  h-full py-4 px-9">
        <div className="my-4 relative">
          {/* Label */}
          <label
            htmlFor="textTay"
            className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
          >
            Tiếng Tày
          </label>

          {/* Textarea */}
          <textarea
            id="textTay"
            className="w-full h-[200px] border-2 border-gray-300 rounded-md py-3 px-4 
               outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
               transition-all duration-150 resize-none"
            placeholder="Nhập văn bản cần dịch..."
          />
        </div>
        <div className="my-4 relative">
          {/* Label */}
          <label
            htmlFor="textTay"
            className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
          >
            Tiếng Việt
          </label>

          {/* Textarea */}
          <textarea
            id="textTay"
            className="w-full h-[200px] border-2 border-gray-300 rounded-md py-3 px-4 
               outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 
               transition-all duration-150 resize-none"
            placeholder="Nhập văn bản cần dịch..."
          />
        </div>

        
        <div className="flex justify-end" >
          <button onClick={handleTranslate} className="cst_btn-primary w-[180px] h-[48px]">Dịch</button>
        </div>
      </div>
      <RightNavbar />
    </div>
  );
};

export default page;
