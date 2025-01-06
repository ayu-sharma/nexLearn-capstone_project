import { Button } from '@/components/ui/button';
import { ChevronLeft, Clock, Star, Video } from 'lucide-react';
import React from 'react'

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

interface HeaderProps {
    course: Course | null;
    handleBack: () => void;
  }

const Header = ({ course, handleBack }: HeaderProps) => {
  return (
    <div className="">
      <div className="flex items-center gap-3">
        {/* Back Button */}
        <Button size={'icon'} variant={'outline'} onClick={handleBack}>
          <ChevronLeft />
        </Button>
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
  )
}

export default Header