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
  correctAnswer: string;
}

export default function questionbar() {
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [isActiveQuestion, setIsActiveQuestion] = useState(0);
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
      }

      fetchQuestions();
    } else {
      console.error("Material ID is missing");
    }
  }, [searchParams]);

  const handleNext = () => {
    setIsActiveQuestion((isActiveQuestion + 1) % questions.length);
  };
  const handlePrev = () => {
    setIsActiveQuestion((isActiveQuestion - 1) % questions.length);
  };
  const handleClick=(index: number) => {
    setIsActiveQuestion(index)
  }
  return (
    <div className="flex flex-col justify-between h-full pt-20">
      {questions.length > 0 ? (
        <>  
        <div className="flex flex-col">
          <div className="flex flex-col">
            <p className="text-sm tracking-[-0.006em] font-mono font-semibold text-slate-600 dark:text-slate-400">
              Question {isActiveQuestion + 1} of {questions.length}
            </p>
            <div className="flex flex-col justify-center items-start">
              <p className="text-lg tracking-[-0.014em] text-slate-900 dark:text-[#e1e1e1] font-mono font-bold pt-3">
                {questions[isActiveQuestion].text} 
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="grid grid-flow-row gap-3 items-center">
                  <div className="py-2 px-12 border border-[#e1e1e1] rounded-xl text-sm text-[#121212] dark:text-[#e1e1e1] dark:hover:text-[#7981FF] font-mono cursor-pointer hover:bg-black hover:text-white ">
                    {questions[isActiveQuestion].optionA} 
                  </div> 
                  <div className="py-2 px-12 border border-[#e1e1e1] rounded-xl text-sm text-[#121212] dark:text-[#e1e1e1] dark:hover:text-[#7981FF] font-mono cursor-pointer hover:bg-black hover:text-white">
                    {questions[isActiveQuestion].optionC} 
                  </div> 
                </div> 
                <div className="grid grid-flow-row gap-3 items-center"> 
                  <div className="py-2 px-12 border border-[#e1e1e1] rounded-xl text-sm text-[#121212] dark:text-[#e1e1e1] dark:hover:text-[#7981FF] font-mono cursor-pointer hover:bg-black hover:text-white">
                    {questions[isActiveQuestion].optionB} 
                  </div> 
                  <div className="py-2 px-12 border border-[#e1e1e1] rounded-xl text-sm text-[#121212] dark:text-[#e1e1e1] dark:hover:text-[#7981FF] font-mono cursor-pointer hover:bg-black hover:text-white">
                    {questions[isActiveQuestion].optionD}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center pt-10 w-full">
          <Button
            onClick={handlePrev}
            disabled={isActiveQuestion === 0}
            className={`disabled:border-[#797979] bg-transparent hover:text-white dark:hover:text-black border text-black dark:text-white border-black dark:border-white font-mono`}
          >
            {" "}
            Prev{" "}
          </Button>
          {questions.map((item, index) => (
            <Button
            key={index}
            onClick={()=>handleClick(index)}
              className={` hover:text-white dark:hover:text-black border  border-black font-mono ${
                isActiveQuestion === index
                  ? "bg-black dark:bg-[#e1e1e1] text-white dark:text-black"
                  : "text-black bg-transparent dark:border-[#e1e1e1] dark:text-[#e1e1e1]"
              }`}
            >
              <span key={index}>{index + 1} </span>
            </Button>
          ))}
          <Button
            onClick={handleNext}
            disabled={isActiveQuestion === questions.length-1}
            className="disabled:border-[#797979] bg-transparent hover:text-white dark:hover:text-black border text-black dark:text-white border-black dark:border-white font-mono"
          >
            {" "}
            Next{" "}
          </Button>
        </div>
        </>  
      ): (
        <p className="text-center text-slate-600 dark:text-slate-400 font-mono">
          Loading questions...
        </p>
      )}
    </div>
  );
}
