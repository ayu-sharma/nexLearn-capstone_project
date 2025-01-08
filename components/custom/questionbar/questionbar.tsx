"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import axios from "axios";

interface Questions {
  id: string;
  text: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: "A" | "B" | "C" | "D";
}

interface QuestionbarProps {
  onQuizComplete: (score: number, total: number) => void; // Callback to pass score to parent
}

export default function Questionbar({ onQuizComplete }: QuestionbarProps) {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [isActiveQuestion, setIsActiveQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: string }>({});
  const [score, setScore] = useState(0);

  const searchParams = useSearchParams();

  useEffect(() => {
    const id = searchParams.get("materialId");
    if (id) {
      const fetchQuestions = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/assessment/${id}`);
          const allQ = response.data.allQuestions;
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

  const handleAnswerSelect = (selectedAnswer: string) => {
    const currentQuestion = questions[isActiveQuestion];
  
    // Map correctAnswer ('A', 'B', 'C', 'D') to the corresponding option
    const correctOption = currentQuestion[`option${currentQuestion.correctAnswer}` as keyof Questions];
  
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: selectedAnswer,
    }));
  
    // Update score only if selected answer matches the correct option
    if (selectedAnswer === correctOption) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setIsActiveQuestion((isActiveQuestion + 1) % questions.length);
  };

  const handlePrev = () => {
    setIsActiveQuestion((isActiveQuestion - 1 + questions.length) % questions.length);
  };

  const handleClick = (index: number) => {
    setIsActiveQuestion(index);
  };

  useEffect(() => {
    // Notify parent component once all questions are answered
    if (Object.keys(userAnswers).length === questions.length) {
      onQuizComplete(score, questions.length);
    }
  }, [userAnswers, score, questions.length, onQuizComplete]);

  return (
    <div className="flex flex-col justify-between h-full pt-20">
      {questions.length > 0 ? (
        <>
          <div className="flex flex-col">
            <p className="text-sm font-mono text-slate-600 dark:text-slate-400">
              Question {isActiveQuestion + 1} of {questions.length}
            </p>
            <p className="text-lg font-bold text-slate-900 dark:text-[#e1e1e1]">
              {questions[isActiveQuestion].text}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              {["optionA", "optionB", "optionC", "optionD"].map((optionKey) => (
                <div
                  key={optionKey}
                  onClick={() => handleAnswerSelect(questions[isActiveQuestion][optionKey as keyof Questions])}
                  className={`py-2 px-12 border rounded-xl text-sm cursor-pointer ${
                    userAnswers[questions[isActiveQuestion].id] ===
                    questions[isActiveQuestion][optionKey as keyof Questions]
                      ? "bg-black dark:bg-white dark:text-black text-white"
                      : "hover:bg-black hover:text-white"
                  }`}
                >
                  {questions[isActiveQuestion][optionKey as keyof Questions]}
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-between items-center pt-10 w-full">
            <Button variant={'outline'} onClick={handlePrev} disabled={isActiveQuestion === 0}>
              Prev
            </Button>
            {questions.map((_, index) => (
              <Button
                key={index}
                variant={'outline'}
                onClick={() => handleClick(index)}
                className={isActiveQuestion === index ? "bg-black dark:bg-slate-600 text-white" : ""}
              >
                {index + 1}
              </Button>
            ))}
            <Button variant={'outline'} onClick={handleNext} disabled={isActiveQuestion === questions.length - 1}>
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
