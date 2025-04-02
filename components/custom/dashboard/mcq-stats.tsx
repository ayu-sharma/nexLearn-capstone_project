"use client";

import React, { useEffect, useState } from "react";
import { BookOpen, Clock, Target, Award } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";

interface SubjectPerformance {
  name: string;
  correct: number;
  total: number;
  percentage: number;
}

interface MonthlyProgress {
  month: string;
  correct: number;
  incorrect: number;
}

interface AnswerDistribution {
  name: string;
  value: number;
  color: string;
}

interface RecentQuiz {
  id: number;
  name: string;
  score: string;
  date: string;
  time: string;
}

const mcqData = {
  totalQuestions: 450,
  answeredQuestions: 385,
  correctAnswers: 328,
  accuracy: 85.2,
  averageTime: "45 seconds",
  subjectPerformance: [
    { name: "Data Structures", correct: 88, total: 100, percentage: 88 },
    { name: "Algorithms", correct: 92, total: 110, percentage: 84 },
    { name: "Operating Systems", correct: 56, total: 70, percentage: 80 },
    { name: "Database Systems", correct: 48, total: 60, percentage: 80 },
    { name: "Computer Networks", correct: 44, total: 55, percentage: 80 },
  ] as SubjectPerformance[],
  monthlyProgress: [
    { month: "Jan", correct: 65, incorrect: 15 },
    { month: "Feb", correct: 75, incorrect: 10 },
    { month: "Mar", correct: 80, incorrect: 20 },
    { month: "Apr", correct: 90, incorrect: 15 },
    { month: "May", correct: 95, incorrect: 10 },
    { month: "Jun", correct: 85, incorrect: 25 },
  ] as MonthlyProgress[],
  answerDistribution: [
    { name: "Correct", value: 328, color: "#22c55e" },
    { name: "Incorrect", value: 57, color: "#ef4444" },
    { name: "Unattempted", value: 65, color: "#9ca3af" },
  ] as AnswerDistribution[],
  recentQuizzes: [
    { id: 1, name: "Data Structures Quiz 5", score: "18/20", date: "2023-06-15", time: "12:30 PM" },
    { id: 2, name: "Algorithms Weekly Test", score: "45/50", date: "2023-06-12", time: "10:00 AM" },
    { id: 3, name: "Operating Systems Mock", score: "28/30", date: "2023-06-08", time: "2:15 PM" },
    { id: 4, name: "Computer Networks Quiz", score: "19/25", date: "2023-06-05", time: "11:45 AM" },
    { id: 5, name: "Database Systems Test", score: "27/30", date: "2023-06-01", time: "3:30 PM" },
  ] as RecentQuiz[],
};

const MCQGrid: React.FC = () => {
  const [accuracy, setAccuracy] = useState("0");
  const [totalMcq, setTotalMcq] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [average, setAverage] = useState("0");
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
          console.log(solved);
          setAccuracy(solved.accuracy);
          setTotalMcq(solved.totalMCQs);
          setTotalCorrect(solved.totalScore);
          setAverage(solved.avgTimePerQuestion);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserDSAStats();
    }, []);
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard icon={<BookOpen />} title="MCQ Score" value={`${accuracy}%`} color="green" />
        <SummaryCard icon={<Target />} title="Questions Attempted" value={`${totalMcq}`} color="blue" />
        <SummaryCard icon={<Clock />} title="Average Time" value={`${average} seconds`} color="purple" />
        <SummaryCard icon={<Award />} title="Correct Answers" value={totalCorrect} color="yellow" />
      </div>
    </div>
  );
};

interface SummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: string;
}

const SummaryCard: React.FC<SummaryCardProps> = ({ icon, title, value, color }) => {
  return (
    <div className="bg-white rounded-lg shadow p-5 flex items-center">
      <div className={`rounded-full bg-${color}-100 p-3 mr-4`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default MCQGrid;
