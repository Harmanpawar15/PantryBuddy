
"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import { usePathname } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isLandingPage = pathname === "/";

  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        {!isLandingPage && (
          <div className="relative w-full flex items-center justify-center">
            <Navbar />
          </div>
        )}
        {children}
      </body>
    </html>
  );
}
