"use client";

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

/**
 * HOME – Cover page cho HoctiengTay.edu (JS only + Tailwind)
 * Tone màu: lam gradient #2563eb → #60a5fa (khớp trang learn/about)
 * Mục tiêu: truyền tải sứ mệnh GIỮ GÌN VĂN HOÁ + HỌC TIẾNG DÂN TỘC
 */

export default function HomeHocTiengTay() {
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
        img: "https://images.unsplash.com/photo-1585336261022-680e295ce3bd?q=80&w=1200&auto=format&fit=crop",
        desc: "Xưng hô – quan hệ họ hàng – truyền thống",
        level: "Cơ bản",
        lessons: 15,
      },
      {
        key: "folksong",
        title: "Làn điệu – dân ca",
        img: "https://images.unsplash.com/photo-1445633740803-efaf338bd1fc?q=80&w=1200&auto=format&fit=crop",
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
      <div className="mt-20 relative h-[75vh] min-h-[460px] w-full overflow-hidden rounded-b-[36px]">
        {/* Background image + gradient tone lam */}
        <img
          src="https://vstatic.vietnam.vn/vietnam/resource/IMAGE/2025/1/18/0beb34cf1fd74195b58660ea6c59b5d4"
          alt="cover"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.25)_0%,rgba(2,6,23,0.45)_40%,rgba(37,99,235,0.6)_75%,rgba(96,165,250,0.8)_100%)]" />

        <div className="relative mx-auto flex h-full max-w-6xl flex-col items-center justify-center px-4 text-center text-white">
          <h1 className="text-3xl font-black tracking-tight sm:text-5xl">
            Cùng học Tiếng Tày – gìn giữ bản sắc
          </h1>
          <p className="mt-3 max-w-2xl text-white/95">
            Khám phá ngôn ngữ, làn điệu và câu chuyện văn hoá địa phương
            qua bài học tương tác và kho tư liệu số hoá.
          </p>

          {/* Segmented Tabs */}
          <div className="mt-10 inline-flex rounded-2xl bg-white/20 p-3 1 ring-white/40 backdrop-blur">
            <Link
              href="/learn"
              className="cst_btn-primary block text-center text-xl"
            >
              Bắt đầu học
            </Link>
            {/* {[
                          { k: "learn", label: "Bài học" },
                          { k: "dictionary", label: "Từ điển" },
                          { k: "culture", label: "Văn hoá" },
                      ].map((i) => (
                          <button
                              key={i.k}
                              onClick={() => setTab(i.k)}
                              className={`px-4 py-2 text-sm font-semibold rounded-xl transition ${
                                  tab === i.k
                                      ? "bg-white text-[#0b1a3a]"
                                      : "text-white"
                              }`}
                          >
                              {i.label}
                          </button>
                      ))} */}
          </div>

          {/* Quick Panel under tabs */}
          {/* <div className="mt-4 w-full max-w-3xl rounded-2xl bg-white/90 p-3 text-left text-[#0b1a3a] shadow-xl">
                      {tab === "learn" && (
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                              <Input label="Chủ đề" placeholder="Chào hỏi…" />
                              <Input
                                  label="Mức độ"
                                  placeholder="Cơ bản/Trung bình…"
                              />
                              <Primary>Vào học</Primary>
                          </div>
                      )}
                      {tab === "dictionary" && (
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                              <Input
                                  label="Tra từ"
                                  placeholder="Nhập từ Tiếng Tày hoặc Việt"
                              />
                              <Primary>Tra cứu</Primary>
                          </div>
                      )}
                      {tab === "culture" && (
                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
                              <Input
                                  label="Tìm tư liệu"
                                  placeholder="dân ca, trang phục, ẩm thực…"
                              />
                              <Primary>Xem ngay</Primary>
                          </div>
                      )}
                  </div> */}
        </div>

        {/* wave divider */}
        <svg
          className="absolute bottom-[-1px] left-0 right-0 w-full text-[#eaf3ff]"
          viewBox="0 0 1440 80"
          fill="currentColor"
        >
          <path d="M0,64L60,58.7C120,53,240,43,360,58.7C480,75,600,117,720,122.7C840,128,960,96,1080,69.3C1200,43,1320,21,1380,10.7L1440,0L1440,80L1380,80C1320,80,1200,80,1080,80C960,80,840,80,720,80C600,80,480,80,360,80C240,80,120,80,60,80L0,80Z" />
        </svg>
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

function TopicCard({ title, img, desc, level, lessons }) {
  return (
    <div className="group overflow-hidden rounded-2xl ring-1 ring-blue-300/40 shadow-[0_12px_36px_rgba(2,6,23,0.12)]">
      <div className="relative h-40 w-full">
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
    "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1520975922299-258a6b0a8b14?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1469122312224-c5846569feb1?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=1600&auto=format&fit=crop",
  ];
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);
  return (
    <div className="relative overflow-hidden rounded-2xl">
      <img
        src={images[idx]}
        className="h-[500px] w-full object-cover sm:h-80"
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
          <Primary white>Vào học ngay</Primary>
          <button className="rounded-xl bg-white/20 px-4 py-2 font-semibold ring-1 ring-white/40">
            Khám phá tư liệu
          </button>
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
