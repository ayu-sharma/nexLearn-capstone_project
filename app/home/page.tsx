"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/Sidebar";
import DashboardGrid from "@/components/custom/dashboard/dashboard-grid";
import CourseView from "@/components/custom/course/course-view";
import Library from "@/components/custom/library/library-view";
import CodePage from "@/components/custom/code/code-view";
import PracticeSection from "@/components/custom/practice/practice-section";
import NotificationSection from "@/components/custom/notification/notification-section";
import SettingsSection from "@/components/custom/settings/settings-section";
import RightNav from "@/components/right-nav"

const HomePage = () => {
  const router = useRouter();
  const [selectedGroup, setSelectedGroup] = useState("Dashboard");
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
      } catch (error) {
        console.error("Error finding authorisation token: ", error);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    const savedGroup = localStorage.getItem("selectedGroup");
    console.log("this is saved", localStorage.getItem("selectedGroup"));
    if (savedGroup) {
      setSelectedGroup(savedGroup);
    }
  }, []);

  // Persist selected group to localStorage whenever it changes
  const handleGroupChange = (newGroup: string) => {
    setSelectedGroup(newGroup);
    localStorage.setItem("selectedGroup", newGroup);
    setIsOpen(false);
  };

  const renderComponent = () => {
    switch (selectedGroup) {
      case "Dashboard":
        return <DashboardGrid />;
      case "Library":
        return <Library onSelectCourse={handleCourseSelection} />;
      case "My Courses":
        return <CourseView />;
      case "Code":
        return <CodePage />;
      case "Practice":
        return <PracticeSection />;
      case "Notifications":
        return <NotificationSection />;
      case "Settings":
        return <SettingsSection />;
      default:
        return <div>Other component</div>;
    }
  };

  const handleCourseSelection = (courseId: string) => {
    setSelectedCourseId(courseId); // Update selected course ID
    setSelectedGroup("My Courses"); // Switch to "My Courses" view
    localStorage.setItem("selectedGroup", "My Courses");
  };

  return (
    <div className="relative min-h-screen bg-gray-50 overflow-hidden">
  {/* Sidebar */}
  <Sidebar
    selectedGroup={selectedGroup}
    onSelectGroup={handleGroupChange}
    isOpen={isOpen}
    toggleMenu={toggleMenu}
  />
  
  {/* Header */}
      <div className="fixed z-10 w-full bg-white shadow-sm border-b border-gray-200 pl-[13rem]">
  <div className="px-6 xl:flex hidden items-center justify-between">
    <div className="text-2xl font-medium text-gray-800 hidden xl:block py-4">{selectedGroup}</div>
      <RightNav />
  </div>
</div>
  
  {/* Main Content */}
  <div className="px-4 xl:px-6 xl:pl-[14rem] xl:pt-[5rem] xl:py-8 flex flex-col w-full py-20">
    <div className="w-full max-w-7xl mx-auto z-5">
      {renderComponent()}
    </div>
  </div>
</div>
  );
};

export default HomePage;


