"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/Firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Image from "next/image";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
} from "firebase/firestore";

type Props = {
  username: string;
  fullName: string;
  postsCount: number;
  followers: number[] | number;
  following: number[] | number;
  userId: string;
};

export default function ProfileHeader({
  username,
  fullName,
  postsCount,
  followers,
  following,
  userId,
}: Props) {
  const [user] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (!user?.uid) return;

    const savedImage = localStorage.getItem(`profile-photo-${user.uid}`);
    if (savedImage) setProfileImage(savedImage);

    const checkFollowing = async () => {
      const currentRef = doc(db, "users", user.uid);
      const currentSnap = await getDoc(currentRef);
      const currentData = currentSnap.data();
      if (currentData?.following?.includes(userId)) {
        setIsFollowing(true);
      }
    };

    checkFollowing();
  }, [user?.uid, userId]);

  const handleFollowToggle = async () => {
    if (!user?.uid) return;

    const currentRef = doc(db, "users", user.uid);
    const targetRef = doc(db, "users", userId);

    try {
      if (isFollowing) {
        await updateDoc(currentRef, {
          following: arrayRemove(userId),
        });
        await updateDoc(targetRef, {
          followers: arrayRemove(user.uid),
        });
        setIsFollowing(false);
      } else {
        await updateDoc(currentRef, {
          following: arrayUnion(userId),
        });
        await updateDoc(targetRef, {
          followers: arrayUnion(user.uid),
        });

        setIsFollowing(true);
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
            <span className="font-semibold">
              {Array.isArray(followers) ? followers.length : followers}
            </span>{" "}
            followers
          </p>
          <p>
            <span className="font-semibold">
              {Array.isArray(following) ? following.length : following}
            </span>{" "}
            following
          </p>
        </div>

        <p className="text-sm font-semibold">{fullName}</p>
      </div>
    </section>
  );
}
