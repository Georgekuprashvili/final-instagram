"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/Firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import ProfileHeader from "@/components/__molecules/ProfileHeader/ProfileHeader";

interface UserData {
  username: string;
  fullName: string;
  email: string;
  postsCount: number;
  followers: number;
  following: number;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    if (!loading && !user) router.push("/login");
  }, [user, loading, router]);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) return;
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) setUserData(snap.data() as UserData);
      } catch (err) {
        console.error("Error loading user:", err);
      }
    };

    fetchUser();
  }, [user]);

  if (loading || !user) return <div className="text-white p-4">Loading...</div>;
  if (!userData)
    return <div className="text-white p-4">Loading profile...</div>;

  return (
    <main className="max-w-5xl mx-auto w-full text-white">
      <ProfileHeader
        username={userData.username}
        fullName={userData.fullName}
        postsCount={userData.postsCount}
        followers={userData.followers}
        following={userData.following}
      />
    </main>
  );
}
