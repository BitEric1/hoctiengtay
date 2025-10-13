// File: CoursesPage.jsx
// Trang Courses — nền sáng (trắng), card trắng, có giá/giảm giá; điều hướng sang CourseDetailPage

"use client";
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    Layers,
    Search,
    SlidersHorizontal,
    Star,
    Users,
} from "lucide-react";
import { useMemo, useState } from "react";

/** Utils: format tiền VND + % giảm */
function formatVND(amount) {
    if (amount === 0 || amount == null || Number.isNaN(amount))
        return "Miễn phí";
    try {
        return new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
        }).format(amount);
    } catch {
        return `${Number(amount || 0).toLocaleString("vi-VN")} đ`;
    }
}
function discountPercent(price, compareAt) {
    if (!price || !compareAt || compareAt <= price) return 0;
    return Math.round(((compareAt - price) / compareAt) * 100);
}

// Danh mục & cấp độ
const CATEGORIES = [
    { key: "all", label: "Tất cả" },
    { key: "phonetics", label: "Phát âm" },
    { key: "vocab", label: "Từ vựng" },
    { key: "grammar", label: "Ngữ pháp" },
    { key: "conversation", label: "Hội thoại" },
    { key: "culture", label: "Văn hoá" },
    { key: "songs", label: "Bài hát" },
];
const LEVELS = [
    { key: "beginner", label: "Sơ cấp" },
    { key: "intermediate", label: "Trung cấp" },
    { key: "advanced", label: "Cao cấp" },
];

// Mock data có price/compareAt + slug
const mockCourses = [
    {
        id: "tay-vocab-daily",
        slug: "tu-vung-hang-ngay",
        title: "Từ vựng hằng ngày – Gia đình, trường lớp",
        cover: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=60",
        lessons: 24,
        students: 1203,
        level: "intermediate",
        rating: 4.8,
        category: "vocab",
        price: 79200,
        compareAt: 99000,
    },
    {
        id: "tay-phonetic",
        slug: "tieng-tay-bang-chu-phat-am",
        title: "Tiếng Tày – Bảng chữ & Phát âm chuẩn",
        cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=60",
        lessons: 14,
        students: 862,
        level: "beginner",
        rating: 4.9,
        category: "phonetics",
        price: 48990,
        compareAt: 69000,
    },
    {
        id: "tay-grammar-basic",
        slug: "ngu-phap-co-ban",
        title: "Ngữ pháp cơ bản – trật tự từ & trợ từ",
        cover: "https://images.unsplash.com/photo-1534689422545-7a28dcd2f2b1?w=1600&q=60",
        lessons: 18,
        students: 674,
        level: "intermediate",
        rating: 4.5,
        category: "grammar",
        price: 99000,
        compareAt: 99000,
    },
    {
        id: "tay-number",
        slug: "so-dem-chao-hoi",
        title: "Số đếm & cách chào hỏi (Slam, Slươn…)",
        cover: "https://images.unsplash.com/photo-1543269865-0a740d43b90c?w=1600&q=60",
        lessons: 10,
        students: 540,
        level: "beginner",
        rating: 4.6,
        category: "conversation",
        price: 0,
        compareAt: 0,
    },
];

function labelLevel(lv) {
    const M = {
        beginner: "Sơ cấp",
        intermediate: "Trung cấp",
        advanced: "Cao cấp",
        average: "Khá",
    };
    return M[lv] || lv;
}

