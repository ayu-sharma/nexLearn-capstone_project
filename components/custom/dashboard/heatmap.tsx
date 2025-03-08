import React, { useEffect, useState } from 'react'
import { Calendar } from 'lucide-react'



const DashboardHeatMap = () => {
    
  return (
    <div className="bg-white rounded-lg shadow p-6">
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-lg font-semibold text-gray-800">Activity Heatmap</h2>
      <div className="flex items-center">
        <Calendar className="w-4 h-4 text-gray-500 mr-2" />
        <span className="text-sm text-gray-500">Last 6 months</span>
      </div>
    </div>
    <div className="grid grid-cols-7 gap-1 mt-2">
      {Array(140).fill(0).map((_, i) => (
        <div 
          key={i} 
          className={`w-4 h-4 rounded-sm ${['bg-gray-100', 'bg-green-100', 'bg-green-200', 'bg-green-300', 'bg-green-500'][Math.floor(Math.random() * 5)]}`}
        ></div>
      ))}
    </div>
    <div className="flex justify-end mt-3 text-xs text-gray-500">
      <span className="flex items-center mr-3">
        <div className="w-3 h-3 bg-gray-100 rounded-sm mr-1"></div>
        Less
      </span>
      <span className="flex items-center">
        <div className="w-3 h-3 bg-green-500 rounded-sm mr-1"></div>
        More
      </span>
    </div>
  </div>
  )
}

export default DashboardHeatMap
