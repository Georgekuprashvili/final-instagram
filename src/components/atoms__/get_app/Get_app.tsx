import Image from "next/image";
import React from "react";
import playstore from "@/photos/playstore.jpg";
import microsoft from "@/photos/microsoft.png";

const Get_app = () => {
  return (
    <>
      <div className="flex  flex-col items-center justify-between gap-[10px]">
        <div className="w-[350px] h-[60px] border-gray-500 border-[1px] flex justify-center items-center">
          <p className="text-[white]">
            Don't have an account?{" "}
            <button className="text-[#259af6]">Sign up</button>
          </p>
        </div>

        <p className="text-white">Get the app</p>

        <div className="flex justify-center gap-[8px]">
          <a
            href="https://play.google.com/store/apps/details?id=com.instagram.android&referrer=ig_mid%3D16ACAA17-CD59-4832-A9AD-EAC61214C066%26utm_campaign%3DunifiedHome%26utm_content%3Dlo%26utm_source%3Dinstagramweb%26utm_medium%3Dbadge"
            target="_blank"
          >
            <button className="bg-transparent p-0 border-none">
              <Image
                src={playstore}
                alt="Get it on Google Play"
                width={135}
                height={40}
                className="h-[50px]"
              />
            </button>
          </a>
          <a
            href="https://apps.microsoft.com/detail/9nblggh5l9xt?hl=en-US&gl=US"
            target="_blank"
          >
            <button className="bg-transparent p-0 border-none">
              <Image
                src={microsoft}
                alt="Get it on microsoft"
                width={135}
                height={40}
              />
            </button>
          </a>
        </div>
      </div>
    </>
  );
};

export default Get_app;
