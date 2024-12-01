"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoL from "@/public/images/sidebarL.svg";
import logoD from "@/public/images/sidebarD.svg";
import { useRouter } from "next/navigation";
import { Code, NotebookPen } from "lucide-react";
import { HiX, HiMenu } from "react-icons/hi";

interface SidebarProps {
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
  isOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar = ({ selectedGroup, onSelectGroup, isOpen, toggleMenu }: SidebarProps) => {
  const router = useRouter();
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    };
    checkDarkMode();
    const observer = new MutationObserver(checkDarkMode);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cId");
    localStorage.removeItem("selectedGroup");
    router.push("/login");
  };

  return (
    <>
      <div className="xl:block hidden h-screen px-6 py-8 dark:text-[#121417] text-[#F2F2F2]  bg-[#121417] dark:bg-[#F2F2F2] w-[12rem]  shadow-md fixed">
        <div className="flex flex-col justify-between h-full font-medium text-sm">
          <div className="flex flex-col">
            <Image
              src={isDarkMode ? logoL : logoD}
              alt="NexLearn Logo"
              height={24}
              className="pb-4 px-2"
            />
            <div className="flex flex-col gap-y-2">
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Dashboard"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Dashboard")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "Dashboard"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Dashboard</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Library"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Library")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "Library"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Library</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "My Courses"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("My Courses")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "My Courses"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm0 0-4 4m5 0H4m1 0 4-4m1 4 4-4m-4 7v6l4-3-4-3Z"
                  />
                </svg>
                <p>My Courses</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Code"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Code")}
              >
                <Code className="w-5 h-5" />
                <p>Code</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Practice"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Practice")}
              >
                <NotebookPen className="w-5 h-5" />
                <p>Practice</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Messages"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Messages")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "Messages"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                  <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                </svg>
                <p>Messages</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Settings"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Settings")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "Settings"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.586 2.586A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2v.089l.473.196.063-.063a2.002 2.002 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.827l-.063.064.196.473H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.089l-.196.473.063.063a2.002 2.002 0 0 1 0 2.828l-1.414 1.414a2 2 0 0 1-2.828 0l-.063-.063-.473.196V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.089l-.473-.196-.063.063a2.002 2.002 0 0 1-2.828 0l-1.414-1.414a2 2 0 0 1 0-2.827l.063-.064L4.089 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09l.195-.473-.063-.063a2 2 0 0 1 0-2.828l1.414-1.414a2 2 0 0 1 2.827 0l.064.063L9 4.089V4a2 2 0 0 1 .586-1.414ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Settings</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 ">
            <div className="flex items-center gap-x-2 p-2 rounded-md hover:bg-white/10 dark:hover:bg-black/10 cursor-pointer transition">
              <svg
                className="w-5 h-5 text-[#F2F2F2] dark:text-[#121417]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
                  clipRule="evenodd"
                />
              </svg>
              <p>Help</p>
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center gap-x-2 p-2 rounded-md hover:bg-white/10 dark:hover:bg-black/10 cursor-pointer transition"
            >
              <svg
                className="w-5 h-5 text-[#F2F2F2] dark:text-[#121417]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>
        <nav className='xl:hidden'>
      <button
              onClick={toggleMenu}
              className="text-white focus:outline-none absolute"
            >
              {isOpen ? "": <HiMenu size={30} />}
            </button>
    </nav>
      {/* Close Button */}
      <div
         className={`fixed top-0 left-0 h-full w-64 bg-white p-6 transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* this is for small */}
        <div className="flex flex-col justify-between h-full font-medium text-sm">
          <div className="flex flex-col">
            <Image
              src={isDarkMode ? logoL : logoD}
              alt="NexLearn Logo"
              height={24}
              className="pb-4 px-2"
            />
            <div className="flex flex-col gap-y-2">
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Dashboard"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Dashboard")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "Dashboard"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.857 3A1.857 1.857 0 0 0 3 4.857v4.286C3 10.169 3.831 11 4.857 11h4.286A1.857 1.857 0 0 0 11 9.143V4.857A1.857 1.857 0 0 0 9.143 3H4.857Zm10 0A1.857 1.857 0 0 0 13 4.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 9.143V4.857A1.857 1.857 0 0 0 19.143 3h-4.286Zm-10 10A1.857 1.857 0 0 0 3 14.857v4.286C3 20.169 3.831 21 4.857 21h4.286A1.857 1.857 0 0 0 11 19.143v-4.286A1.857 1.857 0 0 0 9.143 13H4.857Zm10 0A1.857 1.857 0 0 0 13 14.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 21 19.143v-4.286A1.857 1.857 0 0 0 19.143 13h-4.286Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Dashboard</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Library"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Library")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "Library"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 4H9v16h6V4Zm2 16h3a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-3v16ZM4 4h3v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Library</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "My Courses"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("My Courses")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "My Courses"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 4H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1Zm0 0-4 4m5 0H4m1 0 4-4m1 4 4-4m-4 7v6l4-3-4-3Z"
                  />
                </svg>
                <p>My Courses</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Code"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Code")}
              >
                <Code className="w-5 h-5" />
                <p>Code</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Practice"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Practice")}
              >
                <NotebookPen className="w-5 h-5" />
                <p>Practice</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Messages"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Messages")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "Messages"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M2.038 5.61A2.01 2.01 0 0 0 2 6v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6c0-.12-.01-.238-.03-.352l-.866.65-7.89 6.032a2 2 0 0 1-2.429 0L2.884 6.288l-.846-.677Z" />
                  <path d="M20.677 4.117A1.996 1.996 0 0 0 20 4H4c-.225 0-.44.037-.642.105l.758.607L12 10.742 19.9 4.7l.777-.583Z" />
                </svg>
                <p>Messages</p>
              </div>
              <div
                className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition hover:bg-white/10 dark:hover:bg-black/10 ${
                  selectedGroup === "Settings"
                    ? "text-[#7981FF]"
                    : "text-[#F2F2F2] dark:text-[#121417]"
                }`}
                onClick={() => onSelectGroup("Settings")}
              >
                <svg
                  className={`w-5 h-5 ${
                    selectedGroup === "Settings"
                      ? "text-[#7981FF]"
                      : "text-[#F2F2F2] dark:text-[#121417]"
                  }`}
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M9.586 2.586A2 2 0 0 1 11 2h2a2 2 0 0 1 2 2v.089l.473.196.063-.063a2.002 2.002 0 0 1 2.828 0l1.414 1.414a2 2 0 0 1 0 2.827l-.063.064.196.473H20a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-.089l-.196.473.063.063a2.002 2.002 0 0 1 0 2.828l-1.414 1.414a2 2 0 0 1-2.828 0l-.063-.063-.473.196V20a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-.089l-.473-.196-.063.063a2.002 2.002 0 0 1-2.828 0l-1.414-1.414a2 2 0 0 1 0-2.827l.063-.064L4.089 15H4a2 2 0 0 1-2-2v-2a2 2 0 0 1 2-2h.09l.195-.473-.063-.063a2 2 0 0 1 0-2.828l1.414-1.414a2 2 0 0 1 2.827 0l.064.063L9 4.089V4a2 2 0 0 1 .586-1.414ZM8 12a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Settings</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-y-2 ">
            <div className="flex items-center gap-x-2 p-2 rounded-md hover:bg-white/10 dark:hover:bg-black/10 cursor-pointer transition">
              <svg
                className="w-5 h-5 text-[#F2F2F2] dark:text-[#121417]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fillRule="evenodd"
                  d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm9.008-3.018a1.502 1.502 0 0 1 2.522 1.159v.024a1.44 1.44 0 0 1-1.493 1.418 1 1 0 0 0-1.037.999V14a1 1 0 1 0 2 0v-.539a3.44 3.44 0 0 0 2.529-3.256 3.502 3.502 0 0 0-7-.255 1 1 0 0 0 2 .076c.014-.398.187-.774.48-1.044Zm.982 7.026a1 1 0 1 0 0 2H12a1 1 0 1 0 0-2h-.01Z"
                  clipRule="evenodd"
                />
              </svg>
              <p className="text-black">Help</p>
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center gap-x-2 p-2 rounded-md hover:bg-white/10 dark:hover:bg-black/10 cursor-pointer transition"
            >
              <svg
                className="w-5 h-5 text-[#F2F2F2] dark:text-[#121417]"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
                />
              </svg>
              <p className="text-black">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;