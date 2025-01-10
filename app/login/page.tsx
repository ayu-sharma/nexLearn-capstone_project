"use client";

import { ModeToggle } from "@/components/ModeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { LoginInput } from "@/helpers/zod";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Carousel from "@/components/Carousel";
import Image from "next/image";
import logoL from "@/public/images/logol.svg";
import logoD from "@/public/images/logoD.svg";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [formInputs, setFormInputs] = useState<LoginInput>({
    email: "",
    password: "",
  });

  useEffect(() => {
    const areInputsFilled =
      formInputs.email.trim() !== "" && formInputs.password.trim() !== "";

    setIsButtonDisabled(!areInputsFilled);
  }, [formInputs]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          router.push("/login");
        }

        await axios.get("http://localhost:3000/api/user/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        router.push("/home");
      } catch (error) {
        console.error("Error finding token: ", error);
      }
    };

    checkAuth();
  }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",
        formInputs
      );
      localStorage.setItem("token", response.data.jwt);
      toast.success("Login successful");
      router.push("/home");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        toast.error(error.response.data.error.toString());
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Failed to login: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // const [isDarkMode, setIsDarkMode] = useState(false);
  // useEffect(() => {
  //   const checkDarkMode = () => {
  //     setIsDarkMode(document.documentElement.classList.contains("dark"));
  //   };
  //   checkDarkMode();
  //   const observer = new MutationObserver(checkDarkMode);

  //   observer.observe(document.documentElement, {
  //     attributes: true,
  //     attributeFilter: ["class"],
  //   });

  //   return () => observer.disconnect();
  // }, []);
  return (
    <div className="relative h-screen flex items-center justify-center w-full gap-4">
      <div className="absolute top-10 right-10">
        {/* <ModeToggle /> */}
      </div>
      <div className="hidden md:flex ml-10">
        <Carousel />
      </div>
      <div className="w-full mx-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-center max-w-lg md:max-w-md mx-auto w-full gap-y-4">
            <div className="pb-8">
              <Image
                src={logoD}
                alt="NexLearn Logo"
                height={44}
              />
            </div>
            <h2 className="text-2xl py-2">Welcome Back!</h2>
            <div className="flex flex-col w-full gap-y-2 my-1">
              <p className="text-sm font-mono">Email</p>
              <Input
                placeholder="✉️"
                onChange={(e) => {
                  setFormInputs((c) => ({
                    ...c,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-y-2 my-1">
              <p className="text-sm font-mono">Password</p>
              <Input
                type="password"
                placeholder="🔓"
                onChange={(e) => {
                  setFormInputs((c) => ({
                    ...c,
                    password: e.target.value,
                  }));
                }}
              />
            </div>
            <Button
              variant={"custom"}
              className="w-full my-1 py-6"
              onClick={handleLogin}
              disabled={isButtonDisabled || isLoading}
            >
              {isLoading ? <Loader /> : "Login"}
            </Button>
            <div className="flex items-center my-1 text-sm gap-x-2">
              <p>Don't have an account?</p>
              <div
                className="cursor-pointer font-bold"
                onClick={() => router.push("/signup")}
              >
                Sign Up
              </div>
            </div>
            {/* <div className="flex mt-4 items-center gap-x-4 w-full">
              <div className="w-[30%] h-[0.75px] bg-gray-700/10 dark:bg-gray-300/20" />
              <p className="text-sm flex-1 text-center">or Login with</p>
              <div className="w-[30%] h-[0.75px] bg-gray-700/10 dark:bg-gray-300/20" />
            </div>
            <div className="flex my-1 w-full gap-x-4">
              <Button className="w-1/2 py-6" variant={"outline"}>
                <svg
                  className="h-5"
                  viewBox="-3 0 262 262"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="xMidYMid"
                  fill="#000000"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
                      fill="#4285F4"
                    ></path>
                    <path
                      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
                      fill="#EB4335"
                    ></path>
                  </g>
                </svg>
              </Button>
              <Button className="w-1/2 py-6" variant={"outline"}>
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.006 2a9.847 9.847 0 0 0-6.484 2.44 10.32 10.32 0 0 0-3.393 6.17 10.48 10.48 0 0 0 1.317 6.955 10.045 10.045 0 0 0 5.4 4.418c.504.095.683-.223.683-.494 0-.245-.01-1.052-.014-1.908-2.78.62-3.366-1.21-3.366-1.21a2.711 2.711 0 0 0-1.11-1.5c-.907-.637.07-.621.07-.621.317.044.62.163.885.346.266.183.487.426.647.71.135.253.318.476.538.655a2.079 2.079 0 0 0 2.37.196c.045-.52.27-1.006.635-1.37-2.219-.259-4.554-1.138-4.554-5.07a4.022 4.022 0 0 1 1.031-2.75 3.77 3.77 0 0 1 .096-2.713s.839-.275 2.749 1.05a9.26 9.26 0 0 1 5.004 0c1.906-1.325 2.74-1.05 2.74-1.05.37.858.406 1.828.101 2.713a4.017 4.017 0 0 1 1.029 2.75c0 3.939-2.339 4.805-4.564 5.058a2.471 2.471 0 0 1 .679 1.897c0 1.372-.012 2.477-.012 2.814 0 .272.18.592.687.492a10.05 10.05 0 0 0 5.388-4.421 10.473 10.473 0 0 0 1.313-6.948 10.32 10.32 0 0 0-3.39-6.165A9.847 9.847 0 0 0 12.007 2Z"
                    clipRule="evenodd"
                  />
                </svg>
              </Button>
             </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <svg
        className="animate-spin h-5 w-5 text-[#F2F2F2] dark:text-[#121417]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
        ></path>
      </svg>
    </div>
  );
};
