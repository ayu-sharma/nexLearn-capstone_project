"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from "lucide-react";
import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import Loader from "../course/loader";

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
  onQuizComplete: (score: number, total: number) => void;
}

export default function Questionbar({ onQuizComplete }: QuestionbarProps) {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [isActiveQuestion, setIsActiveQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
  const [score, setScore] = useState(0);
  const [currentPageStart, setCurrentPageStart] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonsPerPage, setButtonsPerPage] = useState(7);
  
  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("materialId");
    if (id) {
      const fetchQuestions = async () => {
        setIsLoading(true);
        try {
          const response = await axios.get(`http://localhost:3000/api/mcq/${id}`);
          const allQ = response.data.questions;
          setQuestions(allQ || []);
        } catch (error) {
          console.error("Failed to fetch questions:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchQuestions();
    } else {
      console.error("Material ID is missing");
      setIsLoading(false);
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
    if (questions.length > 0 && Object.keys(userAnswers).length === questions.length) {
      onQuizComplete(score, questions.length);
    }
  }, [userAnswers, score, questions.length, onQuizComplete]);

  const progressPercentage = questions.length > 0 
    ? ((isActiveQuestion + 1) / questions.length) * 100 
    : 0;

  const visibleQuestionButtons = () => {
    const endIndex = Math.min(currentPageStart + buttonsPerPage, questions.length);
    const buttons = [];
    
    for (let i = currentPageStart; i < endIndex; i++) {
      const isAnswered = userAnswers[i] !== undefined;
      buttons.push(
        <Button
          key={i}
          variant="outline"
          onClick={() => handleClick(i)}
          className={`rounded-full transition-all duration-300 ${
            isActiveQuestion === i 
              ? "bg-blue-600 text-white border-blue-600 dark:bg-blue-500 dark:border-blue-500" 
              : isAnswered
                ? "bg-blue-100 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800"
                : "hover:bg-blue-50 dark:hover:bg-blue-900/20"
          }`}
          size={window.innerWidth < 640 ? "sm" : "default"}
        >
          {i + 1}
        </Button>
      );
    }
    
    return buttons;
  };

  const getOptionVariant = (optionValue: string) => {
    if (userAnswers[isActiveQuestion] === optionValue) {
      return "bg-blue-600 dark:bg-blue-500 text-black border-blue-600 dark:border-blue-500";
    }
    return "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all duration-300";
  };

  if (isLoading) {
    return (
    <Loader text="Loading Questions..."/>
    );
  }

  return (
    <div className="flex flex-col justify-between h-full pt-6 sm:pt-12 max-w-4xl mx-auto w-full px-4">
      {questions.length > 0 ? (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Question {isActiveQuestion + 1} of {questions.length}
              </p>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                {Object.keys(userAnswers).length} answered
              </p>
            </div>
            <Progress value={progressPercentage} className="h-2 bg-slate-100 dark:bg-slate-800" />
          </div>

          <Card className="border-slate-300 dark:border-slate-700 shadow-sm bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
            <CardContent className="pt-6">
              <p className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
                {questions[isActiveQuestion].text}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {Object.entries(questions[isActiveQuestion].options).map(([key, value]) => (
                  <div
                    key={key}
                    onClick={() => handleAnswerSelect(value)}
                    className={`py-3 px-4 border rounded-2xl text-base cursor-pointer transition-all duration-300 ${getOptionVariant(value)}`}
                  >
                    <div className="flex items-center">
                      <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mr-3 text-sm font-medium">
                        {key.toUpperCase()}
                      </div>
                      <span>{value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="flex flex-col sm:flex-row justify-between items-center mt-6 sm:mt-8 w-full">
            <Button 
              variant="outline" 
              onClick={handlePrev} 
              disabled={isActiveQuestion === 0}
              className="mb-4 sm:mb-0 w-full sm:w-auto rounded-full border-slate-300 dark:border-slate-700"
            >
              <ArrowLeft size={18} className="mr-2" /> Previous
            </Button>
            
            <div className="flex space-x-2 items-center overflow-x-auto py-2 max-w-full scrollbar-hide">
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
              className="mt-4 sm:mt-0 w-full sm:w-auto rounded-full border-slate-300 dark:border-slate-700"
            >
              Next <ArrowRight size={18} className="ml-2" />
            </Button>
          </div>
          
          <div className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
            You've answered {Object.keys(userAnswers).length} out of {questions.length} questions
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <p className="text-slate-600 dark:text-slate-400">No questions available</p>
        </div>
      )}
    </div>
  );
}