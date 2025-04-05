"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/Firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  collection,
  getCountFromServer,
  addDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";

type Props = {
  username: string;
  fullName: string;
  postsCount: number;
  userId: string;
};

export default function ProfileHeader({
  username,
  fullName,
  postsCount,
  userId,
}: Props) {
  const [user] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    if (!user?.uid || !userId) return;

    const savedImage = localStorage.getItem(`profile-photo-${user.uid}`);
    if (savedImage) setProfileImage(savedImage);

    const followRef = doc(db, "users", user.uid, "following", userId);
    const unsubscribe = onSnapshot(followRef, (snap) => {
      setIsFollowing(snap.exists());
    });

    const fetchCounts = async () => {
      const followersSnap = await getCountFromServer(
        collection(db, "users", userId, "followers")
      );
      const followingSnap = await getCountFromServer(
        collection(db, "users", userId, "following")
      );

      setFollowerCount(followersSnap.data().count);
      setFollowingCount(followingSnap.data().count);
    };

    fetchCounts();

    return () => unsubscribe();
  }, [user?.uid, userId]);

  const handleFollowToggle = async () => {
    if (!user?.uid || !userId) return;

    const currentUserRef = doc(db, "users", user.uid, "following", userId);
    const targetUserRef = doc(db, "users", userId, "followers", user.uid);

    try {
      if (isFollowing) {
        await deleteDoc(currentUserRef);
        await deleteDoc(targetUserRef);
        setIsFollowing(false);
        setFollowerCount((prev) => prev - 1);
      } else {
        await setDoc(currentUserRef, { uid: userId });
        await setDoc(targetUserRef, { uid: user.uid });
        setIsFollowing(true);
        setFollowerCount((prev) => prev + 1);

        const userSnap = await getDoc(doc(db, "users", user.uid));
        const currentUsername = userSnap.exists()
          ? userSnap.data().username
          : "Someone";

        await addDoc(collection(db, "users", userId, "notifications"), {
          type: "follow",
          fromUserId: user.uid,
          fromUsername: currentUsername,
          message: "started following you.",
          timestamp: serverTimestamp(),
          read: false,
        });
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
    }
  };

  return (
    <section className="flex items-start gap-12 px-8 pt-10 text-white max-w-5xl mx-auto">
      <label className="cursor-pointer">
        <Image
          src={profileImage || "/photos/avatar.svg"}
          alt="Profile"
          width={160}
          height={160}
          className="w-40 h-40 rounded-full object-cover border border-zinc-700"
          unoptimized
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (!file || !user?.uid) return;
            const reader = new FileReader();
            reader.onloadend = () => {
              const base64 = reader.result as string;
              localStorage.setItem(`profile-photo-${user.uid}`, base64);
              setProfileImage(base64);
            };
            reader.readAsDataURL(file);
          }}
          className="hidden"
        />
      </label>

      <div className="flex flex-col flex-1 justify-center">
        <div className="flex items-center gap-4 mb-4">
          <p className="text-2xl font-light">{username}</p>
          {user?.uid !== userId && (
            <button
              onClick={handleFollowToggle}
              className={`${
                isFollowing ? "bg-white text-black" : "bg-blue-500 text-white"
              } text-sm px-4 py-1 rounded font-medium`}
            >
              {isFollowing ? "Following" : "Follow"}
            </button>
          )}
        </div>

        <div className="flex gap-6 mb-4 text-sm">
          <p>
            <span className="font-semibold">{postsCount}</span> posts
          </p>
          <p>
            <span className="font-semibold">{followerCount}</span> followers
          </p>
          <p>
            <span className="font-semibold">{followingCount}</span> following
          </p>
        </div>

        <p className="text-sm font-semibold">{fullName}</p>
      </div>
    </section>
  );
}
