"use client"; // Đánh dấu đây là một Client Component

import LangSelect from "@/components/translate/LangSelect";
import Spinner from "@/components/translate/Spinner";
import WordCard from "@/components/translate/WordCard";
import { useDebounce } from "@/hooks/useDebounce"; // Dùng alias @/
import { useEffect, useMemo, useRef, useState } from "react";

// API Endpoint nên được đặt trong biến môi trường
const API = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5500/api/v1";

export default function TranslatePage() {
    const [sl, setSl] = useState("tay");
    const [tl, setTl] = useState("vi");
    const [q, setQ] = useState("");
    const [result, setResult] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const abortRef = useRef();

    const debouncedQ = useDebounce(q, 300);

    // Fetch gợi ý
    useEffect(() => {
        if (!debouncedQ) {
            setSuggestions([]);
            return;
        }

        const fetchSuggestions = async () => {
            try {
                const res = await fetch(
                    `${API}/suggest?sl=${sl}&q=${encodeURIComponent(
                        debouncedQ
                    )}`
                );
                const data = await res.json();
                setSuggestions(data.suggestions ?? []);
            } catch (error) {
                console.error("Failed to fetch suggestions:", error);
                setSuggestions([]);
            }
        };

        fetchSuggestions();
    }, [debouncedQ, sl]);

    // Fetch kết quả dịch
    useEffect(() => {
        if (!debouncedQ) {
            setResult(null);
            return;
        }

        // Hủy request cũ nếu có
        abortRef.current?.abort();
        const controller = new AbortController();
        abortRef.current = controller;

        const translate = async () => {
            setLoading(true);
            setResult(null); // Xóa kết quả cũ khi bắt đầu tìm kiếm mới
            try {
                const res = await fetch(
                    `${API}/translate?sl=${sl}&tl=${tl}&q=${encodeURIComponent(
                        debouncedQ
                    )}`,
                    { signal: controller.signal }
                );
                const data = await res.json();
                setResult(data);
            } catch (error) {
                if (error.name !== "AbortError") {
                    console.error("Translation failed:", error);
                    setResult({ items: [] }); // Đặt kết quả rỗng khi có lỗi
                }
            } finally {
                setLoading(false);
            }
        };

        translate();

        return () => controller.abort();
    }, [debouncedQ, sl, tl]);

    function swap() {
        setSl(tl);
        setTl(sl);
        setQ(""); // Reset input khi đổi ngôn ngữ
        setResult(null);
        setSuggestions([]);
    }

    const uniqSuggestions = useMemo(
        () => Array.from(new Set((suggestions || []).filter(Boolean))),
        [suggestions]
    );

    return (
        <div className="bg-gray-50 min-h-screen">
            <main className="max-w-4xl mx-auto p-4 md:p-6 lg:p-8 font-sans">
                <header className="text-center mb-8">
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
                        Dịch Tày ↔ Việt
                    </h1>
                    <p className="text-gray-600 mt-2">
                        Từ điển và công cụ dịch thuật thông minh
                    </p>
                </header>

                <div className="bg-white p-4 rounded-xl shadow-lg">
                    {/* Language Selector */}
                    <div className="flex justify-center items-center gap-2 md:gap-4 mb-4">
                        <LangSelect label="Từ" value={sl} onChange={setSl} />
                        <button
                            onClick={swap}
                            title="Đảo chiều ngôn ngữ"
                            className="p-2 rounded-full text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors duration-200"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M17 2.1l4 4-4 4" />
                                <path d="M3 12.6V8c0-1.1.9-2 2-2h14" />
                                <path d="M7 21.9l-4-4 4-4" />
                                <path d="M21 11.4V16c0 1.1-.9 2-2 2H5" />
                            </svg>
                        </button>
                        <LangSelect label="Sang" value={tl} onChange={setTl} />
                    </div>

                    {/* Input Textarea */}
                    <textarea
                        rows={3}
                        placeholder={
                            sl === "tay"
                                ? "Nhập từ/cụm Tày..."
                                : "Nhập nghĩa tiếng Việt..."
                        }
                        value={q}
                        onChange={(e) => setQ(e.target.value)}
                        className="w-full p-3 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-none text-lg"
                    />

                    {/* Suggestions */}
                    {uniqSuggestions.length > 0 && sl === "tay" && (
                        <div className="flex gap-2 flex-wrap mt-3">
                            {uniqSuggestions.slice(0, 8).map((s, i) => (
                                <button
                                    key={`${s}-${i}`}
                                    onClick={() => setQ(s)}
                                    className="px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                                >
                                    {s}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Results */}
                <div className="mt-8">
                    {loading && <Spinner />}
                    {!loading &&
                        result &&
                        (result.items?.length > 0 ? (
                            <div className="space-y-4">
                                {result.items.map((it, i) => (
                                    <WordCard
                                        key={`${it.id ?? it.matChu}-${i}`}
                                        item={it}
                                    />
                                ))}
                            </div>
                        ) : (
                            debouncedQ && (
                                <div className="text-center py-8 px-4 bg-white rounded-lg shadow-sm">
                                    <p className="text-gray-600">
                                        Không tìm thấy kết quả cho{" "}
                                        <strong className="text-gray-800">
                                            "{debouncedQ}"
                                        </strong>
                                        .
                                    </p>
                                </div>
                            )
                        ))}
                </div>
            </main>
        </div>
    );
}
