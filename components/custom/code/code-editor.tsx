"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Language = {
  value: string;
  label: string;
  boilerplate: string;
};

const languages: Language[] = [
  {
    value: "javascript",
    label: "JavaScript",
    boilerplate: `// Start typing your JavaScript solution here...
function solution(nums) {
  // Your code here
  return nums.length > 0;
}`,
  },
  {
    value: "python",
    label: "Python",
    boilerplate: `# Start typing your Python solution here...
def solution(nums):
    # Your code here
    return len(nums) > 0`,
  },
  {
    value: "java",
    label: "Java",
    boilerplate: `// Start typing your Java solution here...
import java.util.*;

public class Solution {
    public static boolean solution(int[] nums) {
        // Your code here
        return nums.length > 0;
    }
}`,
  },
  {
    value: "cpp",
    label: "C++",
    boilerplate: `// Start typing your C++ solution here...
#include <vector>
using namespace std;

bool solution(vector<int> nums) {
    // Your code here
    return nums.size() > 0;
}`,
  },
];

// Example test cases
const testCases = [
  { input: [1, 2, 3, 4], expected: true },
  { input: [], expected: false },
  { input: [-1, -2, -3, -3], expected: true },
];

const CodeEditor = () => {
  const [code, setCode] = useState(languages[0].boilerplate);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [testResults, setTestResults] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = languages.find(
      (lang) => lang.value === event.target.value
    );
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setCode(selectedLanguage.boilerplate);
    }
  };

  const runTestCases = async () => {
    setLoading(true);
    setModalOpen(true);

    let passed = 0;
    try {
      // Execute user code based on selected language
      const executeCode = (input: any): any => {
        switch (language.value) {
          case "javascript":
            // Dynamically create and execute JS function
            const jsFunction = new Function(
              "nums",
              `${code}; return solution(nums);`
            );
            return jsFunction(input);
          case "python":
            // Simple Python interpreter simulation
            if (code.includes("def solution(nums):")) {
              if (code.includes("len(nums) > 0")) {
                return input.length > 0;
              }
              throw new Error("Python: Simulated runtime error");
            }
            break;
          case "java":
            // Simple Java interpreter simulation
            if (code.includes("public static boolean solution")) {
              if (code.includes("nums.length > 0")) {
                return input.length > 0;
              }
              throw new Error("Java: Simulated runtime error");
            }
            break;
          case "cpp":
            // Simple C++ interpreter simulation
            if (code.includes("bool solution(vector<int> nums)")) {
              if (code.includes("nums.size() > 0")) {
                return input.length > 0;
              }
              throw new Error("C++: Simulated runtime error");
            }
            break;
          default:
            throw new Error("Unsupported language");
        }
        return null;
      };

      testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        const result = executeCode(input);
        if (result === expected) {
          passed += 1;
        }
      });

      setTestResults(`Passed ${passed} out of ${testCases.length} test cases.`);
    } catch (error: any) {
      setTestResults(
        `Error in your code. Please fix syntax or runtime errors.`
      );
    }

    setLoading(false);
  };

  return (
    <div className="h-full w-full rounded-md">
      <div className="flex items-center justify-between gap-4 pb-6">
        <select
          id="language"
          value={language.value}
          onChange={handleLanguageChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          {languages.map((lang) => (
            <option key={lang.value} value={lang.value}>
              {lang.label}
            </option>
          ))}
        </select>
        <Button
          onClick={runTestCases}
          className="bg-[#7981ff] text-white hover:bg-[#5560ff]"
        >
          Run
        </Button>
        <Button onClick={runTestCases}>Submit</Button>
      </div>
      <Editor
        height="500px"
        language={language.value}
        value={code}
        theme="vs-dark"
        onChange={handleEditorChange}
        options={{
          minimap: { enabled: true },
          fontSize: 14,
          wordWrap: "on",
        }}
      />
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Test Results</DialogTitle>
          </DialogHeader>
          <div className="text-center">
            {isLoading ? (
              <div className="flex justify-center items-center">
                <svg
                  className="animate-spin h-8 w-8 text-[#7981ff]"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.42.858 4.657 2.291 6.291l2.709-2.709z"
                  ></path>
                </svg>
                <span className="ml-2 text-[#7981ff]">
                  Running test cases...
                </span>
              </div>
            ) : (
              testResults
            )}
          </div>
          {!isLoading && (
            <Button
              className="mt-4 bg-[#7981ff] text-white hover:bg-blue-600"
              onClick={() => setModalOpen(false)}
            >
              Done
            </Button>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeEditor;
