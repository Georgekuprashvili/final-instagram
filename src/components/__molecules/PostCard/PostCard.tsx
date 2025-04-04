"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/Firebase/firebaseConfig";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { Bookmark, Heart, MessageCircle, Trash2 } from "lucide-react";

interface Post {
  id: string;
  caption: string;
  imageURL: string;
  uid: string;
  username: string;
}

interface Comment {
  id: string;
  text: string;
  username: string;
}

type Props = {
  post: Post;
};

export default function PostCard({ post }: Props) {
  const [user] = useAuthState(auth);
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [likesCount, setLikesCount] = useState<number>(0);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const img = localStorage.getItem(`profile-photo-${user?.uid}`);
    if (img) setProfileImage(img);
  }, [user?.uid]);

  useEffect(() => {
    const likesRef = collection(db, "posts", post.id, "likes");
    const unsubscribe = onSnapshot(likesRef, (snapshot) => {
      setLikesCount(snapshot.size);
      setLiked(snapshot.docs.some((doc) => doc.id === user?.uid));
    });
    return () => unsubscribe();
  }, [post.id, user?.uid]);

  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    const isSaved = savedPosts.some((p: Post) => p.id === post.id);
    setSaved(isSaved);
  }, [post.id]);

  useEffect(() => {
    const commentsRef = collection(db, "posts", post.id, "comments");
    const q = query(commentsRef, orderBy("createdAt", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetched = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Comment[];
      setComments(fetched);
    });
    return () => unsubscribe();
  }, [post.id]);

  const handleLike = async () => {
    if (!user?.uid) return;

    const likeRef = doc(db, "posts", post.id, "likes", user.uid);

    if (liked) {
      await deleteDoc(likeRef);
      setLiked(false);
    } else {
      await setDoc(likeRef, {
        uid: user.uid,
        createdAt: serverTimestamp(),
      });
      setLiked(true);
    }
  };

  const handleSave = () => {
    const saved = JSON.parse(localStorage.getItem("savedPosts") || "[]");
    const alreadySaved = saved.some((p: Post) => p.id === post.id);

    const updated = alreadySaved
      ? saved.filter((p: Post) => p.id !== post.id)
      : [...saved, post];

    localStorage.setItem("savedPosts", JSON.stringify(updated));
    setSaved(!alreadySaved);
  };

  const handleComment = async () => {
    if (!commentInput.trim() || !user) return;

    try {
      const userDoc = await getDoc(doc(db, "users", user.uid));
      const userData = userDoc.exists() ? userDoc.data() : null;
      const username = userData?.username || "unknown";

      await addDoc(collection(db, "posts", post.id, "comments"), {
        text: commentInput,
        uid: user.uid,
        username,
        createdAt: serverTimestamp(),
      });

      setCommentInput("");
    } catch (err) {
      console.error("Error posting comment:", err);
    }
  };
  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "posts", post.id));
      window.location.reload();
    } catch (error) {
      console.error("Failed to delete post", error);
      alert("Failed to delete post.");
    }
  };

  return (
    <div className="bg-neutral-900 rounded-lg mb-8 w-full max-w-md mx-auto overflow-hidden text-white border border-zinc-800">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          <Image
            src={profileImage || "/photos/avatar.svg"}
            alt="Profile"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
            unoptimized
          />
          <p className="text-xs text-gray-400">@{post.username}</p>
        </div>
        {user?.uid === post.uid && (
          <button onClick={handleDelete}>
            <Trash2 size={18} stroke="red" />
          </button>
        )}
      </div>

      <Image
        src={post.imageURL}
        alt={post.caption}
        width={800}
        height={600}
        className="w-full max-h-[600px] object-cover"
        unoptimized
      />

      <div className="flex gap-4 px-4 py-2">
        <button onClick={handleLike}>
          <Heart
            size={22}
            fill={liked ? "red" : "none"}
            stroke="white"
            strokeWidth={1.5}
          />
        </button>
        <button onClick={() => setVisible(true)}>
          <MessageCircle size={22} stroke="white" />
        </button>
        <button onClick={handleSave} className="ml-auto">
          <Bookmark
            size={22}
            fill={saved ? "white" : "none"}
            stroke="white"
            strokeWidth={1.5}
          />
        </button>
      </div>

      <div className="px-4 pb-3 text-sm">
        {likesCount > 0 && (
          <p className="font-semibold mb-1">
            {likesCount} like{likesCount > 1 ? "s" : ""}
          </p>
        )}
        <p>{post.caption}</p>

        {comments.length > 0 && (
          <div className="mt-2">
            {comments.map((comment) => (
              <p key={comment.id} className="text-sm text-zinc-200">
                <span className="font-semibold mr-1">@{comment.username}:</span>
                {comment.text}
              </p>
            ))}
          </div>
        )}

        {visible && (
          <div className="mt-2 flex items-center gap-2">
            <input
              className="bg-zinc-800 rounded px-2 py-1 w-full text-white text-sm"
              value={commentInput}
              onChange={(e) => setCommentInput(e.target.value)}
              placeholder="Add a comment..."
            />
            <button
              onClick={handleComment}
              className="text-sm text-blue-500 hover:underline"
            >
              Post
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
