"use client";

import React, { useEffect, useState } from 'react';
import CourseGrid from './course-grid';

const CourseView = () => {

  return (
    // <div className="flex flex-col gap-y-6 p-4">
    //   {/* Course Header */}
    //   {/* <CourseHeader title={course.title} type={course.type} description={course.description} /> */}

    //   {/* Course Modules and Content */}
    //   <div className="flex gap-6 h-[75vh]">
    //     {/* Module List */}
    //     {/* <ModuleListView modules={course.modules} selectedModuleId={selectedModule?.id} onModuleClick={handleModuleClick} onToggleComplete={toggleModuleCompletion} /> */}

    //     {/* Module Content */}
    //     {/* <ModuleContent selectedModule={selectedModule} loading={loadingModule} toggleModuleCompletion={toggleModuleCompletion} /> */}
    //   </div>
    // </div>
    <div>
      <CourseGrid onCourseSelect={() => {}}/>
    </div>
  );
};

export default CourseView;
