// File: CourseDetailPage.jsx
// Trang chi tiết khoá học — TONE SÁNG (nền trắng, card trắng, viền sáng), giữ trạng thái Coming soon

import {
    ArrowLeft,
    Award,
    Bell,
    BookOpen,
    CheckCircle2,
    ChevronDown,
    Clock,
    Download,
    Globe,
    Languages,
    Play,
    Shield,
    Sparkles,
    Star,
    Users,
} from "lucide-react";
import { useEffect, useState } from "react";

/* ===================== Utils ===================== */
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
function isFuture(dateStr) {
    if (!dateStr) return false;
    const d = new Date(dateStr);
    return !Number.isNaN(+d) && d.getTime() > Date.now();
}

/* ===================== Mock (thay bằng API) ===================== */
const MOCK_DETAIL = {
    id: "tay-phonetic",
    slug: "tieng-tay-bang-chu-phat-am",
    title: "Tiếng Tày – Bảng chữ & Phát âm chuẩn",
    cover: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1600&q=60",
    short: "Khoá học đang được hoàn thiện nội dung và sẽ ra mắt trong thời gian tới.",
    level: "beginner",
    rating: 4.9,
    ratingCount: 268,
    lessonsCount: 0,
    duration: 0,
    students: 0,
    language: "Tiếng Tày (thuyết minh TV)",
    price: 0,
    compareAt: 0,
    status: "coming_soon",
    releaseAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString(),
    includes: [
        {
            icon: <Download size={16} />,
            text: "Tài liệu PDF & audio (khi phát hành)",
        },
        { icon: <Shield size={16} />, text: "Truy cập trọn đời" },
    ],
    whatYouWillLearn: [],
    requirements: [],
    curriculum: [],
    teacher: {
        name: "Thầy Nông Văn P.",
        avatar: "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?w=512&q=60",
        title: "Giảng viên ngôn ngữ dân tộc – 8 năm kinh nghiệm",
        badges: ["Phát âm bản ngữ", "Sáng lập CLB Sli – Lượn"],
    },
};

