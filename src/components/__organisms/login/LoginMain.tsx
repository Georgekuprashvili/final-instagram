"use client";

import Footer from "@/components/__atoms/footer/footer";
import LoginInputs from "@/components/__molecules/register/LoginInputs";

const Login = () => {
  return (
    <div className="flex flex-col justify-between items-center bg-black w-full h-[100vh]">
      <LoginInputs />
      <Footer />
    </div>
  );
};

export default Login;
