"use client"

import React, { useEffect, useState } from "react";
import { CheckCircle, ChevronDown, ChevronLeft, ChevronRight, ChevronUp, Clock, Star, Video, BookOpen, FileText } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseNav from "@/components/custom/course/course-nav";
import axios from "axios";
import Header from "@/components/custom/course/header";
import VideoPlayer from "@/components/custom/course/video-player";
import ReadingContent from "@/components/custom/course/reading-content";
import AssessmentStart from "@/components/custom/course/assessment-start";
import { Button } from "@/components/ui/button";

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

export default function Courses() {
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [openModuleIndex, setOpenModuleIndex] = useState<number | null>(null);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  const [completedMaterials, setCompletedMaterials] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);
  const searchParams = useSearchParams();

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Auto-close sidebar on small screens
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    // Set initial state
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleModule = (index: number) => {
    setOpenModuleIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // Calculate progress
  const calculateProgress = () => {
    if (!course) return 0;
    const totalMaterials = course.modules.reduce((total, module) => total + module.materials.length, 0);
    return totalMaterials > 0 ? (completedMaterials.length / totalMaterials) * 100 : 0;
  };

  useEffect(() => {
    const courseId = searchParams.get("cId");
    const token = localStorage.getItem("token");
    if (courseId) {
      const fetchCourse = async () => {
        setLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/courses/fetch/${courseId}`);
          const courseDetails = response.data.myCourse[0];
          setCourse(courseDetails);

          // Auto-open first module
          if (courseDetails?.modules?.length > 0) {
            setOpenModuleIndex(0);
          }

          const completedRes = await axios.get(`http://localhost:3000/api/courses/completed/${courseId}`,
            {headers: {
              Authorization: `Bearer ${token}`
            }}
          );

          setCompletedMaterials(completedRes.data.completedMaterials);
          
          // If no material is selected, select the first incomplete material
          if (courseDetails?.modules?.length > 0) {
            const allMaterials: Material[] = courseDetails.modules.flatMap((module: Module) => module.materials);
            const firstIncompleteMaterial = allMaterials.find((material: Material) => 
              !completedRes.data.completedMaterials.includes(material._id)
            );
            setCurrentMaterial(firstIncompleteMaterial || allMaterials[0]);
          }
          
        } catch (error) {
          console.error("Failed to fetch course:", error);
        } finally {
          setLoading(false);
        }
      }

      fetchCourse();
    } else {
      console.error("Course ID is missing");
      setLoading(false);
    }
  }, [searchParams, router]);

  const handleBack = () => {
    router.push('/home');
  }

  const handleMaterialClick = (material: Material) => {
    setCurrentMaterial(material);
    // On mobile, close the sidebar after selecting a material
    if (windowWidth < 768) {
      setSidebarOpen(false);
    }
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
      setOpenModuleIndex(currentModuleIndex + 1);
      if (nextModule.materials.length > 0) {
        const nextMaterial = nextModule.materials[0];
        handleMaterialClick(nextMaterial);
      }
    }
  }

  const handlePrevMaterial = () => {
    if (!course || !currentMaterial) return;

    const currentModuleIndex = course.modules.findIndex((module) => module.materials.some((material) => material._id === currentMaterial._id));

    if (currentModuleIndex === -1) return;

    const currentModule = course.modules[currentModuleIndex];
    const currentMaterialIndex = currentModule.materials.findIndex((material) => material._id === currentMaterial._id);

    if (currentMaterialIndex === -1) return;

    if (currentMaterialIndex > 0) {
      const prevMaterial = currentModule.materials[currentMaterialIndex - 1];
      handleMaterialClick(prevMaterial);
    } else if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1];
      setOpenModuleIndex(currentModuleIndex - 1);
      if (prevModule.materials.length > 0) {
        const prevMaterial = prevModule.materials[prevModule.materials.length - 1];
        handleMaterialClick(prevMaterial);
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

      if (!completedMaterials.includes(currentMaterial._id)) {
        setCompletedMaterials((prev) => [...prev, currentMaterial._id]);
      }
      
      // Auto-navigate to next material
      handleNextMaterial();
      
    } catch (error) {
      console.error("Failed to mark as completed:", error);
    }
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'VIDEO':
        return <Video className="w-4 h-4 mr-2" />;
      case 'READING':
        return <BookOpen className="w-4 h-4 mr-2" />;
      case 'ASSESSMENT':
        return <FileText className="w-4 h-4 mr-2" />;
      default:
        return null;
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  if (loading) {
    return (
      <>
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row w-full h-[calc(100vh-4rem)] overflow-hidden">
        {/* Sidebar toggle button - visible on all screens */}
        <button 
          className="fixed bottom-4 right-4 z-50 bg-primary text-white p-2 rounded-full shadow-lg flex items-center justify-center"
          onClick={toggleSidebar}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
        >
          {sidebarOpen ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>

        {/* Sidebar - responsive with overlay on small screens */}
        <div 
          className={`${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
          } fixed md:relative z-40 md:z-auto w-full max-w-xs md:max-w-none md:w-1/4 lg:w-1/5 h-full overflow-y-auto flex-shrink-0 border-r dark:border-neutral-700 border-neutral-200 transition-transform duration-300 bg-background md:bg-transparent shadow-lg md:shadow-none`}
        >
          <div className="p-4 sticky top-0 bg-background z-10 border-b dark:border-neutral-700 flex items-center justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4" />
                <span className="text-sm font-medium">Your Progress</span>
              </div>
              {/* Custom progress bar */}
              <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-primary rounded-full" 
                  style={{ width: `${calculateProgress()}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span>{completedMaterials.length} completed</span>
                <span>{Math.round(calculateProgress())}%</span>
              </div>
            </div>
            {/* Close button visible only on mobile */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-muted/50"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          
          <div className="p-4">
            <h2 className="text-lg font-bold mb-4">Course Content</h2>
            {course?.modules.map((module, index) => (
              <div key={index} className="mb-4 border dark:border-neutral-700 border-neutral-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleModule(index)}
                  className="w-full text-left font-medium py-3 px-4 flex justify-between items-center bg-muted/30 hover:bg-muted/50 transition-colors"
                >
                  <span className="flex items-center truncate pr-2">
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-primary/10 text-primary text-sm mr-2 flex-shrink-0">
                      {module.index}
                    </span>
                    <span className="truncate">{module.title}</span>
                  </span>
                  <span className="flex-shrink-0">{openModuleIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}</span>
                </button>
                {openModuleIndex === index && (
                  <div className="px-4 py-2 space-y-2">
                    {module.materials.map((material, matIndex) => (
                      <button
                        key={matIndex}
                        onClick={() => handleMaterialClick(material)}
                        className={`w-full text-left py-2 px-3 text-sm rounded-md flex items-center ${
                          currentMaterial?._id === material._id 
                            ? 'bg-primary/10 text-primary font-medium' 
                            : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="flex items-center mr-2 flex-shrink-0">
                          {getMaterialIcon(material.type)}
                          {completedMaterials.includes(material._id) ? (
                            <CheckCircle className="text-green-500 w-4 h-4 flex-shrink-0" />
                          ) : (
                            <div className="w-4 h-4 rounded-full border border-neutral-300 dark:border-neutral-600 flex-shrink-0"></div>
                          )}
                        </div>
                        <span className="truncate">{material.title}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Overlay for mobile to close sidebar when clicking outside */}
        {sidebarOpen && windowWidth < 768 && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-30"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Main content */}
        <div className={`flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 transition-all duration-300 ${sidebarOpen && windowWidth < 768 ? 'opacity-30 md:opacity-100' : 'opacity-100'}`}>
          <Header handleBack={handleBack} course={course} />
          
          {currentMaterial && (
            <div className="my-6">
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <h2 className="text-xl font-bold break-words">{currentMaterial.title}</h2>
                {/* Custom badge */}
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-muted/50 text-foreground border border-neutral-200 dark:border-neutral-700 ml-2">
                  {currentMaterial.type === "VIDEO" && "Video Lesson"}
                  {currentMaterial.type === "READING" && "Reading Material"}
                  {currentMaterial.type === "ASSESSMENT" && "Assessment"}
                </span>
              </div>
              {/* Custom separator */}
              <div className="h-px w-full bg-neutral-200 dark:bg-neutral-700 my-4"></div>
              
              <div className="mt-6 mb-8">
                {currentMaterial.type === "VIDEO" && currentMaterial.videoUrl && (
                  <div className="rounded-xl overflow-hidden">
                    <div className="aspect-video w-full">
                      <VideoPlayer videoUrl={currentMaterial.videoUrl} />
                    </div>
                  </div>
                )}
                {currentMaterial.type === "READING" && currentMaterial.textContent && (
                  <div className="prose dark:prose-invert max-w-none prose-img:mx-auto prose-img:rounded-xl prose-img:max-w-full">
                    <ReadingContent title={currentMaterial.title} content={currentMaterial.textContent} />
                  </div>
                )}
                {currentMaterial.type === "ASSESSMENT" && (
                  <div className="bg-muted/20 p-4 sm:p-6 rounded-xl border dark:border-neutral-700">
                    <AssessmentStart 
                      materialId={currentMaterial._id} 
                      title={currentMaterial.title} 
                      questions={currentMaterial.assessment.length} 
                    />
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-3 sm:gap-4 mt-8 mb-16 justify-between">
                <div className="flex flex-wrap gap-2 sm:gap-4">
                  <Button 
                    variant="outline" 
                    onClick={handlePrevMaterial}
                    className="flex items-center gap-1 px-3 sm:px-4 text-sm"
                    size="sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span className="sm:inline">Previous</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={handleNextMaterial}
                    className="flex items-center gap-1 px-3 sm:px-4 text-sm"
                    size="sm"
                  >
                    <span className="sm:inline">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
                <Button 
                  variant={completedMaterials.includes(currentMaterial._id) ? "secondary" : "default"}
                  onClick={handleMarkAsCompleted}
                  className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 text-sm whitespace-nowrap"
                  size="sm"
                >
                  <CheckCircle className="w-4 h-4" />
                  {completedMaterials.includes(currentMaterial._id) ? (
                    <span>Completed</span>
                  ) : (
                    <span className="hidden xs:inline sm:inline">Mark as Completed</span>
                  )}
                </Button>
              </div>
            </div>
          )}
          
          {!currentMaterial && course && (
            <div className="flex flex-col items-center justify-center min-h-[50vh] p-4 sm:p-8 text-center">
              <div className="bg-muted/20 p-4 sm:p-8 rounded-xl border dark:border-neutral-700 w-full max-w-lg">
                <h2 className="text-xl font-bold mb-4">Welcome to {course.title}</h2>
                <p className="mb-6 text-muted-foreground">{course.description}</p>
                <p className="font-medium mb-8">Select a lesson from the sidebar to begin your learning journey.</p>
                <Button onClick={() => {
                  setSidebarOpen(true);
                  if (course.modules.length > 0 && course.modules[0].materials.length > 0) {
                    handleMaterialClick(course.modules[0].materials[0]);
                  }
                }}>
                  Start Course
                </Button>
              </div> 
            </div>
          )}
          
          {!course && !loading && (
            <div className="flex flex-col items-center justify-center min-h-[50vh]">
              <h2 className="text-xl font-bold mb-4">Course not found</h2>
              <p className="mb-6 text-muted-foreground">The course you're looking for doesn't exist or you don't have access to it.</p>
              <Button onClick={handleBack}>
                Back to Home
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}