"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/Firebase/firebaseConfig"; 

export default function MainPage() {
  const router = useRouter();

  useEffect(() => {
    const auth = getAuth(app);

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe();
  }, [router]); 

  return (
    <div className="text-white text-xl text-center mt-10">
      Main Page - Welcome!
    </div>
  );
}
