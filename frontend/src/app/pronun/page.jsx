"use client";
import PronunciationSession from "@/components/PronunciationSession";
import { useEffect, useState } from "react";

const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5500/api/v1";
const USER_ID = 1; // TODO: thay bằng id đăng nhập thực

const todayKey = () => new Date().toISOString().slice(0, 10);
const LS_KEY = (uid) => `pronounce:session:${uid}:${todayKey()}`;

export default function PagePronunciation() {
    const [items, setItems] = useState([]);
    const [target, setTarget] = useState(5);
    const [initialSession, setInitialSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState(null);

    // helper: load từ localStorage nếu backend chưa có session API
    const loadSessionLocal = () => {
        try {
            const raw = localStorage.getItem(LS_KEY(USER_ID));
            return raw ? JSON.parse(raw) : null;
        } catch {
            return null;
        }
    };

    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoading(true);
                setErr(null);

                // 1) lấy gói bài luyện trong ngày
                const res = await fetch(
                    `${API_BASE}/pronounce/daily?userId=${USER_ID}&limit=10`
                );
                if (!res.ok) throw new Error(`Status ${res.status}`);
                const json = await res.json();
                if (!alive) return;

                setItems(json.items || []);
                setTarget(json.target || 5);

                // 2) khôi phục vị trí / tiến trình đã lưu (ưu tiên server)
                let sess = null;
                try {
                    const r = await fetch(
                        `${API_BASE}/pronounce/session?userId=${USER_ID}&date=${todayKey()}`
                    );
                    if (r.ok) sess = await r.json();
                } catch {
                    // ignore
                }
                if (!sess) sess = loadSessionLocal();
                if (alive) setInitialSession(sess || { idx: 0, passed: 0 });
            } catch (e) {
                if (alive) setErr(e);
            } finally {
                if (alive) setLoading(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, []);

    if (loading)
        return <div className="mt-24 text-center">Đang tải gói phát âm…</div>;
    if (err)
        return (
            <div className="mt-24 text-center text-red-500">
                Lỗi tải dữ liệu.
            </div>
        );
    if (!items.length)
        return (
            <div className="mt-24 text-center">Hôm nay chưa có bài luyện.</div>
        );

    return (
        <div className="mt-24 px-4">
            <div className="max-w-5xl mx-auto mb-5">
                <h1 className="text-2xl font-bold">Luyện phát âm</h1>
                <p className="text-sm text-gray-500">
                    Mục tiêu hôm nay: {target} câu
                </p>
            </div>
            <PronunciationSession
                items={items}
                target={target}
                userId={USER_ID}
                sessionKey={LS_KEY(USER_ID)}
                apiBase={API_BASE}
                initialSession={initialSession}
            />
        </div>
    );
}
