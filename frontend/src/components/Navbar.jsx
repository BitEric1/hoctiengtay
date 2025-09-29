import Link from "next/link";
import { FaHome, FaBookOpen, FaPhone } from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
const Navbar = () => {
  return (
    <nav className="w-2/12 h-screen p-6 bg-gradient-to-t from-blue-500 to-blue-700 rounded-r-xl text-white shadow-lg">
      {/* Logo */}
      <h1 className="text-center text-3xl font-extrabold mb-16 tracking-wide">
        Logo
      </h1>

      {/* Menu */}
      <ul className="flex flex-col gap-3">
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 hover:pl-6 border-l-4 border-transparent hover:border-white transition-all duration-300 ease-in-out"
          >
            <FaHome size={18} />
            <span>Trang chủ</span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 hover:pl-6 border-l-4 border-transparent hover:border-white transition-all duration-300 ease-in-out"
          >
            <FaBookOpen size={18} />
            <span>Quá trình</span>
          </Link>
        </li>
        <li>
          <Link
            href="/"
            className="flex items-center gap-3 py-3 px-4 rounded-lg text-lg font-medium hover:bg-blue-600 hover:pl-6 border-l-4 border-transparent hover:border-white transition-all duration-300 ease-in-out"
          >
            <MdOutlinePhoneInTalk size={25} />
            <span>Liên hệ</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
