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
      setLoading(true);
      const fetchProblem = async () => {
        try {
          const response = await axios.get(`http://localhost:3000/api/dsa/problem/${problemId}`);
          const data = response.data.problem;
          console.log(data);
          setProblem(data);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching problem: ", error);
        }
      }
  
      fetchProblem();
    }, [searchParams]); 

    console.log(problem);
    
    if (loading) {
      return <div>Loading</div>
    }

    return (
      <div className="bg-whi p-6 rounded-lg border h-full">
        <h2 className="text-xl font-bold">{problem?.title}</h2>
        <p className="mt-4 text-gray-700 dark:text-slate-400">
          {problem?.problemStatement}
        </p>
        <div className="mt-6">
          <h3 className="font-medium">Example 1:</h3>
          <pre className="bg-neutral-800 text-white p-4 rounded mt-2">
            Input: {problem?.sampleInput1}
            <br />
            Output: {problem?.sampleOutput1}
          </pre>
        </div>
        <div className="mt-4">
          <h3 className="font-medium">Example 2:</h3>
          <pre className="bg-neutral-800 text-white p-4 rounded mt-2">
            Input: {problem?.sampleInput2}
            <br />
            Output: {problem?.sampleOutput2}
          </pre>
        </div>
      </div>
    );
  };
  
  export default ProblemPanel;
  