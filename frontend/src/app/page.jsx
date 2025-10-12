import { useAuth } from "@/context/authContext";
import Link from "next/link";
import React from "react";

const page = () => {
  
  return (
    <div className="w-full mt-20">
      <div className="max-w-screen-xl mx-auto h-full flex">
        <div className="w-1/2"></div>
        <div className="w-1/2 px-12 pt-20">
          <div>
            <p className="text-2xl text-center text-gray-700 font-bold mb-2">
              Chào mừng bạn đến với{" "}
              <span className="text-blue-400">HoctiengTày.edu</span>{" "}
            </p>
            <p className="text-2xl text-center text-gray-700 font-bold mb-2">
              vừa học vừa chơi 
            </p>
          </div>
          <div className="flex flex-col items-center justify-center mt-20 gap-4">
            <Link
              href="/learn"
              className="cst_btn-primary block w-[330px] h-[56px]  text-center "
            >
              Bắt đầu học
            </Link>
            {/* <Link
              href="/register"
              className="cst_btn block  w-[330px] h-[56px] leading-[35px] text-center"
            >
              Tôi chưa có tài khoản
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
