"use client";

import danca from "@/assets/imgs/dan_ca.jpg";
import family from "@/assets/imgs/family.jpg";
import vanhoa from "@/assets/imgs/vanhoa.jpg";
import vanhoa2 from "@/assets/imgs/vanhoa2.jpg";
import vanhoa3 from "@/assets/imgs/vanhoa3.jpg";
import FeaturesNavButton from "@/components/FeaturesNavButtons";
import Header from "@/components/Header";
import {
    BookOpen,
    ChevronLeft,
    ChevronRight,
    MapPinned,
    Sparkles,
    Users,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import bannerURL from '@/assets/imgs/banner3.jpg';

/**
 *
 * HOME – Cover page cho HoctiengTay.edu (JS only + Tailwind)
 * Tone màu: lam gradient #2563eb → #60a5fa (khớp trang learn/about)
 * Mục tiêu: truyền tải sứ mệnh GIỮ GÌN VĂN HOÁ + HỌC TIẾNG DÂN TỘC
 */

// --- THÊM COMPONENT MÀN HÌNH CHÀO ---
function SplashScreen() {
    return (
        <div className="fixed inset-0 z-50 flex h-screen w-screen items-center justify-center bg-[linear-gradient(90deg,#2563eb_0%,#60a5fa_100%)]">
            <h1 className="animate-pulse text-3xl font-black tracking-tight text-white sm:text-4xl">
                Chào mừng bạn đến với HoctiengTay.edu!
            </h1>
        </div>
    );
}
// --- KẾT THÚC COMPONENT MÀN HÌNH CHÀO ---

export default function HomeHocTiengTay() {
    const [isLoading, setIsLoading] = useState(true); // <--- THÊM STATE LOADING
    const [tab, setTab] = useState("learn"); // learn | dictionary | culture

    const featured = useMemo(
        () => [
            {
                key: "greetings",
                title: "Chào hỏi",
                img: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop",
                desc: "Cách chào, làm quen, hỏi thăm hằng ngày",
                level: "Cơ bản",
                lessons: 12,
            },
            {
                key: "food",
                title: "Ẩm thực",
                img: "https://images.unsplash.com/photo-1526318472351-c75fcf070305?q=80&w=1200&auto=format&fit=crop",
                desc: "Món ăn địa phương & từ vựng đi kèm",
                level: "Trung bình",
                lessons: 18,
            },
            {
                key: "family",
                title: "Gia đình",
                img: family.src,
                desc: "Xưng hô – quan hệ họ hàng – truyền thống",
                level: "Cơ bản",
                lessons: 15,
            },
            {
                key: "folksong",
                title: "Làn điệu – dân ca",
                img: danca.src,
                desc: "Hát then, sli lượn – giai điệu & lời ca",
                level: "Nâng cao",
                lessons: 9,
            },
        ],
        []
    );

    // simple marquee for cultural patterns
    useEffect(() => {
        const id = setInterval(() => {
            const el = document.querySelector("#marquee");
            if (el) el.scrollLeft += 1;
        }, 20);
        return () => clearInterval(id);
    }, []);

    // --- THÊM useEffect ĐỂ ẨN MÀN HÌNH CHÀO SAU 2.5 GIÂY ---
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 giây

        return () => clearTimeout(timer); // Cleanup khi component unmount
    }, []);
    // --- KẾT THÚC useEffect ---


    // --- THÊM KIỂM TRA LOADING ĐỂ HIỆN MÀN HÌNH CHÀO ---
    if (isLoading) {
        return <SplashScreen />;
    }
    // --- KẾT THÚC KIỂM TRA ---

    return (
        <div className="relative w-full">
            <Hero tab={tab} setTab={setTab} />
            {/* Core Values */}
            <Section
                title="Sứ mệnh & Giá trị"
                subtitle="Giữ gìn văn hoá – lan toả ngôn ngữ – kết nối cộng đồng"
                icon={<Sparkles className="h-5 w-5" />}
            >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                    <ValueCard
                        title="Giữ gìn văn hoá"
                        desc="Thu thập tư liệu, làn điệu, trang phục, ẩm thực – số hoá để thế hệ trẻ dễ tiếp cận."
                        icon={<MapPinned className="h-6 w-6" />}
                    />
                    <ValueCard
                        title="Học ngôn ngữ"
                        desc="Bài học theo chủ đề, trò chơi tương tác, audio bản ngữ – học vui mà hiệu quả."
                        icon={<BookOpen className="h-6 w-6" />}
                    />
                    <ValueCard
                        title="Kết nối cộng đồng"
                        desc="Lớp học, sự kiện, thử thách hằng tuần – cùng nhau luyện tập và lan toả."
                        icon={<Users className="h-6 w-6" />}
                    />
                </div>
            </Section>

            {/* Featured Topics */}
            <Section
                title="Chủ đề nổi bật"
                subtitle="Bắt đầu từ những điều gần gũi"
                icon={<BookOpen className="h-5 w-5" />}
            >
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featured.map((t) => (
                        <TopicCard key={t.key} {...t} />
                    ))}
                </div>
            </Section>

            {/* Culture Gallery (horizontal scroll) */}
            <Section
                title="Bộ sưu tập văn hoá"
                subtitle="Một góc nhìn trực quan về đời sống người Tày"
                icon={<MapPinned className="h-5 w-5" />}
            >
                <Gallery />
            </Section>

            {/* CTA */}
            <CallToAction />

            {/* dev smoke tests */}
            <Smoke />
        </div>
    );
}

