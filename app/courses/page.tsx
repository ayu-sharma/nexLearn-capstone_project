"use client"

import React, { useEffect, useState } from "react";
import { ChevronLeft, Clock, Star, Video } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import CourseNav from "@/components/custom/course/course-nav";
import axios from "axios";

interface Module {
  id: string;
  title: string;
  index: number;
  courseId: string;
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
  const searchParams = useSearchParams();
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
  return (
    <>
      <CourseNav />
      <div className="flex justify-between w-full py-6 px-5 gap-3">
        <div className="flex flex-col gap-5">
          <div className="">
            <div className="flex items-center gap-3">
              {/* Back Button */}
              <div onClick={() => router.push('/home')} className="p-2 bg-[#fefefd] dark:bg-neutral-800 border border-[#e8e9ef] dark:border-neutral-700 rounded-xl hover:opacity-80 cursor-pointer transition">
                <ChevronLeft />
              </div>
              <p className="text-lg font-semibold">{course?.title}</p>
              <p className="text-sm font-medium bg-[#7981FF]/20 text-[#7981FF] px-4 py-1 rounded uppercase">
                {course?.type}
              </p>
            </div>
            <div className="flex ml-12 items-center stroke-1 gap-4">
              <div className="flex gap-2 items-center">
                <Video className=" text-[#7981FF]" size={15} />
                <p className="text-xs dark:text-slate-400">{course?.modules.length} Modules</p>
              </div>
              <div className="flex gap-2 items-center">
                <Clock className=" text-[#7981FF]" size={15} />
                <p className="text-xs dark:text-slate-400">10h 48 min</p>
              </div>
              <div className="flex gap-2 items-center">
                <Star className=" text-[#7981FF]" size={15} />
                <p className="text-xs dark:text-slate-400">4.1 Ratings</p>
              </div>
            </div>
          </div>
          <div className="">
            <video width="750" height="500" controls className="rounded-2xl">
              {/* <source src="./Videos/video1.mp4" type="video/mp4" /> */}
            </video>
          </div>
          {/* ABOUT SECTION -> DISABLED FOR NOW */}
          {/* <div className="px-2 py-3 bg-[#fafcfd] rounded-lg border border-[#e8e9ef]"></div> */}
        </div>
        <div className="flex flex-col mt-16 dark:bg-neutral-800 rounded-xl py-3 max-w-md dark:border-neutral-700 border w-full h-[80vh]">
          <div className="font-semibold pb-3 px-4">
              {course?.modules.map((module) => (
                <div>{module.title}</div>
              ))}
          </div>
          <div className="border w-full p-0 "></div>
          
        </div>
      </div>
    </>
  );
}