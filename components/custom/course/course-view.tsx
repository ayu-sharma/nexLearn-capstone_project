"use client";

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CourseHeader from './course-header';
import { Course, CourseViewProps, ModuleDetail } from './types';
import ModuleListView from './module-list';
import ModuleContent from './module-content';
import Loader from './loader';
import ErrorMessage from './error-msg';

const CourseView = ({ initialCourseId }: CourseViewProps) => {
  const [courseId, setCourseId] = useState<string | null>(initialCourseId);
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null);
  const [loadingCourse, setLoadingCourse] = useState<boolean>(true);
  const [loadingModule, setLoadingModule] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Read courseId from localStorage on component mount
  useEffect(() => {
    const storedCourseId = localStorage.getItem('cId');
    if (storedCourseId && !courseId) {
      setCourseId(storedCourseId);
    }
  }, []);

  // Update localStorage whenever courseId changes
  useEffect(() => {
    if (courseId) {
      localStorage.setItem('cId', courseId);
    }
  }, [courseId]);

  // Fetch course data
  useEffect(() => {
    const fetchCourse = async () => {
      if (!courseId) return;

      setLoadingCourse(true);
      setError(null);

      try {
        const response = await axios.get(`http://localhost:3000/api/courses/${courseId}`);
        setCourse(response.data);
      } catch (err) {
        console.error('Error fetching course:', err);
        setError('Failed to fetch course details.');
      } finally {
        setLoadingCourse(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Fetch module details
  const fetchModuleDetails = async (moduleId: number) => {
    if (!courseId) return;

    setLoadingModule(true);
    setError(null);

    try {
      const response = await axios.get(`http://localhost:3000/api/modules/${moduleId}`);
      setSelectedModule(response.data.module);
    } catch (err) {
      console.error('Error fetching module details:', err);
      setError('Failed to fetch module details.');
    } finally {
      setLoadingModule(false);
    }
  };

  // Select the first module by default once the course is loaded
  useEffect(() => {
    if (course && course.modules.length > 0) {
      const firstModuleId = course.modules[0].id;
      fetchModuleDetails(firstModuleId);
    }
  }, [course]);

  // Handle module selection
  const handleModuleClick = (moduleId: number) => {
    fetchModuleDetails(moduleId);
  };

  const toggleModuleCompletion = async (moduleId: number, currentStatus: boolean) => {
    if (!courseId) return;

    try {
      // Send PATCH request to toggle the completion status
      const updatedStatus = !currentStatus;
      await axios.patch(`http://localhost:3000/api/modules/${moduleId}`, {
        completed: updatedStatus,
      });

      // Update the local state to reflect the change
      setCourse((prevCourse) => {
        if (!prevCourse) return null;

        return {
          ...prevCourse,
          modules: prevCourse.modules.map((module) =>
            module.id === moduleId ? { ...module, completed: updatedStatus } : module
          ),
        };
      });

      // Optionally update the selected module if it's the currently viewed one
      if (selectedModule?.id === moduleId) {
        setSelectedModule({ ...selectedModule, completed: updatedStatus });
      }
    } catch (err) {
      console.error("Error toggling module completion:", err);
      alert("Failed to update module status.");
    }
  };

  const handleFind = () => {
    localStorage.setItem("selectedGroup", "Library");
    window.location.reload();
  }

  if (!courseId) {
    return <div className="text-center text-red-500">No course selected</div>;
  }

  if (loadingCourse) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage handleFind={handleFind}/>
  }

  if (!course) {
    return <div className="text-center">Course not found.</div>;
  }

  return (
    <div className="flex flex-col gap-y-6 p-4">
      {/* Course Header */}
      <CourseHeader title={course.title} type={course.type} description={course.description} />

      {/* Course Modules and Content */}
      <div className="flex gap-6 h-[75vh]">
        {/* Module List */}
        <ModuleListView modules={course.modules} selectedModuleId={selectedModule?.id} onModuleClick={handleModuleClick} onToggleComplete={toggleModuleCompletion} />

        {/* Module Content */}
        <ModuleContent selectedModule={selectedModule} loading={loadingModule} toggleModuleCompletion={toggleModuleCompletion} />
      </div>
    </div>
  );
};

export default CourseView;
