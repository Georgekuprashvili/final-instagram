import React from "react";
import DownloadButtons from "../DownloadButtons/DownloadButtons";
import { useRouter } from "next/navigation";

const GoRegister = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-between gap-[10px]">
      <div className="w-[350px] h-[60px] border-gray-500 border-[1px] flex flex-col justify-center items-center">
        <p className="text-[white]">
          Don&apos;t have an account?
          <button
            className="text-[#259af6] ml-1"
            onClick={() => router.push("/register")}
          >
            Sign up
          </button>
        </p>
      </div>
      <DownloadButtons />
    </div>
  );
};

export default GoRegister;
