"use client"

import axios from 'axios';
import { ChevronDown, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'

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

// const dropdownSections: Section[] = [
//     {
//       title: 'Arrays & Hashing',
//       total: 9,
//       solved: 0,
//       problems: [
//         { name: 'Contains Duplicate', difficulty: 'Easy', link: '/code' },
//         { name: 'Valid Anagram', difficulty: 'Easy', link: '#' },
//         { name: 'Two Sum', difficulty: 'Easy', link: '#' },
//         { name: 'Group Anagrams', difficulty: 'Medium', link: '#' },
//         { name: 'Top K Frequent Elements', difficulty: 'Medium', link: '#' },
//         { name: 'Encode and Decode Strings', difficulty: 'Medium', link: '#' },
//         { name: 'Product of Array Except Self', difficulty: 'Medium', link: '#' },
//         { name: 'Valid Sudoku', difficulty: 'Medium', link: '#' },
//         { name: 'Longest Consecutive Sequence', difficulty: 'Medium', link: '#' },
//       ],
//     },
//     { title: 'Two Pointers', total: 5, solved: 0, problems: [] },
//     { title: 'Sliding Window', total: 6, solved: 0, problems: [] },
//     { title: 'Stack', total: 7, solved: 0, problems: [] },
//     { title: 'Binary Search', total: 7, solved: 0, problems: [] },
//     { title: 'Linked List', total: 11, solved: 0, problems: [] },
// ];

const DSAList = () => {
    const [dropdownSections, setDropdownSections] = useState<Section[]>([]);
    const [expanded, setExpanded] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const toggleExpand = (title: string) => {
        setExpanded(expanded === title ? null : title);
    };
    const router = useRouter();

    useEffect(() => {
      const fetchTopics = async () => {
        setLoading(true);
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/api/code/list", {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = response.data;
          console.log(data);

          const transformedData: Section[] = data.topicsWithProblems.map((topic: any) => {
            const solvedCount = topic.problems.filter((problem: any) => problem.isSolved).length;

            return {
              title: topic.name,
              total: topic.problems.length,
              solved: solvedCount, // Update with actual solved count if available
              problems: topic.problems.map((problem: Problem & { isSolved?: boolean }) => ({
                id: problem.serial,
                name: problem.title,
                difficulty: problem.difficulty,
                link: `/code?problemId=${problem.serial}`, // Assuming a dynamic route for each problem
                solved: problem.isSolved || false, // Update with actual solved status if available
              })),
          }});

          setDropdownSections(transformedData);
          // Auto-expand first section if available
          if (transformedData.length > 0) {
            setExpanded(transformedData[0].title);
          }
        } catch (error) {
          console.error("Error fetching topics: ", error);
          setError("Failed to load DSA topics. Please try again later.");
        } finally {
          setLoading(false);
        }
      }

      fetchTopics();
    }, []);

    const getDifficultyColor = (difficulty: string) => {
      switch(difficulty) {
        case 'EASY':
          return 'text-green-500';
        case 'MEDIUM':
          return 'text-yellow-500';
        case 'HARD':
          return 'text-red-500';
        default:
          return 'text-blue-500';
      }
    };

    if (loading) {
      return (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4 bg-red-100 dark:bg-red-900 rounded-md text-red-700 dark:text-red-200">
          {error}
        </div>
      );
    }

  return (
    <div className='col-span-2 p-2 md:p-4 rounded-md'>
        {dropdownSections.map((section) => (
          <div key={section.title} className='mb-4'>
            <div
              className='flex justify-between items-center p-3 md:p-4 bg-slate-200 dark:bg-gray-800 rounded-md cursor-pointer hover:bg-slate-300 dark:hover:bg-gray-700 transition-colors'
              onClick={() => toggleExpand(section.title)}
            >
              <div className='flex items-center gap-x-2'>
                <span className='font-semibold text-black dark:text-white text-sm md:text-base'>{section.title}</span>
                <span className='text-xs md:text-sm bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full'>
                  {section.problems.length}
                </span>
              </div>
              <div className='flex items-center gap-x-2 text-gray-600 dark:text-gray-400'>
                <span className='text-xs md:text-sm'>
                  {section.solved} / {section.total}
                </span>
                <div className={`transition-transform ${expanded === section.title ? 'rotate-180' : ''}`}>
                  <ChevronDown className='h-4 w-4 md:h-5 md:w-5'/>
                </div>
              </div>
            </div>
            {expanded === section.title && (
              <div className='mt-2 bg-slate-100 dark:bg-gray-800 rounded-md p-3 md:p-4 shadow-sm'>
                <div className='h-2 bg-gray-200 dark:bg-gray-600 rounded-full mb-4 relative'>
                  <div
                    className='h-full bg-green-500 rounded-full transition-all duration-500'
                    style={{
                      width: `${Math.max((section.solved / section.total) * 100, 5)}%`,
                    }}
                  ></div>
                </div>
                {section.problems.length > 0 ? (
                  <ul className='space-y-2'>
                    {section.problems.map((problem) => (
                      <li key={problem.name} className='flex justify-between items-center p-2 rounded-md hover:bg-slate-200 dark:hover:bg-gray-700 transition-colors'>
                        <div className='flex items-center gap-x-2'>
                          <span className='w-5 h-5 flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700'>
                            {problem.solved ? <Check className='h-3 w-3 text-green-500' /> : <span className='text-xs text-gray-500'>?</span>}
                          </span>
                          <div 
                            onClick={() => router.push(`${problem.link}`)} 
                            className='text-black dark:text-[#e1e1e1] hover:underline cursor-pointer text-sm md:text-base truncate max-w-32 md:max-w-xs'
                          >
                            {problem.name}
                          </div>
                        </div>
                        <span
                          className={`px-2 py-1 md:px-3 md:py-1 text-xs md:text-sm rounded-md bg-[#121417] ${getDifficultyColor(problem.difficulty)}`}
                        >
                          {problem.difficulty}
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className='flex flex-col items-center justify-center p-6 text-gray-400 space-y-2'>
                    <X className='h-8 w-8 text-gray-300' />
                    <p className='text-gray-400 text-sm md:text-base'>No problems available yet.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
  )
}

export default DSAList