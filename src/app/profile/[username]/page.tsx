import { db } from "@/Firebase/firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { notFound } from "next/navigation";
import ProfileHeader from "@/components/__molecules/ProfileHeader/ProfileHeader";
import Image from "next/image";

type Props = {
  params: {
    username: string;
  };
};
interface Post {
  caption: string;
  imageURL: string;
  uid: string;
  username: string;
}

export default async function PublicProfilePage({ params }: Props) {
  const { username } = params;

  const userQuery = query(
    collection(db, "users"),
    where("username", "==", username)
  );
  const userSnap = await getDocs(userQuery);

  if (userSnap.empty) return notFound();

  const userDoc = userSnap.docs[0];
  const userData = userDoc.data();
  const userId = userDoc.id;

  const postsQuery = query(collection(db, "posts"), where("uid", "==", userId));
  const postsSnap = await getDocs(postsQuery);
  const posts = postsSnap.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Post),
  }));
  return (
    <div className="pb-10">
      <ProfileHeader
        username={userData.username}
        fullName={userData.fullName}
        postsCount={posts.length}
        followers={userData.followers || []}
        following={userData.following || []}
        userId={userId}
      />

      <div className="grid grid-cols-3 gap-1 mt-8 max-w-5xl mx-auto">
        {posts.length > 0 ? (
          posts.map((post) => (
            <Image
              key={post.id}
              src={post.imageURL}
              alt={post.caption}
              width={300}
              height={300}
              className="aspect-square object-cover cursor-pointer hover:brightness-75 transition"
              unoptimized
            />
          ))
        ) : (
          <p className="col-span-3 text-center text-neutral-500 py-10">
            No posts yet.
          </p>
        )}
      </div>
    </div>
  );
}
