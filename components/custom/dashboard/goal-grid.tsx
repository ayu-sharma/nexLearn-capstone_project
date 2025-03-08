import { Button } from '@/components/ui/button'
import { BookA, Code2, DraftingCompass, Edit } from 'lucide-react'
import React from 'react'

interface GoalGridProps {
  goalProgress: number;
}

const GoalGrid: React.FC<GoalGridProps> = ({ goalProgress }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Goal Progress</h2>
        <span className="text-sm font-medium text-gray-500">68% Complete</span>
      </div>
      <div className="mt-2">
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div 
            className="bg-green-500 h-4 rounded-full" 
            style={{width: `${goalProgress}%`}}
          ></div>
        </div>
        <div className="flex justify-between mt-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">DSA Problems</h3>
            <p className="text-lg font-semibold">124/350</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Weekly Hours</h3>
            <p className="text-lg font-semibold">18/25</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500">Modules</h3>
            <p className="text-lg font-semibold">5/8</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GoalGrid