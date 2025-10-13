"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaExchangeAlt, FaUser } from "react-icons/fa";
import { FaPhone } from "react-icons/fa6";
import { GiNotebook } from "react-icons/gi";

const navbarList = [
    {
        id: 1,
        text: "Bài học",
        icon: <GiNotebook size={20} />,
        link: "/learn",
    },
    {
        id: 2,
        text: "Từ điển",
        icon: <FaExchangeAlt size={20} />,
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
        icon: <FaUser size={20} />,
        link: "/about",
    },
];

const LeftNavbar = () => {
    const pathName = usePathname();
    return (
        <nav className="hidden lg:block md:w-3/12 lg:w-2/12 h-screen py-6 border-r-[3px] border-blue-200  px-4 static">
            {/* Logo */}
            <h1 className="text-center text-3xl font-extrabold mb-16 tracking-wide px-4">
                Menu
            </h1>
            {/* Menu */}
            <ul className="flex flex-col gap-3">
                {navbarList.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={item.link}
                            className={`${
                                pathName === item.link
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
