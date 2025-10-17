"use client";
import { resolveMedia } from "@/utils/media";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(undefined);

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5500/api/v1";
const USER_ID = 1; // tạm hard-code để trả về % tiến độ

export const StoreProvider = ({ children }) => {
    const [data, setData] = useState([]); // danh sách chương + bài (để vẽ màn list)
    const [cacheLessons, setCacheLessons] = useState({}); // {slug: lessonDetail}

    // tải danh sách chương/bài
    useEffect(() => {
        fetch(`${API_BASE}/courses/chapters?userId=${USER_ID}`)
            .then((r) => r.json())
            .then(setData)
            .catch(console.error);
    }, []);

    // tải chi tiết 1 bài học theo slug -> cấu trúc y hệt FE đang dùng trước đây

    const normalizeSlug = (s) => (s?.startsWith("/") ? s : `/${s}`);

    const loadLesson = async (slug, { hideCorrect = true } = {}) => {
        if (cacheLessons[slug]) return cacheLessons[slug];

        const s = normalizeSlug(slug);
        const url = `${API_BASE}/courses/lessons/${encodeURIComponent(
            s
        )}?hideCorrect=${hideCorrect ? 1 : 0}`;
        const res = await fetch(url);
        const json = await res.json();

        const mapped = {
            ...json,
            questions: (json.questions || []).map((g) => {
                // nhóm điền khuyết
                if (g.types && g.types.includes("FillInTheBlank")) {
                    return {
                        ...g,
                        questions: (g.questions || []).map((q) => ({
                            ...q,
                            audio: resolveMedia(q.audio),
                        })),
                    };
                }
                // nhóm từ vựng
                return {
                    ...g,
                    questions: (g.questions || []).map((q) => ({
                        ...q,
                        img: resolveMedia(q.img),
                        audio: resolveMedia(q.audio),
                    })),
                };
            }),
        };

        setCacheLessons((prev) => ({ ...prev, [slug]: mapped }));
        return mapped;
    };

    const value = useMemo(
        () => ({ data, setData, loadLesson, cacheLessons }),
        [data, cacheLessons]
    );
    return (
        <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
    );
};

export const useStore = () => {
    const ctx = useContext(StoreContext);
    if (!ctx) throw new Error("useStore phải được sử dụng trong StoreProvider");
    return ctx;
};
