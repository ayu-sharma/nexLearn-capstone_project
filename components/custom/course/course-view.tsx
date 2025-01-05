"use client";

import React, { useEffect, useState } from 'react';
import CourseGrid from './course-grid';
import { useRouter } from 'next/navigation';


const CourseView = () => {
  const router = useRouter();
  const handleCourseSelect = async (courseId: string) => {
    router.push(`/courses?cId=${courseId}`);
  };

  return (
    <div>
      <CourseGrid onCourseSelect={handleCourseSelect}/>
    </div>
  );
};

export default CourseView;
