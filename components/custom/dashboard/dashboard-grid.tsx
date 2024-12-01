import React from "react";
import GoalGrid from "./goal-grid";
import ActivityGrid from "./activity-grid";
import DSAGrid from "./code-stats-grid";
import MCQGrid from "./mcq-grid";
import AccuracyGrid from "./accuracy-grid";
import DashboardHeatMap from "./heatmap";

const DashboardGrid = () => {
  return (
    <div className="flex flex-col w-full gap-6">
      <div className="grid md:grid-cols-1 md:max-w-3xl lg:grid-cols-2 w-full max-w-lg lg:max-w-full mx-auto gap-6">
        <ActivityGrid />
        <GoalGrid />
      </div>
      <div className="flex flex-col gap-5 w-full">
        <div className="grid w-full sm:grid-cols-2 lg:grid-cols-2 gap-6">
          <DSAGrid />
          <MCQGrid />
        </div>
            <AccuracyGrid />
      </div>
      <div className="w-full mx-auto">
      <DashboardHeatMap />
      </div>
    </div>
  );
};

export default DashboardGrid;
