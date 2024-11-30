import React from 'react'
import GoalGrid from './goal-grid'
import ActivityGrid from './activity-grid'
import DSAGrid from './code-stats-grid'
import MCQGrid from './mcq-grid'
import AccuracyGrid from './accuracy-grid'
import DashboardHeatMap from './heatmap'

const DashboardGrid = () => {
  return (
    <div className='flex flex-col w-full gap-6'>
      <div className='grid md:grid-cols-2 w-full max-w-lg md:max-w-full mx-auto gap-6'>
        <ActivityGrid />
        <GoalGrid />
      </div>
      <div className='grid w-full sm:grid-cols-2 md:grid-cols-3 gap-6'>
        <DSAGrid />
        <MCQGrid />
        <AccuracyGrid />
      </div>
      <DashboardHeatMap />
    </div>
  )
}

export default DashboardGrid