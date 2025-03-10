"use client"

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Questionbar from "../../components/custom/questionbar/questionbar";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Assessment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const router = useRouter();

  const handleQuizComplete = (finalScore: number, total: number) => {
    setScore(finalScore);
    setTotalQuestions(total);
  };

  const handleSubmit = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    router.back();
  };

  return (
    <div className="flex flex-col py-6 px-5 h-screen">
      <div className="flex items-center justify-between">
        <div className="flex gap-2 items-center">
          <Clock className="text-[#7981FF]" size={25} />
          <div className="flex flex-col">
            <p className="dark:text-slate-300 text-xs">Time remaining</p>
            <p className="text-sm font-mono">14:44:00</p>
          </div>
        </div>
        <div className="flex items-center gap-x-6">
        <Button variant={'custom'} onClick={handleSubmit}>Submit</Button>
        
        </div>
      </div>
      <Questionbar onQuizComplete={handleQuizComplete} />
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white dark:bg-black dark:border p-8 rounded-lg flex flex-col">
            <h2 className="text-xl font-bold">Assessment Completed</h2>
            <p className="my-8 text-sm flex text-center items-center justify-around">Your score: <span className="text-2xl">{score}/{totalQuestions}</span></p>
            <Button variant={'outline'} onClick={handleCloseModal} className="mt-4 w-full">
              Done
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
