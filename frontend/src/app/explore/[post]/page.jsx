"use client";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { FaClock, FaUser, FaArrowLeft } from "react-icons/fa";
import Link from "next/link";
import * as img from "@/assets/imgs/index.js";
export default function ArticlePage() {
  const { slug } = useParams();
  const router = useRouter();

  // Dữ liệu giả lập
  const article = {
    title: "10 cách học ngôn ngữ hiệu quả mà không cần cố gắng",
    author: "Nguyễn Lan",
    date: "17 Tháng 10, 2025",
    time: "12 phút đọc",
    image: img.danCa,
    content: `
      <p>
        Học ngôn ngữ không chỉ là ghi nhớ từ vựng hay ngữ pháp – đó là hành trình
        thay đổi cách nhìn nhận về thế giới. Mỗi từ mới bạn học, là một lối đi mới
        mở ra trong tâm trí.
      </p>
      <p>
        Một phương pháp hiệu quả là gắn ngôn ngữ với cảm xúc: xem phim, nghe nhạc,
        hoặc đọc truyện ngắn bằng ngôn ngữ bạn đang học. Não bộ của bạn phản ứng
        mạnh mẽ hơn với nội dung có cảm xúc thực, thay vì chỉ học qua flashcard khô khan.
      </p>
      <blockquote>
        "Ngôn ngữ là tấm gương phản chiếu của tâm trí — học nói chính là học suy nghĩ."
      </blockquote>
      <p>
        Khi bạn biến việc học thành thói quen nhỏ mỗi ngày, thay vì ép buộc bản thân,
        kết quả sẽ đến một cách tự nhiên. Hãy kiên nhẫn, và thưởng thức từng bước đi nhỏ.
      </p>
    `,
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-[120px] pb-24">
      {/* Nút quay lại */}
      <div className="my-8">
        <button
          onClick={() => router.push("/explore")}
          className="cst_btn-primary flex items-center gap-1"
        >
          <FaArrowLeft size={14} />
          Quay lại
        </button>
      </div>

      {/* Ảnh đầu bài */}
      <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-lg mb-8">
        <Image
          src={article.image}
          alt={article.title}
          fill
          className="object-cover"
        />
      </div>

      {/* Tiêu đề + meta */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-snug">
          {article.title}
        </h1>
        <div className="flex items-center justify-center gap-4 text-gray-500 text-sm">
          <span className="flex items-center gap-2">
            <FaUser /> {article.author}
          </span>
          <span>{article.date}</span>
          <span className="flex items-center gap-2">
            <FaClock /> {article.time}
          </span>
        </div>
      </div>

      {/* Nội dung bài viết */}
      <article
        className="prose prose-lg prose-blue max-w-none text-gray-800 leading-relaxed"
        dangerouslySetInnerHTML={{ __html: article.content }}
      />

      {/* Đường phân cách */}
      <hr className="my-12 border-gray-300" />

      {/* Gợi ý đọc thêm */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Bài viết liên quan</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Link
              key={i}
              href={`/explore/bai-viet-${i}`}
              className="group bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition overflow-hidden"
            >
              <div className="relative w-full h-40 overflow-hidden">
                <Image
                  src={img.danCa}
                  alt="related"
                  fill
                  className="object-cover group-hover:scale-105 transition duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-gray-800 font-semibold group-hover:text-blue-600 transition line-clamp-2">
                  Khám phá ngôn ngữ qua văn hóa – Bài số {i}
                </h3>
                <p className="text-sm text-gray-500 mt-2 line-clamp-3">
                  Một góc nhìn thú vị về cách con người học thông qua giao tiếp
                  và cảm xúc.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
