"use client";
import QuestionPart from "@/components/Question";
import { useStore } from "@/context/StoreCoursesContext";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import Loading from "../loading";

export default function PageBaiHoc() {
    const { slug } = useParams();

    const { loadLesson, cacheLessons } = useStore();
    useEffect(() => {
        loadLesson(slug);
    }, [slug]);
    const lesson = cacheLessons[slug];
    if (!lesson) return <Loading />;
    return (
        <div className="mt-24">
            <QuestionPart slug={slug} />
        </div>
    );
}
