import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { AuthProvider } from "@/context/authContext";

import { StoreProvider } from "@/context/StoreCoursesContext";
import MobileNavbar from "@/components/MobileNavbar";
import Header from "@/components/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Học tiếng tày",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
          theme="light"
          />
        <StoreProvider>
          <Header />
          <MobileNavbar />
          {children}
          
          </StoreProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
