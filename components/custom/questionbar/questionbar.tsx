"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";

interface Questions {
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  }
  correctAnswer: "a" | "b" | "c" | "d";
}

interface QuestionbarProps {
  onQuizComplete: (score: number, total: number) => void; // Callback to pass score to parent
}

export default function Questionbar({ onQuizComplete }: QuestionbarProps) {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [isActiveQuestion, setIsActiveQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState(0);
  const [currentPageStart, setCurrentPageStart] = useState(0);
  
  // Responsive button count - show fewer buttons on smaller screens
  const [buttonsPerPage, setButtonsPerPage] = useState(7);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("materialId");
    if (id) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/mcq/${id}`);
          const allQ = response.data.questions;
          setQuestions(allQ || []);
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        }
      };
      fetchQuestions();
    } else {
      console.error("Material ID is missing");
    }
  }, [searchParams]);

  // Handle responsive button count
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setButtonsPerPage(3);
      } else if (window.innerWidth < 768) {
        setButtonsPerPage(5);
      } else {
        setButtonsPerPage(7);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAnswerSelect = (selectedAnswer: string) => {
    const currentQuestion = questions[isActiveQuestion];
  
    const correctOption = currentQuestion.options[currentQuestion.correctAnswer];
  
    setUserAnswers((prev) => ({
      ...prev,
      [isActiveQuestion]: selectedAnswer,
    }));
  
    // Update score only if selected answer matches the correct option
    if (selectedAnswer === correctOption) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    const nextQuestionIndex = (isActiveQuestion + 1) % questions.length;
    setIsActiveQuestion(nextQuestionIndex);
    
    if (nextQuestionIndex >= currentPageStart + buttonsPerPage) {
      setCurrentPageStart(Math.floor(nextQuestionIndex / buttonsPerPage) * buttonsPerPage);
    }
  };

  const handlePrev = () => {
    const prevQuestionIndex = (isActiveQuestion - 1 + questions.length) % questions.length;
    setIsActiveQuestion(prevQuestionIndex);
    
    if (prevQuestionIndex < currentPageStart) {
      setCurrentPageStart(Math.floor(prevQuestionIndex / buttonsPerPage) * buttonsPerPage);
    }
  };

  const handleClick = (index: number) => {
    setIsActiveQuestion(index);
  };
  
  const handleNextPage = () => {
    const nextPageStart = currentPageStart + buttonsPerPage;
    if (nextPageStart < questions.length) {
      setCurrentPageStart(nextPageStart);
    }
  };
  
  const handlePrevPage = () => {
    const prevPageStart = currentPageStart - buttonsPerPage;
    if (prevPageStart >= 0) {
      setCurrentPageStart(prevPageStart);
    }
  };

  useEffect(() => {
    if (Object.keys(userAnswers).length === questions.length) {
      onQuizComplete(score, questions.length);
    }
  }, [userAnswers, score, questions.length, onQuizComplete]);

  // Get the current visible page of question buttons
  const visibleQuestionButtons = () => {
    const endIndex = Math.min(currentPageStart + buttonsPerPage, questions.length);
    const buttons = [];
    
    for (let i = currentPageStart; i < endIndex; i++) {
      buttons.push(
        <Button
          key={i}
          variant="outline"
          onClick={() => handleClick(i)}
          className={isActiveQuestion === i ? "bg-black dark:bg-slate-600 text-white" : ""}
          size={window.innerWidth < 640 ? "sm" : "default"}
        >
          {i + 1}
        </Button>
      );
    }
    
    return buttons;
  };

  return (
    <div className="flex flex-col justify-between h-full pt-10 sm:pt-20">
      {questions.length > 0 ? (
        <>
          <div className="flex flex-col">
            <p className="text-sm font-mono text-slate-600 dark:text-slate-400">
              Question {isActiveQuestion + 1} of {questions.length}
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-[#e1e1e1] mt-2">
              {questions[isActiveQuestion].text}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 pt-4">
              {Object.entries(questions[isActiveQuestion].options).map(([key, value]) => (
                <div
                  key={key}
                  onClick={() => handleAnswerSelect(value)}
                  className={`py-2 px-4 sm:px-12 border rounded-xl text-sm cursor-pointer ${
                    userAnswers[isActiveQuestion] === value
                      ? "bg-black dark:bg-white dark:text-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {value}
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-between items-center pt-6 sm:pt-10 w-full">
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={isActiveQuestion === 0}
              className="mb-4 sm:mb-0 w-full sm:w-auto"
            >
              Prev
            </Button>
            
            <div className="flex space-x-1 items-center overflow-x-auto scrollbar-hide py-2 max-w-full">
              {questions.length > buttonsPerPage && currentPageStart > 0 && (
                <Button variant="ghost" size="icon" onClick={handlePrevPage} className="p-1 flex-shrink-0">
                  <ChevronLeft size={16} />
                </Button>
              )}
              
              {visibleQuestionButtons()}
              
              {questions.length > buttonsPerPage && currentPageStart + buttonsPerPage < questions.length && (
                <Button variant="ghost" size="icon" onClick={handleNextPage} className="p-1 flex-shrink-0">
                  <ChevronRight size={16} />
                </Button>
              )}
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleNext} 
              disabled={isActiveQuestion === questions.length - 1}
              className="mt-4 sm:mt-0 w-full sm:w-auto"
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p className="text-center">Loading questions...</p>
      )}
    </div>
  );
}