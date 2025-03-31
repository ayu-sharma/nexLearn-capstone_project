"use client"

import React, { useEffect, useState } from "react";
import { Activity, Users, Code, BookOpen, CheckSquare } from "lucide-react";

import GoalGrid from "./goal-grid";
import ActivityGrid from "./activity-grid";
import DSAGrid from "./dsa-progress";
import MCQGrid from "./mcq-stats";
import AccuracyGrid from "./accuracy-grid";
import Recommendations from "@/components/Recomendation";
import axios from "axios";

interface ActivityData {
  // Define your activity data type here if needed
}

const Dashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"overview" | "dsa" | "mcq">("overview");
  const [isRecommendationsOpen, setIsRecommendationsOpen] = useState<boolean>(false);
  const [totalSolved, setTotalSolved] = useState(0);
  const [loading, setLoading] = useState(true);
  // Sample data for demonstration
  const activityData: number[] = [65, 40, 80, 35, 60, 75, 50];
  const goalProgress: number = 68;

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
        setTotalSolved(solved.totalSolved);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDSAStats();
  }, []);

  const toggleRecommendations = () => {
    setIsRecommendationsOpen(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header - Make it fixed/sticky */}
      <header className="bg-white shadow-sm p-4 sticky top-0">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-800">
            Learning Dashboard
          </h1>
          <div className="md:flex hidden items-center space-x-4">
            <button 
              onClick={toggleRecommendations}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm flex items-center"
            >
              <Activity className="w-4 h-4 mr-2" />
              Recommendations
            </button>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
              NT
            </div>
          </div>
        </div>
      </header>

      {/* Recommendations Component - Position it fixed relative to viewport */}
      <div className="fixed top-16 right-4">
        {isRecommendationsOpen && (
          <Recommendations 
            isOpen={isRecommendationsOpen} 
            onClose={() => setIsRecommendationsOpen(false)} 
          />
        )}
      </div>

      {/* Navigation Tabs - Also make sticky, right below header */}
      <div className="bg-white shadow-sm mb-6 top-16">
        <div className="container mx-auto">
          <div className="flex overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "overview"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("dsa")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "dsa"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              DSA Progress
            </button>
            <button
              onClick={() => setActiveTab("mcq")}
              className={`px-6 py-4 text-sm font-medium border-b-2 ${
                activeTab === "mcq"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              MCQ Stats
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-8">
        {/* Overview Section */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white rounded-lg shadow p-5 flex items-center">
                <div className="rounded-full bg-blue-100 p-3 mr-4">
                  <Code className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">DSA Problems</p>
                  <p className="text-2xl font-bold">{totalSolved}/150</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-5 flex items-center">
                <div className="rounded-full bg-green-100 p-3 mr-4">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">MCQ Score</p>
                  <p className="text-2xl font-bold">85%</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-5 flex items-center">
                <div className="rounded-full bg-purple-100 p-3 mr-4">
                  <CheckSquare className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Accuracy</p>
                  <p className="text-2xl font-bold">78.3%</p>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-5 flex items-center">
                <div className="rounded-full bg-yellow-100 p-3 mr-4">
                  <Users className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Ranking</p>
                  <p className="text-2xl font-bold">#42</p>
                </div>
              </div>
            </div>

            {/* Activity & Goals Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ActivityGrid activityData={activityData} />
              <GoalGrid goalProgress={goalProgress} />
            </div>
            {/* Heat Map */}
            {/* <DashboardHeatMap /> */}
            {/* Accuracy Grid */}
            <AccuracyGrid />
          </div>
        )}

        {/* Placeholder content for other tabs */}
        {activeTab === "dsa" && (
          <div>
            <DSAGrid />
          </div>
        )}

        {/* MCQ Stats Section */}
        {activeTab === "mcq" && (
          <div>
            <MCQGrid />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;