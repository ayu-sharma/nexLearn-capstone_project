import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Code, Check, Clock, Star } from "lucide-react";

// Define types for DSA Data
interface Category {
  name: string;
  solved: number;
  total: number;
  percentage: number;
}

interface DifficultyStats {
  solved: number;
  total: number;
  percentage: number;
}

interface Submission {
  id: number;
  name: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "Accepted" | "Wrong Answer" | "Time Limit Exceeded";
  runtime: string;
  memory: string;
}

interface DSAData {
  totalProblems: number;
  solvedProblems: number;
  categories: Category[];
  difficultyStats: {
    easy: DifficultyStats;
    medium: DifficultyStats;
    hard: DifficultyStats;
  };
  recentSubmissions: Submission[];
}

const DSAGrid: React.FC = () => {
  const dsaData: DSAData = {
    totalProblems: 350,
    solvedProblems: 124,
    categories: [
      { name: "Arrays", solved: 28, total: 65, percentage: 43 },
      { name: "Linked Lists", solved: 18, total: 42, percentage: 43 },
      { name: "Trees", solved: 15, total: 38, percentage: 39 },
      { name: "Dynamic Programming", solved: 12, total: 52, percentage: 23 },
      { name: "Graphs", solved: 10, total: 45, percentage: 22 },
      { name: "Sorting", solved: 19, total: 30, percentage: 63 },
      { name: "Searching", solved: 12, total: 25, percentage: 48 },
      { name: "Greedy", solved: 10, total: 28, percentage: 36 },
    ],
    difficultyStats: {
      easy: { solved: 67, total: 125, percentage: 54 },
      medium: { solved: 48, total: 160, percentage: 30 },
      hard: { solved: 9, total: 65, percentage: 14 },
    },
    recentSubmissions: [
      { id: 1, name: "Valid Parentheses", difficulty: "Easy", status: "Accepted", runtime: "95ms", memory: "40.2MB" },
      { id: 2, name: "Merge Two Sorted Lists", difficulty: "Easy", status: "Accepted", runtime: "88ms", memory: "39.8MB" },
      { id: 3, name: "Maximum Subarray", difficulty: "Medium", status: "Accepted", runtime: "104ms", memory: "42.5MB" },
      { id: 4, name: "Coin Change", difficulty: "Medium", status: "Wrong Answer", runtime: "-", memory: "-" },
      { id: 5, name: "Merge Intervals", difficulty: "Medium", status: "Time Limit Exceeded", runtime: "-", memory: "-" },
    ],
  };

  const overallProgress = Math.round((dsaData.solvedProblems / dsaData.totalProblems) * 100);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-5 flex items-center">
          <div className="rounded-full bg-blue-100 p-3 mr-4">
            <Code className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Problems Solved</p>
            <p className="text-2xl font-bold">{dsaData.solvedProblems}/{dsaData.totalProblems}</p>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Overall Progress</h3>
        <div className="w-48 h-48 mx-auto">
          <CircularProgressbar
            value={overallProgress}
            text={`${overallProgress}%`}
            styles={buildStyles({
              pathColor: "#3b82f6",
              textColor: "#1e40af",
              trailColor: "#dbeafe",
            })}
          />
        </div>
      </div>
    </div>
  );
};

export default DSAGrid;