function CourseCard({ course, onStart }) {
    const sale = discountPercent(course.price, course.compareAt);
    const isFree = course.price === 0;

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-sm hover:shadow-md transition-shadow">
            <div className="relative aspect-[16/10] w-full overflow-hidden">
                <img
                    src={course.cover}
                    alt={course.title}
                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                />
                {/* Badge giảm & giá */}
                {sale > 0 && (
                    <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white bg-rose-600">
                        -{sale}%
                    </span>
                )}
                <span
                    className={`absolute right-3 top-3 rounded-full px-2.5 py-1 text-xs font-bold text-white ${
                        isFree ? "bg-emerald-600" : "bg-orange-500"
                    }`}
                >
                    {isFree
                        ? "Miễn phí"
                        : formatVND(course.price).replace("₫", "đ")}
                </span>
            </div>

            <div className="p-4 flex flex-col gap-3">
                <h3 className="line-clamp-2 font-semibold text-zinc-900">
                    {course.title}
                </h3>

                <div className="flex items-center gap-4 text-xs text-zinc-600">
                    <span className="inline-flex items-center gap-1">
                        <BookOpen size={14} /> Bài: {course.lessons}
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Users size={14} /> {course.students.toLocaleString()}{" "}
                        HV
                    </span>
                    <span className="inline-flex items-center gap-1">
                        <Layers size={14} /> {labelLevel(course.level)}
                    </span>
                </div>

                <div className="flex items-end justify-between">
                    <div className="flex items-baseline gap-3">
                        <span className="text-xl font-bold text-zinc-900">
                            {isFree ? "Miễn phí" : formatVND(course.price)}
                        </span>
                        {sale > 0 && (
                            <span className="text-sm line-through text-zinc-400">
                                {formatVND(course.compareAt)}
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-zinc-700">
                        <Star
                            size={16}
                            className="fill-amber-400 text-amber-400"
                        />
                        <span className="font-medium">{course.rating}</span>
                    </div>
                </div>

                <button
                    onClick={() => onStart?.(course)}
                    className="mt-1 px-3 py-2 text-sm rounded-xl font-semibold text-white shadow-sm active:scale-[.98]
                     bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                >
                    Bắt đầu học
                </button>
            </div>
        </div>
    );
}

export default function CoursesPage() {
    const [q, setQ] = useState("");
    const [category, setCategory] = useState("all");
    const [level, setLevel] = useState("all");
    const [sort, setSort] = useState("popular");
    const [page, setPage] = useState(1);
    const pageSize = 8;

    const filtered = useMemo(() => {
        let data = [...mockCourses];
        if (category !== "all")
            data = data.filter((c) => c.category === category);
        if (level !== "all") data = data.filter((c) => c.level === level);
        if (q.trim()) {
            const k = q.trim().toLowerCase();
            data = data.filter((c) => c.title.toLowerCase().includes(k));
        }
        switch (sort) {
            case "new":
                data.sort((a, b) => b.lessons - a.lessons);
                break;
            case "rating":
                data.sort((a, b) => b.rating - a.rating);
                break;
            case "priceLow":
                data.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
                break;
            case "priceHigh":
                data.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
                break;
            default:
                data.sort((a, b) => b.students - a.students);
        }
        return data;
    }, [q, category, level, sort]);

    const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
    const sliced = filtered.slice((page - 1) * pageSize, page * pageSize);

    function handleStart(course) {
        const slug = course.slug || course.id;
        // Điều hướng đơn giản (phù hợp mọi setup)
        window.location.href = `/courses/${slug}`;
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900">
            <section className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                    <div className="text-center">
                        <p className="text-sm uppercase tracking-widest text-sky-700/90 font-semibold">
                            HocTiengTay.edu
                        </p>
                        <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-bold">
                            Học tiếng dân tộc – Giữ gìn văn hoá
                        </h1>
                        <p className="mt-3 text-zinc-600 max-w-2xl mx-auto">
                            Khám phá ngôn ngữ, làn điệu và câu chuyện địa phương
                            qua bài học tương tác và kho tư liệu số hoá.
                        </p>

                        {/* Search */}
                        <div className="mt-6 mx-auto max-w-2xl">
                            <div className="flex items-center gap-2 rounded-2xl border border-zinc-200 bg-white px-3 py-2 shadow-sm">
                                <Search size={18} className="text-zinc-500" />
                                <input
                                    value={q}
                                    onChange={(e) => {
                                        setQ(e.target.value);
                                        setPage(1);
                                    }}
                                    placeholder="Tìm khoá học Tiếng Tày…"
                                    className="flex-1 bg-transparent outline-none text-zinc-900 placeholder:text-zinc-400"
                                />
                                <div className="flex items-center gap-2">
                                    <SlidersHorizontal
                                        size={18}
                                        className="text-zinc-500"
                                    />
                                    <select
                                        className="bg-transparent text-sm text-zinc-700"
                                        value={sort}
                                        onChange={(e) =>
                                            setSort(e.target.value)
                                        }
                                    >
                                        <option value="popular">
                                            Phổ biến
                                        </option>
                                        <option value="rating">
                                            Đánh giá cao
                                        </option>
                                        <option value="new">Mới/Update</option>
                                        <option value="priceLow">
                                            Giá: Thấp → Cao
                                        </option>
                                        <option value="priceHigh">
                                            Giá: Cao → Thấp
                                        </option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    <div className="mt-8 flex flex-wrap justify-center gap-2">
                        {CATEGORIES.map((c) => (
                            <button
                                key={c.key}
                                onClick={() => {
                                    setCategory(c.key);
                                    setPage(1);
                                }}
                                className={
                                    "px-3 py-1.5 rounded-xl text-sm font-medium border transition-colors " +
                                    (category === c.key
                                        ? "text-white border-transparent bg-gradient-to-r from-blue-600 to-sky-500"
                                        : "text-zinc-800 border-zinc-200 bg-white hover:bg-zinc-50")
                                }
                            >
                                {c.label}
                            </button>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {sliced.map((course) => (
                            <CourseCard
                                key={course.id}
                                course={course}
                                onStart={handleStart}
                            />
                        ))}
                        {sliced.length === 0 && (
                            <div className="col-span-full text-center text-zinc-600 py-12">
                                Không tìm thấy khoá học phù hợp.
                            </div>
                        )}
                    </div>

                    {/* Pagination */}
                    <div className="mt-8 flex items-center justify-center gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                            className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white disabled:opacity-40"
                        >
                            <ChevronLeft />
                        </button>
                        <span className="px-3 py-1.5 rounded-xl text-sm font-medium text-zinc-900 bg-white border border-zinc-200">
                            Trang {page}/{pages}
                        </span>
                        <button
                            disabled={page === pages}
                            onClick={() =>
                                setPage((p) => Math.min(pages, p + 1))
                            }
                            className="h-10 w-10 inline-flex items-center justify-center rounded-xl border border-zinc-200 bg-white disabled:opacity-40"
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
