"use client";

import { useEffect, useState, useRef } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/Firebase/firebaseConfig";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from "firebase/firestore";
import { useNotificationPanel } from "@/context/useNotificationPanel";

interface Notification {
  id: string;
  message: string;
  type: string;
  fromUserId: string;
  fromUsername: string;
  timestamp: Timestamp;
  read: boolean;
}

export default function NotificationsDrawer() {
  const { isOpen, close } = useNotificationPanel();
  const [user] = useAuthState(auth);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const drawerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        close();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, close]);

  useEffect(() => {
    if (!user?.uid) return;

    const q = query(
      collection(db, "users", user.uid, "notifications"),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        ...(doc.data() as Omit<Notification, "id">),
        id: doc.id,
      }));
      setNotifications(fetched);
    });

    return () => unsubscribe();
  }, [user?.uid]);

  if (!isOpen) return null;

  return (
    <div
      ref={drawerRef}
      className="fixed top-0 right-0 w-[350px] h-screen bg-black border-l border-zinc-800 p-4 overflow-y-auto z-50"
    >
      <div className="flex justify-between items-center mb-4 text-white">
        <h2 className="text-xl font-bold">Notifications</h2>
        <button onClick={close} className="text-white text-xl">
          ✕
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500">No notifications</p>
      ) : (
        <ul className="space-y-4">
          {notifications.map((n) => (
            <li key={n.id} className="text-sm text-gray-200">
              <strong>@{n.fromUsername}</strong> {n.message}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
