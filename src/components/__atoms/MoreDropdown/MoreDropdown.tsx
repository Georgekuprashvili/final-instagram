"use client";

import { useState, useRef, useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/Firebase/firebaseConfig";
import { useRouter } from "next/navigation";
import { useTheme } from "@/context/ThemeContext";

export default function MoreDropdown() {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { theme, toggleTheme } = useTheme();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen((prev) => !prev)}
        className="w-full text-left"
      >
        <div className="flex items-center space-x-4 hover:bg-zinc-800 px-4 py-2 rounded-xl transition-all w-full">
          <svg height={24} width={24} viewBox="0 0 24 24" fill="currentColor">
            <line x1="3" x2="21" y1="4" y2="4" stroke="currentColor" />
            <line x1="3" x2="21" y1="12" y2="12" stroke="currentColor" />
            <line x1="3" x2="21" y1="20" y2="20" stroke="currentColor" />
          </svg>
          <span className="hidden lg:inline text-sm">More</span>
        </div>
      </button>

      {open && (
        <div className="absolute bottom-14 left-0 w-[250px] bg-background text-foreground rounded-xl shadow-lg overflow-hidden border border-zinc-200 dark:border-zinc-700 z-50">
          <DropdownItem
            icon={
              <svg
                aria-label="Settings"
                fill="currentColor"
                height="18"
                role="img"
                viewBox="0 0 24 24"
                width="18"
              >
                <title>Settings</title>
                <circle
                  cx="12"
                  cy="12"
                  fill="none"
                  r="8.635"
                  stroke="currentColor"
                ></circle>
                <path
                  d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096"
                  fill="none"
                  stroke="currentColor"
                ></path>
              </svg>
            }
            label="Settings"
          />
          <DropdownItem
            icon={
              <svg
                aria-label="Your activity"
                fill="currentColor"
                height="18"
                role="img"
                viewBox="0 0 24 24"
                width="18"
              >
                <title>Your activity</title>
                <path d="M19 1H5C2.794 1 1 2.794 1 5v14c0 2.206 1.794 4 4 4h14c2.206 0 4-1.794 4-4V5c0-2.206-1.794-4-4-4ZM5 3h14c1.103 0 2 .897 2 2v6h-2.382l-2.723-5.447c-.34-.678-1.45-.678-1.79 0L9 15.764l-2.105-4.211A1 1 0 0 0 6 11H3V5c0-1.103.897-2 2-2Zm14 18H5c-1.103 0-2-.897-2-2v-6h2.382l2.723 5.447a1 1 0 0 0 1.79 0L15 8.236l2.105 4.211A1 1 0 0 0 18 13h3v6c0 1.103-.897 2-2 2Z"></path>
              </svg>
            }
            label="Your activity"
          />
          <DropdownItem
            icon={
              <svg
                fill="currentColor"
                height="18"
                viewBox="0 0 24 24"
                width="18"
              >
                <polygon
                  fill="none"
                  points="20 21 12 13.44 4 21 4 3 20 3 20 21"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            }
            label="Saved"
          />
          <DropdownItem
            icon={
              <svg
                aria-label="Theme icon"
                fill="currentColor"
                height="18"
                role="img"
                viewBox="0 0 24 24"
                width="18"
              >
                <title>Theme icon</title>
                <path d="M11.502,22.99805A11.4313,11.4313,0,0,1,.49512,14.83691a.99889.99889,0,0,1,.251-.998,1.01148,1.01148,0,0,1,.99707-.249,9.43041,9.43041,0,0,0,2.75879.40821A9.5082,9.5082,0,0,0,13.5957,1.74023a1.00039,1.00039,0,0,1,1.24707-1.248A11.501,11.501,0,0,1,11.502,22.99805ZM3.08984,15.91211A9.49991,9.49991,0,0,0,21.002,11.498,9.57875,9.57875,0,0,0,15.916,3.08594,11.5083,11.5083,0,0,1,3.08984,15.91211Z"></path>
              </svg>
            }
            label={
              theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
            }
            onClick={toggleTheme}
          />
          <DropdownItem
            icon={
              <svg
                aria-label="Report a problem"
                fill="currentColor"
                height="18"
                role="img"
                viewBox="0 0 24 24"
                width="18"
              >
                <title>Report a problem</title>
                <path d="M18.001 1h-12a5.006 5.006 0 0 0-5 5v9.005a5.006 5.006 0 0 0 5 5h2.514l2.789 2.712a1 1 0 0 0 1.394 0l2.787-2.712h2.516a5.006 5.006 0 0 0 5-5V6a5.006 5.006 0 0 0-5-5Zm3 14.005a3.003 3.003 0 0 1-3 3h-2.936a1 1 0 0 0-.79.387l-2.274 2.212-2.276-2.212a1 1 0 0 0-.79-.387H6a3.003 3.003 0 0 1-3-3V6a3.003 3.003 0 0 1 3-3h12a3.003 3.003 0 0 1 3 3Zm-9-1.66a1.229 1.229 0 1 0 1.228 1.228A1.23 1.23 0 0 0 12 13.344Zm0-8.117a1.274 1.274 0 0 0-.933.396 1.108 1.108 0 0 0-.3.838l.347 4.861a.892.892 0 0 0 1.77 0l.348-4.86a1.106 1.106 0 0 0-.3-.838A1.272 1.272 0 0 0 12 5.228Z"></path>
              </svg>
            }
            label="Report a problem"
          />
          <DropdownItem label="Switch accounts" />
          <DropdownItem
            label="Log out"
            onClick={handleLogout}
            className="text-red-400"
          />
        </div>
      )}
    </div>
  );
}

function DropdownItem({
  icon,
  label,
  onClick,
  className = "",
}: {
  icon?: React.ReactNode;
  label: string;
  onClick?: () => void;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-100 dark:hover:bg-zinc-700 text-left text-sm ${className}`}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
}
