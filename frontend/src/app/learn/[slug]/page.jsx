"use client";
import QuestionPart from "@/components/Question";
import { useParams } from "next/navigation";

export default function PageBaiHoc() {
    const { slug } = useParams(); // ví dụ "chuong1-bai1"
    return (
        <div className="mt-24">
            <QuestionPart slug={slug} />
        </div>
    );
}
