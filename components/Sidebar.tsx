"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import logoL from "@/public/images/sidebarL.svg";
import logoD from "@/public/images/sidebarD.svg";
import { useRouter } from "next/navigation";
import { Code, NotebookPen, Menu, X } from "lucide-react";
import RightNav from "./right-nav";
import { useUserContext } from "@/context/UserContext";

interface SidebarProps {
  selectedGroup: string;
  onSelectGroup: (group: string) => void;
  isOpen: boolean;
  toggleMenu: () => void;
}

const Sidebar = ({ selectedGroup, onSelectGroup, isOpen, toggleMenu }: SidebarProps) => {
  const router = useRouter();
  const { logout } = useUserContext();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cId");
    localStorage.removeItem("selectedGroup");
    logout();
    router.push("/login");
  };
  
  const menuItems = [
    {
      name: "Dashboard",
      icon: (active: boolean) => (
        <svg
          className={`w-5 h-5 ${
            active ? "text-[#7981FF]" : "text-[#F2F2F2] dark:text-[#121417]"
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
      )
    },
    {
      name: "Library",
      icon: (active: boolean) => (
        <svg
          className={`w-5 h-5 ${
            active ? "text-[#7981FF]" : "text-[#F2F2F2] dark:text-[#121417]"
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
      )
    },
    {
      name: "My Courses",
      icon: (active: boolean) => (
        <svg
          className={`w-5 h-5 ${
            active ? "text-[#7981FF]" : "text-[#F2F2F2] dark:text-[#121417]"
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
      )
    },
    {
      name: "Notifications",
      icon: (active: boolean) => (
        <svg
        className={`w-5 h-5 ${
          active ? "text-[#7981FF]" : "text-[#F2F2F2] dark:text-[#121417]"
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
          d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2Zm6-6V10a6 6 0 0 0-12 0v6l-2 2v1h16v-1l-2-2Z"
        />
      </svg>
      
      )
    },
    {
      name: "Code",
      icon: (active: boolean) => <Code className={`w-5 h-5 ${active ? "text-[#7981FF]" : "text-[#F2F2F2] dark:text-[#121417]"}`} />
    },
    {
      name: "Settings",
      icon: (active: boolean) => (
        <svg
          className={`w-5 h-5 ${
            active ? "text-[#7981FF]" : "text-[#F2F2F2] dark:text-[#121417]"
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
      )
    }
  ];

  const renderMenuItem = (item: any, isMobile = false) => {
    const isActive = selectedGroup === item.name;
    return (
      <div
        key={item.name}
        className={`flex items-center gap-x-2 p-2 rounded-md cursor-pointer transition ${
          isActive 
            ? "bg-opacity-10 bg-[#7981FF] text-[#7981FF]" 
            : isMobile 
              ? "text-[#121417] hover:bg-black/5" 
              : "text-[#F2F2F2] dark:text-[#121417] hover:bg-white/10 dark:hover:bg-black/10"
        }`}
        onClick={() => {
          onSelectGroup(item.name);
          if (isMobile && isOpen) toggleMenu();
        }}
      >
        {item.icon(isActive)}
        <p className={isActive ? "font-medium" : ""}>{item.name}</p>
      </div>
    );
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="xl:block hidden h-screen px-6 py-8 dark:text-[#121417] text-[#F2F2F2] bg-[#121417] dark:bg-[#F2F2F2] w-[12rem] shadow-md fixed rounded-r-lg z-30">
        <div className="flex flex-col justify-between h-full font-medium text-sm">
          <div className="flex flex-col">
            <Image
              src={logoD}
              alt="NexLearn Logo"
              height={24}
              className="pb-4 px-2"
            />
            <div className="flex flex-col gap-y-3 mt-2">
              {menuItems.map(item => renderMenuItem(item))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2">
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

      {/* Mobile Hamburger Button */}
      <nav className="xl:hidden fixed top-4 left-4 z-40">
        <button
          onClick={toggleMenu}
          className="p-2 bg-white rounded-full shadow-md hover:shadow-lg transition-all duration-300 focus:outline-none"
          aria-label="Toggle menu"
        >
          <Menu size={24} className="text-[#121417]" />
        </button>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 xl:hidden transition-opacity duration-300"
          onClick={toggleMenu}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl p-6 transition-transform duration-300 ease-in-out z-50 xl:hidden ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-between h-full font-medium text-sm">
          <div className="flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <Image
                src={logoD}
                alt="NexLearn Logo"
                height={24}
                className="px-2"
              />
              <button 
                onClick={toggleMenu}
                className="p-1 rounded-full hover:bg-gray-100 transition-all"
                aria-label="Close menu"
              >
                <X size={20} className="text-[#121417]" />
              </button>
            </div>
            <div className="flex flex-col gap-y-2 mt-4">
              {menuItems.map(item => renderMenuItem(item, true))}
            </div>
          </div>
          <div className="flex flex-col gap-y-2 mt-6 border-t pt-6">
          <RightNav />
            <div className="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition">
              <svg
                className="w-5 h-5 text-[#121417]"
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
              <p className="text-[#121417]">Help</p>
            </div>
            <div
              onClick={handleLogout}
              className="flex items-center gap-x-2 p-2 rounded-md hover:bg-gray-100 cursor-pointer transition"
            >
              <svg
                className="w-5 h-5 text-[#121417]"
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
              <p className="text-[#121417]">Logout</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;