"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import instagram from "@/photos/instagram_letter.png";
import DownloadButtons from "../DownloadButtons/DownloadButtons";
import { useRouter } from "next/navigation";
import { registerUser } from "@/Firebase/firebaseAuth.ts";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Email ან მობილური ნომერი სავალდებულოა")
    .test(
      "valid-email-phone",
      "გთხოვთ მიუთითოთ ვალიდური Email ან მობილური ნომერი",
      (value) => {
        if (!value) return false;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const phoneRegex = /^\+?\d{9,15}$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      }
    ),
  password: yup
    .string()
    .matches(/^(?=.*[a-zA-Z0-9]).{6,}$/, "პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო")
    .required("პაროლი სავალდებულოა"),
  fullName: yup.string().required("სრული სახელი სავალდებულოა"),
  username: yup.string().required("მომხმარებლის სახელი სავალდებულოა"),
});

type FormValues = {
  email: string;
  password: string;
  fullName: string;
  username: string;
};

const RegisterInputs = () => {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: FormValues) => {
    try {
      await registerUser(data.email, data.password);
      alert("Registration successful!");
      router.push("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="flex justify-center items-center flex-col gap-[5px] mt-[10px]">
      <div className="border-gray-500 border-[1px] flex flex-col items-center justify-center gap-[5px] w-[350px] h-[570px]">
        <Image
          src={instagram}
          width={175}
          height={40}
          alt="Instagram Logo"
          className="h-auto w-auto"
        />
        <h4 className="text-gray-300 text-center text-lg w-[268px] h-[40px] text-[12px]">
          Sign up to see photos and videos from your friends.
        </h4>

        <button className="bg-[#259af6] hover:bg-blue-800 w-[268px] h-[34px] rounded-lg text-[white] flex items-center justify-center gap-[10px] mt-[10px]">
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 256 256"
            >
              <g fill="#fff">
                <g transform="scale(5.12,5.12)">
                  <path d="M25,3c-12.15,0 -22,9.85 -22,22c0,11.03 8.125,20.137 18.712,21.728v-15.897h-5.443v-5.783h5.443v-3.848c0,-6.371 3.104,-9.168 8.399,-9.168c2.536,0 3.877,0.188 4.512,0.274v5.048h-3.612c-2.248,0 -3.033,2.131 -3.033,4.533v3.161h6.588l-0.894,5.783h-5.694v15.944c10.738,-1.457 19.022,-10.638 19.022,-21.775c0,-12.15 -9.85,-22 -22,-22z" />
                </g>
              </g>
            </svg>
          </span>
          Login in with Facebook
        </button>

        <div className="flex items-center w-full my-2 px-[45px]">
          <hr className="flex-grow border-gray-500" />
          <span className="text-gray-400 mx-3 text-sm">OR</span>
          <hr className="flex-grow border-gray-500" />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <input
            type="text"
            placeholder="Mobile Number or Email"
            {...register("email")}
            className="w-[260px] h-[36px] text-white placeholder:text-[12px] bg-[#1c1e21] px-3 py-2 rounded-md border-none mb-2"
          />
          {errors.email && (
            <p className="text-red-500 text-xs">{errors.email.message}</p>
          )}

          <div className="relative w-full flex justify-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              {...register("password")}
              className="w-[260px] h-[36px] text-white placeholder:text-[12px] bg-[#1c1e21] px-3 py-2 rounded-md border-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-white"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-xs">{errors.password.message}</p>
          )}

          <input
            type="text"
            placeholder="Full Name"
            {...register("fullName")}
            className="mt-[10px] w-[260px] h-[36px] text-white placeholder:text-[12px] bg-[#1c1e21] px-3 py-2 rounded-md border-none mb-2"
          />
          {errors.fullName && (
            <p className="text-red-500 text-xs">{errors.fullName.message}</p>
          )}

          <input
            type="text"
            placeholder="Username"
            {...register("username")}
            className="w-[260px] h-[36px] text-white placeholder:text-[12px] bg-[#1c1e21] px-3 py-2 rounded-md border-none mb-2"
          />
          {errors.username && (
            <p className="text-red-500 text-xs">{errors.username.message}</p>
          )}

          <p className="text-xs text-[9px] text-gray-400 my-2 text-center w-[268px]">
            People who use our service may have uploaded your contact
            information to Instagram.{" "}
            <a
              href="https://www.facebook.com/help/instagram/261704639352628"
              className="text-blue-400"
              target="_blank"
            >
              Learn More
            </a>
          </p>

          <p className="text-xs  text-[9px] text-gray-400  text-center w-[268px]">
            By signing up, you agree to our{" "}
            <a
              href="https://help.instagram.com/581066165581870/?locale=en_US"
              className="text-blue-400"
              target="_blank"
            >
              Terms
            </a>
            ,{" "}
            <a
              href="https://www.facebook.com/privacy/policy"
              className="text-blue-400"
              target="_blank"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="https://privacycenter.instagram.com/policies/cookies/"
              className="text-blue-400"
              target="_blank"
            >
              Cookies Policy
            </a>
            .
          </p>
          <button
            type="submit"
            className="bg-[#259af6] mt-[8px] hover:bg-blue-800 w-[268px] h-[34px] rounded-lg text-[white] "
          >
            Sign up
          </button>
        </form>
      </div>

      <div className="border-gray-500 border-[1px] flex flex-col items-center justify-center w-[350px] h-[55px]">
        <p className="text-white">Have an account?</p>
        <button
          className="text-[#259af6]"
          onClick={() => router.push("/login")}
        >
          Log in
        </button>
      </div>

      <DownloadButtons />
    </div>
  );
};

export default RegisterInputs;
