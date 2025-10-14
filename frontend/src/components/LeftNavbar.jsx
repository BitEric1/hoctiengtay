"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { FaBookAtlas, FaPhone } from "react-icons/fa6";
import { FaHome  } from "react-icons/fa";
import { LuFileText, LuNotebookPen } from "react-icons/lu";

const navbarList = [
    {
        id: 0,
        text: "Trang chủ",
        icon: <FaHome size={20} />,
        link: "/",
    },
    {
        id: 1,
        text: "Bài học",
        icon: <LuNotebookPen size={20} />,
        link: "/learn",
    },
    {
        id: 2,
        text: "Từ điển",
        icon: <FaBookAtlas size={20} />,
        link: "/translate",
    },
    {
        id: 3,
        text: "Liên hệ",
        icon: <FaPhone size={20} />,
        link: "/contact",
    },
    {
        id: 4,
        text: "Về chúng tôi",
        icon: <LuFileText size={20} />,
        link: "/about",
    },
];

const LeftNavbar = () => {
    const pathName = usePathname();
    return (
        <nav className="hidden lg:block md:w-3/12 lg:w-2/12 py-6 border-r-[3px] border-blue-200  px-4 static">

            {/* Menu */}
            <ul className="flex flex-col gap-3">
                {navbarList.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={item.link}
                            className={`${pathName === item.link
                                    ? "bg-gradient-to-t from-blue-400 to-blue-500 text-white"
                                    : ""
                                }  flex items-center pl-4 gap-3 py-3 rounded-2xl text-lg font-medium hover:bg-black/5  transition-all duration-300 ease-in-out`}
                        >
                            <span>{item.icon}</span>
                            <span>{item.text}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

export default LeftNavbar;
