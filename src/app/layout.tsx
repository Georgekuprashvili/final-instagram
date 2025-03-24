"use client";
import "./globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/__organisms/Sidebar/Sidebar";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en">
      <body className="bg-black text-white flex">
        {!hideSidebar && <Sidebar />}
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
