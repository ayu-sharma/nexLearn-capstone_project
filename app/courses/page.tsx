"use client"

import React, { useEffect, useState } from "react";
import { ChevronDown, ChevronLeft, ChevronUp, Clock, Star, Video } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseNav from "@/components/custom/course/course-nav";
import axios from "axios";
import Header from "@/components/custom/course/header";
import VideoPlayer from "@/components/custom/course/video-player";
import ReadingContent from "@/components/custom/course/reading-content";

interface Material {
  id: string;
  title: string;
  type: string;
  videoUrl: string | null;
  content: string | null;
  moduleId: string;
}

interface Module {
  id: string;
  title: string;
  index: number;
  courseId: string;
  materials: Material[];
}

interface Course {
  id: string;
  title: string;
  type: string;
  goal: string;
  description: string;
  modules: Module[];
}

export default function courses() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(null);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  const searchParams = useSearchParams();

  const toggleModule = (index: number) => {
    setOpenModuleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const courseId = searchParams.get("cId");

    if (courseId) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/courses/${courseId}`);
          const courseDetails = response.data.course;
          setCourse(courseDetails);
        } catch (error) {
          console.error("Failed to fetch course:", error);
        }
      }

      fetchCourse();
    } else {
      console.error("Course ID is missing");
    }
  }, [searchParams, router]);

  const handleBack = () => {
    router.push('/home');
  }

  const handleMaterialClick = (material: Material) => {
    setCurrentMaterial(material);
    if (material.type === "ASSESSMENT") {
      router.push(`/assessment?materialId=${material.id}`);
    }
  };

  const handleNextMaterial = () => {
    if (!course || !currentMaterial) return;

    const currentModuleIndex = course.modules.findIndex((module) => module.materials.some((material) => material.id === currentMaterial.id));

    if (currentModuleIndex === -1) return;

    const currentModule = course.modules[currentModuleIndex];
    const currentMaterialIndex = currentModule.materials.findIndex((material) => material.id === currentMaterial.id);

    if (currentMaterialIndex === -1) return;

    if (currentMaterialIndex < currentModule.materials.length - 1) {
      const nextMaterial = currentModule.materials[currentMaterialIndex + 1];
      handleMaterialClick(nextMaterial);
    } else if (currentModuleIndex < course.modules.length - 1) {
      const nextModule = course.modules[currentModuleIndex + 1];
      if (nextModule.materials.length > 0) {
        const nextMaterial = nextModule.materials[0];
        handleMaterialClick(nextMaterial);
      }
    }
  }
  return (
    <>
      <CourseNav />
      <div className="flex justify-between w-full py-6 px-5 gap-3">
        <div className="flex flex-col gap-5">
          <Header handleBack={handleBack} course={course} />
          {currentMaterial?.type === "VIDEO" && currentMaterial.videoUrl && (
            <VideoPlayer videoUrl={currentMaterial.videoUrl}/>
          )}
          {currentMaterial?.type === "READING" && currentMaterial.content && (
            <ReadingContent content={currentMaterial.content}/>
          )}
          <div className="mt-5">
            {currentMaterial && (
              <button
                onClick={handleNextMaterial}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Next Material
              </button>
            )}
          </div>
        </div>
        <div className="flex flex-col mt-16 dark:bg-neutral-800 rounded-xl py-3 max-w-md dark:border-neutral-700 border w-full h-[80vh] overflow-y-auto">
        <div className="font-semibold pb-3 px-4 space-y-3">
          {course?.modules.map((module: any, index: number) => (
            <div key={index} className="border-b dark:border-neutral-700 border-neutral-200">
              <button
                onClick={() => toggleModule(index)}
                className="w-full text-left font-medium py-2 px-3 flex justify-between items-center"
              >
                <span>
                  {module.index}. {module.title}
                </span>
                <span>{openModuleIndex === index ? (
                  <ChevronUp />
                ) : (
                  <ChevronDown />
                )}</span>
              </button>
              {openModuleIndex === index && (
                <div className="pl-6 pr-3 py-4 space-y-3">
                  {module.materials.map((material: any, matIndex: number) => (
                    <button
                      key={matIndex}
                      onClick={() => handleMaterialClick(material)}
                      className="w-full text-left text-sm text-[#7981FF]  hover:underline"
                    >
                      {material.title}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      </div>
    </>
  );
}