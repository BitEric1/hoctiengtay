"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChalkboardTeacher, FaInfoCircle } from "react-icons/fa";
import { FaBookAtlas, FaBookOpenReader, FaCompass, FaEnvelopeOpenText } from "react-icons/fa6";



export const navbarList = [

    {
        id: 1,
        text: "Bài học",
        icon: <FaBookOpenReader size={20} className="text-blue-500" />, // sách mở
        link: "/learn",
    },
    {
        id: 0,
        text: "Khám phá",
        icon: <FaCompass size={20} className="text-sky-500" />, // biểu tượng la bàn
        link: "/",
    },
    {
        id: 2,
        text: "Dịch & Từ điển",
        icon: <FaBookAtlas size={20} className="text-emerald-500" />, // mũ tốt nghiệp
        link: "/translate",
    },
    {
        id: 3,
        text: "Liên hệ",
        icon: <FaEnvelopeOpenText size={20} className="text-orange-500" />, // thư mở
        link: "/contact",
    },
    {
        id: 4,
        text: "Về chúng tôi",
        icon: <FaInfoCircle size={20} className="text-purple-500" />, // chữ i thông tin
        link: "/about",
    },
    {
        id: 5,
        text: "Khoá học",
        icon: <FaChalkboardTeacher size={20} className="text-pink-500" />, // giáo viên bảng
        link: "/courses",
    },
];

const LeftNavbar = () => {
    const pathName = usePathname();

    return (
        <nav className="hidden lg:block md:w-3/12 lg:w-2/12 py-6 border-r-[3px] border-blue-200 px-4 static">
            <ul className="flex flex-col gap-3">
                {navbarList.map((item) => (
                    <li key={item.id}>
                        <Link
                            href={item.link}
                            className={`${pathName === item.link
                                ? "bg-gradient-to-r from-blue-300 to-blue-400 text-white"
                                : ""
                                } flex items-center pl-4 gap-3 py-3 rounded-2xl text-lg font-medium hover:bg-black/5 transition-all duration-300 ease-in-out`}
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
