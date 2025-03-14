"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SolvedGrid = () => {
  const [totalSolved, setTotalSolved] = useState(0);
  const [easySolved, setEasySolved] = useState(0);
  const [mediumSolved, setMediumSolved] = useState(0);
  const [hardSolved, setHardSolved] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserDSAStats = async () => {
      setLoading(true);
      const token = localStorage.getItem("token");
      try {
        const response = await axios.get("http://localhost:3000/api/user/stats", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const solved = response.data;
        setTotalSolved(solved.totalSolved);
        setEasySolved(solved.easySolved);
        setMediumSolved(solved.mediumSolved);
        setHardSolved(solved.hardSolved);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDSAStats();
  }, []);

  // Calculate percentages for progress bars
  const easyPercentage = Math.min(100, (easySolved / 28) * 100);
  const mediumPercentage = Math.min(100, (mediumSolved / 100) * 100);
  const hardPercentage = Math.min(100, (hardSolved / 21) * 100);
  const totalPercentage = Math.min(100, (totalSolved / 150) * 100);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-pulse text-indigo-500">Loading your progress...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full h-full max-h-screen overflow-y-auto p-2 sm:p-4">
      {/* Header with overall progress */}
      <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 rounded-lg p-3 sm:p-4 mb-3 sm:mb-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            NexCode 150
          </h1>
          <div className="flex items-baseline mt-1 sm:mt-0">
            <span className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {totalSolved}
            </span>
            <span className="text-lg font-medium text-gray-500 dark:text-gray-400 ml-1">/ 150</span>
          </div>
        </div>
        
        <p className="text-xs sm:text-sm font-light text-gray-700 dark:text-gray-300 mb-2">
          The perfect list for people already familiar with basic algorithms & data structures
        </p>
        
        {/* Overall progress bar */}
        <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${totalPercentage}%` }}
          ></div>
        </div>
        
        <div className="mt-1 text-right text-xs text-gray-600 dark:text-gray-400">
          {totalPercentage.toFixed(1)}% complete
        </div>
      </div>
      
      {/* Difficulty categories */}
      <div className="grid gap-2 sm:gap-3 overflow-y-auto">
        {/* Easy category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all hover:shadow-md p-3 border-l-4 border-green-500">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-green-500 font-medium text-sm sm:text-base">Easy</h2>
            <div className="flex items-baseline text-gray-800 dark:text-white">
              <p className="text-lg sm:text-xl font-semibold">{easySolved}</p>
              <p className="text-xs sm:text-sm font-normal ml-1 text-gray-500 dark:text-gray-400">/ 28</p>
            </div>
          </div>
          
          <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-green-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${easyPercentage}%` }}
            ></div>
          </div>
          
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
            <span>Start with these fundamentals</span>
            <span>{easyPercentage.toFixed(1)}%</span>
          </div>
        </div>
        
        {/* Medium category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all hover:shadow-md p-3 border-l-4 border-blue-500">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-blue-500 font-medium text-sm sm:text-base">Medium</h2>
            <div className="flex items-baseline text-gray-800 dark:text-white">
              <p className="text-lg sm:text-xl font-semibold">{mediumSolved}</p>
              <p className="text-xs sm:text-sm font-normal ml-1 text-gray-500 dark:text-gray-400">/ 100</p>
            </div>
          </div>
          
          <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-blue-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${mediumPercentage}%` }}
            ></div>
          </div>
          
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
            <span>Build your problem-solving skills</span>
            <span>{mediumPercentage.toFixed(1)}%</span>
          </div>
        </div>
        
        {/* Hard category */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm transition-all hover:shadow-md p-3 border-l-4 border-rose-500">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-rose-500 font-medium text-sm sm:text-base">Hard</h2>
            <div className="flex items-baseline text-gray-800 dark:text-white">
              <p className="text-lg sm:text-xl font-semibold">{hardSolved}</p>
              <p className="text-xs sm:text-sm font-normal ml-1 text-gray-500 dark:text-gray-400">/ 21</p>
            </div>
          </div>
          
          <div className="relative w-full h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
            <div 
              className="absolute top-0 left-0 h-full bg-rose-500 rounded-full transition-all duration-500 ease-in-out"
              style={{ width: `${hardPercentage}%` }}
            ></div>
          </div>
          
          <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 flex justify-between">
            <span>Master complex algorithms</span>
            <span>{hardPercentage.toFixed(1)}%</span>
          </div>
        </div>
      </div>
      
      {/* Motivational message based on progress */}
      <div className="mt-3 p-2 sm:p-3 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-lg text-center">
        {totalPercentage < 10 ? (
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Ready to begin your coding journey? Let's get started!</p>
        ) : totalPercentage < 50 ? (
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Great progress! Keep building your skills one problem at a time.</p>
        ) : totalPercentage < 80 ? (
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Impressive work! You're well on your way to mastering these algorithms.</p>
        ) : (
          <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">Outstanding achievement! You're approaching NexCode mastery!</p>
        )}
      </div>
    </div>
  );
};

export default SolvedGrid;