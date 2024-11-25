"use client";

import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import axios from 'axios';
import { BookA, ChevronRight, Code, DraftingCompass, File } from 'lucide-react';
import React, { useEffect, useState } from 'react';

// Define interfaces for type safety
interface CourseViewProps {
  courseId: string | null;
}

interface ModuleListItem {
  id: number;
  title: string;
  completed: boolean;
}

interface ModuleDetail {
  id: number;
  title: string;
  completed: boolean;
  content: Content | null;
  videoUrl: string | null;
  courseId: number;
}

interface Content {
  heading: string;
  subhead1: string;
  subhead2?: string;
  paragraph1: string;
  paragraph2?: string;
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
  modules: ModuleListItem[];
}

const CourseView = ({ courseId }: CourseViewProps) => {
  const [course, setCourse] = useState<Course | null>(null);
  const [selectedModule, setSelectedModule] = useState<ModuleDetail | null>(null);
  const [loadingCourse, setLoadingCourse] = useState<boolean>(true);
  const [loadingModule, setLoadingModule] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

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

  // Render the appropriate logo based on course type
  const renderLogo = () => {
    switch (course?.type) {
      case "CODING":
        return <Code className="mr-2" />;
      case "APTITUDE":
        return <DraftingCompass className="mr-2" />;
      case "LANGUAGE":
        return <BookA className="mr-2" />;
      default:
        return <File className="mr-2" />;
    }
  };

  if (!courseId) {
    return <div className="text-center text-red-500">No course selected</div>;
  }

  if (loadingCourse) {
    return <div className="text-center">Loading course details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!course) {
    return <div className="text-center">Course not found.</div>;
  }

  return (
    <div className="flex flex-col gap-y-6 p-4">
      {/* Course Header */}
      <div className="flex flex-col gap-y-2">
        <div className="flex items-center">
          {renderLogo()}
          <h1 className="text-2xl font-medium">{course.title}</h1>
        </div>
        <p className="font-light">{course.description}</p>
      </div>

      {/* Course Modules and Content */}
      <div className="flex gap-6 h-[75vh]">
        {/* Module List */}
        <div className="flex flex-col gap-6 w-1/4 overflow-y-auto">
          {course.modules.map((module) => (
            <div
              key={module.id}
              className={`flex justify-between items-center p-4 border rounded transition cursor-pointer hover:border-neutral-400 ${
                selectedModule?.id === module.id ? "dark:bg-indigo-950 bg-indigo-200" : ""
              }`}
              onClick={() => handleModuleClick(module.id)}
            >
              <div className="flex flex-col gap-2">
                <div className="flex items-center">
                  <File className="h-5 mr-2" />
                  <h2>Module {module.id}</h2>
                </div>
                <h3 className="text-xl font-semibold">{module.title}</h3>
              </div>
              <Checkbox 
                checked={module?.completed === true}
                onChange={() => toggleModuleCompletion(module.id, module.completed)}
              />
            </div>
          ))}
        </div>

        {/* Module Content */}
        <div className="relative h-full w-3/4 p-4 border rounded overflow-y-auto">
          {loadingModule ? (
            <div className="text-center">Loading module content...</div>
          ) : selectedModule ? (
            <>
              <h1 className="text-2xl font-bold mb-4">{selectedModule.title}</h1>
              {selectedModule.content ? (
                <div className="space-y-4">
                  <h2 className="text-xl font-semibold">{selectedModule.content.heading}</h2>
                  <h3 className="text-lg font-medium">{selectedModule.content.subhead1}</h3>
                  {selectedModule.content.subhead2 && (
                    <h4 className="text-md font-medium">{selectedModule.content.subhead2}</h4>
                  )}
                  <p className="text-base">{selectedModule.content.paragraph1}</p>
                  {selectedModule.content.paragraph2 && (
                    <p className="text-base">{selectedModule.content.paragraph2}</p>
                  )}
                </div>
              ) : selectedModule.videoUrl ? (
                <div className="mt-4">
                  <video controls className="w-full">
                    <source src={selectedModule.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <div>No content available for this module.</div>
              )}
            </>
          ) : (
            <div className="text-center">Select a module to view its content.</div>
          )}

          {/* Footer Buttons */}
          <div className="absolute bottom-4 right-4 flex gap-x-4">
            <Button
              onClick={async () => {
                if (selectedModule) {
                  // Trigger toggle on the Mark as Completed button click
                  toggleModuleCompletion(selectedModule.id, selectedModule.completed);
                }
              }}
            >
              {selectedModule?.completed ? 'Module Complete' : 'Mark as Completed'}
              
            </Button>
            <Button size="icon">
              <ChevronRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseView;
