"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "@/Firebase/firebaseConfig";
import { ProfileHeader } from "@/components/__molecules/ProfileHeader/ProfileHeader";

type UserData = {
  username: string;
  fullName: string;
  photoURL: string;
  postsCount: number;
  followers: string[];
  following: string[];
};

export default function ProfilePage() {
  const [user, loading] = useAuthState(auth);
  const [userData, setUserData] = useState<UserData | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data() as UserData);
        } else {
          console.warn("User document not found in Firestore");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [user]);

  if (loading || !user) {
    return <div className="text-white p-4">Loading user...</div>;
  }

  if (!userData) {
    return <div className="text-white p-4">Loading profile...</div>;
  }

  return (
    <main className="text-white max-w-5xl mx-auto">
      <ProfileHeader
        username={userData.username}
        fullName={userData.fullName}
        photoURL={userData.photoURL}
        postsCount={userData.postsCount}
        followers={userData.followers}
        following={userData.following}
        onPhotoUpload={() => {}}
      />
    </main>
  );
}
