"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function questionbar() {
  const [isActiveQuestion, setIsActiveQuestion] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState([
    {
      question: "Which of the following is a front-end framework?",
      optionA: "Laravel",
      optionB: "Django",
      optionC: "React",
      optionD: "Spring",
      correctAnswer: "optionC",
    },
    {
      question: "What does CRUD stand for in web development?",
      optionA: "Create, Read, Update, Delete",
      optionB: "Connect, Replace, Update, Delete",
      optionC: "Create, Replace, Upload, Download",
      optionD: "Connect, Read, Upload, Delete",
      correctAnswer: "optionA",
    },
    {
      question: "Which of these is a NoSQL database?",
      optionA: "MySQL",
      optionB: "PostgreSQL",
      optionC: "MongoDB",
      optionD: "SQLite",
      correctAnswer: "optionC",
    },
    {
      question:
        "What is the primary role of Node.js in a full stack application?",
      optionA: "Database management",
      optionB: "Client-side rendering",
      optionC: "Server-side scripting",
      optionD: "UI design",
      correctAnswer: "optionC",
    },
    {
      question: "Which HTTP method is commonly used to update a resource?",
      optionA: "GET",
      optionB: "POST",
      optionC: "PUT",
      optionD: "DELETE",
      correctAnswer: "optionC",
    },
    {
      question: "Which of the following is a popular CSS preprocessor?",
      optionA: "Sass",
      optionB: "JavaScript",
      optionC: "jQuery",
      optionD: "React",
      correctAnswer: "optionA",
    },
    {
      question:
        "Which tool is commonly used for version control in software development?",
      optionA: "Git",
      optionB: "Docker",
      optionC: "Webpack",
      optionD: "NPM",
      correctAnswer: "optionA",
    },
    {
      question: "In the MVC architecture, what does the 'M' stand for?",
      optionA: "Model",
      optionB: "Method",
      optionC: "Module",
      optionD: "Middleware",
      correctAnswer: "optionA",
    },
    {
      question:
        "Which of the following is a commonly used build tool in JavaScript projects?",
      optionA: "Grunt",
      optionB: "Python",
      optionC: "Ruby",
      optionD: "PHP",
      correctAnswer: "optionA",
    },
    {
      question: "Which is a common backend language?",
      optionA: "HTML",
      optionB: "CSS",
      optionC: "JavaScript",
      optionD: "Python",
      correctAnswer: "optionD",
    },
  ]);

  const handleNext = () => {
    setIsActiveQuestion((isActiveQuestion + 1) % currentQuestion.length);
  };
  const handlePrev = () => {
    setIsActiveQuestion((isActiveQuestion - 1) % currentQuestion.length);
  };
  const handleClick=(index: number) => {
    setIsActiveQuestion(index)
  }

  console.log(isActiveQuestion);
  return (
    <div className="flex flex-col justify-between h-full pt-20">
      <div className="flex flex-col">
        <div className="flex flex-col">
          <p className="text-sm tracking-[-0.006em] font-mono font-semibold text-slate-600 dark:text-slate-400">
            Question {isActiveQuestion + 1} of {currentQuestion.length}
          </p>
          <div className="flex flex-col justify-center items-start">
            <p className="text-lg tracking-[-0.014em] text-slate-900 dark:text-[#e1e1e1] font-mono font-bold pt-3">
              {currentQuestion[isActiveQuestion].question}
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="grid grid-flow-row gap-3 items-center">
                <div className="py-2 px-12 border border-[#e1e1e1] rounded-xl text-sm text-[#121212] dark:text-[#e1e1e1] dark:hover:text-[#7981FF] font-mono cursor-pointer hover:bg-black hover:text-white ">
                  {currentQuestion[isActiveQuestion].optionA} 
                </div> 
                <div className="py-2 px-12 border border-[#e1e1e1] rounded-xl text-sm text-[#121212] dark:text-[#e1e1e1] dark:hover:text-[#7981FF] font-mono cursor-pointer hover:bg-black hover:text-white">
                  {currentQuestion[isActiveQuestion].optionC} 
                </div> 
              </div> 
              <div className="grid grid-flow-row gap-3 items-center"> 
                <div className="py-2 px-12 border border-[#e1e1e1] rounded-xl text-sm text-[#121212] dark:text-[#e1e1e1] dark:hover:text-[#7981FF] font-mono cursor-pointer hover:bg-black hover:text-white">
                  {currentQuestion[isActiveQuestion].optionB} 
                </div> 
                <div className="py-2 px-12 border border-[#e1e1e1] rounded-xl text-sm text-[#121212] dark:text-[#e1e1e1] dark:hover:text-[#7981FF] font-mono cursor-pointer hover:bg-black hover:text-white">
                  {currentQuestion[isActiveQuestion].optionD}
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
        {currentQuestion.map((item, index) => (
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
          disabled={isActiveQuestion === currentQuestion.length-1}
          className="disabled:border-[#797979] bg-transparent hover:text-white dark:hover:text-black border text-black dark:text-white border-black dark:border-white font-mono"
        >
          {" "}
          Next{" "}
        </Button>
      </div>
    </div>
  );
}
