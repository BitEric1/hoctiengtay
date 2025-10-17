"use client";
import { FaRibbon, FaMedal } from "react-icons/fa6";
import { BsTrophyFill } from "react-icons/bs";
import { AiFillStar } from "react-icons/ai";
import { IoMdFlame } from "react-icons/io";

const RightNavbar = () => {
  const progress = 25; // ví dụ
  const lessonsDone = 0;
  const dailyGoal = 5;

  return (
    <aside className="hidden lg:block lg:w-3/12 min-h-screen px-6 py-6 border-l-[3px] border-blue-100 bg-[#f9fbff] space-y-6">
      {/* Tiến trình */}
      <div className="w-full bg-white rounded-2xl border border-blue-100 shadow-sm p-5 transition hover:shadow-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between">
          <span>Tiến trình</span>
          <span className="text-sm font-semibold text-blue-600">{progress}%</span>
        </h2>

        <div className="relative w-full bg-gray-200 h-3 rounded-full overflow-hidden">
          <div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <p className="text-xs text-gray-500 mt-3 text-center">
          Học đều tay nhé, bạn sắp chạm mốc mới rồi!
        </p>
      </div>
      {/* Mục tiêu hôm nay */}
      <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-sm p-5 flex flex-col items-start justify-center">
        <div className="flex items-center gap-3 mb-3">
          <IoMdFlame size={28} className="text-orange-500" />
          <h2 className="text-lg font-bold text-gray-800">Mục tiêu hôm nay</h2>
        </div>

        <div className="w-full flex items-center justify-between mb-2">
          <p className="text-sm text-gray-600">Hoàn thành bài học:</p>
          <p className="text-sm font-semibold text-blue-600">
            {lessonsDone}/{dailyGoal}
          </p>
        </div>

        <div className="relative w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-3">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-yellow-500 transition-all duration-500"
            style={{
              width: `${Math.min((lessonsDone / dailyGoal) * 100, 100)}%`,
            }}
          ></div>
        </div>

        <p className="text-xs text-gray-500">
          Duy trì streak mỗi ngày để giữ phong độ học tập nhé!
        </p>
      </div>
      {/* Huy hiệu đạt được */}
      <div className="w-full bg-white rounded-2xl border border-blue-100 shadow-sm p-5 transition hover:shadow-md">
        <h2 className="text-lg font-bold text-gray-800 mb-4">
          Huy hiệu đạt được
        </h2>

        <ul className="flex flex-col gap-3 text-sm text-gray-700">
          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaRibbon size={20} className="text-yellow-500" />
              <span>Học viên mới</span>
            </div>
            <span className="text-[11px] px-2 py-1 rounded-md bg-yellow-100 text-yellow-700 font-semibold">
              Đã đạt
            </span>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsTrophyFill size={20} className="text-amber-600" />
              <span>Tuần đầu</span>
            </div>
            <span className="text-[11px] px-2 py-1 rounded-md bg-amber-100 text-amber-700 font-semibold">
              Đã đạt
            </span>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FaMedal size={20} className="text-orange-500" />
              <span>Xuất sắc</span>
            </div>
            <span className="text-[11px] px-2 py-1 rounded-md bg-orange-100 text-orange-700 font-semibold">
              Đã đạt
            </span>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AiFillStar size={20} className="text-yellow-400" />
              <span>Cơ bản</span>
            </div>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <AiFillStar size={18} className="text-yellow-400" />
              <AiFillStar size={18} className="text-yellow-400" />
              <span className="ml-1">Phổ thông</span>
            </div>
          </li>

          <li className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <AiFillStar size={18} className="text-yellow-400" />
              <AiFillStar size={18} className="text-yellow-400" />
              <AiFillStar size={18} className="text-yellow-400" />
              <span className="ml-1">Nâng cao</span>
            </div>
          </li>
        </ul>
      </div>

      
    </aside>
  );
};

export default RightNavbar;
