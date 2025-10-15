"use client";
import { usePathname, useRouter } from "next/navigation";
import {  navbarList  } from "@/components/LeftNavbar"

export default function MobileNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed top-20 left-0 right-0 bg-white border-b-2 text-gray-900 flex justify-around items-center py-1 border-gray-400 z-50 lg:hidden">
      {navbarList.map((item) => { 
        const active = pathname === item.link;
        return (
          <button
            key={item.id}
            onClick={() => router.push(item.link)}
            className={` ${active ? " bg-gray-200" : "text-gray-400"} flex items-center justify-center focus:outline-none w-10 h-10 rounded-full transition-all duration-150 ease-in-out`}
          >
            <span className={`${active ? "text-blue-500 " : "text-gray-400"}`}>{item.icon}</span>
          </button>
        );
      })}
    </nav>
  );
}
