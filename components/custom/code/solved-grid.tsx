"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SolvedGrid = () => {
  const [totalSolved, setTotalSolved] = useState(0);
  const [easySolved, setEasySolved] = useState(0);
  const [mediumSolved, setMediumSolved] = useState(0);
  const [hardSolved, setHardSolved] = useState(0);

  useEffect(() => {
    const fetchUserDSAStats = async () => {
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
      }
    }

    fetchUserDSAStats();
  }, []);
  return (
    <div className="flex flex-col max-w-2xl mx-auto w-full p-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl sm:text-3xl font-bold text-indigo-500">NexCode 150</h1>
        <div className="flex items-baseline mt-2 sm:mt-0">
          <span className="text-3xl font-bold">{totalSolved}</span>
          <span className="text-xl font-medium text-gray-500 ml-1">/ 150</span>
        </div>
      </div>
      
      <p className="text-sm md:text-base font-light py-3 text-gray-600 dark:text-gray-300">
        The perfect list for people already familiar with basic algorithms & data structures
      </p>
      
      <div className="flex flex-col w-full my-4 p-4 sm:p-6 bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md">
        <div className="grid gap-4 sm:gap-6">
          {/* Progress categories */}
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center p-4 w-full justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <h2 className="text-green-500 font-medium text-lg">Easy</h2>
              </div>
              <div className="flex items-baseline justify-end text-gray-800 dark:text-white">
                <p className="text-2xl sm:text-3xl font-semibold">{easySolved}</p>
                <p className="text-base sm:text-lg font-normal ml-1">/ 28</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2">
              <div className="bg-green-500 h-2 w-0"></div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center p-4 w-full justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <h2 className="text-blue-500 font-medium text-lg">Medium</h2>
              </div>
              <div className="flex items-baseline justify-end text-gray-800 dark:text-white">
                <p className="text-2xl sm:text-3xl font-semibold">{mediumSolved}</p>
                <p className="text-base sm:text-lg font-normal ml-1">/ 100</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2">
              <div className="bg-blue-500 h-2 w-0"></div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center p-4 w-full justify-between">
              <div className="flex items-center mb-2 sm:mb-0">
                <div className="w-3 h-3 bg-rose-500 rounded-full mr-2"></div>
                <h2 className="text-rose-500 font-medium text-lg">Hard</h2>
              </div>
              <div className="flex items-baseline justify-end text-gray-800 dark:text-white">
                <p className="text-2xl sm:text-3xl font-semibold">{hardSolved}</p>
                <p className="text-base sm:text-lg font-normal ml-1">/ 21</p>
              </div>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 h-2">
              <div className="bg-rose-500 h-2 w-0"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SolvedGrid;