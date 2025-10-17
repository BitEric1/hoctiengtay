"use client";
import Image from "next/image";
import Link from "next/link";
import { FaFireAlt, FaClock, FaTags } from "react-icons/fa";
import * as img from "@/assets/imgs/index.js";
import {  useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
export const posts = [
  {
    id: 1,
    title: "10 cách học ngôn ngữ hiệu quả mà không cần cố gắng",
    desc: "Từ việc tạo thói quen đến áp dụng học qua văn hóa — cách người học thành công duy trì động lực mỗi ngày.",
    image: img.banner,
    tag: "Ngôn ngữ",
    time: "12 phút đọc",
  },
  {
    id: 2,
    title: "Học qua âm nhạc – Khi giai điệu thay giáo trình",
    desc: "Các nghiên cứu cho thấy não bộ ghi nhớ từ vựng tốt hơn khi kết hợp với nhịp điệu.",
    image: img.banner,
    tag: "Âm nhạc",
    time: "8 phút đọc",
  },
  {
    id: 3,
    title: "Tại sao người Pháp nói nhanh – và làm sao để nghe hiểu họ?",
    desc: "Một góc nhìn ngôn ngữ học về cách người Pháp rút âm và nối chữ khiến người học 'đuối'.",
    image: img.banner,
    tag: "Văn hóa",
    time: "10 phút đọc",
  },
];

export default function ExplorePage() {
  const router = useRouter();
  return (
    <div className="max-w-screen-xl mx-auto  min-h-screen pb-16  mt-[120px]">
      {/* Nút quay lại */}
            <div className="my-8">
              <button
                onClick={() => router.push("/learn")}
                className="cst_btn-primary flex items-center gap-1">
                <FaArrowLeft size={14} />
                Quay lại học
              </button>
            </div>
      {/* Hero */}
      <section className="mb-12">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-snug">
              Khám phá những góc nhìn mới trong lối sống và văn hoá của bà con
              người Tày
            </h1>
            <p className="text-gray-600 text-lg mb-6">
              Nơi tổng hợp các bài viết, phân tích và trải nghiệm giúp bạn mở
              rộng tính tò mò của bạn
            </p>
            <Link
              href="#featured"
              className="inline-block bg-blue-600 text-white font-semibold px-6 py-3 rounded-lg shadow hover:bg-blue-700 transition"
            >
              Bắt đầu đọc
            </Link>
          </div>
          <div className="relative w-full h-[300px] lg:h-[400px] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={img.banner}
              alt="Khám phá tri thức"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section id="featured" className="">
        <div className="flex items-center gap-2 mb-6">
          <FaFireAlt className="text-red-500" size={22} />
          <h2 className="text-2xl font-bold text-gray-800">Bài nổi bật</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <Link
              href={`/explore/bai-viet-${post.id}`}
              key={post.id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              <div className="relative w-full h-52 overflow-hidden">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4 flex flex-col gap-2">
                <span className="inline-flex items-center gap-2 text-xs font-semibold text-blue-600 uppercase tracking-wide">
                  <FaTags size={12} /> {post.tag}
                </span>
                <h3 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600 transition">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-3">
                  {post.desc}
                </p>
                <div className="flex items-center gap-2 text-gray-400 text-xs mt-2">
                  <FaClock /> {post.time}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
