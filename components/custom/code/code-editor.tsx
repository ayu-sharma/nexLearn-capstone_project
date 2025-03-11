"use client";

import React, { useEffect, useState } from "react";
import Editor from "@monaco-editor/react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import { Check, Play, Send, AlertTriangle, Code2, Loader2 } from "lucide-react";

const languages = [
  { id: "javascript", label: "JavaScript", icon: "js" },
  { id: "python", label: "Python", icon: "py" },
  { id: "java", label: "Java", icon: "java" },
  { id: "cpp", label: "C++", icon: "cpp" }
];

const CodeEditor = () => {
  const searchParams = useSearchParams();
  const pId = searchParams.get("problemId");

  const [code, setCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [testResults, setTestResults] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("editor");

  useEffect(() => {
    if (pId) {
      fetch(`/api/code/editor/${pId}`)
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
    const selectedLanguage = languages.find((lang) => lang.id === event.target.value);
    if (selectedLanguage) {
      setLanguage(selectedLanguage.id);
    }
  };

  const runCode = async () => {
    setLoading(true);
    setTestResults(null);
    try {
      const problemId = Number(pId);
      const res = await axios.post("/api/code/execute", { code, language, problemId });
      
      // Process the results
      const results = {
        passed: res.data.passed,
        total: res.data.total,
        message: res.data.message,
        error: res.data.error,
        status: res.data.error ? "error" : (res.data.passed === res.data.total ? "success" : "partial")
      };
      
      setTestResults(results);
    } catch (err) {
      setTestResults({
        status: "error",
        error: "Compilation Error or Server Issue"
      });
    }
    setLoading(false);
    setModalOpen(true);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setTestResults(null);
    try {
      const token = localStorage.getItem("token");
      const problemId = Number(pId);
      const response = await axios.post(
        "/api/dsa/submit",
        { code, language, problemId },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      
      // Process the results
      const results = {
        passed: response.data.passed,
        total: response.data.total,
        message: response.data.message,
        error: response.data.error,
        status: response.data.error ? "error" : (response.data.passed === response.data.total ? "success" : "partial"),
        isSubmission: true
      };
      
      setTestResults(results);
    } catch (error) {
      setTestResults({
        status: "error",
        error: "Compilation Error or Server Issue",
        isSubmission: true
      });
    }
    setLoading(false);
    setModalOpen(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "success": return "bg-green-100 text-green-800 border-green-300";
      case "partial": return "bg-yellow-100 text-yellow-800 border-yellow-300";
      case "error": return "bg-red-100 text-red-800 border-red-300";
      default: return "bg-gray-100 text-gray-800 border-gray-300";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "success": return <Check className="h-5 w-5 text-green-600" />;
      case "partial": return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case "error": return <AlertTriangle className="h-5 w-5 text-red-600" />;
      default: return null;
    }
  };

  return (
    <div className="h-full w-full rounded-md flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* Header with language selector and action buttons */}
      <div className="p-4 border-b dark:border-gray-700">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Code2 className="h-5 w-5 text-gray-500" />
            <h2 className="text-lg font-medium">Problem {pId}</h2>
          </div>
          
          <div className="flex items-center gap-3">
            <select
              id="language"
              value={language}
              onChange={handleLanguageChange}
              className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-black dark:text-white dark:bg-gray-800 dark:border-gray-700"
            >
              {languages.map((lang) => (
                <option key={lang.id} value={lang.id}>
                  {lang.label}
                </option>
              ))}
            </select>
            
            <Button 
              onClick={runCode} 
              variant="outline"
              className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200 dark:bg-indigo-900 dark:text-indigo-100 dark:hover:bg-indigo-800"
            >
              <Play className="h-4 w-4 mr-2" />
              Run
            </Button>
            
            <Button 
              onClick={handleSubmit}
              className="bg-indigo-600 text-white hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <Send className="h-4 w-4 mr-2" />
              Submit
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 flex flex-col min-h-0">
        <div className="px-4 border-b dark:border-gray-700">
          <div className="flex">
            <button
              className={`py-2 px-4 border-b-2 ${
                activeTab === "editor"
                  ? "border-indigo-500 text-indigo-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("editor")}
            >
              Code Editor
            </button>
            <button
              className={`py-2 px-4 border-b-2 ${
                activeTab === "output"
                  ? "border-indigo-500 text-indigo-600 font-medium"
                  : "border-transparent text-gray-500 hover:text-indigo-600"
              }`}
              onClick={() => setActiveTab("output")}
            >
              Output
            </button>
          </div>
        </div>
        
        {/* Editor Content */}
        {activeTab === "editor" && (
          <div className="flex-1 h-full">
            <div className="h-full w-full overflow-hidden rounded-md border dark:border-gray-700">
              <Editor
                height="100%"
                language={language}
                value={code}
                theme="vs-dark"
                onChange={(val) => setCode(val || "")}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  wordWrap: "on",
                  padding: { top: 16 },
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                }}
                loading={<div className="flex items-center justify-center h-full">Loading editor...</div>}
              />
            </div>
          </div>
        )}
        
        {/* Output Content */}
        {activeTab === "output" && (
          <div className="flex-1 p-4 overflow-auto bg-gray-100 dark:bg-gray-800 font-mono text-sm">
            {testResults ? (
              <pre className="whitespace-pre-wrap">{testResults.error || `Passed ${testResults.passed}/${testResults.total} test cases\n${testResults.message}`}</pre>
            ) : (
              <div className="text-gray-500 italic">Run your code to see output here</div>
            )}
          </div>
        )}
      </div>

      {/* Results Dialog */}
      <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {!isLoading && testResults && getStatusIcon(testResults.status)}
              {isLoading ? "Running Tests..." : "Test Results"}
            </DialogTitle>
          </DialogHeader>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="ml-3 text-indigo-600 font-medium">
                {testResults?.isSubmission ? "Submitting solution..." : "Running test cases..."}
              </span>
            </div>
          ) : (
            <>
              {testResults && (
                <div className="py-4">
                  <div className={`border rounded-lg p-4 ${getStatusColor(testResults.status)}`}>
                    {testResults.error ? (
                      <div className="font-mono text-sm overflow-auto max-h-60">
                        {testResults.error}
                      </div>
                    ) : (
                      <>
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-lg font-medium">
                            {testResults.passed} / {testResults.total} Tests Passed
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                            testResults.status === "success" 
                              ? "bg-green-100 text-green-800" 
                              : testResults.status === "partial" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-red-100 text-red-800"
                          }`}>
                            {testResults.status === "success" ? "All Passed" : testResults.status === "partial" ? "Partially Passed" : "Failed"}
                          </div>
                        </div>
                        <div className="font-mono text-sm overflow-auto max-h-60 whitespace-pre-line">
                          {testResults.message}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              )}
              
              <DialogFooter className="flex justify-between">
                <Button variant="outline" onClick={() => setModalOpen(false)}>
                  Close
                </Button>
                {testResults?.status !== "success" && (
                  <Button onClick={() => { setModalOpen(false); setActiveTab("editor"); }}>
                    Continue Coding
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CodeEditor;