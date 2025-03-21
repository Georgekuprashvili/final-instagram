import React from "react";
import Footer from "@/components/atoms__/footer/footer";
import Login_inputs from "@/components/molecules__/register/Login_inputs";

const Login = () => {
  return (
    <div className=" flex flex-col justify-between items-center bg-black w-full h-[100vh]">
      <Login_inputs />
      <Footer />
    </div>
  );
};

export default Login;
