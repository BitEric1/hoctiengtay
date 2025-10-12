"use client";
import LeftNavbar from "@/components/LeftNavbar";
import RightNavbar from "@/components/RightNavbar";
import React from "react";
import { toast } from "react-toastify";

const page = () => {
  const onSubmit = () => {
      // Xử lý dịch thuật ở đây
      toast.info("Chức năng này hiện đang phát triển! Cùng đón chờ nhé");
    }  
  return (
    <div className="w-full h-screen flex mt-20">
      <LeftNavbar />
      <div className="md:w-6/12 lg:w-7/12  py-4">
        <div className="max-w-md mx-auto my-10 bg-white shadow-lg rounded-xl p-8">
          <h2 className="text-2xl font-bold text-center text-blue-500 mb-6">
            Liên hệ với chúng tôi
          </h2>

          {/* Họ và tên */}
          <div className="relative mb-5">
            <label
              htmlFor="fullname"
              className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
            >
              Họ và tên
            </label>
            <input
              id="fullname"
              type="text"
              placeholder="Nhập họ và tên của bạn"
              className="w-full border-2 border-gray-300 rounded-md py-3 px-4 outline-none
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
            />
          </div>

          {/* Số điện thoại */}
          <div className="relative mb-5">
            <label
              htmlFor="phone"
              className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
            >
              Số điện thoại
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Nhập số điện thoại của bạn"
              className="w-full border-2 border-gray-300 rounded-md py-3 px-4 outline-none
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
            />
          </div>

          {/* Nội dung */}
          <div className="relative mb-6">
            <label
              htmlFor="message"
              className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
            >
              Nội dung
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="Nhập nội dung bạn muốn gửi..."
              className="w-full border-2 border-gray-300 rounded-md py-3 px-4 outline-none
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150 resize-none"
            />
          </div>

          {/* Nút gửi */}
          <button
            type="submit"
            onClick={onSubmit}
            className="w-full h-[50px] bg-blue-500 text-white font-bold rounded-lg
               shadow-[0_4px_0_#1e3a8a] hover:translate-y-[2px] hover:shadow-[0_2px_0_#1e3a8a]
               active:translate-y-[4px] active:shadow-none transition-all duration-150"
          >
            Gửi liên hệ
          </button>
        </div>
      </div>
      <RightNavbar />
    </div>
  );
};

export default page;
