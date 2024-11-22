"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react'

interface CourseViewProps {
  courseId: string | null;
}

interface Module {
  id: number;
  title: string;
  content: string;
  videoUrl: string | null;
  courseId: number;
}

interface Course {
  id: number;
  title: string;
  description: string;
  type: string;
  goal: string;
  lastViewedAt: string | null;
  createdAt: string;
  updatedAt: string;
  correctAnswers: number;
  modules: Module[];
}

const CourseView = ({ courseId }: CourseViewProps) => {
  if (!courseId) {
    return <div>No course selected</div>;
  }

  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (error) {
        console.error('Error fetching course:', error);
      }
    }
    fetchCourse();
  }, [courseId]);

  if (!course) {
    return <div>Loading course details...</div>;
  }

  return (
    <div>
      <h1>{course.title}</h1>
      <div className="space-y-4">
          {course.modules.map((module) => (
            <div
              key={module.id}
              className="p-4 border rounded shadow-sm hover:shadow-md transition"
            >
              <h3 className="text-xl font-semibold">{module.title}</h3>
              <p className="text-gray-700">{module.content}</p>
              {module.videoUrl && (
                <a
                  href={module.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline mt-2 block"
                >
                  Watch Video
                </a>
              )}
            </div>
          ))}
        </div>
    </div>
  )
}

export default CourseView