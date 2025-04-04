"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/Firebase/firebaseConfig";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";
import ProfileHeader from "@/components/__molecules/ProfileHeader/ProfileHeader";
import Image from "next/image";

interface UserData {
  username: string;
  fullName: string;
  email: string;
  postsCount: number;
  followers: number;
  following: number;
}

interface Post {
  id: string;
  imageURL: string;
  caption: string;
  createdAt: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState("posts");
  const [savedPosts, setSavedPosts] = useState<Post[]>([]);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      const snap = await getDoc(doc(db, "users", user.uid));
      if (snap.exists()) setUserData(snap.data() as UserData);
    };

    const fetchPosts = async () => {
      if (!user) return;
      const q = query(
        collection(db, "posts"),
        where("uid", "==", user.uid),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      setPosts(
        snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })) as Post[]
      );
    };

    const fetchSavedPosts = async () => {
      const saved = JSON.parse(localStorage.getItem("savedPosts") || "[]");
      setSavedPosts(saved);
    };

    fetchUser();
    fetchPosts();
    fetchSavedPosts();
  }, [user]);

  if (loading || !userData) return <div className="text-white">Loading...</div>;

  return (
    <main className="max-w-4xl mx-auto py-10 text-white">
      <ProfileHeader
        username={userData.username}
        fullName={userData.fullName}
        postsCount={posts.length}
        userId={user?.uid || ""}
      />

      <div className="border-t border-neutral-700 mt-8">
        <div className="flex justify-center gap-8 uppercase text-xs font-semibold tracking-wide">
          <button
            onClick={() => setActiveTab("posts")}
            className={`py-3 ${
              activeTab === "posts"
                ? "border-t border-white"
                : "text-neutral-400"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`py-3 ${
              activeTab === "saved"
                ? "border-t border-white"
                : "text-neutral-400"
            }`}
          >
            Saved
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-1 mt-4">
        {(activeTab === "posts" ? posts : savedPosts).map((post) => (
          <Image
            key={post.id}
            src={post.imageURL}
            alt={post.caption}
            width={300}
            height={300}
            className="aspect-square object-cover hover:brightness-75 transition cursor-pointer"
            unoptimized
          />
        ))}
        {activeTab === "saved" && savedPosts.length === 0 && (
          <div className="col-span-3 text-center text-neutral-500 py-10">
            No saved posts yet.
          </div>
        )}
      </div>
    </main>
  );
}
