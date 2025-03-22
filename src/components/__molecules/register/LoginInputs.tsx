import React from "react";
import GoRegister from "@/components/__atoms/GoRegister/GoRegister";
import LoginBox from "@/components/__atoms/LoginBox/LoginBox";
import MobileImg from "@/components/__atoms/MobileImg/MobileImg";

const LoginInputs = () => {
  return (
    <div className="flex  justify-center items-center gap-[20px] mt-[100px]">
      <MobileImg />
      <div className="flex flex-col gap-[10px]">
        <LoginBox />
        <GoRegister />
      </div>
    </div>
  );
};

export default LoginInputs;
