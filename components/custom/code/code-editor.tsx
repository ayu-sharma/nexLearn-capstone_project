"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import axios from "axios";

const languages = [
  "javascript",
  "java",
  "cpp",
  "python"
];

const CodeEditor = () => {
  const searchParams = useSearchParams();
  const pId = searchParams.get("problemId");

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");

  const [testResults, setTestResults] = useState<string | null>(null);
  
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (pId) {
        fetch(`/api/dsa/editor/${pId}`)
            .then((res) => res.json())
            .then((data) => {
                if (data.boilerplate) {
                    setCode(data.boilerplate[language]);
                }
            })
            .catch((err) => console.error("Error fetching problem:", err));
    }
}, [pId, language]);

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLanguage = languages.find(
      (lang) => lang === event.target.value
    );
    if (selectedLanguage) {
      setLanguage(selectedLanguage);
    }
  };

  const runCode = async () => {
    setLoading(true);
    try {
      const problemId = Number(pId);
      const res = await axios.post("http://localhost:3000/api/dsa/execute", { code, language, problemId });
      setLoading(false);
      setTestResults(res.data.error  || `Passed ${res.data.passed}/${res.data.total} test cases\n${res.data.message}`);
    } catch (err) {
      setLoading(false);
      setTestResults("Compilation Error");
    }
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const problemId = Number(pId);
      const response = await axios.post("http://localhost:3000/api/dsa/submit",
        { code, language, problemId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setLoading(false);
      setTestResults(response.data.error  || `Passed ${response.data.passed}/${response.data.total} test cases\n${response.data.message}`);
    } catch (error) {
      setLoading(false);
      setTestResults("Compilation Error");
    }
    setModalOpen(true);
  }

  return (
    <div className="h-full w-full rounded-md">
      <div className="flex items-center justify-between gap-4 pb-6">
        <select
          id="language"
          value={language}
          onChange={handleLanguageChange}
          className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        >
          {languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
        <Button
          onClick={runCode}
          className="bg-[#7981ff] text-white hover:bg-[#5560ff]"
        >
          Run
        </Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </div>
      <Editor
        height="500px"
        language={language}
        value={code}
        theme="vs-dark"
        onChange={(val) => setCode(val || "")}
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