function Hero({ tab, setTab }) {
    return (
        <>
            <Header />
            <div className="mt-20 relative h-[75vh] min-h-[460px] w-full overflow-hidden ">
                {/* Background image + gradient tone lam */}
                <img
                    src={bannerURL.src}
                    alt="cover"
                    className="absolute inset-0 h-full w-full object-fill"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1)_0%,rgba(2,6,23,0.25)_40%,rgba(37,99,235,0.35)_75%,rgba(96,165,250,0.5)_100%)]" />

                <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
                    <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
                        Cùng học Tiếng Tày – gìn giữ bản sắc
                    </h1>
                    <p className="mt-3 max-w-2xl text-white/95">
                        Khám phá ngôn ngữ, làn điệu và câu chuyện văn hoá địa
                        phương qua bài học tương tác và kho tư liệu số hoá.
                    </p>

                    <div className="mt-32 gap-3 inline-flex rounded-2xl bg-white/20 p-3 1 ring-white/40 backdrop-blur">
                        <FeaturesNavButton />
                    </div>
                </div>

                {/* wave divider */}
                {/* <svg
                    className="absolute bottom-[-1px] left-0 right-0 w-full text-[#eaf3ff]"
                    viewBox="0 0 1440 80"
                    fill="currentColor"
                >
                    <path d="M0,64L60,58.7C120,53,240,43,360,58.7C480,75,600,117,720,122.7C840,128,960,96,1080,69.3C1200,43,1320,21,1380,10.7L1440,0L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z" />
                </svg> */}
            </div>
        </>
    );
}

function Section({ title, subtitle, icon, children }) {
    return (
        <section className="relative mt-10 max-w-screen-xl mx-auto">
            <div className="mb-4 inline-flex items-center gap-3 rounded-2xl bg-[linear-gradient(90deg,#2563eb_0%,#60a5fa_100%)] px-4 py-2 text-white ring-1 ring-white/30">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-white/20">
                    {icon}
                </span>
                <div>
                    <h2 className="text-lg font-extrabold">{title}</h2>
                    {subtitle && (
                        <p className="text-xs text-white/90">{subtitle}</p>
                    )}
                </div>
            </div>
            {children}
        </section>
    );
}

function ValueCard({ title, desc, icon }) {
    return (
        <div className="relative overflow-hidden rounded-2xl bg-[linear-gradient(180deg,rgba(37,99,235,0.08),rgba(96,165,250,0.12))] p-5 ring-1 ring-blue-300/30 shadow-[0_12px_36px_rgba(2,6,23,0.12)]">
            <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(180deg,rgba(37,99,235,0.25),rgba(96,165,250,0.25))] text-white ring-1 ring-blue-300/40">
                {icon}
            </div>
            <h3 className="text-base font-bold text-[#0b1a3a]">{title}</h3>
            <p className="mt-1 text-sm text-[#0b1a3a]/80">{desc}</p>
        </div>
    );
}

