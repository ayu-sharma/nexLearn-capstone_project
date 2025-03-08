import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ActivityGridProps {
  activityData: number[];
}

const ActivityGrid: React.FC<ActivityGridProps> = ({ activityData }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Weekly Activity</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">View Details</button>
      </div>
      <div className="flex justify-between items-end h-40 mt-2">
        {activityData.map((value, index) => (
          <div key={index} className="w-1/8 flex flex-col items-center">
            <div 
              className="w-8 bg-blue-500 rounded-t-sm" 
              style={{height: `${value}%`}}
            ></div>
            <span className="text-xs text-gray-500 mt-2">
              {['M', 'T', 'W', 'T', 'F', 'S', 'S'][index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityGrid;