"use client"

import React, { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import Questionbar from "../../components/custom/questionbar/questionbar";
import { Clock, ArrowLeft } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Loader from "@/components/custom/course/loader";
import axios from "axios";

export default function Assessment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const router = useRouter();
  const [timeElapsed, setTimeElapsed] = useState(0);
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  // Fixed: Properly typing the timer ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerRef.current = setInterval(() => {
        setTimeElapsed((prev) => prev + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }; 
  }, [isTimerRunning]);

  const handleQuizComplete = (finalScore: number, total: number) => {
    setScore(finalScore);
    setTotalQuestions(total);
  };

  const handleSubmit = async () => {
    // Stop the timer immediately
    setIsTimerRunning(false);
    
    setIsLoading(true);
    const materialId = searchParams.get("materialId");
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post("http://localhost:3000/api/score", {
        material: materialId,
        score,
        total: totalQuestions,
        timeTaken: timeElapsed
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.back();
  };

  // Ensure timer is stopped when navigating away
  useEffect(() => {
    return () => {
      setIsTimerRunning(false);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Add effect to simulate loading questions
  useEffect(() => {
    // Simulate loading time for questions
    const loadTimer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(loadTimer);
  }, []);

  if (isLoading && !isModalOpen) {
    return (
      <div className="flex flex-col p-4 md:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="max-w-6xl mx-auto w-full flex items-center justify-center" style={{ height: "80vh" }}>
          <Loader />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col p-4 md:p-6 lg:p-8 min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 bg-white dark:bg-slate-850 rounded-xl p-4 shadow-sm">
          <button 
            onClick={() => router.back()} 
            className="flex items-center text-slate-600 dark:text-slate-300 hover:text-slate-800 dark:hover:text-white transition-colors mb-3 sm:mb-0"
          >
            <ArrowLeft size={18} className="mr-1" />
            <span className="text-sm">Back</span>
          </button>
          
          <div className="flex items-center space-x-6">
            <div className="flex items-center gap-2 bg-blue-50 dark:bg-slate-700 px-4 py-2 rounded-lg">
              <Clock className="text-blue-500 dark:text-blue-400" size={20} />
              <div className="flex flex-col">
                <p className="text-slate-500 dark:text-slate-300 text-xs">Time Elapsed</p>
                <p className="text-blue-600 dark:text-blue-300 font-mono font-medium">{formatTime(timeElapsed)}</p>
              </div>
            </div>
            
            <Button 
              onClick={handleSubmit}
              className="bg-blue-500 hover:bg-blue-600 text-white"
              disabled={isLoading}
            >
              {isLoading ? <Loader size="small" /> : "Complete Assessment"}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white dark:bg-slate-850 rounded-xl shadow-sm p-4 md:p-6">
          <Questionbar onQuizComplete={handleQuizComplete} />
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm z-50 p-4">
          <div className="bg-white dark:bg-slate-800 p-6 md:p-8 rounded-xl shadow-lg max-w-md w-full border border-slate-200 dark:border-slate-700 animate-fadeIn">
            <h2 className="text-2xl font-bold text-slate-800 dark:text-white text-center mb-4">Assessment Completed</h2>
            
            <div className="my-8 flex flex-col items-center">
              <p className="text-slate-500 dark:text-slate-300 mb-2">Your score</p>
              <div className="flex items-center">
                <span className="text-4xl font-bold text-blue-600 dark:text-blue-400">{score}</span>
                <span className="text-slate-400 text-2xl mx-2">/</span>
                <span className="text-2xl text-slate-600 dark:text-slate-300">{totalQuestions}</span>
              </div>
              
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Time taken: {formatTime(timeElapsed)}
              </p>
            </div>
            
            <Button 
              onClick={handleCloseModal} 
              className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg"
            >
              Return to Dashboard
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}