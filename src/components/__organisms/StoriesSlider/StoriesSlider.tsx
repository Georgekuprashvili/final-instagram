"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const dummyStories = [
  "gvantsa_es",
  "eleneeraz",
  "kuprashvili",
  "anukaormi",
  "rocket_34",
  "nina.k",
  "mari_q",
  "dato_97",
  "salome_s",
  "luka_dev",
  "tamo.sh",
  "nika",
  "mari_q",
  "dato_97",
  "salome_s",
  "luka_dev",
  "tamo.sh",
  "nika.",
];

export default function SwiperBase() {
  return (
    <div className=" w-[645px] ">
      <Swiper
        navigation={{
          nextEl: ".custom-next",
          prevEl: ".custom-prev",
        }}
        modules={[Navigation]}
        spaceBetween={10}
        slidesPerView="auto"
      >
        <button className="custom-prev absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black">
          ←
        </button>
        <button className="custom-next absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-white hover:text-black">
          →
        </button>
        {dummyStories.map((username, index) => (
          <SwiperSlide
            key={index}
            className="!w-auto min-w-[80px] flex flex-col items-center text-center"
          >
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full  p-[2px] bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600">
                <div className="w-full h-full bg-black rounded-full p-[2px]">
                  <div className="w-full h-full rounded-full bg-gray-700 flex items-center justify-center text-white text-sm font-semibold">
                    {username.charAt(0).toUpperCase()}
                  </div>
                </div>
              </div>
              <span className="text-[11px] mt-1 text-gray-300 max-w-[64px] ">
                {username}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
