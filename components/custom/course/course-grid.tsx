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
                const response = await axios.get(`http://localhost:3000/api/user/courses/enrolled`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                const enrolledCourses = response.data.enrolledCourses || [];

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
                  key={course.course.id}
                  id={course.course.id}
                  title={course.course.title}
                  description={course.course.description}
                  type={course.course.type}
                  onClick={() => onCourseSelect(course.course.id)}
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
    description: string;
    type: string;
    onClick: () => void;
  }
  
  const CourseCard = ({
    id,
    title,
    description,
    type,
    onClick,
  }: CourseCardProps) => {
    const renderLogo = () => {
      switch (type) {
        case "CODING":
          return <Code className="mr-2" />;
        case "APTITUDE":
          return <DraftingCompass className="mr-2" />;
        case "LANGUAGE":
          return <BookA className="mr-2" />;
      }
    };
    return (
      <div
        onClick={onClick}
        className="group transition cursor-pointer relative shadow-sm p-6 border rounded-md flex flex-col justify-between gap-y-4 hover:border-neutral-400"
      >
        <div className="flex flex-col gap-y-4">
          <div className="flex items-center">
            {renderLogo()}
            <h1 className="text-2xl font-medium">{title}</h1>
          </div>
          <p className="font-light">{description}</p>
        </div>
        <div className="flex w-1/3">
          <p className="text-sm font-medium bg-[#7981FF]/20 text-[#7981FF] px-4 py-1 rounded">
            {type}
          </p>
        </div>
        <div className="absolute bottom-6 right-6 hidden group-hover:flex transition ease-in-out">
          <ArrowRight />
        </div>
      </div>
    );
  };