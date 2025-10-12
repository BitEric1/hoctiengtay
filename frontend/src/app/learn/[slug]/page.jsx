"use client";
import QuestionPart from "@/components/Question";
import { useParams } from "next/navigation";

export default function LearnPage() {
  const { slug } = useParams();
  return (
    <div className="mt-24">
      <QuestionPart slug={slug} />
    </div>
  );
}
