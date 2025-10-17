"use client";
import { useStore } from "@/context/StoreCoursesContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import Arrange from "@/features/questionTypes/Arrange";
import CardQuestion from "@/features/questionTypes/CardQuestion";
import ChoiceAudio from "@/features/questionTypes/ChoiceAudio";
import ChoiceQuestion from "@/features/questionTypes/ChoiceQuestion";
import FillInTheBlank from "@/features/questionTypes/FillInTheBlank";
import MatchQuestion from "@/features/questionTypes/MatchQuestion";
import WriteAnswer from "@/features/questionTypes/WriteAnswer";
import WriteSentence from "@/features/questionTypes/WriteSentence";

function QuestionPart({ lessons, slug }) {
    const router = useRouter();
    const { data, loadLesson, cacheLessons } = useStore();

    const [lessonDetail, setLessonDetail] = useState(lessons || null);
    const [loading, setLoading] = useState(!!slug && !lessons);
    const [error, setError] = useState(null);

    // nạp lesson theo slug (nếu không truyền lessons)
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
            .then((l) => {
                if (alive) setLessonDetail(l);
            })
            .catch((e) => {
                console.error(e);
                if (alive) setError(e);
            })
            .finally(() => {
                if (alive) setLoading(false);
            });

        return () => {
            alive = false;
        };
    }, [slug, lessons, cacheLessons, loadLesson]);

    // fallback: tìm theo slug trong data list (nếu lesson trong list đã có questions)
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

    // flatten theo types
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

    const handlePartComplete = () => {
        if (currentPartIndex < questionParts.length - 1) {
            setCurrentPartIndex((i) => i + 1);
        } else if (slug) {
            router.push("/learn");
        }
    };

    if (loading)
        return <div className="text-center mt-20">Đang tải bài học…</div>;
    if (error)
        return (
            <div className="text-center mt-20 text-red-500">Lỗi tải bài.</div>
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
        </div>
    );
}

export default QuestionPart;
