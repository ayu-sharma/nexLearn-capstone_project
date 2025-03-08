"use client";

import React, { useState } from "react";
import CourseGrid from "./course-grid";
import { useRouter } from "next/navigation";

const CourseView: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCourseSelect = async (courseId: string | number) => {
    setIsLoading(true);
    try {
      router.push(`/courses?cId=${courseId}`);
    } catch (error) {
      console.error("Navigation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
       <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Your Courses</h1>
        <p className="text-gray-600 mt-2">
          Browse and select from the courses you are enrolled in
        </p>
      </header>
      
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <CourseGrid onCourseSelect={handleCourseSelect} />
      )}
      
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>Click on any course to view more details</p>
      </footer>
    </div>
  );
};

export default CourseView;