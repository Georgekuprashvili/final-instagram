"use client";

import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";
import { auth, db } from "@/Firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

interface User {
  id: string;
  username: string;
  fullName: string;
  profilePicture?: string;
}

export default function SuggestedUsers() {
  const [user] = useAuthState(auth);
  const [suggested, setSuggested] = useState<User[]>([]);
  const [followingIds, setFollowingIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(collection(db, "users"), (snapshot) => {
      const users = snapshot.docs
        .map((doc) => ({ id: doc.id, ...doc.data() } as User))
        .filter((u) => u.id !== user.uid); 

      setSuggested(users);
    });

    const followingRef = collection(db, "users", user.uid, "following");
    const unsubFollow = onSnapshot(followingRef, (snapshot) => {
      const ids = snapshot.docs.map((doc) => doc.id);
      setFollowingIds(ids);
    });

    return () => {
      unsub();
      unsubFollow();
    };
  }, [user]);

  const handleToggleFollow = async (targetId: string) => {
    if (!user?.uid) return;

    const currentUserRef = doc(db, "users", user.uid, "following", targetId);
    const targetUserRef = doc(db, "users", targetId, "followers", user.uid);

    if (followingIds.includes(targetId)) {
      await deleteDoc(currentUserRef);
      await deleteDoc(targetUserRef);
    } else {
      await setDoc(currentUserRef, { uid: targetId });
      await setDoc(targetUserRef, { uid: user.uid });
    }
  };

  return (
    <div className="text-white p-4 w-full max-w-xs ">
      <h2 className="font-semibold text-sm mb-3 text-neutral-400">
        Suggested for you
      </h2>
      <ul className="space-y-4">
        {suggested.map((u) => (
          <li key={u.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Image
                src={u.profilePicture || "/photos/avatar.svg"}
                alt={u.username}
                width={32}
                height={32}
                className="rounded-full object-cover w-8 h-8"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium">{u.username}</span>
                <span className="text-xs text-neutral-400">{u.fullName}</span>
              </div>
            </div>
            <button
              onClick={() => handleToggleFollow(u.id)}
              className={`text-sm font-medium ${
                followingIds.includes(u.id)
                  ? "text-white"
                  : "text-blue-500 hover:text-blue-600"
              }`}
            >
              {followingIds.includes(u.id) ? "Following" : "Follow"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
