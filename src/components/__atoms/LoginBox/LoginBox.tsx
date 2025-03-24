"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import instagram from "@/photos/instagram_letter.png";
import { useRouter } from "next/navigation";
import { loginUser } from "@/Firebase/firebaseAuth.ts";
import { loginWithFacebook } from "@/Firebase/firebaseAuth.ts";

const schema = yup.object().shape({
  email: yup.string().required("მიუთითე ელფოსტა ან მომხმარებელი"),
  password: yup.string().required("შეიყვანე პაროლი"),
});

type FormValues = {
  email: string;
  password: string;
};

const LoginBox = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await loginUser(data.email, data.password);
      router.push("/main");
    } catch {
      setError("email", { message: "მომხმარებელი ან პაროლი არასწორია" });
      setError("password", { message: "მომხმარებელი ან პაროლი არასწორია" });
    }
  };

  return (
    <div className="w-[350px] h-[410px] border-gray-500 border-[1px] flex flex-col items-center justify-center gap-[10px]">
      <Image
        src={instagram}
        width={175}
        height={40}
        alt="Instagram Logo"
        className="w-auto h-auto"
      />

      <form
        className="flex flex-col items-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          type="text"
          placeholder="Phone number, username, or email"
          {...register("email")}
          className="w-[260px] h-[36px] text-white placeholder:text-[12px] bg-[#1c1e21] px-3 py-2 rounded-md border-none mb-1"
        />
        {errors.email && (
          <p className="text-red-500 text-xs mb-2">{errors.email.message}</p>
        )}

        <div className="relative w-full flex justify-center">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            {...register("password")}
            className="w-[260px] h-[36px] text-white placeholder:text-[12px] bg-[#1c1e21] px-3 py-2 rounded-md border-none"
          />
          {errors.password && (
            <p className="text-red-500 text-xs absolute bottom-[-18px]">
              {errors.password.message}
            </p>
          )}
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        <button
          type="submit"
          className="mt-6 w-[268px] h-[30px] bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700"
        >
          Log in
        </button>
      </form>

      <div className="flex items-center w-full my-4 px-[45px]">
        <hr className="flex-grow border-gray-500" />
        <span className="text-gray-400 mx-3 text-sm">OR</span>
        <hr className="flex-grow border-gray-500" />
      </div>

      <div className="flex items-center  gap-[6px]">
        <button className="flex jus">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 256 256"
          >
            <g fill="#259af6">
              <g transform="scale(5.12,5.12)">
                <path d="M25,3c-12.15,0 -22,9.85 -22,22c0,11.03 8.125,20.137 18.712,21.728v-15.897h-5.443v-5.783h5.443v-3.848c0,-6.371 3.104,-9.168 8.399,-9.168c2.536,0 3.877,0.188 4.512,0.274v5.048h-3.612c-2.248,0 -3.033,2.131 -3.033,4.533v3.161h6.588l-0.894,5.783h-5.694v15.944c10.738,-1.457 19.022,-10.638 19.022,-21.775c0,-12.15 -9.85,-22 -22,-22z"></path>
              </g>
            </g>
          </svg>
          ;
        </button>
        <button
          onClick={async () => {
            try {
              await loginWithFacebook();
              router.push("/main");
            } catch {}
          }}
          className="text-[#259af6] hover:text-white"
        >
          Log in with Facebook
        </button>
      </div>

      <p className="text-white">Forgot password?</p>
    </div>
  );
};

export default LoginBox;
