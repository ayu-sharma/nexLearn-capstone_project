import React from 'react'
import GoalGrid from './goal-grid'
import ActivityGrid from './activity-grid'
import DSAGrid from './code-stats-grid'
import MCQGrid from './mcq-grid'

const DashboardGrid = () => {
  return (
    <div className='flex flex-col w-full gap-y-6'>
      <div className='grid grid-cols-2 w-full gap-x-6'>
        <ActivityGrid />
        <GoalGrid />
      </div>
      <div className='grid grid-cols-3 gap-x-6'>
        <DSAGrid />
        <MCQGrid />
        <p>Accuracy</p>
      </div>
      <div>
        Heatmap
      </div>
    </div>
  )
}

export default DashboardGrid