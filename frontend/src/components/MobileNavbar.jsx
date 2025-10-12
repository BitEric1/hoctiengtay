// filepath: src/components/MobileNavbar.jsx
"use client";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { FaExchangeAlt, FaPhone } from "react-icons/fa";
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
];

const MobileNavbar = () => {
  const pathName = usePathname();
  return (
    <nav className="flex lg:hidden w-full bg-white border-b-2 border-gray-200 fixed top-0 left-0 z-40 h-14">
      <ul className="flex w-full justify-around items-center h-full">
        {navbarList.map((item) => (
          <li key={item.id}>
            <Link
              href={item.link}
              className={`flex flex-col items-center text-xs ${pathName === item.link ? "text-blue-600 font-bold" : "text-gray-600"}`}
            >
              {item.icon}
              <span>{item.text}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default MobileNavbar;