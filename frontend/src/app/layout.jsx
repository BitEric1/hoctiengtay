import { Geist, Geist_Mono } from "next/font/google";
import "@/assets/css/globals.css";
import { SignedIn, SignedOut, ClerkProvider, SignIn } from "@clerk/nextjs";

import bannerURL from "@/assets/imgs/sign_in_page_img.jpg";
import Image from "next/image";
import { StoreProvider } from "@/context/Provider";

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
    <ClerkProvider
      localization={{
        signIn: {
          start: {
            title: "Đăng nhập hệ thống Education",
            subtitle: "Đăng nhập để bắt đầu quá trình học",
          },
        },
      }}
      appearance={{
        elements: {
          card: "shadow-xl border rounded-xl p-6",
          headerTitle: "text-xl font-bold text-blue-600",
        },
      }}
    >
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <SignedOut>
            <div className="w-full h-screen flex">
              <div className="w-1/2 flex items-center justify-center">
                {/* Banner làm sau */}
                <Image
                  src={bannerURL}
                  alt="img sign in"
                  width={600}
                  height={600}
                  className="object-cover"
                />
              </div>
              <div className="w-1/2 flex items-center justify-center">
                <SignIn routing="sign-in" />
              </div>
            </div>
          </SignedOut>
          <SignedIn>
            <StoreProvider>{children}</StoreProvider>
          </SignedIn>
        </body>
      </html>
    </ClerkProvider>
  );
}
