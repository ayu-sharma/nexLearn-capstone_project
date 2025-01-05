"use client";

import React, { useEffect, useState } from 'react';
import CourseGrid from './course-grid';


const CourseView = () => {
  const handleCourseSelect = async (courseId: string) => {
    const cId = courseId;
    localStorage.setItem("cId", cId);
    // router push courses
  }

  return (
    <div>
      <CourseGrid onCourseSelect={handleCourseSelect}/>
    </div>
  );
};

export default CourseView;
