"use client"

import axios from 'axios';
import { ChevronDown, Check, X, BookOpen, Award, Lock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import Loader from '../course/loader';

// ========== Types ==========
interface Problem {
  _id: string;
  serial: number;
  topic: string;
  title: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  problemStatement: string;
  sampleInput1: string;
  sampleOutput1: string;
  sampleInput2: string;
  sampleOutput2: string;
}

interface Section {
  title: string;
  total: number;
  solved: number;
  problems: {
    id?: number;
    name: string;
    difficulty: 'EASY' | 'MEDIUM' | 'HARD';
    link: string;
    solved?: boolean;
  }[];
}

// ========== Helper Functions ==========
const getStylesByDifficulty = (difficulty: string) => {
  const colors = {
    EASY: {
      badge: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
      icon: <span className="w-2 h-2 rounded-full bg-green-500 mr-1.5"></span>
    },
    MEDIUM: {
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
      icon: <span className="w-2 h-2 rounded-full bg-blue-500 mr-1.5"></span>
    },
    HARD: {
      badge: 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-400',
      icon: <span className="w-2 h-2 rounded-full bg-rose-500 mr-1.5"></span>
    },
    DEFAULT: {
      badge: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400',
      icon: null
    }
  };
  
  return colors[difficulty as keyof typeof colors] || colors.DEFAULT;
};

// ========== Main Component ==========
const DSAList = () => {
  const router = useRouter();
  
  // State
  const [sections, setSections] = useState<Section[]>([]);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [stats, setStats] = useState({
    totalSolved: 0,
    totalProblems: 0
  });

  // Filter sections based on search and difficulty
  const filteredSections = sections.map(section => ({
    ...section,
    problems: section.problems.filter(problem => {
      const matchesSearch = problem.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesDifficulty = selectedDifficulty === 'ALL' || problem.difficulty === selectedDifficulty;
      return matchesSearch && matchesDifficulty;
    })
  }));

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:3000/api/code/list", {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const data = response.data;
        const transformedData: Section[] = data.topicsWithProblems.map((topic: any) => {
          const solvedCount = topic.problems.filter((problem: any) => problem.isSolved).length;

          return {
            title: topic.name,
            total: topic.problems.length,
            solved: solvedCount,
            problems: topic.problems.map((problem: Problem & { isSolved?: boolean }) => ({
              id: problem._id,
              name: problem.title,
              difficulty: problem.difficulty,
              link: `/code?problemId=${problem.serial}`,
              solved: problem.isSolved || false,
            })),
          };
        });

        // Calculate overall stats
        let solved = 0;
        let total = 0;
        transformedData.forEach(section => {
          solved += section.solved;
          total += section.total;
        });
        
        setStats({
          totalSolved: solved,
          totalProblems: total
        });
        setSections(transformedData);
        
        // Auto-expand first section if available
        if (transformedData.length > 0) {
          setExpandedSection(transformedData[0].title);
        }
      } catch (err) {
        console.error("Error fetching topics: ", err);
        setError("Failed to load DSA topics. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Event handlers
  const toggleSection = (title: string) => {
    setExpandedSection(expandedSection === title ? null : title);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('ALL');
  };

  // Render components based on state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="flex flex-col items-center">
          <Loader/>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 flex items-start">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
        <div>
          <h3 className="font-medium text-red-800 dark:text-red-300 text-sm">Error Loading Data</h3>
          <p className="text-red-700 dark:text-red-200 mt-1 text-xs">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-2 px-3 py-1 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 rounded-md text-xs font-medium hover:bg-red-200 dark:hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    // Replace the main container div with this:
<div className="col-span-3 bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm flex flex-col h-[calc(100vh-10rem)]">
      {/* Header Section - Compact */}
      <div className="p-3 border-b border-gray-200 dark:border-gray-800">
        <div className="flex flex-col gap-2 mb-2">
          {/* Title and Stats */}
          <div className="flex justify-between items-center">
            <h2 className="text-base font-bold text-gray-800 dark:text-gray-100 flex items-center">
              <BookOpen className="mr-1.5 h-4 w-4 text-indigo-500" />
              DSA Problems
            </h2>
            <div className="flex items-center">
              <Award className="h-3.5 w-3.5 text-indigo-500 mr-1" />
              <span className="text-xs text-gray-600 dark:text-gray-400">
                {stats.totalSolved}/{stats.totalProblems} solved
              </span>
            </div>
          </div>
          
          {/* Search and Filter Controls */}
          <div className="flex gap-2 w-full">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-2 pr-7 py-1.5 w-full text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <X className="h-3 w-3" />
                </button>
              )}
            </div>
            
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="px-2 py-1.5 text-xs bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 transition-all"
            >
              <option value="ALL">All</option>
              <option value="EASY">Easy</option>
              <option value="MEDIUM">Medium</option>
              <option value="HARD">Hard</option>
            </select>
          </div>
        </div>
        
        {/* Overall progress bar */}
        <div className="relative w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${Math.max((stats.totalSolved / stats.totalProblems) * 100, 2)}%` }}
          ></div>
        </div>
      </div>
      
      {/* Problem Content - Scrollable */}
      <div className="p-2 overflow-y-auto flex-1">
        {filteredSections.length > 0 ? (
          filteredSections.map((section) => (
            <div key={section.title} className="mb-2 bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              {/* Section Header - Compact */}
              <div
                className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-800/50 cursor-pointer transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                onClick={() => toggleSection(section.title)}
              >
                <div className="flex items-center gap-x-1.5">
                  <span className="font-medium text-sm text-gray-800 dark:text-gray-100">{section.title}</span>
                  <span className="text-xs bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 px-1.5 py-0.5 rounded-full">
                    {section.problems.length}
                  </span>
                </div>
                <div className="flex items-center gap-x-2">
                  <div className="text-xs px-1.5 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                    {section.solved}/{section.total}
                  </div>
                  <div className={`transition-transform ${expandedSection === section.title ? 'rotate-180' : ''}`}>
                    <ChevronDown className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                  </div>
                </div>
              </div>
              
              {/* Section Content (conditionally rendered) - Compact */}
              {expandedSection === section.title && (
                <div className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                  <div className="p-2">
                    {/* Section Progress Bar */}
                    <div className="relative h-1.5 bg-gray-100 dark:bg-gray-800 rounded-full mb-2">
                      <div
                        className="absolute top-0 left-0 h-full bg-indigo-500 rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.max((section.solved / section.total) * 100, 2)}%`,
                        }}
                      ></div>
                    </div>
                    
                    {/* Problem List or Empty State */}
                    {section.problems.length > 0 ? (
                      <ul className="divide-y divide-gray-100 dark:divide-gray-800">
                        {section.problems.map((problem) => {
                          const { badge, icon } = getStylesByDifficulty(problem.difficulty);
                          
                          return (
                            <li 
                              key={problem.name} 
                              className="py-2 flex flex-row items-center justify-between gap-2 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-md px-2 transition-colors"
                            >
                              <div className="flex items-center gap-x-2 flex-1 min-w-0">
                                <span className={`w-5 h-5 flex-shrink-0 flex items-center justify-center rounded-full ${problem.solved ? 'bg-green-100 dark:bg-green-900/30' : 'bg-gray-100 dark:bg-gray-800'}`}>
                                  {problem.solved ? 
                                    <Check className="h-3 w-3 text-green-500" /> : 
                                    <span className="text-xs text-gray-500">?</span>
                                  }
                                </span>
                                
                                <div 
                                  onClick={() => router.push(`${problem.link}`)} 
                                  className="text-sm text-gray-900 dark:text-gray-100 hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer truncate"
                                >
                                  <span className={problem.solved ? "text-gray-500 dark:text-gray-400" : ""}>
                                    {problem.name}
                                  </span>
                                </div>
                              </div>
                              
                              <span className={`px-2 py-0.5 text-xs font-medium rounded-md flex items-center justify-center flex-shrink-0 ${badge}`}>
                                {icon}
                                {problem.difficulty.charAt(0) + problem.difficulty.slice(1).toLowerCase()}
                              </span>
                            </li>
                          );
                        })}
                        </ul>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-8 px-4 text-gray-400 space-y-2 bg-gray-50 dark:bg-gray-800/30 rounded-lg">
                          {searchQuery || selectedDifficulty !== 'ALL' ? (
                            <>
                              <X className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                              <p className="text-gray-500 dark:text-gray-400 text-center">No problems match your filters.</p>
                              <button 
                                onClick={clearFilters}
                                className="mt-1 text-sm text-indigo-600 dark:text-indigo-400 hover:underline"
                              >
                                Clear filters
                              </button>
                            </>
                          ) : (
                            <>
                              <Lock className="h-8 w-8 text-gray-300 dark:text-gray-600" />
                              <p className="text-gray-500 dark:text-gray-400 text-center">No problems available in this section yet.</p>
                            </>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 px-4 bg-gray-50 dark:bg-gray-800/30 rounded-lg text-center">
              <X className="h-10 w-10 text-gray-300 dark:text-gray-600 mb-3" />
              <h3 className="text-gray-700 dark:text-gray-300 font-medium mb-1">No matching problems found</h3>
              <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your search or filters</p>
              <button 
                onClick={clearFilters}
                className="px-4 py-2 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 rounded-md text-sm font-medium hover:bg-indigo-200 dark:hover:bg-indigo-800/30 transition-colors"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
  
  export default DSAList;
  
