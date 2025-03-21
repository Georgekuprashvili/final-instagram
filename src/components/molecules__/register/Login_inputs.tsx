import Get_app from "@/components/atoms__/get_app/Get_app";
import Login_box from "@/components/atoms__/Login_box/Login_box";
import Mobile_img from "@/components/atoms__/mobile.img/Mobile_img";
import React from "react";

const Register = () => {
  return (
    <div className="flex  justify-center items-center gap-[20px] mt-[100px]">
      <Mobile_img />
      <div className="flex flex-col gap-[10px]">
        <Login_box />
        <Get_app />
      </div>
    </div>
  );
};

export default Register;
