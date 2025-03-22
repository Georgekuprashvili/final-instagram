import Footer from "@/components/__atoms/footer/footer";
import RegisterInputs from "@/components/__atoms/RegisterInputs/RegisterInputs";
import React from "react";

const RegisterMain = () => {
  return (
    <div className="flex flex-col justify-between items-center bg-black w-full h-[100vh]">
      <RegisterInputs />
      <Footer />
    </div>
  );
};

export default RegisterMain;
