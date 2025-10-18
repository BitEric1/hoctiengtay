"use client";
import { useStore } from "@/context/StoreCoursesContext";
import { useEffect, useMemo, useState } from "react";
import { AiFillStar } from "react-icons/ai";
import { BsTrophyFill } from "react-icons/bs";
import { FaMedal, FaRibbon } from "react-icons/fa6";
import { IoMdFlame } from "react-icons/io";

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5500/api/v1";
const USER_ID = 1; // tạm thời

export default function RightNavbar() {
    const { data, loading } = useStore();

    // ===== 1) Tổng tiến trình (lấy từ danh sách bài) =====
    const overall = useMemo(() => {
        if (loading || !Array.isArray(data)) return 0;
        const allLessons = data.flatMap((u) => u.lessons || []);
        if (!allLessons.length) return 0;
        const total = allLessons.reduce(
            (sum, l) => sum + (Number(l.progress) || 0),
            0
        );
        return Math.round(total / allLessons.length);
    }, [data, loading]);

    // ===== 2) Mục tiêu hôm nay (API /users/:id/daily) =====
    const [daily, setDaily] = useState({
        target: 5,
        doneToday: 0,
        percent: 0,
        streakCurrent: 0,
        loading: true,
        error: null,
    });

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                const res = await fetch(`${API_BASE}/users/${USER_ID}/daily`);
                if (!res.ok) throw new Error(`daily -> ${res.status}`);
                const json = await res.json();
                if (!alive) return;
                setDaily({
                    target: Number(json.target) || 5,
                    doneToday: Number(json.doneToday) || 0,
                    percent: Math.min(Number(json.percent) || 0, 100),
                    streakCurrent: Number(json.streakCurrent) || 0,
                    loading: false,
                    error: null,
                });
            } catch (e) {
                if (!alive) return;
                setDaily((d) => ({ ...d, loading: false, error: e }));
                console.error(e);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    return (
        <aside className="hidden lg:block lg:w-3/12 min-h-screen px-6 py-6 border-l-[3px] border-blue-100 bg-[#f9fbff] space-y-6">
            {/* Tiến trình */}
            <div className="w-full bg-white rounded-2xl border border-blue-100 shadow-sm p-5 transition hover:shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-between">
                    <span>Tiến trình</span>
                    <span className="text-sm font-semibold text-blue-600">
                        {overall}%
                    </span>
                </h2>

                <div className="relative w-full bg-gray-200 h-3 rounded-full overflow-hidden">
                    <div
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-blue-700 transition-all duration-500"
                        style={{ width: `${overall}%` }}
                    />
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                    {overall >= 100
                        ? "Tuyệt vời! Bạn đã hoàn thành toàn bộ nội dung 👏"
                        : "Học đều tay nhé, bạn sắp chạm mốc mới rồi!"}
                </p>
            </div>

            {/* Mục tiêu hôm nay */}
            <div className="w-full bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl border border-blue-200 shadow-sm p-5">
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        <IoMdFlame size={28} className="text-orange-500" />
                        <h2 className="text-lg font-bold text-gray-800">
                            Mục tiêu hôm nay
                        </h2>
                    </div>
                    {!daily.loading && (
                        <span className="text-xs text-gray-500">
                            🔥 Streak: <b>{daily.streakCurrent}</b>
                        </span>
                    )}
                </div>

                <div className="w-full flex items-center justify-between mb-2">
                    <p className="text-sm text-gray-600">Hoàn thành bài học:</p>
                    <p className="text-sm font-semibold text-blue-600">
                        {daily.doneToday}/{daily.target}
                    </p>
                </div>

                <div className="relative w-full bg-gray-200 h-3 rounded-full overflow-hidden mb-3">
                    <div
                        className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-yellow-500 transition-all duration-500"
                        style={{
                            width: `${daily.loading ? 0 : daily.percent}%`,
                        }}
                    />
                </div>

                <p className="text-xs text-gray-500">
                    {daily.loading
                        ? "Đang đồng bộ mục tiêu..."
                        : daily.error
                        ? "Không lấy được dữ liệu mục tiêu."
                        : daily.doneToday >= daily.target
                        ? "Xuất sắc! Bạn đã hoàn thành mục tiêu ngày hôm nay 🎉"
                        : "Duy trì streak mỗi ngày để giữ phong độ học tập nhé!"}
                </p>
            </div>

            {/* Huy hiệu đạt được (demo tĩnh) */}
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
                            <BsTrophyFill
                                size={20}
                                className="text-amber-600"
                            />
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
}
