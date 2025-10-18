"use client";
import { getRecognition, similarityScore } from "@/utils/speech";
import { useEffect, useMemo, useRef, useState } from "react";

/**
 * Props:
 * - questionData: [{ id, text, audio, tip }]
 * - userId
 * - apiBase
 * - onSaved({ score })
 * - onSkip()
 */
export default function Pronounce({
    questionData = [],
    userId,
    apiBase,
    onSaved,
    onSkip,
}) {
    const item = questionData[0];
    const [recogReady, setRecogReady] = useState(false);
    const [listening, setListening] = useState(false);
    const [recognized, setRecognized] = useState("");
    const [score, setScore] = useState(null);
    const [startTs, setStartTs] = useState(null);

    const recogRef = useRef(null);
    const audioRef = useRef(null);

    // init recognition
    useEffect(() => {
        const r = getRecognition();
        if (!r) {
            setRecogReady(false);
            return;
        }
        r.onresult = (e) => {
            const t = Array.from(e.results)
                .map((x) => x[0].transcript)
                .join(" ");
            setRecognized(t);
        };
        r.onend = () => setListening(false);
        recogRef.current = r;
        setRecogReady(true);
        return () => {
            try {
                r.abort();
            } catch {}
        };
    }, []);

    // reset state when đổi câu
    useEffect(() => {
        setRecognized("");
        setScore(null);
        setListening(false);
    }, [item?.id]);

    const playSample = () => {
        if (!item?.audio) return;
        if (!audioRef.current) audioRef.current = new Audio(item.audio);
        audioRef.current.pause();
        audioRef.current.src = item.audio;
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(() => {});
    };

    const start = () => {
        if (!recogRef.current) return;
        setRecognized("");
        setScore(null);
        setListening(true);
        setStartTs(Date.now());
        try {
            recogRef.current.start();
        } catch {}
    };

    const stop = () => {
        if (!recogRef.current) return;
        try {
            recogRef.current.stop();
        } catch {}
    };

    const evaluate = useMemo(() => {
        if (!item?.text || !recognized) return null;
        return similarityScore(item.text, recognized);
    }, [item?.text, recognized]);

    useEffect(() => {
        if (evaluate !== null) setScore(evaluate);
    }, [evaluate]);

    const postAttempt = async (payload) => {
        try {
            await fetch(`${apiBase}/pronounce/attempt`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });
        } catch {
            // ignore
        }
    };

    const handleSkip = async () => {
        const durationMs = startTs ? Date.now() - startTs : null;
        await postAttempt({
            userId,
            exerciseId: item.id,
            recognizedText: "",
            score: 0,
            durationMs,
            skipped: true,
        });
        onSkip?.();
    };

    const handleSave = async () => {
        const durationMs = startTs ? Date.now() - startTs : null;
        await postAttempt({
            userId,
            exerciseId: item.id,
            recognizedText: recognized,
            score: score ?? 0,
            durationMs,
            skipped: false,
        });
        onSaved?.({ score: score ?? 0 });
    };

    return (
        <div className="bg-white rounded-xl p-5 shadow">
            <div className="mb-4">
                <div className="text-sm text-gray-500 mb-1">
                    Nghe mẫu & lặp lại
                </div>
                <div className="text-2xl font-semibold">{item?.text}</div>
                {item?.tip && (
                    <div className="text-sm text-gray-500 mt-1">{item.tip}</div>
                )}
            </div>

            <div className="flex items-center gap-2 mb-4">
                <button onClick={playSample} className="cst_btn-secondary">
                    Nghe mẫu
                </button>

                {recogReady ? (
                    listening ? (
                        <button onClick={stop} className="cst_btn-danger">
                            Dừng ghi
                        </button>
                    ) : (
                        <button onClick={start} className="cst_btn-primary">
                            Bắt đầu ghi
                        </button>
                    )
                ) : (
                    <span className="text-xs text-red-500">
                        Trình duyệt không hỗ trợ ghi âm (Web Speech).
                    </span>
                )}

                {/* Bỏ qua */}
                <button
                    onClick={handleSkip}
                    className="ml-auto bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md"
                >
                    Bỏ qua
                </button>
            </div>

            <div className="bg-gray-50 rounded-lg p-3">
                <div className="text-xs text-gray-500 mb-1">Bạn nói:</div>
                <div className="min-h-[40px]">
                    {recognized || <span className="text-gray-400">—</span>}
                </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <div className="text-sm">
                    Điểm khớp:{" "}
                    <span
                        className={
                            (score ?? 0) >= 80
                                ? "text-green-600 font-semibold"
                                : "text-gray-700 font-semibold"
                        }
                    >
                        {score ?? 0}%
                    </span>
                    {score >= 80
                        ? " ✅ Tốt!"
                        : score != null
                        ? " — thử lại để cao hơn nhé!"
                        : ""}
                </div>

                <button
                    onClick={handleSave}
                    className="cst_btn-primary"
                    disabled={score == null}
                >
                    Lưu & tiếp tục
                </button>
            </div>
        </div>
    );
}
