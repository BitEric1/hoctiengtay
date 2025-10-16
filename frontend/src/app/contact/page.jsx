"use client";
import LeftNavbar from "@/components/LeftNavbar";
import RightNavbar from "@/components/RightNavbar";
import React from "react";
import { toast } from "react-toastify";

const page = () => {
  const onSubmit = () => {
    // Xử lý dịch thuật ở đây
    toast.success("Cảm ơn phản hồi của bạn");
  }
  return (
    <div className="w-full h-screen flex lg:mt-20 mt-[120px]">
      <LeftNavbar />
      <div className="w-full   py-4">
        <div className="w-full lg:w-5/12 mx-auto my-10 bg-white shadow-lg rounded-xl py-8 px-4">
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
              type="text"
              placeholder="Nhập số điện thoại của bạn"
              className="w-full border-2 border-gray-300 rounded-md py-3 px-4 outline-none
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-150"
            />
          </div>
          {/* Email */}
          <div className="relative mb-5">
            <label
              htmlFor="phone"
              className="absolute left-4 -top-2 bg-white px-1 text-sm text-gray-600 font-semibold"
            >
              Email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Nhập Email của bạn"
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
          <div className="w-full flex items-center justify-center">
            <button
              type="submit"
              onClick={onSubmit}
              className="cst_btn-primary"
            >
              Gửi liên hệ
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default page;
