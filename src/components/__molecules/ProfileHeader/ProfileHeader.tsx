"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/Firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = {
  username: string;
  fullName: string;
  postsCount: number;
  followers: number;
  following: number;
};

export default function ProfileHeader({
  username,
  fullName,
  postsCount,
  followers,
  following,
}: Props) {
  const [user] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  useEffect(() => {
    const savedImage = localStorage.getItem(`profile-photo-${user?.uid}`);
    if (savedImage) setProfileImage(savedImage);
  }, [user?.uid]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      localStorage.setItem(`profile-photo-${user?.uid}`, base64);
      setProfileImage(base64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-start gap-12 px-8 pt-12 text-white">
      <div className="flex flex-col items-center text-center">
        <label className="cursor-pointer">
          <Image
            src={profileImage || "/avatar.svg"}
            alt="Profile"
            width={160} 
            height={160} 
            className="w-40 h-40 rounded-full object-cover border border-zinc-700"
            unoptimized 
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
        </label>

        <div className="mt-4">
          <p className="font-semibold text-lg">@{username}</p>
          <p className="text-zinc-400">{fullName}</p>

          <div className="text-left mt-4 space-y-1 text-sm">
            <p>Posts: {postsCount}</p>
            <p>Followers: {followers}</p>
            <p>Following: {following}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
