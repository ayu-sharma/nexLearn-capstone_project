import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import React from "react";

const ActivityGrid = () => {
  return (
    <div className="p-4 bg-[#D2D6DB] text-black rounded-md flex flex-col justify-between">
      <p className="text-xs xl:text-sm text-[#495057] mb-4">Last Viewed</p>
      <div className="flex flex-col bg-gradient-to-b from-[rgba(0,0,0,0.93)] to-[#3f3d3d] text-[#F2F2F2] rounded-md p-4">
        <div className="flex flex-col gap-y-2">
          <h1 className="text-[#7981FF] font-medium text-2xl">
            Arrays: Advanced
          </h1>
          <div className="flex items-center gap-x-4">
            <p className="text-white font-light text-sm">Progress:</p>
            <h1 className="text-[#7981FF] font-medium text-2xl">38%</h1>
          </div>
        </div>
        <div className="flex items-end justify-end">
          <Button className="group flex items-center text-white bg-transparent border border-[rgba(0,0,0,0.93)]/25 hover:bg-[#121417]">
            <p className="font-semibold text-xs xl:text-sm text-white">Resume</p>
            <ArrowRight className="h-4 w-4 ml-2 transform transition-transform  group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ActivityGrid;
