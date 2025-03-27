"use client";
import "./globals.css";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/__organisms/Sidebar/Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/login" || pathname === "/register";

  return (
    <html lang="en" className="">
      <body className="flex bg-background text-foreground">
        <ThemeProvider>
          {!hideSidebar && <Sidebar />}
          <main className="w-full">{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
