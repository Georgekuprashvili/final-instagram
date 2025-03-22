import React from "react";
import playstore from "@/photos/playstore.jpg";
import microsoft from "@/photos/microsoft.png";
import Image from "next/image";

const DownloadButtons = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-[5px]">
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
              width={135}
              height={40}
              className="w-[auto] h-[auto]"
            />
          </div>
        </a>
      </div>
    </div>
  );
};

export default DownloadButtons;
