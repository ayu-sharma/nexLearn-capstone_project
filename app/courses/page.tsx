"use client"

import React, { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Star, Video } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseNav from "@/components/custom/course/course-nav";
import axios from "axios";
import Header from "@/components/custom/course/header";
import VideoPlayer from "@/components/custom/course/video-player";
import ReadingContent from "@/components/custom/course/reading-content";
import AssessmentStart from "@/components/custom/course/assessment-start";
import { Button } from "@/components/ui/button";
import { headers } from "next/headers";

interface Question {
  _id: string;
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  }
  correctAnswer: string;
}


interface Material {
  _id: string;
  title: string;
  type: string;
  videoUrl: string | null;
  textContent: string | null;
  moduleId: string;
  assessment: Question[] | [];
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
  const [completedMaterials, setCompletedMaterials] = useState<string[]>([]);
  const searchParams = useSearchParams();

  const toggleModule = (index: number) => {
    setOpenModuleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  useEffect(() => {
    const courseId = searchParams.get("cId");
    const token = localStorage.getItem("token");
    if (courseId) {
      const fetchCourse = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/courses/fetch/${courseId}`);
          const courseDetails = response.data.myCourse[0];
          console.log(courseDetails);
          setCourse(courseDetails);

          const completedRes = await axios.get(`http://localhost:3000/api/courses/completed/${courseId}`,
            {headers: {
              Authorization: `Bearer ${token}`
            }}
          );
          console.log(completedRes);

          setCompletedMaterials(completedRes.data.completedMaterials);
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
  };

  const handleNextMaterial = () => {
    if (!course || !currentMaterial) return;

    const currentModuleIndex = course.modules.findIndex((module) => module.materials.some((material) => material._id === currentMaterial._id));

    if (currentModuleIndex === -1) return;

    const currentModule = course.modules[currentModuleIndex];
    const currentMaterialIndex = currentModule.materials.findIndex((material) => material._id === currentMaterial._id);

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

  const handleMarkAsCompleted = async () => {
    if (!currentMaterial || !course) return;
    const token = localStorage.getItem("token");
    const courseId = searchParams.get("cId");
    try {
      await axios.post(`/api/courses/toggle`, {
        courseId: courseId,
        materialId: currentMaterial._id
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setCompletedMaterials((prev) => [...prev, currentMaterial._id]);
    } catch (error) {
      console.error("Failed to mark as completed:", error);
    }
  };
  return (
    <>
      <CourseNav />
      <div className="flex justify-between w-full py-6 px-5 gap-3">
        <div className="flex flex-col gap-5">
          <Header handleBack={handleBack} course={course} />
          {currentMaterial?.type === "VIDEO" && currentMaterial.videoUrl && (
            <VideoPlayer videoUrl={currentMaterial.videoUrl}/>
          )}
          {currentMaterial?.type === "READING" && currentMaterial.textContent && (
            <ReadingContent content={currentMaterial.textContent}/>
          )}
          {currentMaterial?.type === "ASSESSMENT" && (
            <AssessmentStart materialId={currentMaterial._id} title={currentMaterial.title} questions={currentMaterial.assessment.length}/>
          )}
          <div className="mt-5">
            {currentMaterial && (
              <div className="mt-5 flex gap-4">
              <Button variant="outline" onClick={handleNextMaterial}>
                Next
              </Button>
              <Button variant="default" onClick={handleMarkAsCompleted}>
                Mark as Completed
              </Button>
            </div>
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
                      {completedMaterials.includes(material._id) && (
                        <CheckCircle className="text-green-500 w-4 h-4" />
                      )}
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