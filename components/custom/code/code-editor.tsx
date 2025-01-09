"use client";

import React from "react";
import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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
  }`,
    },
    {
      value: "python",
      label: "Python",
      boilerplate: `# Start typing your Python solution here...
  def solution(nums):
      # Your code here
      pass`,
    },
    {
      value: "java",
      label: "Java",
      boilerplate: `// Start typing your Java solution here...
  import java.util.*;
  
  public class Solution {
      public static boolean containsDuplicate(int[] nums) {
          // Your code here
          return false;
      }
  }`,
    },
    {
      value: "cpp",
      label: "C++",
      boilerplate: `// Start typing your C++ solution here...
  #include <iostream>
  #include <vector>
  using namespace std;
  
  bool containsDuplicate(vector<int>& nums) {
      // Your code here
      return false;
  }`,
    },
  ];

  const testCases = [
    { input: [1, 2, 3, 4], expected: false },
    { input: [1, 2, 3, 1], expected: true },
    { input: [], expected: false },
    { input: [-1, -2, -3, -3], expected: true }
  ];

const CodeEditor = () => {
  const [code, setCode] = useState(`// Start typing your JavaScript solution here...
  function solution(nums) {
    // Your code here
  }`);
  const [language, setLanguage] = useState<Language>(languages[0]);
  const [testResults, setTestResults] = useState<string | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleEditorChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = languages.find((lang) => lang.value === event.target.value);
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
      setCode(selectedLanguage.boilerplate); // Update the editor with the selected language's boilerplate
    }
  };

  const runTestCases = async () => {
    setLoading(true);
    setModalOpen(true);
    try {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      // Convert user code into a function and execute it
      const userFunction = new Function(
        "nums",
        `"use strict"; ${code}; return solution(nums);`
      );

      let passed = 0;

      testCases.forEach((testCase) => {
        const { input, expected } = testCase;
        const result = userFunction(input);

        if (result === expected) {
          passed += 1;
        }
      });

      setTestResults(`Passed ${passed} out of ${testCases.length} test cases.`);
    } catch (error) {
      setTestResults("Error in your code. Please fix the syntax or runtime errors.");
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
            <Button onClick={runTestCases} className="bg-[#7981ff] text-white hover:bg-[#5560ff]">
                Run
            </Button>
            <Button onClick={runTestCases}>
                Submit
            </Button>
        </div>
      <Editor
        height="500px" // Adjust the height of the editor
        language={language.value} // Default language (can also be "python", "java", etc.)
        value={code} // Default code
        theme="vs-dark" // Theme of the editor (vs-dark, light, etc.)
        onChange={handleEditorChange} // Callback when code changes
        options={{
          minimap: { enabled: true }, // Show the minimap
          fontSize: 14, // Editor font size
          wordWrap: "on", // Wrap long lines
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
                <span className="ml-2 text-[#7981ff]">Running test cases...</span>
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
