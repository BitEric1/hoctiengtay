"use client";
import Pronounce from "@/features/questionTypes/Pronounce";
import { useEffect, useMemo, useState } from "react";

const PASS_THRESHOLD = 80; // >= 80% tính là đạt

export default function PronunciationSession({
    items = [],
    target = 5,
    userId,
    apiBase,
    sessionKey, // localStorage key
    initialSession = { idx: 0, passed: 0 },
}) {
    const [idx, setIdx] = useState(initialSession?.idx ?? 0);
    const [passed, setPass] = useState(initialSession?.passed ?? 0);

    const list = useMemo(() => items.map((x) => ({ ...x })), [items]);
    const cur = list[Math.min(idx, list.length - 1)];

    // Lưu session (server -> local fallback)
    useEffect(() => {
        const payload = {
            userId,
            date: new Date().toISOString().slice(0, 10),
            idx,
            passed,
        };
        // 1) server (nếu có)
        (async () => {
            try {
                await fetch(`${apiBase}/pronounce/session`, {
                    method: "PUT",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(payload),
                });
            } catch {
                // ignore
            }
        })();
        // 2) local fallback
        try {
            localStorage.setItem(sessionKey, JSON.stringify({ idx, passed }));
        } catch {}
    }, [idx, passed, apiBase, sessionKey, userId]);

    const moveNext = () => {
        if (idx < list.length - 1) setIdx((i) => i + 1);
    };

    const handleSaved = ({ score }) => {
        // đếm là "đạt" nếu >= PASS_THRESHOLD
        if (score >= PASS_THRESHOLD) setPass((p) => p + 1);
        moveNext();
    };

    const handleSkipped = () => {
        // skip: không tăng passed
        moveNext();
    };

    const handleAllDone = () => {
        // tuỳ ý hiển thị toast
        alert("Hoàn tất luyện phát âm!");
    };

    useEffect(() => {
        if (idx >= list.length) handleAllDone();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [idx, list.length]);

    const percent = Math.round((Math.min(passed, target) / target) * 100);

    return (
        <div className="max-w-5xl mx-auto grid lg:grid-cols-[1fr_320px] gap-6">
            <div>
                <Pronounce
                    userId={userId}
                    apiBase={apiBase}
                    questionData={[cur]}
                    onSaved={handleSaved} // <- lưu xong (không skip)
                    onSkip={handleSkipped} // <- bỏ qua
                />
                <div className="text-center text-sm text-gray-500 mt-2">
                    Câu {Math.min(idx + 1, list.length)}/{list.length}
                </div>
            </div>

            <aside className="bg-white rounded-xl p-5 shadow h-fit sticky top-24">
                <h3 className="font-semibold mb-2">Tiến độ hôm nay</h3>
                <div className="flex justify-between text-sm mb-1">
                    <span>Hoàn thành</span>
                    <span>
                        {passed}/{target}
                    </span>
                </div>
                <div className="h-2 rounded bg-gray-200 overflow-hidden">
                    <div
                        className="h-2 bg-blue-600"
                        style={{ width: `${percent}%` }}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-2">
                    Mẹo: đạt mục tiêu mỗi ngày để duy trì streak!
                </p>
            </aside>
        </div>
    );
}
