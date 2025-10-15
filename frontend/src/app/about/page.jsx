"use client";
import { navbarList } from "@/components/LeftNavbar";
import LeftNavbar from "@/components/LeftNavbar";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Megaphone,
  Rocket,
  Sparkles,
  Star,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { avatar } from "@/assets/imgs";
/**
 * AboutHocTiengTay – màu dưới = màu trên (gradient lam #2563eb → #60a5fa)
 * - Card thành viên bằng nhau
 * - Modal 2 cột: ảnh lớn nửa trái, thông tin nửa phải
 * - Đã fix lỗi Unexpected token (loại bỏ `}}}` thừa ở FeatureCard/StepCard)
 */

export default function AboutHocTiengTay() {
  const [activeIndex, setActiveIndex] = useState(null);
  const sections = useMemo(
    () => [
      {
        id: "gioi-thieu-thanh-vien",
        label: "Giới thiệu thành viên",
        icon: Users,
      },
      { id: "san-pham", label: "Sản phẩm", icon: Rocket },
      {
        id: "tai-sao",
        label: "Tại sao lại có dự án này",
        icon: GraduationCap,
      },
      { id: "huong-phat-trien", label: "Hướng phát triển", icon: Star },
      { id: "quang-ba", label: "Quảng bá sản phẩm", icon: Megaphone },
    ],
    []
  );

  useEffect(() => {
    const onKey = (e) => {
      if (activeIndex === null) return;
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowRight")
        setActiveIndex((i) => (i + 1) % members.length);
      if (e.key === "ArrowLeft")
        setActiveIndex((i) => (i - 1 + members.length) % members.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex]);

  return (
    <div className="lg:mt-20 mt-[120px] relative w-full space-y-12 sm:space-y-16 flex">
      <div className="w-full lg:max-w-screen-xl lg:mx-auto p-2 flex flex-col gap-2">
        <div className="hidden w-full h-20 lg:flex items-center justify-center gap-4">
          {navbarList.map((btn) => (
            <Link href={btn.link} className="cst_btn" key={btn.id}>
              {btn.text}
            </Link>
          ))}
        </div>
        <HeroHeader />
        {/* 1) Thành viên – đồng màu với hero */}
        <BlueSection
          id="gioi-thieu-thanh-vien"
          icon={<Users className="h-5 w-5" />}
          title="Giới thiệu thành viên"
          subtitle="Card đồng đều; click để xem ảnh lớn nửa màn hình"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
            {members.map((m, i) => (
              <MemberCard
                key={m.id}
                m={m}
                onOpen={() => setActiveIndex(i)}
                className="min-h-[230px]"
              />
            ))}
          </div>
        </BlueSection>

        {/* 2) Sản phẩm */}
        <BlueSection
          id="san-pham"
          icon={<Rocket className="h-5 w-5" />}
          title="Sản phẩm"
          subtitle="Web app mobile‑first, học theo chương, nhiều dạng bài"
        >
          <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto">
            {productHighlights.map((p) => (
              <FeatureCard
                key={p.title}
                {...p}
                className="snap-start min-w-[300px] sm:min-w-[360px]"
              />
            ))}
          </div>
        </BlueSection>

        {/* 3) Tại sao */}
        <BlueSection
          id="tai-sao"
          icon={<GraduationCap className="h-5 w-5" />}
          title="Tại sao lại có dự án này"
          subtitle="Giới thiệu nhanh lý do & mục tiêu"
        >
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {reasons.map((r) => (
              <li
                key={r}
                className="rounded-2xl bg-white/15 p-4 ring-1 ring-white/40 shadow-[0_10px_30px_rgba(2,6,23,0.25)]"
              >
                {r}
              </li>
            ))}
          </ul>
        </BlueSection>

        {/* 4) Hướng phát triển */}
        <BlueSection
          id="huong-phat-trien"
          icon={<Star className="h-5 w-5" />}
          title="Hướng phát triển"
          subtitle="Lộ trình nâng cấp sản phẩm"
        >
          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            {roadmap.map((s) => (
              <StepCard key={s.title} {...s} />
            ))}
          </div>
        </BlueSection>

        {/* 5) Quảng bá */}
        <BlueSection
          id="quang-ba"
          icon={<Megaphone className="h-5 w-5" />}
          title="Quảng bá sản phẩm làm được những gì"
          subtitle="Mạng xã hội – trường lớp – cộng đồng"
        >
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {marketing.map((m) => (
              <FeatureCard key={m.title} {...m} />
            ))}
          </div>
        </BlueSection>

        {activeIndex !== null && (
          <MemberModal
            m={members[activeIndex]}
            index={activeIndex}
            total={members.length}
            onClose={() => setActiveIndex(null)}
            onPrev={() =>
              setActiveIndex((i) => (i - 1 + members.length) % members.length)
            }
            onNext={() => setActiveIndex((i) => (i + 1) % members.length)}
          />
        )}
      </div>
    </div>
  );
}

/** ----------------- Subcomponents ----------------- */
function HeroHeader() {
  return (
    <div className="relative overflow-hidden rounded-3xl ring-1 ring-white/15 shadow-[0_4px_18px_rgba(2,6,23,0.08)] text-white">
      {/* Gradient chuẩn như ảnh: blue-600 → sky-400 */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,#2563eb_0%,#60a5fa_100%)]" />
      {/* Vệt sáng */}
      <div className="absolute -left-20 -top-20 h-72 w-72 rounded-full bg-white/25 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-sky-300/30 blur-3xl" />

      <div className="flex items-center  gap-4 px-6 py-10 sm:px-8 ">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 ring-1 ring-white/40">
          <BookOpen className="h-6 w-6" />
        </div>
        <div>
          <p className="mb-1 inline-flex items-center justify-end gap-2 rounded-full bg-white/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ring-1 ring-white/40">
            <Sparkles className="h-4 w-4" /> Học Tiếng Tày
          </p>
          <h1 className="text-2xl font-black sm:text-3xl">
            Giới thiệu thành viên
          </h1>
          <p className="mt-1 max-w-[70ch] ">5 người – 5 cá tính</p>
        </div>
      </div>
    </div>
  );
}

// Section dùng cùng gradient với hero
function BlueSection({ id, icon, title, subtitle, children }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-white text-gray-800 shadow-[0_2px_10px_rgba(0,0,0,0.04)]">
  <div className="absolute top-0 left-0 h-[4px] w-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-t-3xl"></div>
  
  <div className="flex items-center gap-3 border-b border-gray-200 px-6 py-4 mt-[4px]">
    <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
      {icon}
    </div>
    <div>
      <h2 className="text-lg font-extrabold">{title}</h2>
      {subtitle && <p className="text-xs text-gray-500">{subtitle}</p>}
    </div>
  </div>

  <div className="p-5 sm:p-6">{children}</div>
</section>
  );
}

// ✅ className builder an toàn, không còn khả năng thừa '}}}'
function FeatureCard({ title, desc, icon, pills, className }) {
  const cls = [
    "group relative overflow-hidden rounded-2xl p-5  backdrop-blur-md",
    "bg-white/10 ring-1 ring-white/30 shadow-[0_3px_12px_rgba(2,6,23,0.08)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(2,6,23,0.12)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <div className={cls}>
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/30 blur-2xl" />
      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/25 ring-1 ring-white/40">
        {icon}
      </div>
      <h3 className="text-base font-bold">{title}</h3>
      <p className="mt-1 text-sm /95">{desc}</p>
      {pills && (
        <div className="mt-3 flex flex-wrap gap-2">
          {pills.map((p) => (
            <span
              key={p}
              className="rounded-full bg-white/25 px-3 py-1 text-[11px] ring-1 ring-white/40"
            >
              {p}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function StepCard({ title, desc, step }) {
  const cls = [
    "relative overflow-hidden rounded-2xl p-5  backdrop-blur-md ring-1 ring-white/30 shadow-[0_3px_12px_rgba(2,6,23,0.08)]",
    "bg-white/10",
  ].join(" ");
  return (
    <div className={cls}>
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/25 blur-2xl" />
      <span className="inline-flex items-center gap-2 rounded-full bg-white/25 px-3 py-1 text-[11px] ring-1 ring-white/40">
        {step}
      </span>
      <h3 className="mt-2 text-base font-bold">{title}</h3>
      <p className="mt-1 text-sm /95">{desc}</p>
    </div>
  );
}

/** ----------------- Members ----------------- */
const members = [
  {
    id: "m1",
    name: "Hoàng Văn Bít",
    age: 21,
    school: "Cao Đẳng Lạng Sơn",
    role: "Backend Developer",
    avatar: avatar.src,
    quote: "Dữ liệu sạch – API mượt.",
    skills: ["NEXT.JS", "Express", "MongoDB", "Tailwind"],
    bio: "Phụ trách kiến trúc BE, DevOps, Tạo API.",
  },
  {
    id: "m2",
    name: "Lâm Thị Loan",
    age: 21,
    school: "Cao Đẳng Lạng Sơn",
    role: "UI/UX & Motion",
    avatar: avatar.src,
    quote: "Đẹp và dễ dùng mới là chuẩn.",
    skills: ["Figma", "Motion", "Thiết kế giao diện"],
    bio: "Thiết kế giao diện, tương tác, guideline màu sắc và trải nghiệm học.",
  },
  {
    id: "m3",
    name: "Dương Thị Sáng",
    age: 21,
    school: "Cao Đẳng Lạng Sơn",
    role: "Nội dung Tiếng Tày",
    avatar: avatar.src,
    quote: "Ngôn ngữ sống khi ta dùng hằng ngày.",
    skills: ["Biên soạn", "Thu âm", "Kiểm định"],
    bio: "Xây ngân hàng từ vựng, câu thoại, ví dụ, ghi âm phát âm chuẩn.",
  },
  {
    id: "m4",
    name: "Hứa Hùng Đệ",
    age: 24,
    school: "Cao Đẳng Lạng Sơn",
    role: "Tester",
    avatar: avatar.src,
    quote: "Build phải nhanh – chạy phải mượt, anh thấy chỗ này chưa wow Quý à",
    skills: ["NEXT.JS", "Tailwindcss", "Redis", "Kiểm Định Trò chơi"],
    bio: "Phụ trách kiểm thử sản phẩm, đưa ra hướng đi và thiết kế hệ thống câu hỏi",
  },
  {
    id: "m5",
    name: "Nguyễn Bỉnh Quý",
    age: 21,
    school: "Cao Đẳng Lạng Sơn",
    role: "Frontend Developer",
    avatar: avatar.src,
    quote: "Code chạy được thì đừng bắt sửa ",
    skills: ["NEXT.JS", "Tailwindcss"],
    bio: "Phụ trách kiến trúc FE, thiết kế hệ thống câu hỏi và tiến trình học.",
  },
];

function MemberCard({ m, onOpen, className }) {
  const cls = [
    "group relative w-full overflow-hidden rounded-2xl p-5 text-left  transition-transform duration-200",
    "bg-white/10 ring-1 ring-white/30 shadow-[0_2px_10px_rgba(2,6,23,0.06)] hover:-translate-y-0.5 hover:shadow-[0_4px_18px_rgba(2,6,23,0.1)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  return (
    <button onClick={onOpen} className={cls}>
      <div className="flex items-center gap-3">
        <img
          src={m.avatar}
          alt={m.name}
          className="h-14 w-14 rounded-xl object-cover ring-2 ring-white/50"
        />
        <div>
          <div className="text-base font-extrabold">{m.name}</div>
          <div className="text-xs /95">{m.role}</div>
        </div>
      </div>
      <p className="mt-3 line-clamp-3 text-sm /95">“{m.quote}”</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {m.skills.map((s) => (
          <span
            key={s}
            className="rounded-full bg-white/25 px-3 py-1 text-[11px] ring-1 ring-white/40"
          >
            {s}
          </span>
        ))}
      </div>
    </button>
  );
}

function MemberModal({ m, onClose, onPrev, onNext, index, total }) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/70" onClick={onClose} />
      <div className="absolute inset-x-0 bottom-0 mx-auto w-full max-w-5xl overflow-hidden rounded-t-3xl ring-1 ring-white/20 backdrop-blur-md shadow-[0_4px_18px_rgba(0,0,0,0.08)] sm:inset-0 sm:my-auto sm:rounded-3xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Ảnh lớn nửa trái */}
          <div className="relative h-64 md:h-[520px]">
            <img
              src={m.avatar}
              alt={m.name}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(37,99,235,0.25),rgba(96,165,250,0.0),rgba(96,165,250,0.25))]" />
          </div>
          {/* Info nửa phải */}
          <div className="relative bg-[linear-gradient(180deg,#2563eb_0%,#60a5fa_100%)] p-8 ">
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-xl bg-white/25 p-2 ring-1 ring-white/40"
            >
              <X className="h-5 w-5" />
            </button>
            <h3 className="text-2xl font-black">{m.name}</h3>
            <p className="text-sm /95">{m.role}</p>

            <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div>
                <dt className="/80">Tuổi</dt>
                <dd className="font-semibold">{m.age}</dd>
              </div>
              <div>
                <dt className="/80">Trường/Lớp</dt>
                <dd className="font-semibold">{m.school}</dd>
              </div>
              <div>
                <dt className="/80">Thứ tự</dt>
                <dd className="font-semibold">
                  {index + 1} / {total}
                </dd>
              </div>
            </dl>

            <blockquote className="mt-4 rounded-2xl bg-white/25 p-4  ring-1 ring-white/40">
              “{m.quote}”
            </blockquote>
            <p className="mt-4 /95">{m.bio}</p>

            <div className="mt-5">
              <h4 className="text-xs font-semibold uppercase tracking-wide /90">
                Kỹ năng
              </h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {m.skills.map((s) => (
                  <span
                    key={s}
                    className="rounded-full bg-white/25 px-3 py-1 text-xs ring-1 ring-white/40"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={onPrev}
                className="rounded-xl bg-white/25 px-3 py-2 ring-1 ring-white/40"
              >
                <ChevronLeft className="h-4 w-4" /> Prev
              </button>
              <button
                onClick={onNext}
                className="rounded-xl bg-white px-3 py-2 text-[#0b1a3a]"
              >
                <ChevronRight className="h-4 w-4" /> Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** ----------------- Data ----------------- */
const productHighlights = [
  {
    title: "Lộ trình theo chương",
    desc: "Số đếm – chào hỏi – đồ ăn – giao tiếp hằng ngày. Dạng bài: thẻ từ, nghe‑chọn, ghép cặp, sắp xếp, viết…",
    icon: <Rocket className="h-6 w-6" />,
    pills: ["Card", "Choice", "Match", "Arrange", "Write"],
  },
  {
    title: "Âm thanh chuẩn bản địa",
    desc: "Thu âm người bản xứ, tối ưu dung lượng, phát mượt đa thiết bị.",
    icon: <Sparkles className="h-6 w-6" />,
    pills: [".mp3", "Waveform", "Preload"],
  },
  {
    title: "Theo dõi tiến trình",
    desc: "Điểm, streak, huy hiệu, xếp hạng lớp – học vui mà hiệu quả.",
    icon: <Star className="h-6 w-6" />,
    pills: ["Streak", "Badge", "Leaderboard"],
  },
];

const reasons = [
  "Giới thiệu thành viên: 5 bạn trẻ cùng chung mục tiêu đưa Tiếng Tày đến gần hơn với mọi người.",
  "Gìn giữ & lan toả ngôn ngữ Tày bằng công nghệ.",
  "Miễn phí cho học sinh, sinh viên địa phương.",
  "Tài liệu chuẩn hoá – dễ truy cập – dễ chia sẻ.",
  "Kết nối cộng đồng: người học – người dạy – người bản ngữ.",
  "Dữ liệu mở phục vụ nghiên cứu ngôn ngữ học.",
  "Tự hào quê hương qua sản phẩm số.",
];

const roadmap = [
  {
    step: "Q4/2025",
    title: "Hoàn thiện 5 chương cơ bản",
    desc: "500+ câu hỏi, 300+ audio, CMS giáo viên.",
  },
  {
    step: "Q1/2026",
    title: "App PWA & lớp học",
    desc: "Ngoại tuyến, mời bạn, xếp hạng, phân quyền.",
  },
  {
    step: "Q2/2026",
    title: "AI trợ giảng",
    desc: "Gợi ý lộ trình cá nhân hoá, chấm phát âm cơ bản.",
  },
];

const marketing = [
  {
    title: "Mạng xã hội & CLB",
    desc: "TikTok/Facebook/YouTube shorts – demo bài học, kêu gọi thử nghiệm.",
    icon: <Megaphone className="h-6 w-6" />,
    pills: ["TikTok", "Reels", "Shorts"],
  },
  {
    title: "Trường lớp & sự kiện",
    desc: "Workshop trải nghiệm, mini game, hợp tác CLB Văn hoá Tày – Nùng.",
    icon: <Users className="h-6 w-6" />,
    pills: ["Workshop", "Mini Game", "Đối tác"],
  },
  {
    title: "Đối tác địa phương",
    desc: "Kết nối nhà văn hoá, đài địa phương, bảo tàng để lan toả.",
    icon: <Users className="h-6 w-6" />,
    pills: ["Media", "Museum", "Community"],
  },
];

/** ----------------- Dev smoke tests ----------------- */
if (typeof window !== "undefined") {
  console.groupCollapsed("[AboutHocTiengTay – BLUE SYNC] smoke tests");
  console.assert(
    typeof FeatureCard === "function" && typeof StepCard === "function",
    "FeatureCard/StepCard functions"
  );
  console.assert(
    Array.isArray(productHighlights) && productHighlights.length >= 3,
    "productHighlights >= 3"
  );
  console.assert(Array.isArray(reasons) && reasons.length >= 3, "reasons >= 3");
  console.assert(Array.isArray(roadmap) && roadmap.length >= 3, "roadmap >= 3");
  console.assert(
    Array.isArray(marketing) && marketing.length >= 2,
    "marketing >= 2"
  );
  console.assert(
    Array.isArray(members) && members.length === 5,
    "members length = 5"
  );
  console.groupEnd();
}
