"use client";

import { useSearchPanel } from "@/context/useSearchPanel";
import { useEffect, useState } from "react";
import { collection, getDocs, query } from "firebase/firestore";
import Link from "next/link";
import { db } from "@/Firebase/firebaseConfig";
import Image from "next/image";
interface User {
  id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
}

export default function SearchDrawer() {
  const { isOpen, closePanel } = useSearchPanel();
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const q = query(collection(db, "users"));
      const querySnapshot = await getDocs(q);
      const usersList: User[] = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<User, "id">),
      }));
      setUsers(usersList);
    };
    fetchUsers();
  }, []);

  const filteredUsers = users.filter((user) =>
    user.username?.toLowerCase().includes(search.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed top-0 right-0 w-[400px] h-full bg-white dark:bg-black shadow-lg z-50 p-4">
      <button
        onClick={closePanel}
        className="text-right block ml-auto mb-4 text-lg"
      >
        ✕
      </button>
      <input
        type="text"
        placeholder="Search users"
        className="w-full p-2 rounded border dark:bg-neutral-900"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="mt-4 space-y-3">
        {filteredUsers.map((user) => (
          <Link
            key={user.id}
            href={`/profile/${user.username}`}
            onClick={closePanel}
          >
            <div className="flex items-center gap-3 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 p-2 rounded">
              <Image
                src={user.profilePicture || "/photos/avatar.svg"}
                alt={user.username}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover"
                unoptimized
              />
              <div>
                <p className="font-semibold">{user.username}</p>
                <p className="text-sm text-gray-500">{user.fullName}</p>
              </div>
            </div>
          </Link>
        ))}
        {filteredUsers.length === 0 && (
          <p className="text-center text-neutral-400 mt-6">No users found.</p>
        )}
      </div>
    </div>
  );
}