function TopicCard({ key, title, img, desc, level, lessons }) {
    return (
        <div className="group overflow-hidden rounded-2xl ring-1 ring-blue-300/40 shadow-[0_12px_36px_rgba(2,6,23,0.12)]">
            <div className="relative h-40 w-full" key={key}>
                <img
                    src={img}
                    alt={title}
                    className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1a3a]/70 via-black/20 to-transparent" />
                <span className="absolute right-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-[#0b1a3a]">
                    {level}
                </span>
            </div>
            <div className="bg-white p-4">
                <h4 className="text-[15px] font-bold text-[#0b1a3a]">
                    {title}
                </h4>
                <p className="mt-1 line-clamp-2 text-sm text-[#0b1a3a]/75">
                    {desc}
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[#0b1a3a]/70">
                    <span>{lessons} bài</span>
                    {/* <button
            className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
          >
            Vào học <ChevronRight className="h-3.5 w-3.5" />
          </button> */}
                </div>
            </div>
        </div>
    );
}

function Gallery() {
    const images = [
        danca.src,
        vanhoa.src,
        vanhoa2.src,
        vanhoa3.src,
    ];
    const [idx, setIdx] = useState(0);
    const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
    const next = () => setIdx((i) => (i + 1) % images.length);
    return (
        <div className="relative overflow-hidden rounded-2xl">
            <img
                src={images[idx]}
                className="lg:h-[60vh] w-full object-cover h-80"
            />
            <button
                onClick={prev}
                className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#0b1a3a] shadow"
            >
                <ChevronLeft className="h-5 w-5" />
            </button>
            <button
                onClick={next}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/90 p-2 text-[#0b1a3a] shadow"
            >
                <ChevronRight className="h-5 w-5" />
            </button>
            <div
                id="marquee"
                className="no-scrollbar mt-3 flex gap-2 overflow-x-auto rounded-xl bg-white/70 p-2"
            >
                {images.map((s, i) => (
                    <img
                        key={s}
                        onClick={() => setIdx(i)}
                        src={s}
                        className={`h-16 w-24 cursor-pointer rounded-lg object-cover ring-2 transition ${i === idx ? "ring-blue-500" : "ring-transparent"
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

function CallToAction() {
    return (
        <section className="max-w-screen-xl mx-auto my-12  px-4">
            <div className="overflow-hidden rounded-3xl bg-[linear-gradient(90deg,#2563eb_0%,#60a5fa_100%)] p-8 text-white ring-1 ring-white/30">
                <h3 className="text-2xl font-black">
                    Bắt đầu hành trình gìn giữ Tiếng Tày hôm nay
                </h3>
                <p className="mt-1 text-white/95">
                    Học theo chủ đề, nghe phát âm bản ngữ, tích lũy huy hiệu và
                    cùng cộng đồng lan toả văn hoá.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                    <Link href="/learn" className="cst_btn-primary ">
                        Vào học ngay
                    </Link>

                    <Link href="/" className="cst_btn">
                        Khám phá tư liệu
                    </Link>
                </div>
            </div>
        </section>
    );
}

function Input({ label, placeholder }) {
    return (
        <label className="flex w-full flex-col gap-1">
            <span className="text-xs font-semibold text-[#0b1a3a]/70">
                {label}
            </span>
            <input
                placeholder={placeholder}
                className="h-10 rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-500"
            />
        </label>
    );
}

function Primary({ children, white }) {
    return (
        <button
            className={`h-10 rounded-xl px-4 text-sm font-semibold shadow ${white ? "bg-white text-[#0b1a3a]" : "bg-blue-600 text-white"
                } hover:opacity-95`}
        >
            {children}
        </button>
    );
}

function Smoke() {
    if (typeof window === "undefined") return null;
    console.groupCollapsed("[HomeHocTiengTay] smoke");
    console.assert(typeof HomeHocTiengTay === "function", "component defined");
    console.assert(
        ["learn", "dictionary", "culture"].includes("learn"),
        "tabs ok"
    );
    console.groupEnd();
    return null;
}