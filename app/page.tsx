"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import logoD from "../public/images/logoD.svg";
import Link from "next/link";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import Courses from "../components/Courses";
import { useRouter } from "next/navigation";
import Footer from "@/components/Footer";
import AboutPage from "@/components/About";
import BackToTop from "@/components/Floater"; // Import the new component

const Landing = () => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoading(true);
      router.push("/home");
    } else {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return null;
  }

  return (
    <div className="font-mono overflow-hidden bg-[#ffffff] text-[#0a1728] min-h-[100vh]">
      <div className="flex flex-col my-8 md:mx-12 mx-6">
        <div className="md:hidden flex items-center justify-between">
          <div className="py-2">
            <Image
              src={logoD}
              alt="NexLearn Logo"
              height={32}
              width={32}
              className="h-8 w-auto"
            />
          </div>
          <div className="md:hidden block">
            <Navbar />
          </div>
        </div>
        <div className="hidden md:block">
          <div className="flex justify-between gap-x-16 items-center md:px-12">
            <div className="pb-4">
              <Image src={logoD} alt="NexLearn Logo" height={44} />
            </div>
            <div className="">
              <Navbar />
            </div>
            <Link href="/login">
              <Button className="w-full text-lg py-6 px-10 text-[#F2F2F2] bg-[#121417] border border-[#121417] hover:bg-transparent hover:text-[#121417]">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
        <div className="mt-32 md:mb-20 mb-10" id="home">
          <div className="md:text-center text-bold font-monospace lg:text-[5] sm:text-4xl text-3xl md:text-6xl max-w-6xl mx-auto flex flex-col gap-3 px-6 md:px-16">
            Unleash Your Potential <br />{" "}
            <div className=""> with AI-Powered Learning </div>{" "}
          </div>
        </div>
        <div className="flex flex-col md:items-center justify-center">
          <p className="text-balance md:text-center leading-8 text-lg px-6 md:px-24 max-w-4xl mx-auto">
            Step into the future of education with NexLearn, where AI-driven
            insights and personalized feedback revolutionize the way you learn,
            helping you master subjects faster and smarter.
          </p>

          <div>
            <Link href={"http://localhost:3000/signup"}>
              <Button className="bg-transparent rounded text-lg py-6 px-12 mx-3 md:mx-0 text-[#121417] my-10 hover:bg-[#121417] border-[#121417] hover:text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
        <div className="bg-[#121417] text-white py-12 md:py-16 px-6 md:px-16 rounded-xl max-w-8xl mx-auto mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-12 text-center">
            Core Features
          </h2>

          <div className="grid lg:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">AI-Powered Insights</h3>
              <p>
                Our advanced algorithms identify patterns in your learning
                behavior to help you focus on key areas that need improvement.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">Personalized Learning</h3>
              <p>
                Receive tailored assignments designed specifically to target
                your weak points and accelerate your improvement in those areas.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border-2 border-white rounded-full flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-4">
                Interactive & Trackable
              </h3>
              <p>
                Engage with interactive video lectures and quizzes while
                tracking your progress through comprehensive analytics
                dashboards.
              </p>
            </div>
          </div>
        </div>
        <div className="" id="courses">
          <Courses />
        </div>
      </div>
      <div id="about">
        <AboutPage />
      </div>
      <Footer />
      <BackToTop /> {/* Add the BackToTop component here */}
    </div>
  );
};

export default Landing;
