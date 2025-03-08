"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Problem = {
  id: string;
  title: string;
  problemStatement: string;
  sampleInput1: string;
  sampleInput2: string;
  sampleOutput1: string;
  sampleOutput2: string;
}

const ProblemPanel = () => {
  const searchParams = useSearchParams();
  const [problem, setProblem] = useState<Problem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const problemId = searchParams.get('problemId');
    if (!problemId) return;
    
    setLoading(true);
    const fetchProblem = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/dsa/problem/${problemId}`);
        const data = response.data.problem;
        setProblem(data);
      } catch (error) {
        console.error("Error fetching problem: ", error);
      } finally {
        setLoading(false);
      }
    }

    fetchProblem();
  }, [searchParams]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="animate-pulse text-gray-600 dark:text-gray-300">Loading problem...</div>
      </div>
    );
  }

  if (!problem) {
    return (
      <div className="flex justify-center items-center h-full">
        <div className="text-gray-600 dark:text-gray-300">Problem not found</div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm h-full overflow-y-auto">
      <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{problem.title}</h2>
      
      <div className="mt-6 prose dark:prose-invert max-w-none">
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {problem.problemStatement}
        </p>
      </div>
      
      <div className="mt-8 space-y-6">
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Example 1</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Input:</span>
              <pre className="mt-1 bg-gray-100 dark:bg-gray-850 text-gray-800 dark:text-gray-200 p-4 rounded border border-gray-200 dark:border-gray-700 font-mono text-sm">
                {problem.sampleInput1}
              </pre>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Output:</span>
              <pre className="mt-1 bg-gray-100 dark:bg-gray-850 text-gray-800 dark:text-gray-200 p-4 rounded border border-gray-200 dark:border-gray-700 font-mono text-sm">
                {problem.sampleOutput1}
              </pre>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
          <h3 className="font-medium text-gray-800 dark:text-gray-200 mb-3">Example 2</h3>
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Input:</span>
              <pre className="mt-1 bg-gray-100 dark:bg-gray-850 text-gray-800 dark:text-gray-200 p-4 rounded border border-gray-200 dark:border-gray-700 font-mono text-sm">
                {problem.sampleInput2}
              </pre>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Output:</span>
              <pre className="mt-1 bg-gray-100 dark:bg-gray-850 text-gray-800 dark:text-gray-200 p-4 rounded border border-gray-200 dark:border-gray-700 font-mono text-sm">
                {problem.sampleOutput2}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemPanel;