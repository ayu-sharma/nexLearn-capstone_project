import React from 'react'
import GoalGrid from './goal-grid'
import ActivityGrid from './activity-grid'

const DashboardGrid = () => {
  return (
    <div className='flex flex-col w-full gap-y-6'>
      <div className='grid grid-cols-2 w-full gap-x-6'>
        <ActivityGrid />
        <GoalGrid />
      </div>
      <div>
        Grid 2
      </div>
      <div>
        Grid 3
      </div>
    </div>
  )
}

export default DashboardGrid