"use client";
import { FaRibbon } from "react-icons/fa6";
import { BsTrophyFill } from "react-icons/bs";
import { FaMedal } from "react-icons/fa6";
import { AiFillStar } from "react-icons/ai";
const RightNavbar = () => {
  const progress = 0;

  return (
    <div className="hidden lg:block lg:w-3/12 min-h-screen px-6 py-4  border-l-[3px] border-blue-200 shadow-lg ">
      <div className="w-full  rounded-2xl border-2 border-gray-300 shadow-md p-4 mb-6">
        <h1 className="lg:text-3xl md:text-2xl font-bold">Tiến trình</h1>
        <div className="relative w-full bg-gray-200 h-4 my-4 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-l from-blue-400 to-blue-600"
            style={{ width: `${progress}%` }}
          ></div>
          <span className="absolute inset-0 flex items-center px-4 text-xs font-bold text-black/50">
            {progress}%
          </span>
        </div>
      </div>
      <div className="w-full  rounded-2xl bg-gray-100 shadow-md p-4 mb-6">
        <h1 className="lg:text-lg md:text-xl font-bold">Huy hiệu đạt được</h1>
        <div className="w-full py-4 flex flex-col gap-3">
            <p className="flex items-center gap-2"><FaRibbon size={20} className="text-[#FFD700]" /> Học viên mới </p>
            <p className="flex items-center gap-2"><BsTrophyFill size={20}  className="text-[#DAA520]" /> Tuần Đầu  </p>
            <p className="flex items-center gap-2"><FaMedal size={20} className="text-yellow-500" /> Suất sắc  </p>
            <p className="flex items-center gap-2"><AiFillStar size={20} className="text-yellow-500" /> Cơ bản  </p>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <AiFillStar size={20} className="text-yellow-500" />
                    <AiFillStar size={20} className="text-yellow-500" />
                </div> 
                <span>Phổ Thông</span> 
            </div>
            <div className="flex items-center gap-2">
                <div className="flex items-center gap-2">
                    <AiFillStar size={20} className="text-yellow-500" />
                    <AiFillStar size={20} className="text-yellow-500" />
                    <AiFillStar size={20} className="text-yellow-500" />
                </div>
                <span>Nâng Cao</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default RightNavbar;
