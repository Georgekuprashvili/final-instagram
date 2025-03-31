"use client";

import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage, auth } from "@/Firebase/firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";
import { X } from "lucide-react";

interface AddPostModalProps {
  onClose: () => void;
}

export default function AddPostModal({ onClose }: AddPostModalProps) {
  const [user] = useAuthState(auth);
  const [file, setFile] = useState<File | null>(null);
  const [caption, setCaption] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
    }
  };

  const handlePost = async () => {
    if (!file || !user) return;

    setUploading(true);
    try {
      const storageRef = ref(storage, `posts/${user.uid}/${Date.now()}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);

      await addDoc(collection(db, "posts"), {
        uid: user.uid,
        username: user.displayName || user.email,
        photoURL: user.photoURL || "/avatar.svg",
        imageURL: downloadURL,
        caption,
        createdAt: serverTimestamp(),
        likes: [],
        comments: [],
      });

      setFile(null);
      setCaption("");
      onClose();
    } catch (err) {
      console.error("Error uploading post:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex items-center justify-center">
      <div className="bg-neutral-900 p-6 rounded-lg w-full max-w-md relative text-white">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          <X />
        </button>

        <h2 className="text-center text-lg font-semibold mb-4">
          Create New Post
        </h2>

        {file ? (
          <div className="w-full aspect-square relative mb-4">
            <Image
              src={URL.createObjectURL(file)}
              alt="Preview"
              fill
              className="object-contain rounded"
            />
          </div>
        ) : (
          <label className="w-full flex items-center justify-center h-60 bg-neutral-800 rounded cursor-pointer text-gray-400 hover:text-white border border-gray-600">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
            Drag photo here or click to select
          </label>
        )}

        {file && (
          <textarea
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="Write a caption..."
            className="w-full bg-neutral-800 border border-gray-700 rounded px-3 py-2 text-sm resize-none mb-4"
          />
        )}

        <button
          disabled={!file || uploading}
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 w-full py-2 rounded disabled:opacity-50"
        >
          {uploading ? "Sharing..." : "Share"}
        </button>
      </div>
    </div>
  );
}
