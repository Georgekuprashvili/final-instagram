"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { app, db } from "@/Firebase/firebaseConfig";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import StoriesSlider from "@/components/__organisms/StoriesSlider/StoriesSlider";
import PostCard from "@/components/__molecules/PostCard/PostCard";
import AddPostModal from "@/components/__molecules/AddPostModal/AddPostModal";
import SuggestedUsers from "@/components/__molecules/SuggestedUsers/SuggestedUsers";

interface Post {
  id: string;
  caption: string;
  imageURL: string;
  uid: string;
  username: string;
}

declare global {
  interface Window {
    openAddPost?: () => void;
  }
}

export default function MainPage() {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [isAddPostOpen, setIsAddPostOpen] = useState(false);

  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) router.push("/login");
    });
    return () => unsubscribe();
  }, [router]);

  const loadPosts = async () => {
    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);
    const fetchedPosts: Post[] = snapshot.docs.map((doc) => ({
      ...(doc.data() as Post),
      id: doc.id,
    }));
    setPosts(fetchedPosts);
  };

  useEffect(() => {
    loadPosts();
    window.openAddPost = () => setIsAddPostOpen(true);
  }, []);

  useEffect(() => {
    if (!isAddPostOpen) loadPosts();
  }, [isAddPostOpen]);

  return (
    <div className="flex justify-around pl-[445px] w-full px-4 pt-6 text-white ">
      <div className="flex flex-col w-full max-w-md items-center">
        <StoriesSlider />
        {isAddPostOpen && (
          <AddPostModal onClose={() => setIsAddPostOpen(false)} />
        )}
        <div className="mt-6 space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>

      <SuggestedUsers />
    </div>
  );
}
