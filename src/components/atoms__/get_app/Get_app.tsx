import Image from "next/image";
import React from "react";
import playstore from "@/photos/playstore.jpg";
import microsoft from "@/photos/microsoft.png";

const Get_app = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-[10px]">
      <div className="w-[350px] h-[60px] border-gray-500 border-[1px] flex justify-center items-center">
        <p className="text-[white]">
          Don&apos;t have an account?
          <button className="text-[#259af6] ml-1">Sign up</button>
        </p>
      </div>

      <p className="text-white">Get the app</p>

      <div className="flex justify-center gap-[8px]">
        <a
          href="https://play.google.com/store/apps/details?id=com.instagram.android"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src={playstore}
            alt="Get it on Google Play"
            width={135}
            height={40}
            priority
            className="w-auto h-auto"
          />
        </a>

        <a
          href="https://apps.microsoft.com/detail/9nblggh5l9xt?hl=en-US&gl=US"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className="relative w-[150px] h-[60px]">
            <Image
              src={microsoft}
              alt="Get it on Microsoft"
              fill
              className="object-contain"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default Get_app;
