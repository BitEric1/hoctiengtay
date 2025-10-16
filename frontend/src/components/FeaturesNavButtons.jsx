"use client";

import { GraduationCap, Languages, Play, Users } from "lucide-react";
import Link from "next/link";

const VARIANTS = {
    blue: "from-blue-600 via-sky-500 to-blue-400 hover:shadow-blue-300",
    teal: "from-teal-500 via-sky-500 to-blue-500 hover:shadow-sky-300",
    indigo: "from-indigo-500 via-blue-500 to-sky-400 hover:shadow-indigo-300",
};

function FeatureButton({ href, label, Icon, variant = "blue" }) {
    return (
        <Link
            href={href}
            aria-label={label}
            className={`text-xs  md:text-sm lg:text-lg  group relative inline-flex items-center justify-center gap-2 overflow-hidden
                  rounded-xl bg-gradient-to-r ${VARIANTS[variant]} px-6 py-3
                  text-lg font-semibold text-white shadow-md transition-all duration-300
                  hover:scale-105`}
        >
            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
            <span>{label}</span>
            {/* shimmer */}
            <span className="pointer-events-none absolute inset-0 translate-x-[-100%] bg-white/20 transition-transform duration-700 ease-out group-hover:translate-x-[100%]" />
        </Link>
    );
}

/** Cấu hình các nút */
const BUTTONS = [
    { href: "/learn", label: "Bắt đầu học", Icon: Play, variant: "blue" },
    {
        href: "/translate",
        label: "Dịch thuật",
        Icon: Languages,
        variant: "teal",
    },
    {
        href: "/courses",
        label: "Khóa học",
        Icon: GraduationCap,
        variant: "indigo",
    },
    { href: "/about", label: "Về chúng tôi", Icon: Users, variant: "indigo" },
];

export default function FeaturesNavButtons() {
    return (
        <div className="grid  grid-cols-1  md:grid-cols-3 lg:grid-cols-4  gap-4 items-center">
            {BUTTONS.map((b) => (
                <FeatureButton key={b.href} {...b} />
            ))}
        </div>
    );
}
