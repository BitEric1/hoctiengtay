"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";
import { GiBookAura } from "react-icons/gi";

const Header = () => {
  const { user, logout } = useAuth();
  const [showLoginButton, setShowLoginButton] = useState(false);
  const path = usePathname();

  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowLoginButton(true);
    } else {
      setShowLoginButton(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  }, []);

  const shouldShowLoginLink = !user && showLoginButton;
  const isCenteredPage =
    path === "/learn" || path === "/translate" || path === "/contact";

  return (
    <header className="w-full h-20 fixed top-0 left-0 z-50 shadow-lg bg-gradient-to-l from-blue-400 via-blue-500 to-blue-600">
      <div
        className={`${isCenteredPage
          ? "w-full"
          : "max-w-screen-xl mx-auto px-4 md:px-6 lg:px-8"
          } h-full flex items-center justify-between`}
      >
        {/* Logo Section */}
        <div
          className={`w-full lg:w-3/12 h-20 flex items-center ${isCenteredPage ? "justify-center" : "justify-start"
            }`}
        >
          <Link
            href="/"
            className="flex items-center text-xl lg:text-2xl font-bold text-white"
          >
            <GiBookAura size={30} className="mr-2 text-white" />
            <span>HoctiengTay</span>
            <span className="text-gray-200">.edu</span>
          </Link>
        </div>

        {/* Nếu bạn muốn thêm nút Login/Logout hoặc Avatar user thì thêm tại đây */}
        {/* {shouldShowLoginLink && (
          // <Link
          //   href="/login"
          //   className="hidden md:inline-block bg-white text-blue-600 text-sm font-semibold px-4 py-2 rounded-md shadow hover:bg-gray-100 transition"
          // >
          //   Đăng nhập
          // </Link>
        )} */}
      </div>

      <MobileNavbar />
    </header>
  );
};

export default Header;
