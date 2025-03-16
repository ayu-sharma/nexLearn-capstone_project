"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Loader from './loader';
import ErrorMessage from './error-msg';
import { ArrowRight, BookA, Code, DraftingCompass } from 'lucide-react';

interface CourseGridProps {
    onCourseSelect: (courseId: string) => void;
}

const CourseGrid = ({ onCourseSelect }: CourseGridProps) => {
    const [courses, setCourses] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserCourses = async () => {
            const token = localStorage.getItem('token');
            setLoading(true);
            setError(null);
            try {
                const response = await axios.get(`http://localhost:3000/api/user/my-courses`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const enrolledCourses = response.data.courses || [];
                setCourses(enrolledCourses);
                if (enrolledCourses.length === 0) {
                    setError("No courses found.");
                }
            } catch (err) {
                console.error('Error fetching course:', err);
                setError('Failed to fetch course details.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserCourses();
    }, []);

    const handleFind = () => {
        localStorage.setItem("selectedGroup", "Library");
        window.location.reload();
    }

    if (error) {
        return <ErrorMessage handleFind={handleFind} />
    }

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {loading ? Array.from({ length: 8 }).map((_, index) => (
                <SkeletonCard key={index} />
            )) : courses.map((course) => (
                <CourseCard
                  percentage={course.completionPercentage}
                  key={course.course._id}
                  id={course.course._id}
                  title={course.course.title}
                  description={course.course.description}
                  type={course.course.type}
                  onClick={() => onCourseSelect(course.course._id)}
                />
              ))}
        </div>
    )

    
}

export default CourseGrid

const SkeletonCard = () => {
    return (
      <div className="animate-pulse shadow-sm p-6 border rounded-md flex flex-col justify-between gap-y-4">
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center gap-x-2">
            <div className="w-8 h-8 bg-gray-300/20 rounded-full"></div>
            <div className="w-2/3 h-6 bg-gray-300/20 rounded"></div>
          </div>
          <div className="w-full h-4 bg-gray-300/20 rounded"></div>
          <div className="w-5/6 h-4 bg-gray-300/20 rounded"></div>
        </div>
        <div className="w-1/3 h-6 bg-gray-300/20 rounded"></div>
      </div>
    );
  };

  interface CourseCardProps {
    id: string;
    title: string;
    percentage: string;
    description: string;
    type: string;
    onClick: () => void;
  }
  
  const CourseCard = ({
    id,
    title,
    description,
    percentage,
    type,
    onClick,
  }: CourseCardProps) => {
    const getTypeColor = () => {
      switch (type.toUpperCase()) {
        case "CODING":
          return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
        case "APTITUDE":
          return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
        case "LANGUAGE":
          return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
        default:
          return "bg-[#7981FF]/20 text-[#7981FF]";
      }
    };

    const renderLogo = () => {
      switch (type.toUpperCase()) {
        case "CODING":
          return <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
        case "APTITUDE":
          return <DraftingCompass className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
        case "LANGUAGE":
          return <BookA className="h-5 w-5 text-green-600 dark:text-green-400" />;
        default:
          return <Code className="h-5 w-5 text-[#7981FF]" />;
      }
    };
    return (
      <div
            onClick={onClick}
            className="group bg-white dark:bg-gray-800 transition-all duration-300 cursor-pointer rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col justify-between"
          >
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
                  {renderLogo()}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white truncate">
                  {title}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 text-sm h-14">
                {description}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {percentage}% completed
              </p>
              <div className="flex items-center justify-between">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
                  {type}
                </span>
                <span className="text-[#7981FF] group-hover:translate-x-1 transform transition-transform duration-300">
                  <ArrowRight className="h-5 w-5" />
                </span>
              </div>
            </div>
            <div className="h-1 w-full bg-gradient-to-r from-[#7981FF] to-[#6A74FF] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
          </div>
    );
  };