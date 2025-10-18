"use client";
import { hydrateLesson } from "@/utils/tokenToAsset";
import { createContext, useContext, useEffect, useMemo, useState } from "react";

const StoreContext = createContext(undefined);

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5500/api/v1";
const USER_ID = 1; // tạm thời hard-code

export const StoreProvider = ({ children }) => {
    // danh sách chương/bài (để vẽ màn list)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // cache chi tiết lesson theo slug
    const [cacheLessons, setCacheLessons] = useState({});

    // --- nạp danh sách chương/bài + % tiến độ
    const fetchChapters = async () => {
        try {
            setLoading(true);
            setError(null);
            const res = await fetch(
                `${API_BASE}/courses/chapters?userId=${USER_ID}`
            );
            if (!res.ok) throw new Error(`Status ${res.status}`);
            const json = await res.json();
            setData(json || []);
        } catch (e) {
            console.error(e);
            setError(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        let alive = true;
        (async () => {
            await fetchChapters();
            if (!alive) return;
        })();
        return () => {
            alive = false;
        };
    }, []);

    // --- nạp chi tiết 1 bài học theo slug (và map token -> asset local)
    const loadLesson = async (slug) => {
        const key = Array.isArray(slug) ? slug.join("/") : String(slug || "");
        if (cacheLessons[key]) return cacheLessons[key];

        const seg = key.replace(/^\//, "");
        const res = await fetch(`${API_BASE}/courses/lessons/${seg}`);
        if (!res.ok) throw new Error(`Lesson ${seg} -> ${res.status}`);
        const json = await res.json();
        const mapped = hydrateLesson(json);

        setCacheLessons((prev) => ({ ...prev, [key]: mapped }));
        return mapped;
    };

    // --- cập nhật tiến độ 1 lesson và refresh danh sách
    const updateProgress = async (slug, percent) => {
        try {
            const seg = (
                Array.isArray(slug) ? slug.join("/") : String(slug || "")
            ).replace(/^\//, "");
            await fetch(`${API_BASE}/courses/lessons/${seg}/progress`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userId: USER_ID, percent }),
            });
            await fetchChapters(); // để mở khóa bài tiếp theo / cập nhật % ngay
        } catch (e) {
            console.error("updateProgress failed:", e);
        }
    };

    const value = useMemo(
        () => ({
            data,
            setData,
            loading,
            error,
            loadLesson,
            cacheLessons,
            refreshChapters: fetchChapters,
            updateProgress,
        }),
        [data, loading, error, cacheLessons]
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
