"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app } from "@/Firebase/firebaseConfig";
import StoriesSlider from "@/components/__organisms/StoriesSlider/StoriesSlider";

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
    <>
      <div className="w-full h-[100vh] flex flex-col  items-center pt-4">
        <div>
          <StoriesSlider />
        </div>
        <h1>giorgi</h1>
      </div>
    </>
  );
}
