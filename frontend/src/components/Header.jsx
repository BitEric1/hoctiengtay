"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { RiBookShelfFill } from "react-icons/ri";
import { FaUserCircle } from "react-icons/fa";
import MobileNavbar from "./MobileNavbar";

const Header = () => {
  const { user, logout } = useAuth();
  const [showLoginButton, setShowLoginButton] = useState(false);

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
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const shouldShowLoginLink = !user && showLoginButton;

  return (
    <header className="w-full h-20 shadow-lg fixed top-0 left-0 bg-gradient-to-l from-blue-400 via-blue-500 to-blue-600  z-50">
      <div className="w-full max-w-screen-xl mx-auto h-full flex items-center justify-between px-4 ">
        {/* Logo/Title Section */}
        <div className="w-full lg:w-3/12 h-20 flex items-center justify-center">
          <Link
            href="/learn"
            className="text-xl lg:text-2xl text-white font-bold h-20 flex items-center justify-center"
          >
            <RiBookShelfFill size={25} className="mr-2 text-white" />
            HoctiengTày.edu
          </Link>
        </div>

        {/* User info / Login button */}
        {/* <div className="hidden lg:flex w-auto h-full items-center justify-end relative group">
          {user ? (
            <>
              <div className="flex items-center gap-2 ">
                <FaUserCircle size={25} className="text-white" />
                <h1 className="text-white font-bold">{user.username}</h1>
              </div>
              <div className="absolute top-[70px] right-0 w-full max-h-[50vh] bg-white shadow-xl rounded-xl px-4 py-2 hidden group-hover:block transition-all duration-300 ease-in-out  z-50">
                <ul>
                  <li className="p-1">
                    <Link href="/setting" className="block w-full py-2 text-center rounded-lg hover:bg-blue-50">
                      Settings
                    </Link>
                  </li>
                  <li className="border-t-2 border-gray-200 p-1">
                    <button onClick={logout} className="block w-full py-2 text-center rounded-lg hover:bg-blue-50">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          ) : (
            shouldShowLoginLink && (
              <Link
                href="/login"
                className="cst_btn block h-[48px] transition-opacity duration-300 bg-white text-[#4da5e2] font-bold"
              >
                Đăng nhập ngay
              </Link>
            )
          )}
        </div> */}
      </div>
      <MobileNavbar />
    </header>
  );
};

export default Header;