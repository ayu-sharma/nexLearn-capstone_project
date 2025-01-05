import React from "react";
import { ChevronLeft, Youtube, Clock, Star } from "lucide-react";
export default function courses() {
  return (
    <div className="flex justify-between w-full py-6 px-5 gap-3">
      <div className="flex flex-col gap-5">
        <div className="">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#fefefd] border border-[#e8e9ef] rounded-xl">
              <ChevronLeft />
            </div>
            <p className="text-lg font-semibold">FullStack Development</p>
            <p className="text-xs py-1 px-2 border border-[#e8e9ef] bg-[#f5f6f9] rounded-full">
              Coding
            </p>
          </div>
          <div className="flex ml-12 items-center stroke-1 gap-4">
            <div className="flex gap-2 items-center">
              <Youtube className=" text-[#714ee2]" size={15} />
              <p className="text-xs text-black">28 Modules</p>
            </div>
            <div className="flex gap-2 items-center">
              <Clock className=" text-[#714ee2]" size={15} />
              <p className="text-xs text-black">10h 48min</p>
            </div>
            <div className="flex gap-2 items-center">
              <Star className=" text-[#714ee2]" size={15} />
              <p className="text-xs text-black">4.1 Rating</p>
            </div>
          </div>
        </div>
        <div className="">
          <video width="750" height="500" controls className="rounded-2xl">
            <source src="./Videos/video1.mp4" type="video/mp4" />
          </video>
        </div>
        <div className="px-2 py-3 bg-[#fafcfd] rounded-lg border border-[#e8e9ef]"></div>
      </div>
      <div className="flex flex-col mt-16 bg-[#fafcfd] rounded-xl py-3 max-w-md border-[#e8e9ef] border w-full">
        <div className="font-bold pb-3 px-4">
            Module Content
        </div>
        <div className="border border-[#e7e6ec] w-full p-0 "></div>
        
      </div>
    </div>
  );
}
