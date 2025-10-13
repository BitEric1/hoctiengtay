// app/courses/[slug]/page.jsx
"use client";
import CourseDetail from "@/components/CourseDetail"; // sửa path theo project

export default function Page({ params }) {
    return <CourseDetail slug={params.slug} />;
}
