import axios from "axios";
import { ArrowRight, BookA, Code, DraftingCompass, Clock } from "lucide-react";
import React, { useEffect, useState } from "react";

interface LibraryGridProps {
  searchTerm: string;
  filter: string;
  onCourseSelect: (courseId: string) => void;
}

const LibraryGrid = ({
  searchTerm,
  filter,
  onCourseSelect,
}: LibraryGridProps) => {
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/courses/all");
        setCourses(response.data.courses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "All" || course.type.toUpperCase() === filter.toUpperCase();
    return matchesFilter && matchesSearch;
  });

  if (loading) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 9 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    );
  }

  if (filteredCourses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <Clock className="h-16 w-16 text-gray-400 mb-4" />
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300">No courses found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course) => (
        <CourseCard
          key={course.id}
          id={course.id}
          title={course.title}
          description={course.description}
          type={course.type}
          onClick={() => onCourseSelect(course.id)}
        />
      ))}
    </div>
  );
};

export default LibraryGrid;

interface CourseCardProps {
  id: string;
  title: string;
  description: string;
  type: string;
  onClick: () => void;
}

const CourseCard = ({
  id,
  title,
  description,
  type,
  onClick,
}: CourseCardProps) => {
  const getTypeColor = () => {
    switch (type.toUpperCase()) {
      case "CODING":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400";
      case "APTITUDE":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400";
      case "LANGUAGE":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-[#7981FF]/20 text-[#7981FF]";
    }
  };

  const renderLogo = () => {
    switch (type.toUpperCase()) {
      case "CODING":
        return <Code className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case "APTITUDE":
        return <DraftingCompass className="h-5 w-5 text-amber-600 dark:text-amber-400" />;
      case "LANGUAGE":
        return <BookA className="h-5 w-5 text-green-600 dark:text-green-400" />;
      default:
        return <Code className="h-5 w-5 text-[#7981FF]" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className="group bg-white dark:bg-gray-800 transition-all duration-300 cursor-pointer rounded-xl shadow-sm hover:shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden flex flex-col justify-between"
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700">
            {renderLogo()}
          </div>
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white truncate">
            {title}
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-300 line-clamp-3 mb-6 text-sm h-14">
          {description}
        </p>
        <div className="flex items-center justify-between">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getTypeColor()}`}>
            {type}
          </span>
          <span className="text-[#7981FF] group-hover:translate-x-1 transform transition-transform duration-300">
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
      </div>
      <div className="h-1 w-full bg-gradient-to-r from-[#7981FF] to-[#6A74FF] transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
    </div>
  );
};

const SkeletonCard = () => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden p-6">
      <div className="animate-pulse">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-9 h-9 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-2/3"></div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
        </div>
        <div className="flex items-center justify-between">
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="h-5 w-5 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};