/* ===================== Small UI ===================== */
function Pill({ children, className = "" }) {
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium ${className}`}
        >
            {children}
        </span>
    );
}
function Rating({ value }) {
    return (
        <span className="inline-flex items-center gap-1 text-amber-600 font-semibold">
            <Star size={16} className="fill-amber-400" /> {value.toFixed(1)}
        </span>
    );
}
function LessonRow({ item, idx, disabled }) {
    const icon =
        item?.type === "video" ? (
            <Play size={16} />
        ) : item?.type === "audio" ? (
            <Languages size={16} />
        ) : (
            <Sparkles size={16} />
        );
    const mm = Math.floor((item?.dur || 0) / 60),
        ss = (item?.dur || 0) % 60;
    return (
        <div
            className={`flex items-center justify-between rounded-xl border px-3 py-2 ${
                disabled
                    ? "border-zinc-200 bg-zinc-50 opacity-70 cursor-not-allowed"
                    : "border-zinc-200 bg-white"
            }`}
        >
            <div className="flex items-center gap-3 text-zinc-700">
                <span className="text-sm text-zinc-400 w-6">
                    {String((idx ?? 0) + 1).padStart(2, "0")}
                </span>
                <span className="text-zinc-500">{icon}</span>
                <span className="font-medium text-zinc-900">
                    {item?.title || "Nội dung sẽ mở khoá"}
                </span>
                {item?.preview && !disabled && (
                    <Pill className="ml-2 bg-emerald-100 text-emerald-700">
                        Xem thử
                    </Pill>
                )}
            </div>
            <span className="text-xs text-zinc-500">
                {mm}:{String(ss).padStart(2, "0")}
            </span>
        </div>
    );
}
function Section({ section, disabled }) {
    const [open, setOpen] = useState(true);
    const items = section?.items || [];
    const totalDur = items.reduce((s, i) => s + (i?.dur || 0), 0);
    const mm = Math.floor(totalDur / 60),
        ss = totalDur % 60;
    return (
        <div className="rounded-2xl border border-zinc-200 bg-white overflow-hidden">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between px-4 py-3"
            >
                <div className="flex items-center gap-3">
                    <ChevronDown
                        className={`transition ${
                            open ? "rotate-0" : "-rotate-90"
                        }`}
                        size={18}
                    />
                    <h4 className="font-semibold text-zinc-900">
                        {section?.title || "Chương đang cập nhật"}
                    </h4>
                    <span className="text-xs text-zinc-500">
                        {items.length} mục • {mm}:{String(ss).padStart(2, "0")}
                    </span>
                </div>
                <div className="text-xs text-zinc-500">Mở/đóng</div>
            </button>
            {open && (
                <div className="p-3 space-y-2">
                    {items.length === 0 ? (
                        <>
                            <LessonRow disabled />
                            <LessonRow disabled />
                            <LessonRow disabled />
                        </>
                    ) : (
                        items.map((it, i) => (
                            <LessonRow
                                key={it.id || i}
                                item={it}
                                idx={i}
                                disabled={disabled}
                            />
                        ))
                    )}
                </div>
            )}
        </div>
    );
}

/* ===================== Main ===================== */
export default function CourseDetailPage({ slug }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let mounted = true;
        async function load() {
            // TODO: fetch API theo slug
            const res = MOCK_DETAIL;
            if (mounted) setData(res);
            setLoading(false);
        }
        load();
        return () => {
            mounted = false;
        };
    }, [slug]);

    const d = data || MOCK_DETAIL;
    const isComingSoon =
        d?.status === "coming_soon" ||
        isFuture(d?.releaseAt) ||
        (d?.curriculum?.length ?? 0) === 0;
    const sale = discountPercent(d.price, d.compareAt);
    const isFree = d.price === 0;

    if (loading && !data) {
        return (
            <div className="min-h-screen bg-white text-zinc-900 grid place-items-center">
                <div className="animate-pulse text-zinc-500">Đang tải…</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white text-zinc-900">
            {/* Header */}
            <header className="sticky top-0 z-20 border-b border-zinc-200 bg-white/85 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <a
                            href="/courses"
                            className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900"
                        >
                            <ArrowLeft size={16} /> Khoá học
                        </a>
                        <span className="text-zinc-400">/</span>
                        <span className="font-semibold truncate max-w-[50vw]">
                            {d.title}
                        </span>
                        {isComingSoon && (
                            <Pill className="bg-amber-100 text-amber-700">
                                Coming soon
                            </Pill>
                        )}
                    </div>
                    <div className="hidden sm:flex items-center gap-4">
                        {d.rating ? (
                            <Rating value={d.rating} />
                        ) : (
                            <span className="text-zinc-500 text-sm">
                                Chưa có đánh giá
                            </span>
                        )}
                        <Pill className="bg-sky-100 text-sky-700">
                            {d.level === "beginner"
                                ? "Sơ cấp"
                                : d.level === "intermediate"
                                ? "Trung cấp"
                                : "Cao cấp"}
                        </Pill>
                    </div>
                </div>
            </header>

            {/* Hero */}
            <section className="relative">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 grid lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-8">
                        <div className="relative overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                            <img
                                src={d.cover}
                                alt={d.title}
                                className="w-full h-[260px] sm:h-[360px] object-cover"
                            />
                            {isComingSoon && (
                                <div className="absolute inset-0 bg-black/25 grid place-items-center">
                                    <Pill className="bg-amber-500 text-white text-sm">
                                        Sắp ra mắt
                                    </Pill>
                                </div>
                            )}
                        </div>
                        <h1 className="mt-5 text-2xl sm:text-3xl font-bold">
                            {d.title}
                        </h1>
                        <p className="mt-2 text-zinc-600">{d.short}</p>

                        <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-zinc-600">
                            <span className="inline-flex items-center gap-2">
                                <BookOpen size={16} /> {d.lessonsCount || 0} bài
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Clock size={16} />{" "}
                                {Math.floor((d.duration || 0) / 3600)}h{" "}
                                {Math.floor(((d.duration || 0) % 3600) / 60)}m
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Users size={16} />{" "}
                                {(d.students || 0).toLocaleString()} HV
                            </span>
                            <span className="inline-flex items-center gap-2">
                                <Globe size={16} /> {d.language}
                            </span>
                        </div>
                    </div>

                    {/* Sidebar pricing / coming soon */}
                    <aside className="lg:col-span-4">
                        <div className="rounded-2xl border border-zinc-200 bg-white p-4 sticky top-20">
                            {isComingSoon ? (
                                <>
                                    <div className="text-2xl font-extrabold">
                                        Sắp ra mắt
                                    </div>
                                    {isFuture(d.releaseAt) && (
                                        <div className="mt-1 text-sm text-zinc-600">
                                            Dự kiến:{" "}
                                            {new Date(
                                                d.releaseAt
                                            ).toLocaleDateString("vi-VN")}
                                        </div>
                                    )}
                                    <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 inline-flex items-center justify-center gap-2">
                                        <Bell size={18} /> Nhận thông báo khi mở
                                    </button>
                                    <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                                        {d.includes.map((it, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="text-zinc-500">
                                                    {it.icon}
                                                </span>{" "}
                                                <span>{it.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 text-xs text-zinc-500">
                                        Đăng ký nhận thông báo, bạn sẽ được báo
                                        ngay khi khoá phát hành.
                                    </div>
                                </>
                            ) : (
                                <>
                                    <div className="flex items-center justify-between">
                                        <div className="text-2xl font-extrabold">
                                            {isFree
                                                ? "Miễn phí"
                                                : formatVND(d.price)}
                                        </div>
                                        {sale > 0 && (
                                            <span className="text-sm line-through text-zinc-500">
                                                {formatVND(d.compareAt)}
                                            </span>
                                        )}
                                    </div>
                                    <div className="mt-2 flex items-center gap-2">
                                        {sale > 0 && (
                                            <Pill className="bg-rose-100 text-rose-700">
                                                -{sale}%
                                            </Pill>
                                        )}
                                        <Pill className="bg-sky-100 text-sky-700">
                                            {d.level === "beginner"
                                                ? "Sơ cấp"
                                                : d.level === "intermediate"
                                                ? "Trung cấp"
                                                : "Cao cấp"}
                                        </Pill>
                                    </div>
                                    <button className="mt-4 w-full rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3">
                                        {isFree
                                            ? "Bắt đầu học miễn phí"
                                            : "Mua & bắt đầu học"}
                                    </button>
                                    <ul className="mt-4 space-y-2 text-sm text-zinc-600">
                                        {d.includes.map((it, i) => (
                                            <li
                                                key={i}
                                                className="flex items-center gap-2"
                                            >
                                                <span className="text-zinc-500">
                                                    {it.icon}
                                                </span>{" "}
                                                <span>{it.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-4 flex items-center gap-2 text-emerald-600 text-sm">
                                        <CheckCircle2 size={16} /> Bảo đảm hoàn
                                        tiền 7 ngày
                                    </div>
                                </>
                            )}
                        </div>
                    </aside>
                </div>
            </section>

            {/* What you’ll learn / Requirements */}
            <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6 grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 space-y-6">
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                        <h3 className="font-semibold text-zinc-900">
                            Bạn sẽ học được gì?
                        </h3>
                        {!d.whatYouWillLearn ||
                        d.whatYouWillLearn.length === 0 ? (
                            <div className="mt-3 grid sm:grid-cols-2 gap-3">
                                <div className="h-9 rounded-lg bg-zinc-200/60 animate-pulse" />
                                <div className="h-9 rounded-lg bg-zinc-200/60 animate-pulse" />
                                <div className="h-9 rounded-lg bg-zinc-200/60 animate-pulse" />
                                <div className="h-9 rounded-lg bg-zinc-200/60 animate-pulse" />
                            </div>
                        ) : (
                            <ul className="mt-3 grid sm:grid-cols-2 gap-3 text-sm text-zinc-700">
                                {d.whatYouWillLearn.map((t, i) => (
                                    <li
                                        key={i}
                                        className="flex items-start gap-2"
                                    >
                                        <Award
                                            size={16}
                                            className="text-emerald-600"
                                        />{" "}
                                        <span>{t}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div className="rounded-2xl border border-zinc-200 bg-white p-5">
                        <h3 className="font-semibold text-zinc-900">
                            Yêu cầu đầu vào
                        </h3>
                        {!d.requirements || d.requirements.length === 0 ? (
                            <div className="mt-3 space-y-2">
                                <div className="h-6 rounded-lg bg-zinc-200/60 animate-pulse" />
                                <div className="h-6 rounded-lg bg-zinc-200/60 animate-pulse" />
                            </div>
                        ) : (
                            <ul className="mt-3 space-y-2 text-sm text-zinc-700 list-disc list-inside">
                                {d.requirements.map((t, i) => (
                                    <li key={i}>{t}</li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {/* Curriculum */}
                    <div className="space-y-3">
                        <h3 className="font-semibold text-zinc-900">
                            Nội dung khoá học
                        </h3>
                        {!d.curriculum || d.curriculum.length === 0 ? (
                            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-zinc-700">
                                Nội dung đang được hoàn thiện. Hãy nhấn "Nhận
                                thông báo khi mở" để biết khi khoá sẵn sàng.
                                <div className="mt-3 grid gap-2">
                                    <LessonRow disabled />
                                    <LessonRow disabled />
                                    <LessonRow disabled />
                                </div>
                            </div>
                        ) : (
                            d.curriculum.map((sec) => (
                                <Section
                                    key={sec.id}
                                    section={sec}
                                    disabled={isComingSoon}
                                />
                            ))
                        )}
                    </div>

                    {/* Teacher */}
                    <div className="rounded-2xl border border-zinc-200 bg-white p-5 flex items-center gap-4">
                        <img
                            src={d.teacher.avatar}
                            alt={d.teacher.name}
                            className="h-14 w-14 rounded-full object-cover"
                        />
                        <div>
                            <div className="font-semibold text-zinc-900">
                                {d.teacher.name}
                            </div>
                            <div className="text-sm text-zinc-600">
                                {d.teacher.title}
                            </div>
                            <div className="mt-2 flex flex-wrap gap-2">
                                {d.teacher.badges.map((b, i) => (
                                    <Pill
                                        key={i}
                                        className="bg-emerald-100 text-emerald-700"
                                    >
                                        {b}
                                    </Pill>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-4"></div>
            </section>

            <footer className="py-10 text-center text-xs text-zinc-500">
                © HocTiengTay.edu — gìn giữ bản sắc qua từng bài học
            </footer>
        </div>
    );
}
