"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { BookA, ChevronRight, Code, DraftingCompass, File, Video } from 'lucide-react';
import React, { useEffect, useState } from 'react';

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

  const renderLogo = () => {
    switch (course.type) {
      case "CODING":
        return <Code className='mr-2' />;
      case "APTITUDE":
        return <DraftingCompass className='mr-2' />
      case "LANGUAGE":
        return <BookA className='mr-2' />
    }
  }

  return (
    <div className='flex flex-col gap-y-6'>
      <div className='flex flex-col gap-y-2'>
        <div className='flex items-center'>
          {renderLogo()}
          <h1 className='text-2xl font-medium'>{course.title}</h1>
        </div>
        <p className='font-light'>{course.description}</p>
      </div>
      <div className='flex gap-6 h-[75vh]'>
        <div className="flex flex-col gap-6 w-1/4">
          {course.modules.map((module) => (
            <div
              key={module.id}
              className="flex justify-between items-center p-4 border rounded transition cursor-pointer hover:border-neutral-400"
            >
              <div className='flex flex-col gap-2'>
                <div className='flex items-center'>
                  <File className='h-5 mr-2' />
                  <h2>Module {module.id}</h2>
                </div>
                <h3 className="text-xl font-semibold">{module.title}</h3>
              </div>
              <Checkbox />
              {/* <Video /> */}
            </div>
          ))}
        </div>
        <div className='relative h-full w-3/4'>
          <h1>Reading Material</h1>
          <div className='absolute bottom-0 flex w-full justify-end gap-x-4'>
            <Button>
              Mark as Completed
            </Button>
            <Button size={'icon'} >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseView