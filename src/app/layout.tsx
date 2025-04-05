"use client";

import "./globals.css";
import { ReactNode, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/__organisms/Sidebar/Sidebar";
import { ThemeProvider } from "@/context/ThemeContext";
import AddPostModal from "@/components/__molecules/AddPostModal/AddPostModal";
import SearchDrawer from "@/components/__organisms/SearchDrawer/SearchDrawer";
import NotificationsDrawer from "@/components/__molecules/NotificationsDrawer/NotificationsDrawer";

export default function RootLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hideSidebar = pathname === "/login" || pathname === "/register";

  const [isAddPostOpen, setIsAddPostOpen] = useState(false);

  return (
    <html lang="en" className="dark">
      <body className="flex bg-background text-foreground">
        <ThemeProvider>
          {!hideSidebar && <Sidebar setIsAddPostOpen={setIsAddPostOpen} />}
          <main className="w-full">{children}</main>
          {isAddPostOpen && (
            <AddPostModal onClose={() => setIsAddPostOpen(false)} />
          )}
          <SearchDrawer />
          <NotificationsDrawer />
        </ThemeProvider>
      </body>
    </html>
  );
}
