"use client";
import { useStore } from "@/context/StoreCoursesContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

// các type màn hỏi
import Arrange from "@/features/questionTypes/Arrange";
import CardQuestion from "@/features/questionTypes/CardQuestion";
import ChoiceAudio from "@/features/questionTypes/ChoiceAudio";
import ChoiceQuestion from "@/features/questionTypes/ChoiceQuestion";
import FillInTheBlank from "@/features/questionTypes/FillInTheBlank";
import MatchQuestion from "@/features/questionTypes/MatchQuestion";
import WriteAnswer from "@/features/questionTypes/WriteAnswer";
import WriteSentence from "@/features/questionTypes/WriteSentence";
import CompletePopup from "./CompletePopup";

function QuestionPart({ lessons, slug }) {
    const router = useRouter();
    const { data, loadLesson, cacheLessons, updateProgress } = useStore();

    const [lessonDetail, setLessonDetail] = useState(lessons || null);
    const [loading, setLoading] = useState(!!slug && !lessons);
    const [error, setError] = useState(null);

    // nạp lesson theo slug (nếu không truyền sẵn "lessons")
    useEffect(() => {
        let alive = true;
        if (!slug || lessons) return;

        const key = Array.isArray(slug) ? slug.join("/") : String(slug || "");
        if (cacheLessons[key]) {
            setLessonDetail(cacheLessons[key]);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);
        loadLesson(slug)
            .then((l) => alive && setLessonDetail(l))
            .catch((e) => {
                console.error(e);
                if (alive) setError(e);
            })
            .finally(() => alive && setLoading(false));

        return () => {
            alive = false;
        };
    }, [slug, lessons, cacheLessons, loadLesson]);

    // fallback: tìm theo slug trong list đã có
    useEffect(() => {
        if (lessonDetail || !slug || !data?.length) return;
        const s = Array.isArray(slug) ? `/${slug.join("/")}` : `/${slug}`;
        for (const unit of data) {
            const found = unit.lessons?.find(
                (l) => l.slug === s || l.slug === s.replace(/^\//, "")
            );
            if (found?.questions) {
                setLessonDetail(found);
                break;
            }
        }
    }, [slug, data, lessonDetail]);

    // làm phẳng theo types
    const questionParts = useMemo(() => {
        if (!lessonDetail?.questions) return [];
        return lessonDetail.questions.flatMap((group) =>
            (group.types || []).map((type) => ({
                type,
                data: group.questions || [],
            }))
        );
    }, [lessonDetail]);

    const [currentPartIndex, setCurrentPartIndex] = useState(0);
    const currentPart = questionParts[currentPartIndex];
    const [showCompletePopup, setShowCompletePopup] = useState(false);

    // gọi cập nhật tiến độ mỗi khi xong 1 phần
    const handlePartComplete = async () => {
        const total = questionParts.length || 1;
        const nextIndex = currentPartIndex + 1;
        const percent = Math.min(100, Math.round((nextIndex / total) * 100));

        // cập nhật tiến độ trên server (mở khoá bài kế tiếp sẽ dựa vào đây)
        if (slug) {
            await updateProgress(slug, percent);
        }

        if (nextIndex < total) {
            setCurrentPartIndex(nextIndex);
        } else {
            // xong bài -> đảm bảo 100% và hiện popup hoàn thành
            if (slug) await updateProgress(slug, 100);
            // show confirmation popup instead of immediate redirect
            setShowCompletePopup(true);
        }
    };

    if (loading)
        return <div className="text-center mt-20">Đang tải bài học…</div>;
    if (error)
        return (
            <div className="text-center mt-20 text-red-500">
                Lỗi tải bài học.
            </div>
        );
    if (!lessonDetail)
        return <div className="text-center mt-20">Không tìm thấy bài học.</div>;
    if (!currentPart || !currentPart.data?.length)
        return (
            <div className="text-center mt-20">Bài học chưa có câu hỏi.</div>
        );

    const typeToComponentMap = {
        Card: CardQuestion,
        ChoiceQuestion,
        ChoiceAudio,
        FillInTheBlank,
        WriteAnswer,
        MatchQuestion,
        Arrange,
        WriteSentence,
    };

    const Component = typeToComponentMap[currentPart.type];

    return (
        <div className="p-5">
            <div className="flex justify-start">
                <Link href="/learn" className="cst_btn-danger">
                    Thoát
                </Link>
            </div>

            {Component ? (
                <Component
                    questionData={currentPart.data}
                    onComplete={handlePartComplete}
                />
            ) : (
                <p>Không thể tải được câu hỏi (type: {currentPart.type}).</p>
            )}
            {showCompletePopup && (
                <CompletePopup
                    onNext={() => {
                        setShowCompletePopup(false);
                        router.push("/learn");
                    }}
                />
            )}
        </div>
    );
}

export default QuestionPart;
