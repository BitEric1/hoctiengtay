"use client";

import React, { useMemo } from "react";
import Link from "next/link";
import {
    FaRegHandPaper,
    FaBookOpen,
    FaRocket,
    FaStar,
    FaLightbulb,
    FaPuzzlePiece,
    FaFeatherAlt,
    FaLeaf,
    FaMusic,
    FaGlobeAmericas,
    FaLock,
} from "react-icons/fa";

function LessonButton({ lessons }) {
    const progress = lessons.progress ?? 0;
    const isDone = lessons.done ?? false;
    const isLocked = lessons.locked ?? false; // thêm prop locked

    // Danh sách icon để random
    const icons = [
        <FaRegHandPaper size={22} className="text-yellow-500" key="hand" />,
        <FaRocket size={22} className="text-pink-500" key="rocket" />,
        <FaStar size={22} className="text-yellow-400" key="star" />,
        <FaLightbulb size={22} className="text-amber-400" key="light" />,
        <FaPuzzlePiece size={22} className="text-green-500" key="puzzle" />,
        <FaFeatherAlt size={22} className="text-sky-400" key="feather" />,
        <FaLeaf size={22} className="text-emerald-500" key="leaf" />,
        <FaMusic size={22} className="text-indigo-400" key="music" />,
        <FaGlobeAmericas size={22} className="text-blue-500" key="globe" />,
    ];

    // Chọn 1 icon random cố định cho mỗi render
    const randomIcon = useMemo(
        () => icons[Math.floor(Math.random() * icons.length)],
        []
    );

    return (
        <div
            className={`w-full bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex flex-col gap-2 transition hover:shadow-md ${isLocked ? "opacity-60 grayscale pointer-events-none" : ""
                }`}
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div>{isLocked ? <FaLock size={22} className="text-gray-400" /> : randomIcon}</div>
                    <div>
                        <h3 className="text-sm font-semibold text-gray-800">
                            {lessons.title}
                        </h3>
                        <p className="text-xs text-gray-500">
                            {isLocked
                                ? "Chưa mở khóa"
                                : isDone
                                    ? "Hoàn thành"
                                    : "Chưa hoàn thành"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Progress bar */}
            <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden relative">
                <div
                    className={`absolute top-0 left-0 h-full transition-all duration-300 ${isLocked ? "bg-gray-300" : "bg-blue-500"
                        }`}
                    style={{ width: `${progress}%` }}
                ></div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-600 mt-1">
                <div className="flex items-center gap-1">
                    <FaBookOpen size={14} className="text-gray-400" />
                    <span>{progress}% hoàn thành</span>
                </div>

                {isLocked ? (
                    <button
                        disabled
                        className="bg-gray-200 text-gray-500 text-xs px-3 py-1 rounded-md cursor-not-allowed"
                    >
                        Khóa
                    </button>
                ) : (
                    <Link
                        href={`/learn/${lessons.slug}`}
                        className="cst_btn-primary text-xs px-3 py-1 rounded-md"
                    >
                        {isDone ? "Ôn lại" : "Bắt đầu"}
                    </Link>
                )}
            </div>
        </div>
    );
}

export default LessonButton;
