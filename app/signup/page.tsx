"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios, { AxiosError } from "axios";
import Image from "next/image";
import { Eye, EyeOff } from 'lucide-react';
import toast from "react-hot-toast";

// Import your UI components
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Carousel from "@/components/Carousel";
// import { ModeToggle } from "@/components/ModeToggle";

// Import your images
import logoD from "@/public/images/logoD.svg";
import { SignupInput } from "@/helpers/zod";

// Define Loader component
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

const Signup = () => {
  const router = useRouter();
  const [checked, setChecked] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formInputs, setFormInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const areInputsFilled =
      formInputs.email.trim() !== "" &&
      formInputs.password.trim() !== "" &&
      formInputs.confirmPassword.trim() !== "";

    setIsButtonDisabled(!(areInputsFilled && checked));
  }, [formInputs, checked]);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          return; // If no token, stay on signup page
        }

        try {
          await axios.get("http://localhost:3000/api/user/me", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          router.push("/home");
        } catch (error) {
          console.error("Authentication error:", error);
          localStorage.removeItem("token"); // Clear invalid token
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      }
    };

    checkAuth();
  }, [router]); // Add router to dependency array

  const handleSignup = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/signup",
        formInputs
      );
      localStorage.setItem("token", response.data.jwt);
      toast.success("Signup successful");
      router.push("/home");
    } catch (error) {
      if (error instanceof AxiosError && error.response?.data?.error) {
        toast.error(error.response.data.error.toString());
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error("Failed to sign up:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="relative h-screen flex gap-x-2 items-center justify-center w-full overflow-hidden">
      <div className="absolute top-10 right-10">
        {/* <ModeToggle /> */}
      </div>
      <div className="hidden md:flex ml-10">
        <Carousel />
      </div>
      <div className="w-full mx-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col items-center max-w-lg md:max-w-md mx-auto w-full">
            <div className="pb-4">
              {/* Handle possible image loading issues */}
              {logoD ? (
                <Image
                  src={logoD}
                  alt="NexLearn Logo"
                  height={44}
                  width={200}
                />
              ) : (
                <div className="h-11 w-48 bg-gray-200 rounded animate-pulse"></div>
              )}
            </div>
            <h2 className="text-2xl pb-2">Sign Up</h2>
            <div className="flex flex-col w-full gap-y-1 mb-1">
              <p className="text-sm font-mono">Name</p>
              <Input
                placeholder="👤"
                onChange={(e) => {
                  setFormInputs((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-y-1 mb-1">
              <p className="text-sm font-mono">Email</p>
              <Input
                placeholder="✉️"
                onChange={(e) => {
                  setFormInputs((prev) => ({
                    ...prev,
                    email: e.target.value,
                  }));
                }}
              />
            </div>
            <div className="flex flex-col w-full gap-y-1 mb-1">
              <p className="text-sm font-mono">Password</p>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="🔓"
                  value={formInputs.password}
                  onChange={(e) =>
                    setFormInputs((prev) => ({
                      ...prev,
                      password: e.target.value,
                    }))
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex flex-col w-full gap-y-1 mb-1">
              <p className="text-sm font-mono">Confirm Password</p>
              <div className="relative">
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="🔓"
                  value={formInputs.confirmPassword}
                  onChange={(e) =>
                    setFormInputs((prev) => ({
                      ...prev,
                      confirmPassword: e.target.value,
                    }))
                  }
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="flex items-center gap-x-2 my-1 w-full">
              <input 
                type="checkbox" 
                name="agree" 
                id="agree" 
                onChange={(e) => setChecked(e.target.checked)} 
                className="h-4 w-4"
              />
              <p className="text-sm">
                I agree to abide by Terms of Service and Privacy Policy
              </p>
            </div>
            <Button
              variant={"custom"}
              className="w-full my-1 py-5"
              onClick={handleSignup}
              disabled={isButtonDisabled || isLoading}
            >
              {isLoading ? <Loader /> : "Sign Up"}
            </Button>
            <div className="flex items-center my-1 text-sm gap-x-2">
              <p>Already have an account?</p>
              <div
                className="cursor-pointer font-bold"
                onClick={() => router.push("/login")}
              >
                Login
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;