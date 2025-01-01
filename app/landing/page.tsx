"use client";

import React from "react";
import Image from "next/image";
import logoD from "@/public/images/logoD.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import aipowered from "../../public/images/aipowered.svg";
import learning from "../../public/images/learning.svg";
import trackable from "../../public/images/trackable.svg";
import Courses from "../../components/Courses";

const Landing = () => {
  return (
    <div className="font-mono overflow-hidden bg-[#ffffff] text-[#0a1728] min-h-[100vh]">
      <div className="flex flex-col my-8 md:mx-5 mx-3 ">
        <div className="md:hidden flex items-center justify-between">
          <div className="pb-4">
            <Image src={logoD} alt="NexLearn Logo" height={44} />
          </div>
          <div className="md:hidden block">
            <Navbar />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex justify-between gap-x-8 items-center md:px-9">
            <div className="pb-4">
              <Image src={logoD} alt="NexLearn Logo" height={44} />
            </div>
            <div className="">
              <Navbar />
            </div>
            <Link href="http://localhost:3000/login">
              <Button className=" w-full text-lg py-6 px-8 text-[#F2F2F2] bg-[#121417] border border-[#121417] hover:bg-transparent hover:text-[#121417]">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-32 md:mb-20 mb-10">
          <div className="md:text-center text-bold font-monospace lg:text-[5] sm:text-4xl text-3xl md:text-6xl max-w-6xl mx-auto flex flex-col gap-3 px-3 md:px-9">
            Unleash Your Potential <br />{" "}
            <div className=""> with AI-Powered Learning </div>{" "}
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
              <Button className="bg-transparent rounded text-lg py-6 px-8 mx-3 md:mx-0 text-[#121417] my-10 hover:bg-[#121417] border-[#121417] hover:text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="flex w-full justify-between max-w-5xl gap-16 mx-auto">
          {[
            {
              heading: "AI-Powered Insights",
              image: aipowered,
              alt: "AI-Powered Insights",
              description:
                "NexLearn identifies your strengths and weakness to help you focus on key areas",
            },
            {
              heading: "Personalized Learning",
              image: learning,
              alt: "Personalized Learning",
              description:
                "Recieve tailored assignments to target weak points and accelerate improvement",
            },
            {
              heading: "Interactive & Trackable",
              image: trackable,
              alt: "Interactive & Trackable",
              description:
                "Engage with video lectures and quizzes while tracking your progress through detailed analytics",
            },
          ].map((info) => (
            <div className="flex flex-col gap-10 rounded-xl items-center bg-[#121417] max-w-xs py-5 px-4 w-full ">
              <p className="text-white"> {info.heading}</p>
              <Image
                className=""
                src={info.image}
                alt={info.alt}
                width={80}
                height={60}
              />
              <p className="text-center text-white">{info.description}</p>
            </div>
          ))}
        </div>
        <Courses/>
      </div>
    </div>
  );
};

export default Landing;
