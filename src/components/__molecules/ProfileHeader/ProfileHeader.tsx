"use client";

import Image from "next/image";

type ProfileHeaderProps = {
  username: string;
  fullName: string;
  photoURL: string;
  postsCount: number;
  followers: string[];
  following: string[];
  onPhotoUpload: (file: File) => void;
};

export const ProfileHeader = ({
  username,
  fullName,
  photoURL,
  postsCount,
  followers,
  following,
  onPhotoUpload,
}: ProfileHeaderProps) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      onPhotoUpload(e.target.files[0]);
    }
  };

  return (
    <div className="flex  gap-10  pt-10 justify-center items-center">
      <div className="relative group w-28 h-28 rounded-full overflow-hidden bg-neutral-800">
        <Image
          src={photoURL || "/avatar.svg"}
          alt="avatar"
          fill
          unoptimized
          className="object-cover"
          priority
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="absolute bottom-0 w-full text-center text-xs text-gray-400 group-hover:opacity-100 opacity-0 transition">
          Change Photo
        </div>
      </div>

      <div>
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">{username}</h2>
          <button className="bg-neutral-800 px-3 py-1 rounded text-sm">
            Edit profile
          </button>
        </div>
        <div className="flex gap-6 mt-2 text-sm">
          <p>
            <b>{postsCount}</b> posts
          </p>
          <p>
            <b>{followers.length}</b> followers
          </p>
          <p>
            <b>{following.length}</b> following
          </p>
        </div>
        <div className="mt-2 text-sm text-gray-400">{fullName}</div>
      </div>
    </div>
  );
};
