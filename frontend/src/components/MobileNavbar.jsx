"use client";
import { usePathname, useRouter } from "next/navigation";
import { FaHome  } from "react-icons/fa";
import { LuNotebookPen } from "react-icons/lu";
import { FaBookAtlas } from "react-icons/fa6";
import { FaPhone } from "react-icons/fa6";
import { LuFileText } from "react-icons/lu";
const navItems = [
  { icon: FaHome, path: "/", label: "Home" },
  { icon: LuNotebookPen, path: "/learn", label: "Learn" },
  { icon: FaBookAtlas, path: "/translate", label: "Translate" },
  { icon: FaPhone, path: "/contact", label: "Contact" },
  { icon: LuFileText, path: "/about", label: "About" },
];

export default function MobileNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <nav className="fixed top-20 left-0 right-0 bg-white border-b-2 text-gray-900 flex justify-around items-center py-2 border-gray-400 z-50 md:hidden">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.path;

        return (
          <button
            key={item.path}
            onClick={() => router.push(item.path)}
            className="flex flex-col items-center focus:outline-none"
          >
            <Icon className={`text-2xl ${active ? "text-blue-500" : "text-gray-400"}`} />
            <div
              className={`h-[2px] mt-1 rounded-full transition-all ${
                active ? "bg-blue-500 w-6" : "bg-transparent w-0"
              }`}
            />
          </button>
        );
      })}
    </nav>
  );
}
