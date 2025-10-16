"use client";
import { useAuth } from "@/context/authContext";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import MobileNavbar from "./MobileNavbar";
import { usePathname } from "next/navigation";
import { BiSolidPencil } from "react-icons/bi";
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
      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  const shouldShowLoginLink = !user && showLoginButton;

  return (
    <header className="w-full h-20 shadow-lg fixed top-0 left-0 bg-gradient-to-l from-blue-400 via-blue-500 to-blue-600  z-50">
      <div className="w-full h-full flex items-center justify-between ">
        {/* Logo/Title Section */}
        <div className="w-full lg:w-2/12 h-20 flex items-center justify-center">
          <Link
            href="/"
            className="text-xl lg:text-2xl text-white font-bold h-20 flex items-center justify-center"
          >
            <BiSolidPencil size={25} className="mr-2 text-white" />
            HoctiengTày.edu
          </Link>
        </div>
      </div>
      <MobileNavbar />
    </header>
  );
};

export default Header;