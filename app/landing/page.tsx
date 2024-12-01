"use client";

import React from "react";
import Image from "next/image";
import logoL from "@/public/images/logoL.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";

const Landing = () => {
  return (
    <div className="font-mono bg-gradient-to-b overflow-auto from-[rgba(0,0,0,0.93)] to-[#3f3d3d] text-[#F2F2F2] min-h-[100vh]">
      <div className="md:hidden flex items-center justify-between py-8 px-3">
         <div className="pb-4 ">
          <Image src={logoL} alt="NexLearn Logo" height={44} />
        </div>
        <div className="md:hidden block">
          <Navbar />
        </div>
        </div>
      <div className="hidden md:block">
      <div className="flex justify-between gap-x-8 items-center py-8 px-3 md:px-9">
        <div className="pb-4">
          <Image src={logoL} alt="NexLearn Logo" height={44} />
        </div>
        <div className="">
          <Navbar />
        </div>
        <Link href="http://localhost:3000/login">
          <Button className=" w-full text-lg py-6 px-8 text-[#F2F2F2] bg-transparent border border-[#F2F2F2] hover:bg-[#F2F2F2] hover:text-[#121417]">
            Sign In
          </Button>
        </Link>
      </div>
      </div>
      <div className="mt-32 md:mb-20 mb-10">
        <div className="md:text-center text-bold font-monospace lg:text-[5] sm:text-4xl text-3xl md:text-6xl max-w-6xl mx-auto flex flex-col gap-3 px-3 md:px-9">
          Unleash Your{" "}
            {" "}
            Potential{" "}
          <br />{" "}
          <div className="">
            {" "}
            with{" "}
              {" "}
              AI-Powered Learning{" "}
          </div>{" "}
        </div>
      </div>
      <div className="flex flex-col md:items-center justify-center">
        <p className="text-balance md:text-center leading-8 text-lg px-3 md:px-5">
          Step into the future of education with NexLearn, where AI-driven
          insights and personalized feedback revolutionize the way you learn,
          helping you master subjects faster and smarter.
        </p>

        <div>
          <Link href={"http://localhost:3000/signup"}>
            <Button className="bg-[#F2F2F2] rounded text-lg py-6 px-8 mx-3 md:mx-0 text-[#121417] my-10 hover:bg-transparent hover:border-white hover:border hover:text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
